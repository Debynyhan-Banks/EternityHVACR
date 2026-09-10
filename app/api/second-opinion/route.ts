import { getSecondOpinionBindings, purgeExpiredSecondOpinions, RETENTION_MS } from "../../lib/secondOpinionStorage";

const SERVICES = new Set(["Air conditioning", "Furnace or heating", "Boiler", "Heat pump", "Commercial HVAC", "Commercial refrigeration"]);
const ACCEPTED_TYPES = new Set(["application/pdf", "image/jpeg", "image/png", "image/webp"]);
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_TOTAL_BYTES = 20 * 1024 * 1024;
const MAX_FILES = 3;
const attemptsByAddress = new Map<string, number[]>();

function text(value: FormDataEntryValue | null, maximum: number) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    const originUrl = new URL(origin);
    const requestUrl = new URL(request.url);
    return originUrl.host === requestUrl.host || originUrl.hostname === "localhost";
  } catch { return false; }
}

function isRateLimited(request: Request) {
  const address = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const now = Date.now();
  const recent = (attemptsByAddress.get(address) ?? []).filter((attempt) => now - attempt < 30 * 60 * 1000);
  if (recent.length >= 3) { attemptsByAddress.set(address, recent); return true; }
  attemptsByAddress.set(address, [...recent, now]);
  return false;
}

function safeFileName(name: string) {
  const normalized = name.normalize("NFKC").replace(/[^A-Za-z0-9._ -]/g, "").replace(/\s+/g, " ").trim();
  return (normalized || "upload").slice(0, 120);
}

function extensionFor(type: string) {
  return ({ "application/pdf": "pdf", "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" } as Record<string, string>)[type];
}

function startsWith(bytes: Uint8Array, expected: number[]) {
  return expected.every((value, index) => bytes[index] === value);
}

function contentMatches(type: string, bytes: Uint8Array) {
  if (type === "application/pdf") return startsWith(bytes, [0x25, 0x50, 0x44, 0x46]);
  if (type === "image/jpeg") return startsWith(bytes, [0xff, 0xd8, 0xff]);
  if (type === "image/png") return startsWith(bytes, [0x89, 0x50, 0x4e, 0x47]);
  if (type === "image/webp") return startsWith(bytes, [0x52, 0x49, 0x46, 0x46]) && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  return false;
}

async function sendInternalNotice(apiKey: string, reference: string, fields: Record<string, string>, files: File[]) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": `second-opinion-${reference}` },
    body: JSON.stringify({
      from: "Eternity Website <requests@mail.eternityhvacr.com>",
      to: ["ben@eternityhvacr.com"],
      reply_to: fields.email,
      subject: `Second-opinion upload — ${fields.service} — ${reference}`,
      text: [
        "New private second-opinion upload",
        `Reference: ${reference}`,
        `Name: ${fields.name}`,
        `Phone: ${fields.phone}`,
        `Email: ${fields.email}`,
        `ZIP: ${fields.zip}`,
        `Service: ${fields.service}`,
        "",
        fields.details,
        "",
        `Files: ${files.map((file) => safeFileName(file.name)).join(", ")}`,
        "Access: https://eternityhvacr.com/admin/second-opinions",
        "Files expire after 30 days.",
      ].join("\n"),
      tags: [{ name: "source", value: "second_opinion_upload" }],
    }),
  });
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) return Response.json({ error: "Request origin is not allowed." }, { status: 403 });
  if (isRateLimited(request)) return Response.json({ error: "Too many upload attempts. Please call 216-703-3183." }, { status: 429 });

  let form: FormData;
  try { form = await request.formData(); } catch { return Response.json({ error: "Invalid upload request." }, { status: 400 }); }

  const fields = {
    name: text(form.get("name"), 120),
    email: text(form.get("email"), 254).toLowerCase(),
    phone: text(form.get("phone"), 50),
    zip: text(form.get("zip"), 5),
    service: text(form.get("service"), 80),
    details: text(form.get("details"), 2500),
  };
  const website = text(form.get("website"), 200);
  const startedAt = Number(text(form.get("startedAt"), 20));
  const files = form.getAll("files").filter((value): value is File => value instanceof File && value.size > 0);

  if (website || !Number.isFinite(startedAt) || Date.now() - startedAt < 1800) return Response.json({ error: "Unable to validate this request." }, { status: 400 });
  if (fields.name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email) || fields.phone.replace(/\D/g, "").length < 7 || !/^\d{5}$/.test(fields.zip) || !SERVICES.has(fields.service) || fields.details.length < 20 || form.get("consent") !== "yes") {
    return Response.json({ error: "Please complete every required field with valid information." }, { status: 400 });
  }
  if (files.length < 1 || files.length > MAX_FILES || files.some((file) => !ACCEPTED_TYPES.has(file.type) || file.size > MAX_FILE_BYTES) || files.reduce((sum, file) => sum + file.size, 0) > MAX_TOTAL_BYTES) {
    return Response.json({ error: "Choose one to three valid PDF or image files within the size limits." }, { status: 400 });
  }

  const fileBytes = await Promise.all(files.map(async (file) => new Uint8Array(await file.arrayBuffer())));
  if (fileBytes.some((bytes, index) => !contentMatches(files[index].type, bytes))) return Response.json({ error: "A file's contents do not match its stated type." }, { status: 400 });

  const { DB, UPLOADS } = getSecondOpinionBindings();
  const submissionId = crypto.randomUUID();
  const reference = submissionId.replace(/-/g, "").slice(0, 8).toUpperCase();
  const createdAt = Date.now();
  const expiresAt = createdAt + RETENTION_MS;
  const storedKeys: string[] = [];

  try {
    await purgeExpiredSecondOpinions();
    const fileRows = files.map((file, index) => {
      const fileId = crypto.randomUUID();
      const objectKey = `second-opinions/${submissionId}/${fileId}.${extensionFor(file.type)}`;
      storedKeys.push(objectKey);
      return { fileId, objectKey, file, bytes: fileBytes[index] };
    });

    await Promise.all(fileRows.map((row) => UPLOADS.put(row.objectKey, row.bytes, { httpMetadata: { contentType: row.file.type }, customMetadata: { submissionId, expiresAt: String(expiresAt) } })));
    await DB.batch([
      DB.prepare("INSERT INTO second_opinion_submissions (id, reference, name, email, phone, zip, service, details, status, consent_at, created_at, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'submitted', ?, ?, ?)").bind(submissionId, reference, fields.name, fields.email, fields.phone, fields.zip, fields.service, fields.details, createdAt, createdAt, expiresAt),
      ...fileRows.map((row) => DB.prepare("INSERT INTO second_opinion_files (id, submission_id, object_key, file_name, content_type, size_bytes, created_at, expires_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)").bind(row.fileId, submissionId, row.objectKey, safeFileName(row.file.name), row.file.type, row.file.size, createdAt, expiresAt)),
    ]);

    const apiKey = process.env.RESEND_API_KEY;
    if (apiKey) {
      const notice = await sendInternalNotice(apiKey, reference, fields, files);
      if (!notice.ok) console.error("Second-opinion notification delivery failed", notice.status);
    }
    return Response.json({ ok: true, reference }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    await Promise.allSettled(storedKeys.map((key) => UPLOADS.delete(key)));
    console.error("Second-opinion upload failed", error instanceof Error ? error.message : "unknown error");
    return Response.json({ error: "Secure upload is temporarily unavailable. Please call 216-703-3183." }, { status: 503 });
  }
}

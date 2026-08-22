const SERVICES = new Set([
  "Air conditioning",
  "Heating",
  "Commercial HVAC",
  "Refrigeration",
  "Installation",
  "Maintenance",
]);

const CUSTOMER_TYPES = new Set(["My home", "A business", "A managed property"]);

const TIMINGS = new Set([
  "Emergency / system down",
  "As soon as available",
  "This week",
  "Planning an estimate",
  "Routine maintenance",
]);

const attemptsByAddress = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

type ServiceRequestPayload = {
  service?: unknown;
  customer?: unknown;
  timing?: unknown;
  details?: unknown;
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  website?: unknown;
  startedAt?: unknown;
};

function text(value: unknown, maximum: number) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character] ?? character);
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const originUrl = new URL(origin);
    const requestUrl = new URL(request.url);
    return originUrl.host === requestUrl.host || originUrl.hostname === "localhost";
  } catch {
    return false;
  }
}

function isRateLimited(request: Request) {
  const address = request.headers.get("cf-connecting-ip")
    ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    ?? "unknown";
  const now = Date.now();
  const recent = (attemptsByAddress.get(address) ?? []).filter((attempt) => now - attempt < RATE_LIMIT_WINDOW);

  if (recent.length >= RATE_LIMIT_MAX) {
    attemptsByAddress.set(address, recent);
    return true;
  }

  recent.push(now);
  attemptsByAddress.set(address, recent);
  return false;
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return Response.json({ error: "Request origin is not allowed." }, { status: 403 });
  }

  if (isRateLimited(request)) {
    return Response.json({ error: "Too many requests. Please call Eternity Mechanical Services." }, { status: 429 });
  }

  let payload: ServiceRequestPayload;
  try {
    payload = await request.json() as ServiceRequestPayload;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const service = text(payload.service, 80);
  const customer = text(payload.customer, 80);
  const timing = text(payload.timing, 80);
  const details = text(payload.details, 2500);
  const name = text(payload.name, 120);
  const phone = text(payload.phone, 50);
  const email = text(payload.email, 254).toLowerCase();
  const website = text(payload.website, 200);
  const startedAt = typeof payload.startedAt === "number" ? payload.startedAt : 0;
  const elapsed = Date.now() - startedAt;

  if (website || !startedAt || elapsed < 1500 || elapsed > 24 * 60 * 60 * 1000) {
    return Response.json({ error: "Unable to validate this request." }, { status: 400 });
  }

  if (
    !SERVICES.has(service)
    || !CUSTOMER_TYPES.has(customer)
    || !TIMINGS.has(timing)
    || details.length < 10
    || name.length < 2
    || phone.replace(/\D/g, "").length < 7
    || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return Response.json({ error: "Please complete every field with valid information." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Service request delivery is temporarily unavailable." }, { status: 503 });
  }

  const subject = `${timing === "Emergency / system down" ? "URGENT — " : ""}Website service request — ${service}`;
  const plainText = [
    "New service request from eternityhvacr.com",
    "",
    `Service: ${service}`,
    `Customer type: ${customer}`,
    `Timing: ${timing}`,
    "",
    "Equipment or issue:",
    details,
    "",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Email: ${email}`,
  ].join("\n");

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": crypto.randomUUID(),
      "User-Agent": "EternityHVACR/1.0",
    },
    body: JSON.stringify({
      from: "Eternity Website <requests@mail.eternityhvacr.com>",
      to: ["ben@eternityhvacr.com"],
      reply_to: email,
      subject,
      text: plainText,
      html: `
        <h1>New website service request</h1>
        <table cellpadding="8" cellspacing="0" style="border-collapse:collapse">
          <tr><th align="left">Service</th><td>${escapeHtml(service)}</td></tr>
          <tr><th align="left">Customer type</th><td>${escapeHtml(customer)}</td></tr>
          <tr><th align="left">Timing</th><td>${escapeHtml(timing)}</td></tr>
          <tr><th align="left">Name</th><td>${escapeHtml(name)}</td></tr>
          <tr><th align="left">Phone</th><td>${escapeHtml(phone)}</td></tr>
          <tr><th align="left">Email</th><td>${escapeHtml(email)}</td></tr>
        </table>
        <h2>Equipment or issue</h2>
        <p style="white-space:pre-wrap">${escapeHtml(details)}</p>
      `,
      tags: [{ name: "source", value: "website_service_request" }],
    }),
  });

  if (!emailResponse.ok) {
    console.error("Resend service-request delivery failed", emailResponse.status, await emailResponse.text());
    return Response.json({ error: "We could not send your request. Please call or email Eternity Mechanical Services." }, { status: 502 });
  }

  return Response.json({ ok: true });
}

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

function buildHtmlEmail({
  service,
  customer,
  timing,
  details,
  name,
  phone,
  email,
}: {
  service: string;
  customer: string;
  timing: string;
  details: string;
  name: string;
  phone: string;
  email: string;
}) {
  const isUrgent = timing === "Emergency / system down";
  const safeDetails = escapeHtml(details).replace(/\r?\n/g, "<br>");
  const phoneDigits = phone.replace(/\D/g, "");
  const phoneHref = phoneDigits.length === 10
    ? `+1${phoneDigits}`
    : phoneDigits.length === 11 && phoneDigits.startsWith("1")
      ? `+${phoneDigits}`
      : phoneDigits;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>New website service request</title>
  </head>
  <body style="margin:0;padding:0;background:#f5f7fa;color:#101828;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${isUrgent ? "Urgent service request" : "New service request"} from ${escapeHtml(name)} for ${escapeHtml(service)}.</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#f5f7fa;">
      <tr>
        <td align="center" style="padding:32px 12px;">
          <table role="presentation" width="640" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:640px;background:#ffffff;border:1px solid #d9e1ec;">
            <tr>
              <td style="padding:28px 32px;background:#071b3c;border-bottom:5px solid #f47a38;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td>
                      <div style="color:#ffffff;font-size:24px;font-weight:800;letter-spacing:1.5px;line-height:1.1;">ETERNITY</div>
                      <div style="margin-top:5px;color:#8ebcfb;font-size:10px;font-weight:700;letter-spacing:2px;line-height:1.2;">MECHANICAL SERVICES</div>
                    </td>
                    <td align="right" valign="middle">
                      <span style="display:inline-block;padding:7px 10px;background:${isUrgent ? "#f47a38" : "#0b57d0"};color:#ffffff;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">${isUrgent ? "Urgent request" : "Website lead"}</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:34px 32px 18px;">
                <div style="color:#0b57d0;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">New service request</div>
                <h1 style="margin:10px 0 8px;color:#071b3c;font-size:28px;line-height:1.25;">${escapeHtml(service)}</h1>
                <p style="margin:0;color:#667085;font-size:15px;line-height:1.6;">A customer submitted this request through eternityhvacr.com.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 32px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;border:1px solid #d9e1ec;">
                  <tr>
                    <td style="width:34%;padding:14px 16px;background:#eaf3ff;border-bottom:1px solid #d9e1ec;color:#44536a;font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;">Customer type</td>
                    <td style="padding:14px 16px;border-bottom:1px solid #d9e1ec;color:#101828;font-size:14px;font-weight:700;">${escapeHtml(customer)}</td>
                  </tr>
                  <tr>
                    <td style="width:34%;padding:14px 16px;background:#eaf3ff;color:#44536a;font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;">Timing</td>
                    <td style="padding:14px 16px;color:${isUrgent ? "#b54708" : "#101828"};font-size:14px;font-weight:700;">${escapeHtml(timing)}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 32px 8px;">
                <h2 style="margin:0 0 10px;color:#071b3c;font-size:16px;line-height:1.3;">Equipment or issue</h2>
                <div style="padding:18px;background:#f8fafc;border-left:4px solid #0b57d0;color:#344054;font-size:14px;line-height:1.7;">${safeDetails}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 32px 8px;">
                <h2 style="margin:0 0 10px;color:#071b3c;font-size:16px;line-height:1.3;">Customer contact</h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
                  <tr><td style="padding:5px 0;color:#667085;font-size:13px;">Name</td><td align="right" style="padding:5px 0;color:#101828;font-size:14px;font-weight:700;">${escapeHtml(name)}</td></tr>
                  <tr><td style="padding:5px 0;color:#667085;font-size:13px;">Phone</td><td align="right" style="padding:5px 0;font-size:14px;font-weight:700;"><a href="tel:${phoneHref}" style="color:#0b57d0;text-decoration:none;">${escapeHtml(phone)}</a></td></tr>
                  <tr><td style="padding:5px 0;color:#667085;font-size:13px;">Email</td><td align="right" style="padding:5px 0;font-size:14px;font-weight:700;"><a href="mailto:${escapeHtml(email)}" style="color:#0b57d0;text-decoration:none;">${escapeHtml(email)}</a></td></tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:26px 32px 34px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding-right:10px;"><a href="mailto:${escapeHtml(email)}" style="display:inline-block;padding:14px 18px;background:#0b57d0;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;">Reply to customer &rarr;</a></td>
                    <td><a href="tel:${phoneHref}" style="display:inline-block;padding:13px 18px;border:1px solid #071b3c;color:#071b3c;font-size:13px;font-weight:700;text-decoration:none;">Call customer</a></td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:#071b3c;color:#aebcd1;font-size:11px;line-height:1.6;">
                Submitted through <a href="https://eternityhvacr.com" style="color:#ffffff;text-decoration:none;">eternityhvacr.com</a> &bull; Replying to this email responds directly to ${escapeHtml(name)}.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
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
      html: buildHtmlEmail({ service, customer, timing, details, name, phone, email }),
      tags: [{ name: "source", value: "website_service_request" }],
    }),
  });

  if (!emailResponse.ok) {
    console.error("Resend service-request delivery failed", emailResponse.status, await emailResponse.text());
    return Response.json({ error: "We could not send your request. Please call or email Eternity Mechanical Services." }, { status: 502 });
  }

  return Response.json({ ok: true });
}

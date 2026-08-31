const SERVICES = new Set([
  "Air conditioning",
  "Heating",
  "Boiler",
  "Heat pump",
  "Commercial HVAC",
  "Refrigeration",
  "Installation",
  "Maintenance",
]);

const REQUEST_TYPES = new Set([
  "Emergency / system down",
  "Repair or diagnostic",
  "Installation estimate",
  "Commercial / refrigeration",
  "Preventive maintenance",
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
  requestType?: unknown;
  service?: unknown;
  customer?: unknown;
  timing?: unknown;
  details?: unknown;
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  serviceConsent?: unknown;
  website?: unknown;
  startedAt?: unknown;
  attribution?: unknown;
};

type LeadAttribution = {
  channel: "website_service_request";
  landingPage: string;
  sourcePage: string;
  referrerHost?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

function text(value: unknown, maximum: number) {
  return typeof value === "string" ? value.trim().slice(0, maximum) : "";
}

function getLeadAttribution(value: unknown): LeadAttribution {
  const record = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const safePath = (path: unknown) => {
    const candidate = text(path, 200);
    return /^\/[A-Za-z0-9/_-]*$/.test(candidate) ? candidate : "/";
  };
  const safeHost = (host: unknown) => {
    const candidate = text(host, 253).toLowerCase();
    return /^(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)*[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(candidate)
      ? candidate
      : undefined;
  };
  const optionalText = (campaignValue: unknown, maximum: number) => text(campaignValue, maximum) || undefined;

  return {
    channel: "website_service_request",
    landingPage: safePath(record.landingPage),
    sourcePage: safePath(record.sourcePage),
    referrerHost: safeHost(record.referrerHost),
    utmSource: optionalText(record.utmSource, 100),
    utmMedium: optionalText(record.utmMedium, 100),
    utmCampaign: optionalText(record.utmCampaign, 160),
  };
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

function buildInternalHtmlEmail({
  requestType,
  service,
  customer,
  timing,
  details,
  name,
  phone,
  email,
  attribution,
}: {
  requestType: string;
  service: string;
  customer: string;
  timing: string;
  details: string;
  name: string;
  phone: string;
  email: string;
  attribution: LeadAttribution;
}) {
  const isUrgent = requestType === "Emergency / system down" || timing === "Emergency / system down";
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
              <td style="padding:28px 32px;background:#0B2646;border-bottom:5px solid #F47A38;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td>
                      <div style="color:#ffffff;font-size:24px;font-weight:800;letter-spacing:1.5px;line-height:1.1;">ETERNITY</div>
                      <div style="margin-top:5px;color:#FFC3A0;font-size:10px;font-weight:700;letter-spacing:2px;line-height:1.2;">MECHANICAL SERVICES</div>
                    </td>
                    <td align="right" valign="middle">
                      <span style="display:inline-block;padding:7px 10px;background:${isUrgent ? "#F47A38" : "#0B2646"};color:#ffffff;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">${isUrgent ? "Urgent request" : "Website lead"}</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:34px 32px 18px;">
                <div style="color:#0B2646;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">New service request</div>
                <h1 style="margin:10px 0 8px;color:#0B2646;font-size:28px;line-height:1.25;">${escapeHtml(service)}</h1>
                <p style="margin:0;color:#667085;font-size:15px;line-height:1.6;">A customer submitted this request through eternityhvacr.com.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 32px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;border:1px solid #d9e1ec;">
                  <tr>
                    <td style="width:34%;padding:14px 16px;background:#F1F5F8;border-bottom:1px solid #d9e1ec;color:#44536a;font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;">Request path</td>
                    <td style="padding:14px 16px;border-bottom:1px solid #d9e1ec;color:#101828;font-size:14px;font-weight:700;">${escapeHtml(requestType)}</td>
                  </tr>
                  <tr>
                    <td style="width:34%;padding:14px 16px;background:#F1F5F8;border-bottom:1px solid #d9e1ec;color:#44536a;font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;">Customer type</td>
                    <td style="padding:14px 16px;border-bottom:1px solid #d9e1ec;color:#101828;font-size:14px;font-weight:700;">${escapeHtml(customer)}</td>
                  </tr>
                  <tr>
                    <td style="width:34%;padding:14px 16px;background:#F1F5F8;color:#44536a;font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;">Timing</td>
                    <td style="padding:14px 16px;color:${isUrgent ? "#b54708" : "#101828"};font-size:14px;font-weight:700;">${escapeHtml(timing)}</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 32px 8px;">
                <h2 style="margin:0 0 10px;color:#0B2646;font-size:16px;line-height:1.3;">Equipment or issue</h2>
                <div style="padding:18px;background:#f8fafc;border-left:4px solid #0B2646;color:#344054;font-size:14px;line-height:1.7;">${safeDetails}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 32px 8px;">
                <h2 style="margin:0 0 10px;color:#0B2646;font-size:16px;line-height:1.3;">Customer contact</h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
                  <tr><td style="padding:5px 0;color:#667085;font-size:13px;">Name</td><td align="right" style="padding:5px 0;color:#101828;font-size:14px;font-weight:700;">${escapeHtml(name)}</td></tr>
                  <tr><td style="padding:5px 0;color:#667085;font-size:13px;">Phone</td><td align="right" style="padding:5px 0;font-size:14px;font-weight:700;"><a href="tel:${phoneHref}" style="color:#0B2646;text-decoration:none;">${escapeHtml(phone)}</a></td></tr>
                  <tr><td style="padding:5px 0;color:#667085;font-size:13px;">Email</td><td align="right" style="padding:5px 0;font-size:14px;font-weight:700;"><a href="mailto:${escapeHtml(email)}" style="color:#0B2646;text-decoration:none;">${escapeHtml(email)}</a></td></tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 32px 8px;">
                <h2 style="margin:0 0 10px;color:#0B2646;font-size:16px;line-height:1.3;">Website source</h2>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;">
                  <tr><td style="padding:5px 0;color:#667085;font-size:13px;">First page</td><td align="right" style="padding:5px 0;color:#101828;font-size:14px;font-weight:700;">${escapeHtml(attribution.landingPage)}</td></tr>
                  <tr><td style="padding:5px 0;color:#667085;font-size:13px;">Form opened from</td><td align="right" style="padding:5px 0;color:#101828;font-size:14px;font-weight:700;">${escapeHtml(attribution.sourcePage)}</td></tr>
                  <tr><td style="padding:5px 0;color:#667085;font-size:13px;">Referrer</td><td align="right" style="padding:5px 0;color:#101828;font-size:14px;font-weight:700;">${escapeHtml(attribution.referrerHost ?? "Direct / unavailable")}</td></tr>
                  <tr><td style="padding:5px 0;color:#667085;font-size:13px;">Campaign</td><td align="right" style="padding:5px 0;color:#101828;font-size:14px;font-weight:700;">${escapeHtml([attribution.utmSource, attribution.utmMedium, attribution.utmCampaign].filter(Boolean).join(" / ") || "None")}</td></tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:26px 32px 34px;">
                <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding-right:10px;"><a href="mailto:${escapeHtml(email)}" style="display:inline-block;padding:14px 18px;background:#0B2646;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;">Reply to customer &rarr;</a></td>
                    <td><a href="tel:${phoneHref}" style="display:inline-block;padding:13px 18px;border:1px solid #0B2646;color:#0B2646;font-size:13px;font-weight:700;text-decoration:none;">Call customer</a></td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:#0B2646;color:#aebcd1;font-size:11px;line-height:1.6;">
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

function buildCustomerHtmlEmail({
  requestType,
  service,
  customer,
  timing,
  details,
  name,
}: {
  requestType: string;
  service: string;
  customer: string;
  timing: string;
  details: string;
  name: string;
}) {
  const isUrgent = requestType === "Emergency / system down" || timing === "Emergency / system down";
  const firstName = name.split(/\s+/)[0] || name;
  const safeDetails = escapeHtml(details).replace(/\r?\n/g, "<br>");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>We received your service request</title>
  </head>
  <body style="margin:0;padding:0;background:#f5f7fa;color:#101828;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">Your request has been delivered to Eternity Mechanical Services.</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;background:#f5f7fa;">
      <tr>
        <td align="center" style="padding:32px 12px;">
          <table role="presentation" width="640" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:640px;background:#ffffff;border:1px solid #d9e1ec;">
            <tr>
              <td style="padding:28px 32px;background:#0B2646;border-bottom:5px solid #F47A38;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td>
                      <div style="color:#ffffff;font-size:24px;font-weight:800;letter-spacing:1.5px;line-height:1.1;">ETERNITY</div>
                      <div style="margin-top:5px;color:#FFC3A0;font-size:10px;font-weight:700;letter-spacing:2px;line-height:1.2;">MECHANICAL SERVICES</div>
                    </td>
                    <td align="right" valign="middle"><span style="display:inline-block;padding:7px 10px;background:#0B2646;color:#ffffff;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Request received</span></td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:34px 32px 18px;">
                <div style="color:#0B2646;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;">Thank you for contacting Eternity</div>
                <h1 style="margin:10px 0 8px;color:#0B2646;font-size:28px;line-height:1.25;">We received your request, ${escapeHtml(firstName)}.</h1>
                <p style="margin:0;color:#667085;font-size:15px;line-height:1.7;">Your details have been delivered to the Eternity Mechanical Services team for review.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 32px 8px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%;border-collapse:collapse;border:1px solid #d9e1ec;">
                  <tr><td style="width:34%;padding:14px 16px;background:#F1F5F8;border-bottom:1px solid #d9e1ec;color:#44536a;font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;">Request type</td><td style="padding:14px 16px;border-bottom:1px solid #d9e1ec;color:#101828;font-size:14px;font-weight:700;">${escapeHtml(requestType)}</td></tr>
                  <tr><td style="width:34%;padding:14px 16px;background:#F1F5F8;border-bottom:1px solid #d9e1ec;color:#44536a;font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;">Service</td><td style="padding:14px 16px;border-bottom:1px solid #d9e1ec;color:#101828;font-size:14px;font-weight:700;">${escapeHtml(service)}</td></tr>
                  <tr><td style="padding:14px 16px;background:#F1F5F8;border-bottom:1px solid #d9e1ec;color:#44536a;font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;">Property</td><td style="padding:14px 16px;border-bottom:1px solid #d9e1ec;color:#101828;font-size:14px;font-weight:700;">${escapeHtml(customer)}</td></tr>
                  <tr><td style="padding:14px 16px;background:#F1F5F8;color:#44536a;font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;">Requested timing</td><td style="padding:14px 16px;color:${isUrgent ? "#b54708" : "#101828"};font-size:14px;font-weight:700;">${escapeHtml(timing)}</td></tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 32px 8px;">
                <h2 style="margin:0 0 10px;color:#0B2646;font-size:16px;line-height:1.3;">Your request details</h2>
                <div style="padding:18px;background:#f8fafc;border-left:4px solid #0B2646;color:#344054;font-size:14px;line-height:1.7;">${safeDetails}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:22px 32px 8px;">
                <div style="padding:18px;background:#F1F5F8;color:#344054;font-size:14px;line-height:1.7;">
                  <strong style="display:block;margin-bottom:5px;color:#0B2646;">What happens next</strong>
                  The team typically reviews website requests within 15 minutes during regular business hours and will contact you using the details you provided. Appointment availability and service details are confirmed directly by Eternity Mechanical Services.
                </div>
              </td>
            </tr>
            ${isUrgent ? `<tr><td style="padding:14px 32px 0;"><div style="padding:16px;background:#fff1e8;border-left:4px solid #F47A38;color:#7c2d12;font-size:13px;line-height:1.6;"><strong>System down or urgent situation?</strong> Please call <a href="tel:+12167033183" style="color:#7c2d12;font-weight:700;">216-703-3183</a> for immediate assistance.</div></td></tr>` : ""}
            <tr>
              <td style="padding:26px 32px 34px;">
                <a href="tel:+12167033183" style="display:inline-block;padding:14px 18px;background:#0B2646;color:#ffffff;font-size:13px;font-weight:700;text-decoration:none;">Call 216-703-3183 &rarr;</a>
                <p style="margin:15px 0 0;color:#667085;font-size:12px;line-height:1.6;">You can also reply directly to this email if you need to add information.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background:#0B2646;color:#aebcd1;font-size:11px;line-height:1.7;">
                Eternity Mechanical Services LLC<br>
                Greater Cleveland, Ohio &bull; <a href="https://eternityhvacr.com" style="color:#ffffff;text-decoration:none;">eternityhvacr.com</a><br>
                Monday&ndash;Friday 7:00 a.m.&ndash;7:00 p.m. &bull; Saturday 9:00 a.m.&ndash;5:00 p.m.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function sendEmail(apiKey: string, idempotencyKey: string, body: Record<string, unknown>) {
  return fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
      "User-Agent": "EternityHVACR/1.0",
    },
    body: JSON.stringify(body),
  });
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

  const requestType = text(payload.requestType, 80);
  const service = text(payload.service, 80);
  const customer = text(payload.customer, 80);
  const timing = text(payload.timing, 80);
  const details = text(payload.details, 2500);
  const name = text(payload.name, 120);
  const phone = text(payload.phone, 50);
  const email = text(payload.email, 254).toLowerCase();
  const serviceConsent = payload.serviceConsent === true;
  const website = text(payload.website, 200);
  const startedAt = typeof payload.startedAt === "number" ? payload.startedAt : 0;
  const elapsed = Date.now() - startedAt;
  const attribution = getLeadAttribution(payload.attribution);

  if (website || !startedAt || elapsed < 1500) {
    return Response.json({ error: "Unable to validate this request." }, { status: 400 });
  }

  if (
    !REQUEST_TYPES.has(requestType)
    || !SERVICES.has(service)
    || !CUSTOMER_TYPES.has(customer)
    || !TIMINGS.has(timing)
    || details.length < 10
    || name.length < 2
    || phone.replace(/\D/g, "").length < 7
    || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    || !serviceConsent
  ) {
    return Response.json({ error: "Please complete every field with valid information." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "Service request delivery is temporarily unavailable." }, { status: 503 });
  }

  const isUrgent = requestType === "Emergency / system down" || timing === "Emergency / system down";
  const subject = `${isUrgent ? "URGENT — " : ""}Website service request — ${service}`;
  const plainText = [
    "New service request from eternityhvacr.com",
    "",
    `Request path: ${requestType}`,
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
    "Service-contact authorization: Confirmed on website",
    "",
    "Website source:",
    `First page: ${attribution.landingPage}`,
    `Form opened from: ${attribution.sourcePage}`,
    `Referrer: ${attribution.referrerHost ?? "Direct / unavailable"}`,
    `Campaign source: ${attribution.utmSource ?? "None"}`,
    `Campaign medium: ${attribution.utmMedium ?? "None"}`,
    `Campaign name: ${attribution.utmCampaign ?? "None"}`,
  ].join("\n");
  const requestId = crypto.randomUUID();

  const emailResponse = await sendEmail(apiKey, `${requestId}-internal`, {
    from: "Eternity Website <requests@mail.eternityhvacr.com>",
    to: ["ben@eternityhvacr.com"],
    reply_to: email,
    subject,
    text: plainText,
    html: buildInternalHtmlEmail({ requestType, service, customer, timing, details, name, phone, email, attribution }),
    tags: [{ name: "source", value: "website_service_request" }],
  });

  if (!emailResponse.ok) {
    console.error("Resend service-request delivery failed", emailResponse.status, await emailResponse.text());
    return Response.json({ error: "We could not send your request. Please call or email Eternity Mechanical Services." }, { status: 502 });
  }

  const confirmationText = [
    `Thank you for contacting Eternity Mechanical Services, ${name}.`,
    "",
    "We received your service request and delivered it to our team for review.",
    "",
    `Request type: ${requestType}`,
    `Service: ${service}`,
    `Property: ${customer}`,
    `Requested timing: ${timing}`,
    "",
    "Your request details:",
    details,
    "",
    "Appointment availability and service details are confirmed directly by Eternity Mechanical Services.",
    "For urgent service, call 216-703-3183.",
    "",
    "Eternity Mechanical Services LLC",
    "https://eternityhvacr.com",
  ].join("\n");

  const confirmationResponse = await sendEmail(apiKey, `${requestId}-customer`, {
    from: "Eternity Mechanical Services <requests@mail.eternityhvacr.com>",
    to: [email],
    reply_to: "ben@eternityhvacr.com",
    subject: "We received your service request | Eternity Mechanical Services",
    text: confirmationText,
    html: buildCustomerHtmlEmail({ requestType, service, customer, timing, details, name }),
    tags: [
      { name: "source", value: "website_service_request" },
      { name: "message", value: "customer_confirmation" },
    ],
  });

  if (!confirmationResponse.ok) {
    console.error("Resend customer confirmation failed", confirmationResponse.status, await confirmationResponse.text());
    return Response.json({ ok: true, confirmationSent: false });
  }

  return Response.json({ ok: true, confirmationSent: true });
}

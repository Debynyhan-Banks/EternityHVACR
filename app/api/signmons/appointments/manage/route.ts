const attemptsByAddress = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 20;
const NO_STORE_HEADERS = {
  "cache-control": "no-store",
  "referrer-policy": "no-referrer",
};

type ManageRequest = {
  managementToken?: unknown;
  action?: unknown;
  slotToken?: unknown;
};

type AppointmentSlot = {
  token: string;
  start: string;
  end: string;
  label: string;
};

function jsonResponse(body: unknown, status = 200) {
  return Response.json(body, { status, headers: NO_STORE_HEADERS });
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
  const address =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  const now = Date.now();
  const recent = (attemptsByAddress.get(address) ?? []).filter(
    (attempt) => now - attempt < RATE_LIMIT_WINDOW,
  );
  if (recent.length >= RATE_LIMIT_MAX) {
    attemptsByAddress.set(address, recent);
    return true;
  }
  recent.push(now);
  attemptsByAddress.set(address, recent);
  return false;
}

function getSlots(value: unknown): AppointmentSlot[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  return value.flatMap((entry) => {
    if (!entry || typeof entry !== "object") return [];
    const slot = entry as Record<string, unknown>;
    const token = typeof slot.token === "string" ? slot.token : "";
    const label = typeof slot.label === "string" ? slot.label.trim() : "";
    const start = typeof slot.start === "string" ? new Date(slot.start) : null;
    const end = typeof slot.end === "string" ? new Date(slot.end) : null;
    const valid =
      token.length >= 20 &&
      token.length <= 2048 &&
      !seen.has(token) &&
      label.length > 0 &&
      label.length <= 120 &&
      start !== null &&
      end !== null &&
      Number.isFinite(start.getTime()) &&
      Number.isFinite(end.getTime()) &&
      start < end;
    if (!valid) return [];
    seen.add(token);
    return [{ token, label, start: start.toISOString(), end: end.toISOString() }];
  }).slice(0, 8);
}

function appointment(value: unknown) {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  const label = typeof item.label === "string" ? item.label.trim().slice(0, 160) : "";
  const start = typeof item.start === "string" ? item.start : "";
  const end = typeof item.end === "string" ? item.end : "";
  return label ? { label, start, end } : null;
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return jsonResponse({ error: "Request origin is not allowed." }, 403);
  }
  if (isRateLimited(request)) {
    return jsonResponse({ error: "Please wait a moment before trying again." }, 429);
  }

  let payload: ManageRequest;
  try {
    payload = await request.json() as ManageRequest;
  } catch {
    return jsonResponse({ error: "Invalid request." }, 400);
  }
  const managementToken = typeof payload.managementToken === "string"
    ? payload.managementToken.trim()
    : "";
  const action = typeof payload.action === "string" ? payload.action : "";
  const slotToken = typeof payload.slotToken === "string" ? payload.slotToken.trim() : "";
  if (
    managementToken.length < 20 ||
    managementToken.length > 2048 ||
    !["view", "availability", "reschedule", "cancel"].includes(action) ||
    (action === "reschedule" && (slotToken.length < 20 || slotToken.length > 2048))
  ) {
    return jsonResponse({ error: "This appointment link or selection is invalid." }, 400);
  }

  const apiUrl = process.env.SIGNMONS_API_URL?.replace(/\/$/, "");
  const integrationKey = process.env.SIGNMONS_WEBCHAT_KEY;
  if (!apiUrl || !integrationKey) {
    return jsonResponse({ error: "Appointment management is temporarily unavailable." }, 503);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);
  try {
    const response = await fetch(`${apiUrl}/api/integrations/webchat/appointments/manage`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${integrationKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ managementToken, action, ...(slotToken ? { slotToken } : {}) }),
      signal: controller.signal,
    });
    const result = await response.json().catch(() => ({})) as Record<string, unknown>;
    if (!response.ok) {
      const status = response.status === 409 ? 409 : response.status === 429 ? 429 : 502;
      const fallback = status === 409
        ? "This appointment changed while you were viewing it. Please refresh."
        : "We could not update the appointment. Please call Eternity at 216-703-3183.";
      const error = typeof result.message === "string" && result.message.length <= 240
        ? result.message
        : fallback;
      return jsonResponse({ error }, status);
    }

    const safeAppointment = appointment(result.appointment);
    const reference = typeof result.reference === "string"
      ? result.reference.replace(/[^A-Z0-9]/gi, "").slice(0, 12).toUpperCase()
      : "";
    if (action === "view" && result.status === "appointment_details" && safeAppointment && reference) {
      return jsonResponse({
        status: result.status,
        state: result.state === "cancelled" ? "cancelled" : "confirmed",
        reference,
        appointment: safeAppointment,
      });
    }
    if (action === "availability" && result.status === "appointment_availability" && safeAppointment) {
      const slots = getSlots(result.slots);
      if (!slots.length) return jsonResponse({ error: "No alternate times are currently available." }, 409);
      return jsonResponse({ status: result.status, appointment: safeAppointment, slots });
    }
    if (action === "reschedule" && result.status === "appointment_rescheduled" && safeAppointment) {
      return jsonResponse({ status: result.status, reference, appointment: safeAppointment });
    }
    if (action === "cancel" && result.status === "appointment_cancelled" && reference) {
      return jsonResponse({ status: result.status, reference });
    }
    return jsonResponse({ error: "We could not verify the appointment update." }, 502);
  } catch {
    return jsonResponse({ error: "We could not update the appointment. Please call 216-703-3183." }, 502);
  } finally {
    clearTimeout(timeout);
  }
}

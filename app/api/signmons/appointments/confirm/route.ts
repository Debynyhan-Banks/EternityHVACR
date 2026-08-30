type ConfirmationRequest = {
  sessionId?: unknown;
  jobId?: unknown;
  slotToken?: unknown;
};

const NO_STORE_HEADERS = { "cache-control": "no-store" };

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

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return jsonResponse({ error: "Request origin is not allowed." }, 403);
  }

  let payload: ConfirmationRequest;
  try {
    payload = await request.json() as ConfirmationRequest;
  } catch {
    return jsonResponse({ error: "Invalid request." }, 400);
  }

  const sessionId = typeof payload.sessionId === "string" ? payload.sessionId.trim() : "";
  const jobId = typeof payload.jobId === "string" ? payload.jobId.trim() : "";
  const slotToken = typeof payload.slotToken === "string" ? payload.slotToken.trim() : "";
  if (
    !/^[A-Za-z0-9_-]{4,64}$/.test(sessionId) ||
    !/^[0-9a-f-]{36}$/i.test(jobId) ||
    slotToken.length < 20 ||
    slotToken.length > 2048
  ) {
    return jsonResponse({ error: "That appointment choice is invalid." }, 400);
  }

  const apiUrl = process.env.SIGNMONS_API_URL?.replace(/\/$/, "");
  const integrationKey = process.env.SIGNMONS_WEBCHAT_KEY;
  if (!apiUrl || !integrationKey) {
    return jsonResponse({ error: "Instant booking is temporarily unavailable." }, 503);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);
  try {
    const response = await fetch(`${apiUrl}/api/integrations/webchat/appointments/confirm`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${integrationKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ sessionId, jobId, slotToken }),
      signal: controller.signal,
    });
    const result = await response.json().catch(() => ({})) as {
      status?: unknown;
      appointment?: { label?: unknown };
      message?: unknown;
    };
    if (!response.ok) {
      const status = response.status === 409 ? 409 : 502;
      const message = status === 409
        ? "That appointment was just taken. Please choose another time."
        : "We could not confirm that appointment. Please try again or call Eternity.";
      return jsonResponse({ error: message }, status);
    }

    if (result.status !== "appointment_confirmed") {
      return jsonResponse(
        { error: "We could not verify that appointment. Please try again or call Eternity." },
        502,
      );
    }

    const appointmentLabel = typeof result.appointment?.label === "string"
      ? result.appointment.label.trim().slice(0, 160)
      : "";
    const jobReference = jobId.replace(/-/g, "").slice(0, 8).toUpperCase();

    return jsonResponse({
      status: "appointment_confirmed",
      appointmentLabel: appointmentLabel || "Your selected arrival window",
      jobReference,
    });
  } catch {
    return jsonResponse(
      { error: "We could not confirm that appointment. Please try again or call 216-703-3183." },
      502,
    );
  } finally {
    clearTimeout(timeout);
  }
}

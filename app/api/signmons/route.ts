const attemptsByAddress = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 12;

type SignmonsRequest = {
  sessionId?: unknown;
  message?: unknown;
  website?: unknown;
};

type SignmonsResponse = {
  status?: unknown;
  reply?: unknown;
  message?: unknown;
  requiresHumanHandoff?: unknown;
  emergencyServicesRecommended?: unknown;
  job?: { id?: unknown };
  slots?: unknown;
};

type AppointmentSlot = {
  token: string;
  start: string;
  end: string;
  label: string;
};

function getSlots(payload: SignmonsResponse): AppointmentSlot[] {
  if (!Array.isArray(payload.slots)) return [];
  return payload.slots
    .flatMap((slot) => {
      if (!slot || typeof slot !== "object") return [];
      const value = slot as Record<string, unknown>;
      return typeof value.token === "string" &&
        typeof value.start === "string" &&
        typeof value.end === "string" &&
        typeof value.label === "string"
        ? [
            {
              token: value.token,
              start: value.start,
              end: value.end,
              label: value.label,
            },
          ]
        : [];
    })
    .slice(0, 8);
}

function getJobReference(payload: SignmonsResponse) {
  const id = payload.job?.id;
  return typeof id === "string"
    ? id.replace(/-/g, "").slice(0, 8).toUpperCase()
    : "";
}

function isAllowedOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const originUrl = new URL(origin);
    const requestUrl = new URL(request.url);
    return (
      originUrl.host === requestUrl.host || originUrl.hostname === "localhost"
    );
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

function getReply(payload: SignmonsResponse) {
  if (payload.status === "job_created") {
    const reference = getJobReference(payload);
    return `Your request was recorded successfully${reference ? ` — reference ${reference}` : ""}. Eternity will follow up using the contact information you provided. This is not an appointment confirmation.`;
  }

  if (typeof payload.reply === "string" && payload.reply.trim()) {
    const reply = payload.reply.trim().slice(0, 4000);
    if (
      looksLikeUnverifiedSubmissionClaim(reply) &&
      !getJobReference(payload)
    ) {
      return "Your request has not been submitted yet. Please continue until you receive a reference number, or call or text 216-703-3183 for help.";
    }
    return reply;
  }

  if (typeof payload.message === "string" && payload.message.trim()) {
    return payload.message.trim().slice(0, 4000);
  }

  return "I could not complete that response. Please call or text Eternity Mechanical Services at 216-703-3183.";
}

function looksLikeUnverifiedSubmissionClaim(reply: string) {
  return [
    /\b(?:we|i) (?:have )?received your (?:message|request)\b/i,
    /\brequest (?:has been |was )?(?:submitted|received|recorded|saved)\b/i,
    /\b(?:will|i'll) (?:pass|send|forward) (?:this|your) information\b/i,
    /\b(?:our|the human) team (?:will|'ll) (?:follow up|reach out|contact you)\b/i,
  ].some((pattern) => pattern.test(reply));
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return Response.json(
      { error: "Request origin is not allowed." },
      { status: 403 },
    );
  }

  if (isRateLimited(request)) {
    return Response.json(
      { error: "Please wait a moment before sending another message." },
      { status: 429 },
    );
  }

  let payload: SignmonsRequest;
  try {
    payload = (await request.json()) as SignmonsRequest;
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const sessionId =
    typeof payload.sessionId === "string" ? payload.sessionId.trim() : "";
  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";
  const website =
    typeof payload.website === "string" ? payload.website.trim() : "";

  if (
    website ||
    !/^[A-Za-z0-9_-]{4,64}$/.test(sessionId) ||
    message.length < 1 ||
    message.length > 1000
  ) {
    return Response.json(
      { error: "Please enter a message of 1,000 characters or fewer." },
      { status: 400 },
    );
  }

  const apiUrl = process.env.SIGNMONS_API_URL?.replace(/\/$/, "");
  const integrationKey = process.env.SIGNMONS_WEBCHAT_KEY;
  if (!apiUrl || !integrationKey) {
    return Response.json(
      {
        error:
          "The automated assistant is temporarily unavailable. Please call or text 216-703-3183.",
      },
      { status: 503 },
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20_000);

  try {
    const response = await fetch(`${apiUrl}/api/integrations/webchat/triage`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${integrationKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ sessionId, message }),
      signal: controller.signal,
    });

    const result = (await response
      .json()
      .catch(() => ({}))) as SignmonsResponse;
    if (!response.ok) {
      const status = response.status === 429 ? 429 : 502;
      const error =
        response.status === 429
          ? "The assistant is receiving many requests. Please wait a moment or call 216-703-3183."
          : "The assistant could not respond. Please call or text Eternity Mechanical Services at 216-703-3183.";
      return Response.json({ error }, { status });
    }

    return Response.json({
      status: typeof result.status === "string" ? result.status : "reply",
      reply: getReply(result),
      requiresHumanHandoff: result.requiresHumanHandoff === true,
      emergencyServicesRecommended:
        result.emergencyServicesRecommended === true,
      jobReference: getJobReference(result) || undefined,
      jobId: typeof result.job?.id === "string" ? result.job.id : undefined,
      slots: getSlots(result),
    });
  } catch {
    return Response.json(
      {
        error:
          "The assistant could not respond. Please call or text Eternity Mechanical Services at 216-703-3183.",
      },
      { status: 502 },
    );
  } finally {
    clearTimeout(timeout);
  }
}

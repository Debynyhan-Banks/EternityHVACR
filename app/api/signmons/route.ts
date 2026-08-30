const attemptsByAddress = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX = 12;

type SignmonsRequest = {
  sessionId?: unknown;
  message?: unknown;
  website?: unknown;
  attribution?: unknown;
};

type LeadAttribution = {
  channel: "website_chat";
  landingPage?: string;
  sourcePage?: string;
  referrerHost?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
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

const NO_STORE_HEADERS = { "cache-control": "no-store" };
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function jsonResponse(body: unknown, status = 200) {
  return Response.json(body, { status, headers: NO_STORE_HEADERS });
}

function getJobId(payload: SignmonsResponse) {
  const id = payload.job?.id;
  return typeof id === "string" && UUID_PATTERN.test(id) ? id : "";
}

function getSlots(payload: SignmonsResponse): AppointmentSlot[] {
  if (!Array.isArray(payload.slots)) return [];
  const seenTokens = new Set<string>();
  return payload.slots
    .flatMap((slot) => {
      if (!slot || typeof slot !== "object") return [];
      const value = slot as Record<string, unknown>;
      const start = typeof value.start === "string" ? new Date(value.start) : null;
      const end = typeof value.end === "string" ? new Date(value.end) : null;
      const token = typeof value.token === "string" ? value.token : "";
      const label = typeof value.label === "string" ? value.label.trim() : "";
      const isValid =
        token.length >= 20 &&
        token.length <= 2048 &&
        !seenTokens.has(token) &&
        start !== null &&
        end !== null &&
        Number.isFinite(start.getTime()) &&
        Number.isFinite(end.getTime()) &&
        start < end &&
        label.length > 0 &&
        label.length <= 120;
      if (isValid) seenTokens.add(token);
      return isValid
        ? [
            {
              token,
              start: start.toISOString(),
              end: end.toISOString(),
              label,
            },
          ]
        : [];
    })
    .slice(0, 8);
}

function getJobReference(payload: SignmonsResponse) {
  const id = getJobId(payload);
  return id
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
    if (!reference) return unverifiedSubmissionMessage();
    return `Your request was recorded successfully — reference ${reference}. Eternity will follow up using the contact information you provided. This is not an appointment confirmation.`;
  }

  if (typeof payload.reply === "string" && payload.reply.trim()) {
    return verifiedReply(payload.reply, payload);
  }

  if (typeof payload.message === "string" && payload.message.trim()) {
    return verifiedReply(payload.message, payload);
  }

  return "I could not complete that response. Please call or text Eternity Mechanical Services at 216-703-3183.";
}

function verifiedReply(value: string, payload: SignmonsResponse) {
  const reply = value.trim().slice(0, 4000);
  return looksLikeUnverifiedSubmissionClaim(reply) && !getJobReference(payload)
    ? unverifiedSubmissionMessage()
    : reply;
}

function unverifiedSubmissionMessage() {
  return "Your request has not been submitted yet. Please continue until you receive a reference number, or call or text 216-703-3183 for help.";
}

function looksLikeUnverifiedSubmissionClaim(reply: string) {
  return [
    /\b(?:we|i) (?:have )?received your (?:message|request)\b/i,
    /\brequest (?:has been |was )?(?:submitted|received|recorded|saved)\b/i,
    /\b(?:will|i'll) (?:pass|send|forward) (?:this|your) information\b/i,
    /\b(?:our|the human) team (?:will|'ll) (?:follow up|reach out|contact you)\b/i,
  ].some((pattern) => pattern.test(reply));
}

function getLeadAttribution(value: unknown): LeadAttribution | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  if (input.channel !== "website_chat") return null;
  const path = (candidate: unknown) =>
    typeof candidate === "string" &&
    candidate.length <= 200 &&
    /^\/[A-Za-z0-9/_-]*$/.test(candidate)
      ? candidate
      : undefined;
  const text = (candidate: unknown, limit: number) =>
    typeof candidate === "string" &&
    candidate.trim().length > 0 &&
    candidate.trim().length <= limit
      ? candidate.trim()
      : undefined;
  const referrerHost = text(input.referrerHost, 253);
  if (referrerHost && !/^[A-Za-z0-9.-]+$/.test(referrerHost)) return null;

  return {
    channel: "website_chat",
    landingPage: path(input.landingPage),
    sourcePage: path(input.sourcePage),
    referrerHost: referrerHost?.toLowerCase(),
    utmSource: text(input.utmSource, 100),
    utmMedium: text(input.utmMedium, 100),
    utmCampaign: text(input.utmCampaign, 160),
  };
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return jsonResponse({ error: "Request origin is not allowed." }, 403);
  }

  if (isRateLimited(request)) {
    return jsonResponse({ error: "Please wait a moment before sending another message." }, 429);
  }

  let payload: SignmonsRequest;
  try {
    payload = (await request.json()) as SignmonsRequest;
  } catch {
    return jsonResponse({ error: "Invalid request." }, 400);
  }

  const sessionId =
    typeof payload.sessionId === "string" ? payload.sessionId.trim() : "";
  const message =
    typeof payload.message === "string" ? payload.message.trim() : "";
  const website =
    typeof payload.website === "string" ? payload.website.trim() : "";
  const attribution = getLeadAttribution(payload.attribution);

  if (
    website ||
    !attribution ||
    !/^[A-Za-z0-9_-]{4,64}$/.test(sessionId) ||
    message.length < 1 ||
    message.length > 1000
  ) {
    return jsonResponse({ error: "Please enter a message of 1,000 characters or fewer." }, 400);
  }

  const apiUrl = process.env.SIGNMONS_API_URL?.replace(/\/$/, "");
  const integrationKey = process.env.SIGNMONS_WEBCHAT_KEY;
  if (!apiUrl || !integrationKey) {
    return jsonResponse(
      {
        error:
          "The automated assistant is temporarily unavailable. Please call or text 216-703-3183.",
      },
      503,
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
      body: JSON.stringify({ sessionId, message, attribution }),
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
      return jsonResponse({ error }, status);
    }

    const jobId = getJobId(result);
    const slots = getSlots(result);
    if (
      (result.status === "job_created" && !jobId) ||
      (result.status === "availability" && (!jobId || slots.length === 0))
    ) {
      return jsonResponse(
        {
          error:
            "The assistant could not verify that the request was saved. Please try again or call or text 216-703-3183.",
        },
        502,
      );
    }

    return jsonResponse({
      status: typeof result.status === "string" ? result.status : "reply",
      reply: getReply(result),
      requiresHumanHandoff: result.requiresHumanHandoff === true,
      emergencyServicesRecommended:
        result.emergencyServicesRecommended === true,
      jobReference: getJobReference(result) || undefined,
      jobId: jobId || undefined,
      slots,
    });
  } catch {
    return jsonResponse(
      {
        error:
          "The assistant could not respond. Please call or text Eternity Mechanical Services at 216-703-3183.",
      },
      502,
    );
  } finally {
    clearTimeout(timeout);
  }
}

export type LeadChannel = "website_chat" | "website_service_request";

export type LeadAttribution = {
  channel: LeadChannel;
  landingPage: string;
  sourcePage: string;
  referrerHost?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

type FirstTouchAttribution = Omit<LeadAttribution, "channel" | "sourcePage">;

const ATTRIBUTION_STORAGE_KEY = "eternity_lead_attribution";

function currentPath() {
  return window.location.pathname.slice(0, 200) || "/";
}

function getReferrerHost() {
  if (!document.referrer) return undefined;
  try {
    return new URL(document.referrer).hostname.toLowerCase().slice(0, 253) || undefined;
  } catch {
    return undefined;
  }
}

function campaignValue(name: string, maximum: number) {
  return new URLSearchParams(window.location.search).get(name)?.trim().slice(0, maximum) || undefined;
}

function readFirstTouch(): Partial<FirstTouchAttribution> {
  try {
    return JSON.parse(sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY) ?? "{}") as Partial<FirstTouchAttribution>;
  } catch {
    return {};
  }
}

export function initializeLeadAttribution(): FirstTouchAttribution {
  const stored = readFirstTouch();
  const firstTouch: FirstTouchAttribution = {
    landingPage: stored.landingPage ?? currentPath(),
    referrerHost: stored.referrerHost ?? getReferrerHost(),
    utmSource: stored.utmSource ?? campaignValue("utm_source", 100),
    utmMedium: stored.utmMedium ?? campaignValue("utm_medium", 100),
    utmCampaign: stored.utmCampaign ?? campaignValue("utm_campaign", 160),
  };

  try {
    sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(firstTouch));
  } catch {
    // Attribution is an enhancement; website requests still work if storage is blocked.
  }

  return firstTouch;
}

export function captureLeadAttribution(channel: LeadChannel): LeadAttribution {
  const firstTouch = initializeLeadAttribution();
  return {
    channel,
    landingPage: firstTouch.landingPage,
    sourcePage: currentPath(),
    referrerHost: firstTouch.referrerHost,
    utmSource: firstTouch.utmSource,
    utmMedium: firstTouch.utmMedium,
    utmCampaign: firstTouch.utmCampaign,
  };
}

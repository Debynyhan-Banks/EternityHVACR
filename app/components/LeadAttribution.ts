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

export function initializeLeadAttribution(): FirstTouchAttribution | undefined {
  try { return window.eternityAnalytics?.getAttribution(); } catch { return undefined; }
}

export function captureLeadAttribution(channel: LeadChannel): LeadAttribution {
  const firstTouch = initializeLeadAttribution();
  return {
    channel,
    // Empty means unknown, not a manufactured homepage/direct visit. The
    // existing endpoint normalizes unknown paths to its historical homepage
    // fallback; no new source or campaign classification is manufactured here.
    landingPage: firstTouch?.landingPage ?? "",
    sourcePage: window.eternityAnalytics?.isPublicPage() ? window.location.pathname : "",
    referrerHost: firstTouch?.referrerHost,
    utmSource: firstTouch?.utmSource,
    utmMedium: firstTouch?.utmMedium,
    utmCampaign: firstTouch?.utmCampaign,
  };
}

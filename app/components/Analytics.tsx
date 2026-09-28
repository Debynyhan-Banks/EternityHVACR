"use client";

import type { LeadAttribution } from "./LeadAttribution";

declare global {
  interface Window {
    eternityAnalytics?: {
      track: (name: string, parameters?: Record<string, string | number | boolean>) => void;
      isPublicPage: () => boolean;
      getAttribution: () => Omit<LeadAttribution, "channel" | "sourcePage"> | undefined;
    };
  }
}

export function trackGoogleEvent(name: string, parameters: Record<string, string | number | boolean> = {}) {
  try {
    window.eternityAnalytics?.track(name, parameters);
  } catch {
    // A blocked tag or failed analytics sink cannot break service operations.
  }
}

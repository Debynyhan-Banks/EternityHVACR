"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackGoogleEvent(name: string, parameters: Record<string, string | number | boolean> = {}) {
  window.gtag?.("event", name, parameters);
}

export default function AnalyticsEvents() {
  useEffect(() => {
    function trackContactClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;

      const reviewLink = event.target.closest<HTMLAnchorElement>("a[data-review-link]");
      if (reviewLink) {
        trackGoogleEvent("review_link_click", {
          link_location: window.location.pathname,
          link_url: reviewLink.href,
        });
      }

      const link = event.target.closest<HTMLAnchorElement>('a[href^="tel:"], a[href^="mailto:"]');
      if (!link) return;

      trackGoogleEvent(link.href.startsWith("tel:") ? "phone_click" : "email_click", {
        link_location: window.location.pathname,
      });
    }

    document.addEventListener("click", trackContactClick);
    return () => document.removeEventListener("click", trackContactClick);
  }, []);

  return null;
}

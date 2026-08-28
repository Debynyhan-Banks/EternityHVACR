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

const aiSources: Array<[string, string]> = [
  ["chatgpt", "chatgpt"], ["openai", "chatgpt"], ["perplexity", "perplexity"],
  ["gemini", "gemini"], ["copilot", "copilot"], ["claude", "claude"], ["meta.ai", "meta_ai"],
];

function detectAiSource() {
  const campaignSource = new URLSearchParams(window.location.search).get("utm_source")?.toLowerCase() ?? "";
  const referrerHost = document.referrer ? new URL(document.referrer).hostname.toLowerCase() : "";
  const match = aiSources.find(([pattern]) => campaignSource.includes(pattern) || referrerHost.includes(pattern));
  return match?.[1] ?? null;
}

export default function AnalyticsEvents() {
  useEffect(() => {
    const aiSource = detectAiSource();
    if (aiSource && !sessionStorage.getItem("eternity_ai_referral_tracked")) {
      trackGoogleEvent("ai_referral_visit", {
        ai_source: aiSource,
        landing_page: window.location.pathname,
      });
      sessionStorage.setItem("eternity_ai_referral_tracked", "true");
    }

    function trackContactClick(event: MouseEvent) {
      if (!(event.target instanceof Element)) return;

      const reviewLink = event.target.closest<HTMLAnchorElement>("a[data-review-link]");
      if (reviewLink) {
        trackGoogleEvent("review_link_click", {
          link_location: window.location.pathname,
          link_url: reviewLink.href,
        });
      }

      const link = event.target.closest<HTMLAnchorElement>('a[href^="tel:"], a[href^="mailto:"], a[href^="sms:"]');
      if (!link) return;

      const eventName = link.href.startsWith("tel:")
        ? "phone_click"
        : link.href.startsWith("sms:")
          ? "text_click"
          : "email_click";

      trackGoogleEvent(eventName, {
        link_location: window.location.pathname,
      });
    }

    document.addEventListener("click", trackContactClick);
    return () => document.removeEventListener("click", trackContactClick);
  }, []);

  return null;
}

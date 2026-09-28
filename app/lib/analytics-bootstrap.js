// Runs in <head> before React or the Google tag. Keep this function self-contained:
// the server embeds its source, and the browser tests execute the rendered script.
export function installAnalytics(config) {
  if (window.eternityAnalytics) return;
  const id = config.id;
  const disableKey = `ga-disable-${id}`;
  const externallyDisabled = window[disableKey] === true;
  let stopped = externallyDisabled;
  let configured = false;
  let lastPage = "";
  let currentReferrer;
  let timer;
  let firstTouch;
  const aiVisits = new Set();
  const storageKey = "eternity_lead_attribution";

  function parse(value, base = window.location.origin) {
    try { return new URL(value, base); } catch { return null; }
  }
  function publicPath(value) {
    return typeof value === "string" && config.paths.includes(value) ? value : undefined;
  }
  function publicUrl(value) {
    const url = parse(value);
    if (url?.origin !== window.location.origin || !publicPath(url.pathname)) return null;
    // Fail closed for unrecognized URL data rather than trusting remote enhanced
    // measurement not to inspect the real URL. Never mutate operational URLs.
    if (url.hash && !config.anchors.includes(url.hash.slice(1))) return null;
    const values = { utm_source: config.sources, utm_medium: config.mediums,
      utm_campaign: config.campaigns, estimateScope: config.enums.estimator_project, serviceScope: config.serviceScopes };
    for (const [key, value] of url.searchParams) {
      if (!Object.hasOwn(values, key) || !values[key].includes(value) || url.searchParams.getAll(key).length !== 1) return null;
    }
    return url;
  }
  function eligible() {
    return !stopped && window[disableKey] !== true && Boolean(publicUrl(window.location.href));
  }
  function storageGet(key) {
    try { return sessionStorage.getItem(key); } catch { return null; }
  }
  function storageSet(key, value) {
    try { sessionStorage.setItem(key, value); } catch { /* Optional measurement. */ }
  }
  function allowed(value, values) {
    return typeof value === "string" && values.includes(value) ? value : undefined;
  }
  function campaign() {
    const query = parse(window.location.href)?.searchParams;
    return {
      utmSource: allowed(query?.get("utm_source")?.toLowerCase(), config.sources),
      utmMedium: allowed(query?.get("utm_medium")?.toLowerCase(), config.mediums),
      // No named campaigns have been approved yet. Unknown/free text is discarded.
      utmCampaign: allowed(query?.get("utm_campaign"), config.campaigns),
    };
  }
  function referrer() {
    const url = parse(document.referrer, "https://invalid.example");
    if (!url || !["https:", "http:"].includes(url.protocol) || url.username || url.password) return "";
    if (url.origin === window.location.origin) {
      return publicPath(url.pathname) ? `${config.origin}${url.pathname}` : "";
    }
    // Reduce known subdomains to a fixed public domain. Unknown origins stay unknown.
    const host = [...config.referrers].sort((a, b) => b.length - a.length).find((host) => url.hostname === host || url.hostname.endsWith(`.${host}`));
    return host ? `https://${host}/` : "";
  }
  function pageFields() {
    const url = publicUrl(window.location.href);
    return {
      page_location: url ? `${config.origin}${url.pathname}` : config.origin,
      page_referrer: currentReferrer ?? referrer(),
      page_title: url ? `Eternity Mechanical Services | ${url.pathname}` : "Eternity Mechanical Services",
    };
  }
  function getAttribution() {
    if (!eligible()) return undefined;
    if (firstTouch) return { ...firstTouch };
    let stored;
    try { stored = JSON.parse(storageGet(storageKey) ?? "null"); } catch { /* Ignore malformed state. */ }
    if (stored && typeof stored === "object" && publicPath(stored.landingPage)) {
      firstTouch = {
        landingPage: stored.landingPage,
        referrerHost: allowed(stored.referrerHost, config.referrers),
        utmSource: allowed(stored.utmSource, config.sources),
        utmMedium: allowed(stored.utmMedium, config.mediums),
        utmCampaign: allowed(stored.utmCampaign, config.campaigns),
      };
    } else {
      const safeReferrer = parse(referrer());
      firstTouch = {
        landingPage: window.location.pathname,
        referrerHost: safeReferrer && config.referrers.includes(safeReferrer.hostname) ? safeReferrer.hostname : undefined,
        ...campaign(),
      };
    }
    storageSet(storageKey, JSON.stringify(firstTouch));
    return { ...firstTouch };
  }
  function stop() {
    stopped = true;
    window[disableKey] = true;
    window.clearTimeout(timer);
    // Discard queued commands if navigation precedes tag load.
    window.dataLayer?.splice(0);
  }
  function command() {
    // gtag uses Arguments objects, not a second independent queue or tag.
    window.dataLayer.push(arguments);
  }
  function insertTag() {
    if (!eligible() || document.querySelector("script[data-eternity-analytics]")) return;
    const script = document.createElement("script");
    script.async = true;
    script.referrerPolicy = "no-referrer";
    script.dataset.eternityAnalytics = "true";
    script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.appendChild(script);
  }
  function configure() {
    if (configured || !eligible()) return;
    configured = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = command;
    command("js", new Date());
    getAttribution();
    const entryCampaign = campaign();
    const fields = pageFields();
    // Explicit empty campaign fields suppress arbitrary URL UTM values. They do
    // not invent 'direct'/'none'; GA can still use the sanitized native referrer.
    command("config", id, {
      ...fields,
      send_page_view: false,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      campaign_source: entryCampaign.utmSource ?? "",
      campaign_medium: entryCampaign.utmMedium ?? "",
      campaign_name: entryCampaign.utmCampaign ?? "",
      campaign_id: "", campaign_term: "", campaign_content: "",
    });
  }
  function cleanParameters(parameters) {
    const clean = {};
    for (const [key, value] of Object.entries(parameters ?? {})) {
      if (config.pathParameters.includes(key) && publicPath(value)) clean[key] = value;
      else if (config.enums[key]?.includes(value)) clean[key] = value;
      else if (key === "safety_handoff" && typeof value === "boolean") clean[key] = value;
      else if (key === "completed_step" && Number.isInteger(value) && value >= 1 && value <= 3) clean[key] = value;
      else if (key === "service_area_market_count" && Number.isInteger(value) && value >= 0 && value <= 100) clean[key] = value;
      else if (key === "failure_status" && Number.isInteger(value) && value >= 400 && value <= 599) clean[key] = value;
    }
    return clean;
  }
  function track(name, parameters = {}) {
    if (!eligible() || !config.events.includes(name)) return;
    try {
      configure();
      command("event", name, { ...cleanParameters(parameters), ...pageFields() });
      // A quick contact action starts loading immediately without delaying its link.
      insertTag();
    } catch { /* Analytics must never change a successful request into an error. */ }
  }
  function pageView() {
    if (!eligible()) { stop(); return; }
    const path = window.location.pathname;
    if (lastPage === path) return;
    if (lastPage) currentReferrer = `${config.origin}${lastPage}`;
    lastPage = path;
    configure();
    command("set", pageFields());
    command("event", "page_view", pageFields());
  }
  function detectAiSource() {
    const source = campaign().utmSource;
    const host = parse(referrer())?.hostname;
    return config.aiSources[source] ?? config.aiSources[host] ?? null;
  }
  function aiVisit() {
    const source = detectAiSource();
    if (!source || aiVisits.has(source) || storageGet(`eternity_ai_referral_${source}`)) return;
    aiVisits.add(source);
    storageSet(`eternity_ai_referral_${source}`, "true");
    track("ai_referral_visit", { ai_source: source, landing_page: window.location.pathname });
  }

  window.eternityAnalytics = { track, getAttribution, isPublicPage: eligible };
  // Route changes across the privacy boundary must get a fresh document: a
  // previously loaded Google library cannot be unloaded by a late React effect.
  for (const method of ["pushState", "replaceState"]) {
    const original = history[method];
    history[method] = function (state, unused, value) {
      const next = value == null ? parse(window.location.href) : parse(String(value));
      if (next?.origin === window.location.origin &&
          (!publicUrl(window.location.href) || !publicUrl(next.href)) &&
          next.href !== window.location.href) {
        stop();
        if (method === "replaceState") window.location.replace(next.href);
        else window.location.assign(next.href);
        return;
      }
      const result = original.call(this, state, unused, value);
      if (!publicUrl(window.location.href)) stop();
      else pageView();
      return result;
    };
  }
  window.addEventListener("popstate", pageView);
  window.addEventListener("hashchange", () => { if (!publicUrl(window.location.href)) stop(); });
  window.addEventListener("pagehide", stop);
  window.addEventListener("pageshow", (event) => {
    // BFCache can restore an old third-party tag with its listeners. Reload
    // rather than reopening it with private history/referrer state.
    if (event.persisted) window.location.reload();
  });
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const link = event.target.closest("a[href]");
    if (!link) return;
    const url = parse(link.href);
    if (url?.origin === window.location.origin && !publicUrl(url.href)) {
      // Run in capture phase, before enhanced-measurement click listeners.
      stop();
      return;
    }
    if (link.matches("[data-review-link]")) track("review_link_click", { link_location: window.location.pathname });
    const name = { "tel:": "phone_click", "sms:": "text_click", "mailto:": "email_click" }[url?.protocol];
    if (name) track(name, { link_location: window.location.pathname });
  }, true);

  if (!publicUrl(window.location.href) || externallyDisabled) { stop(); return; }
  pageView();
  // Keep the established delay for passive visits; immediate contacts bypass it.
  const schedule = () => { timer = window.setTimeout(insertTag, 2500); };
  if (document.readyState === "complete") schedule();
  else window.addEventListener("load", schedule, { once: true });
  aiVisit();
}

export const analyticsConfig = {
  id: "G-32W3PBPD8Y",
  origin: "https://eternityhvacr.com",
  // Explicit public pages: new/private/unknown routes fail closed until reviewed.
  paths: ["/", "/estimate", "/privacy", "/terms", "/areas-we-serve", "/areas-we-serve/euclid-oh", "/areas-we-serve/cleveland-heights-oh", "/projects", "/projects/euclid-central-air-installation", "/projects/euclid-payne-hvac-installation", "/resources", "/resources/commercial-refrigeration-maintenance-frequency", "/resources/furnace-repair-vs-replacement", "/resources/rooftop-hvac-short-cycling", "/resources/walk-in-cooler-icing-up", "/services/air-conditioning-installation", "/services/air-conditioning-repair", "/services/boiler-service", "/services/commercial-hvac", "/services/commercial-refrigeration", "/services/emergency-hvac-r", "/services/furnace-heating-repair", "/services/heat-pump-service", "/services/preventive-maintenance"],
  anchors: ["main-content", "top", "services", "about", "commercial", "contact", "diagnostics", "maintenance", "pathways", "pricing", "pricing-preview-heading", "projects", "reviews", "schedule", "baseline-inclusions", "estimate-evidence-title", "historical-pricing-heading", "pricing-heading", "pricing-method-heading", "euclid-project-gallery-heading", "payne-project-gallery-heading"],
  sources: ["google", "bing", "facebook", "instagram", "linkedin", "newsletter", "gbp", "chatgpt", "openai", "perplexity", "gemini", "copilot", "claude", "meta.ai"],
  mediums: ["organic", "referral", "email", "social", "cpc", "paid_social"],
  campaigns: [],
  serviceScopes: ["furnace-heating-repair", "boiler-service", "commercial-refrigeration"],
  referrers: ["google.com", "bing.com", "facebook.com", "instagram.com", "linkedin.com", "chatgpt.com", "chat.openai.com", "perplexity.ai", "gemini.google.com", "copilot.microsoft.com", "claude.ai", "meta.ai"],
  aiSources: { chatgpt: "chatgpt", openai: "chatgpt", "chatgpt.com": "chatgpt", "chat.openai.com": "chatgpt", perplexity: "perplexity", "perplexity.ai": "perplexity", gemini: "gemini", "gemini.google.com": "gemini", copilot: "copilot", "copilot.microsoft.com": "copilot", claude: "claude", "claude.ai": "claude", "meta.ai": "meta_ai" },
  events: ["phone_click", "text_click", "email_click", "review_link_click", "ai_referral_visit", "service_form_start", "service_form_step", "service_form_complete", "service_form_error", "generate_lead", "emergency_request", "service_area_check", "estimator_handoff_loaded", "project_estimator_scope_selected", "project_estimator_completed", "project_estimator_assistant_opened", "assistant_open", "assistant_estimator_context_received", "assistant_path_selected", "assistant_chat_started", "assistant_message_sent", "assistant_response_received", "assistant_appointment_failed", "assistant_appointment_confirmed", "assistant_handoff"],
  pathParameters: ["landing_page", "source_page", "link_location", "form_location"],
  enums: {
    ai_source: ["chatgpt", "perplexity", "gemini", "copilot", "claude", "meta_ai"],
    lead_source: ["website_service_request"],
    request_path: ["Emergency / system down", "Repair or diagnostic", "Installation estimate", "Commercial / refrigeration", "Preventive maintenance", "urgent", "cooling", "heating", "commercial", "estimate", "maintenance", "chat", "life_safety"],
    service_type: ["Air conditioning", "Heating", "Boiler", "Heat pump", "Commercial HVAC", "Refrigeration", "Installation", "Maintenance", "not_selected"],
    customer_type: ["My home", "A business", "A managed property", "not_selected"],
    requested_timing: ["Emergency / system down", "As soon as available", "Planning an estimate", "This week", "Routine maintenance"],
    service_area_result: ["approved", "confirmation_needed"],
    estimator_project: ["direct-furnace-swap", "boiler-conversion-attic-forced-air", "furnace-condenser-coil", "cooling-condenser-coil", "commercial-rtu"],
    estimate_scope: ["direct-furnace-swap", "boiler-conversion-attic-forced-air", "furnace-condenser-coil", "cooling-condenser-coil", "commercial-rtu"],
    assistant: ["signmons_router", "signmons_calldesk"],
    source: ["estimator"],
    response_status: ["reply", "availability", "job_created", "handoff"],
    handoff_method: ["call", "text", "email", "request_form"],
    property_type: ["home", "business", "managed", "not_selected"],
  },
};

export const analyticsBootstrap = `(${installAnalytics.toString()})(${JSON.stringify(analyticsConfig)});`;

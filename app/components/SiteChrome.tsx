/* eslint-disable @next/next/no-html-link-for-pages -- Vinext navigation intentionally uses native browser links; rendered route checks cover every static destination. */
"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

function currentPage(pathname: string, href: string, includeChildren = false) {
  const current = pathname.replace(/\/$/, "") || "/";
  const target = href.replace(/\/$/, "") || "/";
  return current === target || (includeChildren && target !== "/" && current.startsWith(`${target}/`))
    ? "page"
    : undefined;
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleNavigationEvent = (event: Event) => {
      if (event instanceof KeyboardEvent && event.key === "Escape") {
        const expanded = header.querySelector<HTMLDetailsElement>("details[open]");
        if (!expanded) return;
        expanded.open = false;
        expanded.querySelector<HTMLElement>("summary")?.focus();
        event.preventDefault();
        return;
      }

      if (event instanceof MouseEvent && event.target instanceof Element && event.target.closest("a")) {
        header.querySelectorAll<HTMLDetailsElement>("details[open]").forEach((menu) => { menu.open = false; });
      }
    };

    header.addEventListener("keydown", handleNavigationEvent);
    header.addEventListener("click", handleNavigationEvent);
    return () => {
      header.removeEventListener("keydown", handleNavigationEvent);
      header.removeEventListener("click", handleNavigationEvent);
    };
  }, []);

  return <>
    <a className="skip-link" href="#main-content">Skip to main content</a>
    <div className="topbar"><span>Black-owned • Licensed & insured • 15-minute response target</span><a href="tel:+12167033183">Emergency service available: 216-703-3183 <b>→</b></a></div>
    <header className="header" ref={headerRef}>
      <a className="logo-crop" href="/" aria-label="Eternity Mechanical Services home" aria-current={currentPage(pathname, "/")}><img src="/images/eternity-logo.svg" alt="Eternity Mechanical Services" /></a>
      <nav aria-label="Primary navigation" className="grouped-navigation">
        <details name="desktop-navigation">
          <summary>Services</summary>
          <div className="navigation-panel">
            <a href="/services/air-conditioning-repair" aria-current={currentPage(pathname, "/services/air-conditioning-repair")}>AC repair</a>
            <a href="/services/air-conditioning-installation" aria-current={currentPage(pathname, "/services/air-conditioning-installation")}>AC installation</a>
            <a href="/services/furnace-heating-repair" aria-current={currentPage(pathname, "/services/furnace-heating-repair")}>Furnace &amp; heating</a>
            <a href="/services/boiler-service" aria-current={currentPage(pathname, "/services/boiler-service")}>Boilers</a>
            <a href="/services/heat-pump-service" aria-current={currentPage(pathname, "/services/heat-pump-service")}>Heat pumps</a>
            <a href="/services/commercial-hvac" aria-current={currentPage(pathname, "/services/commercial-hvac")}>Commercial HVAC</a>
            <a href="/services/commercial-refrigeration" aria-current={currentPage(pathname, "/services/commercial-refrigeration")}>Refrigeration</a>
            <a href="/services/preventive-maintenance" aria-current={currentPage(pathname, "/services/preventive-maintenance")}>Maintenance</a>
            <a href="/services/emergency-hvac-r" aria-current={currentPage(pathname, "/services/emergency-hvac-r")}>Emergency HVAC/R</a>
          </div>
        </details>
        <details name="desktop-navigation">
          <summary>Pricing &amp; tools</summary>
          <div className="navigation-panel">
            <a href="/estimate" aria-current={currentPage(pathname, "/estimate")}>Cost estimator</a>
            <a href="/second-opinion" aria-current={currentPage(pathname, "/second-opinion")}>Second opinion</a>
            <a href="/resources" aria-current={currentPage(pathname, "/resources", true)}>Expert answers</a>
          </div>
        </details>
        <details name="desktop-navigation">
          <summary>Our company</summary>
          <div className="navigation-panel">
            <a href="/#about">About Eternity</a>
            <a href="/projects" aria-current={currentPage(pathname, "/projects", true)}>Project case studies</a>
            <a href="/areas-we-serve" aria-current={currentPage(pathname, "/areas-we-serve", true)}>Areas served</a>
            <a href="/#contact">Contact</a>
          </div>
        </details>
      </nav>
      <div className="header-actions"><a className="btn btn-small" href="https://eternityhvacr.com/#schedule">Request service</a></div>
      <details className="mobile-menu">
        <summary aria-label="Open navigation"><span /><span /><span /></summary>
        <div>
          <a href="/services/air-conditioning-repair" aria-current={currentPage(pathname, "/services/air-conditioning-repair")}>AC repair</a>
          <a href="/services/air-conditioning-installation" aria-current={currentPage(pathname, "/services/air-conditioning-installation")}>AC installation</a>
          <a href="/services/furnace-heating-repair" aria-current={currentPage(pathname, "/services/furnace-heating-repair")}>Heating</a>
          <a href="/services/boiler-service" aria-current={currentPage(pathname, "/services/boiler-service")}>Boilers</a>
          <a href="/services/heat-pump-service" aria-current={currentPage(pathname, "/services/heat-pump-service")}>Heat pumps</a>
          <a href="/services/emergency-hvac-r" aria-current={currentPage(pathname, "/services/emergency-hvac-r")}>Emergency HVAC/R</a>
          <a href="/services/commercial-hvac" aria-current={currentPage(pathname, "/services/commercial-hvac")}>Commercial HVAC</a>
          <a href="/services/commercial-refrigeration" aria-current={currentPage(pathname, "/services/commercial-refrigeration")}>Refrigeration</a>
          <a href="/services/preventive-maintenance" aria-current={currentPage(pathname, "/services/preventive-maintenance")}>Maintenance</a>
          <a href="/estimate" aria-current={currentPage(pathname, "/estimate")}>Project estimator</a>
          <a href="/second-opinion" aria-current={currentPage(pathname, "/second-opinion")}>Second opinion</a>
          <a href="/projects" aria-current={currentPage(pathname, "/projects", true)}>Projects</a>
          <a href="/resources" aria-current={currentPage(pathname, "/resources", true)}>Expert answers</a>
          <a href="/areas-we-serve" aria-current={currentPage(pathname, "/areas-we-serve", true)}>Areas served</a>
          <a href="/#contact">Contact</a>
        </div>
      </details>
    </header>
    <span className="skip-target" id="main-content" tabIndex={-1} />
  </>;
}

export function SiteFooter() {
  return <>
    <footer>
      <div className="footer-grid">
        <div className="footer-brand"><div className="logo-crop footer-logo"><img src="/images/eternity-logo-reverse.svg" alt="Eternity Mechanical Services" width="924" height="486" loading="lazy" decoding="async" /></div><p>Licensed and insured HVAC, refrigeration, installation, repair and preventive maintenance for residential and commercial customers.</p></div>
        <div><h3>Services</h3><a href="/services/air-conditioning-repair">AC repair</a><a href="/services/air-conditioning-installation">AC installation &amp; replacement</a><a href="/services/furnace-heating-repair">Furnace &amp; heating</a><a href="/services/boiler-service">Boiler service</a><a href="/services/heat-pump-service">Heat pumps</a><a href="/services/emergency-hvac-r">Emergency HVAC/R</a><a href="/services/commercial-hvac">Commercial HVAC</a><a href="/services/commercial-refrigeration">Commercial refrigeration</a><a href="/services/preventive-maintenance">Preventive maintenance</a></div>
        <div><h3>Company</h3><a href="/#about">About</a><a href="/projects">Project case studies</a><a href="/resources">Expert answers</a><a href="https://share.google/1bUl6S4x9x90TJ7Mf" target="_blank" rel="noreferrer">Google profile</a><a data-review-link href="https://g.page/r/CYsWl6Bz9AJvEBM/review" target="_blank" rel="noreferrer">Write a Google review</a><a href="/areas-we-serve">Areas we serve</a><a href="/areas-we-serve/euclid-oh">Euclid HVAC service</a><a href="/areas-we-serve/cleveland-heights-oh">Cleveland Heights HVAC</a><a href="/#contact">Contact</a></div>
        <div><h3>Customer</h3><a href="https://eternityhvacr.com/#schedule">Request service</a><a href="/estimate">Project estimator</a><a href="/second-opinion">Private second opinion</a><a data-sms-link href="sms:+12167033183">Text Eternity</a><a href="/services/commercial-hvac">Commercial service</a><a href="/services/preventive-maintenance">Maintenance</a><a href="/privacy">Privacy &amp; data use</a><a href="/terms">Website terms</a></div>
        <div><h3>Contact</h3><p>Cleveland, Cuyahoga County<br />Greater Cleveland &amp; Northeast Ohio</p><a href="tel:+12167033183">Call 216-703-3183</a><a data-sms-link href="sms:+12167033183">Text 216-703-3183</a><a href="mailto:ben@eternityhvacr.com">ben@eternityhvacr.com</a><span>Mon–Fri: 7 a.m.–7 p.m.</span><span>Sat: 9 a.m.–5 p.m. • Sun: Closed</span></div>
      </div>
      <p className="sms-disclosure">Texts are monitored 24/7 with a 15-minute reply target. This is not an arrival-time promise. By texting, you agree to receive service-related replies at the number you use. Message and data rates may apply. Reply STOP to opt out. No marketing texts without separate consent. See our <a href="/privacy">Privacy &amp; Data Use notice</a>.</p>
      <div className="footer-bottom"><span>© 2026 Eternity Mechanical Services LLC. All rights reserved.</span><span><a href="/privacy">Privacy</a> • <a href="/terms">Terms</a></span><span>Licensed &amp; insured • License #28303</span><span>Service-area business • Greater Cleveland</span></div>
    </footer>
    <nav className="mobile-bar" aria-label="Quick contact actions">
      <a href="tel:+12167033183"><span aria-hidden="true">☎</span>Call</a>
      <a href="https://eternityhvacr.com/#schedule"><span aria-hidden="true">＋</span>Request</a>
      <button type="button" data-open-assistant aria-label="Open Ask Eternity service assistant" aria-haspopup="dialog"><span aria-hidden="true">◉</span>Ask</button>
      <a data-sms-link href="sms:+12167033183"><span aria-hidden="true">✉</span>Text</a>
    </nav>
  </>;
}

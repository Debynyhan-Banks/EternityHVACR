import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function dispatch(request) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${request.url}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    request,
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

async function render(pathname = "/") {
  return dispatch(new Request(`https://eternityhvacr.com${pathname}`, {
    headers: { accept: "text/html" },
  }));
}

test("renders the Eternity homepage with approved business information", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Eternity Mechanical Services \| HVAC &amp; Mechanical Contractor<\/title>/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/eternityhvacr\.com"\s*\/>/i);
  assert.match(html, /Built for Comfort\./);
  assert.match(html, /216-253-6468/);
  assert.match(html, /ben@eternityhvacr\.com/);
  assert.match(html, /License #28303/);
  assert.match(html, /Cuyahoga County/);
  assert.match(html, /system-diagnostic-report\.jpg/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site|Lorem ipsum/i);
});

test("includes indexable metadata and structured business data", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /<meta name="robots" content="index, follow"\s*\/>/i);
  assert.match(html, /<script type="application\/ld\+json">/i);
  assert.match(html, /&quot;HVACBusiness&quot;|"HVACBusiness"/);
  assert.match(html, /&quot;Organization&quot;|"Organization"/);
  assert.match(html, /&quot;WebSite&quot;|"WebSite"/);
  assert.match(html, /https:\/\/share\.google\/1bUl6S4x9x90TJ7Mf/);
});

test("publishes crawler files with the canonical sitemap", async () => {
  const [robots, sitemap] = await Promise.all([
    readFile(new URL("../public/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
  ]);

  assert.match(robots, /User-agent: OAI-SearchBot[\s\S]*Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/eternityhvacr\.com\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/services\/commercial-refrigeration<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/services\/commercial-hvac<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/services\/preventive-maintenance<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/areas-we-serve<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/areas-we-serve\/euclid-oh<\/loc>/);
  assert.match(sitemap, /system-diagnostic-report\.jpg|hero-technician-black\.jpg/);
});

test("renders the priority service pages with unique search content", async () => {
  const pages = [
    ["/services/commercial-refrigeration", /Commercial Refrigeration Service in Greater Cleveland/, /Walk-in cooler and freezer service/],
    ["/services/commercial-hvac", /Commercial HVAC Service for Greater Cleveland Facilities/, /Rooftop-unit diagnostics and repair/],
    ["/services/preventive-maintenance", /HVAC and Refrigeration Maintenance Before Problems Become Emergencies/, /System and equipment inspection/],
  ];

  for (const [pathname, heading, capability] of pages) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, heading);
    assert.match(html, capability);
    assert.match(html, /15-minute response target/i);
    assert.match(html, /&quot;Service&quot;|"Service"/);
    assert.match(html, /&quot;FAQPage&quot;|"FAQPage"/);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://eternityhvacr\\.com${pathname}"`));
  }
});

test("publishes the approved Greater Cleveland service areas", async () => {
  const response = await render("/areas-we-serve");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Serving Greater Cleveland &amp; Northeast Ohio/);
  assert.match(html, /Cleveland Heights/);
  assert.match(html, /44106/);
  assert.match(html, /North Ridgeville/);
  assert.match(html, /44039/);
  assert.match(html, /Cuyahoga Falls/);
  assert.match(html, /44221/);
  assert.match(html, /&quot;ItemList&quot;|"ItemList"/);
  assert.match(html, /href="\/areas-we-serve\/euclid-oh"/);
});

test("renders the proof-backed Euclid service-area page", async () => {
  const response = await render("/areas-we-serve/euclid-oh");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /HVAC &amp; Refrigeration Service in Euclid, Ohio/);
  assert.match(html, /Complete(?:d)? a full residential heating and cooling installation|full residential heating and cooling installation/i);
  assert.match(html, /80,000 BTU/);
  assert.match(html, /R-454B/);
  assert.match(html, /PA4SAN53000N/);
  assert.match(html, /CVAVA3017XMA/);
  assert.match(html, /cleveland-commercial-rooftop-hvac-service-1200\.webp/);
  assert.match(html, /euclid-oh-sinclair-furnace-installation-1200\.webp/);
  assert.match(html, /Full-system installation in Euclid 44119/);
  assert.match(html, /3 ton/);
  assert.match(html, /96%/);
  assert.match(html, /&quot;FAQPage&quot;|"FAQPage"/);
  assert.match(html, /&quot;ImageObject&quot;|"ImageObject"/);
  assert.match(html, /<link rel="canonical" href="https:\/\/eternityhvacr\.com\/areas-we-serve\/euclid-oh"/);
  assert.doesNotMatch(html, /repairs were completed|parts were replaced|system was restored/i);
  assert.doesNotMatch(html, /334 E 197th/i);
});

test("rejects invalid and cross-origin service requests", async () => {
  const crossOrigin = await dispatch(new Request("https://eternityhvacr.com/api/service-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://example.com",
      "x-forwarded-for": "192.0.2.10",
    },
    body: JSON.stringify({}),
  }));
  assert.equal(crossOrigin.status, 403);

  const invalid = await dispatch(new Request("https://eternityhvacr.com/api/service-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://eternityhvacr.com",
      "x-forwarded-for": "192.0.2.11",
    },
    body: JSON.stringify({ startedAt: Date.now() }),
  }));
  assert.equal(invalid.status, 400);
});

test("keeps delivery unavailable until the server-side email key is configured", async () => {
  const response = await dispatch(new Request("https://eternityhvacr.com/api/service-request", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Origin: "https://eternityhvacr.com",
      "x-forwarded-for": "192.0.2.12",
    },
    body: JSON.stringify({
      service: "Air conditioning",
      customer: "My home",
      timing: "This week",
      details: "The system is running but the home is not cooling.",
      name: "Test Customer",
      phone: "216-555-0100",
      email: "test@example.com",
      website: "",
      startedAt: Date.now() - 2000,
    }),
  }));

  assert.equal(response.status, 503);
});

test("uses a branded and actionable service-request email", async () => {
  const source = await readFile(new URL("../app/api/service-request/route.ts", import.meta.url), "utf8");

  assert.match(source, /ETERNITY/);
  assert.match(source, /MECHANICAL SERVICES/);
  assert.match(source, /background:#0B2646/);
  assert.match(source, /border-bottom:5px solid #FF4439/);
  assert.match(source, /Reply to customer/);
  assert.match(source, /Call customer/);
  assert.match(source, /role="presentation"/);
});

test("sends a branded confirmation to the customer after internal delivery", async () => {
  const source = await readFile(new URL("../app/api/service-request/route.ts", import.meta.url), "utf8");

  assert.match(source, /We received your service request \| Eternity Mechanical Services/);
  assert.match(source, /Request received/);
  assert.match(source, /What happens next/);
  assert.match(source, /Appointment availability and service details are confirmed directly/);
  assert.match(source, /customer_confirmation/);
  assert.match(source, /confirmationSent: true/);
});

test("keeps client and server service-request validation aligned", async () => {
  const [component, route] = await Promise.all([
    readFile(new URL("../app/components/ServiceRequest.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/service-request/route.ts", import.meta.url), "utf8"),
  ]);

  assert.match(component, /data\.details\.trim\(\)\.length >= 10/);
  assert.match(component, /data\.phone\.replace\(\/\\D\/g, ""\)\.length >= 7/);
  assert.match(component, /result\.error/);
  assert.doesNotMatch(route, /elapsed > 24/);
});

test("installs Google Analytics and records lead actions without customer PII", async () => {
  const [layout, analytics, form] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/Analytics.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ServiceRequest.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /G-32W3PBPD8Y/);
  assert.match(layout, /googletagmanager\.com\/gtag\/js/);
  assert.match(form, /trackGoogleEvent\("generate_lead"/);
  assert.match(analytics, /"phone_click"/);
  assert.match(analytics, /"email_click"/);
  assert.doesNotMatch(form, /trackGoogleEvent\([\s\S]{0,300}(?:data\.name|data\.phone|data\.email|data\.details)/);
});

test("uses the tightly cropped transparent Eternity brand assets", async () => {
  const [logo, mark, favicon, chrome] = await Promise.all([
    readFile(new URL("../public/images/eternity-logo.svg", import.meta.url), "utf8"),
    readFile(new URL("../public/images/eternity-mark.svg", import.meta.url), "utf8"),
    readFile(new URL("../public/favicon.svg", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteChrome.tsx", import.meta.url), "utf8"),
  ]);

  for (const asset of [logo, mark, favicon]) {
    assert.match(asset, /#0B2646/);
    assert.match(asset, /#FF4439/);
    assert.doesNotMatch(asset, /<metadata|<rect/i);
  }
  assert.match(logo, /viewBox="50 270 924 486"/);
  assert.match(mark, /viewBox="286 270 452 236"/);
  assert.match(favicon, /viewBox="286 270 452 236"/);
  assert.match(chrome, /eternity-logo-reverse\.svg/);
});

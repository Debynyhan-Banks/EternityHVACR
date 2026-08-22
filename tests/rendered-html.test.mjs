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
  assert.match(sitemap, /system-diagnostic-report\.jpg|hero-technician-black\.jpg/);
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
  assert.match(source, /background:#071b3c/);
  assert.match(source, /border-bottom:5px solid #f47a38/);
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

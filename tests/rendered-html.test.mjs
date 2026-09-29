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

test("all internal header/footer navigation destinations render and anchors exist", async () => {
  const source = await readFile(new URL('../app/components/SiteChrome.tsx', import.meta.url), 'utf8');
  assert.ok(!source.includes('<Link'), 'Navigation should use native browser links');
  const hrefs = [...new Set([...source.matchAll(/href="([^"]+)"/g)].map(match => match[1]))];
  for (const href of hrefs) {
    const url = new URL(href, 'https://eternityhvacr.com');
    if (url.origin !== 'https://eternityhvacr.com') continue;
    const response = await render(url.pathname);
    assert.equal(response.status, 200, href);
    const html = await response.text();
    if (url.hash) assert.ok(html.includes(`id="${url.hash.slice(1)}"`), `Missing anchor: ${href}`);
  }
});

test("renders the Eternity homepage with approved business information", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.equal(response.headers.get("strict-transport-security"), "max-age=31536000");

  const html = await response.text();
  assert.match(html, /<title>Cleveland HVAC, Refrigeration &amp; Boiler Service \| Eternity<\/title>/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/eternityhvacr\.com"\s*\/>/i);
  assert.match(html, /Built for Comfort\./);
  assert.match(html, /Cleveland HVAC,<br\s*\/>.*refrigeration.*boiler service\./s);
  assert.match(html, /Comfort\. Performance\. Peace of mind\./);
  assert.match(html, /28 years of owner experience/);
  assert.match(html, /eternity-van-hero\.jpg/);
  assert.match(html, /eternity-van-hero-mobile-b\.webp/);
  assert.match(html, /eternity-van-hero-mobile-b\.jpg/);
  assert.match(html, /Bernard Gray standing beside an Eternity Mechanical Services work van/);
  assert.match(html, /eternity-preventive-maintenance-937\.jpg/);
  assert.match(html, /eternity-preventive-maintenance-480\.jpg 480w/);
  assert.match(html, /eternity-preventive-maintenance-720\.jpg 720w/);
  assert.match(html, /sizes="\(max-width: 700px\) calc\(100vw - 40px\), \(max-width: 1200px\) min\(760px, calc\(100vw - 64px\)\), 43vw"/);
  assert.match(html, /Eternity technician servicing a furnace during preventive maintenance/);
  assert.match(html, /aria-label="Featured services"/);
  assert.match(html, /aria-label="Choose your next step"/);
  assert.match(html, /href="#schedule"[^>]*>\s*<strong>Get service<\/strong>/);
  assert.match(html, /href="\/estimate"[^>]*>\s*<strong>Plan replacement<\/strong>/);
  assert.match(html, /href="\/second-opinion"[^>]*>\s*<strong>Review a quote<\/strong>/);
  assert.match(html, /What HVAC replacement may cost in Greater Cleveland/);
  assert.match(html, /\$6,800.*\$17,600/s);
  assert.match(html, /\$4,400.*\$5,400/s);
  assert.match(html, /\$1,500.*\$2,500/s);
  assert.match(html, /disclosed 15% material markup/);
  assert.match(html, /href="\/estimate"[^>]*>See the full cost guide and assumptions/);
  assert.match(html, /href="#main-content"[^>]*>Skip to main content<\/a>/);
  assert.equal((html.match(/id="main-content"/g) ?? []).length, 1);
  assert.match(html, /href="\/projects\/euclid-payne-hvac-installation"/);
  assert.match(html, /href="\/projects\/euclid-central-air-installation"/);
  assert.doesNotMatch(html, /href="\/projects\/euclid-rooftop-hvac-diagnostic"/);
  assert.match(html, /&quot;ItemList&quot;|"ItemList"/);
  assert.match(html, /Verified Euclid HVAC project case studies/);
  assert.match(html, /216-703-3183/);
  assert.match(html, /ben@eternityhvacr\.com/);
  assert.match(html, /License #28303/);
  assert.match(html, /Cuyahoga County/);
  assert.match(html, /Charlotte Mancini/);
  assert.match(html, /Bernard Gray/);
  assert.match(html, /28 years of industry experience/);
  assert.match(html, /Debynyhan Banks/);
  assert.match(html, /degree in computer science and an MBA/);
  assert.match(html, /I had an excellent experience with Eternity Mechanical Services/);
  assert.match(html, /https:\/\/g\.page\/r\/CYsWl6Bz9AJvEBM\/review/);
  assert.match(html, /data-review-link/);
  assert.match(html, /href="sms:\+12167033183"/);
  assert.match(html, /Texts are monitored 24\/7 with a 15-minute reply target/);
  assert.match(html, /This is not an arrival-time promise/);
  assert.match(html, /Reply STOP to opt out/);
  assert.match(html, /href="\/privacy"/);
  assert.match(html, /href="\/terms"/);
  assert.match(html, /Emergency \/ system down/);
  assert.match(html, /Installation estimate/);
  assert.match(html, /Check service availability/);
  assert.match(html, /name="service-zip"/);
  assert.match(html, /system-diagnostic-report\.jpg/);
  assert.doesNotMatch(html, /Your site is taking shape|Building your site|Lorem ipsum/i);
});

test("uses reliable homepage links and centers mobile task actions", async () => {
  const [homeSource, chromeSource, styles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteChrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(homeSource, /import Link from "next\/link"|<Link\b/);
  assert.match(homeSource, /<a className="hero-task-link" href="\/estimate"/);
  assert.match(homeSource, /<a className="project-proof-card" href="\/projects\/euclid-payne-hvac-installation"/);
  assert.match(styles, /\.hero-task-actions\{left:20px;right:20px;bottom:112px;width:auto/);
  assert.match(styles, /\.hero-task-link\{width:auto;min-height:48px;[^}]*align-items:center;[^}]*text-align:center/);
  assert.match(chromeSource, /data-open-assistant[^>]*aria-label="Open Ask Eternity service assistant"/);
  assert.match(styles, /grid-template-columns:repeat\(4,1fr\)/);
  assert.match(styles, /\.signmons-launcher\{display:none\}/);
});

test("uses the supplied responsive artwork across all six service cards", async () => {
  const [response, styles] = await Promise.all([
    render("/"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);
  assert.equal(response.status, 200);
  const html = await response.text();

  for (const asset of [
    "air-conditioning.png",
    "heating.png",
    "commercial-hvac.png",
    "commercial-refrigeration.png",
    "installation-replacement.png",
    "preventive-maintenance.png",
  ]) {
    assert.match(html, new RegExp(`/images/service-cards/${asset.replace(".", "\\.")}`));
  }

  assert.equal((html.match(/service-card--dark/g) ?? []).length, 2);
  assert.equal((html.match(/width="520" height="520"/g) ?? []).length, 6);
  assert.match(styles, /\.service-card__art img\{width:100%;height:100%;object-fit:contain\}/);
  assert.match(styles, /@media\(max-width:700px\)[\s\S]*\.service-card\{min-height:440px;padding:28px 24px 52%/);
  assert.match(styles, /@media\(prefers-reduced-motion:reduce\)[\s\S]*\.service-card__art/);
});

test("includes indexable metadata and structured business data", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /<meta name="robots" content="index, follow"\s*\/>/i);
  assert.match(html, /<script type="application\/ld\+json">/i);
  assert.match(html, /&quot;Organization&quot;|"Organization"/);
  assert.doesNotMatch(html, /&quot;HVACBusiness&quot;|"HVACBusiness"/);
  assert.match(html, /&quot;WebSite&quot;|"WebSite"/);
  assert.match(html, /https:\/\/share\.google\/1bUl6S4x9x90TJ7Mf/);
});

test("the application permanently redirects alternate origins to the canonical HTTPS host", async () => {
  for (const source of [
    "http://eternityhvacr.com/services/boiler-service?source=audit",
    "http://www.eternityhvacr.com/services/boiler-service?source=audit",
    "https://www.eternityhvacr.com/services/boiler-service?source=audit",
  ]) {
    const response = await dispatch(new Request(source, { redirect: "manual" }));
    assert.equal(response.status, 308);
    assert.equal(response.headers.get("location"), "https://eternityhvacr.com/services/boiler-service?source=audit");
    assert.equal(response.headers.get("strict-transport-security"), "max-age=31536000");
  }
});

test("publishes crawler files with the canonical sitemap", async () => {
  const [robots, sitemap] = await Promise.all([
    readFile(new URL("../public/robots.txt", import.meta.url), "utf8"),
    readFile(new URL("../public/sitemap.xml", import.meta.url), "utf8"),
  ]);

  assert.match(robots, /User-agent: OAI-SearchBot[\s\S]*Allow: \//);
  assert.match(robots, /User-agent: GPTBot[\s\S]*Allow: \//);
  assert.match(robots, /User-agent: ChatGPT-User[\s\S]*Allow: \//);
  assert.match(robots, /Sitemap: https:\/\/eternityhvacr\.com\/sitemap\.xml/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/services\/commercial-refrigeration<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/services\/commercial-hvac<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/services\/preventive-maintenance<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/services\/furnace-heating-repair<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/services\/boiler-service<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/services\/heat-pump-service<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/services\/air-conditioning-repair<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/services\/air-conditioning-installation<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/services\/emergency-hvac-r<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/areas-we-serve<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/areas-we-serve\/euclid-oh<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/areas-we-serve\/cleveland-heights-oh<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/estimate<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/second-opinion<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/projects<\/loc>/);
  assert.doesNotMatch(sitemap, /<loc>https:\/\/eternityhvacr\.com\/projects\/euclid-rooftop-hvac-diagnostic<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/projects\/euclid-payne-hvac-installation<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/projects\/euclid-central-air-installation<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/resources<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/resources\/walk-in-cooler-icing-up<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/resources\/rooftop-hvac-short-cycling<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/resources\/furnace-repair-vs-replacement<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/resources\/commercial-refrigeration-maintenance-frequency<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/privacy<\/loc>/);
  assert.match(sitemap, /<loc>https:\/\/eternityhvacr\.com\/terms<\/loc>/);
  assert.match(sitemap, /images\/eternity-van-hero\.jpg/);
});

test("renders transparent historical Greater Cleveland pricing and matching schema", async () => {
  const [response, component, requestForm, assistant, acResponse, furnaceResponse] = await Promise.all([
    render("/estimate"),
    readFile(new URL("../app/components/ProjectEstimator.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ServiceRequest.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SignmonsAssistant.tsx", import.meta.url), "utf8"),
    render("/services/air-conditioning-installation"),
    render("/services/furnace-heating-repair"),
  ]);
  assert.equal(response.status, 200);
  assert.equal(acResponse.status, 200);
  assert.equal(furnaceResponse.status, 200);
  const html = await response.text();
  const [acHtml, furnaceHtml] = await Promise.all([acResponse.text(), furnaceResponse.text()]);
  assert.match(html, /2026 Greater Cleveland HVAC Replacement Cost Guide/);
  assert.match(html, /six historical supplier estimates dated July through September 2026/i);
  assert.match(html, /15% markup/);
  assert.match(html, /Historical landed material total.*1\.15.*typical installation labor/s);
  assert.match(html, /\$1,500.*\$2,500/s);
  assert.match(html, /\$2,000.*\$3,000/s);
  assert.match(html, /\$3,000.*\$5,000/s);
  assert.match(html, /\$2,800.*\$3,400/s);
  assert.match(html, /\$6,800.*\$8,200/s);
  assert.match(html, /\$6,800.*\$8,800/s);
  assert.match(html, /\$9,300.*\$11,300/s);
  assert.match(html, /\$15,400.*\$17,600/s);
  assert.match(html, /\$4,400.*\$5,400/s);
  assert.match(html, /current supplier prices or binding proposals/i);
  assert.match(html, /Equipment pricing and availability can change/);
  assert.match(html, /Custom estimate/);
  assert.match(html, /WebApplication/);
  assert.match(html, /OfferCatalog/);
  assert.match(html, /minPrice.*2800.*maxPrice.*3400/s);
  assert.match(html, /minPrice.*6800.*maxPrice.*8800/s);
  assert.match(html, /minPrice.*9300.*maxPrice.*11300/s);
  assert.match(html, /minPrice.*15400.*maxPrice.*17600/s);
  assert.match(html, /minPrice.*4400.*maxPrice.*5400/s);
  assert.match(html, /Real scope first.*Final price after site review/s);
  assert.match(html, /Historical pricing examples reviewed September 2026/);
  assert.doesNotMatch(html, /EST39796|IC49058|IK53636|EST26634|27333416[56]/);
  assert.doesNotMatch(html, /\$3,286\.57|\$5,395\.27|\$5,470\.52|\$10,775\.28|\$10,891\.80/);
  assert.match(component, /project_estimator_completed/);
  assert.match(component, /project_estimator_scope_selected/);
  assert.match(component, /Choose the project closest to yours/);
  assert.match(component, /estimateScope=/);
  assert.match(component, /Schedule a site estimate/);
  assert.match(component, /data-assistant-estimate/);
  assert.match(component, /direct-furnace-swap/);
  assert.match(component, /\$1,500–\$2,500/);
  assert.match(component, /\$6,800–\$8,200/);
  assert.match(component, /\$3,000–\$5,000/);
  assert.match(component, /\$2,000–\$3,000/);
  assert.match(component, /Custom diagnostic & load calculation required/);
  assert.match(requestForm, /estimatorPrefills/);
  assert.match(requestForm, /estimator_handoff_loaded/);
  assert.match(requestForm, /equipment and materials separate/);
  assert.match(acHtml, /\$4,400.*\$5,400.*\$6,800.*\$17,600/s);
  assert.match(furnaceHtml, /\$1,500.*\$2,500.*\$2,800.*\$3,400/s);
  assert.match(assistant, /assistant_estimator_context_received/);
  assert.match(assistant, /Estimator context:/);
});

test("publishes a private 30-day second-opinion upload workflow", async () => {
  const [response, form, route, downloadRoute, storage, auth] = await Promise.all([
    render("/second-opinion"),
    readFile(new URL("../app/components/SecondOpinionForm.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/second-opinion/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/api/admin/second-opinions/[fileId]/route.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/lib/secondOpinionStorage.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/lib/secondOpinionAdmin.ts", import.meta.url), "utf8"),
  ]);
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Owner\/admin only/);
  assert.match(html, /30-day retention/);
  assert.match(form, /PDF, JPG, PNG or WebP/);
  assert.match(route, /contentMatches/);
  assert.match(route, /MAX_TOTAL_BYTES = 20 \* 1024 \* 1024/);
  assert.match(route, /second-opinions\/\$\{submissionId\}/);
  assert.match(downloadRoute, /requireSecondOpinionAdmin/);
  assert.match(downloadRoute, /Cache-Control.*private, no-store/);
  assert.match(storage, /RETENTION_DAYS = 30/);
  assert.match(storage, /UPLOADS\.delete/);
  assert.match(auth, /SECOND_OPINION_ADMIN_EMAILS/);
});

test("renders the approved Cleveland Heights service-area page with shared schema", async () => {
  const response = await render("/areas-we-serve/cleveland-heights-oh");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /HVAC Repair in Cleveland Heights, OH/);
  assert.match(html, /44106.*44112.*44118.*44121/s);
  assert.match(html, /Approved priority market/);
  assert.match(html, /BreadcrumbList/);
  assert.match(html, /FAQPage/);
  assert.match(html, /&quot;Service&quot;|"Service"/);
  assert.doesNotMatch(html, /completed in Cleveland Heights|Cleveland Heights project/i);
});

test("publishes clear privacy and website terms", async () => {
  const [privacyResponse, termsResponse] = await Promise.all([render("/privacy"), render("/terms")]);
  assert.equal(privacyResponse.status, 200);
  assert.equal(termsResponse.status, 200);
  const [privacy, terms] = await Promise.all([privacyResponse.text(), termsResponse.text()]);
  assert.match(privacy, /We do not sell personal information/);
  assert.match(privacy, /Eternity does not intentionally send service-request names/);
  assert.match(privacy, /<link rel="canonical" href="https:\/\/eternityhvacr\.com\/privacy"/);
  assert.match(terms, /live assistant availability/);
  assert.match(terms, /The website is not an emergency-dispatch service/);
  assert.match(privacy, /Signmons-powered assistant/);
  assert.match(privacy, /optional AI-assisted conversation/);
  assert.match(privacy, /Signmons uses OpenAI to generate a response/);
  assert.match(privacy, /does not intentionally send the contents of chat messages to Google Analytics/);
  assert.match(terms, /optional AI-assisted conversation/);
  assert.match(terms, /<link rel="canonical" href="https:\/\/eternityhvacr\.com\/terms"/);
});

test("publishes a disclosed Signmons service-routing assistant with safety and human handoff", async () => {
  const [homeResponse, component, proxyRoute] = await Promise.all([
    render("/"),
    readFile(new URL("../app/components/SignmonsAssistant.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/api/signmons/route.ts", import.meta.url), "utf8"),
  ]);
  assert.equal(homeResponse.status, 200);
  const home = await homeResponse.text();
  assert.match(home, /Ask Eternity/);
  assert.match(home, /Automated service assistant/);
  assert.match(component, /Messages are processed by Signmons and OpenAI/);
  assert.match(component, /cannot diagnose equipment/);
  assert.match(component, /Choose an arrival window/);
  assert.match(component, /assistant_appointment_confirmed/);
  assert.match(component, /<a[\s\S]*className="signmons-manage-link"[\s\S]*href=\{message\.manageHref\}/);
  assert.doesNotMatch(component, /appointment_manage_opened|appointment_start/);
  assert.doesNotMatch(component, /<Link className="signmons-manage-link"/);
  assert.match(component, /fetch\("\/api\/signmons"/);
  assert.match(component, /Describe a problem/);
  assert.match(component, /Request service/);
  assert.match(component, /Emergency safety/);
  assert.match(component, /Check service area/);
  assert.match(component, /Do not rely on this website for emergency help/);
  assert.match(component, /href="tel:911"/);
  assert.match(component, /href="tel:\+12167033183"/);
  assert.match(component, /href="sms:\+12167033183"/);
  assert.match(component, /href="https:\/\/eternityhvacr\.com\/#schedule"/);
  assert.match(component, /"assistant_open"/);
  assert.match(component, /"assistant_path_selected"/);
  assert.match(component, /"assistant_handoff"/);
  assert.match(component, /"assistant_message_sent"/);
  assert.match(component, /"assistant_response_received"/);
  assert.match(component, /Reviewing the request details/);
  assert.match(component, /Finishing securely/);
  assert.match(component, /Try again/);
  assert.match(component, /Your previous details are still in this chat/);
  assert.match(component, /result\.status === "job_created"/);
  assert.match(proxyRoute, /process\.env\.SIGNMONS_WEBCHAT_KEY/);
  assert.match(proxyRoute, /authorization: `Bearer \$\{integrationKey\}`/);
  assert.match(proxyRoute, /RATE_LIMIT_MAX = 12/);
  assert.match(proxyRoute, /reference \$\{reference\}/);
  assert.doesNotMatch(component, /SIGNMONS_WEBCHAT_KEY|Authorization: Bearer/);
});

test("keeps mobile fixed actions clear of active service workflows", async () => {
  const [assistant, requestForm, styles] = await Promise.all([
    readFile(new URL("../app/components/SignmonsAssistant.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ServiceRequest.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(assistant, /document\.body\.dataset\.assistantOpen = "true"/);
  assert.match(requestForm, /document\.body\.dataset\.serviceFormActive = "true"/);
  assert.match(styles, /body\[data-assistant-open="true"\] \.mobile-bar/);
  assert.match(styles, /body\[data-service-form-active="true"\] \.mobile-bar/);
  assert.match(styles, /env\(safe-area-inset-bottom\)/);
});

test("does not display an unverified chatbot submission claim", async () => {
  const route = await readFile(
    new URL("../app/api/signmons/route.ts", import.meta.url),
    "utf8",
  );

  assert.match(route, /looksLikeUnverifiedSubmissionClaim/);
  assert.match(route, /has not been submitted yet/);
  assert.match(route, /receive a reference number/);
});

test("verifies the Signmons booking contract before reporting success", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalApiUrl = process.env.SIGNMONS_API_URL;
  const originalKey = process.env.SIGNMONS_WEBCHAT_KEY;
  process.env.SIGNMONS_API_URL = "https://signmons.example";
  process.env.SIGNMONS_WEBCHAT_KEY = "test-integration-key";
  t.after(() => {
    globalThis.fetch = originalFetch;
    if (originalApiUrl === undefined) delete process.env.SIGNMONS_API_URL;
    else process.env.SIGNMONS_API_URL = originalApiUrl;
    if (originalKey === undefined) delete process.env.SIGNMONS_WEBCHAT_KEY;
    else process.env.SIGNMONS_WEBCHAT_KEY = originalKey;
  });

  const outbound = [];
  let upstream = {
    status: 200,
    body: {
      status: "availability",
      message: "Service request was saved. Choose a time.",
      job: { id: "11111111-1111-4111-8111-111111111111" },
      slots: [
        {
          token: "valid-slot-token-1234567890",
          start: "2026-09-01T13:00:00.000Z",
          end: "2026-09-01T15:00:00.000Z",
          label: "Tuesday, 9–11 AM",
        },
        {
          token: "valid-slot-token-1234567890",
          start: "2026-09-01T13:00:00.000Z",
          end: "2026-09-01T15:00:00.000Z",
          label: "Duplicate",
        },
        {
          token: "invalid-window-token-1234567890",
          start: "2026-09-01T15:00:00.000Z",
          end: "2026-09-01T13:00:00.000Z",
          label: "Invalid window",
        },
      ],
    },
  };
  globalThis.fetch = async (input, init) => {
    outbound.push({ url: String(input), init });
    return Response.json(upstream.body, { status: upstream.status });
  };

  const availability = await dispatch(new Request("https://eternityhvacr.com/api/signmons", {
    method: "POST",
    headers: { origin: "https://eternityhvacr.com", "content-type": "application/json" },
    body: JSON.stringify({
      sessionId: "session-1234",
      message: "My AC is blowing hot air",
      website: "",
      attribution: {
        channel: "website_chat",
        landingPage: "/resources/furnace-repair-vs-replacement",
        sourcePage: "/services/furnace-heating-repair",
        referrerHost: "www.google.com",
        utmSource: "google",
        utmMedium: "organic",
      },
    }),
  }));
  assert.equal(availability.status, 200);
  assert.equal(availability.headers.get("cache-control"), "no-store");
  const availabilityBody = await availability.json();
  assert.equal(availabilityBody.status, "availability");
  assert.equal(availabilityBody.jobReference, "11111111");
  assert.equal(availabilityBody.slots.length, 1);
  assert.equal(availabilityBody.slots[0].label, "Tuesday, 9–11 AM");
  assert.equal(outbound[0].url, "https://signmons.example/api/integrations/webchat/triage");
  assert.equal(outbound[0].init.headers.authorization, "Bearer test-integration-key");
  assert.deepEqual(JSON.parse(outbound[0].init.body).attribution, {
    channel: "website_chat",
    landingPage: "/resources/furnace-repair-vs-replacement",
    sourcePage: "/services/furnace-heating-repair",
    referrerHost: "www.google.com",
    utmSource: "google",
    utmMedium: "organic",
  });

  upstream = {
    status: 200,
    body: {
      status: "job_created",
      message: "Your request was recorded successfully.",
    },
  };
  const unverified = await dispatch(new Request("https://eternityhvacr.com/api/signmons", {
    method: "POST",
    headers: { origin: "https://eternityhvacr.com", "content-type": "application/json" },
    body: JSON.stringify({
      sessionId: "session-5678",
      message: "Please submit this",
      website: "",
      attribution: { channel: "website_chat", landingPage: "/", sourcePage: "/" },
    }),
  }));
  assert.equal(unverified.status, 502);
  assert.match((await unverified.json()).error, /could not verify that the request was saved/i);
});

test("proxies appointment confirmation with conflict and idempotency safeguards", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalApiUrl = process.env.SIGNMONS_API_URL;
  const originalKey = process.env.SIGNMONS_WEBCHAT_KEY;
  process.env.SIGNMONS_API_URL = "https://signmons.example";
  process.env.SIGNMONS_WEBCHAT_KEY = "test-integration-key";
  t.after(() => {
    globalThis.fetch = originalFetch;
    if (originalApiUrl === undefined) delete process.env.SIGNMONS_API_URL;
    else process.env.SIGNMONS_API_URL = originalApiUrl;
    if (originalKey === undefined) delete process.env.SIGNMONS_WEBCHAT_KEY;
    else process.env.SIGNMONS_WEBCHAT_KEY = originalKey;
  });

  const requestBody = {
    sessionId: "session-1234",
    jobId: "11111111-1111-4111-8111-111111111111",
    slotToken: "valid-slot-token-1234567890",
    feeAcknowledged: true,
  };
  let upstream = {
    status: 200,
    body: {
      status: "appointment_confirmed",
      appointment: { label: "Tuesday, September 1, 9–11 AM" },
      managementToken: "secure-management-token-1234567890",
    },
  };
  globalThis.fetch = async (_url, init) => {
    const originalContract = { sessionId: requestBody.sessionId, jobId: requestBody.jobId, slotToken: requestBody.slotToken };
    assert.deepEqual(JSON.parse(init.body), originalContract);
    return Response.json(upstream.body, { status: upstream.status });
  };

  const confirmed = await dispatch(new Request("https://eternityhvacr.com/api/signmons/appointments/confirm", {
    method: "POST",
    headers: { origin: "https://eternityhvacr.com", "content-type": "application/json" },
    body: JSON.stringify(requestBody),
  }));
  assert.equal(confirmed.status, 200);
  assert.equal(confirmed.headers.get("cache-control"), "no-store");
  assert.deepEqual(await confirmed.json(), {
    status: "appointment_confirmed",
    appointmentLabel: "Tuesday, September 1, 9–11 AM",
    jobReference: "11111111",
    managementPath: "/appointment/manage#secure-management-token-1234567890",
  });

  upstream = {
    status: 409,
    body: { message: "Internal upstream conflict details should not be exposed." },
  };
  const conflict = await dispatch(new Request("https://eternityhvacr.com/api/signmons/appointments/confirm", {
    method: "POST",
    headers: { origin: "https://eternityhvacr.com", "content-type": "application/json" },
    body: JSON.stringify(requestBody),
  }));
  assert.equal(conflict.status, 409);
  assert.deepEqual(await conflict.json(), {
    error: "That appointment was just taken. Please choose another time.",
  });
});

test("publishes a noindex secure appointment-management page", async () => {
  const response = await render("/appointment/manage");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Manage your residential diagnostic appointment/);
  assert.match(html, /<meta name="robots" content="noindex, nofollow"/i);
  assert.match(html, /<meta name="referrer" content="no-referrer"/i);
  assert.match(html, /Loading your appointment/);
});

test("proxies verified appointment view, availability, reschedule and cancellation responses", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalApiUrl = process.env.SIGNMONS_API_URL;
  const originalKey = process.env.SIGNMONS_WEBCHAT_KEY;
  process.env.SIGNMONS_API_URL = "https://signmons.example";
  process.env.SIGNMONS_WEBCHAT_KEY = "test-integration-key";
  t.after(() => {
    globalThis.fetch = originalFetch;
    if (originalApiUrl === undefined) delete process.env.SIGNMONS_API_URL;
    else process.env.SIGNMONS_API_URL = originalApiUrl;
    if (originalKey === undefined) delete process.env.SIGNMONS_WEBCHAT_KEY;
    else process.env.SIGNMONS_WEBCHAT_KEY = originalKey;
  });

  const appointment = {
    label: "Monday, August 31, 11:00 AM–2:00 PM",
    start: "2026-08-31T15:00:00.000Z",
    end: "2026-08-31T18:00:00.000Z",
  };
  let upstream = {
    status: 200,
    body: { status: "appointment_details", state: "confirmed", reference: "D51AF0C6", appointment },
  };
  globalThis.fetch = async () => Response.json(upstream.body, { status: upstream.status });
  const managementToken = "secure-management-token-1234567890";
  const call = (action, slotToken) => dispatch(new Request("https://eternityhvacr.com/api/signmons/appointments/manage", {
    method: "POST",
    headers: { origin: "https://eternityhvacr.com", "content-type": "application/json" },
    body: JSON.stringify({ managementToken, action, ...(slotToken ? { slotToken } : {}) }),
  }));

  const viewed = await call("view");
  assert.equal(viewed.status, 200);
  assert.equal(viewed.headers.get("referrer-policy"), "no-referrer");
  assert.equal((await viewed.json()).reference, "D51AF0C6");

  upstream = {
    status: 200,
    body: {
      status: "appointment_availability",
      appointment,
      slots: [{
        token: "valid-alternate-slot-token-1234567890",
        label: "Tuesday, September 1, 8–11 AM",
        start: "2026-09-01T12:00:00.000Z",
        end: "2026-09-01T15:00:00.000Z",
      }],
    },
  };
  const availability = await call("availability");
  assert.equal(availability.status, 200);
  assert.equal((await availability.json()).slots.length, 1);

  upstream = {
    status: 200,
    body: { status: "appointment_rescheduled", reference: "D51AF0C6", appointment },
  };
  const rescheduled = await call("reschedule", "valid-alternate-slot-token-1234567890");
  assert.equal(rescheduled.status, 200);
  assert.equal((await rescheduled.json()).status, "appointment_rescheduled");

  upstream = {
    status: 200,
    body: { status: "appointment_cancelled", reference: "D51AF0C6" },
  };
  const cancelled = await call("cancel");
  assert.equal(cancelled.status, 200);
  assert.equal((await cancelled.json()).status, "appointment_cancelled");
});

test("publishes an indexable expert-answer library", async () => {
  const response = await render("/resources");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Clear HVAC\/R answers, grounded in evidence/);
  assert.match(html, /Why is my walk-in cooler icing up\?/);
  assert.match(html, /What causes a rooftop HVAC unit to short-cycle\?/);
  assert.match(html, /When should a furnace be repaired versus replaced\?/);
  assert.match(html, /How often should commercial refrigeration be maintained\?/);
  assert.match(html, /&quot;CollectionPage&quot;|"CollectionPage"/);
  assert.match(html, /&quot;ItemList&quot;|"ItemList"/);
  assert.match(html, /<link rel="canonical" href="https:\/\/eternityhvacr\.com\/resources"/);
});

test("renders the first four evidence-backed expert answers", async () => {
  const pages = [
    ["/resources/walk-in-cooler-icing-up", /moisture is entering the box/, /Danfoss/],
    ["/resources/rooftop-hvac-short-cycling", /starts and stops more often than its control sequence intends/, /Trane/],
    ["/resources/furnace-repair-vs-replacement", /Age is a factor, not a verdict/, /U\.S\. Department of Energy/],
    ["/resources/commercial-refrigeration-maintenance-frequency", /there is no single interval that fits every cooler/, /U\.S\. Environmental Protection Agency/],
  ];

  for (const [pathname, directAnswer, source] of pages) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, directAnswer);
    assert.match(html, source);
    assert.match(html, /Greater Cleveland context/);
    assert.match(html, /Safety limit/);
    assert.match(html, /Published (?:<!-- -->)?August 28, 2026/);
    assert.match(html, /By Eternity Mechanical Services/);
    assert.match(html, /Reviewed and approved by (?:<[^>]+>)*Bernard Gray/);
    assert.match(html, /28 years of HVAC\/R industry experience/);
    assert.match(html, /&quot;Article&quot;|"Article"/);
    assert.match(html, /&quot;image&quot;:&quot;https:\/\/eternityhvacr\.com\/images\/|"image":"https:\/\/eternityhvacr\.com\/images\//);
    assert.match(html, /&quot;FAQPage&quot;|"FAQPage"/);
    assert.match(html, /&quot;BreadcrumbList&quot;|"BreadcrumbList"/);
    assert.match(html, /&quot;datePublished&quot;:&quot;2026-08-28&quot;|"datePublished":"2026-08-28"/);
    assert.match(html, /&quot;reviewedBy&quot;|"reviewedBy"/);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://eternityhvacr\\.com${pathname}"`));
    if (pathname === "/resources/commercial-refrigeration-maintenance-frequency") {
      assert.match(html, /<title>Commercial Refrigeration Maintenance Frequency \| Eternity<\/title>/);
    }
    if (pathname === "/resources/furnace-repair-vs-replacement") {
      assert.match(html, /<title>Furnace Repair or Replacement: How to Decide \| Eternity<\/title>/);
    }
  }
});

test("renders the priority service pages with unique search content", async () => {
  const pages = [
    ["/services/commercial-refrigeration", /Commercial Refrigeration Service in Greater Cleveland/, /Walk-in cooler and freezer service/, /href="\/resources\/walk-in-cooler-icing-up"/],
    ["/services/commercial-hvac", /Commercial HVAC Repair &amp; Maintenance in Greater Cleveland/, /Commercial rooftop-unit diagnostics and repair/, /href="\/resources\/rooftop-hvac-short-cycling"/],
    ["/services/preventive-maintenance", /HVAC Preventive Maintenance in Greater Cleveland/, /Heating and cooling equipment inspection/, /href="\/resources\/commercial-refrigeration-maintenance-frequency"/],
    ["/services/furnace-heating-repair", /Furnace and Heating Repair in Greater Cleveland/, /No-heat and intermittent-heating diagnostics/, /href="\/resources\/furnace-repair-vs-replacement"/],
    ["/services/boiler-service", /Boiler Service and Repair in Greater Cleveland/, /Boiler operating diagnostics/],
    ["/services/heat-pump-service", /Heat Pump Service and Repair in Greater Cleveland/, /Heat-pump heating and cooling diagnostics/],
    ["/services/air-conditioning-repair", /Air-Conditioning Repair in Greater Cleveland/, /No-cooling and intermittent-cooling diagnostics/],
    ["/services/air-conditioning-installation", /Air-Conditioning Installation and Replacement in Greater Cleveland/, /Central-air installation and replacement/],
    ["/services/emergency-hvac-r", /Emergency HVAC and Refrigeration Service in Greater Cleveland/, /No-heat and no-cooling diagnostics/],
  ];

  for (const [pathname, heading, capability, guideLink] of pages) {
    const response = await render(pathname);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, heading);
    assert.match(html, capability);
    assert.match(html, /15-minute response target/i);
    assert.match(html, /&quot;Service&quot;|"Service"/);
    assert.match(html, /&quot;FAQPage&quot;|"FAQPage"/);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://eternityhvacr\\.com${pathname}"`));
    if (guideLink) assert.match(html, guideLink);
    if (pathname === "/services/commercial-refrigeration") {
      assert.match(html, /href="\/resources\/commercial-refrigeration-maintenance-frequency"/);
    }
    if (pathname === "/services/commercial-hvac") {
      assert.match(html, /<title>Commercial HVAC Repair \| Cleveland, OH \| Eternity<\/title>/);
      assert.match(html, /Facility symptoms worth investigating early/);
    }
    if (pathname === "/services/preventive-maintenance") {
      assert.match(html, /<title>HVAC Maintenance \| Cleveland, OH \| Eternity<\/title>/);
      assert.match(html, /Choose timing based on the equipment and property/);
    }
  }
});

test("publishes the approved Greater Cleveland service areas", async () => {
  const response = await render("/areas-we-serve");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /HVAC, Refrigeration &amp; Boiler Service Across Greater Cleveland/);
  assert.match(html, /<title>HVAC Service Areas Near Cleveland, OH \| Eternity<\/title>/);
  assert.match(html, /Cleveland Heights/);
  assert.match(html, /44106/);
  assert.match(html, /North Ridgeville/);
  assert.match(html, /44039/);
  assert.match(html, /Cuyahoga Falls/);
  assert.match(html, /44221/);
  assert.match(html, /&quot;ItemList&quot;|"ItemList"/);
  assert.match(html, /href="\/areas-we-serve\/euclid-oh"/);
  assert.match(html, /href="\/services\/commercial-hvac"/);
  assert.match(html, /href="\/services\/preventive-maintenance"/);
  assert.match(html, /ZIP-code checker/);
  assert.match(html, /Property ZIP code/);
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
  assert.doesNotMatch(html, /cleveland-commercial-rooftop-hvac-service-1200\.webp/);
  assert.match(html, /euclid-oh-sinclair-furnace-installation-1200\.webp/);
  assert.match(html, /Central air and furnace installation in Euclid 44119/);
  assert.match(html, /3 ton/);
  assert.match(html, /96%/);
  assert.match(html, /&quot;FAQPage&quot;|"FAQPage"/);
  assert.match(html, /&quot;ImageObject&quot;|"ImageObject"/);
  assert.match(html, /<link rel="canonical" href="https:\/\/eternityhvacr\.com\/areas-we-serve\/euclid-oh"/);
  assert.doesNotMatch(html, /repairs were completed|parts were replaced|system was restored/i);
  assert.doesNotMatch(html, /334 E 197th/i);
});

test("renders the first verified residential project case study", async () => {
  const response = await render("/projects/euclid-central-air-installation");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Central Air &amp; High-Efficiency Furnace Installation in Euclid/);
  assert.match(html, /more than 40 years old/i);
  assert.match(html, /August 2026/);
  assert.match(html, /80,000 BTU/);
  assert.match(html, /96%/);
  assert.match(html, /3 ton/);
  assert.match(html, /Documented before &amp; after/);
  assert.match(html, /No energy-savings estimate/);
  assert.match(html, /euclid-oh-sinclair-furnace-installation-1200\.webp/);
  assert.match(html, /&quot;Article&quot;|"Article"/);
  assert.match(html, /&quot;BreadcrumbList&quot;|"BreadcrumbList"/);
  assert.match(html, /<link rel="canonical" href="https:\/\/eternityhvacr\.com\/projects\/euclid-central-air-installation"/);
  assert.doesNotMatch(html, /334 E 197th/i);
  assert.doesNotMatch(html, /Project outcome/);
});

test("renders the verified Euclid home-flipper case study without claiming a sale result", async () => {
  const response = await render("/projects/euclid-payne-hvac-installation");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /home flipper/i);
  assert.match(html, /80,000 BTU/);
  assert.match(html, /80% AFUE/);
  assert.match(html, /2\.5 ton|2\.5-ton/);
  assert.match(html, /matched Payne/i);
  assert.match(html, /sale speed was not independently measured/i);
  assert.match(html, /euclid-oh-residential-furnace-installation-1200\.webp/);
  assert.match(html, /euclid-oh-payne-hvac-installation-1200\.webp/);
  assert.match(html, /&quot;Article&quot;|"Article"/);
  assert.match(html, /<link rel="canonical" href="https:\/\/eternityhvacr\.com\/projects\/euclid-payne-hvac-installation"/);
  assert.doesNotMatch(html, /sold faster|increased the sale price|guaranteed/i);
});

test("publishes a project library linking the two verified Euclid installations", async () => {
  const response = await render("/projects");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Matched Payne HVAC Replacement/);
  assert.match(html, /Central Air &amp; High-Efficiency Furnace/);
  assert.match(html, /href="\/projects\/euclid-payne-hvac-installation"/);
  assert.match(html, /href="\/projects\/euclid-central-air-installation"/);
  assert.doesNotMatch(html, /href="\/projects\/euclid-rooftop-hvac-diagnostic"/);
  assert.match(html, /href="\/projects" aria-current="page"/);
  assert.match(html, /<link rel="canonical" href="https:\/\/eternityhvacr\.com\/projects"/);
});

test("keeps the disputed rooftop route as a noindex evidence-bounded field record", async () => {
  const response = await render("/projects/euclid-rooftop-hvac-diagnostic");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Documented Equipment Conditions/i);
  assert.match(html, /frozen evaporator coil/i);
  assert.match(html, /equipment contamination/i);
  assert.match(html, /dust accumulation on the blower motor/i);
  assert.match(html, /no installed air filter/i);
  assert.match(html, /final diagnosis and repair outcome remain outside this public record/i);
  assert.match(html, /cleveland-commercial-rooftop-hvac-service-1200\.webp/);
  assert.match(html, /&quot;Article&quot;|"Article"/);
  assert.match(html, /<meta name="robots" content="noindex, follow"/i);
  assert.match(html, /<link rel="canonical" href="https:\/\/eternityhvacr\.com\/projects\/euclid-rooftop-hvac-diagnostic"/);
  assert.doesNotMatch(html, /No leak found|pressure test|leak repaired|refrigerant added|system restored|Euclid, OH 44119/i);
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
      requestType: "Repair or diagnostic",
      service: "Air conditioning",
      customer: "My home",
      timing: "This week",
      details: "The system is running but the home is not cooling.",
      name: "Test Customer",
      phone: "216-555-0100",
      email: "test@example.com",
      serviceConsent: true,
      feeAcknowledged: true,
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
  assert.match(source, /border-bottom:5px solid #F47A38/);
  assert.match(source, /Reply to customer/);
  assert.match(source, /Call customer/);
  assert.match(source, /role="presentation"/);
  assert.match(source, /Website source/);
  assert.match(source, /First page/);
  assert.match(source, /Form opened from/);
  assert.match(source, /Campaign source/);

  const customerEmail = source.slice(source.indexOf("function buildCustomerHtmlEmail"), source.indexOf("function sendEmail"));
  assert.doesNotMatch(customerEmail, /Website source|utmSource|referrerHost/);
});

test("captures first-touch attribution and uses reliable request-service navigation", async () => {
  const [layout, attribution, form, assistant, ...conversionFiles] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/LeadAttribution.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ServiceRequest.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SignmonsAssistant.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/SiteChrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ServiceLanding.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/LocationLanding.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ServiceAreaChecker.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/areas-we-serve/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/projects/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /<AttributionCapture \/>/);
  assert.match(attribution, /eternityAnalytics\?\.getAttribution/);
  assert.match(form, /captureLeadAttribution\("website_service_request"\)/);
  assert.match(form, /JSON\.stringify\(\{ \.\.\.data, startedAt, attribution \}\)/);
  assert.match(form, /landing_page: attribution\.landingPage/);
  assert.match(assistant, /captureLeadAttribution\("website_chat"\)/);

  for (const source of [assistant, ...conversionFiles]) {
    assert.doesNotMatch(source, /<Link[^>]*href="(?:\/|https:\/\/eternityhvacr\.com\/)#schedule"/);
  }
  assert.match(conversionFiles.join("\n"), /<a[^>]*href="https:\/\/eternityhvacr\.com\/#schedule"/);
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
  assert.match(component, /data\.requestType && data\.customer/);
  assert.match(component, /data\.serviceConsent/);
  assert.match(route, /REQUEST_TYPES\.has\(requestType\)/);
  assert.match(route, /!serviceConsent/);
  assert.doesNotMatch(route, /elapsed > 24/);
});

test("installs Google Analytics and records lead actions without customer PII", async () => {
  const [layout, analytics, form, checker] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/lib/analytics-bootstrap.js", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ServiceRequest.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/ServiceAreaChecker.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /analyticsBootstrap/);
  const bootstrap = await readFile(new URL("../app/lib/analytics-bootstrap.js", import.meta.url), "utf8");
  assert.match(bootstrap, /G-32W3PBPD8Y/);
  assert.match(bootstrap, /googletagmanager\.com\/gtag\/js/);
  assert.match(form, /trackGoogleEvent\("generate_lead"/);
  assert.match(form, /trackGoogleEvent\("service_form_start"/);
  assert.match(form, /trackGoogleEvent\("service_form_step"/);
  assert.match(form, /trackGoogleEvent\("service_form_complete"/);
  assert.match(form, /trackGoogleEvent\("emergency_request"/);
  assert.match(analytics, /"phone_click"/);
  assert.match(analytics, /"email_click"/);
  assert.match(analytics, /"ai_referral_visit"/);
  assert.match(analytics, /chatgpt/);
  assert.match(analytics, /perplexity/);
  assert.match(checker, /trackGoogleEvent\("service_area_check"/);
  assert.match(checker, /service_area_result: "approved"/);
  assert.match(checker, /service_area_result: "confirmation_needed"/);
  const checkerEvents = [...checker.matchAll(/trackGoogleEvent\("service_area_check",\s*\{([\s\S]*?)\}\);/g)];
  assert.equal(checkerEvents.length, 2);
  for (const event of checkerEvents) assert.doesNotMatch(event[1], /normalizedZip|\bzip\b/i);
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
    assert.match(asset, /#F47A38/);
    assert.doesNotMatch(asset, /<metadata|<rect/i);
  }
  assert.match(logo, /viewBox="50 270 924 486"/);
  assert.match(mark, /viewBox="286 270 452 236"/);
  assert.match(favicon, /viewBox="286 270 452 236"/);
  assert.match(chrome, /eternity-logo-reverse\.svg/);
});

test('all sitemap pages have unique metadata, self canonicals and indexable HTML', async () => {
  const sitemap = await readFile(new URL('../public/sitemap.xml', import.meta.url), 'utf8');
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(x => x[1]);
  const titles = new Set();
  for (const url of urls) {
    const response = await render(new URL(url).pathname);
    assert.equal(response.status, 200, url);
    const html = await response.text();
    const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
    assert.ok(title && !titles.has(title), `Missing or duplicate title: ${url}`);
    titles.add(title);
    assert.match(html, /<meta name="description" content="[^"]+"/);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    assert.equal(new URL(canonical).href, new URL(url).href);
    assert.doesNotMatch(html, /<meta name="robots" content="[^"]*noindex/);
    for (const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) assert.ok(JSON.parse(match[1]));
  }
  assert.doesNotMatch(sitemap, /<loc>[^<]*(?:\/admin\/|\/appointment\/|euclid-rooftop-hvac-diagnostic)/);
  const missing = await render('/not-a-real-page-audit');
  assert.equal(missing.status, 404);
  assert.match(await missing.text(), /<meta name="robots" content="noindex"/);
});

test("paid requests require explicit fee acknowledgment; free estimates do not, and emails preserve the terms", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalKey = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = 'synthetic-test-key';
  const deliveries = [];
  globalThis.fetch = async (_url, init) => { deliveries.push(JSON.parse(init.body)); return Response.json({ id: 'synthetic' }); };
  t.after(() => { globalThis.fetch = originalFetch; if (originalKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = originalKey; });
  let ip = 30;
  const send = (extra) => dispatch(new Request('https://eternityhvacr.com/api/service-request', {
    method: 'POST', headers: { origin: 'https://eternityhvacr.com', 'content-type': 'application/json', 'x-forwarded-for': `192.0.2.${ip++}` },
    body: JSON.stringify({ requestType: 'Repair or diagnostic', service: 'Heating', customer: 'My home', timing: 'This week', details: 'Synthetic local equipment request.', name: 'Test Customer', phone: '2025550100', email: 'test@example.invalid', serviceConsent: true, website: '', startedAt: Date.now() - 3000, ...extra }),
  }));
  for (const feeAcknowledged of [undefined, false, 'true']) {
    assert.equal((await send({ feeAcknowledged })).status, 400);
  }
  assert.equal(deliveries.length, 0);
  assert.equal((await send({ feeAcknowledged: true, customer: 'A business', requestType: 'Commercial / refrigeration' })).status, 200);
  assert.equal(deliveries.length, 2);
  for (const email of deliveries) for (const content of [email.text, email.html]) {
    assert.match(content, /Service-charge acknowledgment: Confirmed on website/);
    assert.match(content, /Commercial: \$150/);
    assert.match(content, /Pay at the visit/);
  }
  deliveries.length = 0;
  assert.equal((await send({ requestType: 'Installation estimate', feeAcknowledged: false })).status, 200);
  assert.equal(deliveries.length, 2);
  for (const email of deliveries) {
    assert.match(email.html, /Free installation estimate/);
    assert.doesNotMatch(email.html, /Service-charge acknowledgment: Confirmed/);
  }
});

test("website appointment confirmation rejects unacknowledged fees without calling upstream", async (t) => {
  const originalFetch = globalThis.fetch;
  let calls = 0;
  globalThis.fetch = async () => { calls++; throw new Error('must not call upstream'); };
  t.after(() => { globalThis.fetch = originalFetch; });
  for (const feeAcknowledged of [undefined, false, 'true']) {
    const response = await dispatch(new Request('https://eternityhvacr.com/api/signmons/appointments/confirm', {
      method: 'POST', headers: { origin: 'https://eternityhvacr.com', 'content-type': 'application/json' },
      body: JSON.stringify({ sessionId: 'session-test', jobId: '11111111-1111-4111-8111-111111111111', slotToken: 'synthetic-slot-token-only', feeAcknowledged }),
    }));
    assert.equal(response.status, 400);
  }
  assert.equal(calls, 0);
});

test('property-manager page renders factual case, management flow and matching structured data', async () => {
  const response = await render('/multifamily-hvac');
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /PTAC unit swap at Eliza Bryant/);
  assert.match(html, /checked refrigerant pressures and verified that both heating and cooling operated/);
  assert.match(html, /Service-call pricing depends on the property and equipment/);
  assert.match(html, /id="schedule"/);
  assert.match(html, /serviceScope=property-estimate/);
  assert.match(html, /serviceScope=property-maintenance/);
  assert.match(html, /rel="canonical" href="https:\/\/eternityhvacr.com\/multifamily-hvac"/);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m => JSON.parse(m[1])).flat();
  const faq = schemas.find(x => x['@type'] === 'FAQPage');
  assert.ok(faq.mainEntity.some(x => x.name === 'Can a tenant submit a service request?'));
  assert.ok(schemas.some(x => x['@type'] === 'Service' && x.url.endsWith('/multifamily-hvac')));
});

test('managed-property delivery requires authority and property details and preserves them in both emails', async (t) => {
  const originalFetch = globalThis.fetch, originalKey = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = 'synthetic-key';
  const deliveries = [];
  globalThis.fetch = async (_url, init) => { deliveries.push(JSON.parse(init.body)); return Response.json({ id: 'synthetic' }); };
  t.after(() => { globalThis.fetch = originalFetch; if (originalKey === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = originalKey; });
  let ip = 90;
  const send = extra => dispatch(new Request('https://eternityhvacr.com/api/service-request', {
    method:'POST', headers:{ origin:'https://eternityhvacr.com', 'content-type':'application/json', 'x-forwarded-for':`192.0.2.${ip++}` },
    body:JSON.stringify({ requestType:'Repair or diagnostic', service:'PTAC', customer:'A managed property', timing:'This week', details:'Synthetic PTAC heating concern.', name:'Synthetic Manager', phone:'2025550100', email:'synthetic@example.invalid', serviceConsent:true, feeAcknowledged:true, startedAt:Date.now()-3000, managementAuthorized:true, managementRole:'Authorized property manager', propertyAddress:'123 Synthetic Street', propertyType:'Apartment community', affectedUnits:'2', accessDetails:'Manager meets technician', vendorRequirements:'PO required <script>bad</script>', ...extra }),
  }));
  for (const extra of [{managementAuthorized:false}, {managementAuthorized:'true'}, {managementRole:'Tenant'}, {propertyAddress:''}, {propertyType:'Invented'}, {accessDetails:''}, {feeAcknowledged:false}]) assert.equal((await send(extra)).status,400);
  assert.equal(deliveries.length,0);
  assert.equal((await send({})).status,200);
  assert.equal(deliveries.length,2);
  for(const mail of deliveries) {
    assert.match(mail.text,/Management authority: Confirmed on website/);
    assert.match(mail.text,/123 Synthetic Street/);
    assert.match(mail.text,/confirm the applicable charge before scheduling/);
    assert.doesNotMatch(mail.html,/<script>bad/);
    assert.match(mail.html,/&lt;script&gt;bad/);
  }
  deliveries.length=0;
  assert.equal((await send({ requestType:'Installation estimate', feeAcknowledged:false })).status,200);
  assert.equal(deliveries.length,2);
  assert.match(deliveries[0].text,/Free installation estimate/);
  assert.match(deliveries[0].text,/Management authority: Confirmed/);
});

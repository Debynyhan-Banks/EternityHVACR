# Search consistency and performance review

September 28, 2026. Local candidate based on release 105 / 128ae4662eac24d9f752811a715a2ca4cddbb962; not published.

## Verified search findings and corrections

Rendered inventory covers 28 application pages plus a missing-page check. All 25 intended sitemap URLs return 200, have unique titles, nonempty descriptions, self-referencing canonicals and indexable HTML. JSON-LD parses successfully. Appointment management and the incomplete rooftop case remain noindex and outside the sitemap; the admin route is excluded and requires the Cloudflare runtime for its authentication redirect. Missing URL returns 404 with noindex. The public second-opinion landing page remains intentionally indexable; its private upload/API paths are not sitemap entries.

Sitemap lastmod values were stale after significant updates: furnace, boiler and refrigeration now record September 28 (release 105 links), and estimate records September 25 (40bc39b pricing guide). No blanket freshness date was applied to unchanged pages. Google uses verifiable significant-update dates, not a daily regeneration timestamp: https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap

BUSINESS-FACTS.md still called all response times unconfirmed despite dated approvals in PROGRESS-TRACKER.md (August 24 website target, August 28 SMS release) and CLIENT-CONTENT-CHECKLIST.md. It now distinguishes website review within 15 minutes during business hours and monitored SMS with a 15-minute reply target from unpromised technician arrival or continuous availability. Public claims were not broadened.

The new rendered regression test verifies every sitemap URL and checks private/incomplete exclusions and a real 404. Existing navigation/anchor/redirect tests remain in the suite. JSON parsing is not a rich-result eligibility guarantee or a full external schema validator. Existing service/FAQ builders source their data from the same visible content.

## Performance method

Run the existing built fixture server with `node scripts/privacy-test-server.mjs`, then `node scripts/measure-performance.mjs OUTPUT.json` with PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH pointing to installed Chromium. The script uses five paths (home, furnace, boiler, refrigeration, estimate), three cold contexts per profile, 390x844/DPR2 mobile and 1440x900/DPR1 desktop. Mobile: 150ms network latency, 1.6Mbps download, 4x CPU slowdown. Desktop: 40ms latency, 10Mbps download, no CPU slowdown. Third-party requests are blocked. Readings end 1.8 seconds after load. CLS is accumulated for this load interval, not a full user-session metric. These are local samples, not field Core Web Vitals, Lighthouse scores, production TTFB or INP.

Performance choices follow measured LCP elements, not image file size alone: https://web.dev/articles/optimize-lcp

## Release boundary

No publication, account changes, indexing requests, production form submissions or customer operations in this milestone. Live site remains release 105 until separate approval. GA4 lead totals and field performance were not read in this local audit.

## Measured baseline

| Page | Mobile median LCP | Desktop median LCP | Mobile LCP element |
|---|---:|---:|---|
| / | 3.468s | 0.544s | H1 |
| /services/furnace-heating-repair | 3.532s | 0.600s | H1 |
| /services/boiler-service | 3.536s | 0.600s | P |
| /services/commercial-refrigeration | 3.560s | 0.600s | H1 |
| /estimate | 3.356s | 0.564s | IMG |

All 30 samples had zero measured load-interval CLS and no horizontal overflow. The fixture serves uncompressed assets; production compression, CDN latency and third-party costs are not represented. Therefore these are reproducible local baselines, not live-site speed claims. The main stylesheet was 133,169 bytes before transport overhead and its uncompressed transfer completed around the text LCP on the inspected mobile samples. This correlation suggests profiling render-blocking CSS/competition next, but does not prove which code change will improve production LCP. No performance runtime change was made; no before/after improvement is claimed. Photos, crop, fonts and assistant loading are unchanged.

Verification: all 36 rendered/API cases passed (including the new full sitemap metadata/404 test); TypeScript passed; lint reported zero errors and 15 existing image warnings. No browser behavior changed, so the earlier release's 21 browser checks are historical evidence, not rerun results for this candidate. A final production build and rendered suite will be recorded below.

Final `npm test`: fresh production build succeeded and all 36 rendered/API tests passed. `git diff --check` passed. Local fixture/browser processes exited. The first inventory attempt reached a Cloudflare-only admin import; the inventory now explicitly labels that route as requiring its runtime instead of claiming a local authentication check.

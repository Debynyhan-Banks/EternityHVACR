# Mobile loading review — September 28, 2026

Prepared from published release 106, source 641a5b6050b9204056a43f3a954f3ee87724465f. This candidate is local and unpublished.

## Result and retained change

The shared footer logo now uses native lazy loading, async decoding and its real 924x486 intrinsic dimensions. Google Chrome no longer requests or preloads this offscreen image during initial service-page loading. A representative compressed boiler-page sample removed 10,043 transferred bytes (live baseline: 10,263 bytes). Scrolling to the footer loads the logo successfully on 390px mobile and 1440px desktop. The homepage uses the same asset in its visible hero, so this change does not remove that homepage request. Styling, photos, content, form behavior, analytics and booking contracts are unchanged.

The explicit mobile hero preload experiment was rejected: its compressed-local homepage median was 1.136s versus 1.068s before. It is absent from the final candidate. The main visible image remains eager/high priority through its existing picture element. No image transformations or new image assets were created.

## Live baseline and controlled comparison

| Page | Live mobile median LCP | Compressed local before | Local footer candidate* |
|---|---:|---:|---:|
| Home | 2.556s | 1.068s | No final speed claim |
| Furnace | 1.576s | 1.180s | 1.176s |
| Boiler | 1.616s | 1.176s | 1.180s |
| Refrigeration | 1.580s | 1.200s | 1.184s |
| Estimate | 2.016s | 1.440s | 1.444s |

*Service and estimator samples were collected while the independent homepage-only preload experiment was present. Their page markup/loading behavior is unchanged in the final footer-only candidate. Differences of 4–16ms do not establish meaningful LCP improvement. The verified benefit is removing an unnecessary initial resource, not a substantial speed increase. All 45 measured samples had zero load-interval CLS and no horizontal overflow. Boiler live samples included a 3.068s outlier; these are three-sample medians, not percentiles.

Live homepage LCP was the existing ~80KB mobile hero WebP. In the second live sample it began at 259ms, finished at 2404ms and painted at 2436ms. Service-page LCP was heading/paragraph text. Live stylesheet transfer was about 24KB compressed, much smaller than the earlier 133KB uncompressed fixture. Local transport and third-party differences mean local and live values must not be presented as before/after production improvement. No field Core Web Vitals, INP, Lighthouse score or customer conversion improvement is claimed.

Google performance guidance: https://web.dev/articles/optimize-lcp

## Reproduction

Set PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH to the installed test Chromium executable. Run `PROFILE_BASE_URL=https://eternityhvacr.com node scripts/profile-mobile.mjs OUTPUT.json` for the public baseline. The script visits five public pages without submitting forms; non-GET/HEAD traffic is blocked. Public GET assets, including third-party scripts, are allowed, so this is a navigation-only lab profile rather than a complete customer session.

For the controlled local profile, build first, then run `PERF_COMPRESSION=1 node scripts/privacy-test-server.mjs` in one terminal and `node scripts/profile-mobile.mjs OUTPUT.json` in another. Local third-party traffic is blocked and APIs are refused by the fixture. The original test-server behavior remains the default without PERF_COMPRESSION.

The checked-in JSON contains summarized samples and resource evidence. Raw resource waterfalls are in /private/tmp/eternity-live-mobile-before.json, /private/tmp/eternity-compressed-before.json and /private/tmp/eternity-compressed-after.json for this session; temporary files are not durable project artifacts.

## Validation and release boundary

Final `npm test`: fresh build and all 36 rendered/API tests passed. TypeScript passed. Lint: zero errors, 15 existing image warnings. Whitespace check passed. Mobile and desktop isolated-browser checks confirmed one correct hero image download, no overflow, no initial footer-logo request on boiler, and successful footer-logo loading after scroll. Mobile screenshot reviewed. Existing 21 interaction tests were not rerun because no interaction code changed.

No publication, indexing request, GA4 setting change, live service submission or customer contact occurred. Publishing requires approval of this concrete footer-loading change. Rollback is reverting the footer image attributes; diagnostic scripts do not affect production.

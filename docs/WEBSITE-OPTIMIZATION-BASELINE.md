# Website optimization baseline — September 27, 2026

Scope approved by the owner's “proceed”: implementation-plan Milestones 0–1 only (baseline and privacy/measurement). No service-page redesign, backend changes, publishing, push, merge, account mutation, provider call or live submission.

## Source and deployment

Original focused checkout: `/Users/debynyhanbanks/Documents/ChatGPT/Eternity Mechanical Services Website-seo-geo-appearance-20260925`, branch `codex/eternity-seo-geo-appearance-20260925`, clean at `40bc39b60a4b6bbd4f1bc38cdfd80edbc9c5a2ea`; local tracking ref matches (no remote refresh claimed). Implementation was built/tested in `/private/tmp/eternity-analytics-privacy-20260927` and is retained in `/Users/debynyhanbanks/Documents/ChatGPT/Eternity Mechanical Services Website-analytics-privacy-20260927`, branch `codex/eternity-analytics-privacy-20260927`. Original checkout and Signmons remain untouched.

Fresh read-only Sites receipts resolve the prior publication uncertainty: project `appgprj_6a7c5b31e20c8191a542285c9ae55e55` is active/public with current live URL `https://eternityhvacr.com`; latest saved version **103** binds that exact SHA. Version ID `appgprj_6a7c5b31e20c8191a542285c9ae55e55~appgver_4bed36347e648191b81305f4fc08c45a` has deployment `appgdep_6ab69cb9947c8191a8e284549dc3f048`, status **succeeded**, updated September 25 at 16:10:30 UTC. These are provider receipts, not a fresh customer-flow test. The older tracker “unpublished pricing candidate” is superseded by these receipts. No new version was saved or deployed.

## Demonstrated gaps and bounded changes

| Source/evidence | Expected change | Required evidence |
| --- | --- | --- |
| Root layout globally configures GA4 before route checks; management client reads a fragment credential | Early explicit public-route gate; disable before crossing into private routes; document-navigation isolation | Private hard loads, native and History API navigation, reload/back/forward; no tag/collect requests |
| Analytics effect parses referrers/accesses storage before registering contact listeners | Early listeners, guarded optional storage/parsing, exact AI host classification | Denied storage, malformed/referrer lookalikes, rapid contact actions |
| Free-form URL/campaign and event parameters; appointment timing telemetry | Canonical location, known referrers/campaign vocabulary, bounded event fields; remove private management events/timing | Synthetic canaries absent from marketing payloads and console |
| Form emits generate_lead and service_form_complete for one accepted response; state-only submit lock | One canonical lead contract; retain diagnostic event; synchronous in-flight/accepted guard | Duplicate submits, error/retry, one accepted mock response, throwing telemetry |
| GA4 settings not inspected | Document release gate for key-event/enhanced-measurement settings | Actual account verification remains separate; no claim reporting is already fixed |

Known tradeoff: unrecognized query/fragment values fail closed for marketing, without changing the URL or page operation. Named campaigns need reviewed registry entries.

Existing interfaces reused: root bootstrap, Analytics event wrapper, attribution capture, service form and appointment/assistant seams. Request/booking payloads, consent, validation, backend authentication, idempotency and business facts stay unchanged. Current pricing qualifications and approved URLs are preserved.

## Route/event inventory

Marketing allowlist contains existing public home/service/resource/project/area/estimate/privacy/terms pages. Appointment management, admin uploads, APIs/downloads, unknown/authentication routes fail closed. The second-opinion upload page is deliberately excluded from marketing tags because it handles private documents; public content and upload behavior remain unchanged. The incomplete rooftop case is also not included.

All existing manual events were inventoried in `app/components` and `app/appointment/manage`. Private appointment view/reschedule/cancel and management-link events are removed. Public appointment confirmation remains a category-only event; exact appointment start is removed. Event names and bounded parameters are defined together in `app/lib/analytics-bootstrap.js`.

## Validation plan and limits

Use Node >=22.13.0 and unchanged existing dependency versions. Add only pinned Playwright test tooling for meaningful mocked browser/network regression. Run lint, `npm test` (build plus rendered tests), browser privacy/form/management tests and whitespace checks. Existing rendered tests cover request and Signmons proxy contracts with fake upstream responses; no real email, calendar, payment, provider or customer operation is authorized.

Manual page views own initial and public history navigation; `send_page_view:false` disables config's implicit view. GA4 account enhanced history/form/download/outbound/search measurement must be reviewed before publication. Mocked Google transport verifies application boundaries, not undisclosed remote tag configuration. Native contact links remain immediate; delivery on instant external navigation remains best effort, not guaranteed. No metrics or rankings promised.

## Local completion

Build and all 35 rendered/API tests pass; all 17 mocked browser tests pass; type checking and whitespace pass; lint has zero errors and 15 pre-existing image warnings. See [review and release checklist](WEBSITE-OPTIMIZATION-REVIEW.md) for exact commands, test limits and account publication gates. No push or deployment occurred.

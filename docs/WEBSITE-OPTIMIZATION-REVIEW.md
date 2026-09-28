# Review: baseline and analytics privacy/measurement

September 27, 2026. **Implemented and locally tested; not pushed, merged or deployed.** Scope is implementation-plan Milestones 0–1. The existing production deployment remains Sites version 103 at source `40bc39b60a4b6bbd4f1bc38cdfd80edbc9c5a2ea`, confirmed through fresh read-only provider receipts.

## What changed

- Replaced unconditional global GA setup with a synchronous public-route/URL gate. Private and unknown routes never initialize the tag; crossing the privacy boundary disables the old document and uses a new document. BFCache, delayed loading and event dispatch obey the same boundary.
- Kept the existing GA ID. Canonical URLs, known referrers, bounded event names/fields and supported campaign values replace arbitrary URL/event strings. Public page views have one application owner. Private appointment events, management-link events and exact appointment timestamps are removed from marketing.
- Contact listeners now register before optional storage/referrer work. Blocked storage and malformed URLs do not break contact actions. Early interactions start the existing tag loader immediately; delivery remains best effort.
- Form success retains `generate_lead` and its diagnostic `service_form_complete`, with an explicit single-lead reporting contract. Synchronous submit/accepted guards prevent concurrent duplicate requests and reset for “Start another request.” Analytics failures cannot misreport an accepted request as an error.
- Preserved API field names and all existing booking/manage operations. Source assertions were updated for the approved removal/relocation of telemetry and supplemented with actual built-page browser tests. Added pinned `@playwright/test` 1.58.2; no existing package versions were upgraded.
- Updated current roadmap/progress status without changing approved pricing, content, brand or URLs.

## Verification

| Command | Actual result |
| --- | --- |
| `npm test` | Production build succeeded; all 35 rendered/API tests passed |
| `npm run test:browser` with cached Chromium executable override | 16-test suite passed (52.2 seconds); added admin redirect check passed separately (4.3 seconds) |
| `npx tsc --noEmit` | Passed |
| `npm run lint` | Zero errors; 15 existing image warnings |
| `git diff --check` | Passed |

Tests used Node 24.12.0, the existing lockfile plus the pinned browser tooling, and cached Chromium `chromium-1217` through `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. The default reproducible setup is `npm ci`, `npx playwright install chromium`, `npm test`, then `npm run test:browser`. Lint/type checks are separate. The browser server binds only `127.0.0.1:4179`, serves built output and refuses unmocked API calls. Every external browser request is mocked or aborted. No genuine customer token, provider request, email, text, booking or payment was used.

The browser suite covers private hard loads, unknown/download/upload routes, native and History API boundary crossings, private view/reload/reschedule/cancel, back/forward, pre-tag-load navigation, denied storage, malformed/forged referrers, opt-out, single application page views, arbitrary URL canaries, free-form event rejection, duplicate form submits, failure/retry, starting another request, throwing analytics, session first touch and precise AI host matching.

Initial findings were resolved rather than hidden: the sandbox refused localhost binding, so identical synthetic tests ran with local-process permission; an old source assertion required a now-prohibited management event and was replaced by an absence assertion plus browser lifecycle coverage; the initial browser test used a covered radio input instead of its visible label and sampled pending beacon requests too early. Corrected tests use native visible labels and await recorded requests. Review also caught and fixed the new accepted guard's reset path. Final results above are after those corrections.

Local logs: `/private/tmp/eternity-privacy-build-tests.log`, `eternity-privacy-rendered.log`, `eternity-privacy-browser.log`, `eternity-privacy-lint.log`, and `eternity-privacy-types.log`; the added admin redirect check is in `/private/tmp/eternity-privacy-admin.log`. Tests create only ignored `test-results`; no traces/videos/customer artifacts are committed.

## Material limits and next owner/account work

1. **GA4 account settings remain unverified.** Before publication, inspect the existing stream, disable conflicting automatic history/form/outbound/download/search/user-data measurement, and confirm `generate_lead` is the only counted form-lead key event. `service_form_complete` and `emergency_request` describe the same lead. Mocked transport proves this application's behavior, not remote GA configuration or actual reporting totals.
2. Unrecognized query/fragment values disable marketing for that document. Supported source/medium values and known estimator scopes/anchors work; no named campaigns have yet been approved. Unknown referrers remain unknown. This reduces coverage of unusual links intentionally; approve campaign registry additions before relying on those links for reporting.
3. Existing server attribution still normalizes unavailable paths to `/`; the frontend does not fabricate `direct`, but backend reports need to distinguish that historical fallback from a demonstrated homepage landing. No backend field/schema was changed.
4. Native contact delivery is best effort. A clicked phone link is not a call, accepted form is not an appointment, and confirmed appointment is not a completed job.
5. No new visual service-page conversion, SEO/performance work, owner claims, case study or property-manager page was implemented. Those are later milestones.

## Later release and rollback checklist

- Review this bounded diff, event contract and final local commit. Reconcile any intervening source/deployment changes; preserve existing work.
- Complete the GA4 account gate above with its own authorized account scope; do not call local tests account verification.
- Obtain authorization for the exact source push/publication. Build/package that exact source through the existing Sites project, preserve public audience, save a version bound to the pushed SHA and deploy only that version.
- Verify terminal deployment receipt, configured custom domain and affected public/private routes. Any live synthetic service submission requires its own explicit authorization and label; routine read-only page checks do not prove delivery or booking.
- Keep version 103/source `40bc39b` as the previous functional deployment reference. It contains the original analytics privacy risk, so it is **not** a privacy-safe rollback. For a suspected telemetry leak, prefer a reviewed release with marketing disabled over blindly restoring the old global tag. Any rollback/publication remains separately authorized.
- Report implemented, locally tested, deployed and externally verified states separately. Do not infer additional completed jobs from these tests.

Persistent worktree: `/Users/debynyhanbanks/Documents/ChatGPT/Eternity Mechanical Services Website-analytics-privacy-20260927`; branch `codex/eternity-analytics-privacy-20260927`. Original focused website checkout and Signmons repositories are preserved.

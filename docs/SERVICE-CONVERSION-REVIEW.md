# Service-page conversion review

September 28, 2026. Milestone 2, local implementation for review; not published.
Base: approved release 104, commit baa9e65ce9cca1d1ca3f898d99f9c13c14217736.

## Behavior

- Furnace, boiler and commercial refrigeration heroes now offer native Call and Request service links. Their lower request actions use the same destination.
- The existing homepage request form accepts only three serviceScope values. They select Heating/Repair or diagnostic, Boiler/Repair or diagnostic, or Refrigeration/Commercial respectively. Property, urgency, symptoms and consent remain customer choices.
- Customer selections remain editable. Form Back/Continue does not reapply presets. No customer input is persisted in a URL or new storage. A fresh page load starts a fresh form; this change does not add cross-document draft persistence.
- Invalid, duplicate and conflicting estimator/service handoffs are ignored. Existing estimator prefills remain supported; inherited-object keys are now rejected explicitly.
- Analytics permits only the three new public query values, retains canonical page URLs and the existing bounded events. API fields and Signmons behavior are unchanged.
- Existing attribution keeps first landing and conversion sourcePage separate. It has no dedicated immediate service-origin field: do not interpret sourcePage as that origin or add unsupported backend fields.
- Current global header and mobile Request links remain generic. The scoped hero and lower service actions carry the preset.

## Verification and limits

Results recorded after final checks below. All API and analytics transport in browser tests are mocked; external requests are aborted. No real requests, messages, appointments or GA4 configuration changes occur.

Desktop-emulated mobile checks cannot prove physical iOS/Android on-screen keyboard behavior. Existing form-focus suppression of floating actions is verified; device QA remains useful. No new medical/safety, pricing, performance or ranking claims are introduced.

## Publication

Review this local commit separately before publishing. Previous deployed version remains 104. GA4 account settings were completed in the preceding approved task; live lead reporting totals have not been re-audited here.

Final checks: production build and 35 rendered/API tests passed; TypeScript passed; lint has zero errors and 15 existing image warnings. Browser run passed 18 tests initially, with three new journeys blocked by an ambiguous test selector (ZIP and service submit buttons). After selecting the service submit button by its accessible name, all four affected tests passed (three journeys plus invalid/estimator handoffs): all 21 cases have passing results. A final rebuild includes the nullable estimator-field type correction. Mobile screenshots for all three pages were inspected at 390 × 844; native links have at least 44px targets, keyboard activation works, reduced-motion mode is supported, and the action bar hides during form focus. Screenshots and logs are under /private/tmp/eternity-*. Physical-device keyboard and cross-document draft restoration are not claimed.

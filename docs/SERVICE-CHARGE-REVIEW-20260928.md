# Website paid-service and free-estimate separation

Approved scope: Eternity website only. Paid service requests disclose residential $99/$149 and commercial $150/$225, regular hours and payment at the visit. Free installation estimates and quote second opinions remain separate. Existing commercial requests remain team-confirmed; instant commercial scheduling is not claimed.

Implementation:
- Booking page shows payment timing and separate commercial-service/free-estimate prefills.
- Request form shows terms before contact entry and requires an unchecked fee acknowledgment for paid paths. Changing request type or customer category clears acknowledgment.
- Website request API rejects absent, false or string acknowledgments on paid requests before email delivery. Internal and customer emails carry the server-derived terms. Free estimates do not require fee acknowledgment.
- Residential arrival-window buttons require acknowledgment. The website confirmation endpoint checks the boolean and forwards the original three-field payload to the existing integration; no Signmons backend, scheduling or Stripe change.
- Public analytics allowlists the two new fixed handoff values. No new personal information is included in telemetry.

Verification uses synthetic requests and mocked/blocked external services. No real customer request, email, appointment, payment or repeat Google submission is part of this release. Existing commercial RTU estimator wording still identifies diagnostic work as a paid service request; it is not relabeled as a free diagnostic.

Rollback: restore the preceding website release (8e47d78677070ff2cf9bbe0ed2e97cb66c979409 / Sites 110) through the existing publication workflow if needed.

Validation completed: 38 rendered/API tests passed; 21 analytics browser checks and 3 booking browser checks passed against the finished build. The first browser run was invalidated by a concurrent rebuild; the stable rerun passed existing checks, and the new test's native-radio locator was corrected to click the visible label before its passing focused rerun. TypeScript passed; lint reports zero errors and 15 existing image warnings. Mobile form layout inspected at 390px. Whitespace check passed. No live submission was made.

# Analytics privacy and event contract

Status: local implementation for review, September 27, 2026. Stream ID remains `G-32W3PBPD8Y`. No account settings were changed. This document describes the proposed source, not a deployed analytics configuration.

## Collection boundary

The root's synchronous head bootstrap installs the route and event guards before hydration or tag configuration. An explicit existing-public-page allowlist fails closed for appointment management, admin/authentication, APIs/private downloads, second-opinion uploads, the incomplete rooftop case and unknown routes. Route matching is exact. Google receives no private route token or customer contents through this application event API.

Unrecognized query keys, duplicate parameters, unknown campaign values and unknown fragments disable marketing for that document. The URL itself is left untouched, so operational tokens, uploads and estimator behavior are preserved. The existing five `estimateScope` values and known public anchors are supported. This intentionally sacrifices measurement of unusual links rather than assuming automatic measurement ignores them. A future campaign requires a reviewed named registry entry; the campaign registry is currently empty. `utm_source` and `utm_medium` support the finite values listed in the source. A string length limit is not the privacy boundary.

On permitted pages, GA receives a canonical public path as `page_location`, a fixed page label (not arbitrary DOM text), and a sanitized referrer. Known external domains are reduced to fixed domain URLs; internal referrers retain only a public path; unknown referrers remain blank. Exact/subdomain matching rejects lookalikes. No arbitrary external host, query or fragment becomes a marketing field.

Native links crossing into an excluded route disable GA in capture phase. History API transitions crossing that boundary disable GA before the URL changes, then use a new document. Private hard loads never configure/load the tag. Page hide disables collection and clears pending commands; BFCache restoration reloads rather than reopening old tag listeners. The Google script request uses no-referrer. Native call/text/email actions are not cancelled or delayed.

The existing 2.5-second passive loader remains. An eligible tracked interaction starts loading immediately. This improves the opportunity to deliver rapid contact events; navigation, offline behavior, browser blocking or consent can still prevent delivery. A click is not proof of a call.

## Page views and account dependency

The application owns manual `page_view` events: one initial view and one per changed public pathname, including history back/forward. Same-path/hash-only changes do not produce another application view. `send_page_view:false` suppresses the configuration command's automatic page view. Sanitized location/referrer fields are also supplied with every manual event. Public client transitions use the preceding public page as their referrer.

**Publication gate:** inspect the existing GA4 web stream and disable automatic history page changes, form interactions, outbound-click/download/site-search and any user-provided-data collection that could bypass the application field contract. Review other enhanced measurement settings explicitly. No account readback was obtained here; passing mocked-transport tests does not certify the remotely configured Google library. Confirm DebugView/page-view counts with approved synthetic test handling before declaring production reporting verified. Preserve existing consent/opt-out controls; the standard `ga-disable-G-32W3PBPD8Y` flag is honored and never re-enabled by this code.

## Counted outcomes

| Event/group | Meaning | Reporting rule |
| --- | --- | --- |
| `generate_lead` | One successful service-request API response | Canonical counted form lead; configure as the single form-lead key event |
| `service_form_complete` | Diagnostic companion for the same response | Do not count as a second lead/key event |
| `service_form_start`, `service_form_step`, `service_form_error` | Form progress or failure | Diagnostic, not a lead |
| `emergency_request` | Urgent category of that accepted form request | Segment the same lead; not another lead |
| `phone_click`, `text_click`, `email_click`, `review_link_click` | Native link interaction | Contact intent only |
| `ai_referral_visit` | Recognized AI campaign/referrer | Once per recognized source per browser session when storage is available; once per document without storage |
| `service_area_check` | Covered/confirmation-needed category and bounded market count | No ZIP code, address or customer identity |
| `project_estimator_*`, `estimator_handoff_loaded` | One of five known project scopes | No new price/quote data |
| `assistant_open`, `assistant_path_selected`, `assistant_chat_started`, `assistant_message_sent`, `assistant_response_received`, `assistant_handoff`, `assistant_estimator_context_received` | Bounded interaction category | No messages, property details, IDs or uploaded content |
| `assistant_appointment_confirmed` | Existing client received a confirmed-booking response | Booking category, not completed work; no exact start time/token |
| `assistant_appointment_failed` | Bounded HTTP failure status | Diagnostic |
| Private appointment-management events | Removed from marketing | Operational view/reschedule/cancel still function through their existing authenticated API |

All accepted manual event names and parameter values are allowlisted centrally. Unknown fields/names are dropped. Parameters permit only known service/request/property/timing categories, public paths, approved scope/source labels, a boolean safety flag and bounded integers. No raw error strings, timestamps, contact destinations, tokens, customer fields or custom free text.

The service form uses a synchronous in-flight guard and an accepted-response guard, reset only by “Start another request.” Failed requests permit retry and emit no lead. Telemetry failures cannot turn an accepted API response into a form error. Existing server contracts are unchanged; this does not add cross-reload/server-side form idempotency.

## Attribution

Operational attribution retains the current JSON field names. Sanitized first touch is fixed for the browser session; later service-origin/conversion distinctions needing a new backend field remain outside this milestone. Blocked storage uses an in-memory first touch. Stored data is validated before reuse; malformed/tainted fields are discarded. Missing source is not emitted as a custom `direct` value; campaign fields are not repeated on lead events to override native GA attribution.

Unknown paths still encounter the existing endpoint's historical `/` fallback when the optional attribution is absent/empty. That server behavior is not evidence of a homepage landing and has not been silently changed. Reporting must treat unavailable attribution as unknown; any backend schema refinement is separate.

## Official references checked for this implementation

- [Google tag privacy controls](https://developers.google.com/tag-platform/security/guides/privacy): documented disable flag.
- [GA4 configuration](https://developers.google.com/analytics/devguides/collection/ga4/reference/config): location/referrer/campaign and advertising fields.
- [Manual page views](https://developers.google.com/analytics/devguides/collection/ga4/views) and [SPA measurement](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications): page-view ownership.
- [Enhanced measurement](https://support.google.com/analytics/answer/9216061?hl=en): account-level automatic events must be verified separately.

No ranking, delivery, lead-count or completed-job improvement is claimed from local tests.

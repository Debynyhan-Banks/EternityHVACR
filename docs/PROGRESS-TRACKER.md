# Eternity Mechanical Services Website Progress Tracker

Last updated: September 3, 2026

This file is the source of truth for the SEO, GEO, content and feature program. Update it whenever a task begins, finishes, becomes blocked or changes scope.

## Status legend

- `Not started` — no implementation work has begun
- `Waiting on Eternity` — business information, images or approval are required
- `Ready` — requirements are known and work can begin
- `In progress` — implementation is underway
- `In review` — built and awaiting verification or approval
- `Complete` — verified and published
- `Deferred` — intentionally postponed

## Current position

**Current milestone:** Monthly lead-source scorecard foundation

**Current status:** The production assistant can create an idempotent service request, instantly confirm eligible residential diagnostics from live Eternity Dispatch availability, and give the customer a private 90-day link to view, reschedule or cancel the confirmed appointment. Privacy-safe website attribution is production-verified. Signmons now has a live tenant-scoped lead-source report and an owner/admin job-completion endpoint, but its authenticated operator UI remains planned in Signmons rather than on Eternity's public website. Eternity's first technical baseline was generated as a local private report and is excluded from GitHub and the public website.

**Next action:** Publish the validated mobile performance maintenance release, verify that modern phones receive the smaller hero asset, and rerun the live mobile audit. Then use the next full operating month as the first decision-quality scorecard after technicians consistently mark completed work in Signmons. Build the reusable authenticated dashboard under the separate Signmons APP-014 plan; do not expose business metrics or reporting credentials on Eternity's public website.

## Phase 1 information blockers

- [x] Service-request email destination — `ben@eternityhvacr.com`
- [x] Confirmed business email — `ben@eternityhvacr.com`
- [x] Confirmed hours — Monday–Friday 7:00 a.m.–7:00 p.m.; Saturday 9:00 a.m.–5:00 p.m.; Sunday closed
- [x] Emergency service outside normal hours — confirmed; exact 24/7 coverage remains unconfirmed
- [x] Business address or service-area-business preference — service-area business
- [x] General service area — Cleveland, Cuyahoga County suburbs and surrounding metro ZIP codes
- [x] Exact city and ZIP-code list for location pages and service-area checker — 20 priority markets plus approved extended communities
- [x] License and insurance language — license #28303; insured
- [x] Google Business Profile share URL — `https://share.google/1bUl6S4x9x90TJ7Mf`
- [x] Expected response time for website requests — 15 minutes during regular business hours
- [x] Customer-initiated service texting — `216-703-3183` monitored 24/7 by Debynyhan; 15-minute reply target, not an arrival-time promise

Full intake checklist: [CLIENT-CONTENT-CHECKLIST.md](CLIENT-CONTENT-CHECKLIST.md)

## Master milestone tracker

| Phase | Deliverable | Status | Dependency | Completion evidence |
|---|---|---|---|---|
| Baseline | Custom domain, SSL and public deployment | Complete | None | `eternityhvacr.com` is public over HTTPS |
| Baseline | Mobile hero, phone links and social preview | Complete | Phone number | Verified on production |
| Baseline | Readable typography update | Complete | None | Published August 20, 2026 |
| 1 | Remove all public placeholder content | Complete | Core business facts confirmed | Verified on production August 22, 2026 |
| 1 | Functional service-request delivery | Complete | Resend sender domain and destination confirmed as `ben@eternityhvacr.com` | Ben confirmed the production test email was received August 22, 2026 |
| 1 | Robots and XML sitemap | Complete | None | Both production URLs returned HTTP 200 on August 22, 2026 |
| 1 | Business structured data | Complete | Core business facts confirmed | Privacy-safe `Organization`/`WebSite` schema and image-complete expert `Article` schema verified by automated production-render checks August 28, 2026 |
| 1 | Google Search Console | Complete | Account access | Domain property verified through GoDaddy DNS; sitemap accepted with Success status; furnace/heating, boiler and heat-pump URLs added to Google's priority crawl queue August 28, 2026 |
| 1 | Bing Webmaster and IndexNow | Complete | Account access | Search Console property imported; sitemap accepted for processing without errors or warnings; homepage URL submitted successfully on August 23, 2026 |
| 1 | Google Business Profile operations audit and correction | Complete | None | `216-703-3183` aligned; review response corrected; Google approved Saturday hours, 20-city service area and two secondary categories; Services expanded to 20 confirmed offerings with descriptions August 28, 2026 |
| 1 | Recurring review, profile and citation operations | In progress | External directory response | Debynyhan assigned as routine owner, Bernard as technical/high-risk escalation; manual review workflow documented; weekly Monday check active; BuildZoom and Porch correction requests submitted August 28, 2026 |
| 1 | Conversion analytics | Complete | Google Analytics property created | Corrected property ID published; Realtime showed the Eternity page view and active user on August 23, 2026 |
| 1 | Responsive image optimization | In progress | Production publish and re-audit | August 30 live Lighthouse samples scored Performance 79–83, Accessibility 100 and SEO 100 with 4.1-second LCP; a WebP version of the current mobile hero reduces that asset from 306,620 to 80,338 bytes without changing its crop, with the JPEG retained as fallback |
| 2 | Priority service pages | Complete | Approved service scope and operating facts | AC repair, AC installation/replacement and emergency HVAC/R pages added to the heating and commercial service library, internally linked and included in the sitemap August 28, 2026 |
| 2 | Market pages | Waiting on Eternity | Confirmed customer segments | Approved pages published |
| 2 | Service-area hub and city pages | In progress | Approved priority and extended city/ZIP list plus genuine local proof | Comprehensive service-area hub and first proof-backed Euclid page published August 24, 2026; future city pages remain gated by location-specific evidence |
| 3 | Owner, team and credentials | Complete | Approved biographies | Text-only Bernard Gray and Debynyhan Banks team section published August 27, 2026; photographs intentionally deferred |
| 3 | Verified review system | Complete | Review links and permission | Direct Google review CTA and Charlotte Mancini’s approved five-star review published August 27, 2026 |
| 3 | First three case studies | Complete | Project information and photos | Two residential installations and one commercial rooftop diagnostic published with verified facts and field photography |
| 4 | Answer library | Complete | None | Bernard reviewed and approved the four live guides August 28, 2026; visible reviewer attribution and `reviewedBy` Person schema were added after approval |
| 4 | AI-crawler and referral measurement | Complete | Analytics in Phase 1 | OpenAI crawler access is explicit; ChatGPT, Perplexity, Gemini, Copilot, Claude and Meta AI referrals generate a privacy-conscious analytics event |
| 5 | Service-area checker | Complete | Approved ZIP list | Homepage and service-area page check approved ZIPs, preserve uncertain leads and record privacy-conscious result events |
| 5 | Signmons AI intake, instant residential diagnostic booking and appointment management | Complete | Signmons backend, Eternity Dispatch calendar, Resend and approved booking rules | Production acceptance created exactly one job, calendar event and internal email; the `Test Banks` reschedule preserved one event at the replacement time and produced the expected same-job email sequence; secure 90-day management links now have verified live view, rescheduling and cancellation; website and paired-backend suites passed 71 checks on August 30, 2026 |
| 5 | Photo/video request uploads | Waiting on Eternity | Storage and retention decisions | Secure upload test completed |
| 5 | Commercial equipment intake | Waiting on Eternity | Field requirements | Make/model/serial request path live |
| 5 | Maintenance-plan comparison | Waiting on Eternity | Plan details | Approved comparison published |
| 6 | Monthly performance scorecard | In progress | Consistent job completion status and one full attributed operating month | Private technical baseline created; first decision-quality monthly report pending |

## Next implementation release

### Proposed scope

- [x] Repair the chatbot page-control lint failure without changing assistant behavior
- [x] Add a modern mobile-hero source while retaining the approved JPEG fallback
- [x] Verify the modern asset preserves the approved 941-by-1672 crop and reduces transfer size
- [x] Run labeled production rescheduling and cancellation through the private customer-management link
- [x] Verify rescheduling updates the existing Eternity Dispatch event rather than creating a duplicate
- [x] Verify cancellation releases the Google Calendar event and records the lifecycle change
- [x] Verify one internal email send is recorded for each completed lifecycle change
- [x] Persist the originating website page and lead source with booked and completed jobs
- [x] Run one labeled production attribution acceptance booking

### Definition of done

- [ ] Production build succeeds
- [ ] No unapproved claims are published
- [ ] Test form reaches the intended recipient
- [ ] Phone links still call 216-703-3183
- [ ] Sitemap and robots URLs return HTTP 200
- [ ] Homepage remains indexable and canonical
- [ ] Structured data validates
- [ ] Mobile layout remains readable
- [ ] Production deployment succeeds
- [ ] GitHub repository contains the exact deployed source
- [ ] This tracker is updated with results and date

## Work log

| Date | Change | Outcome | Next step |
|---|---|---|---|
| 2026-09-03 | Prepared the Complete Mechanical Services card redesign for review | Rebuilt the existing six service links as balanced responsive cards with Eternity line icons, category labels, subtle blueprint detail and reusable navy/orange circuit artwork; added one-shot hover, keyboard-focus and touch/scroll motion with reduced-motion support; lint has no errors, all 28 tests pass and desktop/tablet/mobile Chrome review is clean | Obtain visual approval before publishing; no production deployment was performed |
| 2026-08-31 | Repaired conversion attribution and request-button navigation | Replaced the unreliable soft handoff to the homepage request form with dependable full-page navigation; added shared first-touch landing, source-page, referrer and bounded UTM capture for Ask Eternity and the standard service form; included privacy-safe source details in internal request emails and analytics while keeping customer-entered details out of Google Analytics. The production build, lint with no errors and all 28 automated checks pass | Monitor attributed service requests and connect call/text outcome reporting after Twilio is available |
| 2026-08-30 | Prepared the mobile performance maintenance release | A fresh live Lighthouse audit scored Performance 79–83, Accessibility 100 and SEO 100 with a 4.1-second LCP. The approved mobile hero was converted to an 80,338-byte WebP source from the 306,620-byte JPEG while retaining the original fallback, and the chatbot opener lint failure was repaired. Build, lint with no errors and all 27 rendered-page tests pass | Publish the prepared Sites version, confirm the live page serves WebP on supported phones and rerun Lighthouse |
| 2026-08-30 | Established the private lead-source scorecard foundation | Signmons deployed an authenticated tenant-scoped report for created, booked, completed, cancelled, attributed and unattributed jobs; the first Eternity technical baseline was generated locally without customer PII and excluded from GitHub/public deployment | Use the next full attributed operating month after completed-job status is consistently maintained; build the reusable authenticated UI in Signmons rather than on the public Eternity site |
| 2026-08-30 | Completed the labeled production attribution acceptance booking with `Test Banks` | Booking `435A8BF6` was accepted for the selected Eastern-time window, stored `acceptance_test / website / job_attribution` plus homepage landing and source paths, linked to one Eternity Dispatch event and recorded exactly one internal email notification; no customer address, phone or chat contents were used in the verification output | Add booked and completed lead-source totals to Eternity's monthly marketing scorecard |
| 2026-08-30 | Published privacy-safe job attribution for the Eternity booking funnel | Ask Eternity now carries the session landing page, chat-origin page, referral hostname and bounded UTM source/medium/campaign fields into the persistent job record; internal job emails display the useful source and origin page, while customer message contents remain excluded from Google Analytics. The matching website and backend releases passed a production contract smoke test without creating a customer job | Run one labeled campaign-source acceptance booking and verify its internal email source fields |
| 2026-08-30 | Completed the live reschedule acceptance test with `Test Banks` | Calendar search found exactly one `Test Banks` event on Eternity Dispatch at the replacement window, Wednesday, September 2 from 8:00–11:00 a.m. Eastern; Cloud Run recorded two email lifecycle sends for the same job in booking-then-reschedule sequence, with no duplicate calendar event | Add booked/completed-job attribution to the Eternity website funnel; keep customer appointment-email implementation in the separate Signmons plan |
| 2026-08-30 | Completed the live cancellation acceptance test | The secure management page reported the appointment cancelled, Calendar search found no remaining Eternity Dispatch event and Cloud Run recorded exactly one cancellation email notification for the job; `debynyhan@gmail.com` did not receive it, so recipient routing remains Bernard's configured operations mailbox unless expanded | Create a fresh labeled `TEST` booking and complete the reschedule acceptance test before cancellation |
| 2026-08-30 | Repaired the confirmation-to-management handoff | Replaced soft client-side routing inside the chatbot dialog with a normal full-page secure link so the appointment token fragment is preserved reliably; added a regression check and all 27 website checks pass | Publish and have the latest confirmed customer open the management link again |
| 2026-08-30 | Added secure self-service appointment management | Confirmed residential appointments now receive a private 90-day fragment-based link; customers can view details, choose a live replacement slot or cancel, while Signmons updates the existing Eternity Dispatch event, releases cancelled reservations and sends one lifecycle notification; 27 website checks and 44 targeted backend checks pass | Run one labeled live reschedule/cancel acceptance test, then add booked/completed-job attribution |
| 2026-08-30 | Completed the production booking acceptance test | Booking `D51AF0C6` produced exactly one Signmons job, one Eternity Dispatch event and one internal appointment email; the repeat-question safeguard fired and the calendar timezone was corrected to Eastern | Verify the new private reschedule/cancel path in production |
| 2026-08-30 | Hardened the instant-booking website boundary | Added strict job/slot validation, no-store responses, safe conflict handling, a visible confirmation reference, failed-booking analytics and automated success/conflict/malformed-response tests; the 25-check website suite and 34 targeted Signmons idempotency, notification and scheduling checks pass | Publish the verified release, run one labeled production booking and then build the secure reschedule/cancel workflow |
| 2026-08-28 | Built Signmons Phase 1 service routing | Added a site-wide, clearly disclosed automated assistant for HVAC/R request qualification, immediate life-safety guidance, call/text/email/form handoff, accessible keyboard behavior, privacy-conscious category events and matching privacy/terms disclosures; no live AI or diagnosis is claimed because an approved Signmons API and response-safety contract are not yet in the project | Publish and verify the routing release, then define the approved Signmons API, authentication, retention, human-review and response-safety contract before enabling generative responses |
| 2026-08-28 | Submitted the corrected furnace repair-versus-replacement guide for fresh indexing | Bing URL Submission confirmed success and Google Search Console added `https://eternityhvacr.com/resources/furnace-repair-vs-replacement` to its priority crawl queue using the verified Eternity properties | Allow processing time, then confirm index status and rerun the free Bing sitemap scan |
| 2026-08-28 | Built the privacy, consent and request-path foundation release | Added plain-language privacy/data-use and website-terms pages; required service-contact authorization; separated emergency, repair, installation-estimate, commercial/refrigeration and maintenance request paths; and added privacy-conscious form-start, step, completion, emergency and error events without sending customer-entered contact or issue details to analytics | Publish, verify the live request form and have counsel review policy wording before enabling live Signmons AI, uploads, scheduling or payments |
| 2026-08-28 | Reviewed the Bing canonical-sitemap scan and corrected its actionable title warning | The sitemap-only scan reported one missing-alt warning and one overlong title; shortened the furnace repair-versus-replacement guide title to 55 characters. The reported homepage image is decorative, hidden from assistive technology and correctly uses an empty `alt`, so it remains unchanged rather than adding misleading alternative text | Publish the title correction, request Bing and Google re-indexing, then rerun the free Bing scan |
| 2026-08-28 | Resolved the actionable HSTS, title-length and expert-guide internal-link audit findings | Added a one-year HSTS policy to normal responses and application redirects, shortened the commercial refrigeration maintenance title to 57 characters, and linked the four expert guides from the most relevant refrigeration, commercial HVAC and furnace service pages; build, lint and 20 production-render tests pass | Publish, verify production headers and rerun the SEMrush crawl |
| 2026-08-28 | Corrected the structured-data and canonical-host audit findings | Removed the address-dependent `HVACBusiness` type while preserving privacy-safe `Organization`/`WebSite` data, added representative images to every expert `Article`, and added application-level 308 normalization to the HTTPS apex while preserving paths and query strings; the live HTTPS `www` route now returns 308, while the Sites edge still answers plain HTTP with its own 302 before application code runs; build, lint and 20 production-render tests pass | Request a fresh SEMrush crawl and pursue a Sites edge 301/308 option if one becomes available |
| 2026-08-12 | Connected `eternityhvacr.com` and `www` | Domain and SSL active | Continue site enhancement |
| 2026-08-13 | Added social preview, mobile hero and phone number | Public deployment complete | Improve discoverability |
| 2026-08-17 | Published website source to GitHub | Repository established | Keep source synchronized |
| 2026-08-20 | Increased typography sizes | Readability update published | Begin SEO/GEO foundation |
| 2026-08-20 | Created roadmap, intake checklist and progress tracker | Planning system established | Collect Phase 1 business information |
| 2026-08-20 | Recorded email, hours and service-area-business details | Phase 1 technical work is ready to begin | Confirm remaining business and service-area facts |
| 2026-08-20 | Recorded license, insurance, emergency service, lead manager and Google profile | Core Phase 1 business facts confirmed | Begin the Phase 1 website release |
| 2026-08-20 | Built Phase 1 foundation release | Added accurate business facts, email request workflow, crawler files and structured data; removed placeholders and compressed the largest photograph | Publish and verify production |
| 2026-08-22 | Verified the Phase 1 production release and replaced obsolete starter tests | Homepage, crawler files and latest diagnostic artwork are live; production build and site-specific checks pass | Connect direct service-request delivery and complete the end-to-end email test |
| 2026-08-22 | Configured the Resend sending domain and built direct request delivery | `mail.eternityhvacr.com` verified; restricted sending key connected; server validation, spam controls and five automated checks pass | Publish and complete the production delivery test |
| 2026-08-22 | Published and tested direct website service requests | Production endpoint accepted the test and Resend reported delivery to `ben@eternityhvacr.com` | Have Ben confirm the message is visible in his inbox |
| 2026-08-22 | Confirmed delivery and branded the service-request email | Ben received the production test; notification now has branded hierarchy and one-click reply/call actions | Connect conversion analytics and webmaster reporting |
| 2026-08-22 | Added automatic customer confirmation emails | Customers receive a branded request summary, next-step guidance and direct contact information after successful form delivery | Verify the production confirmation, then connect conversion analytics |
| 2026-08-22 | Diagnosed and corrected a form validation mismatch | Live logs showed a 400 response before email delivery; client checks now match the server and display the specific error | Republish and retest the production form |
| 2026-08-23 | Connected the Google Analytics property and lead events | Installed the verified Eternity property ID `G-32W3PBPD8Y`; successful requests, phone clicks and email clicks are measured without customer PII | Verify activity in Google Analytics Realtime |
| 2026-08-23 | Verified Google Analytics collection | Corrected the misread measurement ID and confirmed an active user, page view, first visit and session start in Realtime | Connect Google Search Console and Bing Webmaster Tools |
| 2026-08-23 | Connected Google Search Console and submitted the sitemap | Verified the full `eternityhvacr.com` domain through GoDaddy DNS; Google accepted `https://eternityhvacr.com/sitemap.xml` with Success status and one discovered page | Connect Bing Webmaster Tools and review mobile performance |
| 2026-08-23 | Connected Bing Webmaster Tools | Imported the verified Google property, submitted the XML sitemap without errors or warnings and submitted the homepage for crawling | Recheck Bing processing within 48 hours |
| 2026-08-23 | Completed the mobile performance and accessibility review | Added modern responsive images, fixed the favicon request, corrected progress semantics and color contrast, and deferred analytics until after first paint; live mobile scores reached Performance 86, Accessibility 100 and SEO 100 | Recheck webmaster indexing and begin Phase 2 service-area planning |
| 2026-08-24 | Confirmed Phase 2 priorities and service coverage | Set a 15-minute website-response target, prioritized commercial refrigeration, commercial HVAC and preventive maintenance, and approved 20 priority markets plus extended Northeast Ohio communities | Build and publish the priority service pages and service-area hub |
| 2026-08-24 | Published the Phase 2 service and service-area release | Added unique commercial refrigeration, commercial HVAC and preventive-maintenance pages; published the approved service-area hub; updated navigation, structured data, response messaging and sitemap; all production routes returned HTTP 200 | Monitor indexing and collect local proof for city pages and case studies |
| 2026-08-28 | Published the direct-texting and cooling-service release | Added monitored text CTAs with a qualified 15-minute reply target, consent and opt-out copy, text-click analytics, AC repair, AC installation/replacement and emergency HVAC/R pages, internal links and sitemap coverage without claiming 24/7 technician arrival; build, 19 tests and responsive visual QA pass | Monitor search discovery and lead quality |
| 2026-08-24 | Published the first proof-backed city page for Euclid | Added a production-quality Euclid service page using the verified 44123 residential installation and carefully bounded 44119 rooftop-service evidence; published eight optimized WebP derivatives, local metadata, Service/Breadcrumb/FAQ/ImageObject schema, internal links and sitemap images; 12 automated production-render checks pass and the live route returns HTTP 200 | Submit the Euclid URL for indexing and create the 44123 installation case study |
| 2026-08-24 | Applied the approved Eternity logo and color system | Replaced the previous logo and favicon with tightly cropped transparent vector assets; introduced the approved navy `#0B2646` and coral `#FF4439` palette across the site and service-request emails; added a transparent reversed footer logo; 13 automated checks pass | Keep future website and marketing assets aligned with the approved identity |
| 2026-08-24 | Restored Eternity's orange accent color | Retained the new transparent logo and navy foundation while replacing the coral-red accent with the original orange `#F47A38` across the website, logo, favicon and service-request emails | Use navy and orange for future website and marketing assets |
| 2026-08-24 | Added a second verified Euclid residential installation | Published the 44119 full-system installation with an 80,000 BTU, 96% efficiency furnace, 3-ton cooling system, condenser and coil; optimized the technician-at-work photograph and withheld the residential street address from public copy | Build the dedicated Euclid installation case-study collection |
| 2026-08-25 | Published Eternity's first complete project case study | Documented the Euclid 44119 homeowner's central-air goal, more-than-40-year-old furnace, August 2026 completion, full matched-system installation and final project photograph without exposing the residential street address | Collect the final details needed for a second verified case study |
| 2026-08-25 | Reworked the first case study's result section for authenticity | Replaced generic outcome language with a documented before, installed and finished record; explicitly avoided unverified performance, savings and testimonial claims | Use the same evidence-first standard for future case studies |
| 2026-08-25 | Published the second verified residential case study | Documented the Euclid 44123 home-flipper project, outdated starting system and matched 80,000 BTU, 80% AFUE Payne furnace, coil and 2.5-ton condenser; separated the owner's faster-sale goal from unmeasured sales results | Collect evidence for the third project case study |
| 2026-08-25 | Published the third verified case study | Documented the Euclid 44119 frozen rooftop-unit diagnostic, no-leak pressure-test finding, severe blower contamination and missing filter/filter drier without claiming unreported repairs or restored operation | Build the verified customer-review pathway |
| 2026-08-27 | Published the verified customer-review pathway | Added Charlotte Mancini’s approved five-star review, a direct Google review link in the homepage and footer, and review-link analytics without inventing a city or service type | Collect approved owner/team information and photographs |
| 2026-08-27 | Published the owner and team section | Added approved text-only profiles for owner Bernard Gray and technician Debynyhan Banks, including verified experience, boiler and refrigeration background, education, marketing and administrative responsibilities; omitted images as requested | Build AI-crawler and referral measurement, then the service-area checker |
| 2026-08-28 | Published AI referral measurement and the ZIP-code checker | Added explicit OpenAI crawler access, privacy-conscious AI referral events, and a responsive service-area checker on the homepage and service-area page; approved ZIPs receive a clear confirmation and unlisted ZIPs are directed to confirm availability | Establish Bernard’s technical review process and draft the first four expert answers |
| 2026-08-28 | Prepared the first expert answer library for publication | Added an indexable resource hub and four direct-answer guides covering walk-in icing, rooftop-unit short-cycling, furnace repair versus replacement and commercial refrigeration maintenance; included organization authorship, dates, local context, safety boundaries, Article/FAQ/Breadcrumb schema, authoritative sources and internal links without claiming an uncompleted Bernard review; 19 tests and responsive visual QA pass, GitHub `main` is current and Sites version 41 is saved but not deployed | Review the external growth audit, then deploy and verify production |
| 2026-08-28 | Vetted the external HVAC/R growth audit | Compared every major recommendation with live repository evidence and current Google guidance; recorded completed work, accepted additions, operational decision gates and rejected or unverified claims in a dedicated crosswalk; added explicit GBP, reputation, citation and conversion-feature tasks to the roadmap and intake checklist | Publish the documented answer-library release, then begin the GBP operations audit |
| 2026-08-28 | Published the documented answer-library release | Created Sites version 42 from the exact GitHub `main` source after the audit crosswalk and roadmap updates; deployed the public site and verified the resource hub, four answer routes, sitemap and crawler policy on production | Collect Bernard’s technical review and begin the GBP operations audit |
| 2026-08-28 | Completed the Google Business Profile operations audit | Verified manager access and audited identity, contact actions, category, services, hours, service areas, reviews, photos and March–August performance without changing the profile; documented exact corrections and official Google policy references | Obtain approval before changing the Google profile |
| 2026-08-28 | Published Bernard's technical approval | Added visible reviewer credit and `reviewedBy` Person schema to all four expert guides after Bernard reviewed and approved them; pushed the exact source to GitHub `main`, deployed it through Sites and verified all four production routes | Obtain approval before changing the Google profile |
| 2026-08-28 | Completed the approved Google Business Profile correction set | Confirmed `216-703-3183` as the public phone; verified Charlotte's corrected response; Google approved Saturday 9 a.m.–5 p.m., the 20 approved priority cities, and Heating contractor plus Air conditioning contractor categories; expanded Services from one to 20 confirmed offerings; published and production-verified the matching website phone update | Establish the recurring review, profile-maintenance and citation workflow |
| 2026-08-28 | Established local profile, review and citation operations | Assigned Debynyhan to routine review/profile work and Bernard to technical/high-risk escalation; documented a manual post-service email and two-business-day response standard; activated a weekly Monday 9 a.m. Eastern profile check; audited BuildZoom and Porch; submitted correction-only requests to both directories without creating marketplace accounts or accepting marketplace terms | Verify both directory responses and public corrections |
| 2026-08-28 | Completed the heating-season release and Google service descriptions | Added dedicated furnace/heating repair, boiler and heat-pump pages with unique local metadata, Service/FAQ/Breadcrumb schema, internal links and sitemap entries; added factual descriptions to all 20 primary-category Google services without prices or unsupported claims | Submit the three URLs for indexing, monitor profile edits and continue citation follow-up |
| 2026-08-28 | Submitted the heating-service URLs for Google indexing | Search Console initially reported each new URL as unknown to Google, completed its live indexability check and confirmed that the furnace/heating, boiler and heat-pump URLs were added to the priority crawl queue | Monitor discovery and indexing; do not resubmit while the requests are queued |
| 2026-08-28 | Cleared the legacy internal-navigation lint backlog | Replaced remaining internal page anchors with framework links across the service-area checker, service-area content and project case studies; repository lint now completes with zero errors, the production build succeeds and all 19 tests pass | Keep the remaining image advisories separate from navigation changes and monitor the submitted URLs |
| 2026-08-28 | Completed the first live indexing and citation monitoring cycle | Confirmed the Google profile fields, 20 service descriptions and two review replies remain aligned; found all three heating URLs still awaiting indexing; resubmitted the updated sitemap; queued an indexed Euclid page for refresh because Google showed a stale retired-phone snippet; verified BuildZoom and Porch corrections remain pending | Wait for Google recrawl and directory support processing; do not repeatedly resubmit or create marketplace accounts |

## Decision log

Record important decisions so later work does not rely on memory.

| Date | Decision | Reason | Approved by |
|---|---|---|---|
| 2026-08-20 | Use real proof and verified facts instead of sample claims | Trust, compliance and long-term search value | Project direction |
| 2026-08-20 | Prioritize commercial refrigeration and multifamily content | Strong differentiation from generic residential HVAC sites | Project direction |
| 2026-08-24 | Prioritize commercial refrigeration, commercial HVAC and preventive maintenance lead pages | These are Eternity's confirmed lead-generation priorities | Eternity |
| 2026-08-24 | Publish one comprehensive service-area hub before dedicated city pages | Avoid thin location pages until genuine local proof and project details are available | Project direction |
| 2026-08-24 | Use Euclid as the reference city-page quality threshold | The 44123 installation provides verified local equipment facts and genuine photography; the structure is reusable but future editorial copy must remain evidence-specific | Eternity project evidence |

## Asset intake tracker

| Asset group | Requested | Received | Approved | Published |
|---|---:|---:|---:|---:|
| Business information | Yes | Partial | Partial | No |
| Owner/team biographies | Yes | Yes | Yes | Yes |
| Team photographs | Yes | No | No | No |
| Residential projects | Yes | Partial | Yes | Yes |
| Multifamily projects | Yes | No | No | No |
| Commercial HVAC projects | Yes | Partial | Yes | Yes |
| Refrigeration projects | Yes | No | No | No |
| Reviews | Yes | Partial | Yes | Yes |
| Licenses and certifications | Yes | No | No | No |
| Maintenance plans | Yes | No | No | No |

## Monthly KPI baseline

Complete after analytics and search platforms are connected.

| Metric | Baseline | Current | Target | Reporting source |
|---|---:|---:|---:|---|
| Organic impressions | — | — | Set after 30 days | Search Console |
| Organic clicks | — | — | Set after 30 days | Search Console |
| Google Business Profile calls | — | — | Set after 30 days | Business Profile |
| Website call clicks | — | — | Set after 30 days | Analytics |
| Completed service requests | — | — | Set after 30 days | Website/CRM |
| Qualified commercial leads | — | — | Set after 30 days | CRM |
| Booked-job conversion rate | — | — | Set after 60 days | CRM |
| New Google reviews | — | — | Monthly goal required | Business Profile |
| Mobile Core Web Vitals | — | — | Good | Search Console |
| ChatGPT referral sessions | Tracking configured August 28, 2026 | — | Monitor trend | Analytics |

## Related documents

- [Full SEO, GEO and growth roadmap](SEO-GEO-ROADMAP.md)
- [External growth audit crosswalk](GROWTH-AUDIT-CROSSWALK-2026-08-28.md)
- [Google Business Profile operations audit](GOOGLE-BUSINESS-PROFILE-AUDIT-2026-08-28.md)
- [Local profile and review operations](LOCAL-PROFILE-OPERATIONS-2026-08-28.md)
- [Confirmed business facts](BUSINESS-FACTS.md)
- [Information and content checklist](CLIENT-CONTENT-CHECKLIST.md)

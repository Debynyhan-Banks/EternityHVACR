# External Growth Audit Crosswalk — August 28, 2026

Source reviewed: [Eternity HVAC/R Growth Audit](https://claude.ai/code/artifact/8d6a131a-9f1e-4b4a-982b-afbc31b5f3a3)

This document records how the external audit was evaluated against the live website, repository evidence, approved business facts and current primary-source guidance. It is a decision record, not a blanket endorsement of the audit.

## Decision standard

- Keep recommendations that improve customer usefulness, local visibility, trust or measurable lead quality.
- Preserve completed work instead of reopening it because an external audit did not detect it.
- Require operational ownership before publishing financing, booking, chat, SMS, warranties, promotions or maintenance-plan promises.
- Require genuine local proof before creating a dedicated city page.
- Do not publish customer names, property names, street addresses, project results, certifications or guarantees without approval and evidence.
- Prefer current Google documentation and other primary sources over vendor claims about ranking factors.

## Crosswalk

| Audit recommendation or claim | Repository/live evidence | Decision | Dependency or next step |
|---|---|---|---|
| Publish educational answers and FAQs | Priority service pages already include visible FAQs and `FAQPage` schema. Four expert guides and an answer-library hub were built August 28, 2026. | Keep and expand progressively | Bernard reviews technical wording before personal reviewer attribution is added |
| Put direct answers first and use question headings | Implemented in the first four expert guides | Keep as a reader-first editorial pattern, not an AI-ranking guarantee | Monitor landing-page engagement and qualified leads |
| Add structured data | `HVACBusiness`, `Organization`, `WebSite`, `Service`, `Article`, `FAQPage`, `BreadcrumbList`, `ItemList` and `ImageObject` markup are present where relevant | Complete for current page types; validate as pages change | Continue automated rendered-page checks and Search Console review |
| Create service pages | Commercial refrigeration, commercial HVAC and preventive-maintenance pages are live; additional service pages remain planned | Continue one verified service at a time | Confirm the exact service, equipment, limitations and customer type |
| Create suburb landing pages | Service-area hub and proof-backed Euclid page are live | Continue only where genuine local work or specific local information exists | Collect project proof and permission for each proposed city |
| Publish 1,000 or more words on every city page | Google states there is no ideal word count and warns against scaled pages made for search variations | Reject the word-count quota | Judge pages by unique usefulness, local proof and conversion clarity |
| Complete the Google Business Profile services section | The profile link is confirmed; a field-by-field service audit is not yet documented | Add as an operational task | Confirm profile access, categories, offered services and any public pricing |
| Add prices to every Google service | Google allows a price and description, but does not require them | Use selectively | Publish only stable, approved prices or clearly qualified starting prices/ranges |
| Seed Google Q&A | Business Profile Q&A availability varies; manufactured questions can become low-value profile content | Do not adopt as a quota | Answer genuine public questions accurately if the feature is available |
| Audit name, phone and business details across directories | General consistency is already a roadmap principle | Add a controlled citation/profile audit | Keep Eternity’s unapproved street address private as a service-area business; evaluate paid lead directories separately |
| Build a post-service review process | Direct review link and one approved review are live | Prioritize | Define the responsible person, send timing, approved template and response workflow; never incentivize reviews |
| Add a live Google review stream | A `g.page` link does not provide a review feed. Google Places API can return only a limited review set and requires API configuration and attribution. | Evaluate, not committed | Compare a compliant Places API module with a manually approved review library |
| Add sticky mobile calling | Fixed mobile Call, Schedule and Estimate actions are already live | Complete | Continue measuring phone and form events |
| Expand the project gallery | Three verified case studies are live | Continue | Prioritize refrigeration, multifamily and additional commercial proof |
| Publish certification badges | No technician certifications or issuing bodies are currently approved | Hold | Collect certificate name, issuer, credential status and display permission |
| Publish a warranty or guarantee | Warranty terms are unconfirmed | Hold | Obtain written coverage, duration, exclusions and responsible entity |
| Add financing prequalification | Financing availability and provider are unconfirmed | Hold | Confirm provider, terms, fulfillment owner, disclosures and privacy flow |
| Add real-time booking | Eligible standard residential heating and cooling diagnostic visits use live Eternity Dispatch availability and are confirmed only after the selected slot is rechecked. Production booking `D51AF0C6` verified one job, one calendar event and one internal email. Confirmed customers receive a private 90-day link to view, reschedule or cancel; rescheduling updates the existing event and cancellation releases the reservation. Other requests still require direct follow-up. | Complete for approved residential scope | Run one labeled production reschedule/cancel acceptance test before expanding eligibility; next connect booked and completed jobs to lead source |
| Add SMS or chat | SMS approval, consent language, staffing and retention are unconfirmed | Hold | Approve a monitored number, response hours, consent language and data policy |
| Publish a maintenance membership | Maintenance-plan name, price, visits and benefits are unconfirmed | Hold | Complete the maintenance-plan intake before comparison or sales pages are built |
| Run seasonal promotions | No approved offer, dates or terms were provided | Backlog | Require margin review, fulfillment capacity, dates, exclusions and approved copy |
| Use the commercial jingle or video in the hero | Not necessary for the current conversion path and may affect mobile performance | Test later | Use real footage, captions and a measured performance/conversion test; do not autoplay sound |
| Publish named projects mentioned only in the audit | The audit mentions Eliza Bryant Village, 4680 Lee Road and Warrington Road, but those details are not approved in `BUSINESS-FACTS.md` | Reject as public evidence for now | Complete the project worksheet and obtain customer/property permission first |
| Claim Debynyhan’s certifications | Approved facts include more than five years of experience, a computer science degree and an MBA; certifications were not provided | Reject | Publish certifications only after verification |
| Describe the 15-minute response target as an average | Approved language is a target or that website requests are typically reviewed within 15 minutes during regular business hours | Reject the “average” claim | Preserve the approved qualified wording |

## Vetted additions to the operating roadmap

1. Audit and maintain the Google Business Profile’s categories, services, descriptions, hours, service area, photos and review responses.
2. Establish a post-service review-request and public-response workflow with a named owner.
3. Audit authoritative profiles and citations for accurate business name, phone, website and service-area presentation.
4. Evaluate a compliant review module after comparing Places API requirements with a manually approved review library.
5. Keep financing, booking, SMS/chat, memberships, warranties and promotions behind explicit operational decision gates.
6. Review the Search Console Generative AI performance report when it becomes available to this property; continue combining Search Console and Analytics with qualified-lead outcomes.

## Primary guidance used for this review

- [Google: Optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google: Helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google: Manage services on a Business Profile](https://support.google.com/business/answer/9455399)
- [Google: Improve local ranking](https://support.google.com/business/answer/7091)
- [Google: Tips to get more reviews](https://support.google.com/business/answer/3474122)
- [Google: FAQ rich-result changes](https://developers.google.com/search/blog/2023/08/howto-faq-changes)
- [Google Places API: Place resource and reviews](https://developers.google.com/maps/documentation/places/web-service/reference/rest/v1/places)

## Revisit cadence

Review this crosswalk when the external audit is updated, when Google changes Business Profile or Search guidance, or when Eternity approves a new operational capability. Update the roadmap and intake checklist rather than treating this snapshot as a parallel plan.

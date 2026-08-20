# Eternity Mechanical Services Website Progress Tracker

Last updated: August 20, 2026

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

**Current milestone:** Phase 1 — Search and lead foundation

**Current status:** Ready

**Next action:** Begin the Phase 1 technical release using the confirmed email, hours and service-area-business details. Before publishing location pages or license claims, Eternity must still supply the exact cities/ZIP codes, license language, insurance language and Google Business Profile status.

## Phase 1 information blockers

- [x] Service-request email destination — `ben@eternityhvacr.com`
- [x] Confirmed business email — `ben@eternityhvacr.com`
- [x] Confirmed hours — Monday–Friday 7:00 a.m.–7:00 p.m.; Saturday 9:00 a.m.–5:00 p.m.; Sunday closed
- [ ] Confirmation of the 24/7 emergency-service claim
- [x] Business address or service-area-business preference — service-area business
- [ ] Approved cities and ZIP codes
- [ ] License and insurance language
- [ ] Google Business Profile URL
- [ ] Expected response time for requests

Full intake checklist: [CLIENT-CONTENT-CHECKLIST.md](CLIENT-CONTENT-CHECKLIST.md)

## Master milestone tracker

| Phase | Deliverable | Status | Dependency | Completion evidence |
|---|---|---|---|---|
| Baseline | Custom domain, SSL and public deployment | Complete | None | `eternityhvacr.com` is public over HTTPS |
| Baseline | Mobile hero, phone links and social preview | Complete | Phone number | Verified on production |
| Baseline | Readable typography update | Complete | None | Published August 20, 2026 |
| 1 | Remove all public placeholder content | Waiting on Eternity | Business facts and approvals | No internal notes visible publicly |
| 1 | Functional service-request delivery | Ready | Destination confirmed as `ben@eternityhvacr.com` | End-to-end test request received |
| 1 | Robots and XML sitemap | Ready | None | Both production URLs return HTTP 200 |
| 1 | Business structured data | Waiting on Eternity | NAP, hours, service area, credentials | Rich Results Test has no critical errors |
| 1 | Google Search Console | Waiting on Eternity | Account access | Domain verified and sitemap accepted |
| 1 | Bing Webmaster and IndexNow | Waiting on Eternity | Account access | Domain verified and test URL submitted |
| 1 | Conversion analytics | Waiting on Eternity | Analytics account choice | Call and form events visible |
| 1 | Responsive image optimization | Ready | None | Mobile performance review completed |
| 2 | Priority service pages | Waiting on Eternity | Confirmed services | Unique pages published and internally linked |
| 2 | Market pages | Waiting on Eternity | Confirmed customer segments | Approved pages published |
| 2 | Service-area hub and city pages | Waiting on Eternity | Approved cities and proof | Only genuine service areas published |
| 3 | Owner, team and credentials | Waiting on Eternity | Bios, photos and documents | Approved trust content published |
| 3 | Verified review system | Waiting on Eternity | Review links and permission | Reviews and review CTA live |
| 3 | First three case studies | Waiting on Eternity | Project information and photos | Three verified case studies live |
| 4 | Answer library | Waiting on Eternity | Technical review process | First four expert answers live |
| 4 | AI-crawler and referral measurement | Ready | Analytics in Phase 1 | OAI-SearchBot allowed and referrals tracked |
| 5 | Service-area checker | Waiting on Eternity | ZIP list | Tested service-area response |
| 5 | Photo/video request uploads | Waiting on Eternity | Storage and retention decisions | Secure upload test completed |
| 5 | Commercial equipment intake | Waiting on Eternity | Field requirements | Make/model/serial request path live |
| 5 | Maintenance-plan comparison | Waiting on Eternity | Plan details | Approved comparison published |
| 6 | Monthly performance scorecard | Not started | Search and analytics data | First monthly report completed |

## Next implementation release

### Proposed scope

- Replace placeholder contact, review, service-area and license language where verified information is available
- Deliver service requests to the confirmed destination
- Add request confirmation and error states
- Add `/robots.txt`
- Add `/sitemap.xml`
- Add `HVACBusiness`, `Organization` and `WebSite` structured data
- Add the initial analytics event plan
- Optimize the largest above-the-fold images

### Definition of done

- [ ] Production build succeeds
- [ ] No unapproved claims are published
- [ ] Test form reaches the intended recipient
- [ ] Phone links still call 216-253-6468
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
| 2026-08-12 | Connected `eternityhvacr.com` and `www` | Domain and SSL active | Continue site enhancement |
| 2026-08-13 | Added social preview, mobile hero and phone number | Public deployment complete | Improve discoverability |
| 2026-08-17 | Published website source to GitHub | Repository established | Keep source synchronized |
| 2026-08-20 | Increased typography sizes | Readability update published | Begin SEO/GEO foundation |
| 2026-08-20 | Created roadmap, intake checklist and progress tracker | Planning system established | Collect Phase 1 business information |
| 2026-08-20 | Recorded email, hours and service-area-business details | Phase 1 technical work is ready to begin | Confirm remaining business and service-area facts |

## Decision log

Record important decisions so later work does not rely on memory.

| Date | Decision | Reason | Approved by |
|---|---|---|---|
| 2026-08-20 | Use real proof and verified facts instead of sample claims | Trust, compliance and long-term search value | Project direction |
| 2026-08-20 | Prioritize commercial refrigeration and multifamily content | Strong differentiation from generic residential HVAC sites | Project direction |

## Asset intake tracker

| Asset group | Requested | Received | Approved | Published |
|---|---:|---:|---:|---:|
| Business information | Yes | Partial | Partial | No |
| Owner/team biographies | Yes | No | No | No |
| Team photographs | Yes | No | No | No |
| Residential projects | Yes | No | No | No |
| Multifamily projects | Yes | No | No | No |
| Commercial HVAC projects | Yes | No | No | No |
| Refrigeration projects | Yes | No | No | No |
| Reviews | Yes | No | No | No |
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
| ChatGPT referral sessions | — | — | Monitor trend | Analytics |

## Related documents

- [Full SEO, GEO and growth roadmap](SEO-GEO-ROADMAP.md)
- [Confirmed business facts](BUSINESS-FACTS.md)
- [Information and content checklist](CLIENT-CONTENT-CHECKLIST.md)

# Booking page release — September 28, 2026

Owner requested returning to the booking page for a Google Business Profile booking destination. Public path: /book. Reuses the existing data-open-assistant trigger and existing Signmons appointment flow. No Signmons backend/API contract, calendar, payment, credential, or provider configuration changes.

## Owner-confirmed facts

Residential service $99, after-hours addition $50, total $149. Commercial service $150, after-hours addition $75, total $225. Regular hours: Monday-Friday 7 a.m.-7 p.m., Saturday 9 a.m.-5 p.m., Eastern Time. Sunday emergencies only. Estimates and second opinions are free onsite or remotely. Remote second opinions use the existing private quote upload.

## Public behavior

- Separate residential booking, commercial request, free estimate request and free second-opinion options.
- Existing widget advertises live confirmation for eligible residential diagnostic visits only. Commercial requests and estimate requests require team follow-up; no instant commercial/estimate booking is claimed.
- Service charges displayed on the page and residential fee/hours disclosed beside the widget's appointment choices before confirmation.
- Sunday/emergency service directs customers to call for availability.
- Existing request and private second-opinion forms reused. No fee collection, repair credit, or lower-price guarantee added.
- Header/mobile navigation and footer link to /book. Footer Sunday text now reflects owner-confirmed emergency service.
- Canonical metadata, breadcrumb JSON-LD, sitemap entry and exact public analytics path added. Private routes remain excluded.

## Validation

Production build and 36 rendered/API tests passed. TypeScript passed. Focused lint: zero errors, two existing SiteChrome image warnings. All 23 browser tests passed using installed Chrome; bundled Playwright browser was unavailable. New tests check 390px/1440px layout, disclosed fees, existing widget launch/close and focus return with no API submission; mocked availability/confirmation verifies the residential fee is visible before confirming. All test external traffic blocked. Desktop reviewed visually; section heading size improved afterward. Final focused checks run against the rebuilt page.

No actual customer, live appointment, payment, or provider operation was created. Local mocked success does not establish current production appointment availability or end-to-end live booking. Google Business Profile has not been edited. Deployment and live page verification are recorded in the release receipt.

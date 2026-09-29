# Property-manager page

Scope: `/multifamily-hvac`, approved copy and Eliza Bryant PTAC example, working service/estimate/maintenance request links, management-only intake using the existing service-request endpoint. Small landlords and larger communities; property-dependent pricing confirmed before scheduling. No backend scheduling or payment change.

Management flow: the page fixes the customer category to managed property. All managed-property submissions, including those from the general website form, require role, authority acknowledgment, property address/type, affected units/buildings and access arrangements. Company and PO/vendor requirements are optional. Authority is self-attested, not identity-verified. Paid requests require acknowledgment of charge confirmation and payment at the visit; free installation estimates do not require a fee acknowledgment. Both email copies include management details and applicable terms. No new database, account or storage subsystem.

Privacy: no tenant names, access codes or payment information requested. Existing endpoint length limits, origin/rate controls, contact consent, email escaping and duplicate-submit guard remain. New fields are not passed to analytics. The public page, fixed handoff values and PTAC service category are allowlisted. Unknown URLs continue to fail closed.

Search: unique title/description/canonical, visible FAQs with matching schema, Service and breadcrumb schema, sitemap entry and links from navigation, commercial HVAC, boiler and maintenance pages. No rankings or AI citation promises; no search-console submission.

Validation: synthetic API and browser fixtures only; no actual email, lead, booking, text or payment. Page desktop/mobile inspection and tests are recorded at release. Rollback can restore website release 111 / commit 3f2a9a963335b60a82184f463a09f5efd8e51b6c.

Completed validation: 40 rendered/API tests and all 26 browser tests pass on the final build. TypeScript and whitespace checks pass. Lint has zero errors and 15 existing image warnings. Desktop 1440px and mobile 390px layouts inspected, including the Eliza Bryant section. Initial dropdown test selectors were corrected to use accessible combobox names; the complete suite then passed. All provider traffic was mocked/blocked, so no actual service request or message was sent.

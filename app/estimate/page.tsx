import type { Metadata } from "next";
import "./estimate.css";
import Link from "next/link";
import ProjectEstimator from "../components/ProjectEstimator";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { breadcrumbSchema, faqSchema, servicePriceCatalogSchema, StructuredData, webApplicationSchema } from "../lib/structuredData";

const faqs = [
  ["Why can two furnace installation quotes differ by thousands of dollars?", "Check whether both proposals include the same equipment efficiency, capacity, removal, sheet-metal transitions, venting, electrical work and permits. A like-for-like swap and a project needing duct or utility alterations are different scopes. Ask each contractor to identify inclusions and exclusions in writing rather than comparing only the total."],
  ["Does the $2,800–$3,400 range include a 96% AFUE furnace?", "No. That planning range is for the specified standard 80% AFUE swap. A higher-efficiency installation needs a separate equipment and site review, including venting and condensate provisions where applicable. Eternity has not published a separate 96% AFUE baseline on this page."],
  ["How much does a direct furnace swap cost in Greater Cleveland?", "Eternity's estimated baseline range is $2,800–$3,400 for a standard 80% AFUE direct furnace swap. It covers complete unit removal, licensed installation, transition sheet metal and a safety test."],
  ["How much does a boiler conversion to attic forced air cost?", "The estimated baseline range is $6,800–$8,200 for complete rough-in, a horizontal attic furnace, R-8 flex ductwork, a B-vent roof penetration and utility extensions. This configuration can help duplex investors separate tenant utilities."],
  ["What does a furnace, condenser and coil package start at?", "A furnace, condenser and matching evaporator coil package can start as low as $7,500. The final proposal depends on equipment selection, installation conditions and any additional work identified during the site review."],
  ["What does a cooling-only condenser and coil replacement start at?", "A cooling-only package with an outdoor condenser and matching evaporator coil can start as low as $5,000. Final pricing depends on equipment selection, compatibility, access and installation conditions confirmed during the site review."],
  ["Why does a commercial RTU require a custom estimate?", "Commercial rooftop equipment requires a diagnostic and load calculation because capacity, controls, roof access, utilities, curb conditions and operating requirements vary by property."],
  ["Are these HVAC prices final quotes?", "No. These are baseline planning estimates for the described scopes, not binding quotes. Equipment selection, permits, access, electrical work, existing conditions and added scope can change the final written proposal."],
] as const;

const pricingOptions = [
  {
    title: "Direct furnace swap",
    price: "$2,800–$3,400",
    label: "80% AFUE standard swap",
    description: "Complete unit removal, licensed installation, transition sheet metal and safety test.",
    href: "/services/furnace-heating-repair",
  },
  {
    title: "Boiler conversion / full attic forced air",
    price: "$6,800–$8,200",
    label: "Complete attic forced-air rough-in",
    description: "Horizontal attic furnace, R-8 flex ductwork, B-vent roof penetration and utility extensions.",
    href: "/services/furnace-heating-repair",
  },
  {
    title: "Furnace, condenser and coil",
    price: "As low as $7,500",
    label: "Heating and cooling equipment package",
    description: "Furnace, outdoor condenser and matching evaporator coil, with final scope confirmed on site.",
    href: "/services/air-conditioning-installation",
  },
  {
    title: "Cooling-only condenser and coil",
    price: "As low as $5,000",
    label: "Cooling equipment package",
    description: "Outdoor condenser and matching evaporator coil, with final scope confirmed on site.",
    href: "/services/air-conditioning-installation",
  },
  {
    title: "Commercial rooftop unit (RTU)",
    price: "Custom estimate",
    label: "Diagnostic and load calculation required",
    description: "Commercial scope is based on verified capacity, controls, access and site requirements.",
    href: "/services/commercial-hvac",
  },
] as const;

export const metadata: Metadata = {
  title: "Greater Cleveland HVAC Cost Estimator | Eternity",
  description: "Estimate Greater Cleveland furnace replacement, boiler conversion, cooling-only condenser and coil, and complete HVAC project pricing with Eternity Mechanical Services.",
  alternates: { canonical: "/estimate" },
  openGraph: { title: "Greater Cleveland HVAC Cost Estimator | Eternity", description: "See approved baseline HVAC project ranges, then request a site-confirmed written estimate.", url: "/estimate" },
};

export default function EstimatePage() {
  return (
    <main className="estimate-page">
      <SiteHeader />
      <StructuredData data={[
        webApplicationSchema({ name: "Eternity Greater Cleveland HVAC Cost Estimator", description: metadata.description as string, path: "/estimate" }),
        servicePriceCatalogSchema({
          name: "Greater Cleveland HVAC installation estimates",
          description: "Baseline planning prices for selected furnace, forced-air conversion and complete heating and cooling installation scopes.",
          path: "/estimate",
          offers: [
            { name: "Direct furnace swap", description: "80% AFUE standard direct furnace swap.", minPrice: 2800, maxPrice: 3400 },
            { name: "Boiler conversion / full attic forced air", description: "Complete attic forced-air rough-in and installation.", minPrice: 6800, maxPrice: 8200 },
            { name: "Furnace, condenser and coil", description: "Starting price for a complete heating and cooling equipment package.", startingPrice: 7500 },
            { name: "Cooling-only condenser and coil", description: "Starting price for a cooling-only outdoor condenser and matching evaporator coil package.", startingPrice: 5000 },
          ],
        }),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "HVAC cost estimator", path: "/estimate" }]),
        faqSchema(faqs),
      ]} />
      <section className="tool-hero estimator-hero">
        <figure className="estimator-opening-photo">
          <img src="/images/euclid/euclid-oh-sinclair-furnace-installation-720.webp" alt="Eternity technician beside a completed furnace installation in Euclid" width="720" height="1279" fetchPriority="high" />
          <figcaption>Actual Eternity project · Euclid, Ohio</figcaption>
        </figure>
        <div className="estimator-opening-copy">
        <p className="eyebrow"><i /> Greater Cleveland HVAC pricing</p>
        <h1>Greater Cleveland HVAC Cost Estimator</h1>
        <p>See baseline pricing for furnace, air-conditioning and complete-system installation projects. Select the closest scope below, then schedule an on-site review for a final written proposal.</p>
        <div className="estimator-hero-trust" aria-label="Eternity credentials">
          <span>Licensed &amp; insured</span><span>License #28303</span><span>Residential &amp; commercial</span>
        </div>
        </div>
      </section>
      <section className="tool-section estimator-tool-section"><ProjectEstimator /></section>
      <section className="section estimate-evidence" aria-labelledby="estimate-evidence-title">
        <div><p className="kicker">Equipment behind the numbers</p><h2 id="estimate-evidence-title">Compare the whole installation.</h2><p>A furnace, outdoor unit and indoor coil are only part of the scope. The connections and existing conditions matter, too.</p><p>These are actual Euclid project photographs—not illustrations of what every price includes.</p><Link href="/projects">Explore documented projects →</Link></div>
        <figure><img src="/images/euclid/euclid-oh-sinclair-furnace-installation-720.webp" alt="Technician beside a Sinclair furnace installation in Euclid" width="720" height="1279" loading="lazy"/><figcaption>Indoor equipment and installation work</figcaption></figure>
        <figure><img src="/images/euclid/euclid-oh-residential-condenser-installation-720.webp" alt="Outdoor condenser and connections at a Euclid home" width="720" height="1279" loading="lazy"/><figcaption>Outdoor equipment and connections</figcaption></figure>
      </section>
      <section className="section estimator-pricing" aria-labelledby="pricing-heading">
        <div className="section-head">
          <div><p className="kicker">Greater Cleveland planning ranges</p><h2 id="pricing-heading">What common HVAC projects may cost</h2></div>
          <p>These ranges describe the listed baseline scope. They help homeowners, property managers and investors plan before Eternity confirms the job on site.</p>
        </div>
        <div className="estimator-comparison">
          <div className="estimator-comparison-head">
            <span>Project</span><span>Planning price</span><span>Baseline scope</span><span>Details</span>
          </div>
          {pricingOptions.map((option) => (
            <article key={option.title}>
              <div><span>{option.label}</span><h3>{option.title}</h3></div>
              <strong>{option.price}</strong>
              <p>{option.description}</p>
              <Link href={option.href}>View service <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
        <p className="estimator-disclaimer">Baseline estimates are not binding quotes. Equipment selection, permits, access, electrical work, existing conditions and added scope can change the final written proposal.</p>
      </section>
      <section className="section estimator-methodology">
        <div className="estimate-cost-drivers" id="baseline-inclusions">
          <p className="kicker">Included scope</p><h2>What does the baseline include?</h2><p>Tap a project to see the published scope and what still needs confirmation. No specific brand, capacity, staging or warranty is promised unless listed in your written proposal.</p>
          <details><summary>Direct furnace swap · $2,800–$3,400</summary><p>The standard 80% AFUE swap covers complete unit removal, licensed installation, transition sheet metal and a safety test. Transition sheet metal connects the new unit to existing ducts; it does not mean a new whole-house duct system.</p><p>Confirm the model, capacity, venting condition, permit responsibility and any gas, electrical or return-air changes. A 96% AFUE furnace, two-stage burner or variable-speed blower is not automatically included.</p></details>
          <details><summary>Attic forced-air conversion · $6,800–$8,200</summary><p>The listed scope includes complete rough-in, a horizontal attic furnace, R-8 flex ductwork, B-vent roof penetration and utility extensions. The layout and equipment must be confirmed for the property.</p><p>Confirm rooms served, return-air routes, attic access, utility extension lengths and roof work. Boiler removal, changes to the remaining heating system, separate utility meters, structural work and finish repairs must be itemized rather than assumed included.</p></details>
          <details><summary>Furnace, condenser and coil · as low as $7,500</summary><p>The starting equipment package identifies a furnace, outdoor condenser and matching evaporator coil. It is not a published specification for a particular brand, efficiency, capacity or inverter system.</p><p>The proposal must identify installation labor and materials, removal, venting, line-set work, electrical work, controls, permits and startup scope. Do not assume every possible installation condition is covered by the starting figure.</p></details>
          <details><summary>Cooling-only condenser and coil · as low as $5,000</summary><p>The starting package identifies an outdoor condenser and matching evaporator coil, not a replacement furnace. Retained indoor equipment must be suitable for the selected system.</p><p>Confirm capacity, efficiency, refrigerant, indoor airflow, piping, drain arrangements, electrical requirements and thermostat compatibility. Have removal, installation and startup details recorded in the proposal.</p></details>
          <details><summary>Commercial rooftop equipment · custom review</summary><p>No fixed RTU price is published. Equipment selection and the written scope depend on diagnostics, load requirements, roof access, curb compatibility, lifting, electrical service, controls and any required ventilation work.</p></details>
        </div>
        <div className="estimate-cost-drivers"><p className="kicker">What changes the price?</p><h2>Same category. Different scope.</h2><p>Use these questions to compare written proposals. None of these items has an automatic surcharge in this estimator; the site review determines what is needed and whether it is included.</p>
          <details><summary>Brand, model and warranty coverage</summary><p>Compare exact model numbers rather than brand names alone. Equipment lines within one brand can offer different controls, efficiency and warranty terms. Availability and service support also belong in the comparison.</p><p>Ask for separate equipment-parts and installation-labor warranty terms, registration requirements and exclusions. No brand or extended warranty is guaranteed by these baseline prices.</p></details>
          <details><summary>Single-stage, two-stage and modulating heat</summary><p>Single-stage heating has one firing level; two-stage equipment offers a lower and higher level. Modulating equipment adjusts output across a range. These are equipment choices, not interchangeable descriptions of efficiency.</p><p>Ask which firing stages are included and whether the thermostat and wiring support them. An 80% or 96% AFUE rating alone does not tell you the number of stages. No staging-upgrade price is published here.</p></details>
          <details><summary>Variable-speed blowers and inverter compressors</summary><p>A variable-speed indoor blower moves air; an inverter-driven compressor changes cooling or heat-pump capacity. They are different components. The words “variable speed” alone do not specify the whole system.</p><p>Ask for the outdoor unit, coil, indoor unit and controller models as a compatible package. Confirm whether the intended controls support the equipment’s capabilities and whether existing ductwork is suitable. Do not assume inverter equipment is included in a starting package.</p></details>
          <details><summary>Equipment size and comfort requirements</summary><p>Ask how the proposed capacity was determined instead of simply copying the old unit size. Room layout, insulation, windows, air leakage and duct capacity can affect the selection. More capacity is not automatically a better fit.</p><p>Identify any hot or cold rooms before the proposal. Zoning, added returns, filtration, humidification and thermostat upgrades should be separate, clearly described scope items.</p></details>
          <details><summary>Startup, testing and handover</summary><p>The furnace-swap baseline explicitly includes a safety test. For every package, ask which startup checks, settings and written records will be supplied, who handles inspections, and how operating instructions and warranty documents will be handed over.</p><p>Compare these deliverables alongside equipment prices. Do not treat a general “installation included” label as a complete list of testing or warranty commitments.</p></details>
          <details open><summary>Equipment and efficiency</summary><p>The furnace baseline applies to 80% AFUE. A different efficiency, capacity or equipment package is a different comparison. Ask for model numbers, rated efficiency and how the equipment was sized. A higher-efficiency option may require different venting and condensate arrangements; no 96% price is implied by the standard-swap range.</p></details>
          <details><summary>Ductwork and airflow</summary><p>A transition between the furnace and existing ductwork is not the same as replacing distribution ducts. Ask whether supply and return alterations are included and whether existing airflow will be evaluated. For the attic conversion, confirm the rooms served and the planned supply and return routes.</p></details>
          <details><summary>Venting, electrical and utilities</summary><p>Compare the stated scope for venting, gas connections, electrical circuits and condensate disposal. Utility extensions are listed in the attic-conversion baseline, but their route and extent still need verification. Ask what work by other trades, utility providers or permitting authorities is included or excluded.</p></details>
          <details><summary>Cooling compatibility</summary><p>The cooling-only starting price describes an outdoor condenser and matching indoor coil—not an automatic replacement of the furnace. Confirm compatibility with the retained indoor equipment, refrigerant piping and controls. Ask whether line-set work or electrical changes are required.</p></details>
          <details><summary>Duplex boiler-to-forced-air conversion</summary><p>The $6,800–$8,200 baseline describes the specified attic forced-air rough-in, not every possible boiler conversion. Confirm attic access, equipment location, duct routes, roof penetration and how the remaining boiler system will be handled. Separate tenant utility metering or utility-company charges must be addressed explicitly; do not assume they are included.</p></details>
          <details><summary>Access, permits and removal</summary><p>Ask how equipment will enter and leave the property, what removal is covered, who handles permits and inspections, and what is excluded. Tight access or work beyond the listed baseline can change the proposal. Commercial roof access and lifting requirements need project-specific review.</p></details>
        </div>
        <div className="section-head">
          <div><p className="kicker">How the range is built</p><h2>Real scope first. Final price after site review.</h2></div>
          <p>These planning prices reflect defined installation scopes—not a remote diagnosis or a one-size-fits-all quote.</p>
        </div>
        <div className="estimator-method-grid">
          <article><span>01</span><h3>Defined equipment scope</h3><p>Each range starts with the equipment and installation work shown in the estimator.</p></article>
          <article><span>02</span><h3>Standard conditions</h3><p>The baseline assumes normal access and no unlisted electrical, structural or utility work.</p></article>
          <article><span>03</span><h3>On-site confirmation</h3><p>Eternity verifies capacity, compatibility and existing conditions before issuing a written proposal.</p></article>
        </div>
        <div className="estimator-review-note"><strong>Reviewed by Eternity Mechanical Services</strong><span>Licensed &amp; insured • License #28303 • Pricing reviewed September 2026</span></div>
        <p className="estimator-second-opinion-note">Already have a diagnosis or proposal? <Link href="/second-opinion">Use the private second-opinion workflow</Link> for an owner-reviewed comparison.</p>
      </section>
      <section className="section landing-faq tool-faq">
        <div><p className="kicker">Common pricing questions</p><h2>Before you request an estimate</h2></div>
        <div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </section>
      <SiteFooter />
    </main>
  );
}

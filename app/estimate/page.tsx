import type { Metadata } from "next";
import "./estimate.css";
import ProjectEstimator from "../components/ProjectEstimator";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { breadcrumbSchema, faqSchema, servicePriceCatalogSchema, StructuredData, webApplicationSchema } from "../lib/structuredData";

const faqs = [
  ["How much does a complete HVAC system cost in Greater Cleveland?", "Eternity's historical supplier-based examples range from about $6,800 to $17,600 for complete furnace, condenser and coil configurations from 2.5 to 4 tons. The examples use a 15% material markup and $3,000–$5,000 of typical installation labor. They are planning examples rather than current supplier prices or binding proposals."],
  ["How much does a condenser and evaporator coil replacement cost?", "One historical 2.5-ton Payne cooling-only example calculates to about $4,400–$5,400 after the 15% material markup and $2,000–$3,000 typical installation labor. Capacity, equipment compatibility, refrigerant piping, electrical work and site conditions can change the final written proposal."],
  ["How much is furnace-changeout installation labor?", "Typical furnace-changeout installation labor is $1,500–$2,500. Equipment, materials, permits and any added venting, gas, electrical, drain, duct or control work are separate unless the written proposal says otherwise. Eternity's established standard 80% AFUE direct-swap baseline remains $2,800–$3,400 for its defined scope."],
  ["How does Eternity calculate the historical examples?", "The calculation is the historical landed supplier material total multiplied by 1.15, plus the applicable typical installation-labor range. The landed total includes the equipment and accessories on that supplier estimate, plus quoted freight, surcharges and supplier tax when present."],
  ["Why can two HVAC replacement prices differ by thousands of dollars?", "Capacity, efficiency, brand and equipment match can change material cost. Ductwork and airflow, electrical work, venting, refrigerant piping, permits, access and other property conditions can also change installation scope. Compare model numbers, written inclusions and exclusions instead of comparing only the total."],
  ["Are these current HVAC equipment quotes?", "No. The examples are based on six historical supplier estimates dated July through September 2026. Equipment prices and availability may have changed. Eternity confirms current equipment, scope and final pricing in a written proposal after reviewing the property."],
  ["How much does a boiler conversion to attic forced air cost?", "The estimated baseline range is $6,800–$8,200 for complete rough-in, a horizontal attic furnace, R-8 flex ductwork, a B-vent roof penetration and utility extensions. This configuration can help duplex investors separate tenant utilities."],
  ["Why does a commercial RTU require a custom estimate?", "Commercial rooftop equipment requires a diagnostic and load calculation because capacity, controls, roof access, utilities, curb conditions and operating requirements vary by property."],
] as const;

const pricingOptions = [
  {
    title: "Furnace changeout",
    price: "$1,500–$2,500",
    label: "Typical installation labor",
    description: "Labor range only. Equipment, materials and property-specific work are priced separately.",
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
    title: "Complete furnace, condenser and coil system",
    price: "$3,000–$5,000",
    label: "Typical installation labor",
    description: "Labor range only. Equipment and marked-up materials depend on the selected system.",
    href: "/services/air-conditioning-installation",
  },
  {
    title: "Cooling-only condenser and coil",
    price: "$2,000–$3,000",
    label: "Typical installation labor",
    description: "Labor range only. Condenser, matching coil and other materials are priced separately.",
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

const historicalPricingExamples = [
  {
    system: "Goodman 2.5-ton complete system",
    quoteDate: "July 2026",
    estimate: "$6,800–$8,800",
    basis: "Historical landed materials with 15% markup, plus $3,000–$5,000 installation labor.",
  },
  {
    system: "Ducane or Goodman 4-ton complete system",
    quoteDate: "September 2026",
    estimate: "$9,300–$11,300",
    basis: "Two separate historical configurations produced the same rounded planning range.",
  },
  {
    system: "Lennox 4-ton complete-system configurations",
    quoteDate: "September 2026",
    estimate: "$15,400–$17,600",
    basis: "Two historical configurations including quoted freight, surcharges and supplier tax.",
  },
  {
    system: "Payne 2.5-ton condenser and coil",
    quoteDate: "August 2026",
    estimate: "$4,400–$5,400",
    basis: "Per-system cooling-only example with 15% markup and $2,000–$3,000 installation labor.",
  },
] as const;

export const metadata: Metadata = {
  title: "2026 Cleveland HVAC Replacement Cost Guide | Eternity",
  description: "See supplier-based Greater Cleveland HVAC planning examples, labor ranges, a disclosed 15% material markup and factors that change the final proposal.",
  alternates: { canonical: "/estimate" },
  openGraph: { title: "2026 Cleveland HVAC Replacement Cost Guide | Eternity", description: "See historical supplier-based HVAC planning examples, labor assumptions and the factors that change a final proposal.", url: "/estimate" },
};

export default function EstimatePage() {
  return (
    <main className="estimate-page">
      <SiteHeader />
      <StructuredData data={[
        webApplicationSchema({ name: "Eternity 2026 Greater Cleveland HVAC Replacement Cost Guide", description: metadata.description as string, path: "/estimate" }),
        servicePriceCatalogSchema({
          name: "Greater Cleveland HVAC replacement planning estimates",
          description: "Historical supplier-based planning examples and defined baseline prices for selected Greater Cleveland HVAC installation scopes.",
          path: "/estimate",
          offers: [
            { name: "Direct furnace swap", description: "80% AFUE standard direct furnace swap.", minPrice: 2800, maxPrice: 3400 },
            { name: "Boiler conversion / full attic forced air", description: "Complete attic forced-air rough-in and installation.", minPrice: 6800, maxPrice: 8200 },
            { name: "Historical Goodman 2.5-ton complete-system example", description: "Historical installed planning example using a 15% material markup and typical installation labor.", minPrice: 6800, maxPrice: 8800 },
            { name: "Historical Ducane or Goodman 4-ton complete-system examples", description: "Historical installed planning examples using a 15% material markup and typical installation labor.", minPrice: 9300, maxPrice: 11300 },
            { name: "Historical Lennox 4-ton complete-system examples", description: "Historical installed planning examples using a 15% material markup and typical installation labor.", minPrice: 15400, maxPrice: 17600 },
            { name: "Historical Payne 2.5-ton cooling-only example", description: "Historical condenser-and-coil installed planning example using a 15% material markup and typical installation labor.", minPrice: 4400, maxPrice: 5400 },
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
        <p className="eyebrow"><i /> Historical 2026 Greater Cleveland HVAC pricing</p>
        <h1>2026 Greater Cleveland HVAC Replacement Cost Guide</h1>
        <p>Eternity reviewed six historical supplier estimates dated July through September 2026 and combined the relevant material total with a 15% markup and typical installation labor. Use the examples to plan, then request an on-site review for a final written proposal.</p>
        <div className="estimator-hero-trust" aria-label="Eternity credentials">
          <span>Licensed &amp; insured</span><span>License #28303</span><span>Residential &amp; commercial</span>
        </div>
        </div>
      </section>
      <section className="tool-section estimator-tool-section"><ProjectEstimator /></section>
      <section className="section estimate-evidence" aria-labelledby="estimate-evidence-title">
        <div><p className="kicker">Equipment behind the numbers</p><h2 id="estimate-evidence-title">Compare the whole installation.</h2><p>A furnace, outdoor unit and indoor coil are only part of the scope. The connections and existing conditions matter, too.</p><p>These are actual Eternity project photographs from Euclid—not illustrations of what every price includes.</p><a href="/projects">Explore documented projects →</a></div>
        <figure><img src="/images/euclid/euclid-oh-sinclair-furnace-installation-720.webp" alt="Technician beside a Sinclair furnace installation in Euclid" width="720" height="1279" loading="lazy"/><figcaption>Indoor equipment and installation work</figcaption></figure>
        <figure><img src="/images/euclid/euclid-oh-residential-condenser-installation-720.webp" alt="Outdoor condenser and connections at a Euclid home" width="720" height="1279" loading="lazy"/><figcaption>Outdoor equipment and connections</figcaption></figure>
      </section>
      <section className="section estimator-pricing" aria-labelledby="pricing-heading">
        <div className="section-head">
          <div><p className="kicker">Greater Cleveland installation labor</p><h2 id="pricing-heading">Typical labor and established scope ranges</h2></div>
          <p>Labor is shown separately so you can see what changes when equipment, efficiency and installation scope change.</p>
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
              <a href={option.href}>View service <span aria-hidden="true">→</span></a>
            </article>
          ))}
        </div>
        <p className="estimator-disclaimer">Labor ranges and established baselines are planning figures, not binding quotes. Equipment, materials, permits and unlisted work are separate unless the written proposal expressly includes them.</p>
      </section>
      <section className="section historical-pricing" aria-labelledby="historical-pricing-heading">
        <div className="historical-pricing-intro">
          <p className="kicker">Real quote-based examples</p>
          <h2 id="historical-pricing-heading">What HVAC replacement may cost in Greater Cleveland</h2>
          <p>These rounded examples come from six historical supplier estimates reviewed by Eternity. They show how different equipment selections can change an installed planning range without presenting old supplier pricing as a current offer.</p>
        </div>
        <div className="historical-pricing-table-wrap">
          <table className="historical-pricing-table">
            <caption>Historical HVAC replacement planning examples reviewed September 2026</caption>
            <thead><tr><th scope="col">Historical configuration</th><th scope="col">Supplier estimate date</th><th scope="col">Installed planning estimate</th><th scope="col">Calculation basis</th></tr></thead>
            <tbody>
              {historicalPricingExamples.map((example) => <tr key={example.system}><th scope="row">{example.system}</th><td>{example.quoteDate}</td><td><strong>{example.estimate}</strong></td><td>{example.basis}</td></tr>)}
            </tbody>
          </table>
        </div>
        <aside className="pricing-method" aria-labelledby="pricing-method-heading">
          <div><p className="kicker">Transparent calculation</p><h3 id="pricing-method-heading">Historical landed material total × 1.15 + typical installation labor</h3></div>
          <p>The landed total means the equipment and listed accessories on the supplier estimate, plus quoted freight, surcharges and supplier tax when present. A 15% markup is added to that historical material cost. It does not turn an expired or historical supplier estimate into a current price.</p>
        </aside>
        <p className="estimator-disclaimer"><strong>Planning disclosure:</strong> Equipment pricing and availability can change. Final price depends on capacity, efficiency, equipment match, existing ductwork and airflow, electrical work, venting, refrigerant piping, permits, access and other site conditions. Eternity confirms the final written proposal after an on-site review.</p>
      </section>
      <section className="section estimator-methodology">
        <div className="estimate-cost-drivers" id="baseline-inclusions">
          <p className="kicker">Included scope</p><h2>What does the baseline include?</h2><p>Tap a project to see the published scope and what still needs confirmation. No specific brand, capacity, staging or warranty is promised unless listed in your written proposal.</p>
          <details><summary>Direct furnace swap · $2,800–$3,400 established baseline</summary><p>The standard 80% AFUE swap covers complete unit removal, licensed installation, transition sheet metal and a safety test. Typical furnace-changeout installation labor is $1,500–$2,500; equipment, materials and any added scope make up the rest of the written proposal. Transition sheet metal connects the new unit to existing ducts; it does not mean a new whole-house duct system.</p><p>Confirm the model, capacity, venting condition, permit responsibility and any gas, electrical or return-air changes. A 96% AFUE furnace, two-stage burner or variable-speed blower is not automatically included.</p></details>
          <details><summary>Attic forced-air conversion · $6,800–$8,200</summary><p>The listed scope includes complete rough-in, a horizontal attic furnace, R-8 flex ductwork, B-vent roof penetration and utility extensions. The layout and equipment must be confirmed for the property.</p><p>Confirm rooms served, return-air routes, attic access, utility extension lengths and roof work. Boiler removal, changes to the remaining heating system, separate utility meters, structural work and finish repairs must be itemized rather than assumed included.</p></details>
          <details><summary>Complete furnace, condenser and coil · historical examples $6,800–$17,600</summary><p>The quote-based examples cover different 2.5-ton and 4-ton configurations. Each rounded estimate combines the applicable historical landed material total, a 15% material markup and $3,000–$5,000 typical complete-system installation labor.</p><p>The written proposal must identify the selected equipment, removal, venting, line-set work, electrical work, controls, permits and startup scope. The broad example range shows why brand, capacity and exact scope must be compared rather than assumed.</p></details>
          <details><summary>Cooling-only condenser and coil · historical 2.5-ton example $4,400–$5,400</summary><p>The example identifies a Payne outdoor condenser and matching evaporator coil, not a replacement furnace. Its calculation combines the historical per-system material total, a 15% material markup and $2,000–$3,000 typical cooling-only installation labor.</p><p>Retained indoor equipment must be compatible. Confirm capacity, efficiency, refrigerant, indoor airflow, piping, drain arrangements, electrical requirements and thermostat compatibility in the written proposal.</p></details>
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
          <article><span>01</span><h3>Documented pricing basis</h3><p>The new examples start with a historical supplier estimate and the equipment and listed accessories it contained.</p></article>
          <article><span>02</span><h3>Disclosed markup and labor</h3><p>Eternity applies a 15% material markup and the applicable typical installation-labor range to build each example.</p></article>
          <article><span>03</span><h3>On-site confirmation</h3><p>Eternity verifies capacity, compatibility and existing conditions before issuing a written proposal.</p></article>
        </div>
        <div className="estimator-review-note"><strong>Reviewed by Eternity Mechanical Services</strong><span>Licensed &amp; insured • License #28303 • Historical pricing examples reviewed September 2026</span></div>
        <p className="estimator-second-opinion-note">Already have a diagnosis or proposal? <a href="/second-opinion">Use the private second-opinion workflow</a> for an owner-reviewed comparison.</p>
      </section>
      <section className="section landing-faq tool-faq">
        <div><p className="kicker">Common pricing questions</p><h2>Before you request an estimate</h2></div>
        <div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </section>
      <SiteFooter />
    </main>
  );
}

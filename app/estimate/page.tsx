import type { Metadata } from "next";
import Link from "next/link";
import ProjectEstimator from "../components/ProjectEstimator";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { breadcrumbSchema, faqSchema, servicePriceCatalogSchema, StructuredData, webApplicationSchema } from "../lib/structuredData";

const faqs = [
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
    <main>
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
        <p className="eyebrow"><i /> Greater Cleveland HVAC pricing</p>
        <h1>Greater Cleveland HVAC Cost Estimator</h1>
        <p>See baseline pricing for furnace, air-conditioning and complete-system installation projects. Select the closest scope below, then schedule an on-site review for a final written proposal.</p>
        <div className="estimator-hero-trust" aria-label="Eternity credentials">
          <span>Licensed &amp; insured</span><span>License #28303</span><span>Residential &amp; commercial</span>
        </div>
      </section>
      <section className="tool-section estimator-tool-section"><ProjectEstimator /></section>
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

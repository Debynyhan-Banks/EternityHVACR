import type { Metadata } from "next";
import { SiteHeader, SiteFooter } from "../components/SiteChrome";
import ServiceRequest from "../components/ServiceRequest";
import { StructuredData, breadcrumbSchema, faqSchema } from "../lib/structuredData";
import { managementTerms } from "../lib/property-management";
import "./property.css";

export const metadata: Metadata = {
  title: "HVAC for Cleveland Landlords & Property Managers | Eternity",
  description: "HVAC repairs, PTAC and boiler service, and recurring maintenance for Greater Cleveland rental properties. Management-only requests with written findings and photos.",
  alternates: { canonical: "/multifamily-hvac" },
  openGraph: { title: "HVAC for Landlords & Property Managers | Eternity", description: "Management-coordinated HVAC service, written findings, job photos and preventive maintenance in Greater Cleveland.", url: "/multifamily-hvac" },
};
const faqs = [
  ["Can a tenant submit a service request?", "No. Requests must be submitted by the property owner or authorized management. Tenants should report heating and cooling problems to their property manager, who coordinates access and authorization."],
  ["Do you work with smaller landlords?", "Yes. Eternity serves owners of individual rental homes and small rental buildings, as well as managers of apartment and condominium communities in Greater Cleveland."],
  ["Do you provide written findings and job photos?", "Yes. We provide written findings and job photos to help management understand equipment conditions and review the work performed."],
  ["Can we arrange recurring preventive maintenance?", "Yes. Contact Eternity to discuss the property, equipment and maintenance needs so we can develop an appropriate scope and schedule."],
  ["What does a property-management service visit cost?", managementTerms],
  ["Are installation estimates and second opinions free?", "Yes. Installation estimates and second opinions are free, onsite or remotely. Diagnostic and repair visits are paid services. We can review a proposal from a verifiable, licensed HVAC contractor and explain whether we can offer a better price for comparable work."],
  ["What are your service hours?", "Monday–Friday, 7 a.m.–7 p.m., and Saturday, 9 a.m.–5 p.m., Eastern Time. Sunday service is for emergencies only. Call 216-703-3183 to check urgent-service availability."],
] as const;
const estimateHref = "/multifamily-hvac?serviceScope=property-estimate#schedule";
const maintenanceHref = "/multifamily-hvac?serviceScope=property-maintenance#schedule";

export default function PropertyManagementPage() {
  return <main className="property-page">
    <SiteHeader requestHref="#schedule" />
    <StructuredData data={[
      breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Property managers", path: "/multifamily-hvac" }]),
      faqSchema(faqs),
      { "@context": "https://schema.org", "@type": "Service", name: "HVAC service for landlords and property managers", url: "https://eternityhvacr.com/multifamily-hvac", description: "Heating, cooling, boiler and PTAC service, replacement planning and recurring preventive maintenance for managed properties.", provider: { "@id": "https://eternityhvacr.com/#business" }, areaServed: { "@type": "AdministrativeArea", name: "Greater Cleveland, Ohio" } },
    ]} />
    <section className="property-hero">
      <div><p className="eyebrow"><i /> Greater Cleveland · Managed properties</p><h1>HVAC service for landlords &amp; property managers.</h1><p>From individual rental homes to apartment buildings and condominium communities, Eternity helps you address heating and cooling problems, maintain equipment and plan replacements.</p><div className="property-actions"><a className="btn btn-orange" href="#schedule">Request property service <span aria-hidden="true">→</span></a><a className="btn-outline" href={estimateHref}>Free replacement estimate</a></div><p className="property-hero-note">Requests from owners and authorized management only.</p></div>
      <aside aria-label="What management receives"><p className="kicker light">A clear process for your property</p><h2>Know the condition.<br />Review the options.<br />Authorize the work.</h2><ul><li>Written findings and job photos</li><li>Access coordinated through management</li><li>Recurring maintenance agreements</li><li>Service charge confirmed before scheduling</li></ul></aside>
    </section>
    <section className="section property-services" aria-labelledby="property-services-heading"><div><p className="kicker">One rental or a whole community</p><h2 id="property-services-heading">Service built around your property.</h2><p>Tell us about the equipment, affected units and urgency. We’ll review the next step with the person authorized to make decisions.</p></div><div className="property-card-grid">
      <article><span>01 / Repair</span><h3>Heating, cooling &amp; PTAC service</h3><p>Help with furnaces, air conditioning, boilers, heat pumps and packaged terminal air conditioners—the heating and cooling units often called PTACs.</p><a href="/services/boiler-service">Explore boiler service →</a></article>
      <article><span>02 / Maintain</span><h3>Recurring preventive maintenance</h3><p>Discuss your properties and equipment so we can develop an appropriate maintenance scope and schedule.</p><a href={maintenanceHref}>Discuss property maintenance →</a></article>
      <article><span>03 / Plan</span><h3>Replacement estimates &amp; second opinions</h3><p>Free installation estimates and reviews of proposals from verifiable, licensed HVAC contractors, onsite or remotely.</p><a href={estimateHref}>Request a free estimate →</a></article>
    </div></section>
    <section className="property-process section"><div><p className="kicker">Management stays in control</p><h2>From request to documented work.</h2></div><ol><li><h3>Management submits</h3><p>The owner or authorized representative provides property details, symptoms, affected units and access arrangements. Tenants report concerns to management.</p></li><li><h3>We confirm the next step</h3><p>We review the request and applicable service charge before scheduling. Include purchase-order and vendor requirements so they can be reviewed.</p></li><li><h3>You review the findings</h3><p>We explain the equipment condition and recommended options so management can authorize the work.</p></li><li><h3>Work is documented</h3><p>Written findings and job photos help management understand the work performed and recommended next steps.</p></li></ol></section>
    <section className="property-case section" aria-labelledby="property-case-heading"><div><p className="kicker light">A completed management-authorized job</p><h2 id="property-case-heading">PTAC unit swap at Eliza Bryant.</h2></div><div><p>Management authorized Eternity Mechanical Services to exchange a nonworking packaged terminal air conditioner with a working unit from elsewhere at the property.</p><p>After the swap, we checked refrigerant pressures and verified that both heating and cooling operated.</p><dl><div><dt>Equipment</dt><dd>PTAC heating and cooling unit</dd></div><div><dt>Work</dt><dd>Exchange with an existing working unit</dd></div><div><dt>Verification</dt><dd>Pressure checks; heating and cooling operation</dd></div></dl></div></section>
    <section className="section property-pricing"><div><p className="kicker">Clear charges</p><h2>The right service charge for the property.</h2><p>{managementTerms}</p></div><aside><h3>Free estimate or second opinion?</h3><p>Installation estimates and second opinions are free, onsite or remotely. Diagnostic and repair visits are separate paid services.</p><a href={estimateHref}>Request a free replacement estimate →</a><a href="/second-opinion">Submit a contractor’s quote for review →</a><small>Property owners or authorized management should submit quote reviews for managed properties.</small></aside></section>
    <section className="section landing-faq"><div><p className="kicker">Common questions</p><h2>Before you request property service.</h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
    <section id="schedule" className="schedule property-request"><div className="schedule-copy"><p className="kicker light">Owner &amp; management requests</p><h2>Tell us what your property needs.</h2><p>Have your property details, equipment information and access arrangements ready. Please do not include tenant names, access codes or payment information.</p><p>Requests are accepted from property owners and authorized management representatives. A website request does not confirm an appointment.</p><p>For urgent service, call <a href="tel:+12167033183">216-703-3183</a> to check availability.</p><p>Monday–Friday 7 a.m.–7 p.m.<br />Saturday 9 a.m.–5 p.m., Eastern Time.<br />Sunday: emergencies only.</p><a href="mailto:ben@eternityhvacr.com">Email ben@eternityhvacr.com</a></div><ServiceRequest managementOnly /></section>
    <section className="section property-related"><p className="kicker">Related services</p><a href="/services/commercial-hvac">Commercial HVAC →</a><a href="/services/boiler-service">Boiler service →</a><a href="/services/preventive-maintenance">Preventive maintenance →</a><a href="/areas-we-serve">Check service areas →</a></section>
    <SiteFooter requestHref="#schedule" />
  </main>;
}

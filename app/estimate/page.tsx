import type { Metadata } from "next";
import ProjectEstimator from "../components/ProjectEstimator";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { breadcrumbSchema, faqSchema, StructuredData, webApplicationSchema } from "../lib/structuredData";

const faqs = [
  ["Does this estimator provide a final price?", "No. It identifies the appropriate planning path and the information Eternity needs. Final scope and pricing depend on the equipment, property and on-site conditions."],
  ["Can Eternity estimate a replacement without seeing the property?", "A site review is normally needed to evaluate existing equipment, capacity, airflow, electrical service, access and installation conditions before a final proposal."],
  ["Can I submit another contractor's diagnosis or quote?", "Yes. Use the second-opinion form to send a PDF or clear equipment photos for a private 30-day review."],
] as const;

export const metadata: Metadata = {
  title: "HVAC Project Estimator | Eternity Mechanical Services",
  description: "Plan the right next step for HVAC, boiler and refrigeration repair, maintenance, installation or replacement in Greater Cleveland.",
  alternates: { canonical: "/estimate" },
  openGraph: { title: "HVAC Project Estimator | Eternity", description: "Choose the property, system and need to see the right service-planning path.", url: "/estimate" },
};

export default function EstimatePage() {
  return (
    <main>
      <SiteHeader />
      <StructuredData data={[
        webApplicationSchema({ name: "Eternity HVAC Project Estimator", description: metadata.description as string, path: "/estimate" }),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Project estimator", path: "/estimate" }]),
        faqSchema(faqs),
      ]} />
      <section className="tool-hero">
        <p className="eyebrow"><i /> Project planning tool</p>
        <h1>Know the right HVAC service path before you request it.</h1>
        <p>Choose the property, system and type of work. Eternity will show the practical next step and what should be evaluated before scope or pricing is confirmed.</p>
      </section>
      <section className="tool-section"><ProjectEstimator /></section>
      <section className="section tool-explainer">
        <div><p className="kicker">What this tool does</p><h2>A planning estimate—not a remote diagnosis or binding quote.</h2></div>
        <div><p>HVAC and refrigeration pricing depends on equipment condition, capacity, access, controls, electrical requirements and installation conditions. This estimator helps you start in the right place without inventing a price before those facts are known.</p><p>If you already have a diagnosis or proposal, Eternity can review it through the private second-opinion workflow.</p></div>
      </section>
      <section className="section landing-faq tool-faq">
        <div><p className="kicker">Common questions</p><h2>Before you request service</h2></div>
        <div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </section>
      <SiteFooter />
    </main>
  );
}

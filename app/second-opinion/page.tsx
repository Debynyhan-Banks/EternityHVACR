import type { Metadata } from "next";
import SecondOpinionForm from "../components/SecondOpinionForm";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { breadcrumbSchema, faqSchema, StructuredData } from "../lib/structuredData";

const faqs = [
  ["Is the quote review free?", "Yes. Upload a written quote from a verifiable, licensed HVAC contractor for a free second opinion on the proposed equipment, scope of work and price."],
  ["Will Eternity offer a lower price?", "We will explain whether the quoted price looks reasonable and whether Eternity can offer a better price for comparable work. A lower price is not guaranteed."],
  ["Who can see uploaded files?", "Only approved Eternity owner/admin users can open the private review workspace and download an unexpired file."],
  ["How long are files kept?", "Files and their private upload record expire after 30 days. Expired files cannot be opened and are removed by the retention cleanup workflow."],
  ["Does an upload replace an on-site diagnosis?", "No. Eternity can review the material you provide, but equipment condition and final recommendations may still require an on-site inspection and measurements."],
] as const;

export const metadata: Metadata = {
  title: "Free HVAC Quote Second Opinion | Eternity Mechanical",
  description: "Upload a licensed HVAC contractor’s quote for a free review of equipment, scope and price. Find out whether Eternity can offer a better price for comparable work.",
  alternates: { canonical: "/second-opinion" },
  openGraph: { title: "Free HVAC Quote Second Opinion | Eternity", description: "Get a free review of a licensed HVAC contractor’s quote, including scope, equipment and price, through our private upload form.", url: "/second-opinion" },
};

export default function SecondOpinionPage() {
  return (
    <main>
      <SiteHeader />
      <StructuredData data={[
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Second opinion", path: "/second-opinion" }]),
        faqSchema(faqs),
      ]} />
      <section className="tool-hero upload-hero">
        <p className="eyebrow"><i /> Second-opinion review</p>
        <h1>Get a Free Second Opinion on Your HVAC Quote</h1>
        <p>Upload a written quote from a verifiable, licensed HVAC contractor. We’ll review the equipment, scope of work and price, then let you know whether the price looks reasonable and whether Eternity can offer a better price for comparable work.</p>
        <p>You can also include the contractor&apos;s diagnosis and clear equipment photos. We’ll explain whether an on-site evaluation is needed.</p>
        <div className="privacy-badges"><span>Private storage</span><span>Owner/admin only</span><span>30-day retention</span></div>
      </section>
      <section className="tool-section"><SecondOpinionForm /></section>
      <section className="section landing-faq tool-faq">
        <div><p className="kicker">Privacy & process</p><h2>What happens to your upload</h2></div>
        <div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </section>
      <SiteFooter />
    </main>
  );
}

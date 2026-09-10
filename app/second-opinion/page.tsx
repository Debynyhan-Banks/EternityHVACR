import type { Metadata } from "next";
import SecondOpinionForm from "../components/SecondOpinionForm";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { breadcrumbSchema, faqSchema, StructuredData } from "../lib/structuredData";

const faqs = [
  ["Who can see uploaded files?", "Only approved Eternity owner/admin users can open the private review workspace and download an unexpired file."],
  ["How long are files kept?", "Files and their private upload record expire after 30 days. Expired files cannot be opened and are removed by the retention cleanup workflow."],
  ["Does an upload replace an on-site diagnosis?", "No. Eternity can review the material you provide, but equipment condition and final recommendations may still require an on-site inspection and measurements."],
] as const;

export const metadata: Metadata = {
  title: "HVAC Second Opinion Upload | Eternity Mechanical",
  description: "Privately upload an HVAC diagnosis, quote or equipment photos for an Eternity Mechanical second-opinion review in Greater Cleveland.",
  alternates: { canonical: "/second-opinion" },
  openGraph: { title: "Private HVAC Second Opinion | Eternity", description: "Send a diagnosis, proposal or equipment photos through a private 30-day review workflow.", url: "/second-opinion" },
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
        <h1>Send the existing HVAC diagnosis before making the next decision.</h1>
        <p>Upload another contractor&apos;s diagnosis or proposal, or clear equipment photos. Eternity will review what you provide and explain whether an on-site evaluation is still needed.</p>
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

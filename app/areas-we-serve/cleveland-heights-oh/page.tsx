import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";
import { breadcrumbSchema, faqSchema, serviceSchema, StructuredData } from "../../lib/structuredData";

const pagePath = "/areas-we-serve/cleveland-heights-oh";
const faqs = [
  ["Does Eternity serve Cleveland Heights?", "Yes. Cleveland Heights is one of Eternity Mechanical Services' approved priority markets. Normal coverage includes ZIP codes 44106, 44112, 44118 and 44121, subject to current availability."],
  ["Does Eternity work on residential and commercial systems?", "Yes. Eternity serves homes, businesses and managed properties with heating, cooling, boiler, commercial HVAC, refrigeration, installation and preventive-maintenance services."],
  ["Can I get a second opinion on an HVAC proposal?", "Yes. You may send a diagnosis, proposal or equipment photos through Eternity's private second-opinion upload. Files are limited to approved owner/admin access and expire after 30 days."],
] as const;

export const metadata: Metadata = {
  title: "HVAC Repair in Cleveland Heights, OH | Eternity",
  description: "HVAC repair, furnace, boiler, heat-pump, installation and commercial mechanical service in Cleveland Heights, Ohio from Eternity Mechanical Services.",
  alternates: { canonical: pagePath },
  openGraph: { title: "HVAC Service in Cleveland Heights, Ohio", description: "Residential and commercial HVAC/R service across Cleveland Heights ZIP codes 44106, 44112, 44118 and 44121.", url: pagePath },
};

const services = [
  ["Cooling", "Air-conditioning repair", "Diagnostics and repair for systems that are not cooling, cycling incorrectly, leaking or producing unusual sounds.", "/services/air-conditioning-repair"],
  ["Heating", "Furnace and heating service", "Heating diagnostics, repair and replacement planning based on equipment condition and measurements.", "/services/furnace-heating-repair"],
  ["Hydronic", "Boiler service", "Boiler inspection and repair for homes, businesses and managed properties.", "/services/boiler-service"],
  ["Commercial", "Commercial HVAC/R", "Rooftop HVAC, commercial heating and cooling, refrigeration and preventive maintenance.", "/services/commercial-hvac"],
] as const;

export default function ClevelandHeightsPage() {
  return (
    <main>
      <SiteHeader />
      <StructuredData data={[
        serviceSchema({ name: "HVAC and mechanical service in Cleveland Heights, Ohio", description: metadata.description as string, path: pagePath, areaServed: ["Cleveland Heights"] }),
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Areas we serve", path: "/areas-we-serve" }, { name: "Cleveland Heights", path: pagePath }]),
        faqSchema(faqs),
      ]} />
      <section className="city-hero">
        <div>
          <p className="eyebrow"><i /> Cleveland Heights, Ohio</p>
          <h1>HVAC, boiler and mechanical service for Cleveland Heights properties.</h1>
          <p>Eternity Mechanical Services supports homes, businesses and managed properties across approved Cleveland Heights service ZIP codes with diagnostics, repair, installation and maintenance.</p>
          <div className="hero-actions"><a className="btn" href="https://eternityhvacr.com/#schedule">Request service <span>↗</span></a><a className="btn-outline" href="tel:+12167033183">Call 216-703-3183 <span>→</span></a></div>
          <div className="city-coverage"><span>Approved priority market</span><strong>44106 • 44112 • 44118 • 44121</strong></div>
        </div>
        <figure><picture><source media="(max-width: 700px)" srcSet="/images/eternity-van-hero-mobile-b.webp" type="image/webp" /><img src="/images/eternity-van-hero.jpg" alt="Eternity Mechanical Services owner and service van serving Greater Cleveland" width="1400" height="900" /></picture><figcaption>Serving Greater Cleveland • Licensed & insured</figcaption></figure>
      </section>

      <section className="section city-services"><div className="section-head"><div><p className="kicker">Cleveland Heights service</p><h2>One contractor for the building&apos;s comfort systems.</h2></div><p>Eternity evaluates the equipment and operating conditions before recommending approved work.</p></div><div className="location-service-grid">{services.map(([label, title, copy, href]) => <article key={title}><span>{label}</span><h3>{title}</h3><p>{copy}</p><Link href={href}>Explore service <b aria-hidden="true">→</b></Link></article>)}</div></section>

      <section className="city-paths">
        <div><p className="kicker light">Plan the next step</p><h2>Not sure which installation fits?</h2><p>Use the project estimator to review approved baseline ranges for common furnace and forced-air installation scopes. Eternity confirms final pricing after reviewing the property and equipment conditions.</p><Link href="/estimate">Open the estimator →</Link></div>
        <div><p className="kicker light">Already have a proposal?</p><h2>Request a private second opinion.</h2><p>Send a diagnosis, quote or equipment photos through the owner/admin-only, 30-day upload workflow.</p><Link href="/second-opinion">Upload for review →</Link></div>
      </section>

      <section className="section location-coverage"><div><p className="kicker">Local coverage</p><h2>Cleveland Heights is part of Eternity&apos;s approved service area.</h2><p>Normal coverage includes ZIP codes 44106, 44112, 44118 and 44121. Appointment availability depends on the property, system and current schedule. Nearby coverage includes Cleveland, South Euclid, Shaker Heights, Beachwood and Richmond Heights.</p><Link className="inline-cta" href="/areas-we-serve">View all approved service areas <span>→</span></Link></div><div className="nearby-areas" aria-label="Communities near Cleveland Heights">{["Cleveland", "South Euclid", "Shaker Heights", "Beachwood", "Richmond Heights"].map((city) => <span key={city}>{city}</span>)}</div></section>

      <section className="section landing-faq location-faq"><div><p className="kicker">Common questions</p><h2>HVAC service in Cleveland Heights</h2></div><div>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
      <section className="emergency landing-cta"><div><p className="kicker light">Need service in Cleveland Heights?</p><h2>Tell Eternity what the equipment needs.</h2><p>Share the property, system and timing through the existing service-request workflow.</p></div><div><a className="btn btn-orange" href="https://eternityhvacr.com/#schedule">Request service <span>↗</span></a><a className="btn-outline light-outline" href="tel:+12167033183">Call 216-703-3183 <span>→</span></a><small>Website requests are typically reviewed within 15 minutes during regular business hours. For urgent service, call directly.</small></div></section>
      <SiteFooter />
    </main>
  );
}

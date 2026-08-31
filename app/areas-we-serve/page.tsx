import type { Metadata } from "next";
import Link from "next/link";
import ServiceAreaChecker from "../components/ServiceAreaChecker";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { allServiceAreas, extendedServiceAreas, priorityServiceAreas } from "../data/serviceAreas";

export const metadata: Metadata = {
  title: "HVAC Service Areas Near Cleveland, OH | Eternity",
  description: "Find HVAC repair, boiler, heat pump, commercial refrigeration and preventive-maintenance coverage across Cleveland, Euclid and Northeast Ohio.",
  alternates: { canonical: "/areas-we-serve" },
  openGraph: { title: "HVAC Service Areas Near Cleveland | Eternity", description: "Heating, cooling, boiler and refrigeration service for Greater Cleveland homes, businesses and managed properties.", url: "/areas-we-serve" },
};

const groupedExtended = extendedServiceAreas.reduce<Record<string, typeof extendedServiceAreas>>((groups, area) => {
  const region = area.region ?? "Other";
  groups[region] = [...(groups[region] ?? []), area];
  return groups;
}, {});
const schema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Eternity Mechanical Services service areas",
  itemListElement: allServiceAreas.map((area, index) => ({ "@type": "ListItem", position: index + 1, item: { "@type": "City", name: area.city } })),
};

export default function AreasWeServePage() {
  return <main>
    <SiteHeader />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className="area-hero"><div><p className="eyebrow"><i /> Greater Cleveland service area</p><h1>HVAC, Refrigeration & Boiler Service Across Greater Cleveland</h1><p>Eternity Mechanical Services provides heating, air-conditioning, boiler, heat-pump, commercial HVAC, refrigeration and preventive-maintenance service across the approved cities and ZIP codes below.</p><div className="hero-actions"><a className="btn" href="https://eternityhvacr.com/#schedule">Request service <span>↗</span></a><a className="btn-outline" href="tel:+12167033183">Call 216-703-3183 <span>→</span></a></div></div><div className="area-hero-card"><span>Primary coverage</span><strong>20 priority markets</strong><p>Cleveland, Cuyahoga County suburbs and surrounding Northeast Ohio communities.</p><small>15-minute response target during regular business hours.</small></div></section>
    <section className="section checker-section"><ServiceAreaChecker /></section>
    <section className="section landing-overview"><div><p className="kicker">Services available near Cleveland</p><h2>Residential and commercial mechanical service.</h2><p>Use the service-area checker for your ZIP code, then review the service that matches the equipment or property need.</p></div><div className="landing-list area-service-links"><Link href="/services/air-conditioning-repair">Air-conditioning repair →</Link><Link href="/services/furnace-heating-repair">Furnace and heating repair →</Link><Link href="/services/boiler-service">Boiler service and repair →</Link><Link href="/services/commercial-hvac">Commercial HVAC repair →</Link><Link href="/services/commercial-refrigeration">Commercial refrigeration service →</Link><Link href="/services/preventive-maintenance">HVAC preventive maintenance →</Link></div></section>
    <section className="section area-section"><div className="section-head"><div><p className="kicker">Primary coverage</p><h2>Core service cities and ZIP codes</h2></div><p>These priority markets receive the strongest service-area and search coverage.</p></div><div className="area-grid">{priorityServiceAreas.map((area) => {
      const card = <article><span>{area.region ?? "Core"}</span><h3>{area.city}</h3><p>{area.zips.join(" • ")}</p>{area.city === "Euclid" && <b>View real Euclid project work →</b>}</article>;
      return area.city === "Euclid" ? <Link className="area-card-link" href="/areas-we-serve/euclid-oh" key={area.city} aria-label="View HVAC service and real project work in Euclid, Ohio">{card}</Link> : <div key={area.city}>{card}</div>;
    })}</div></section>
    <section className="extended-areas"><div className="extended-heading"><p className="kicker light">Extended coverage</p><h2>Additional Northeast Ohio communities</h2><p>Service availability and timing are confirmed directly based on the property, equipment and current schedule.</p></div><div className="extended-groups">{Object.entries(groupedExtended).map(([region, areas]) => <section key={region}><h3>{region}</h3><div>{areas.map((area) => <p key={area.city}><strong>{area.city}</strong><span>{area.zips.join(", ")}</span></p>)}</div></section>)}</div></section>
    <section className="section area-note"><div><p className="kicker">Not sure whether your property is covered?</p><h2>Send the city, ZIP code and equipment details.</h2><p>Eternity will confirm normal service-area coverage and appointment availability directly.</p></div><div><a className="btn" href="https://eternityhvacr.com/#schedule">Check service availability <span>→</span></a><a href="mailto:ben@eternityhvacr.com">Email ben@eternityhvacr.com</a></div></section>
    <SiteFooter />
  </main>;
}

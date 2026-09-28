import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "HVAC Project Case Studies | Eternity Mechanical",
  description: "Explore verified HVAC installations and commercial refrigeration repairs completed by Eternity Mechanical Services in Greater Cleveland and Northeast Ohio.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Verified HVAC Projects from Eternity Mechanical",
    description: "Real Greater Cleveland HVAC and refrigeration projects documented with project facts and field photography.",
    url: "/projects",
    type: "website",
  },
};

const projects = [
  {
    href: "/projects/half-moon-bakery-walk-in-cooler-repair",
    image: "/images/half-moon/walk-in-cooler-condensing-unit-1200.webp",
    imageSmall: "/images/half-moon/walk-in-cooler-condensing-unit-720.webp",
    alt: "Walk-in cooler condensing unit photographed during the Half Moon Bakery repair in Cleveland",
    label: "Cleveland 44114 • Commercial refrigeration",
    title: "Half Moon Bakery Walk-In Cooler Repair",
    copy: "A high-side service-port leak repaired, the system recharged, and 34°F cooler operation with normal on/off cycling verified during the visit.",
  },
  {
    href: "/projects/euclid-payne-hvac-installation",
    image: "/images/euclid/euclid-oh-residential-furnace-installation-1200.webp",
    imageSmall: "/images/euclid/euclid-oh-residential-furnace-installation-720.webp",
    alt: "Payne furnace and matching evaporator coil installed by Eternity Mechanical in Euclid",
    label: "Euclid 44123 • Residential resale",
    title: "Matched Payne HVAC Replacement",
    copy: "An outdated system replaced with an 80,000 BTU, 80% AFUE furnace, matching coil and 2.5-ton condenser for a home being prepared for sale.",
  },
  {
    href: "/projects/euclid-central-air-installation",
    image: "/images/euclid/euclid-oh-sinclair-furnace-installation-1200.webp",
    imageSmall: "/images/euclid/euclid-oh-sinclair-furnace-installation-720.webp",
    alt: "Eternity technician beside a completed Sinclair furnace and coil installation in Euclid",
    label: "Euclid 44119 • Residential comfort",
    title: "Central Air & High-Efficiency Furnace",
    copy: "A 40-plus-year-old furnace replaced while adding a 96% efficiency furnace and complete 3-ton central-air system.",
  },
];

export default function ProjectsPage() {
  return (
    <main>
      <SiteHeader />
      <section className="project-index-hero">
        <p className="eyebrow"><i /> Verified field work</p>
        <h1>Real HVAC & Refrigeration Projects. Documented Results.</h1>
        <p>Each case study uses genuine project photography and confirmed job facts. Customer goals are separated from outcomes that were not measured.</p>
      </section>
      <section className="section project-index-section">
        <div className="section-head"><div><p className="kicker">Project library</p><h2>Heating, cooling and commercial refrigeration</h2></div><p>Residential installations and commercial refrigeration repairs, documented with project photographs and confirmed service details.</p></div>
        <div className="project-index-grid">
          {projects.map((project) => (
            <Link className="project-index-card" href={project.href} key={project.href}>
              <picture><source media="(max-width: 700px)" srcSet={project.imageSmall} type="image/webp" /><img src={project.image} alt={project.alt} width="1200" height="2132" loading="lazy" decoding="async" /></picture>
              <div><span>{project.label}</span><h2>{project.title}</h2><p>{project.copy}</p><b>Read the case study →</b></div>
            </Link>
          ))}
        </div>
      </section>
      <section className="emergency landing-cta">
        <div><p className="kicker light">Need HVAC or refrigeration service?</p><h2>Tell Eternity what the property needs.</h2><p>Request repair, maintenance or installation support for a home, rental, managed property or commercial facility.</p></div>
        <div><a className="btn btn-orange" href="https://eternityhvacr.com/#schedule">Request service <span>↗</span></a><a className="btn-outline light-outline" href="tel:+12167033183">Call 216-703-3183 <span>→</span></a></div>
      </section>
      <SiteFooter />
    </main>
  );
}

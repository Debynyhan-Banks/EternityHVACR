import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";

const path = "/projects/half-moon-bakery-walk-in-cooler-repair";
const pageUrl = `https://eternityhvacr.com${path}`;
const equipmentImage = "/images/half-moon/walk-in-cooler-condensing-unit-1200.webp";
const portImage = "/images/half-moon/high-side-service-port-1200.webp";
const title = "Walk-In Cooler Leak Repair at Half Moon Bakery";
const description = "Eternity located and repaired a high-side service-port refrigerant leak at Half Moon Bakery in Cleveland, then verified 34°F cooler operation and normal on/off cycling.";

export const metadata: Metadata = {
  title: "Half Moon Bakery Walk-In Cooler Repair | Cleveland | Eternity",
  description,
  alternates: { canonical: path },
  openGraph: {
    title, description, url: path, type: "article",
    images: [{ url: equipmentImage, width: 1200, height: 2132, alt: "Walk-in cooler condensing unit photographed during the Half Moon Bakery service visit" }],
  },
  twitter: { card: "summary_large_image", title, description, images: [equipmentImage] },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article", "@id": `${pageUrl}#case-study`, headline: title,
      description, url: pageUrl, mainEntityOfPage: pageUrl,
      image: [equipmentImage, portImage].map(image => `https://eternityhvacr.com${image}`),
      author: { "@id": "https://eternityhvacr.com/#business" },
      publisher: { "@id": "https://eternityhvacr.com/#business" },
      about: ["Walk-in cooler repair", "Refrigerant leak detection", "Commercial refrigeration"],
      spatialCoverage: { "@type": "Place", name: "Half Moon Bakery", address: { "@type": "PostalAddress", streetAddress: "2203 Chester Ave", addressLocality: "Cleveland", addressRegion: "OH", postalCode: "44114", addressCountry: "US" } },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://eternityhvacr.com/" },
        { "@type": "ListItem", position: 2, name: "Projects", item: "https://eternityhvacr.com/projects" },
        { "@type": "ListItem", position: 3, name: "Half Moon Bakery cooler repair", item: pageUrl },
      ],
    },
  ],
};

export default function HalfMoonBakeryCoolerRepair() {
  return <main>
    <SiteHeader />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className="case-study-hero">
      <div className="case-study-hero-copy">
        <nav className="case-study-breadcrumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/projects">Projects</Link><span aria-hidden="true">/</span><span>Half Moon Bakery</span></nav>
        <p className="eyebrow"><i /> Commercial refrigeration • Cleveland, Ohio</p>
        <h1>{title}</h1>
        <p className="case-study-lede">A walk-in cooler was low on refrigerant. Eternity traced the leak to a high-side service port, replaced the port and recharged the system. The technician then observed the cooler operating at 34°F and cycling on and off normally.</p>
        <div className="case-study-quick-facts" aria-label="Project summary">
          <div><span>Customer</span><strong>Half Moon Bakery</strong></div>
          <div><span>Location</span><strong>2203 Chester Ave<br />Cleveland, OH 44114</strong></div>
          <div><span>Repair</span><strong>High-side service port</strong></div>
          <div><span>Observed result</span><strong>34°F with normal cycling</strong></div>
        </div>
      </div>
      <figure className="case-study-hero-image"><picture><source media="(max-width: 700px)" srcSet="/images/half-moon/walk-in-cooler-condensing-unit-720.webp" type="image/webp" /><img src={equipmentImage} alt="Walk-in cooler condensing unit photographed during the Half Moon Bakery service visit" width="1200" height="2132" fetchPriority="high" decoding="async" /></picture><figcaption>Equipment photographed during the service visit</figcaption></figure>
    </section>
    <section className="case-study-summary" aria-label="Repair summary">
      <div><strong>Leak located</strong><span>High-side service port</span></div>
      <div><strong>Port replaced</strong><span>Refrigerant recovered</span></div>
      <div><strong>34°F</strong><span>Observed box temperature</span></div>
      <div><strong>Normal cycling</strong><span>On/off operation checked</span></div>
    </section>
    <section className="section case-study-story">
      <div className="case-study-heading"><p className="kicker">Diagnosis and repair</p><h2>Locate the leak, repair the source, then check operation.</h2></div>
      <div className="case-study-story-grid">
        <article><span>01</span><h3>Locate the refrigerant leak</h3><p>The technician pressurized the system with nitrogen and applied bubble leak-detection solution. Bubbles at a high-side service port identified the leak location.</p></article>
        <article><span>02</span><h3>Replace the leaking port</h3><p>The remaining refrigerant was recovered, the leaking service port was replaced and the system was recharged to the correct refrigerant charge.</p></article>
        <article><span>03</span><h3>Verify temperature and cycling</h3><p>The cooler reached 34°F during the service check. The technician allowed it to cycle on and off and confirmed normal operation during that observation.</p></article>
      </div>
    </section>
    <section className="case-study-solution">
      <div><p className="kicker light">Operating checks</p><h2>Temperature and system operation checked together.</h2><p>The technician evaluated the desired box temperature, evaporator temperature difference and corresponding saturated suction temperature, and reviewed condensing conditions against the air temperature around the condenser.</p><p>The final check included the cooler’s 34°F box temperature and normal on/off cycling.</p></div>
      <div className="case-study-install-list" aria-label="Verification scope">
        <span><i>✓</i><b>Nitrogen and bubble testing</b><small>Leak located at the high-side service port</small></span>
        <span><i>✓</i><b>Service-port repair</b><small>Refrigerant recovered and system recharged</small></span>
        <span><i>✓</i><b>Temperature check</b><small>34°F observed during the service visit</small></span>
        <span><i>✓</i><b>Operating-cycle check</b><small>Normal on/off operation observed</small></span>
      </div>
    </section>
    <section className="section project-gallery" aria-labelledby="half-moon-gallery">
      <div className="section-head"><div><p className="kicker">Field photographs</p><h2 id="half-moon-gallery">Equipment and service-port detail.</h2></div><p>Photographs supplied by the technician from this project.</p></div>
      <div className="project-gallery-grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", maxWidth: "900px", marginInline: "auto" }}>
        <figure><picture><source media="(max-width: 700px)" srcSet="/images/half-moon/walk-in-cooler-condensing-unit-720.webp" type="image/webp" /><img src={equipmentImage} alt="Walk-in cooler condensing unit and surrounding refrigerant piping at Half Moon Bakery" width="1200" height="2132" loading="lazy" decoding="async" /></picture><figcaption>Condensing unit and surrounding piping</figcaption></figure>
        <figure><picture><source media="(max-width: 700px)" srcSet="/images/half-moon/high-side-service-port-720.webp" type="image/webp" /><img src={portImage} alt="Close-up of the refrigerant service-port assembly photographed during the Half Moon Bakery repair" width="1200" height="2132" loading="lazy" decoding="async" /></picture><figcaption>Service-port assembly photographed during the repair</figcaption></figure>
      </div>
    </section>
    <section className="section case-study-result"><div><p className="kicker">Observed result</p><h2>Back to 34°F with normal on/off cycling.</h2><p>After the service-port replacement and refrigerant recharge, the technician confirmed the cooler’s temperature and observed normal cycling during the visit.</p></div><aside className="case-study-result-card"><h3>Commercial refrigeration support</h3><p>Eternity services walk-in coolers and other commercial refrigeration equipment throughout Greater Cleveland.</p><Link className="inline-cta" href="/services/commercial-refrigeration">Explore refrigeration service <span>→</span></Link></aside></section>
    <section className="emergency landing-cta"><div><p className="kicker light">Walk-in cooler service</p><h2>Tell us what your refrigeration equipment needs.</h2><p>Share the equipment, symptoms and timing. For urgent service, call directly.</p></div><div><a className="btn btn-orange" href="https://eternityhvacr.com/?serviceScope=commercial-refrigeration#schedule">Request refrigeration service <span>↗</span></a><a className="btn-outline light-outline" href="tel:+12167033183">Call 216-703-3183 <span>→</span></a></div></section>
    <SiteFooter />
  </main>;
}

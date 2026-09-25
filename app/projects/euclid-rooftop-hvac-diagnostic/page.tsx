import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";

const pageUrl = "https://eternityhvacr.com/projects/euclid-rooftop-hvac-diagnostic";
const projectImage = "https://eternityhvacr.com/images/euclid/cleveland-commercial-rooftop-hvac-service-1200.webp";

export const metadata: Metadata = {
  title: "Commercial Rooftop HVAC Equipment Conditions | Field Record",
  description: "A photo-supported field record of a frozen evaporator coil, equipment contamination, blower dust and missing filtration on commercial rooftop equipment in the 44119 market.",
  alternates: { canonical: "/projects/euclid-rooftop-hvac-diagnostic" },
  robots: { index: false, follow: true },
  openGraph: {
    title: "Commercial Rooftop HVAC Equipment Field Record",
    description: "Documented rooftop-unit conditions from a commercial HVAC service visit in Greater Cleveland's 44119 market.",
    url: "/projects/euclid-rooftop-hvac-diagnostic",
    type: "article",
    images: [{
      url: "/images/euclid/cleveland-commercial-rooftop-hvac-service-1200.webp",
      width: 1200,
      height: 900,
      alt: "Commercial rooftop HVAC equipment opened during a service visit",
    }],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${pageUrl}#field-record`,
      headline: "Commercial Rooftop HVAC Equipment Field Record",
      description: metadata.description,
      url: pageUrl,
      image: projectImage,
      datePublished: "2026-08-25",
      dateModified: "2026-09-25",
      author: { "@id": "https://eternityhvacr.com/#business" },
      publisher: { "@id": "https://eternityhvacr.com/#business" },
      about: ["Commercial rooftop HVAC", "Frozen evaporator coil", "Equipment contamination", "HVAC service"],
      mainEntityOfPage: pageUrl,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://eternityhvacr.com/" },
        { "@type": "ListItem", position: 2, name: "Projects", item: "https://eternityhvacr.com/projects" },
        { "@type": "ListItem", position: 3, name: "Commercial Rooftop Field Record", item: pageUrl },
      ],
    },
    {
      "@type": "ImageObject",
      contentUrl: projectImage,
      caption: "Commercial rooftop HVAC equipment documented during a service visit in the 44119 market",
      representativeOfPage: true,
      creator: { "@id": "https://eternityhvacr.com/#business" },
    },
  ],
};

export default function RooftopEquipmentFieldRecord() {
  return (
    <main>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="case-study-hero">
        <div className="case-study-hero-copy">
          <nav className="case-study-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/projects">Projects</Link><span aria-hidden="true">/</span><span>Field record</span>
          </nav>
          <p className="eyebrow"><i /> Commercial service record • 44119 market</p>
          <h1>Commercial Rooftop HVAC Unit: Documented Equipment Conditions</h1>
          <p className="case-study-lede">This photo-supported record documents the equipment conditions confirmed from a commercial rooftop service visit. The exact municipality, customer, final diagnosis and repair outcome are not published because they have not been confirmed.</p>
          <div className="case-study-quick-facts" aria-label="Field record summary">
            <div><span>Service market</span><strong>44119 Cleveland/Euclid area</strong></div>
            <div><span>Equipment</span><strong>Commercial rooftop unit</strong></div>
            <div><span>Observed</span><strong>Frozen evaporator coil</strong></div>
            <div><span>Observed</span><strong>Contamination and no filter</strong></div>
          </div>
        </div>
        <figure className="case-study-hero-image rooftop-case-image">
          <picture>
            <source media="(max-width: 700px)" srcSet="/images/euclid/cleveland-commercial-rooftop-hvac-service-720.webp" type="image/webp" />
            <img src="/images/euclid/cleveland-commercial-rooftop-hvac-service-1200.webp" alt="Commercial rooftop HVAC equipment opened during a service visit" width="1200" height="900" fetchPriority="high" decoding="async" />
          </picture>
          <figcaption>Commercial rooftop HVAC equipment • 44119 market</figcaption>
        </figure>
      </section>

      <section className="case-study-summary" aria-label="Documented equipment conditions">
        <div><strong>Frozen</strong><span>Evaporator coil</span></div>
        <div><strong>Significant</strong><span>Equipment contamination</span></div>
        <div><strong>Dust buildup</strong><span>Blower motor</span></div>
        <div><strong>Not installed</strong><span>Air filter</span></div>
      </section>

      <section className="section case-study-story">
        <div className="case-study-heading">
          <p className="kicker">What the record shows</p>
          <h2>Observed conditions separated from outcomes that were not confirmed.</h2>
        </div>
        <div className="case-study-story-grid">
          <article>
            <span>01</span>
            <h3>Frozen evaporator</h3>
            <p>The evaporator coil was documented in a frozen condition during the commercial rooftop service visit.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Equipment contamination</h3>
            <p>The equipment showed significant contamination, including dust accumulation on the blower motor.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Missing filtration</h3>
            <p>No installed air filter was documented at the equipment when the service photograph was taken.</p>
          </article>
        </div>
      </section>

      <section className="case-study-solution">
        <div>
          <p className="kicker light">Evidence boundary</p>
          <h2>The photograph supports an equipment-condition record.</h2>
          <p>The verified evidence supports publishing the frozen coil, equipment contamination, blower-motor dust and absent air filter as observed conditions.</p>
          <p>It does not establish the exact municipality, final diagnosis, completed repair, parts replaced, operating result or price. Those details are intentionally omitted.</p>
        </div>
        <div className="case-study-install-list" aria-label="Field-record boundaries">
          <span><i>✓</i><b>Field photograph retained</b><small>Genuine commercial rooftop equipment</small></span>
          <span><i>✓</i><b>Observed conditions listed</b><small>Limited to documented evidence</small></span>
          <span><i>—</i><b>Diagnosis not claimed</b><small>No unsupported conclusion published</small></span>
          <span><i>—</i><b>Outcome not claimed</b><small>No repair or restored-operation result published</small></span>
        </div>
      </section>

      <section className="section case-study-result">
        <div>
          <p className="kicker">What is established</p>
          <h2>A factual record of the rooftop unit’s observed condition.</h2>
          <p>The available project evidence shows a frozen evaporator coil, substantial contamination, dust on the blower motor and no installed air filter during a commercial rooftop service visit in the 44119 Cleveland/Euclid-area market.</p>
          <p>The exact municipality, final diagnosis and repair outcome remain outside this public record unless those details are later confirmed.</p>
        </div>
        <aside className="case-study-result-card">
          <span>Published evidence boundary</span>
          <strong>Observed facts without an invented diagnosis or result</strong>
          <div className="case-study-before-after">
            <div><em>Observed</em><b>Frozen evaporator coil</b><small>Documented at the equipment</small></div>
            <div><em>Observed</em><b>Contamination and blower dust</b><small>Visible equipment condition</small></div>
            <div><em>Unconfirmed</em><b>Final diagnosis and repair outcome</b><small>Not presented as public facts</small></div>
          </div>
        </aside>
      </section>

      <section className="emergency landing-cta">
        <div><p className="kicker light">Rooftop unit frozen or not cooling?</p><h2>Request a measured commercial HVAC diagnostic.</h2><p>Tell Eternity what the equipment is doing and what your team has already observed.</p></div>
        <div><a className="btn btn-orange" href="https://eternityhvacr.com/#schedule">Request commercial service <span>↗</span></a><Link className="btn-outline light-outline" href="/services/commercial-hvac">Commercial HVAC services <span>→</span></Link><small>For urgent system-down service, call 216-703-3183.</small></div>
      </section>

      <SiteFooter />
    </main>
  );
}

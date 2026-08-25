import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";

const pageUrl = "https://eternityhvacr.com/projects/euclid-rooftop-hvac-diagnostic";
const projectImage = "https://eternityhvacr.com/images/euclid/cleveland-commercial-rooftop-hvac-service-1200.webp";

export const metadata: Metadata = {
  title: "Frozen Rooftop HVAC Diagnostic in Euclid | Case Study",
  description: "See how Eternity investigated a frozen, heavily contaminated rooftop HVAC unit in Euclid 44119 and pressure-tested the system for a suspected refrigerant leak.",
  alternates: { canonical: "/projects/euclid-rooftop-hvac-diagnostic" },
  openGraph: {
    title: "Frozen Rooftop HVAC Diagnostic in Euclid",
    description: "A field-documented commercial rooftop-unit diagnostic involving a frozen evaporator, pressure test and severe blower contamination.",
    url: "/projects/euclid-rooftop-hvac-diagnostic",
    type: "article",
    images: [{
      url: "/images/euclid/cleveland-commercial-rooftop-hvac-service-1200.webp",
      width: 1200,
      height: 900,
      alt: "Commercial rooftop HVAC unit opened for diagnostic service in Euclid, Ohio",
    }],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${pageUrl}#case-study`,
      headline: "Frozen Rooftop HVAC Diagnostic in Euclid, Ohio",
      description: metadata.description,
      url: pageUrl,
      image: projectImage,
      datePublished: "2026-08-25",
      dateModified: "2026-08-25",
      author: { "@id": "https://eternityhvacr.com/#business" },
      publisher: { "@id": "https://eternityhvacr.com/#business" },
      about: ["Commercial rooftop HVAC", "Frozen evaporator coil", "Refrigerant leak testing", "HVAC diagnostics"],
      spatialCoverage: { "@type": "City", name: "Euclid", containedInPlace: { "@type": "State", name: "Ohio" } },
      mainEntityOfPage: pageUrl,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://eternityhvacr.com/" },
        { "@type": "ListItem", position: 2, name: "Projects", item: "https://eternityhvacr.com/projects" },
        { "@type": "ListItem", position: 3, name: "Euclid Rooftop HVAC Diagnostic", item: pageUrl },
      ],
    },
    {
      "@type": "ImageObject",
      contentUrl: projectImage,
      caption: "Commercial rooftop HVAC unit opened during diagnostic service in Euclid, Ohio 44119",
      representativeOfPage: true,
      creator: { "@id": "https://eternityhvacr.com/#business" },
    },
  ],
};

export default function EuclidRooftopDiagnosticCaseStudy() {
  return (
    <main>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="case-study-hero">
        <div className="case-study-hero-copy">
          <nav className="case-study-breadcrumbs" aria-label="Breadcrumb">
            <a href="/">Home</a><span aria-hidden="true">/</span><a href="/projects">Projects</a><span aria-hidden="true">/</span><span>Case study</span>
          </nav>
          <p className="eyebrow"><i /> Commercial diagnostic • Euclid 44119</p>
          <h1>Frozen Rooftop HVAC Unit: What the Diagnostic Actually Found</h1>
          <p className="case-study-lede">The owner suspected the rooftop unit was low on refrigerant and had a leak. The evaporator coil was frozen solid, but the test results and physical inspection told a more complete story.</p>
          <div className="case-study-quick-facts" aria-label="Project summary">
            <div><span>Location</span><strong>Euclid, OH 44119</strong></div>
            <div><span>Equipment</span><strong>Commercial rooftop unit</strong></div>
            <div><span>Reported concern</span><strong>Low refrigerant or leak</strong></div>
            <div><span>Confirmed by test</span><strong>No leak found</strong></div>
          </div>
          <div className="hero-actions">
            <a className="btn btn-orange" href="/#schedule">Request commercial service <span>↗</span></a>
            <a className="btn-outline" href="tel:+12162536468">Call 216-253-6468 <span>→</span></a>
          </div>
        </div>
        <figure className="case-study-hero-image rooftop-case-image">
          <picture>
            <source media="(max-width: 700px)" srcSet="/images/euclid/cleveland-commercial-rooftop-hvac-service-720.webp" type="image/webp" />
            <img src="/images/euclid/cleveland-commercial-rooftop-hvac-service-1200.webp" alt="Commercial rooftop HVAC unit opened for diagnostic service in Euclid, Ohio" width="1200" height="900" fetchPriority="high" decoding="async" />
          </picture>
          <figcaption>Rooftop packaged unit during diagnostic service • Euclid 44119</figcaption>
        </figure>
      </section>

      <section className="case-study-summary" aria-label="Diagnostic findings">
        <div><strong>Frozen solid</strong><span>Evaporator coil</span></div>
        <div><strong>No leak found</strong><span>After pressure test</span></div>
        <div><strong>Heavy buildup</strong><span>Grease & dirt</span></div>
        <div><strong>Missing</strong><span>Air filter & filter-drier</span></div>
      </section>

      <section className="section case-study-story">
        <div className="case-study-heading">
          <p className="kicker">The diagnostic sequence</p>
          <h2>The reported cause was tested instead of assumed.</h2>
        </div>
        <div className="case-study-story-grid">
          <article>
            <span>01</span>
            <h3>The owner’s concern</h3>
            <p>The owner suspected the unit was low on refrigerant because of a leak. The evaporator was frozen solid when the system was inspected.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Thaw and pressure test</h3>
            <p>The evaporator was allowed to thaw before the refrigerant circuit was pressurized. No leak was found under the test conditions.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Physical inspection</h3>
            <p>The unit was heavily contaminated, the blower wheel and cage assembly was caked with grease and dirt, and neither an air filter nor a refrigerant filter-drier was present.</p>
          </article>
        </div>
      </section>

      <section className="case-study-solution">
        <div>
          <p className="kicker light">Observed conditions</p>
          <h2>The equipment condition mattered as much as the refrigerant concern.</h2>
          <p>The service visit did not confirm the suspected leak. It did document a frozen evaporator, severe contamination at the blower assembly, a missing air filter and a missing refrigerant filter-drier.</p>
          <p>Those findings separate a verified equipment condition from the owner’s original theory and create a factual basis for discussing the next approved work.</p>
        </div>
        <div className="case-study-install-list" aria-label="Observed rooftop-unit conditions">
          <span><i>✓</i><b>Evaporator thawed</b><small>Required before pressure testing</small></span>
          <span><i>✓</i><b>Refrigerant circuit tested</b><small>No leak found during the pressure test</small></span>
          <span><i>✓</i><b>Blower contamination documented</b><small>Caked with grease and dirt</small></span>
          <span><i>✓</i><b>Missing components noted</b><small>No air filter or refrigerant filter-drier present</small></span>
        </div>
      </section>

      <section className="section case-study-result">
        <div>
          <p className="kicker">What the visit established</p>
          <h2>No leak was found, but the rooftop unit had serious maintenance conditions.</h2>
          <p>The diagnostic moved the conversation beyond “low refrigerant.” After the evaporator thawed, pressure testing did not reveal a leak under the test conditions.</p>
          <p>The confirmed field findings were the frozen evaporator, heavy grease and dirt accumulation at the blower assembly, absence of an air filter and absence of a refrigerant filter-drier.</p>
          <p>No cleaning, component installation, refrigerant charge or restored-operation result was provided for this record, so none is claimed here.</p>
        </div>
        <aside className="case-study-result-card">
          <span>Suspected vs. verified</span>
          <strong>A diagnostic record built from test results and observed conditions</strong>
          <div className="case-study-before-after">
            <div><em>Suspected</em><b>Low refrigerant caused by a leak</b><small>Owner’s initial concern</small></div>
            <div><em>Tested</em><b>No leak found</b><small>After thawing and pressurizing the system</small></div>
            <div><em>Observed</em><b>Severe contamination and missing components</b><small>Blower assembly, air filter and refrigerant filter-drier findings</small></div>
          </div>
        </aside>
      </section>

      <section className="emergency landing-cta">
        <div><p className="kicker light">Rooftop unit frozen or not cooling?</p><h2>Start with a measured commercial HVAC diagnostic.</h2><p>Tell Eternity what the equipment is doing and what your team has already observed.</p></div>
        <div><a className="btn btn-orange" href="/#schedule">Request commercial service <span>↗</span></a><a className="btn-outline light-outline" href="/services/commercial-hvac">Commercial HVAC services <span>→</span></a><small>For urgent system-down service, call 216-253-6468.</small></div>
      </section>

      <SiteFooter />
    </main>
  );
}

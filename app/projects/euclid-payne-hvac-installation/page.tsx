import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";

const pageUrl = "https://eternityhvacr.com/projects/euclid-payne-hvac-installation";
const projectImage = "https://eternityhvacr.com/images/euclid/euclid-oh-residential-furnace-installation-1200.webp";

export const metadata: Metadata = {
  title: "Euclid Payne HVAC Replacement | Case Study",
  description: "See the matched 80,000 BTU Payne furnace, coil and 2.5-ton condenser Eternity installed for a Euclid, Ohio home being prepared for resale.",
  alternates: { canonical: "/projects/euclid-payne-hvac-installation" },
  openGraph: {
    title: "Matched Payne HVAC Replacement in Euclid",
    description: "A verified full-system replacement for a Euclid 44123 home being prepared for resale.",
    url: "/projects/euclid-payne-hvac-installation",
    type: "article",
    images: [{
      url: "/images/euclid/euclid-oh-residential-furnace-installation-1200.webp",
      width: 1200,
      height: 2132,
      alt: "Matched Payne furnace and evaporator coil installed by Eternity Mechanical in Euclid, Ohio",
    }],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${pageUrl}#case-study`,
      headline: "Matched Payne HVAC Replacement for a Euclid Home Sale",
      description: metadata.description,
      url: pageUrl,
      image: projectImage,
      datePublished: "2026-08-25",
      dateModified: "2026-08-25",
      author: { "@id": "https://eternityhvacr.com/#business" },
      publisher: { "@id": "https://eternityhvacr.com/#business" },
      about: ["Furnace replacement", "Air conditioner replacement", "Residential HVAC installation"],
      spatialCoverage: { "@type": "City", name: "Euclid", containedInPlace: { "@type": "State", name: "Ohio" } },
      mainEntityOfPage: pageUrl,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://eternityhvacr.com/" },
        { "@type": "ListItem", position: 2, name: "Projects", item: "https://eternityhvacr.com/projects" },
        { "@type": "ListItem", position: 3, name: "Euclid Payne HVAC Replacement", item: pageUrl },
      ],
    },
    {
      "@type": "ImageObject",
      contentUrl: projectImage,
      caption: "Matched Payne furnace and evaporator-coil installation in Euclid, Ohio 44123",
      representativeOfPage: true,
      creator: { "@id": "https://eternityhvacr.com/#business" },
    },
  ],
};

export default function EuclidPayneHvacCaseStudy() {
  return (
    <main>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="case-study-hero">
        <div className="case-study-hero-copy">
          <nav className="case-study-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/projects">Projects</Link><span aria-hidden="true">/</span><span>Case study</span>
          </nav>
          <p className="eyebrow"><i /> Residential resale project • Euclid 44123</p>
          <h1>Matched Payne HVAC Replacement for a Euclid Home Sale</h1>
          <p className="case-study-lede">A home flipper was preparing this property for resale. The existing heating and cooling system was outdated, so Eternity installed a complete matched Payne system as part of making the home ready for the market.</p>
          <div className="case-study-quick-facts" aria-label="Project summary">
            <div><span>Location</span><strong>Euclid, OH 44123</strong></div>
            <div><span>Customer</span><strong>Home flipper</strong></div>
            <div><span>Starting point</span><strong>Outdated HVAC system</strong></div>
            <div><span>Project</span><strong>Matched system replacement</strong></div>
          </div>
          <div className="hero-actions">
            <Link className="btn btn-orange" href="/#schedule">Request an installation estimate <span>↗</span></Link>
            <a className="btn-outline" href="tel:+12167033183">Call 216-703-3183 <span>→</span></a>
          </div>
        </div>
        <figure className="case-study-hero-image">
          <picture>
            <source media="(max-width: 700px)" srcSet="/images/euclid/euclid-oh-residential-furnace-installation-720.webp" type="image/webp" />
            <img src="/images/euclid/euclid-oh-residential-furnace-installation-1200.webp" alt="Matched Payne furnace and evaporator coil installed by Eternity Mechanical in Euclid, Ohio" width="1200" height="2132" fetchPriority="high" decoding="async" />
          </picture>
          <figcaption>Installed Payne furnace and matching evaporator coil • Euclid 44123</figcaption>
        </figure>
      </section>

      <section className="case-study-summary" aria-label="Installed equipment">
        <div><strong>80,000 BTU</strong><span>Payne furnace</span></div>
        <div><strong>80% AFUE</strong><span>Heating efficiency</span></div>
        <div><strong>2.5 ton</strong><span>Cooling capacity</span></div>
        <div><strong>Matched system</strong><span>Furnace, coil & condenser</span></div>
      </section>

      <section className="section case-study-story">
        <div className="case-study-heading">
          <p className="kicker">The starting point</p>
          <h2>An equipment replacement tied to the property’s resale plan.</h2>
        </div>
        <div className="case-study-story-grid">
          <article>
            <span>01</span>
            <h3>The property owner</h3>
            <p>The customer was a home flipper preparing the Euclid property to be sold.</p>
          </article>
          <article>
            <span>02</span>
            <h3>The existing system</h3>
            <p>The home’s heating and cooling equipment was outdated and did not fit the owner’s plan for a market-ready property.</p>
          </article>
          <article>
            <span>03</span>
            <h3>The approved solution</h3>
            <p>Eternity replaced the system with a matched Payne furnace, evaporator coil and outdoor condenser.</p>
          </article>
        </div>
      </section>

      <section className="case-study-solution">
        <div>
          <p className="kicker light">The installation</p>
          <h2>One matched Payne heating and cooling system.</h2>
          <p>The installed system includes an 80,000 BTU, 80% AFUE Payne furnace, matching evaporator coil and 2.5-ton Payne outdoor condenser.</p>
          <p>The documented cooling equipment uses R-454B refrigerant and includes the condenser pad, fused disconnect, electrical whip and connected refrigerant lines shown in the project photographs.</p>
        </div>
        <div className="case-study-install-list" aria-label="Installation scope">
          <span><i>✓</i><b>80% AFUE furnace</b><small>80,000 BTU heating capacity</small></span>
          <span><i>✓</i><b>2.5-ton condenser</b><small>Payne outdoor cooling equipment</small></span>
          <span><i>✓</i><b>Matching evaporator coil</b><small>Compatible indoor cooling equipment</small></span>
          <span><i>✓</i><b>Complete replacement</b><small>Matched heating and cooling components</small></span>
        </div>
      </section>

      <section className="section project-gallery" aria-labelledby="payne-project-gallery-heading">
        <div className="section-head">
          <div><p className="kicker">Installation record</p><h2 id="payne-project-gallery-heading">The completed system, inside and out.</h2></div>
          <p>These are photographs from the actual 44123 installation—not stock equipment images.</p>
        </div>
        <div className="project-gallery-grid">
          <figure>
            <picture><source media="(max-width: 700px)" srcSet="/images/euclid/euclid-oh-residential-furnace-installation-720.webp" type="image/webp" /><img src="/images/euclid/euclid-oh-residential-furnace-installation-1200.webp" alt="Payne furnace and matching evaporator coil installed in a Euclid home" width="1200" height="2132" loading="lazy" decoding="async" /></picture>
            <figcaption>Indoor Payne furnace and matching coil</figcaption>
          </figure>
          <figure>
            <picture><source media="(max-width: 700px)" srcSet="/images/euclid/euclid-oh-payne-hvac-installation-720.webp" type="image/webp" /><img src="/images/euclid/euclid-oh-payne-hvac-installation-1200.webp" alt="Payne 2.5-ton air-conditioning condenser installed at a Euclid home" width="1200" height="2132" loading="lazy" decoding="async" /></picture>
            <figcaption>Payne condenser, pad and electrical components</figcaption>
          </figure>
          <figure>
            <picture><source media="(max-width: 700px)" srcSet="/images/euclid/euclid-oh-residential-condenser-installation-720.webp" type="image/webp" /><img src="/images/euclid/euclid-oh-residential-condenser-installation-1200.webp" alt="Installed condenser and insulated refrigerant lines at a Euclid home" width="1200" height="2132" loading="lazy" decoding="async" /></picture>
            <figcaption>Cooling equipment and line-set connection</figcaption>
          </figure>
        </div>
      </section>

      <section className="section case-study-result">
        <div>
          <p className="kicker">What the project documents</p>
          <h2>The outdated system was replaced before the home went to market.</h2>
          <p>The property owner believed a new heating and cooling system would help the home sell faster. Eternity’s documented role was to replace the outdated equipment with the matched Payne system shown here.</p>
          <p>No listing date, sale date or buyer response was provided, so this case study does not claim that the HVAC replacement changed the final sale timeline.</p>
          <small>For property privacy, the project is identified publicly by city and ZIP code rather than its residential street address.</small>
        </div>
        <aside className="case-study-result-card">
          <span>Documented before & after</span>
          <strong>A resale goal supported by a complete HVAC replacement</strong>
          <div className="case-study-before-after">
            <div><em>Before</em><b>Outdated HVAC system</b><small>Home being prepared for resale</small></div>
            <div><em>Installed</em><b>Matched Payne system</b><small>80,000 BTU furnace, coil and 2.5-ton condenser</small></div>
            <div><em>Owner’s goal</em><b>Make the property market-ready</b><small>Sale speed was not independently measured</small></div>
          </div>
        </aside>
      </section>

      <section className="emergency landing-cta">
        <div><p className="kicker light">Preparing a property for sale?</p><h2>Plan the HVAC work before the listing.</h2><p>Share the property, current equipment and replacement goals through Eternity’s service-request form.</p></div>
        <div><Link className="btn btn-orange" href="/#schedule">Request an estimate <span>↗</span></Link><Link className="btn-outline light-outline" href="/projects">View more projects <span>→</span></Link><small>Website requests are typically reviewed within 15 minutes during regular business hours.</small></div>
      </section>

      <SiteFooter />
    </main>
  );
}

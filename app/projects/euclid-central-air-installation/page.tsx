import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../../components/SiteChrome";

const pageUrl = "https://eternityhvacr.com/projects/euclid-central-air-installation";
const projectImage = "https://eternityhvacr.com/images/euclid/euclid-oh-sinclair-furnace-installation-1200.webp";

export const metadata: Metadata = {
  title: "Euclid Central Air & Furnace Installation | Case Study",
  description: "See how Eternity replaced a furnace more than 40 years old and added a complete 3-ton central-air system for a Euclid, Ohio homeowner.",
  alternates: { canonical: "/projects/euclid-central-air-installation" },
  openGraph: {
    title: "Central Air & High-Efficiency Furnace Installation in Euclid",
    description: "An August 2026 residential installation with a 96% efficiency, 80,000 BTU furnace and 3-ton central-air system.",
    url: "/projects/euclid-central-air-installation",
    type: "article",
    images: [{
      url: "/images/euclid/euclid-oh-sinclair-furnace-installation-1200.webp",
      width: 1200,
      height: 2132,
      alt: "Eternity Mechanical technician beside a completed Sinclair furnace and evaporator coil installation in Euclid, Ohio",
    }],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${pageUrl}#case-study`,
      headline: "Central Air and High-Efficiency Furnace Installation in Euclid, Ohio",
      description: metadata.description,
      url: pageUrl,
      image: projectImage,
      datePublished: "2026-08-25",
      dateModified: "2026-08-25",
      author: { "@id": "https://eternityhvacr.com/#business" },
      publisher: { "@id": "https://eternityhvacr.com/#business" },
      about: ["Central air installation", "Furnace replacement", "Residential HVAC installation"],
      spatialCoverage: { "@type": "City", name: "Euclid", containedInPlace: { "@type": "State", name: "Ohio" } },
      mainEntityOfPage: pageUrl,
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://eternityhvacr.com/" },
        { "@type": "ListItem", position: 2, name: "Projects", item: "https://eternityhvacr.com/projects" },
        { "@type": "ListItem", position: 3, name: "Euclid Central Air Installation", item: pageUrl },
      ],
    },
    {
      "@type": "ImageObject",
      contentUrl: projectImage,
      caption: "Eternity Mechanical technician beside the completed furnace and evaporator-coil installation in Euclid, Ohio",
      representativeOfPage: true,
      creator: { "@id": "https://eternityhvacr.com/#business" },
    },
  ],
};

export default function EuclidCentralAirCaseStudy() {
  return (
    <main>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="case-study-hero">
        <div className="case-study-hero-copy">
          <nav className="case-study-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span aria-hidden="true">/</span><Link href="/projects">Projects</Link><span aria-hidden="true">/</span><span>Case study</span>
          </nav>
          <p className="eyebrow"><i /> Residential project • August 2026</p>
          <h1>Central Air & High-Efficiency Furnace Installation in Euclid</h1>
          <p className="case-study-lede">The homeowner wanted central air, and the existing furnace was more than 40 years old. Eternity replaced the aging heating equipment and installed a complete matched heating and cooling system.</p>
          <div className="case-study-quick-facts" aria-label="Project summary">
            <div><span>Location</span><strong>Euclid, OH 44119</strong></div>
            <div><span>Property</span><strong>Residential home</strong></div>
            <div><span>Completed</span><strong>August 2026</strong></div>
            <div><span>Project</span><strong>Full HVAC installation</strong></div>
          </div>
          <div className="hero-actions">
            <Link className="btn btn-orange" href="/#schedule">Request an installation estimate <span>↗</span></Link>
            <a className="btn-outline" href="tel:+12167033183">Call 216-703-3183 <span>→</span></a>
          </div>
        </div>
        <figure className="case-study-hero-image">
          <picture>
            <source media="(max-width: 700px)" srcSet="/images/euclid/euclid-oh-sinclair-furnace-installation-720.webp" type="image/webp" />
            <img src="/images/euclid/euclid-oh-sinclair-furnace-installation-1200.webp" alt="Eternity Mechanical technician beside a completed Sinclair furnace and evaporator coil installation in Euclid, Ohio" width="1200" height="2132" fetchPriority="high" decoding="async" />
          </picture>
          <figcaption>Completed indoor furnace and evaporator-coil installation • Euclid, Ohio</figcaption>
        </figure>
      </section>

      <section className="case-study-summary" aria-label="Installed equipment">
        <div><strong>80,000 BTU</strong><span>Furnace</span></div>
        <div><strong>96%</strong><span>Efficiency rating</span></div>
        <div><strong>3 ton</strong><span>Central air</span></div>
        <div><strong>Matched system</strong><span>Furnace, coil & condenser</span></div>
      </section>

      <section className="section case-study-story">
        <div className="case-study-heading">
          <p className="kicker">The starting point</p>
          <h2>A comfort upgrade built around two clear needs.</h2>
        </div>
        <div className="case-study-story-grid">
          <article>
            <span>01</span>
            <h3>The homeowner’s goal</h3>
            <p>The homeowner wanted central air conditioning added to the home for dependable whole-house cooling.</p>
          </article>
          <article>
            <span>02</span>
            <h3>The existing system</h3>
            <p>The furnace serving the home was more than 40 years old, making the project an opportunity to update both heating and cooling together.</p>
          </article>
          <article>
            <span>03</span>
            <h3>The approved solution</h3>
            <p>Eternity installed a complete matched system rather than adding cooling equipment around the decades-old furnace.</p>
          </article>
        </div>
      </section>

      <section className="case-study-solution">
        <div>
          <p className="kicker light">The installation</p>
          <h2>New heating and central air from one matched system.</h2>
          <p>The completed project includes an 80,000 BTU, 96% efficiency Sinclair furnace, a matching evaporator coil and a 3-ton outdoor air-conditioning condenser.</p>
          <p>Replacing the aging furnace as part of the central-air project created a complete heating and cooling installation built around compatible indoor and outdoor equipment.</p>
        </div>
        <div className="case-study-install-list" aria-label="Installation scope">
          <span><i>✓</i><b>96% efficiency furnace</b><small>80,000 BTU heating capacity</small></span>
          <span><i>✓</i><b>3-ton central-air system</b><small>Outdoor condenser installed</small></span>
          <span><i>✓</i><b>Matching evaporator coil</b><small>Indoor cooling equipment</small></span>
          <span><i>✓</i><b>Full-system installation</b><small>Heating and cooling completed together</small></span>
        </div>
      </section>

      <section className="section case-study-result">
        <div>
          <p className="kicker">What changed at the home</p>
          <h2>The homeowner’s request became a specific equipment upgrade.</h2>
          <p>Before this project, the homeowner was asking to add central air and the furnace in the home was more than 40 years old.</p>
          <p>In August 2026, Eternity replaced that furnace with an 80,000 BTU, 96% efficiency Sinclair unit and installed the matching evaporator coil and 3-ton outdoor condenser needed for central air.</p>
          <p>The project photograph documents the completed indoor furnace and coil with the Eternity technician beside the equipment. No energy-savings estimate, before-and-after temperature reading or customer testimonial was provided, so none is claimed here.</p>
          <small>For homeowner privacy, the project is identified publicly by city and ZIP code rather than its residential street address.</small>
        </div>
        <aside className="case-study-result-card">
          <span>Documented before & after</span>
          <strong>One project, two comfort needs</strong>
          <div className="case-study-before-after">
            <div><em>Before</em><b>Central air requested</b><small>Existing furnace was more than 40 years old</small></div>
            <div><em>Installed</em><b>96% furnace + 3-ton AC</b><small>80,000 BTU furnace, matching coil and condenser</small></div>
            <div><em>Finished</em><b>August 2026</b><small>Euclid, Ohio 44119</small></div>
          </div>
        </aside>
      </section>

      <section className="emergency landing-cta">
        <div><p className="kicker light">Planning a system replacement?</p><h2>Tell Eternity what comfort upgrade you need.</h2><p>Share the property, existing equipment and project goals through the service-request form.</p></div>
        <div><Link className="btn btn-orange" href="/#schedule">Request an estimate <span>↗</span></Link><Link className="btn-outline light-outline" href="/areas-we-serve/euclid-oh">Explore Euclid service <span>→</span></Link><small>Website requests are typically reviewed within 15 minutes during regular business hours.</small></div>
      </section>

      <SiteFooter />
    </main>
  );
}

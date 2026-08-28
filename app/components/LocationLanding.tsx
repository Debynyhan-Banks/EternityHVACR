import { SiteFooter, SiteHeader } from "./SiteChrome";

export type LocationService = {
  label: string;
  title: string;
  copy: string;
  href: string;
};

export type LocationFaq = [question: string, answer: string];

export type LocationLandingContent = {
  eyebrow: string;
  title: string;
  summary: string;
  heroImage: string;
  heroImageSmall: string;
  heroAlt: string;
  services: LocationService[];
  faqs: LocationFaq[];
};

function ProjectImage({
  src,
  smallSrc,
  alt,
  width,
  height,
  priority = false,
}: {
  src: string;
  smallSrc: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
}) {
  return (
    <picture>
      <source media="(max-width: 700px)" srcSet={smallSrc} type="image/webp" />
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
      />
    </picture>
  );
}

export default function LocationLanding({ content, schema }: { content: LocationLandingContent; schema: object }) {
  return (
    <main>
      <SiteHeader />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="location-hero">
        <div className="location-hero-copy">
          <p className="eyebrow"><i /> {content.eyebrow}</p>
          <h1>{content.title}</h1>
          <p>{content.summary}</p>
          <div className="hero-actions">
            <a className="btn" href="/#schedule">Request service <span>↗</span></a>
            <a className="btn-outline" href="tel:+12167033183">Call Eternity <span>→</span></a>
          </div>
          <div className="location-hero-proof">
            <span>Real project proof</span>
            <strong>Verified residential installations in Euclid 44119 and 44123</strong>
          </div>
        </div>
        <figure className="location-hero-media">
          <ProjectImage src={content.heroImage} smallSrc={content.heroImageSmall} alt={content.heroAlt} width={1200} height={2132} priority />
          <figcaption>Euclid, Ohio • Residential HVAC installation</figcaption>
        </figure>
      </section>

      <section className="location-capability" aria-label="Eternity Mechanical service capabilities">
        {[
          "Residential HVAC",
          "Commercial HVAC",
          "Refrigeration",
          "Diagnostics",
          "Installation & replacement",
          "Preventive maintenance",
        ].map((capability) => <span key={capability}>✓ {capability}</span>)}
      </section>

      <section className="section location-services">
        <div className="section-head">
          <div><p className="kicker">HVAC services in Euclid</p><h2>Service built around the system and the property.</h2></div>
          <p>From a home comfort-system replacement to rooftop HVAC diagnostics, Eternity evaluates the equipment before recommending approved work.</p>
        </div>
        <div className="location-service-grid">
          {content.services.map((service) => (
            <article key={service.title}>
              <span>{service.label}</span>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
              <a href={service.href}>Explore service <b aria-hidden="true">→</b></a>
            </article>
          ))}
        </div>
      </section>

      <section className="location-project">
        <div className="location-project-copy">
          <p className="kicker light">Verified local work</p>
          <h2>Recent HVAC installation in Euclid</h2>
          <p>Eternity Mechanical completed a full residential heating and cooling installation in ZIP code 44123, including the furnace, matching evaporator coil, outdoor condenser, equipment pad, fused disconnect, electrical whip and associated installation work.</p>
          <div className="project-specs" aria-label="Euclid installation equipment specifications">
            <div><strong>80,000 BTU</strong><span>Payne furnace</span></div>
            <div><strong>80% AFUE</strong><span>Heating efficiency</span></div>
            <div><strong>2.5 ton</strong><span>Cooling capacity</span></div>
            <div><strong>R-454B</strong><span>Refrigerant</span></div>
          </div>
          <p className="project-models">The matched cooling system includes a Payne PA4SAN53000N air conditioner and CVAVA3017XMA 17.5-inch vertical cased evaporator coil.</p>
          <a className="inline-cta" href="/projects/euclid-payne-hvac-installation">Read the 44123 case study <span>→</span></a>
        </div>
        <div className="project-feature-image">
          <ProjectImage
            src="/images/euclid/euclid-oh-residential-furnace-installation-1200.webp"
            smallSrc="/images/euclid/euclid-oh-residential-furnace-installation-720.webp"
            alt="Payne residential furnace and evaporator coil installed by Eternity Mechanical in Euclid, Ohio"
            width={1200}
            height={2132}
          />
        </div>
      </section>

      <section className="section project-gallery" aria-labelledby="euclid-project-gallery-heading">
        <div className="section-head">
          <div><p className="kicker">Project photography</p><h2 id="euclid-project-gallery-heading">A real Euclid installation, inside and out.</h2></div>
          <p>These photographs document the indoor heating equipment and outdoor cooling equipment installed for the 44123 project.</p>
        </div>
        <div className="project-gallery-grid">
          <figure>
            <ProjectImage src="/images/euclid/euclid-oh-residential-furnace-installation-1200.webp" smallSrc="/images/euclid/euclid-oh-residential-furnace-installation-720.webp" alt="Payne furnace and cased evaporator coil installed in a Euclid home" width={1200} height={2132} />
            <figcaption>Indoor furnace and evaporator-coil installation</figcaption>
          </figure>
          <figure>
            <ProjectImage src="/images/euclid/euclid-oh-payne-hvac-installation-1200.webp" smallSrc="/images/euclid/euclid-oh-payne-hvac-installation-720.webp" alt="Payne outdoor air-conditioning condenser installed at a Euclid home" width={1200} height={2132} />
            <figcaption>Outdoor condenser, pad and electrical components</figcaption>
          </figure>
          <figure>
            <ProjectImage src="/images/euclid/euclid-oh-residential-condenser-installation-1200.webp" smallSrc="/images/euclid/euclid-oh-residential-condenser-installation-720.webp" alt="Residential air-conditioning condenser and insulated refrigerant lines in Euclid" width={1200} height={2132} />
            <figcaption>Installed cooling equipment and line-set connection</figcaption>
          </figure>
        </div>
      </section>

      <section className="section secondary-residential-project">
        <figure>
          <ProjectImage
            src="/images/euclid/euclid-oh-sinclair-furnace-installation-1200.webp"
            smallSrc="/images/euclid/euclid-oh-sinclair-furnace-installation-720.webp"
            alt="Eternity Mechanical technician beside a completed Sinclair furnace and evaporator coil installation in Euclid, Ohio"
            width={1200}
            height={2132}
          />
          <figcaption>Full residential HVAC installation • Euclid 44119</figcaption>
        </figure>
        <div>
          <p className="kicker">Residential case study</p>
          <h2>Central air and furnace installation in Euclid 44119</h2>
          <p>The homeowner wanted central air, and the furnace serving the home was more than 40 years old. Eternity completed a full residential heating and cooling installation with an 80,000 BTU, 96% efficiency furnace, 3-ton air-conditioning system, outdoor condenser and matching evaporator coil in August 2026.</p>
          <p>The field photograph shows the Eternity technician beside the completed indoor Sinclair furnace and coil installation. The exact residential street address is intentionally not published.</p>
          <div className="secondary-project-specs" aria-label="Euclid 44119 installation specifications">
            <div><strong>80,000 BTU</strong><span>Furnace rating</span></div>
            <div><strong>96%</strong><span>Efficiency rating</span></div>
            <div><strong>3 ton</strong><span>Cooling capacity</span></div>
            <div><strong>Full install</strong><span>Furnace, coil & condenser</span></div>
          </div>
          <a className="inline-cta" href="/projects/euclid-central-air-installation">Read the full case study <span>→</span></a>
        </div>
      </section>

      <section className="commercial-proof">
        <figure>
          <ProjectImage
            src="/images/euclid/cleveland-commercial-rooftop-hvac-service-1200.webp"
            smallSrc="/images/euclid/cleveland-commercial-rooftop-hvac-service-720.webp"
            alt="Commercial rooftop packaged HVAC equipment inspected in the Cleveland and Euclid service area"
            width={1200}
            height={900}
          />
          <figcaption>Commercial rooftop HVAC diagnostic service • 44119 market</figcaption>
        </figure>
        <div>
          <p className="kicker light">Commercial field experience</p>
          <h2>Commercial HVAC diagnostics & service</h2>
          <p>During a rooftop packaged-unit service call in the 44119 Cleveland/Euclid-area market, Eternity encountered significant equipment contamination, dust accumulation on the blower motor, a missing filter and a frozen evaporator coil.</p>
          <p>Conditions like these require a careful inspection of the equipment and operating conditions. The photograph documents the equipment condition at the service visit.</p>
          <a className="inline-cta light-link" href="/projects/euclid-rooftop-hvac-diagnostic">Read the rooftop diagnostic case study <span>→</span></a>
        </div>
      </section>

      <section className="section location-diagnostics">
        <div>
          <p className="kicker">Measured system diagnostics</p>
          <h2>Recommendations based on observed conditions.</h2>
          <p>Eternity evaluates system operation, electrical performance, temperatures, airflow, refrigerant conditions and equipment condition before recommending repairs or replacement.</p>
          <div className="diagnostic-tags" aria-label="Diagnostic categories">
            {[
              "Refrigerant conditions",
              "Temperature performance",
              "Electrical measurements",
              "Airflow conditions",
              "Equipment condition",
              "System operation",
            ].map((item) => <span key={item}>{item}</span>)}
          </div>
        </div>
        <figure className="diagnostic-report location-report">
          <img src="/images/system-diagnostic-report.jpg" alt="Illustrative Eternity Mechanical system diagnostic report with readings, observations and recommendations" width="1600" height="1028" loading="lazy" decoding="async" />
          <figcaption>Example customer-facing diagnostic report</figcaption>
        </figure>
      </section>

      <section className="location-customer-paths">
        <div>
          <p className="kicker light">Residential</p>
          <h2>Comfort systems for Euclid homes</h2>
          <p>Heating and cooling diagnostics, repair, maintenance, full-system installation and replacement.</p>
          <a href="/#schedule">Request residential service →</a>
        </div>
        <div>
          <p className="kicker light">Commercial</p>
          <h2>HVAC/R support for local facilities</h2>
          <p>Rooftop HVAC, commercial heating and cooling, refrigeration diagnostics and preventive maintenance.</p>
          <a href="/services/commercial-hvac">Explore commercial service →</a>
        </div>
      </section>

      <section className="section location-coverage">
        <div>
          <p className="kicker">Local coverage</p>
          <h2>Serving Euclid and nearby Northeast Ohio communities.</h2>
          <p>Euclid service coverage includes ZIP codes 44117, 44119, 44123, 44132 and 44143. Availability may also extend throughout Greater Cleveland based on the property, equipment and current schedule.</p>
          <a className="inline-cta" href="/areas-we-serve">View all approved service areas <span>→</span></a>
        </div>
        <div className="nearby-areas" aria-label="Communities near Euclid">
          {['Cleveland', 'Richmond Heights', 'South Euclid', 'Cleveland Heights', 'Wickliffe', 'Willoughby', 'Mentor'].map((city) => <span key={city}>{city}</span>)}
        </div>
      </section>

      <section className="section landing-faq location-faq">
        <div><p className="kicker">Common questions</p><h2>HVAC service in Euclid</h2></div>
        <div>{content.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
      </section>

      <section className="emergency landing-cta">
        <div><p className="kicker light">Need HVAC service in Euclid?</p><h2>Tell Eternity what the equipment needs.</h2><p>Share the property, system and timing through the existing service-request workflow.</p></div>
        <div><a className="btn btn-orange" href="/#schedule">Request service <span>↗</span></a><a className="btn-outline light-outline" href="tel:+12167033183">Call 216-703-3183 <span>→</span></a><small>Website requests are typically reviewed within 15 minutes during regular business hours. For urgent service, call directly.</small></div>
      </section>

      <SiteFooter />
    </main>
  );
}

import ServiceRequest from "./components/ServiceRequest";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";

const services = [
  { icon: "AC", title: "Air Conditioning", copy: "Diagnostics, repair, replacement, installation and seasonal service.", tone: "blue", href: "#schedule" },
  { icon: "HT", title: "Heating", copy: "Furnaces, heat pumps, heating diagnostics, installation and repair.", tone: "orange", href: "#schedule" },
  { icon: "RTU", title: "Commercial HVAC", copy: "Rooftop units, packaged equipment, replacements, service and preventive maintenance.", tone: "navy", href: "/services/commercial-hvac" },
  { icon: "RF", title: "Commercial Refrigeration", copy: "Walk-ins, refrigeration equipment, controls, diagnostics, repair and maintenance.", tone: "cyan", href: "/services/commercial-refrigeration" },
  { icon: "IN", title: "Installation & Replacement", copy: "Professional equipment replacement and new HVAC installations.", tone: "gray", href: "#schedule" },
  { icon: "PM", title: "Preventive Maintenance", copy: "Planned inspections designed to reduce failures and extend equipment life.", tone: "pale", href: "/services/preventive-maintenance" },
];

const process = [
  ["01", "Schedule", "Tell us what equipment or service requires attention."],
  ["02", "Diagnose", "We inspect and test the system to identify the underlying problem."],
  ["03", "Review", "Findings, recommendations and applicable pricing are explained before approved work begins."],
  ["04", "Complete", "Approved work is completed professionally and system operation is verified."],
];

const maintenance = [
  ["01", "System inspection"], ["02", "Electrical testing"], ["03", "Heating & cooling performance"],
  ["04", "Coil & equipment condition"], ["05", "Filter & airflow inspection"], ["06", "Documented recommendations"],
];

export default function Home() {
  return <main>
    <SiteHeader />

    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow"><i /> HVAC <span>•</span> Refrigeration <span>•</span> Mechanical</p>
        <h1>Built for Comfort.<br /><em>Engineered for Reliability.</em></h1>
        <p className="hero-lede">Professional heating, cooling, refrigeration, installation, repair and preventive maintenance for homes and businesses throughout Northeast Ohio.</p>
        <div className="hero-actions"><a className="btn" href="#schedule">Schedule service <span>↗</span></a><a className="btn-outline" href="#schedule">Request an estimate <span>→</span></a></div>
        <a className="emergency-link" href="tel:+12162536468"><span>HELP</span><p><small>Emergency service available</small><b>Call 216-253-6468</b></p><i>→</i></a>
        <div className="hero-trust"><span>✓ Licensed & insured • #28303</span><span>✓ Residential & commercial</span><span>✓ Professional diagnostics</span><span>✓ Preventive maintenance</span></div>
      </div>
      <div className="hero-media">
        <picture>
          <source media="(max-width: 700px)" srcSet="/images/hero-eternity-technician-mobile.webp" type="image/webp" />
          <source media="(max-width: 700px)" srcSet="/images/hero-eternity-technician-mobile.jpg" />
          <img
            src="/images/hero-eternity-technician.jpg"
            alt="Eternity Mechanical Services technician servicing an indoor HVAC air handler"
            width="1440"
            height="1440"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="media-label"><span><i /> Technical service</span><b>Measured before recommended.</b></div>
        <div className="metric-card"><p>System evaluation</p><div><span>Electrical</span><i>Verified</i></div><div><span>Temperature</span><i>Measured</i></div><div><span>Operation</span><i>Documented</i></div></div>
        <i className="hero-line line-one" /><i className="hero-line line-two" />
      </div>
    </section>

    <section className="credential-strip" aria-label="Eternity Mechanical capabilities"><div><span>✓</span><b>Licensed & insured • #28303</b></div><div><span>⌂</span><b>Residential</b></div><div><span>▦</span><b>Commercial</b></div><div><span>◇</span><b>Refrigeration</b></div><div><span>↻</span><b>Preventive maintenance</b></div><div><span>＋</span><b>Professional installation</b></div></section>

    <section className="section services" id="services">
      <div className="section-head"><div><p className="kicker">Capabilities</p><h2>Complete Mechanical Services</h2></div><p>From residential comfort systems to commercial HVAC and refrigeration, Eternity Mechanical Services provides professional installation, diagnostics, repair and maintenance.</p></div>
      <div className="service-grid">{services.map((service) => <a href={service.href} className={`service-card ${service.tone}`} key={service.title}><span>{service.icon}</span><i>↗</i><h3>{service.title}</h3><p>{service.copy}</p><b>Explore service</b></a>)}</div>
    </section>

    <div className="infinity-divider" aria-hidden="true"><span /><div><img src="/images/eternity-logo.svg" alt="" /></div><span /></div>

    <section className="section pathways" id="pathways">
      <article><div className="path-image apartment-image"><img src="/images/apartment-complex.webp" alt="Modern multifamily apartment complex" width="800" height="540" loading="lazy" decoding="async" /><span>Residential & multifamily</span></div><div className="path-content"><p className="kicker">For homeowners & property managers</p><h2>Homes & Apartment Communities</h2><p>Professional comfort solutions for single-family homes, apartment communities and multifamily properties.</p><ul><li>Air conditioning</li><li>Furnaces</li><li>Heat pumps</li><li>Apartment HVAC service</li><li>Thermostats & controls</li><li>Preventive maintenance</li></ul><a className="inline-cta" href="#schedule">Residential services <span>→</span></a></div></article>
      <article><div className="path-image commercial-image"><img src="/images/walk-in-cold-storage.jpg" alt="Commercial walk-in cold storage room with refrigeration equipment" width="1800" height="1200" loading="lazy" decoding="async" /><span>Commercial refrigeration</span></div><div className="path-content"><p className="kicker">For businesses & operators</p><h2>Commercial HVAC/R</h2><p>Responsive HVAC and refrigeration service for facilities, walk-in coolers, operations and inventory.</p><ul><li>Rooftop units</li><li>Commercial HVAC</li><li>Walk-in coolers</li><li>Restaurants & retail</li><li>Cold storage</li><li>Property management</li></ul><a className="inline-cta" href="#commercial">Commercial services <span>→</span></a></div></article>
    </section>

    <section className="diagnostic branded-section" id="diagnostics">
      <div className="diagnostic-copy"><p className="kicker light">A better service process</p><h2>Diagnose First.<br />Recommend Second.</h2><p>Professional HVAC service should begin with evidence. Eternity Mechanical Services evaluates system operation, electrical performance, temperatures, airflow, refrigerant conditions and equipment condition before recommending repairs.</p><blockquote>Measured. Diagnosed. Documented.</blockquote><a className="btn btn-orange" href="#schedule">Schedule diagnostics <span>→</span></a></div>
      <figure className="diagnostic-display diagnostic-report">
        <img
          src="/images/system-diagnostic-report.jpg"
          alt="Illustrative Eternity Mechanical system diagnostic report showing equipment readings, observations, and recommendations"
          width="1536"
          height="1024"
          loading="lazy"
          decoding="async"
        />
        <figcaption>Example customer-facing diagnostic report</figcaption>
      </figure>
    </section>

    <section className="section process"><div className="center-head"><p className="kicker">Our process</p><h2>Professional Service From Start to Finish</h2><p>Clear steps, useful communication and accountable work.</p></div><div className="process-grid">{process.map(([number,title,copy]) => <article key={number}><span>{number}</span><i /><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="commercial" id="commercial">
      <div className="commercial-copy"><p className="kicker light">Commercial capability</p><h2>Mechanical Service Built for Business</h2><p>HVAC and refrigeration problems affect customers, employees, tenants, inventory and operations. Eternity Mechanical Services provides responsive mechanical service and preventive maintenance for commercial properties.</p><div className="commercial-actions"><a className="btn btn-orange" href="#schedule">Request commercial service <span>↗</span></a><a href="#maintenance">Discuss a maintenance plan <span>→</span></a></div></div>
      <div className="commercial-lists"><article><h3>Facilities served</h3><ul><li>Restaurants & food service</li><li>Retail</li><li>Multifamily housing</li><li>Property management</li><li>Churches & community facilities</li><li>Offices & light commercial</li></ul></article><article><h3>Mechanical services</h3><ul><li>RTU service & replacement</li><li>Commercial split systems</li><li>Walk-in refrigeration</li><li>Preventive maintenance</li><li>System diagnostics & controls</li><li>Emergency repairs</li></ul></article></div>
      <div className="commercial-photo"><img src="/images/walk-in-cold-storage.jpg" alt="Walk-in cold storage facility with commercial refrigeration equipment" width="1800" height="1200" loading="lazy" decoding="async" /><span>Walk-ins • Cold storage • Controls</span></div>
    </section>

    <section className="section maintenance" id="maintenance">
      <div className="maintenance-image"><img src="/images/black-technician-equipment.jpg" alt="Black technician performing precision equipment maintenance" width="1800" height="1200" loading="lazy" decoding="async" /><div><b>Preventive maintenance</b><span>Inspection • Measurement • Documentation</span></div></div>
      <div className="maintenance-copy"><p className="kicker">Planned performance</p><h2>Maintain Equipment Before It Becomes an Emergency.</h2><p>Planned maintenance helps identify developing problems, protect equipment life and create better decisions around repair and replacement.</p><div className="maintenance-grid">{maintenance.map(([number,title]) => <span key={number}><i>{number}</i>{title}</span>)}</div><div className="maintenance-actions"><a className="btn" href="#schedule">Request maintenance pricing <span>→</span></a><span>Residential and commercial pathways available.</span></div></div>
    </section>

    <section className="section projects" id="projects">
      <div className="section-head"><div><p className="kicker">Service environments</p><h2>Built for the Systems You Depend On</h2></div><p>Eternity supports the residential, multifamily and commercial equipment environments that keep people comfortable and operations moving.</p></div>
      <div className="project-grid"><article><img src="/images/apartment-complex.webp" alt="Modern apartment community representing multifamily HVAC service" width="800" height="540" loading="lazy" decoding="async" /><div><span>Core capability</span><h3>Apartment Communities</h3><p>HVAC diagnostics, repair, replacement and maintenance for multifamily properties and managed communities.</p></div></article><article><img src="/images/walk-in-cold-storage.jpg" alt="Walk-in cold storage room representing commercial refrigeration service" width="1800" height="1200" loading="lazy" decoding="async" /><div><span>Core capability</span><h3>Walk-In Coolers & Cold Storage</h3><p>Responsive refrigeration diagnostics and service for businesses that depend on controlled temperatures.</p></div></article><article><img src="/images/hero-technician-black.jpg" alt="Black skilled trades professional working on an electrical control" width="1800" height="1202" loading="lazy" decoding="async" /><div><span>Core capability</span><h3>Measured System Diagnostics</h3><p>Electrical, temperature and operational findings documented before recommendations are made.</p></div></article></div>
      <a className="inline-cta centered-link" href="#schedule">Request service <span>→</span></a>
    </section>

    <section className="proof-service branded-section" id="about"><div><p className="kicker light">Accountable service</p><h2>Professional work is more than the repair.</h2><p>It is how the equipment is evaluated, how findings are communicated, how the work is completed and how the result is verified.</p></div><div className="proof-points"><span><i>01</i><b>Technical competence</b><small>System-level evaluation and disciplined workmanship.</small></span><span><i>02</i><b>Professional communication</b><small>Clear findings, options and expectations.</small></span><span><i>03</i><b>Long-term relationships</b><small>Service built around equipment life and customer trust.</small></span></div></section>

    <section className="section reviews" id="reviews"><div className="review-placeholder"><span>✓ VERIFIED PROFILE</span><p className="kicker">Local business information</p><h2>Find Eternity on Google.</h2><p>View the company’s current Google Business Profile for public information, directions and customer feedback.</p><a className="btn-outline" href="https://share.google/1bUl6S4x9x90TJ7Mf" target="_blank" rel="noreferrer">View Google profile <span>↗</span></a></div><div className="service-area"><p className="kicker">Regional coverage</p><h2>Greater Cleveland & Northeast Ohio</h2><p>Eternity is a service-area business serving approved priority and extended communities across Greater Cleveland and Northeast Ohio.</p><div className="map-visual"><i className="lake">Lake Erie</i><span className="road r1" /><span className="road r2" /><span className="road r3" /><b>NE<br />OHIO</b><i className="pin p1" /><i className="pin p2" /><i className="pin p3" /></div><a className="inline-cta" href="/areas-we-serve">View areas we serve <span>→</span></a></div></section>

    <section className="section schedule" id="schedule"><div className="schedule-copy"><p className="kicker light">Ready to get started?</p><h2>Tell us what the equipment needs.</h2><p>Use the guided request to describe the system, property and timing. Website requests are typically reviewed within 15 minutes during regular business hours.</p><div className="schedule-points"><span>✓ Residential & commercial</span><span>✓ HVAC & refrigeration</span><span>✓ Repair, replacement & maintenance</span></div></div><ServiceRequest /></section>

    <section className="emergency" id="contact"><div><p className="kicker light">Emergency service available</p><h2>HVAC or Refrigeration Problem?</h2><p>Call for urgent help or tell us what’s happening through the guided service request.</p></div><div><a className="btn btn-orange" href="tel:+12162536468">Call 216-253-6468 <span>↗</span></a><a className="btn-outline light-outline" href="#schedule">Request service <span>→</span></a><small>Regular hours: Monday–Friday 7 a.m.–7 p.m.; Saturday 9 a.m.–5 p.m.; Sunday closed. Emergency service is available outside normal hours.</small></div></section>

    <SiteFooter />
  </main>;
}

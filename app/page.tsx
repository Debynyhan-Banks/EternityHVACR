import ServiceRequest from "./components/ServiceRequest";
import ServiceAreaChecker from "./components/ServiceAreaChecker";
import { SiteFooter, SiteHeader } from "./components/SiteChrome";

const services = [
  { icon: "AC", title: "Air Conditioning", copy: "Diagnostics, repair, replacement, installation and seasonal service.", tone: "blue", href: "/services/air-conditioning-repair" },
  { icon: "HT", title: "Heating", copy: "Furnace diagnostics, repair, replacement, boiler service and heat-pump support.", tone: "orange", href: "/services/furnace-heating-repair" },
  { icon: "RTU", title: "Commercial HVAC", copy: "Rooftop units, packaged equipment, replacements, service and preventive maintenance.", tone: "navy", href: "/services/commercial-hvac" },
  { icon: "RF", title: "Commercial Refrigeration", copy: "Walk-ins, refrigeration equipment, controls, diagnostics, repair and maintenance.", tone: "cyan", href: "/services/commercial-refrigeration" },
  { icon: "IN", title: "Installation & Replacement", copy: "Professional equipment replacement and new HVAC installations.", tone: "gray", href: "/services/air-conditioning-installation" },
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
        <p className="eyebrow"><i /> Greater Cleveland mechanical service</p>
        <h1>Cleveland HVAC,<br /><em>refrigeration</em><br />&amp; boiler service.</h1>
        <p className="hero-brand-line">Comfort. Performance. Peace of mind.</p>
        <p className="hero-lede">Residential and commercial repair, installation and preventive maintenance throughout Greater Cleveland and Northeast Ohio.</p>
        <div className="hero-actions">
          <a className="btn btn-orange" href="#schedule">Request service <span>↗</span></a>
          <button type="button" className="hero-assistant-cta" data-open-assistant aria-haspopup="dialog">
            <span aria-hidden="true">✦</span><span><b>Ask Eternity</b><small>AI help now</small></span>
          </button>
        </div>
        <div className="hero-assurance"><span>28 years of owner experience</span><span>Licensed &amp; insured • #28303</span><span>Emergency service available</span></div>
      </div>
      <div className="hero-media">
        <picture>
          <source media="(max-width: 700px)" srcSet="/images/eternity-van-hero-mobile-b.webp" type="image/webp" />
          <source media="(max-width: 700px)" srcSet="/images/eternity-van-hero-mobile-b.jpg" />
          <img
            src="/images/eternity-van-hero.jpg"
            alt="Bernard Gray standing beside an Eternity Mechanical Services work van"
            width="1672"
            height="941"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        <div className="hero-photo-mark"><img src="/images/eternity-logo-reverse.svg" alt="" width="210" height="94" /><span>Serving Greater Cleveland</span></div>
      </div>
      <nav className="hero-service-rail" aria-label="Featured services">
        <a href="/services/air-conditioning-repair"><b>AC</b><span>HVAC</span></a>
        <a href="/services/commercial-hvac"><b>RTU</b><span>Commercial</span></a>
        <a href="/areas-we-serve"><b>MF</b><span>Multifamily</span></a>
        <a href="/services/commercial-refrigeration"><b>RF</b><span>Refrigeration</span></a>
      </nav>
    </section>

    <section className="credential-strip" aria-label="Eternity Mechanical capabilities"><div><span>✓</span><b>Licensed & insured • #28303</b></div><div><span>⌂</span><b>Residential</b></div><div><span>▦</span><b>Commercial</b></div><div><span>◇</span><b>Refrigeration</b></div><div><span>↻</span><b>Preventive maintenance</b></div><div><span>＋</span><b>Professional installation</b></div></section>

    <section className="section services" id="services">
      <div className="section-head"><div><p className="kicker">Capabilities</p><h2>Complete Mechanical Services</h2></div><p>From residential comfort systems to commercial HVAC and refrigeration, Eternity Mechanical Services provides professional installation, diagnostics, repair and maintenance.</p></div>
      <div className="service-grid">{services.map((service) => <a href={service.href} className={`service-card ${service.tone}`} key={service.title}><span>{service.icon}</span><i>↗</i><h3>{service.title}</h3><p>{service.copy}</p><b>Explore service</b></a>)}</div>
    </section>

    <div className="infinity-divider" aria-hidden="true"><span /><div><img src="/images/eternity-mark.svg" alt="" /></div><span /></div>

    <section className="section pathways" id="pathways">
      <article><div className="path-image apartment-image"><img src="/images/apartment-complex.webp" alt="Modern multifamily apartment complex" width="800" height="540" loading="lazy" decoding="async" /><span>Residential & multifamily</span></div><div className="path-content"><p className="kicker">For homeowners & property managers</p><h2>Homes & Apartment Communities</h2><p>Professional comfort solutions for single-family homes, apartment communities and multifamily properties.</p><ul><li>Air conditioning</li><li>Furnaces</li><li>Boilers</li><li>Heat pumps</li><li>Thermostats & controls</li><li>Preventive maintenance</li></ul><a className="inline-cta" href="/services/furnace-heating-repair">Explore heating services <span>→</span></a></div></article>
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
      <a className="inline-cta centered-link" href="/projects">View verified project case studies <span>→</span></a>
    </section>

    <section className="proof-service branded-section" id="about"><div><p className="kicker light">Owner & team</p><h2>Field experience meets business and digital leadership.</h2><p>Eternity combines hands-on mechanical experience with the operational systems, communication and marketing that support dependable customer service.</p></div><div className="team-cards"><article><span>Owner</span><h3>Bernard Gray</h3><p>Bernard brings 28 years of industry experience to Eternity. His background includes HVAC systems, boilers and refrigeration, providing broad experience across the equipment customers depend on.</p></article><article><span>Technician</span><h3>Debynyhan Banks</h3><p>Debynyhan brings more than five years of industry experience and holds a degree in computer science and an MBA. In addition to technical work, Debynyhan leads the website and marketing and handles much of Eternity’s administrative work, bringing a love of new challenges to both field and business operations.</p></article></div></section>

    <section className="section reviews" id="reviews"><article className="customer-review"><div className="review-stars" aria-label="5 out of 5 stars">★★★★★</div><p className="kicker">Verified customer review</p><h2>Professional, knowledgeable and honest.</h2><blockquote><p>I had an excellent experience with Eternity Mechanical Services. They arrived on time, carefully inspected my HVAC system, and clearly explained the problem before beginning any work. The technician was professional, knowledgeable, and honest about the available repair options and pricing.</p><p>The work was completed correctly, the area was left clean, and my system is now operating much better. I especially appreciated the attention to detail and the fact that I never felt pressured into purchasing unnecessary services. I highly recommend Eternity Mechanical Services to anyone looking for dependable, professional HVAC or refrigeration service.</p></blockquote><div className="review-author"><strong>Charlotte Mancini</strong><span>Google review</span></div><div className="review-actions"><a className="btn-outline" href="https://share.google/1bUl6S4x9x90TJ7Mf" target="_blank" rel="noreferrer">View Google profile <span>↗</span></a><a className="inline-cta" data-review-link href="https://g.page/r/CYsWl6Bz9AJvEBM/review" target="_blank" rel="noreferrer">Write a review <span>→</span></a></div></article><div className="service-area"><p className="kicker">Regional coverage</p><h2>Greater Cleveland & Northeast Ohio</h2><p>Eternity is a service-area business serving approved priority and extended communities across Greater Cleveland and Northeast Ohio.</p><div className="map-visual"><iframe title="Google road map of Greater Cleveland and Northeast Ohio" src="https://www.google.com/maps?q=Greater+Cleveland,+Ohio&z=9&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div><ServiceAreaChecker compact /><a className="inline-cta service-area-link" href="/areas-we-serve">View all areas we serve <span>→</span></a></div></section>

    <section className="section schedule" id="schedule"><div className="schedule-copy"><p className="kicker light">Ready to get started?</p><h2>Tell us what the equipment needs.</h2><p>Use the guided request to describe the system, property and timing. Website requests are typically reviewed within 15 minutes during regular business hours.</p><div className="schedule-points"><span>✓ Residential & commercial</span><span>✓ HVAC & refrigeration</span><span>✓ Repair, replacement & maintenance</span></div></div><ServiceRequest /></section>

    <section className="emergency" id="contact"><div><p className="kicker light">Emergency service available</p><h2>HVAC or Refrigeration Problem?</h2><p>Call for urgent help, text the monitored service number or tell us what’s happening through the guided service request.</p></div><div><a className="btn btn-orange" href="tel:+12167033183">Call 216-703-3183 <span>↗</span></a><a data-sms-link className="btn-outline light-outline" href="sms:+12167033183">Text Eternity <span>→</span></a><a className="contact-service-link" href="#schedule">Request service online →</a><small>Texts are monitored 24/7 with a 15-minute reply target. This is not an arrival-time promise. By texting, you agree to receive service-related replies at the number you use. Message and data rates may apply. Reply STOP to opt out. No marketing texts without separate consent.</small></div></section>

    <SiteFooter />
  </main>;
}

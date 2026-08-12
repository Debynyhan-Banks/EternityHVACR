import ServiceRequest from "./components/ServiceRequest";

const services = [
  { icon: "AC", title: "Air Conditioning", copy: "Diagnostics, repair, replacement, installation and seasonal service.", tone: "blue" },
  { icon: "HT", title: "Heating", copy: "Furnaces, heat pumps, heating diagnostics, installation and repair.", tone: "orange" },
  { icon: "RTU", title: "Commercial HVAC", copy: "Rooftop units, packaged equipment, replacements, service and preventive maintenance.", tone: "navy" },
  { icon: "RF", title: "Commercial Refrigeration", copy: "Walk-ins, refrigeration equipment, controls, diagnostics, repair and maintenance.", tone: "cyan" },
  { icon: "IN", title: "Installation & Replacement", copy: "Professional equipment replacement and new HVAC installations.", tone: "gray" },
  { icon: "PM", title: "Preventive Maintenance", copy: "Planned inspections designed to reduce failures and extend equipment life.", tone: "pale" },
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
    <div className="topbar"><span>Serving Greater Cleveland & Northeast Ohio</span><a href="#contact">Emergency service request <b>→</b></a></div>
    <header className="header">
      <a className="logo-crop" href="#top" aria-label="Eternity Mechanical Services home"><img src="/images/eternity-logo.svg" alt="Eternity Mechanical Services" /></a>
      <nav aria-label="Primary navigation"><a href="#services">Services</a><a href="#pathways">Residential</a><a href="#commercial">Commercial</a><a href="#services">Refrigeration</a><a href="#maintenance">Maintenance</a><a href="#projects">Projects</a><a href="#about">About</a><a href="#contact">Contact</a></nav>
      <div className="header-actions"><a className="call-link" href="#contact">Call now</a><a className="btn btn-small" href="#schedule">Schedule service</a></div>
      <details className="mobile-menu"><summary aria-label="Open navigation"><span /><span /><span /></summary><div><a href="#services">Services</a><a href="#pathways">Residential</a><a href="#commercial">Commercial</a><a href="#maintenance">Maintenance</a><a href="#projects">Projects</a><a href="#contact">Contact</a></div></details>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow"><i /> HVAC <span>•</span> Refrigeration <span>•</span> Mechanical</p>
        <h1>Built for Comfort.<br /><em>Engineered for Reliability.</em></h1>
        <p className="hero-lede">Professional heating, cooling, refrigeration, installation, repair and preventive maintenance for homes and businesses throughout Northeast Ohio.</p>
        <div className="hero-actions"><a className="btn" href="#schedule">Schedule service <span>↗</span></a><a className="btn-outline" href="#schedule">Request an estimate <span>→</span></a></div>
        <a className="emergency-link" href="#contact"><span>24/7</span><p><small>Emergency service</small><b>Contact Eternity Mechanical</b></p><i>→</i></a>
        <div className="hero-trust"><span>✓ Licensed contractor</span><span>✓ Residential & commercial</span><span>✓ Professional diagnostics</span><span>✓ Preventive maintenance</span></div>
      </div>
      <div className="hero-media">
        <img src="/images/hero-technician.jpg" alt="Professional HVAC technician measuring commercial refrigeration equipment" />
        <div className="media-label"><span><i /> Technical service</span><b>Measured before recommended.</b></div>
        <div className="metric-card"><p>System evaluation</p><div><span>Electrical</span><i>Verified</i></div><div><span>Temperature</span><i>Measured</i></div><div><span>Operation</span><i>Documented</i></div></div>
        <i className="hero-line line-one" /><i className="hero-line line-two" />
      </div>
    </section>

    <section className="credential-strip" aria-label="Eternity Mechanical capabilities"><div><span>✓</span><b>Licensed & insured</b></div><div><span>⌂</span><b>Residential</b></div><div><span>▦</span><b>Commercial</b></div><div><span>◇</span><b>Refrigeration</b></div><div><span>↻</span><b>Preventive maintenance</b></div><div><span>＋</span><b>Professional installation</b></div></section>

    <section className="section services" id="services">
      <div className="section-head"><div><p className="kicker">Capabilities</p><h2>Complete Mechanical Services</h2></div><p>From residential comfort systems to commercial HVAC and refrigeration, Eternity Mechanical Services provides professional installation, diagnostics, repair and maintenance.</p></div>
      <div className="service-grid">{services.map((service) => <a href="#schedule" className={`service-card ${service.tone}`} key={service.title}><span>{service.icon}</span><i>↗</i><h3>{service.title}</h3><p>{service.copy}</p><b>Explore service</b></a>)}</div>
    </section>

    <div className="infinity-divider" aria-hidden="true"><span /><div><img src="/images/eternity-logo.svg" alt="" /></div><span /></div>

    <section className="section pathways" id="pathways">
      <article><div className="path-image"><img src="/images/residential-hvac.jpg" alt="Technician inspecting a residential outdoor air conditioning system" /><span>Residential</span></div><div className="path-content"><p className="kicker">For homeowners</p><h2>Residential HVAC</h2><p>Professional comfort solutions built around the system, the home and long-term performance.</p><ul><li>Air conditioning</li><li>Furnaces</li><li>Heat pumps</li><li>System replacement</li><li>Thermostats & controls</li><li>Preventive maintenance</li></ul><a className="inline-cta" href="#schedule">Residential services <span>→</span></a></div></article>
      <article><div className="path-image commercial-image"><img src="/images/commercial-rooftop.jpg" alt="Technicians servicing commercial rooftop HVAC equipment" /><span>Commercial</span></div><div className="path-content"><p className="kicker">For businesses & operators</p><h2>Commercial Mechanical</h2><p>Responsive HVAC/R service for buildings, operations, tenants, customers and inventory.</p><ul><li>Rooftop units</li><li>Commercial HVAC</li><li>Refrigeration</li><li>Restaurants & retail</li><li>Multifamily properties</li><li>Property management</li></ul><a className="inline-cta" href="#commercial">Commercial services <span>→</span></a></div></article>
    </section>

    <section className="diagnostic branded-section" id="diagnostics">
      <div className="diagnostic-copy"><p className="kicker light">A better service process</p><h2>Diagnose First.<br />Recommend Second.</h2><p>Professional HVAC service should begin with evidence. Eternity Mechanical Services evaluates system operation, electrical performance, temperatures, airflow, refrigerant conditions and equipment condition before recommending repairs.</p><blockquote>Measured. Diagnosed. Documented.</blockquote><a className="btn btn-orange" href="#schedule">Schedule diagnostics <span>→</span></a></div>
      <div className="diagnostic-display">
        <p className="example-label">Example diagnostic visualization</p>
        <div className="dash-top"><div><small>System status</small><b>Technical evaluation</b></div><span><i /> In progress</span></div>
        <div className="dash-temp"><div><small>Supply temperature</small><strong>—°</strong></div><div><small>Return temperature</small><strong>—°</strong></div><div><small>Temperature split</small><strong>—°</strong></div></div>
        <div className="dash-grid"><span><small>System pressure</small><b>Measure</b></span><span><small>Superheat</small><b>Measure</b></span><span><small>Subcooling</small><b>Measure</b></span><span><small>Voltage</small><b>Verify</b></span><span><small>Amp draw</small><b>Verify</b></span><span><small>Airflow</small><b>Inspect</b></span></div>
        <div className="dash-bottom"><span>Equipment condition</span><b>Document findings</b></div>
      </div>
    </section>

    <section className="section process"><div className="center-head"><p className="kicker">Our process</p><h2>Professional Service From Start to Finish</h2><p>Clear steps, useful communication and accountable work.</p></div><div className="process-grid">{process.map(([number,title,copy]) => <article key={number}><span>{number}</span><i /><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

    <section className="commercial" id="commercial">
      <div className="commercial-copy"><p className="kicker light">Commercial capability</p><h2>Mechanical Service Built for Business</h2><p>HVAC and refrigeration problems affect customers, employees, tenants, inventory and operations. Eternity Mechanical Services provides responsive mechanical service and preventive maintenance for commercial properties.</p><div className="commercial-actions"><a className="btn btn-orange" href="#schedule">Request commercial service <span>↗</span></a><a href="#maintenance">Discuss a maintenance plan <span>→</span></a></div></div>
      <div className="commercial-lists"><article><h3>Facilities served</h3><ul><li>Restaurants & food service</li><li>Retail</li><li>Multifamily housing</li><li>Property management</li><li>Churches & community facilities</li><li>Offices & light commercial</li></ul></article><article><h3>Mechanical services</h3><ul><li>RTU service & replacement</li><li>Commercial split systems</li><li>Walk-in refrigeration</li><li>Preventive maintenance</li><li>System diagnostics & controls</li><li>Emergency repairs</li></ul></article></div>
      <div className="commercial-photo"><img src="/images/hero-technician.jpg" alt="Commercial refrigeration technician using diagnostic equipment" /><span>HVAC • Refrigeration • Controls</span></div>
    </section>

    <section className="section maintenance" id="maintenance">
      <div className="maintenance-image"><img src="/images/maintenance.jpg" alt="Mechanical technician inspecting and servicing equipment components" /><div><b>Preventive maintenance</b><span>Inspection • Measurement • Documentation</span></div></div>
      <div className="maintenance-copy"><p className="kicker">Planned performance</p><h2>Maintain Equipment Before It Becomes an Emergency.</h2><p>Planned maintenance helps identify developing problems, protect equipment life and create better decisions around repair and replacement.</p><div className="maintenance-grid">{maintenance.map(([number,title]) => <span key={number}><i>{number}</i>{title}</span>)}</div><div className="maintenance-actions"><a className="btn" href="#schedule">Request maintenance pricing <span>→</span></a><span>Residential and commercial pathways available.</span></div></div>
    </section>

    <section className="section projects" id="projects">
      <div className="section-head"><div><p className="kicker">Proof of work</p><h2>Our Work</h2></div><p>This gallery is structured for real project documentation. Final project details should be added only after the business supplies approved photos and verified information.</p></div>
      <div className="project-grid"><article><img src="/images/residential-hvac.jpg" alt="Example residential HVAC project placeholder" /><div><span>Project placeholder</span><h3>Residential Installation</h3><p>Add the verified problem, solution, equipment and result.</p></div></article><article><img src="/images/commercial-rooftop.jpg" alt="Example commercial rooftop equipment project placeholder" /><div><span>Project placeholder</span><h3>Commercial HVAC</h3><p>Add approved location and scope when a real case study is supplied.</p></div></article><article><img src="/images/diagnostics.jpg" alt="Example HVAC diagnostic service project placeholder" /><div><span>Project placeholder</span><h3>System Diagnostics</h3><p>Add documented readings and verified service outcome.</p></div></article></div>
      <a className="inline-cta centered-link" href="#contact">Submit project information <span>→</span></a>
    </section>

    <section className="proof-service branded-section" id="about"><div><p className="kicker light">Accountable service</p><h2>Professional work is more than the repair.</h2><p>It is how the equipment is evaluated, how findings are communicated, how the work is completed and how the result is verified.</p></div><div className="proof-points"><span><i>01</i><b>Technical competence</b><small>System-level evaluation and disciplined workmanship.</small></span><span><i>02</i><b>Professional communication</b><small>Clear findings, options and expectations.</small></span><span><i>03</i><b>Long-term relationships</b><small>Service built around equipment life and customer trust.</small></span></div></section>

    <section className="section reviews" id="reviews"><div className="review-placeholder"><span>★★★★★</span><p className="kicker">Service customers can depend on</p><h2>Genuine reviews belong here.</h2><p>Connect approved Google reviews or add verified customer feedback with service type and city. No sample customer claims have been invented.</p><a className="btn-outline" href="#contact">Add verified reviews <span>→</span></a></div><div className="service-area"><p className="kicker">Regional coverage</p><h2>Serving Northeast Ohio</h2><p>Primary market: Greater Cleveland and surrounding Northeast Ohio communities. Confirm specific municipalities before publishing location claims.</p><div className="map-visual"><i className="lake">Lake Erie</i><span className="road r1" /><span className="road r2" /><span className="road r3" /><b>NE<br />OHIO</b><i className="pin p1" /><i className="pin p2" /><i className="pin p3" /></div><a className="inline-cta" href="#schedule">Check your service area <span>→</span></a></div></section>

    <section className="section schedule" id="schedule"><div className="schedule-copy"><p className="kicker light">Ready to get started?</p><h2>Tell us what the equipment needs.</h2><p>Use the guided request to describe the system, property and timing. Eternity Mechanical Services can then help determine the appropriate next step.</p><div className="schedule-points"><span>✓ Residential & commercial</span><span>✓ HVAC & refrigeration</span><span>✓ Repair, replacement & maintenance</span></div></div><ServiceRequest /></section>

    <section className="emergency" id="contact"><div><p className="kicker light">Responsive mechanical service</p><h2>HVAC or Refrigeration Problem?</h2><p>Tell us what’s happening and we’ll help determine the appropriate next step.</p></div><div><a className="btn btn-orange" href="#schedule">Schedule service <span>↗</span></a><a className="btn-outline light-outline" href="#schedule">Request an estimate <span>→</span></a><small>Business phone and email should be confirmed before the final client launch.</small></div></section>

    <footer><div className="footer-grid"><div className="footer-brand"><div className="logo-crop footer-logo"><img src="/images/eternity-logo.svg" alt="Eternity Mechanical Services" /></div><p>Professional HVAC, refrigeration, installation, repair and preventive maintenance for residential and commercial customers.</p></div><div><h3>Services</h3><a href="#services">Air conditioning</a><a href="#services">Heating</a><a href="#commercial">Commercial HVAC</a><a href="#services">Refrigeration</a><a href="#services">Installation</a><a href="#maintenance">Maintenance</a></div><div><h3>Company</h3><a href="#about">About</a><a href="#projects">Projects</a><a href="#reviews">Reviews</a><a href="#contact">Service area</a><a href="#contact">Contact</a></div><div><h3>Customer</h3><a href="#schedule">Schedule service</a><a href="#schedule">Request estimate</a><a href="#commercial">Commercial service</a><a href="#maintenance">Maintenance</a></div><div><h3>Contact</h3><p>Greater Cleveland<br />Northeast Ohio</p><span>Phone: to be confirmed</span><span>Email: to be confirmed</span><span>Hours: to be confirmed</span></div></div><div className="footer-bottom"><span>© 2026 Eternity Mechanical Services. All rights reserved.</span><span>License information to be added when supplied.</span><span>Privacy · Terms</span></div></footer>
    <div className="mobile-bar"><a href="#contact"><span>☎</span>Call</a><a href="#schedule"><span>＋</span>Schedule</a><a href="#schedule"><span>◇</span>Estimate</a></div>
  </main>;
}

export function SiteHeader() {
  return <>
    <div className="topbar"><span>Black-owned • Licensed & insured • 15-minute response target</span><a href="tel:+12162536468">Emergency service available: 216-253-6468 <b>→</b></a></div>
    <header className="header">
      <a className="logo-crop" href="/" aria-label="Eternity Mechanical Services home"><img src="/images/eternity-logo.svg" alt="Eternity Mechanical Services" /></a>
      <nav aria-label="Primary navigation"><a href="/#services">Services</a><a href="/services/commercial-hvac">Commercial HVAC</a><a href="/services/commercial-refrigeration">Refrigeration</a><a href="/services/preventive-maintenance">Maintenance</a><a href="/projects">Projects</a><a href="/areas-we-serve">Areas served</a><a href="/#about">About</a><a href="/#contact">Contact</a></nav>
      <div className="header-actions"><a className="call-link" href="tel:+12162536468">Call 216-253-6468</a><a className="btn btn-small" href="/#schedule">Schedule service</a></div>
      <details className="mobile-menu"><summary aria-label="Open navigation"><span /><span /><span /></summary><div><a href="/#services">Services</a><a href="/services/commercial-hvac">Commercial HVAC</a><a href="/services/commercial-refrigeration">Refrigeration</a><a href="/services/preventive-maintenance">Maintenance</a><a href="/projects">Projects</a><a href="/areas-we-serve">Areas served</a><a href="/#contact">Contact</a></div></details>
    </header>
  </>;
}

export function SiteFooter() {
  return <>
    <footer><div className="footer-grid"><div className="footer-brand"><div className="logo-crop footer-logo"><img src="/images/eternity-logo-reverse.svg" alt="Eternity Mechanical Services" /></div><p>Licensed and insured HVAC, refrigeration, installation, repair and preventive maintenance for residential and commercial customers.</p></div><div><h3>Services</h3><a href="/#services">Air conditioning</a><a href="/#services">Heating</a><a href="/services/commercial-hvac">Commercial HVAC</a><a href="/services/commercial-refrigeration">Commercial refrigeration</a><a href="/services/preventive-maintenance">Preventive maintenance</a></div><div><h3>Company</h3><a href="/#about">About</a><a href="/projects">Project case studies</a><a href="https://share.google/1bUl6S4x9x90TJ7Mf" target="_blank" rel="noreferrer">Google profile</a><a data-review-link href="https://g.page/r/CYsWl6Bz9AJvEBM/review" target="_blank" rel="noreferrer">Write a Google review</a><a href="/areas-we-serve">Areas we serve</a><a href="/areas-we-serve/euclid-oh">Euclid HVAC service</a><a href="/#contact">Contact</a></div><div><h3>Customer</h3><a href="/#schedule">Request service</a><a href="/#schedule">Request estimate</a><a href="/services/commercial-hvac">Commercial service</a><a href="/services/preventive-maintenance">Maintenance</a></div><div><h3>Contact</h3><p>Cleveland, Cuyahoga County<br />Greater Cleveland & Northeast Ohio</p><a href="tel:+12162536468">216-253-6468</a><a href="mailto:ben@eternityhvacr.com">ben@eternityhvacr.com</a><span>Mon–Fri: 7 a.m.–7 p.m.</span><span>Sat: 9 a.m.–5 p.m. • Sun: Closed</span></div></div><div className="footer-bottom"><span>© 2026 Eternity Mechanical Services LLC. All rights reserved.</span><span>Licensed & insured • License #28303</span><span>Service-area business • Greater Cleveland</span></div></footer>
    <div className="mobile-bar"><a href="tel:+12162536468"><span>☎</span>Call</a><a href="/#schedule"><span>＋</span>Schedule</a><a href="/#schedule"><span>◇</span>Estimate</a></div>
  </>;
}

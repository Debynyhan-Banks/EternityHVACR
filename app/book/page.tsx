import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { breadcrumbSchema, StructuredData } from "../lib/structuredData";
import "./book.css";

export const metadata: Metadata = {
  title: "Book HVAC Service | Fees & Free Estimates | Eternity",
  description: "Book eligible residential diagnostic visits with Eternity in Greater Cleveland. See residential and commercial service charges, hours and free estimate options.",
  alternates: { canonical: "/book" },
  openGraph: { title: "Book HVAC Service | Eternity Mechanical", description: "Review service charges, book eligible residential visits, or request a free estimate or second opinion.", url: "/book" },
};

export default function BookingPage() {
  return <main className="booking-page">
    <SiteHeader />
    <StructuredData data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Book service", path: "/book" }])} />
    <section className="tool-hero">
      <p className="eyebrow"><i /> Greater Cleveland · Residential &amp; commercial</p>
      <h1>Book service with Eternity.</h1>
      <p>Choose a service visit, a free estimate or a free second opinion. Review the service charge before choosing an appointment.</p>
    </section>
    <section className="section booking-fees" aria-labelledby="booking-fees-title">
      <div><p className="kicker">Clear service charges</p><h2 id="booking-fees-title">Know the visit charge.</h2><p>Pay at the visit. No online payment is required. These are service visit charges, not a quote for repair work.</p></div>
      <div className="booking-fee-grid">
        <article><h3>Residential service</h3><p className="booking-price">$99 <small>regular hours</small></p><p><strong>$149 after hours</strong><br />$99 service charge + $50 after-hours charge</p></article>
        <article><h3>Commercial service</h3><p className="booking-price">$150 <small>regular hours</small></p><p><strong>$225 after hours</strong><br />$150 service charge + $75 after-hours charge</p></article>
      </div>
      <p className="booking-hours"><strong>Regular hours, Eastern Time:</strong> Monday–Friday, 7 a.m.–7 p.m.; Saturday, 9 a.m.–5 p.m. After-hours charges apply outside these hours. <strong>Sunday: emergencies only.</strong></p>
      <p>For an emergency or Sunday service, <a href="tel:+12167033183">call 216-703-3183</a> to check availability.</p>
    </section>
    <section className="section booking-options" aria-labelledby="booking-options-title">
      <div><p className="kicker">Choose your next step</p><h2 id="booking-options-title">How can we help?</h2></div>
      <div className="booking-option-grid">
        <article><span className="booking-label">Paid service visit</span><h3>Residential diagnostic</h3><p>Use Ask Eternity, powered by Signmons, to describe the problem and see live appointment choices when your visit is eligible.</p><p>Your appointment is confirmed only after you choose a live arrival window and receive confirmation. If no times are offered, contact the team.</p><button type="button" data-open-assistant className="booking-action">Start residential booking →</button></article>
        <article><span className="booking-label">Paid service visit</span><h3>Commercial service</h3><p>Send your HVAC or refrigeration service details. Eternity will follow up to arrange the visit.</p><p>A submitted service request is not a confirmed appointment.</p><a className="booking-action" href="https://eternityhvacr.com/?serviceScope=commercial-service#schedule">Request paid commercial service →</a></article>
        <article><span className="booking-label">Free · Onsite or remote</span><h3>Installation estimate</h3><p>Request an estimate for replacement or new equipment. Select “Installation estimate” in the request form and tell us whether you prefer an onsite or remote review.</p><p>Troubleshooting and repair visits are paid service calls. The team will confirm the next step with you.</p><a className="booking-action" href="https://eternityhvacr.com/?serviceScope=installation-estimate#schedule">Request a free estimate →</a></article>
        <article><span className="booking-label">Free · Onsite or remote</span><h3>Second opinion</h3><p>Upload a quote from a verifiable, licensed HVAC contractor. We’ll review the scope and price and explain whether we can offer a better price for comparable work.</p><p>Submit files for a remote review or tell us you would like an onsite second opinion.</p><a className="booking-action" href="/second-opinion">Get a free second opinion →</a></article>
      </div>
    </section>
    <SiteFooter />
  </main>;
}

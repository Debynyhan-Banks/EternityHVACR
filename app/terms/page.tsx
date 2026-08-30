import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Website Terms | Eternity Mechanical Services",
  description: "Terms for using eternityhvacr.com and submitting service or estimate requests to Eternity Mechanical Services.",
  alternates: { canonical: "/terms" },
  openGraph: { title: "Website Terms | Eternity Mechanical Services", description: "Plain-language terms for website information and service requests.", url: "/terms", images: [] },
  twitter: { card: "summary", title: "Website Terms | Eternity Mechanical Services", description: "Plain-language terms for website information and service requests.", images: [] },
};

export default function TermsPage() {
  return <main>
    <SiteHeader />
    <section className="legal-hero"><p className="eyebrow"><i /> Website terms</p><h1>What the website can—and cannot—confirm.</h1><p>Effective August 28, 2026. These terms apply to your use of eternityhvacr.com.</p></section>
    <article className="legal-content">
      <div className="legal-summary"><strong>Important</strong><p>Submitting a form requests contact from Eternity. Eligible residential diagnostic visits are appointments only when the assistant displays live availability and confirms the selected window.</p></div>

      <h2>Website information</h2>
      <p>The website provides general information about Eternity Mechanical Services, service categories, service areas and previously completed work. Equipment conditions vary. Educational content is not a remote diagnosis and is not a substitute for inspection, measurements or manufacturer-specific procedures.</p>

      <h2>Automated service assistant</h2>
      <p>The Signmons-powered service assistant provides guided routing and optional AI-assisted conversation. Its responses are generated from the information you enter and may be incomplete or incorrect. The assistant is not a technician, does not inspect or diagnose equipment, does not provide a binding price or estimate and does not dispatch emergency help. It may confirm an eligible residential heating or cooling diagnostic appointment only when it displays live availability and then confirms the window you select.</p>

      <h2>Requests, estimates and appointments</h2>
      <p>Except for an eligible residential diagnostic appointment explicitly confirmed from live assistant availability, a website, phone, email or text request is an invitation for Eternity to follow up. Appointment timing, technician availability, scope, pricing, payment terms, parts, warranty coverage and other job-specific conditions are confirmed separately by Eternity. The stated 15-minute target refers to review or reply during regular business hours and is not a technician-arrival promise.</p>
      <p>A confirmed residential diagnostic appointment may include a private management link. Anyone with that link may be able to view, reschedule or cancel the appointment, so keep it private. Online rescheduling is limited to live windows that meet Eternity&apos;s minimum-notice rules and is not complete until the replacement time is confirmed. Online cancellation releases the reserved time only after the website displays a cancellation confirmation. Call 216-703-3183 if the link is unavailable or the appointment is too close to change online.</p>

      <h2>Emergency and safety limits</h2>
      <p>The website is not an emergency-dispatch service. If you suspect fire, carbon monoxide, a gas leak, electrical danger or another immediate threat, leave the affected area when appropriate and contact 911, the fire department or the utility emergency line. Do not rely on a website submission for an immediate safety response.</p>

      <h2>Acceptable use</h2>
      <p>Do not use the website to submit false requests, impersonate another person, interfere with operation, probe security controls, distribute malicious code or violate another person’s rights. Eternity may reject or restrict abusive or automated requests.</p>

      <h2>Third-party services</h2>
      <p>The website may link to maps, review platforms, social services or other third parties. Eternity does not control their availability, content or privacy practices. A link does not change the separate terms that apply to those services.</p>

      <h2>Ownership and changes</h2>
      <p>Unless otherwise stated, the website’s original text, layout, branding and project documentation are owned by Eternity Mechanical Services or used with permission. We may update the website and these terms as services and processes change.</p>

      <h2>Privacy and contact</h2>
      <p>Review the <Link href="/privacy">Privacy & Data Use notice</Link> for information about website forms, analytics and service communications. Questions may be sent to <a href="mailto:ben@eternityhvacr.com">ben@eternityhvacr.com</a> or <a href="tel:+12167033183">216-703-3183</a>.</p>
    </article>
    <SiteFooter />
  </main>;
}

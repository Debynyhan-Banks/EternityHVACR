import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";

export const metadata: Metadata = {
  title: "Privacy & Data Use | Eternity Mechanical Services",
  description: "How Eternity Mechanical Services collects, uses and protects information submitted through eternityhvacr.com.",
  alternates: { canonical: "/privacy" },
  openGraph: { title: "Privacy & Data Use | Eternity Mechanical Services", description: "Plain-language information about website forms, analytics and service communications.", url: "/privacy", images: [] },
  twitter: { card: "summary", title: "Privacy & Data Use | Eternity Mechanical Services", description: "Plain-language information about website forms, analytics and service communications.", images: [] },
};

export default function PrivacyPage() {
  return <main>
    <SiteHeader />
    <section className="legal-hero"><p className="eyebrow"><i /> Privacy & data use</p><h1>Clear information about the details you share.</h1><p>Effective August 28, 2026. This notice explains how Eternity Mechanical Services LLC handles information submitted through this website.</p></section>
    <article className="legal-content">
      <div className="legal-summary"><strong>The short version</strong><p>We use the information you provide to respond to service requests, communicate about requested work, operate the website and understand which pages and contact options are useful. We do not sell personal information.</p></div>

      <h2>Information we collect</h2>
      <p>When you send a service request, we collect the information you enter, such as your name, phone number, email address, property type, requested service, timing and equipment or issue details. If you call, text or email Eternity directly, we receive the information included in that communication.</p>
      <p>The website also receives limited technical information needed to operate securely, such as request timing and network information used for abuse prevention. Google Analytics collects website usage information such as page visits, referral source and contact-button events. Eternity does not intentionally send service-request names, phone numbers, email addresses or issue descriptions to Google Analytics.</p>

      <h2>Automated service assistant</h2>
      <p>The Signmons-powered service assistant helps visitors choose a request category and reach Eternity by form, phone, text or email. The assistant does not ask for or submit contact, payment or issue-description information. Its selections remain in the current page session. Eternity may measure non-personal interaction categories—such as opening the assistant, selecting a service path or choosing a contact method—to improve the experience. Do not enter sensitive information into the assistant.</p>

      <h2>How we use information</h2>
      <ul><li>Respond to the service or estimate request you initiated.</li><li>Confirm that a website request was received.</li><li>Prepare for a call, visit, estimate or follow-up.</li><li>Protect the website from spam, fraud and misuse.</li><li>Measure website performance and improve the customer experience.</li><li>Maintain records reasonably needed for business, safety or legal purposes.</li></ul>

      <h2>Service communications and text messages</h2>
      <p>When you submit a request, you authorize Eternity to contact you by phone, service-related text message or email about that request. This is not consent to unrelated marketing. Message and data rates may apply. You may reply STOP to service-related text messages to opt out of further texts, though Eternity may still contact you through another method when needed to address an active request.</p>

      <h2>Service providers</h2>
      <p>Eternity uses service providers to host the website, deliver request and confirmation emails, protect the form from abuse and measure website activity. Those providers receive only the information needed to perform their role. Current website services include OpenAI Sites/Cloudflare infrastructure, Resend for email delivery and Google Analytics for website measurement.</p>

      <h2>Retention and security</h2>
      <p>We keep information only as long as reasonably needed for the purposes described here, to support an active customer relationship or to meet recordkeeping and legal obligations. No online system can guarantee absolute security, but Eternity limits collection to information needed for the request and uses HTTPS, server-side validation and abuse controls.</p>

      <h2>Your choices</h2>
      <p>You may ask what service-request information Eternity maintains about you or request a correction or deletion, subject to records that must be retained for legitimate business or legal reasons. Email <a href="mailto:ben@eternityhvacr.com">ben@eternityhvacr.com</a> or call <a href="tel:+12167033183">216-703-3183</a>.</p>

      <h2>Children and external links</h2>
      <p>This website is intended for adults requesting property and equipment service and is not directed to children. Links to Google, review platforms or other third-party services are governed by those services’ own notices.</p>

      <h2>Updates</h2>
      <p>We may update this notice when the website or business processes change. The effective date above identifies the current version. Website use is also subject to the <Link href="/terms">Website Terms</Link>.</p>
    </article>
    <SiteFooter />
  </main>;
}

import Link from "next/link";
import { SiteFooter, SiteHeader } from "./SiteChrome";

export type ServiceLandingContent = {
  slug: string;
  eyebrow: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  services: string[];
  customers: string[];
  process: Array<[string, string]>;
  faqs: Array<[string, string]>;
  guidance?: {
    eyebrow: string;
    title: string;
    items: Array<[string, string]>;
  };
  caseStudy?: {
    href: string;
    image: string;
    imageAlt: string;
    label: string;
    title: string;
    copy: string;
  };
  relatedGuides?: Array<{
    href: string;
    title: string;
    copy: string;
  }>;
};

export default function ServiceLanding({ content }: { content: ServiceLandingContent }) {
  const pageUrl = `https://eternityhvacr.com/services/${content.slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${pageUrl}#service`,
        name: content.title,
        serviceType: content.eyebrow,
        url: pageUrl,
        description: content.summary,
        areaServed: "Greater Cleveland and Northeast Ohio",
        provider: { "@id": "https://eternityhvacr.com/#business" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://eternityhvacr.com/" },
          { "@type": "ListItem", position: 2, name: "Services", item: "https://eternityhvacr.com/#services" },
          { "@type": "ListItem", position: 3, name: content.title, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: content.faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };

  return <main>
    <SiteHeader />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className="landing-hero">
      <div className="landing-hero-copy"><p className="eyebrow"><i /> {content.eyebrow}</p><h1>{content.title}</h1><p>{content.summary}</p><div className="hero-actions"><Link className="btn" href="/#schedule">Request service <span>↗</span></Link><a className="btn-outline" href="tel:+12167033183">Call 216-703-3183 <span>→</span></a></div><div className="landing-trust"><span>✓ Licensed & insured</span><span>✓ License #28303</span><span>✓ Residential & commercial expertise</span></div></div>
      <div className="landing-hero-image"><img src={content.image} alt={content.imageAlt} width="1800" height="1200" fetchPriority="high" decoding="async" /><span>Greater Cleveland & Northeast Ohio</span></div>
    </section>
    <section className="response-band"><strong>15-minute response target</strong><span>Website requests are typically reviewed within 15 minutes during regular business hours. For urgent service, call directly.</span><a href="tel:+12167033183">Call now →</a></section>
    <section className="section landing-overview"><div><p className="kicker">Service capabilities</p><h2>Professional service built around the equipment.</h2><p>Eternity begins with the operating condition, symptoms and property needs, then evaluates the system before recommending approved work.</p></div><div className="landing-list">{content.services.map((service) => <span key={service}>✓ {service}</span>)}</div></section>
    <section className="landing-customers"><div><p className="kicker light">Who we help</p><h2>Service for the properties that depend on reliable operation.</h2></div><div>{content.customers.map((customer) => <article key={customer}><span>✓</span><h3>{customer}</h3></article>)}</div></section>
    <section className="section landing-process"><div className="center-head"><p className="kicker">How service works</p><h2>Measured before recommended.</h2></div><div>{content.process.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>)}</div></section>
    {content.caseStudy && <section className="commercial-proof">
      <figure><img src={content.caseStudy.image} alt={content.caseStudy.imageAlt} width="1200" height="900" loading="lazy" decoding="async" /><figcaption>{content.caseStudy.label}</figcaption></figure>
      <div><p className="kicker light">Verified field work</p><h2>{content.caseStudy.title}</h2><p>{content.caseStudy.copy}</p><Link className="inline-cta light-link" href={content.caseStudy.href}>Read the case study <span>→</span></Link></div>
    </section>}
    {content.guidance && <section className="section landing-process">
      <div className="center-head"><p className="kicker">{content.guidance.eyebrow}</p><h2>{content.guidance.title}</h2></div>
      <div>{content.guidance.items.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>}
    {content.relatedGuides && <section className="section landing-process">
      <div className="center-head"><p className="kicker">Expert guidance</p><h2>Learn what the equipment may be telling you.</h2></div>
      <div>{content.relatedGuides.map((guide, index) => <article key={guide.href}><span>{String(index + 1).padStart(2, "0")}</span><h3>{guide.title}</h3><p>{guide.copy}</p><Link className="inline-cta" href={guide.href}>Read the expert guide <span>→</span></Link></article>)}</div>
    </section>}
    <section className="section landing-faq"><div><p className="kicker">Common questions</p><h2>Before you request service</h2></div><div>{content.faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div></section>
    <section className="emergency landing-cta"><div><p className="kicker light">Ready to get started?</p><h2>Tell Eternity what the equipment needs.</h2><p>Use the guided request form for service details, timing and contact information.</p></div><div><Link className="btn btn-orange" href="/#schedule">Request service <span>↗</span></Link><a data-sms-link className="btn-outline light-outline" href="sms:+12167033183">Text Eternity <span>→</span></a><Link className="contact-service-link" href="/areas-we-serve">View service areas →</Link><small>Texts are monitored 24/7 with a 15-minute reply target; this is not an arrival-time promise. Message and data rates may apply. Reply STOP to opt out. For urgent help, call 216-703-3183.</small></div></section>
    <SiteFooter />
  </main>;
}

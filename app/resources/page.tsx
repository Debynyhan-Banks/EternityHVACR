import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components/SiteChrome";
import { expertAnswers } from "../data/answers";

export const metadata: Metadata = {
  title: "HVAC & Refrigeration Expert Answers | Eternity Mechanical",
  description: "Direct, safety-conscious HVAC and refrigeration answers for Greater Cleveland property owners, facility managers, restaurants and homeowners.",
  alternates: { canonical: "/resources" },
  openGraph: { title: "HVAC & Refrigeration Expert Answers | Eternity", description: "Clear answers grounded in manufacturer and government guidance, with local context and next steps.", url: "/resources", images: [] },
  twitter: { card: "summary", title: "HVAC & Refrigeration Expert Answers | Eternity", description: "Clear answers grounded in manufacturer and government guidance, with local context and next steps.", images: [] },
};

export default function ResourcesPage() {
  const pageUrl = "https://eternityhvacr.com/resources";
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    name: "Eternity Mechanical Services expert answers",
    description: metadata.description,
    url: pageUrl,
    publisher: { "@id": "https://eternityhvacr.com/#business" },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: expertAnswers.map((answer, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: answer.question,
        url: `${pageUrl}/${answer.slug}`,
      })),
    },
  };

  return <main>
    <SiteHeader />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <section className="resource-index-hero"><p className="eyebrow"><i /> Expert answer library</p><h1>Clear HVAC/R answers, grounded in evidence.</h1><p>Direct explanations for the equipment questions Greater Cleveland homeowners, facility managers and food-service operators ask most—plus safe next steps and authoritative technical references.</p></section>
    <section className="section resource-index-section">
      <div className="resource-principles"><div><strong>Direct first</strong><span>The practical answer appears before the longer explanation.</span></div><div><strong>Locally useful</strong><span>Each guide accounts for Greater Cleveland operating conditions.</span></div><div><strong>Source grounded</strong><span>Manufacturer and government references support the guidance.</span></div><div><strong>Safety bounded</strong><span>Every answer is clear about work that requires a technician.</span></div></div>
      <div className="resource-index-grid">{expertAnswers.map((answer, index) => <article key={answer.slug}><span>{String(index + 1).padStart(2, "0")} · {answer.category}</span><h2><a href={`/resources/${answer.slug}`}>{answer.question}</a></h2><p>{answer.directAnswer}</p><a className="inline-cta" href={`/resources/${answer.slug}`}>Read the complete answer <span>→</span></a></article>)}</div>
    </section>
    <section className="emergency landing-cta"><div><p className="kicker light">Need equipment-specific help?</p><h2>A guide cannot replace measured findings.</h2><p>Tell Eternity what the system is doing and where the property is located.</p></div><div><a className="btn btn-orange" href="https://eternityhvacr.com/#schedule">Request service <span>↗</span></a><a className="btn-outline light-outline" href="/areas-we-serve">View service areas <span>→</span></a></div></section>
    <SiteFooter />
  </main>;
}

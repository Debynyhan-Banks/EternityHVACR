import type { ExpertAnswer } from "../data/answers";
import { SiteFooter, SiteHeader } from "./SiteChrome";

const displayDate = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export default function AnswerArticle({ answer }: { answer: ExpertAnswer }) {
  const pageUrl = `https://eternityhvacr.com/resources/${answer.slug}`;
  const published = displayDate.format(new Date(`${answer.published}T00:00:00Z`));
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${pageUrl}#article`,
        headline: answer.question,
        description: answer.description,
        datePublished: answer.published,
        dateModified: answer.updated,
        inLanguage: "en-US",
        mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
        author: { "@type": "Organization", name: "Eternity Mechanical Services LLC", url: "https://eternityhvacr.com/#about" },
        publisher: { "@id": "https://eternityhvacr.com/#business" },
        about: answer.category,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://eternityhvacr.com/" },
          { "@type": "ListItem", position: 2, name: "Expert answers", item: "https://eternityhvacr.com/resources" },
          { "@type": "ListItem", position: 3, name: answer.question, item: pageUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: answer.faqs.map(([question, response]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: response },
        })),
      },
    ],
  };

  return <main>
    <SiteHeader />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    <article className="answer-article">
      <header className="answer-hero">
        <nav className="answer-breadcrumbs" aria-label="Breadcrumb"><a href="https://eternityhvacr.com/">Home</a><span>›</span><a href="/resources">Expert answers</a><span>›</span><span>{answer.category}</span></nav>
        <p className="eyebrow"><i /> {answer.category}</p>
        <h1>{answer.question}</h1>
        <p className="answer-byline">By Eternity Mechanical Services <span>•</span> Published {published}</p>
        <div className="direct-answer"><strong>Direct answer</strong><p>{answer.directAnswer}</p></div>
        <p className="answer-local-context"><strong>Greater Cleveland context:</strong> {answer.localContext}</p>
      </header>

      <div className="answer-layout">
        <div className="answer-body">
          {answer.sections.map((section) => <section key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
          </section>)}

          <section className="warning-section">
            <h2>When to request service promptly</h2>
            <ul>{answer.warningSigns.map((sign) => <li key={sign}>{sign}</li>)}</ul>
          </section>

          <aside className="safety-note"><strong>Safety limit</strong><p>{answer.safetyNote}</p></aside>

          <section className="answer-faq">
            <p className="kicker">Common questions</p>
            <h2>Questions about this problem</h2>
            {answer.faqs.map(([question, response]) => <details key={question}><summary>{question}</summary><p>{response}</p></details>)}
          </section>

          <section className="answer-sources">
            <p className="kicker">Editorial sources</p>
            <h2>Technical references</h2>
            <p>This general educational answer was prepared from manufacturer and U.S. government guidance. It does not replace equipment-specific instructions or an on-site diagnosis.</p>
            <ol>{answer.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.name}</a><span>{source.publisher}</span></li>)}</ol>
          </section>
        </div>

        <aside className="answer-sidebar">
          <div><span>Need an on-site diagnosis?</span><h2>Get measured findings before approving work.</h2><p>Describe the equipment, symptoms, timing and property location. Eternity serves approved Greater Cleveland and Northeast Ohio communities.</p><a className="btn" href="https://eternityhvacr.com/#schedule">Request service <span>↗</span></a><a className="sidebar-link" href="tel:+12162536468">Call 216-253-6468 →</a></div>
          <nav aria-label="Related pages"><strong>Related pages</strong><a href={answer.serviceHref}>{answer.serviceLabel} →</a>{answer.proofHref && <a href={answer.proofHref}>{answer.proofLabel} →</a>}<a href="/areas-we-serve">Check the service area →</a><a href="/resources">Browse all expert answers →</a></nav>
        </aside>
      </div>
    </article>
    <SiteFooter />
  </main>;
}

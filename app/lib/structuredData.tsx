const SITE_URL = "https://eternityhvacr.com";
const BUSINESS_ID = `${SITE_URL}/#business`;

type Faq = readonly [question: string, answer: string];

export function StructuredData({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, SITE_URL).toString(),
    })),
  };
}

export function faqSchema(faqs: readonly Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

export function serviceSchema({
  name,
  description,
  path,
  areaServed,
}: {
  name: string;
  description: string;
  path: string;
  areaServed: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: new URL(path, SITE_URL).toString(),
    provider: { "@id": BUSINESS_ID },
    areaServed: areaServed.map((name) => ({ "@type": "City", name })),
    serviceType: [
      "Heating and air-conditioning service",
      "Commercial refrigeration service",
      "Mechanical system diagnostics",
    ],
  };
}

export function webApplicationSchema({ name, description, path }: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: new URL(path, SITE_URL).toString(),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    provider: { "@id": BUSINESS_ID },
  };
}

export function servicePriceCatalogSchema({
  name,
  description,
  path,
  offers,
}: {
  name: string;
  description: string;
  path: string;
  offers: Array<{
    name: string;
    description: string;
    minPrice?: number;
    maxPrice?: number;
    startingPrice?: number;
  }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: new URL(path, SITE_URL).toString(),
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "AdministrativeArea", name: "Greater Cleveland, Ohio" },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "HVAC project planning prices",
      itemListElement: offers.map((offer) => ({
        "@type": "Offer",
        name: offer.name,
        description: offer.description,
        priceSpecification: {
          "@type": "PriceSpecification",
          priceCurrency: "USD",
          ...(offer.minPrice !== undefined ? { minPrice: offer.minPrice } : {}),
          ...(offer.maxPrice !== undefined ? { maxPrice: offer.maxPrice } : {}),
          ...(offer.startingPrice !== undefined ? { price: offer.startingPrice } : {}),
        },
      })),
    },
  };
}

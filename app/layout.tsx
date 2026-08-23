import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import AnalyticsEvents from "./components/Analytics";
import "./globals.css";

const GOOGLE_ANALYTICS_ID = "G-32W3PBPDBY";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://eternityhvacr.com"),
  title: "Eternity Mechanical Services | HVAC & Mechanical Contractor",
  description: "Professional HVAC, refrigeration, installation, repair and preventive maintenance for residential and commercial customers throughout Northeast Ohio.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Eternity Mechanical Services | HVAC/R in Northeast Ohio",
    description: "Built for Comfort. Engineered for Reliability.",
    type: "website",
    url: "/",
    siteName: "Eternity Mechanical Services",
    locale: "en_US",
    images: [{ url: "/og-eternity-hvacr.png", width: 1200, height: 630, alt: "Eternity Mechanical Services — Built for Comfort. Engineered for Reliability." }],
  },
  twitter: { card: "summary_large_image", title: "Eternity Mechanical Services | HVAC/R in Northeast Ohio", description: "Built for Comfort. Engineered for Reliability.", images: ["/og-eternity-hvacr.png"] },
};

const businessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["HVACBusiness", "Organization"],
      "@id": "https://eternityhvacr.com/#business",
      name: "Eternity Mechanical Services LLC",
      url: "https://eternityhvacr.com",
      logo: "https://eternityhvacr.com/images/eternity-logo.svg",
      image: "https://eternityhvacr.com/og-eternity-hvacr.png",
      telephone: "+1-216-253-6468",
      email: "ben@eternityhvacr.com",
      description: "Licensed and insured HVAC/R and mechanical contractor serving residential, commercial and multifamily customers throughout Greater Cleveland.",
      identifier: {
        "@type": "PropertyValue",
        propertyID: "Contractor license",
        value: "28303",
      },
      areaServed: [
        { "@type": "City", name: "Cleveland" },
        { "@type": "AdministrativeArea", name: "Cuyahoga County" },
        { "@type": "AdministrativeArea", name: "Greater Cleveland metropolitan area" },
      ],
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          opens: "07:00",
          closes: "19:00",
        },
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: "Saturday",
          opens: "09:00",
          closes: "17:00",
        },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-216-253-6468",
        email: "ben@eternityhvacr.com",
        contactType: "customer service",
        areaServed: "Greater Cleveland, Ohio",
      },
      knowsAbout: [
        "Air conditioning",
        "Heating",
        "Commercial HVAC",
        "Commercial refrigeration",
        "Walk-in coolers",
        "Multifamily HVAC",
        "Preventive maintenance",
      ],
      sameAs: ["https://share.google/1bUl6S4x9x90TJ7Mf"],
    },
    {
      "@type": "WebSite",
      "@id": "https://eternityhvacr.com/#website",
      url: "https://eternityhvacr.com",
      name: "Eternity Mechanical Services",
      publisher: { "@id": "https://eternityhvacr.com/#business" },
    },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ANALYTICS_ID}');` }} />
      </head>
      <body className={`${manrope.variable} ${inter.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
        <AnalyticsEvents />
        {children}
      </body>
    </html>
  );
}

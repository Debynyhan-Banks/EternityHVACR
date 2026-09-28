import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { analyticsBootstrap } from "./lib/analytics-bootstrap";
import AttributionCapture from "./components/AttributionCapture";
import SignmonsAssistant from "./components/SignmonsAssistant";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://eternityhvacr.com"),
  title: "Cleveland HVAC, Refrigeration & Boiler Service | Eternity",
  description: "Licensed and insured HVAC, commercial refrigeration, boiler repair, installation and preventive maintenance across Greater Cleveland and Northeast Ohio.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Cleveland HVAC, Refrigeration & Boiler Service | Eternity",
    description: "Residential and commercial HVAC/R, boiler and preventive-maintenance service across Greater Cleveland and Northeast Ohio.",
    type: "website",
    url: "/",
    siteName: "Eternity Mechanical Services",
    locale: "en_US",
    images: [{ url: "/og-eternity-uniform-v2.png", width: 1200, height: 630, alt: "Eternity Mechanical Services — Built for Comfort. Engineered for Reliability." }],
  },
  twitter: { card: "summary_large_image", title: "Cleveland HVAC, Refrigeration & Boiler Service | Eternity", description: "Residential and commercial HVAC/R, boiler and preventive-maintenance service across Greater Cleveland and Northeast Ohio.", images: ["/og-eternity-uniform-v2.png"] },
};

const businessSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://eternityhvacr.com/#business",
      name: "Eternity Mechanical Services LLC",
      url: "https://eternityhvacr.com",
      logo: "https://eternityhvacr.com/images/eternity-logo.svg",
      image: "https://eternityhvacr.com/og-eternity-uniform-v2.png",
      telephone: "+1-216-703-3183",
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
        telephone: "+1-216-703-3183",
        email: "ben@eternityhvacr.com",
        contactType: "customer service",
        areaServed: "Greater Cleveland, Ohio",
      },
      knowsAbout: [
        "Air conditioning",
        "Air conditioning repair",
        "Air conditioning installation",
        "Heating",
        "Commercial HVAC",
        "Commercial refrigeration",
        "Walk-in coolers",
        "Multifamily HVAC",
        "Preventive maintenance",
        "Emergency HVAC/R service",
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
        <script dangerouslySetInnerHTML={{ __html: analyticsBootstrap }} />
      </head>
      <body className={`${manrope.variable} ${inter.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
        <AttributionCapture />
        {children}
        <SignmonsAssistant />
      </body>
    </html>
  );
}

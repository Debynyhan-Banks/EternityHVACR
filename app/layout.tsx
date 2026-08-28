import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import AnalyticsEvents from "./components/Analytics";
import SignmonsAssistant from "./components/SignmonsAssistant";
import "./globals.css";

const GOOGLE_ANALYTICS_ID = "G-32W3PBPD8Y";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://eternityhvacr.com"),
  title: "Eternity Mechanical Services | HVAC & Mechanical Contractor",
  description: "Professional HVAC, refrigeration, installation, repair and preventive maintenance for residential and commercial customers throughout Northeast Ohio.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.svg" },
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
      "@type": "Organization",
      "@id": "https://eternityhvacr.com/#business",
      name: "Eternity Mechanical Services LLC",
      url: "https://eternityhvacr.com",
      logo: "https://eternityhvacr.com/images/eternity-logo.svg",
      image: "https://eternityhvacr.com/og-eternity-hvacr.png",
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
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GOOGLE_ANALYTICS_ID}');
(function loadAnalytics(){
  function insertTag(){
    if (document.querySelector('script[data-eternity-analytics]')) return;
    var script = document.createElement('script');
    script.async = true;
    script.dataset.eternityAnalytics = 'true';
    script.src = 'https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}';
    document.head.appendChild(script);
  }
  function scheduleTag(){ window.setTimeout(insertTag, 2500); }
  if (document.readyState === 'complete') scheduleTag();
  else window.addEventListener('load', scheduleTag, { once: true });
})();` }} />
      </head>
      <body className={`${manrope.variable} ${inter.variable}`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
        <AnalyticsEvents />
        {children}
        <SignmonsAssistant />
      </body>
    </html>
  );
}

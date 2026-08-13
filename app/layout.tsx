import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ variable: "--font-manrope", subsets: ["latin"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://eternityhvacr.com"),
  title: "Eternity Mechanical Services | HVAC & Mechanical Contractor",
  description: "Professional HVAC, refrigeration, installation, repair and preventive maintenance for residential and commercial customers throughout Northeast Ohio.",
  alternates: { canonical: "/" },
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

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${manrope.variable} ${inter.variable}`}>{children}</body></html>;
}

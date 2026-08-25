import type { Metadata } from "next";
import LocationLanding, { type LocationLandingContent } from "../../components/LocationLanding";

const pageUrl = "https://eternityhvacr.com/areas-we-serve/euclid-oh";

export const metadata: Metadata = {
  title: "HVAC Repair & Installation in Euclid, OH | Eternity",
  description: "Residential HVAC installation, commercial HVAC diagnostics and refrigeration service in Euclid, Ohio from Eternity Mechanical Services.",
  alternates: { canonical: "/areas-we-serve/euclid-oh" },
  openGraph: {
    title: "HVAC & Refrigeration Service in Euclid, Ohio",
    description: "See genuine Eternity Mechanical project work in Euclid 44119 and 44123 and request residential or commercial HVAC/R service.",
    url: "/areas-we-serve/euclid-oh",
    type: "website",
    images: [{
      url: "/images/euclid/euclid-oh-payne-hvac-installation-1200.webp",
      width: 1200,
      height: 2132,
      alt: "Payne HVAC system installed by Eternity Mechanical in Euclid, Ohio",
    }],
  },
};

const faqs: LocationLandingContent["faqs"] = [
  ["Does Eternity Mechanical provide HVAC service throughout Euclid?", "Yes. Eternity serves approved Euclid ZIP codes 44117, 44119, 44123, 44132 and 44143. Appointment availability is confirmed directly based on the property, equipment and current schedule."],
  ["Do you service both residential and commercial HVAC systems?", "Yes. Eternity provides residential heating and cooling service as well as commercial rooftop, packaged and split-system HVAC service."],
  ["Can Eternity replace an entire furnace and air-conditioning system?", "Yes. The Euclid 44119 and 44123 projects shown on this page document complete residential heating and cooling installations with furnaces, evaporator coils, outdoor condensers and associated installation components."],
  ["Do you service commercial rooftop HVAC units?", "Yes. Eternity provides commercial rooftop-unit diagnostics, repair, replacement planning and preventive maintenance."],
  ["Does Eternity work with newer R-454B equipment?", "Yes. The documented Euclid installation uses a Payne R-454B air conditioner and matching R-454B evaporator coil."],
  ["What areas around Euclid do you serve?", "Approved nearby markets include Cleveland, Richmond Heights, South Euclid, Cleveland Heights, Wickliffe, Willoughby and Mentor, along with additional Greater Cleveland and Northeast Ohio communities."],
];

const content: LocationLandingContent = {
  eyebrow: "Euclid, Ohio service area",
  title: "HVAC & Refrigeration Service in Euclid, Ohio",
  summary: "Residential heating and cooling, commercial HVAC, refrigeration diagnostics, installation and preventive maintenance for Euclid homes, businesses and managed properties.",
  heroImage: "/images/euclid/euclid-oh-payne-hvac-installation-1200.webp",
  heroImageSmall: "/images/euclid/euclid-oh-payne-hvac-installation-720.webp",
  heroAlt: "Payne residential HVAC system installed by Eternity Mechanical in Euclid, Ohio",
  services: [
    { label: "Cooling", title: "Air conditioning", copy: "AC diagnostics, repair, installation, replacement and preventive maintenance for Euclid homes.", href: "/#schedule" },
    { label: "Heating", title: "Furnace service", copy: "Furnace diagnostics, repair, installation, replacement and planned maintenance.", href: "/#schedule" },
    { label: "Facilities", title: "Commercial HVAC", copy: "Rooftop-unit, packaged-system and commercial heating and cooling service.", href: "/services/commercial-hvac" },
    { label: "Cold systems", title: "Commercial refrigeration", copy: "Walk-in, cold-storage, refrigeration-control and temperature-dependent equipment service.", href: "/services/commercial-refrigeration" },
  ],
  faqs,
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      "@id": `${pageUrl}#service`,
      name: "HVAC and refrigeration service in Euclid, Ohio",
      serviceType: ["Residential HVAC", "Commercial HVAC", "Commercial refrigeration", "Preventive maintenance"],
      url: pageUrl,
      description: metadata.description,
      provider: { "@id": "https://eternityhvacr.com/#business" },
      areaServed: { "@type": "City", name: "Euclid", containedInPlace: { "@type": "State", name: "Ohio" } },
      image: [
        "https://eternityhvacr.com/images/euclid/euclid-oh-payne-hvac-installation-1200.webp",
        "https://eternityhvacr.com/images/euclid/euclid-oh-residential-furnace-installation-1200.webp",
        "https://eternityhvacr.com/images/euclid/euclid-oh-sinclair-furnace-installation-1200.webp",
      ],
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://eternityhvacr.com/" },
        { "@type": "ListItem", position: 2, name: "Areas We Serve", item: "https://eternityhvacr.com/areas-we-serve" },
        { "@type": "ListItem", position: 3, name: "Euclid, Ohio", item: pageUrl },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map(([question, answer]) => ({
        "@type": "Question",
        name: question,
        acceptedAnswer: { "@type": "Answer", text: answer },
      })),
    },
    {
      "@type": "ImageObject",
      contentUrl: "https://eternityhvacr.com/images/euclid/euclid-oh-payne-hvac-installation-1200.webp",
      caption: "Residential HVAC installation completed by Eternity Mechanical in Euclid, Ohio 44123",
      representativeOfPage: true,
      creator: { "@id": "https://eternityhvacr.com/#business" },
    },
    {
      "@type": "ImageObject",
      contentUrl: "https://eternityhvacr.com/images/euclid/euclid-oh-sinclair-furnace-installation-1200.webp",
      caption: "Eternity Mechanical technician beside a completed central-air and furnace installation in Euclid, Ohio 44119",
      creator: { "@id": "https://eternityhvacr.com/#business" },
    },
  ],
};

export default function EuclidServiceAreaPage() {
  return <LocationLanding content={content} schema={schema} />;
}

import type { Metadata } from "next";
import ServiceLanding, { type ServiceLandingContent } from "../../components/ServiceLanding";

export const metadata: Metadata = {
  title: "Boiler Service & Repair | Cleveland, OH | Eternity",
  description: "Boiler diagnostics, service, repair and preventive maintenance for residential and commercial properties throughout Greater Cleveland and Northeast Ohio.",
  alternates: { canonical: "/services/boiler-service" },
  openGraph: {
    title: "Boiler Service & Repair | Eternity Mechanical Services",
    description: "Professional boiler diagnostics, repair and maintenance for Greater Cleveland properties.",
    url: "/services/boiler-service",
  },
};

const content: ServiceLandingContent = {
  slug: "boiler-service",
  eyebrow: "Boiler service",
  title: "Boiler Service and Repair in Greater Cleveland",
  summary: "Boiler diagnostics, repair, operating checks and preventive maintenance for homes, multifamily buildings and commercial properties, backed by owner Bernard Gray's broad HVAC/R and boiler experience.",
  image: "/images/maintenance.jpg",
  imageAlt: "Technician performing mechanical equipment maintenance representing boiler service",
  services: [
    "Boiler operating diagnostics",
    "No-heat and uneven-heating evaluation",
    "Control and electrical checks",
    "Visible leak and equipment-condition review",
    "Boiler repair and maintenance",
    "Repair and replacement planning",
  ],
  customers: ["Homeowners", "Multifamily and apartment properties", "Property managers", "Commercial and community facilities"],
  process: [
    ["Identify the system and symptoms", "Share the boiler type when known, affected areas, observed condition and whether heat is unavailable."],
    ["Evaluate operation", "Controls, electrical components, operating sequence and observable system condition are checked within the approved service scope."],
    ["Explain the findings", "Eternity reviews the observed issue and the available repair, maintenance or replacement path."],
    ["Complete approved work", "Authorized work is completed and system operation is checked before the visit is closed."],
  ],
  guidance: {
    eyebrow: "Boiler warning signs",
    title: "Conditions that deserve professional evaluation",
    items: [
      ["No heat", "A boiler that does not start or cannot maintain the thermostat setting needs systematic control and operating diagnosis."],
      ["Uneven heating", "Cold rooms, inconsistent zones or slow recovery can involve controls, circulation, airflow at connected equipment or system condition."],
      ["Water or unusual noise", "Visible water, repeated pressure concerns or new sounds should be documented and evaluated rather than ignored."],
      ["Repeated resets", "A system that repeatedly locks out or requires resets may have an underlying condition that should be diagnosed before continued operation."],
    ],
  },
  faqs: [
    ["Does Eternity Mechanical Services work on boilers?", "Yes. Owner Bernard Gray has 28 years of industry experience, including boilers, HVAC systems and refrigeration. Eternity provides boiler diagnostics, service, repair and maintenance."],
    ["Do you service boilers in multifamily or commercial properties?", "Yes. Boiler service is available for residential, multifamily, managed and commercial properties, subject to equipment and appointment availability."],
    ["Is a visible boiler leak an emergency?", "Shut down the equipment if it can be done safely, avoid hot water or steam, and call for guidance. Active leaks, loss of heat, unusual odors or unsafe conditions should be treated promptly."],
    ["Do you publish boiler repair prices online?", "No. Boiler service depends on the equipment, findings and approved scope. Eternity explains applicable pricing before approved work begins."],
  ],
};

export default function BoilerServicePage() { return <ServiceLanding content={content} />; }

import type { Metadata } from "next";
import ServiceLanding, { type ServiceLandingContent } from "../../components/ServiceLanding";

export const metadata: Metadata = {
  title: "Commercial HVAC Service | Greater Cleveland | Eternity",
  description: "Commercial HVAC diagnostics, repair, replacement and maintenance for rooftop units, packaged systems and commercial properties throughout Greater Cleveland.",
  alternates: { canonical: "/services/commercial-hvac" },
  openGraph: { title: "Commercial HVAC Service | Eternity Mechanical Services", description: "Professional commercial HVAC diagnostics, repair and maintenance for Greater Cleveland facilities.", url: "/services/commercial-hvac" },
};

const content: ServiceLandingContent = {
  slug: "commercial-hvac",
  eyebrow: "Commercial HVAC",
  title: "Commercial HVAC Service for Greater Cleveland Facilities",
  summary: "Professional diagnostics, repair, replacement and preventive maintenance for rooftop units, packaged equipment, commercial split systems and controls.",
  image: "/images/commercial-rooftop.jpg",
  imageAlt: "Commercial rooftop HVAC equipment serving a business property",
  services: ["Rooftop-unit diagnostics and repair", "Packaged and split-system service", "Electrical and control evaluation", "Heating and cooling performance checks", "Preventive maintenance", "Replacement and installation planning"],
  customers: ["Retail and office properties", "Restaurants and food service", "Multifamily communities", "Churches and community facilities"],
  process: [["Schedule service", "Tell Eternity which equipment is affected, what the property is experiencing and when help is needed."], ["Diagnose the equipment", "System operation, temperatures, airflow, electrical performance and controls are evaluated."], ["Review options", "Findings and recommended repair or replacement options are discussed before approved work begins."], ["Verify operation", "Approved work is completed professionally and the equipment is checked for proper operation."]],
  caseStudy: {
    href: "/projects/euclid-rooftop-hvac-diagnostic",
    image: "/images/euclid/cleveland-commercial-rooftop-hvac-service-1200.webp",
    imageAlt: "Commercial rooftop HVAC unit opened during diagnostic service in Euclid, Ohio",
    label: "Commercial rooftop diagnostic • Euclid 44119",
    title: "A frozen evaporator did not automatically mean a refrigerant leak.",
    copy: "The owner suspected low refrigerant and a leak. After the coil thawed, Eternity pressure-tested the system and found no leak, while documenting severe blower contamination and missing filtration.",
  },
  faqs: [["What types of commercial HVAC equipment do you service?", "Eternity works with rooftop units, packaged equipment, commercial split systems, controls and related heating and cooling equipment."], ["Do you work with property and facility managers?", "Yes. Commercial service is available for managed properties, multifamily communities, retail, offices, restaurants and community facilities."], ["Can I request emergency commercial HVAC service?", "Yes. Submit the service details online and call 216-703-3183 directly for urgent or system-down situations."], ["How quickly are website requests reviewed?", "Website requests are typically reviewed within 15 minutes during regular business hours. Appointment availability is confirmed directly by Eternity."]],
};

export default function CommercialHvacPage() { return <ServiceLanding content={content} />; }

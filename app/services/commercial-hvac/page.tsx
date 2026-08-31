import type { Metadata } from "next";
import ServiceLanding, { type ServiceLandingContent } from "../../components/ServiceLanding";

export const metadata: Metadata = {
  title: "Commercial HVAC Repair | Cleveland, OH | Eternity",
  description: "Commercial HVAC repair, diagnostics and maintenance for rooftop units, packaged systems and managed properties across Cleveland and Northeast Ohio.",
  alternates: { canonical: "/services/commercial-hvac" },
  openGraph: { title: "Commercial HVAC Repair in Cleveland | Eternity", description: "Rooftop-unit, packaged-system and commercial HVAC diagnostics, repair and maintenance across Greater Cleveland.", url: "/services/commercial-hvac" },
};

const content: ServiceLandingContent = {
  slug: "commercial-hvac",
  eyebrow: "Commercial HVAC",
  title: "Commercial HVAC Repair & Maintenance in Greater Cleveland",
  summary: "Commercial heating and cooling diagnostics, repair, replacement planning and preventive maintenance for Cleveland-area rooftop units, packaged equipment, split systems and controls.",
  image: "/images/commercial-rooftop.jpg",
  imageAlt: "Commercial rooftop HVAC equipment serving a business property",
  capabilitiesTitle: "Commercial HVAC service built around facility operation.",
  capabilitiesCopy: "Eternity evaluates the affected equipment, controls, airflow, temperatures and electrical performance before discussing repair, maintenance or replacement options with the property decision-maker.",
  services: ["Commercial rooftop-unit diagnostics and repair", "Packaged and split-system service", "Electrical and control evaluation", "Heating and cooling performance checks", "Commercial HVAC preventive maintenance", "Replacement and installation planning"],
  customers: ["Retail and office properties", "Restaurants and food service", "Multifamily communities", "Churches and community facilities"],
  process: [["Schedule service", "Tell Eternity which equipment is affected, what the property is experiencing and when help is needed."], ["Diagnose the equipment", "System operation, temperatures, airflow, electrical performance and controls are evaluated."], ["Review options", "Findings and recommended repair or replacement options are discussed before approved work begins."], ["Verify operation", "Approved work is completed professionally and the equipment is checked for proper operation."]],
  guidance: {
    eyebrow: "When to request commercial HVAC service",
    title: "Facility symptoms worth investigating early.",
    items: [["No heating or cooling", "A system-down rooftop or packaged unit needs equipment-specific testing before parts or refrigerant are recommended."], ["Short cycling", "Frequent starts and stops can involve controls, airflow, electrical components, load conditions or refrigeration-system operation."], ["Uneven temperatures", "Persistent hot or cold areas may point to airflow, zoning, control or equipment-capacity conditions that should be measured."], ["Recurring service calls", "Repeated symptoms deserve a documented diagnostic review so the property team can compare repair, maintenance and replacement options."]],
  },
  caseStudy: {
    href: "/projects/euclid-rooftop-hvac-diagnostic",
    image: "/images/euclid/cleveland-commercial-rooftop-hvac-service-1200.webp",
    imageAlt: "Commercial rooftop HVAC unit opened during diagnostic service in Euclid, Ohio",
    label: "Commercial rooftop diagnostic • Euclid 44119",
    title: "A frozen evaporator did not automatically mean a refrigerant leak.",
    copy: "The owner suspected low refrigerant and a leak. After the coil thawed, Eternity pressure-tested the system and found no leak, while documenting severe blower contamination and missing filtration.",
  },
  relatedGuides: [
    {
      href: "/resources/rooftop-hvac-short-cycling",
      title: "What causes a rooftop HVAC unit to short-cycle?",
      copy: "Understand common control, airflow, electrical, sizing and refrigeration-system causes before replacing parts based on one symptom.",
    },
  ],
  faqs: [["What types of commercial HVAC equipment do you service?", "Eternity works with rooftop units, packaged equipment, commercial split systems, controls and related heating and cooling equipment."], ["Where is commercial HVAC service available?", "Commercial HVAC service is available across approved Greater Cleveland and Northeast Ohio cities. Check the property ZIP code on the service-area page or contact Eternity to confirm coverage."], ["Do you work with property and facility managers?", "Yes. Commercial service is available for managed properties, multifamily communities, retail, offices, restaurants and community facilities."], ["Can I request emergency commercial HVAC service?", "Yes. Submit the service details online and call 216-703-3183 directly for urgent or system-down situations."], ["How quickly are website requests reviewed?", "Website requests are typically reviewed within 15 minutes during regular business hours. Appointment availability is confirmed directly by Eternity."]],
};

export default function CommercialHvacPage() { return <ServiceLanding content={content} />; }

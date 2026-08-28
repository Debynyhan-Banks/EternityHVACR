import type { Metadata } from "next";
import ServiceLanding, { type ServiceLandingContent } from "../../components/ServiceLanding";

export const metadata: Metadata = {
  title: "AC Repair | Cleveland, OH | Eternity",
  description: "Air-conditioning diagnostics and repair for homes, multifamily properties and businesses throughout Greater Cleveland and Northeast Ohio.",
  alternates: { canonical: "/services/air-conditioning-repair" },
  openGraph: {
    title: "Air-Conditioning Repair | Eternity Mechanical Services",
    description: "Measured air-conditioning diagnostics and repair throughout Greater Cleveland.",
    url: "/services/air-conditioning-repair",
  },
};

const content: ServiceLandingContent = {
  slug: "air-conditioning-repair",
  eyebrow: "Air-conditioning repair",
  title: "Air-Conditioning Repair in Greater Cleveland",
  summary: "Diagnostics and repair for no-cooling calls, short cycling, weak airflow, water around equipment, thermostat concerns and other central-air problems.",
  image: "/images/residential-hvac.jpg",
  imageAlt: "Residential heating and cooling equipment representing air-conditioning repair in Greater Cleveland",
  services: [
    "No-cooling and intermittent-cooling diagnostics",
    "Central-air repair and seasonal service",
    "Short-cycling and operating-condition evaluation",
    "Thermostat, electrical and control evaluation",
    "Airflow and filter review",
    "Condensate drainage and visible water concerns",
  ],
  customers: ["Homeowners", "Multifamily communities", "Property managers", "Commercial and community facilities"],
  process: [
    ["Describe the cooling problem", "Share the symptoms, equipment type, timing and whether the system has stopped cooling completely."],
    ["Inspect and test", "The thermostat call, electrical operation, temperatures, airflow and observable equipment condition are evaluated."],
    ["Review the findings", "The observed problem, repair options and applicable pricing are explained before approved work begins."],
    ["Complete and verify", "Approved work is completed and system operation is checked before closeout."],
  ],
  guidance: {
    eyebrow: "Cooling warning signs",
    title: "When should an air conditioner be checked?",
    items: [
      ["No cooling", "The system runs but the property is not cooling, or no conditioned air reaches the occupied space."],
      ["Short cycling", "The equipment starts and stops repeatedly instead of completing a normal operating cycle."],
      ["Weak or uneven airflow", "Some rooms receive little airflow, or comfort changes significantly across the property."],
      ["Water or unusual noise", "Visible water near indoor equipment or a new mechanical or electrical noise should be evaluated."],
    ],
  },
  faqs: [
    ["What should I check before requesting AC repair?", "Confirm the thermostat is set to cooling and check whether the system has power without opening equipment panels. If cooling is still unavailable, share the symptoms and call 216-703-3183 when the situation is urgent."],
    ["Do you repair central air-conditioning systems?", "Yes. Eternity provides central-air diagnostics, repair, seasonal service and replacement planning for residential, multifamily and commercial properties."],
    ["Can I text for AC service?", "Yes. Texts to 216-703-3183 are monitored 24/7 with a 15-minute reply target. That is a reply target, not an arrival-time promise. Call directly when the situation is urgent."],
    ["Which areas do you serve?", "Eternity serves approved communities throughout Greater Cleveland and Northeast Ohio. Use the Areas We Serve page or ZIP-code checker to confirm coverage."],
  ],
};

export default function AirConditioningRepairPage() { return <ServiceLanding content={content} />; }

import type { Metadata } from "next";
import ServiceLanding, { type ServiceLandingContent } from "../../components/ServiceLanding";

export const metadata: Metadata = {
  title: "Emergency HVAC/R Service | Cleveland, OH | Eternity",
  description: "Urgent HVAC and refrigeration diagnostics for system-down and time-sensitive equipment problems throughout Greater Cleveland. Call to confirm availability.",
  alternates: { canonical: "/services/emergency-hvac-r" },
  openGraph: {
    title: "Emergency HVAC/R Service | Eternity Mechanical Services",
    description: "Urgent HVAC and refrigeration diagnostics with service availability confirmed case by case.",
    url: "/services/emergency-hvac-r",
  },
};

const content: ServiceLandingContent = {
  slug: "emergency-hvac-r",
  eyebrow: "Emergency HVAC/R service",
  title: "Emergency HVAC and Refrigeration Service in Greater Cleveland",
  summary: "Urgent diagnostics and repair planning for no-heat, no-cooling, refrigeration-temperature and system-down problems. Call 216-703-3183 to confirm current service availability.",
  image: "/images/hero-technician-black.jpg",
  imageAlt: "HVAC technician representing urgent heating, cooling and refrigeration service in Greater Cleveland",
  services: [
    "No-heat and no-cooling diagnostics",
    "Refrigeration temperature and icing concerns",
    "Rooftop and packaged-equipment system-down calls",
    "Thermostat, electrical and control evaluation",
    "Visible drainage or equipment-water concerns",
    "Urgent repair and replacement-scope review",
  ],
  customers: ["Homeowners and tenants", "Multifamily and property managers", "Restaurants and retail", "Commercial and community facilities"],
  process: [
    ["Call or text Eternity", "Describe the affected equipment, symptoms, property location and any immediate safety concern. Call for the most urgent situations."],
    ["Confirm availability and next steps", "Eternity reviews the request and confirms current service availability; texting response time is not an arrival-time guarantee."],
    ["Diagnose the equipment", "Operating conditions and observable system evidence are evaluated before a repair is recommended."],
    ["Review and complete approved work", "Findings, options and applicable pricing are explained before approved work begins and operation is checked at closeout."],
  ],
  guidance: {
    eyebrow: "Safety first",
    title: "When should you stop and seek immediate help?",
    items: [
      ["Gas odor or carbon-monoxide alarm", "Leave the property and contact 911 or the gas utility from a safe location. Do not wait for an HVAC appointment."],
      ["Smoke, sparking or active fire", "Move to safety and call 911. Do not touch the equipment or attempt an internal repair."],
      ["Active water near electrical equipment", "Keep away from the affected area and call for guidance. Do not enter standing water or open equipment panels."],
      ["Temperature-sensitive inventory", "Follow the operation's food-safety, product-handling or inventory-protection procedures while service availability is confirmed."],
    ],
  },
  faqs: [
    ["Is technician arrival guaranteed 24/7?", "No. Texts are monitored 24/7 with a 15-minute reply target, but that is not an arrival-time or service-availability guarantee. Call 216-703-3183 to confirm current availability for an urgent situation."],
    ["Should I call or text for an HVAC/R emergency?", "Call for an immediate safety concern or a system-down situation. Texts are monitored 24/7 and are useful for sharing equipment details, but a text reply is not a confirmed appointment or arrival time."],
    ["What equipment can you evaluate?", "Eternity works with residential and commercial heating, cooling, rooftop HVAC and commercial refrigeration equipment. Current availability and the specific scope are confirmed directly."],
    ["What should I include in the first message?", "Include the property city or ZIP code, equipment type, symptoms, when the problem began and whether there is a safety, temperature or inventory concern. Do not send sensitive payment or identity information by text."],
  ],
};

export default function EmergencyHvacrPage() { return <ServiceLanding content={content} />; }

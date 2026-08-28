import type { Metadata } from "next";
import ServiceLanding, { type ServiceLandingContent } from "../../components/ServiceLanding";

export const metadata: Metadata = {
  title: "Commercial Refrigeration Service | Greater Cleveland | Eternity",
  description: "Commercial refrigeration diagnostics, repair and preventive maintenance for walk-ins, cold storage and controls throughout Greater Cleveland and Northeast Ohio.",
  alternates: { canonical: "/services/commercial-refrigeration" },
  openGraph: { title: "Commercial Refrigeration Service | Eternity Mechanical Services", description: "Responsive diagnostics, repair and maintenance for the refrigeration systems your operation depends on.", url: "/services/commercial-refrigeration" },
};

const content: ServiceLandingContent = {
  slug: "commercial-refrigeration",
  eyebrow: "Commercial refrigeration",
  title: "Commercial Refrigeration Service in Greater Cleveland",
  summary: "Diagnostics, repair and preventive maintenance for walk-in coolers, cold-storage equipment, refrigeration controls and temperature-dependent operations.",
  image: "/images/walk-in-cold-storage.jpg",
  imageAlt: "Commercial walk-in cold storage room with refrigeration equipment",
  services: ["Walk-in cooler and freezer service", "Temperature and operating diagnostics", "Electrical and control evaluation", "Cold-storage equipment service", "Preventive maintenance", "Repair and replacement planning"],
  customers: ["Restaurants and food service", "Retail and grocery operations", "Cold-storage facilities", "Property and facility managers"],
  process: [["Describe the problem", "Share the affected equipment, temperature condition, timing and access details."], ["Evaluate the system", "Operating conditions, electrical performance, controls and equipment condition are checked."], ["Review the findings", "The observed problem and recommended next steps are explained before approved work begins."], ["Complete and verify", "Approved work is completed and system operation is checked before closeout."]],
  relatedGuides: [
    {
      href: "/resources/walk-in-cooler-icing-up",
      title: "Why is my walk-in cooler icing up?",
      copy: "Review common causes of evaporator ice, safe observations to make and the conditions that call for professional refrigeration diagnostics.",
    },
    {
      href: "/resources/commercial-refrigeration-maintenance-frequency",
      title: "How often should commercial refrigeration be maintained?",
      copy: "Learn how equipment type, operating load, environment and service history shape an appropriate maintenance schedule.",
    },
  ],
  faqs: [["Do you service walk-in coolers and freezers?", "Yes. Eternity provides commercial refrigeration diagnostics, repair and maintenance for walk-ins and other cold-storage equipment."], ["Can I request urgent refrigeration service?", "Yes. Submit the equipment details through the website, and call 216-703-3183 directly when the system is down or the situation is urgent."], ["Which areas do you serve?", "Eternity serves Greater Cleveland and surrounding Northeast Ohio communities. Review the Areas We Serve page for the approved city and ZIP-code list."], ["How quickly are website requests reviewed?", "Website requests are typically reviewed within 15 minutes during regular business hours. Appointment availability is confirmed directly by Eternity."]],
};

export default function CommercialRefrigerationPage() { return <ServiceLanding content={content} />; }

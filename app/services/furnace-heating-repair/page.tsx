import type { Metadata } from "next";
import ServiceLanding, { type ServiceLandingContent } from "../../components/ServiceLanding";

export const metadata: Metadata = {
  title: "Furnace & Heating Repair | Cleveland, OH | Eternity",
  description: "Furnace and heating diagnostics, repair, installation and replacement for homes, multifamily properties and businesses throughout Greater Cleveland.",
  alternates: { canonical: "/services/furnace-heating-repair" },
  openGraph: {
    title: "Furnace & Heating Repair | Eternity Mechanical Services",
    description: "Measured furnace and heating diagnostics, repair and replacement planning throughout Greater Cleveland.",
    url: "/services/furnace-heating-repair",
  },
};

const content: ServiceLandingContent = {
  slug: "furnace-heating-repair",
  eyebrow: "Furnace & heating service",
  title: "Furnace and Heating Repair in Greater Cleveland",
  summary: "No-heat diagnostics, furnace repair, heating-system installation, replacement planning and preventive maintenance for homes, multifamily properties and businesses.",
  image: "/images/residential-hvac.jpg",
  imageAlt: "Residential heating and cooling equipment representing furnace service in Greater Cleveland",
  services: [
    "No-heat and intermittent-heating diagnostics",
    "Furnace repair and maintenance",
    "Heating-system installation and replacement",
    "Thermostat and control evaluation",
    "Airflow and filter review",
    "Electrical and operating-safety checks",
  ],
  customers: ["Homeowners", "Multifamily communities", "Property managers", "Commercial and community facilities"],
  process: [
    ["Describe the heating problem", "Share the symptoms, equipment type, timing and whether the property has lost heat completely."],
    ["Inspect and test", "The heating sequence, thermostat call, electrical components, airflow and observable equipment condition are evaluated."],
    ["Review repair or replacement options", "Findings and practical next steps are explained before approved work begins."],
    ["Complete and verify", "Approved work is completed and the heating system is checked for proper operation before closeout."],
  ],
  caseStudy: {
    href: "/projects/euclid-central-air-installation",
    image: "/images/euclid/euclid-oh-sinclair-furnace-installation-1200.webp",
    imageAlt: "Completed high-efficiency furnace and central-air installation in Euclid, Ohio",
    label: "Furnace and central-air installation • Euclid 44119",
    title: "A documented replacement for a furnace more than 40 years old.",
    copy: "Eternity completed a matched heating and cooling installation with an 80,000 BTU, 96% efficiency furnace and a 3-ton central-air system. No unmeasured savings or performance result is claimed.",
  },
  guidance: {
    eyebrow: "Heating decisions",
    title: "What changes the repair-versus-replacement decision?",
    items: [
      ["Safety and condition", "Unsafe operation, heat-exchanger concerns and the condition of major components require careful evaluation before continued use."],
      ["Repair scope", "A limited, supportable repair is a different decision from repeated failures or several deteriorated components."],
      ["Equipment age", "Age matters, but it is one factor alongside condition, repair history, comfort and the cost of the proposed work."],
      ["Property needs", "Homeowners and property managers may weigh reliability, tenant impact and planned capital work differently."],
    ],
  },
  faqs: [
    ["What should I do if the furnace stops producing heat?", "Check the thermostat setting and whether the system has power without opening equipment panels. If heat is still unavailable, submit the symptoms and call 216-703-3183 for urgent service."],
    ["Do you repair and replace furnaces?", "Yes. Eternity provides furnace diagnostics, repair, maintenance, installation and replacement planning for residential, multifamily and commercial properties."],
    ["How do I decide between furnace repair and replacement?", "The decision should consider safety, equipment condition, repair scope, age, failure history and property needs. Eternity explains the observed findings before recommending approved work."],
    ["Which areas do you serve?", "Eternity serves approved communities throughout Greater Cleveland and Northeast Ohio. Use the Areas We Serve page or ZIP-code checker to confirm coverage."],
  ],
};

export default function FurnaceHeatingRepairPage() { return <ServiceLanding content={content} />; }

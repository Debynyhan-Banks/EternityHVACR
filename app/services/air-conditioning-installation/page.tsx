import type { Metadata } from "next";
import ServiceLanding, { type ServiceLandingContent } from "../../components/ServiceLanding";

export const metadata: Metadata = {
  title: "AC Installation & Replacement | Cleveland, OH | Eternity",
  description: "Air-conditioning installation and replacement planning for homes, multifamily properties and businesses throughout Greater Cleveland.",
  alternates: { canonical: "/services/air-conditioning-installation" },
  openGraph: {
    title: "AC Installation & Replacement | Eternity Mechanical Services",
    description: "Central-air installation and replacement planning based on the property, existing equipment and approved scope.",
    url: "/services/air-conditioning-installation",
  },
};

const content: ServiceLandingContent = {
  slug: "air-conditioning-installation",
  eyebrow: "AC installation & replacement",
  title: "Air-Conditioning Installation and Replacement in Greater Cleveland",
  summary: "Central-air installation, replacement planning and matched heating-and-cooling system work for homes, multifamily properties and commercial spaces.",
  image: "/images/euclid/euclid-oh-residential-condenser-installation-1200.webp",
  imageAlt: "Residential air-conditioning condenser installed by Eternity Mechanical Services in Euclid, Ohio",
  services: [
    "Central-air installation and replacement",
    "Existing-equipment and site review",
    "Matched indoor and outdoor equipment planning",
    "Evaporator-coil and condenser installation",
    "Thermostat and control coordination",
    "Startup checks and operating verification",
  ],
  customers: ["Homeowners", "Multifamily communities", "Property managers", "Commercial and community facilities"],
  process: [
    ["Discuss the property needs", "Review comfort concerns, project timing, existing equipment and the spaces the system serves."],
    ["Evaluate the existing system", "Equipment condition, available site information, electrical needs and installation constraints are reviewed."],
    ["Review the proposed scope", "Equipment and installation options, the defined scope and applicable pricing are explained before approval."],
    ["Install and verify", "Approved equipment is installed and the completed system is checked for proper operation before closeout."],
  ],
  caseStudy: {
    href: "/projects/euclid-central-air-installation",
    image: "/images/euclid/euclid-oh-sinclair-furnace-installation-1200.webp",
    imageAlt: "Completed central-air and high-efficiency furnace installation in Euclid, Ohio",
    label: "Central air and furnace installation • Euclid 44119",
    title: "A documented matched-system installation in Euclid.",
    copy: "Eternity completed an 80,000 BTU, 96% efficiency furnace and 3-ton central-air installation. The case study documents equipment and scope without claiming unmeasured energy savings.",
  },
  guidance: {
    eyebrow: "Replacement planning",
    title: "What shapes an air-conditioning replacement?",
    items: [
      ["Equipment condition", "The condition and repair history of the existing system help frame whether repair or replacement deserves consideration."],
      ["Property requirements", "The occupied space, comfort concerns and installation conditions affect the proposed scope."],
      ["Matched equipment", "Indoor and outdoor equipment, controls and related components should be considered as one operating system."],
      ["Defined scope", "Equipment, included work, assumptions and applicable pricing should be clear before the installation begins."],
    ],
  },
  faqs: [
    ["Do you install and replace central air-conditioning systems?", "Yes. Eternity provides central-air installation, replacement planning and matched heating-and-cooling system work throughout the approved service area."],
    ["Can you replace both heating and cooling equipment?", "Yes. Eternity installs and replaces furnaces, central-air systems and other HVAC equipment. The recommended scope depends on the existing system and property needs."],
    ["Do you publish a standard AC replacement price?", "No. Equipment, site conditions and installation scope vary. Eternity reviews the proposed work and applicable pricing before approved work begins."],
    ["Which areas do you serve?", "Eternity serves approved communities throughout Greater Cleveland and Northeast Ohio. Use the Areas We Serve page or ZIP-code checker to confirm coverage."],
  ],
};

export default function AirConditioningInstallationPage() { return <ServiceLanding content={content} />; }

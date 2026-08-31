import type { Metadata } from "next";
import ServiceLanding, { type ServiceLandingContent } from "../../components/ServiceLanding";

export const metadata: Metadata = {
  title: "HVAC Maintenance | Cleveland, OH | Eternity",
  description: "Residential and commercial HVAC preventive maintenance for furnaces, air conditioners, rooftop units and refrigeration equipment across Greater Cleveland.",
  alternates: { canonical: "/services/preventive-maintenance" },
  openGraph: { title: "HVAC Maintenance in Cleveland | Eternity", description: "Planned heating, cooling and refrigeration inspections with operating measurements and documented recommendations.", url: "/services/preventive-maintenance" },
};

const content: ServiceLandingContent = {
  slug: "preventive-maintenance",
  eyebrow: "Preventive maintenance",
  title: "HVAC Preventive Maintenance in Greater Cleveland",
  summary: "Planned inspection and maintenance for furnaces, air conditioners, heat pumps, rooftop units and commercial refrigeration equipment serving Cleveland-area homes and properties.",
  image: "/images/maintenance.jpg",
  imageAlt: "Technician performing planned HVAC preventive maintenance",
  capabilitiesTitle: "Preventive maintenance for heating, cooling and refrigeration equipment.",
  capabilitiesCopy: "The visit is matched to the equipment and property. Eternity documents observed conditions and operating checks so homeowners and facility teams can plan appropriate follow-up.",
  services: ["Heating and cooling equipment inspection", "Electrical testing", "Heating and cooling performance checks", "Coil, filter and airflow review", "Commercial refrigeration operating checks", "Documented maintenance recommendations"],
  customers: ["Homeowners", "Commercial facilities", "Multifamily and managed properties", "Temperature-dependent operations"],
  process: [["Identify the equipment", "Share the property type, equipment and current maintenance needs."], ["Inspect and measure", "Key operating conditions, electrical components, airflow and equipment condition are reviewed."], ["Document findings", "Observed conditions and recommended next steps are organized for a clear maintenance decision."], ["Plan follow-up", "Eternity confirms approved maintenance work and any needed repair or replacement follow-up."]],
  guidance: {
    eyebrow: "Planning maintenance",
    title: "Choose timing based on the equipment and property.",
    items: [["Before heating season", "Furnaces, boilers and heat pumps can be reviewed before sustained cold weather increases operating demand."], ["Before cooling season", "Air conditioners, heat pumps and rooftop cooling equipment can be checked before peak summer operation."], ["On a commercial schedule", "Facilities and temperature-dependent operations may need recurring visits based on equipment condition, usage, environment and operational risk."], ["After a performance change", "New noise, short cycling, weak airflow, uneven temperatures or rising operating concerns should be described when maintenance is requested."]],
  },
  relatedGuides: [{ href: "/resources/commercial-refrigeration-maintenance-frequency", title: "How often should commercial refrigeration be maintained?", copy: "Learn how equipment condition, usage, environment and operational risk shape an appropriate maintenance interval." }],
  faqs: [["Is maintenance available for residential and commercial equipment?", "Yes. Eternity provides preventive-maintenance pathways for homes, businesses, multifamily communities and managed properties across approved Greater Cleveland service areas."], ["How often should HVAC equipment receive maintenance?", "The appropriate interval depends on the equipment, manufacturer guidance, operating hours, environment and condition. Residential systems are commonly reviewed around seasonal changeovers, while commercial equipment may require a more frequent property-specific schedule."], ["What is included in a maintenance visit?", "The scope depends on the equipment, but may include operating checks, electrical testing, heating and cooling performance, airflow, filters, coils and documented recommendations."], ["Do you publish maintenance-plan pricing online?", "Not yet. Request maintenance pricing with the property and equipment details so Eternity can confirm the appropriate scope."], ["How quickly are website requests reviewed?", "Website requests are typically reviewed within 15 minutes during regular business hours. Appointment availability is confirmed directly by Eternity."]],
};

export default function PreventiveMaintenancePage() { return <ServiceLanding content={content} />; }

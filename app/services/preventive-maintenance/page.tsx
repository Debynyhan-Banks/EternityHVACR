import type { Metadata } from "next";
import ServiceLanding, { type ServiceLandingContent } from "../../components/ServiceLanding";

export const metadata: Metadata = {
  title: "HVAC Preventive Maintenance | Greater Cleveland | Eternity",
  description: "Preventive HVAC and refrigeration maintenance for homes, businesses and managed properties throughout Greater Cleveland and Northeast Ohio.",
  alternates: { canonical: "/services/preventive-maintenance" },
  openGraph: { title: "Preventive Maintenance | Eternity Mechanical Services", description: "Planned HVAC and refrigeration inspections, measurements and documented recommendations.", url: "/services/preventive-maintenance" },
};

const content: ServiceLandingContent = {
  slug: "preventive-maintenance",
  eyebrow: "Preventive maintenance",
  title: "HVAC and Refrigeration Maintenance Before Problems Become Emergencies",
  summary: "Planned inspections, operating measurements and documented recommendations for residential, commercial and multifamily equipment throughout Greater Cleveland.",
  image: "/images/maintenance.jpg",
  imageAlt: "Technician performing planned HVAC preventive maintenance",
  services: ["System and equipment inspection", "Electrical testing", "Heating and cooling performance checks", "Coil, filter and airflow review", "Refrigeration operating checks", "Documented maintenance recommendations"],
  customers: ["Homeowners", "Commercial facilities", "Multifamily and managed properties", "Temperature-dependent operations"],
  process: [["Identify the equipment", "Share the property type, equipment and current maintenance needs."], ["Inspect and measure", "Key operating conditions, electrical components, airflow and equipment condition are reviewed."], ["Document findings", "Observed conditions and recommended next steps are organized for a clear maintenance decision."], ["Plan follow-up", "Eternity confirms approved maintenance work and any needed repair or replacement follow-up."]],
  faqs: [["Is maintenance available for residential and commercial equipment?", "Yes. Eternity provides preventive-maintenance pathways for homes, businesses, multifamily communities and managed properties."], ["What is included in a maintenance visit?", "The scope depends on the equipment, but may include operating checks, electrical testing, heating and cooling performance, airflow, filters, coils and documented recommendations."], ["Do you publish maintenance-plan pricing online?", "Not yet. Request maintenance pricing with the property and equipment details so Eternity can confirm the appropriate scope."], ["How quickly are website requests reviewed?", "Website requests are typically reviewed within 15 minutes during regular business hours. Appointment availability is confirmed directly by Eternity."]],
};

export default function PreventiveMaintenancePage() { return <ServiceLanding content={content} />; }

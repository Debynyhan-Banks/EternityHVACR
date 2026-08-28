import type { Metadata } from "next";
import ServiceLanding, { type ServiceLandingContent } from "../../components/ServiceLanding";

export const metadata: Metadata = {
  title: "Heat Pump Service & Repair | Cleveland, OH | Eternity",
  description: "Heat-pump diagnostics, repair, maintenance, installation and replacement for Greater Cleveland homes, multifamily properties and businesses.",
  alternates: { canonical: "/services/heat-pump-service" },
  openGraph: {
    title: "Heat Pump Service & Repair | Eternity Mechanical Services",
    description: "Heating and cooling diagnostics, repair and maintenance for heat-pump systems throughout Greater Cleveland.",
    url: "/services/heat-pump-service",
  },
};

const content: ServiceLandingContent = {
  slug: "heat-pump-service",
  eyebrow: "Heat pump service",
  title: "Heat Pump Service and Repair in Greater Cleveland",
  summary: "Heating and cooling diagnostics, repair, preventive maintenance, installation and replacement planning for heat-pump systems serving homes, multifamily properties and businesses.",
  image: "/images/hero-technician-black.jpg",
  imageAlt: "HVAC technician evaluating controls during heat-pump service",
  services: [
    "Heat-pump heating and cooling diagnostics",
    "System repair and maintenance",
    "Thermostat and control evaluation",
    "Electrical and operating checks",
    "Airflow and filter review",
    "Installation and replacement planning",
  ],
  customers: ["Homeowners", "Multifamily communities", "Property managers", "Commercial and light-commercial properties"],
  process: [
    ["Describe the operating problem", "Share whether the issue affects heating, cooling or both, along with thermostat behavior and timing."],
    ["Test the system", "The operating mode, controls, electrical performance, temperatures, airflow and equipment condition are evaluated."],
    ["Review the diagnosis", "Observed findings and appropriate repair, maintenance or replacement options are explained."],
    ["Verify approved work", "After approved work is completed, the available operating modes are checked within the service scope."],
  ],
  guidance: {
    eyebrow: "Heat-pump symptoms",
    title: "Heating and cooling problems can share the same equipment.",
    items: [
      ["Runs without reaching temperature", "Long operation can involve controls, airflow, equipment condition, outdoor conditions or the available system capacity."],
      ["Switches modes incorrectly", "Thermostat, control or reversing-operation concerns require diagnosis rather than an assumed component replacement."],
      ["Outdoor unit is not operating", "Electrical, control and equipment conditions should be checked before deciding what failed."],
      ["Higher energy use", "A change in operating time can justify maintenance and performance checks, but energy savings should not be promised without measurement."],
    ],
  },
  faqs: [
    ["Can Eternity service a heat pump that is not heating?", "Yes. Eternity evaluates heat-pump operation, controls, electrical performance, temperatures, airflow and equipment condition before recommending approved work."],
    ["Do heat pumps provide both heating and cooling?", "Many heat-pump systems provide both. Share which mode is affected so the service request can be routed with the right equipment details."],
    ["Do you install or replace heat pumps?", "Yes. Eternity provides heat-pump installation and replacement planning after confirming the property, equipment needs and approved scope."],
    ["Can I request urgent heat-pump service?", "Yes. Submit the equipment details online and call 216-703-3183 directly when the property has lost heating or cooling or the situation is urgent."],
  ],
};

export default function HeatPumpServicePage() { return <ServiceLanding content={content} />; }

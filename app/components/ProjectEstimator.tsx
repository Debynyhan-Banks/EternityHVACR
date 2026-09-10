"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const serviceOptions = [
  "Air conditioning",
  "Furnace or heating",
  "Boiler",
  "Heat pump",
  "Commercial HVAC",
  "Commercial refrigeration",
] as const;

const needOptions = [
  "Repair or diagnostic",
  "Replacement planning",
  "New installation",
  "Preventive maintenance",
] as const;

const propertyOptions = ["Home", "Business", "Managed property"] as const;

function sendEstimateEvent(service: string, need: string, property: string) {
  if (typeof window === "undefined") return;
  const dataLayer = (window as Window & { dataLayer?: Array<Record<string, string>> }).dataLayer;
  dataLayer?.push({
    event: "project_estimator_completed",
    estimator_service: service,
    estimator_need: need,
    estimator_property: property,
  });
}

export default function ProjectEstimator() {
  const [service, setService] = useState<(typeof serviceOptions)[number]>("Air conditioning");
  const [need, setNeed] = useState<(typeof needOptions)[number]>("Repair or diagnostic");
  const [property, setProperty] = useState<(typeof propertyOptions)[number]>("Home");
  const [complete, setComplete] = useState(false);

  const result = useMemo(() => {
    const isCommercial = property !== "Home" || service.startsWith("Commercial");
    if (need === "Repair or diagnostic") {
      return {
        title: isCommercial ? "Commercial diagnostic review" : "On-site diagnostic visit",
        timing: "Start with observed conditions and system measurements",
        details: ["Equipment and operating-condition review", "Measurements appropriate to the system", "Repair options explained before approved work"],
      };
    }
    if (need === "Preventive maintenance") {
      return {
        title: isCommercial ? "Commercial maintenance review" : "Maintenance visit",
        timing: "Confirm equipment count, access and service history",
        details: ["System and equipment inventory", "Inspection and maintenance scope", "Recommendations based on observed conditions"],
      };
    }
    return {
      title: isCommercial ? "Site and replacement planning review" : "Installation or replacement estimate",
      timing: "A site visit is needed before final scope and pricing",
      details: ["Existing equipment and installation conditions", "Capacity, airflow and electrical considerations", "Written options after the site review"],
    };
  }, [need, property, service]);

  return (
    <div className="estimator-card">
      <div className="estimator-fields">
        <label>
          <span>1. Property</span>
          <select value={property} onChange={(event) => { setProperty(event.target.value as typeof property); setComplete(false); }}>
            {propertyOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label>
          <span>2. System or service</span>
          <select value={service} onChange={(event) => { setService(event.target.value as typeof service); setComplete(false); }}>
            {serviceOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
        <label>
          <span>3. What do you need?</span>
          <select value={need} onChange={(event) => { setNeed(event.target.value as typeof need); setComplete(false); }}>
            {needOptions.map((option) => <option key={option}>{option}</option>)}
          </select>
        </label>
      </div>
      <button className="btn btn-orange estimator-submit" type="button" onClick={() => { setComplete(true); sendEstimateEvent(service, need, property); }}>
        Build my planning estimate <span aria-hidden="true">→</span>
      </button>

      {complete && (
        <section className="estimator-result" aria-live="polite">
          <p className="kicker">Recommended next step</p>
          <h2>{result.title}</h2>
          <strong>{result.timing}</strong>
          <ul>{result.details.map((detail) => <li key={detail}>✓ {detail}</li>)}</ul>
          <div className="hero-actions">
            <a className="btn" href="https://eternityhvacr.com/#schedule">Request this service <span>↗</span></a>
            <Link className="btn-outline" href="/second-opinion">Upload a second opinion <span>→</span></Link>
          </div>
        </section>
      )}
    </div>
  );
}

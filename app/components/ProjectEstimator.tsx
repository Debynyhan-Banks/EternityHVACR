"use client";

import Link from "next/link";
import { useState } from "react";
import { trackGoogleEvent } from "./Analytics";

const projectOptions = [
  {
    id: "direct-furnace-swap",
    icon: "HEAT",
    shortLabel: "Furnace swap",
    label: "Direct furnace swap",
    title: "Direct furnace swap",
    priceLabel: "Estimated baseline range",
    price: "$2,800–$3,400",
    context: "80% AFUE standard swap",
    details: ["Complete unit removal", "Licensed installation", "Transition sheet metal", "Safety test"],
    serviceHref: "/services/furnace-heating-repair",
  },
  {
    id: "boiler-conversion-attic-forced-air",
    icon: "ATTIC",
    shortLabel: "Attic conversion",
    label: "Boiler conversion / full attic forced air",
    title: "Boiler conversion / full attic forced air",
    priceLabel: "Estimated baseline range",
    price: "$6,800–$8,200",
    context: "Ideal for duplex investors separating tenant utilities",
    details: ["Complete rough-in", "Horizontal attic furnace", "R-8 flex ductwork", "B-vent roof penetration and utility extensions"],
    serviceHref: "/services/furnace-heating-repair",
  },
  {
    id: "furnace-condenser-coil",
    icon: "FULL",
    shortLabel: "Complete system",
    label: "Furnace, condenser and coil",
    title: "Furnace, condenser and coil",
    priceLabel: "Estimated starting price",
    price: "As low as $7,500",
    context: "Complete heating and cooling equipment package",
    details: ["Furnace", "Outdoor condenser", "Matching evaporator coil", "Final scope confirmed after the site review"],
    serviceHref: "/services/air-conditioning-installation",
  },
  {
    id: "cooling-condenser-coil",
    icon: "COOL",
    shortLabel: "Cooling only",
    label: "Cooling only: condenser and coil",
    title: "Cooling-only condenser and coil",
    priceLabel: "Estimated starting price",
    price: "As low as $5,000",
    context: "Cooling-only equipment package",
    details: ["Outdoor condenser", "Matching evaporator coil", "Final scope confirmed after the site review"],
    serviceHref: "/services/air-conditioning-installation",
  },
  {
    id: "commercial-rtu",
    icon: "RTU",
    shortLabel: "Commercial RTU",
    label: "Commercial rooftop unit (RTU)",
    title: "Commercial rooftop unit (RTU)",
    priceLabel: "Next step",
    price: "Custom diagnostic & load calculation required",
    context: "Commercial equipment is priced from the verified site and system scope",
    details: ["Equipment and operating-condition review", "Load and capacity requirements", "Roof access, controls and utility conditions", "Written options after the commercial review"],
    serviceHref: "/services/commercial-hvac",
  },
] as const;

type ProjectId = (typeof projectOptions)[number]["id"];

function sendEstimateEvent(event: string, projectId: ProjectId) {
  trackGoogleEvent(event, { estimator_project: projectId });
}

export default function ProjectEstimator() {
  const [projectId, setProjectId] = useState<ProjectId>("direct-furnace-swap");
  const result = projectOptions.find((option) => option.id === projectId) ?? projectOptions[0];
  const scheduleHref = `/?estimateScope=${encodeURIComponent(result.id)}#schedule`;

  return (
    <div className="estimator-card">
      <fieldset className="estimator-choice-fieldset">
        <legend>Choose the project closest to yours</legend>
        <p>Selecting a project updates the planning price immediately.</p>
        <div className="estimator-options">
          {projectOptions.map((option) => (
            <label className={projectId === option.id ? "active" : ""} key={option.id}>
              <input
                type="radio"
                name="estimate-project"
                value={option.id}
                checked={projectId === option.id}
                onChange={() => {
                  setProjectId(option.id);
                  sendEstimateEvent("project_estimator_scope_selected", option.id);
                }}
              />
              <span className="estimator-option-icon" aria-hidden="true">{option.icon}</span>
              <span><strong>{option.shortLabel}</strong><small>{option.label}</small></span>
              <i aria-hidden="true">✓</i>
            </label>
          ))}
        </div>
      </fieldset>

      <section className="estimator-result" aria-live="polite" aria-atomic="true">
        <div className="estimator-result-heading">
          <div>
            <p className="kicker">{result.priceLabel}</p>
            <h2>{result.title}</h2>
            <strong>{result.context}</strong>
          </div>
          <p className="estimator-price">{result.price}</p>
        </div>

        <div className="estimator-result-details">
          <div>
            <h3>What the baseline includes</h3>
            <ul>{result.details.map((detail) => <li key={detail}>✓ {detail}</li>)}</ul>
          </div>
          <div className="estimator-price-factors">
            <h3>What can change the final price</h3>
            <ul><li>Equipment efficiency and model</li><li>Permits or electrical changes</li><li>Access and existing conditions</li><li>Additional installation scope</li></ul>
          </div>
        </div>

        <p className="estimator-result-note">This is a planning price for the scope shown—not a binding quote. Eternity confirms the equipment, property conditions and final written proposal on site.</p>
        <div className="estimator-result-actions">
          <a
            className="btn btn-orange"
            href={scheduleHref}
            onClick={() => sendEstimateEvent("project_estimator_completed", result.id)}
          >
            Schedule a site estimate <span>↗</span>
          </a>
          <button
            className="btn-outline estimator-assistant-button"
            type="button"
            data-open-assistant
            data-assistant-estimate={result.label}
            onClick={() => sendEstimateEvent("project_estimator_assistant_opened", result.id)}
          >
            Ask Eternity about this <span>→</span>
          </button>
        </div>
        <div className="estimator-result-links">
          <Link href={result.serviceHref}>View related service details →</Link>
          <Link href="/second-opinion">Already have a proposal? Upload a private second opinion →</Link>
        </div>
      </section>
    </div>
  );
}

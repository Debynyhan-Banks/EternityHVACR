"use client";

import { useState } from "react";
import { trackGoogleEvent } from "./Analytics";
import ServiceIcon from "./ServiceIcon";

const projectOptions = [
  {
    id: "direct-furnace-swap",
    icon: "HEAT",
    shortLabel: "Furnace swap",
    label: "Direct furnace swap",
    title: "Direct furnace swap",
    priceLabel: "Typical installation labor",
    price: "$1,500–$2,500",
    context: "Equipment, materials and added scope are separate",
    details: ["Furnace changeout labor", "Existing equipment removal", "Standard installation work", "Final equipment and site scope confirmed in writing"],
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
    priceLabel: "Typical installation labor",
    price: "$3,000–$5,000",
    context: "Complete-system equipment and marked-up materials are separate",
    details: ["Furnace, condenser and matching coil", "Complete-system installation labor", "Efficiency and job complexity affect labor", "Historical installed examples appear below"],
    serviceHref: "/services/air-conditioning-installation",
  },
  {
    id: "cooling-condenser-coil",
    icon: "COOL",
    shortLabel: "Cooling only",
    label: "Cooling only: condenser and coil",
    title: "Cooling-only condenser and coil",
    priceLabel: "Typical installation labor",
    price: "$2,000–$3,000",
    context: "Cooling equipment and marked-up materials are separate",
    details: ["Outdoor condenser and matching coil", "Cooling-only installation labor", "Retained furnace must be compatible", "Historical 2.5-ton example appears below"],
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
              <span className="estimator-option-icon"><ServiceIcon name={option.icon} /></span>
              <span><strong>{option.shortLabel}</strong><small>{option.label}</small></span>
              <i aria-hidden="true"><ServiceIcon name="CHECK" /></i>
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
            <h3>{projectId === "commercial-rtu" ? "What the review covers" : "What the baseline includes"}</h3>
            <ul className="estimator-inclusions">{result.details.map((detail) => <li key={detail}><ServiceIcon name="CHECK" /> <span>{detail}</span></li>)}</ul>
          </div>
          <div className="estimator-price-factors">
            <h3>What can change the final price</h3>
            <ul><li>Equipment efficiency and model</li><li>Permits or electrical changes</li><li>Access and existing conditions</li><li>Additional installation scope</li></ul>
          </div>
        </div>

        <p className="estimator-result-note">This is a planning figure for the scope shown—not a binding quote. Where the result is labor only, equipment, materials and added work remain separate. Eternity confirms every final price in a written proposal after reviewing the property.</p>
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
          <a href={result.serviceHref}>View related service details →</a>
          <a href="/second-opinion">Already have a proposal? Upload a private second opinion →</a>
        </div>
      </section>
    </div>
  );
}

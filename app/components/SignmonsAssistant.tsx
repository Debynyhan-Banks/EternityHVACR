"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { trackGoogleEvent } from "./Analytics";

type RequestPath = "urgent" | "cooling" | "heating" | "commercial" | "estimate" | "maintenance";
type PropertyType = "home" | "business" | "managed";
type Screen = "start" | "property" | "handoff" | "safety";

const requestPaths: Array<{ id: RequestPath; title: string; detail: string }> = [
  { id: "urgent", title: "System down or urgent equipment", detail: "No heating, cooling or refrigeration operation" },
  { id: "cooling", title: "Cooling problem", detail: "Air conditioning, heat pump cooling or airflow" },
  { id: "heating", title: "Heating problem", detail: "Furnace, boiler or heat pump heating" },
  { id: "commercial", title: "Commercial HVAC or refrigeration", detail: "Rooftop units, walk-ins, coolers and business systems" },
  { id: "estimate", title: "Installation estimate", detail: "Replacement or new-equipment planning" },
  { id: "maintenance", title: "Preventive maintenance", detail: "Seasonal service or ongoing equipment care" },
];

const propertyTypes: Array<{ id: PropertyType; title: string }> = [
  { id: "home", title: "Home" },
  { id: "business", title: "Business" },
  { id: "managed", title: "Managed or multifamily property" },
];

const pathLabels = Object.fromEntries(requestPaths.map((path) => [path.id, path.title])) as Record<RequestPath, string>;
const propertyLabels = Object.fromEntries(propertyTypes.map((property) => [property.id, property.title])) as Record<PropertyType, string>;

export default function SignmonsAssistant() {
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState<Screen>("start");
  const [requestPath, setRequestPath] = useState<RequestPath | null>(null);
  const [propertyType, setPropertyType] = useState<PropertyType | null>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const launcher = launcherRef.current;
    closeRef.current?.focus();
    const manageDialogKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", manageDialogKeys);
    return () => {
      document.removeEventListener("keydown", manageDialogKeys);
      launcher?.focus();
    };
  }, [open]);

  function openAssistant() {
    setOpen(true);
    trackGoogleEvent("assistant_open", { assistant: "signmons_router" });
  }

  function choosePath(path: RequestPath) {
    setRequestPath(path);
    setScreen("property");
    trackGoogleEvent("assistant_path_selected", { request_path: path });
  }

  function chooseProperty(property: PropertyType) {
    setPropertyType(property);
    setScreen("handoff");
  }

  function showSafety() {
    setScreen("safety");
    trackGoogleEvent("assistant_path_selected", { request_path: "life_safety" });
  }

  function trackHandoff(method: "call" | "text" | "email" | "request_form") {
    trackGoogleEvent("assistant_handoff", {
      handoff_method: method,
      request_path: requestPath ?? "life_safety",
      property_type: propertyType ?? "not_selected",
    });
    if (method === "request_form") setOpen(false);
  }

  function reset() {
    setScreen("start");
    setRequestPath(null);
    setPropertyType(null);
  }

  return <>
    <button
      ref={launcherRef}
      type="button"
      className="signmons-launcher"
      aria-haspopup="dialog"
      aria-expanded={open}
      onClick={openAssistant}
    >
      <span>Ask Eternity</span>
      <small>Automated service assistant</small>
    </button>

    {open && <div className="signmons-overlay">
      <section ref={dialogRef} className="signmons-dialog" role="dialog" aria-modal="true" aria-labelledby="signmons-title" aria-describedby="signmons-disclosure">
        <header className="signmons-header">
          <div>
            <span>Automated service assistant</span>
            <strong id="signmons-title">Ask Eternity</strong>
          </div>
          <button ref={closeRef} type="button" aria-label="Close service assistant" onClick={() => setOpen(false)}>×</button>
        </header>

        <div className="signmons-body">
          <p id="signmons-disclosure" className="signmons-disclosure">
            This Signmons-powered assistant routes requests. It is not a technician, cannot diagnose equipment and does not create an appointment. Do not enter contact, payment or sensitive information here.
          </p>

          {screen === "start" && <>
            <div className="signmons-progress"><span>Step 1 of 2</span><b>Choose the closest match</b></div>
            <button type="button" className="signmons-safety-choice" onClick={showSafety}>
              <strong>Gas, carbon monoxide, fire or electrical danger</strong>
              <span>Show immediate safety guidance</span>
            </button>
            <div className="signmons-choices">
              {requestPaths.map((path) => <button type="button" key={path.id} onClick={() => choosePath(path)}>
                <strong>{path.title}</strong>
                <span>{path.detail}</span>
              </button>)}
            </div>
          </>}

          {screen === "property" && <>
            <div className="signmons-progress"><span>Step 2 of 2</span><b>What kind of property needs help?</b></div>
            <div className="signmons-choices signmons-property-choices">
              {propertyTypes.map((property) => <button type="button" key={property.id} onClick={() => chooseProperty(property.id)}>
                <strong>{property.title}</strong>
              </button>)}
            </div>
            <button type="button" className="signmons-back" onClick={() => setScreen("start")}>← Back to service type</button>
          </>}

          {screen === "handoff" && requestPath && propertyType && <>
            <div className="signmons-result">
              <span>Ready for Eternity</span>
              <h2>{pathLabels[requestPath]}</h2>
              <p>{propertyLabels[propertyType]} · Greater Cleveland service request</p>
            </div>
            <p className="signmons-response-note">
              {requestPath === "urgent"
                ? "For the fastest response to equipment that is down, call now. Texts are monitored 24/7 with a 15-minute reply target; that target is not a technician-arrival promise."
                : "Continue to the request form or contact the team directly. Website requests are typically reviewed within 15 minutes during regular business hours; this is not an appointment or arrival-time promise."}
            </p>
            <div className="signmons-actions">
              <a href="tel:+12167033183" onClick={() => trackHandoff("call")}>Call 216-703-3183</a>
              <a href="sms:+12167033183" onClick={() => trackHandoff("text")}>Text the team</a>
              <Link href="/#schedule" onClick={() => trackHandoff("request_form")}>Continue to request form</Link>
              <a href="mailto:ben@eternityhvacr.com" onClick={() => trackHandoff("email")}>Email Eternity</a>
            </div>
            <button type="button" className="signmons-back" onClick={reset}>← Start over</button>
          </>}

          {screen === "safety" && <>
            <div className="signmons-safety-panel" role="alert">
              <span>Immediate safety issue</span>
              <h2>Do not rely on this website for emergency help.</h2>
              <p>If you suspect fire, carbon monoxide, a gas leak, electrical danger or another immediate threat, leave the affected area when appropriate and call 911, the fire department or your utility emergency line.</p>
              <p>Do not re-enter or operate equipment until emergency professionals say it is safe.</p>
            </div>
            <a className="signmons-emergency-call" href="tel:911" onClick={() => trackHandoff("call")}>Call 911</a>
            <button type="button" className="signmons-back" onClick={reset}>← Return to service options</button>
          </>}
        </div>

        <footer className="signmons-footer">
          <span>Routing experience by <a href="https://signmons.com/" target="_blank" rel="noreferrer">Signmons</a></span>
          <span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span>
        </footer>
      </section>
    </div>}
  </>;
}

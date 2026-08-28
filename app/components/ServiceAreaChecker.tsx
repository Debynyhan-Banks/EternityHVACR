"use client";

import { FormEvent, useState } from "react";
import { allServiceAreas } from "../data/serviceAreas";
import { trackGoogleEvent } from "./Analytics";

type CheckResult =
  | { status: "idle" }
  | { status: "invalid" }
  | { status: "covered"; zip: string; cities: string[] }
  | { status: "confirm"; zip: string };

function formatCities(cities: string[]) {
  if (cities.length <= 1) return cities[0] ?? "the approved service area";
  if (cities.length === 2) return `${cities[0]} and ${cities[1]}`;
  return `${cities.slice(0, -1).join(", ")}, and ${cities.at(-1)}`;
}

export default function ServiceAreaChecker({ compact = false }: { compact?: boolean }) {
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<CheckResult>({ status: "idle" });

  function checkArea(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedZip = zip.replace(/\D/g, "").slice(0, 5);

    if (normalizedZip.length !== 5) {
      setResult({ status: "invalid" });
      return;
    }

    const cities = [...new Set(allServiceAreas
      .filter((area) => area.zips.includes(normalizedZip))
      .map((area) => area.city))];

    if (cities.length > 0) {
      setResult({ status: "covered", zip: normalizedZip, cities });
      trackGoogleEvent("service_area_check", {
        service_area_result: "approved",
        service_area_market_count: cities.length,
        link_location: window.location.pathname,
      });
      return;
    }

    setResult({ status: "confirm", zip: normalizedZip });
    trackGoogleEvent("service_area_check", {
      service_area_result: "confirmation_needed",
      link_location: window.location.pathname,
    });
  }

  return <div className={`service-area-checker${compact ? " checker-compact" : ""}`}>
    <div className="checker-intro"><span>ZIP-code checker</span><h3>Check service availability</h3><p>Enter the property’s five-digit ZIP code for an immediate coverage check.</p></div>
    <form onSubmit={checkArea} noValidate>
      <label htmlFor={compact ? "home-service-zip" : "area-service-zip"}>Property ZIP code</label>
      <div><input id={compact ? "home-service-zip" : "area-service-zip"} name="service-zip" value={zip} onChange={(event) => { setZip(event.target.value.replace(/\D/g, "").slice(0, 5)); setResult({ status: "idle" }); }} inputMode="numeric" autoComplete="postal-code" maxLength={5} placeholder="44123" aria-invalid={result.status === "invalid"} aria-describedby={compact ? "home-zip-result" : "area-zip-result"} /><button type="submit">Check ZIP <span>→</span></button></div>
    </form>
    <div className={`checker-result ${result.status}`} id={compact ? "home-zip-result" : "area-zip-result"} role="status" aria-live="polite">
      {result.status === "invalid" && <p><strong>Enter a five-digit ZIP code.</strong><span>Use the ZIP code where service is needed.</span></p>}
      {result.status === "covered" && <><p><strong>Yes—we serve this area.</strong><span>ZIP {result.zip} is listed for {formatCities(result.cities)}. Appointment timing is confirmed directly.</span></p><div><a href="/#schedule">Request service</a><a href="tel:+12162536468">Call 216-253-6468</a></div></>}
      {result.status === "confirm" && <><p><strong>Let’s confirm availability.</strong><span>ZIP {result.zip} is not on the current published list, but service may still be available based on the job and schedule.</span></p><div><a href="tel:+12162536468">Call to confirm</a><a href="/#schedule">Send service details</a></div></>}
    </div>
  </div>;
}

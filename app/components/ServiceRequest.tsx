"use client";

import Link from "next/link";
import { FormEvent, useRef, useState } from "react";
import { trackGoogleEvent } from "./Analytics";
import { captureLeadAttribution } from "./LeadAttribution";

type RequestData = {
  requestType: string;
  service: string;
  customer: string;
  timing: string;
  details: string;
  name: string;
  phone: string;
  email: string;
  serviceConsent: boolean;
  website: string;
};

const initial: RequestData = {
  requestType: "",
  service: "",
  customer: "",
  timing: "",
  details: "",
  name: "",
  phone: "",
  email: "",
  serviceConsent: false,
  website: "",
};

const requestPaths = [
  ["Emergency / system down", "Urgent equipment problem"],
  ["Repair or diagnostic", "Troubleshoot an existing system"],
  ["Installation estimate", "Plan replacement or new equipment"],
  ["Commercial / refrigeration", "Business, facility or cold storage"],
  ["Preventive maintenance", "Inspection or recurring service"],
];

const services = ["Air conditioning", "Heating", "Boiler", "Heat pump", "Commercial HVAC", "Refrigeration", "Installation", "Maintenance"];

function timingOptions(requestType: string) {
  if (requestType === "Emergency / system down") return ["Emergency / system down", "As soon as available"];
  if (requestType === "Installation estimate") return ["Planning an estimate", "This week", "As soon as available"];
  if (requestType === "Preventive maintenance") return ["Routine maintenance", "This week", "Planning an estimate"];
  return ["As soon as available", "This week", "Planning an estimate", "Routine maintenance", "Emergency / system down"];
}

export default function ServiceRequest() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<RequestData>(initial);
  const [complete, setComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmationSent, setConfirmationSent] = useState(true);
  const [startedAt, setStartedAt] = useState(() => Date.now());
  const trackedStart = useRef(false);

  function trackStart() {
    if (trackedStart.current) return;
    trackedStart.current = true;
    trackGoogleEvent("service_form_start", { form_location: window.location.pathname });
  }

  function update<K extends keyof RequestData>(key: K, value: RequestData[K]) {
    if (key !== "website") trackStart();
    setData((current) => ({ ...current, [key]: value }));
  }

  function chooseRequestType(requestType: string) {
    trackStart();
    setData((current) => ({ ...current, requestType, service: "", timing: "" }));
  }

  function continueForm() {
    trackGoogleEvent("service_form_step", {
      completed_step: step + 1,
      request_path: data.requestType,
      service_type: data.service || "not_selected",
      customer_type: data.customer || "not_selected",
    });
    setStep((value) => value + 1);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const attribution = captureLeadAttribution("website_service_request");
      const response = await fetch("/api/service-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, startedAt, attribution }),
      });

      const result = await response.json() as { error?: string; confirmationSent?: boolean };
      if (!response.ok) throw new Error(result.error || "We couldn’t send your request. Please try again.");
      setConfirmationSent(result.confirmationSent !== false);
      const eventParameters = {
        lead_source: "website_service_request",
        request_path: data.requestType,
        service_type: data.service,
        customer_type: data.customer,
        requested_timing: data.timing,
        landing_page: attribution.landingPage,
        source_page: attribution.sourcePage,
        campaign_source: attribution.utmSource ?? "direct",
        campaign_medium: attribution.utmMedium ?? "none",
        campaign_name: attribution.utmCampaign ?? "none",
      };
      trackGoogleEvent("generate_lead", eventParameters);
      trackGoogleEvent("service_form_complete", eventParameters);
      if (data.requestType === "Emergency / system down" || data.timing === "Emergency / system down") {
        trackGoogleEvent("emergency_request", {
          lead_source: "website_service_request",
          service_type: data.service,
          customer_type: data.customer,
        });
      }
      setComplete(true);
    } catch (reason) {
      const message = reason instanceof Error ? reason.message : "We couldn’t send your request. Please try again.";
      trackGoogleEvent("service_form_error", { request_path: data.requestType, service_type: data.service });
      setError(`${message} You can also call 216-703-3183 or email Ben directly.`);
    } finally {
      setSubmitting(false);
    }
  }

  function resetForm() {
    setComplete(false);
    setStep(0);
    setData(initial);
    setConfirmationSent(true);
    setStartedAt(Date.now());
    trackedStart.current = false;
  }

  if (complete) {
    return (
      <div className="request-form request-complete" role="status">
        <span>✓</span>
        <p className="form-eyebrow">Request sent</p>
        <h3>Thank you. Your request is with Eternity.</h3>
        <p>Ben and the Eternity Mechanical Services team typically review website requests within 15 minutes during regular business hours and will contact you using the information provided.</p>
        {confirmationSent
          ? <p>A confirmation email has been sent to {data.email}.</p>
          : <p>Your request was delivered, but we could not send the confirmation email. Please save this page or contact Eternity directly if needed.</p>}
        <a href="tel:+12167033183">For urgent service, call 216-703-3183</a>
        <a href="mailto:ben@eternityhvacr.com">Email ben@eternityhvacr.com directly</a>
        <button type="button" onClick={resetForm}>Start another request</button>
      </div>
    );
  }

  const ready = step === 0
    ? Boolean(data.requestType && data.customer)
    : step === 1
      ? Boolean(data.service && data.timing && data.details.trim().length >= 10)
      : Boolean(
          data.name.trim().length >= 2
          && data.phone.replace(/\D/g, "").length >= 7
          && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())
          && data.serviceConsent,
        );

  return (
    <form className="request-form" onSubmit={submit}>
      <div className="form-progress">
        <div><p className="form-eyebrow">Service or estimate request</p><b>Step {step + 1} of 3</b></div>
        <div role="progressbar" aria-label={`Step ${step + 1} of 3`} aria-valuemin={1} aria-valuemax={3} aria-valuenow={step + 1}><i style={{ width: `${((step + 1) / 3) * 100}%` }} /></div>
      </div>

      {step === 0 && <fieldset>
        <legend>What kind of help do you need?</legend>
        <p>Choose the path that best matches your request so the team receives the right context.</p>
        <div className="choice-grid request-path-grid">
          {requestPaths.map(([value, description]) => <label className={data.requestType === value ? "active" : ""} key={value}><input type="radio" name="requestType" checked={data.requestType === value} onChange={() => chooseRequestType(value)} /><span><b>{value}</b><small>{description}</small></span><i>→</i></label>)}
        </div>
        <div className="customer-row"><b>I’m requesting help for</b>{["My home", "A business", "A managed property"].map((item) => <label className={data.customer === item ? "active" : ""} key={item}><input type="radio" name="customer" checked={data.customer === item} onChange={() => update("customer", item)} />{item}</label>)}</div>
      </fieldset>}

      {step === 1 && <fieldset>
        <legend>Tell us about the equipment.</legend>
        <p>Share enough detail for the team to understand the service category, condition and urgency.</p>
        <label className="field-label">Service category<select value={data.service} onChange={(event) => update("service", event.target.value)} required><option value="" disabled>Select service</option>{services.map((service) => <option key={service}>{service}</option>)}</select></label>
        <label className="field-label">When do you need service?<select value={data.timing} onChange={(event) => update("timing", event.target.value)} required><option value="" disabled>Select timing</option>{timingOptions(data.requestType).map((timing) => <option key={timing}>{timing}</option>)}</select></label>
        <label className="field-label">Equipment or issue<textarea value={data.details} minLength={10} onChange={(event) => update("details", event.target.value)} placeholder="Tell us what equipment is affected, what you are noticing, and any access details." required /><small className="field-hint">Please enter at least 10 characters. Do not include passwords, payment details or other sensitive information.</small></label>
        {(data.requestType === "Emergency / system down" || data.timing === "Emergency / system down") && <div className="urgent-note"><b>Urgent equipment request:</b> call <a href="tel:+12167033183">216-703-3183</a>. For fire, suspected gas or carbon monoxide, electrical danger or another immediate threat, leave the affected area when appropriate and contact 911 or the utility emergency line.</div>}
      </fieldset>}

      {step === 2 && <fieldset>
        <legend>How should we contact you?</legend>
        <p>We’ll use these details only to follow up about this service or estimate request.</p>
        <div className="contact-fields"><label className="field-label">Name<input value={data.name} minLength={2} onChange={(event) => update("name", event.target.value)} placeholder="Full name" autoComplete="name" required /></label><label className="field-label">Phone<input value={data.phone} type="tel" onChange={(event) => update("phone", event.target.value)} placeholder="Phone number" autoComplete="tel" required /><small className="field-hint">Enter at least 7 digits.</small></label><label className="field-label full">Email<input value={data.email} type="email" onChange={(event) => update("email", event.target.value)} placeholder="Email address" autoComplete="email" required /></label></div>
        <label className="consent-row"><input type="checkbox" checked={data.serviceConsent} onChange={(event) => update("serviceConsent", event.target.checked)} required /><span>I authorize Eternity Mechanical Services to contact me by phone, service-related text message or email about this request. This is not marketing consent. Message and data rates may apply. I have reviewed the <Link href="/privacy">Privacy & Data Use notice</Link> and <Link href="/terms">Website Terms</Link>.</span></label>
        <label className="form-honeypot" aria-hidden="true">Website<input value={data.website} onChange={(event) => update("website", event.target.value)} tabIndex={-1} autoComplete="off" /></label>
        <div className="request-summary"><span>{data.requestType}</span><span>{data.service}</span><span>{data.customer}</span><span>{data.timing}</span></div>
      </fieldset>}

      {error && <div className="form-error" role="alert">{error} <a href="mailto:ben@eternityhvacr.com">Email Ben</a></div>}

      <div className="form-actions">
        {step > 0 && <button className="form-back" type="button" disabled={submitting} onClick={() => setStep((value) => value - 1)}>← Back</button>}
        {step < 2 ? <button className="form-next" type="button" disabled={!ready} onClick={continueForm}>Continue <span>→</span></button> : <button className="form-next" type="submit" disabled={!ready || submitting}>{submitting ? "Sending request…" : "Send request to Eternity"} <span>↗</span></button>}
      </div>
      <small>Appointment availability, scope and service details are confirmed directly by Eternity Mechanical Services. A website submission does not schedule an appointment.</small>
    </form>
  );
}

"use client";

import { FormEvent, useState } from "react";
import { trackGoogleEvent } from "./Analytics";

type RequestData = {
  service: string;
  customer: string;
  timing: string;
  details: string;
  name: string;
  phone: string;
  email: string;
  website: string;
};

const initial: RequestData = {
  service: "",
  customer: "",
  timing: "",
  details: "",
  name: "",
  phone: "",
  email: "",
  website: "",
};

export default function ServiceRequest() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<RequestData>(initial);
  const [complete, setComplete] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmationSent, setConfirmationSent] = useState(true);
  const [startedAt, setStartedAt] = useState(() => Date.now());

  function update<K extends keyof RequestData>(key: K, value: RequestData[K]) {
    setData((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/service-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, startedAt }),
      });

      const result = await response.json() as { error?: string; confirmationSent?: boolean };
      if (!response.ok) throw new Error(result.error || "We couldn’t send your request. Please try again.");
      setConfirmationSent(result.confirmationSent !== false);
      trackGoogleEvent("generate_lead", {
        lead_source: "website_service_request",
        service_type: data.service,
        customer_type: data.customer,
        requested_timing: data.timing,
      });
      setComplete(true);
    } catch (reason) {
      const message = reason instanceof Error ? reason.message : "We couldn’t send your request. Please try again.";
      setError(`${message} You can also call 216-253-6468 or email Ben directly.`);
    } finally {
      setSubmitting(false);
    }
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
        <a href="tel:+12162536468">For urgent service, call 216-253-6468</a>
        <a href="mailto:ben@eternityhvacr.com">Email ben@eternityhvacr.com directly</a>
        <button type="button" onClick={() => { setComplete(false); setStep(0); setData(initial); setConfirmationSent(true); setStartedAt(Date.now()); }}>Start another request</button>
      </div>
    );
  }

  const ready = step === 0
    ? Boolean(data.service && data.customer)
    : step === 1
      ? Boolean(data.timing && data.details.trim().length >= 10)
      : Boolean(
          data.name.trim().length >= 2
          && data.phone.replace(/\D/g, "").length >= 7
          && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim()),
        );

  return (
    <form className="request-form" onSubmit={submit}>
      <div className="form-progress">
        <div><p className="form-eyebrow">Service request</p><b>Step {step + 1} of 3</b></div>
        <div
          role="progressbar"
          aria-label={`Step ${step + 1} of 3`}
          aria-valuemin={1}
          aria-valuemax={3}
          aria-valuenow={step + 1}
        ><i style={{ width: `${((step + 1) / 3) * 100}%` }} /></div>
      </div>

      {step === 0 && <fieldset>
        <legend>What can we help with?</legend>
        <p>Select the service and property type that best fit your request.</p>
        <div className="choice-grid">
          {["Air conditioning", "Heating", "Commercial HVAC", "Refrigeration", "Installation", "Maintenance"].map((item) => <label className={data.service === item ? "active" : ""} key={item}><input type="radio" name="service" checked={data.service === item} onChange={() => update("service", item)} /><span>{item}</span><i>→</i></label>)}
        </div>
        <div className="customer-row"><b>I’m requesting service for</b>{["My home", "A business", "A managed property"].map((item) => <label className={data.customer === item ? "active" : ""} key={item}><input type="radio" name="customer" checked={data.customer === item} onChange={() => update("customer", item)} />{item}</label>)}</div>
      </fieldset>}

      {step === 1 && <fieldset>
        <legend>Tell us what’s happening.</legend>
        <p>Share enough detail for the team to understand the equipment and urgency.</p>
        <label className="field-label">When do you need service?<select value={data.timing} onChange={(event) => update("timing", event.target.value)} required><option value="" disabled>Select timing</option><option>Emergency / system down</option><option>As soon as available</option><option>This week</option><option>Planning an estimate</option><option>Routine maintenance</option></select></label>
        <label className="field-label">Equipment or issue<textarea value={data.details} minLength={10} onChange={(event) => update("details", event.target.value)} placeholder="Tell us what equipment is affected, what you are noticing, and any access details." required /><small className="field-hint">Please enter at least 10 characters.</small></label>
        {data.timing === "Emergency / system down" && <div className="urgent-note"><b>Emergency request:</b> call <a href="tel:+12162536468">216-253-6468</a> for immediate assistance.</div>}
      </fieldset>}

      {step === 2 && <fieldset>
        <legend>How should we contact you?</legend>
        <p>We’ll use these details only to follow up about your request.</p>
        <div className="contact-fields"><label className="field-label">Name<input value={data.name} minLength={2} onChange={(event) => update("name", event.target.value)} placeholder="Full name" required /></label><label className="field-label">Phone<input value={data.phone} type="tel" onChange={(event) => update("phone", event.target.value)} placeholder="Phone number" required /><small className="field-hint">Enter at least 7 digits.</small></label><label className="field-label full">Email<input value={data.email} type="email" onChange={(event) => update("email", event.target.value)} placeholder="Email address" required /></label></div>
        <label className="form-honeypot" aria-hidden="true">Website<input value={data.website} onChange={(event) => update("website", event.target.value)} tabIndex={-1} autoComplete="off" /></label>
        <div className="request-summary"><span>{data.service}</span><span>{data.customer}</span><span>{data.timing}</span></div>
      </fieldset>}

      {error && <div className="form-error" role="alert">{error} <a href="mailto:ben@eternityhvacr.com">Email Ben</a></div>}

      <div className="form-actions">
        {step > 0 && <button className="form-back" type="button" disabled={submitting} onClick={() => setStep((value) => value - 1)}>← Back</button>}
        {step < 2 ? <button className="form-next" type="button" disabled={!ready} onClick={() => setStep((value) => value + 1)}>Continue <span>→</span></button> : <button className="form-next" type="submit" disabled={!ready || submitting}>{submitting ? "Sending request…" : "Send request to Eternity"} <span>↗</span></button>}
      </div>
      <small>Appointment availability and service details are confirmed by Eternity Mechanical Services.</small>
    </form>
  );
}

"use client";

import { FormEvent, useState } from "react";

type RequestData = {
  service: string;
  customer: string;
  timing: string;
  details: string;
  name: string;
  phone: string;
  email: string;
};

const initial: RequestData = {
  service: "",
  customer: "",
  timing: "",
  details: "",
  name: "",
  phone: "",
  email: "",
};

export default function ServiceRequest() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<RequestData>(initial);
  const [complete, setComplete] = useState(false);

  function update<K extends keyof RequestData>(key: K, value: RequestData[K]) {
    setData((current) => ({ ...current, [key]: value }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = encodeURIComponent(`Eternity Mechanical service request — ${data.service}`);
    const body = encodeURIComponent(
      `Service: ${data.service}\nCustomer type: ${data.customer}\nTiming: ${data.timing}\nDetails: ${data.details}\nName: ${data.name}\nPhone: ${data.phone}\nEmail: ${data.email}`,
    );
    setComplete(true);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }

  if (complete) {
    return (
      <div className="request-form request-complete" role="status">
        <span>✓</span>
        <p className="form-eyebrow">Request prepared</p>
        <h3>Your service details are ready.</h3>
        <p>Your email application should open with the request completed. Add Eternity Mechanical’s confirmed service email before sending.</p>
        <button type="button" onClick={() => { setComplete(false); setStep(0); setData(initial); }}>Start another request</button>
      </div>
    );
  }

  const ready = step === 0
    ? Boolean(data.service && data.customer)
    : step === 1
      ? Boolean(data.timing && data.details)
      : Boolean(data.name && data.phone && data.email);

  return (
    <form className="request-form" onSubmit={submit}>
      <div className="form-progress">
        <div><p className="form-eyebrow">Service request</p><b>Step {step + 1} of 3</b></div>
        <div aria-label={`Step ${step + 1} of 3`}><i style={{ width: `${((step + 1) / 3) * 100}%` }} /></div>
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
        <label className="field-label">Equipment or issue<textarea value={data.details} onChange={(event) => update("details", event.target.value)} placeholder="Tell us what equipment is affected, what you are noticing, and any access details." required /></label>
        {data.timing === "Emergency / system down" && <div className="urgent-note"><b>Emergency request:</b> call <a href="tel:+12162536468">216-253-6468</a> for immediate assistance.</div>}
      </fieldset>}

      {step === 2 && <fieldset>
        <legend>How should we contact you?</legend>
        <p>We’ll use these details only to follow up about your request.</p>
        <div className="contact-fields"><label className="field-label">Name<input value={data.name} onChange={(event) => update("name", event.target.value)} placeholder="Full name" required /></label><label className="field-label">Phone<input value={data.phone} type="tel" onChange={(event) => update("phone", event.target.value)} placeholder="Phone number" required /></label><label className="field-label full">Email<input value={data.email} type="email" onChange={(event) => update("email", event.target.value)} placeholder="Email address" required /></label></div>
        <div className="request-summary"><span>{data.service}</span><span>{data.customer}</span><span>{data.timing}</span></div>
      </fieldset>}

      <div className="form-actions">
        {step > 0 && <button className="form-back" type="button" onClick={() => setStep((value) => value - 1)}>← Back</button>}
        {step < 2 ? <button className="form-next" type="button" disabled={!ready} onClick={() => setStep((value) => value + 1)}>Continue <span>→</span></button> : <button className="form-next" type="submit" disabled={!ready}>Prepare request <span>↗</span></button>}
      </div>
      <small>Appointment availability and service details are confirmed by Eternity Mechanical Services.</small>
    </form>
  );
}

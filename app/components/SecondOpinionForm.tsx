"use client";

import { useRef, useState } from "react";

const ACCEPTED_TYPES = ["application/pdf", "image/jpeg", "image/png", "image/webp"];
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_TOTAL_BYTES = 20 * 1024 * 1024;

type Result = { reference: string } | null;

export default function SecondOpinionForm() {
  const startedAt = useRef(0);
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result>(null);
  const [submitting, setSubmitting] = useState(false);

  function validateFiles(nextFiles: File[]) {
    if (nextFiles.length < 1 || nextFiles.length > 3) return "Choose one to three files.";
    if (nextFiles.some((file) => !ACCEPTED_TYPES.includes(file.type))) return "Use PDF, JPG, PNG or WebP files only.";
    if (nextFiles.some((file) => file.size > MAX_FILE_BYTES)) return "Each file must be 10 MB or smaller.";
    if (nextFiles.reduce((sum, file) => sum + file.size, 0) > MAX_TOTAL_BYTES) return "The combined upload must be 20 MB or smaller.";
    return "";
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const fileError = validateFiles(files);
    if (fileError) { setError(fileError); return; }
    setError("");
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    formData.set("startedAt", String(startedAt.current));
    formData.delete("files");
    files.forEach((file) => formData.append("files", file));

    try {
      const response = await fetch("/api/second-opinion", { method: "POST", body: formData });
      const body = await response.json() as { error?: string; reference?: string };
      if (!response.ok || !body.reference) throw new Error(body.error || "We could not send the request.");
      setResult({ reference: body.reference });
      (window as Window & { dataLayer?: Array<Record<string, string>> }).dataLayer?.push({ event: "second_opinion_submitted" });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "We could not send the request. Please call 216-703-3183.");
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <div className="upload-success" role="status">
        <span aria-hidden="true">✓</span>
        <p className="kicker">Upload received</p>
        <h2>Reference {result.reference}</h2>
        <p>Eternity can now review the files privately. They are available only to the approved owner/admin team and will expire after 30 days.</p>
        <a className="btn" href="tel:+12167033183">Call 216-703-3183 <span>→</span></a>
      </div>
    );
  }

  return (
    <form className="second-opinion-form" onSubmit={submit} onFocusCapture={() => { if (!startedAt.current) startedAt.current = Date.now(); }} onPointerDown={() => { if (!startedAt.current) startedAt.current = Date.now(); }}>
      <div className="upload-form-heading"><p className="kicker">Private file review</p><h2>Send the diagnosis, quote or equipment photos.</h2><p>Required fields are marked. Do not upload payment-card, Social Security, medical or account-password information.</p></div>
      <div className="upload-field-grid">
        <label><span>Name *</span><input required name="name" autoComplete="name" minLength={2} maxLength={120} /></label>
        <label><span>Email *</span><input required name="email" type="email" autoComplete="email" maxLength={254} /></label>
        <label><span>Phone *</span><input required name="phone" type="tel" autoComplete="tel" maxLength={50} /></label>
        <label><span>Service ZIP *</span><input required name="zip" inputMode="numeric" autoComplete="postal-code" pattern="[0-9]{5}" maxLength={5} /></label>
        <label className="full"><span>System or service *</span><select required name="service" defaultValue=""><option value="" disabled>Select one</option><option>Air conditioning</option><option>Furnace or heating</option><option>Boiler</option><option>Heat pump</option><option>Commercial HVAC</option><option>Commercial refrigeration</option></select></label>
        <label className="full"><span>What would you like Eternity to review? *</span><textarea required name="details" minLength={20} maxLength={2500} rows={6} placeholder="Example: Another contractor recommended replacing the furnace. I would like Eternity to review the diagnosis and proposal." /></label>
      </div>
      <label className="upload-drop">
        <strong>Choose 1–3 files</strong>
        <span>PDF, JPG, PNG or WebP • 10 MB each • 20 MB combined</span>
        <input required name="files" type="file" accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp" multiple onChange={(event) => { const nextFiles = Array.from(event.target.files ?? []); setFiles(nextFiles); setError(validateFiles(nextFiles)); }} />
      </label>
      {files.length > 0 && <ul className="upload-file-list">{files.map((file) => <li key={`${file.name}-${file.size}`}>{file.name} <span>{(file.size / 1024 / 1024).toFixed(1)} MB</span></li>)}</ul>}
      <label className="consent-row"><input required name="consent" type="checkbox" value="yes" /><span>I authorize Eternity to review these files and contact me about this request. I understand the files are private, owner/admin-only and retained for no more than 30 days. *</span></label>
      <label className="form-honeypot" aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
      {error && <p className="form-error" role="alert">{error}</p>}
      <button className="btn btn-orange upload-submit" type="submit" disabled={submitting}>{submitting ? "Uploading securely…" : "Send for private review"} <span aria-hidden="true">↗</span></button>
      <small className="upload-retention">Files are not public. Owner/admin access only. Automatic access expiration and deletion workflow: 30 days.</small>
    </form>
  );
}

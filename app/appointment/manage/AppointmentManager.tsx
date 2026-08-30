"use client";

import { useEffect, useState } from "react";
import { trackGoogleEvent } from "../../components/Analytics";

type Slot = { token: string; start: string; end: string; label: string };
type Appointment = { label: string; start?: string; end?: string };
type ViewResult = {
  status?: string;
  state?: "confirmed" | "cancelled";
  reference?: string;
  appointment?: Appointment;
  slots?: Slot[];
  error?: string;
};

export default function AppointmentManager() {
  const [token, setToken] = useState("");
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [reference, setReference] = useState("");
  const [state, setState] = useState<"loading" | "confirmed" | "cancelled" | "error">("loading");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [busyAction, setBusyAction] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    async function initialize() {
      await Promise.resolve();
      if (!active) return;
      const managementToken = window.location.hash.slice(1).trim();
      if (managementToken.length < 20) {
        if (active) {
          setState("error");
          setError("This appointment link is incomplete or invalid.");
        }
        return;
      }
      setToken(managementToken);
      try {
        const response = await fetch("/api/signmons/appointments/manage", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ managementToken, action: "view" }),
        });
        const result = await response.json() as ViewResult;
        if (!response.ok || !result.appointment || !result.reference) {
          throw new Error(result.error || "We could not verify this appointment link.");
        }
        if (!active) return;
        setAppointment(result.appointment);
        setReference(result.reference);
        setState(result.state === "cancelled" ? "cancelled" : "confirmed");
        trackGoogleEvent("appointment_manage_viewed", { appointment_state: result.state ?? "confirmed" });
      } catch (cause) {
        if (!active) return;
        setState("error");
        setError(cause instanceof Error ? cause.message : "We could not verify this appointment link.");
      }
    }
    void initialize();
    return () => { active = false; };
  }, []);

  async function request(action: "view" | "availability" | "reschedule" | "cancel", slotToken?: string) {
    const response = await fetch("/api/signmons/appointments/manage", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ managementToken: token || window.location.hash.slice(1), action, ...(slotToken ? { slotToken } : {}) }),
    });
    const result = await response.json() as ViewResult;
    if (!response.ok) throw new Error(result.error || "We could not update the appointment.");
    return result;
  }

  async function showAvailability() {
    setBusyAction("availability");
    setError("");
    try {
      const result = await request("availability");
      setSlots(result.slots ?? []);
      trackGoogleEvent("appointment_reschedule_started", {});
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No alternate times are available.");
    } finally {
      setBusyAction("");
    }
  }

  async function reschedule(slot: Slot) {
    setBusyAction(slot.token);
    setError("");
    try {
      const result = await request("reschedule", slot.token);
      if (!result.appointment) throw new Error("The new time could not be verified.");
      setAppointment(result.appointment);
      setSlots([]);
      trackGoogleEvent("appointment_rescheduled", { appointment_start: slot.start });
    } catch (cause) {
      setSlots((current) => current.filter((choice) => choice.token !== slot.token));
      setError(cause instanceof Error ? cause.message : "We could not change the appointment.");
    } finally {
      setBusyAction("");
    }
  }

  async function cancelAppointment() {
    if (!window.confirm("Cancel this appointment and release the reserved time?")) return;
    setBusyAction("cancel");
    setError("");
    try {
      await request("cancel");
      setState("cancelled");
      setSlots([]);
      trackGoogleEvent("appointment_cancelled", {});
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "We could not cancel the appointment.");
    } finally {
      setBusyAction("");
    }
  }

  if (state === "loading") {
    return <section className="appointment-manage-card" aria-live="polite">
      <span className="appointment-state">Secure link</span>
      <h2>Loading your appointment…</h2>
      <p>Please keep this page open while we verify the appointment.</p>
    </section>;
  }

  if (state === "error") {
    return <section className="appointment-manage-card appointment-error" role="alert">
      <span className="appointment-state">Link unavailable</span>
      <h2>We could not open this appointment.</h2>
      <p>{error}</p>
      <a className="btn" href="tel:+12167033183">Call 216-703-3183</a>
    </section>;
  }

  if (state === "cancelled") {
    return <section className="appointment-manage-card appointment-cancelled" aria-live="polite">
      <span className="appointment-state">Cancelled</span>
      <h2>Your appointment has been cancelled.</h2>
      <p>The reserved time has been released and Eternity has been notified.</p>
      {reference && <p className="appointment-reference">Reference {reference}</p>}
      <a className="btn" href="tel:+12167033183">Call to request new service</a>
    </section>;
  }

  return <section className="appointment-manage-card" aria-live="polite">
    <span className="appointment-state">Confirmed appointment</span>
    <h2>{appointment?.label}</h2>
    <p className="appointment-reference">Reference {reference}</p>
    <p className="appointment-timezone">Times are shown in Eastern Time. Arrival windows are rechecked when selected.</p>

    {slots.length === 0 ? <div className="appointment-actions">
      <button type="button" className="btn" onClick={() => void showAvailability()} disabled={Boolean(busyAction)}>
        {busyAction === "availability" ? "Checking times…" : "Choose another time"}
      </button>
      <button type="button" className="appointment-cancel" onClick={() => void cancelAppointment()} disabled={Boolean(busyAction)}>
        {busyAction === "cancel" ? "Cancelling…" : "Cancel appointment"}
      </button>
    </div> : <div className="appointment-slot-picker">
      <div><span>Live availability</span><h3>Choose a new arrival window</h3></div>
      <div className="appointment-slots">
        {slots.map((slot) => <button type="button" key={slot.token} disabled={Boolean(busyAction)} onClick={() => void reschedule(slot)}>
          {busyAction === slot.token ? "Rescheduling…" : slot.label}
        </button>)}
      </div>
      <button type="button" className="appointment-back" onClick={() => setSlots([])} disabled={Boolean(busyAction)}>Keep current appointment</button>
    </div>}

    {error && <p className="appointment-inline-error" role="alert">{error}</p>}
    <p className="appointment-help">Need help? Call or text <a href="tel:+12167033183">216-703-3183</a>.</p>
  </section>;
}

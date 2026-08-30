"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { trackGoogleEvent } from "./Analytics";

type RequestPath = "urgent" | "cooling" | "heating" | "commercial" | "estimate" | "maintenance";
type PropertyType = "home" | "business" | "managed";
type Screen = "start" | "property" | "handoff" | "chat" | "safety";
type ChatMessage = { id: string; role: "assistant" | "user"; text: string; safety?: boolean; success?: boolean; manageHref?: string };
type AppointmentSlot = { token: string; start: string; end: string; label: string };
type SignmonsApiResult = {
  status?: "reply" | "needs_correction" | "job_created" | "availability" | "appointment_confirmed";
  reply?: string;
  error?: string;
  requiresHumanHandoff?: boolean;
  jobReference?: string;
  jobId?: string;
  slots?: AppointmentSlot[];
};

const initialChatMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  text: "Tell me what is happening with your HVAC, boiler or refrigeration equipment. I can ask follow-up questions and help prepare the request for Eternity's team.",
};

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
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([initialChatMessage]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatLoadingStage, setChatLoadingStage] = useState(0);
  const [chatError, setChatError] = useState("");
  const [lastFailedMessage, setLastFailedMessage] = useState("");
  const [appointmentSlots, setAppointmentSlots] = useState<AppointmentSlot[]>([]);
  const [appointmentJobId, setAppointmentJobId] = useState("");
  const [bookingSlotToken, setBookingSlotToken] = useState("");
  const launcherRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const sessionIdRef = useRef("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const defaultLauncher = launcherRef.current;
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
      (openerRef.current ?? defaultLauncher)?.focus();
    };
  }, [open]);

  useEffect(() => {
    const openFromPageControl = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const control = target.closest<HTMLElement>("[data-open-assistant]");
      if (!control) return;
      openerRef.current = control;
      openAssistant();
    };
    document.addEventListener("click", openFromPageControl);
    return () => document.removeEventListener("click", openFromPageControl);
  }, []);

  useEffect(() => {
    if (screen === "chat") chatEndRef.current?.scrollIntoView({ block: "nearest" });
  }, [screen, chatMessages, chatLoading]);

  useEffect(() => {
    if (!chatLoading) return;
    const reviewingTimer = window.setTimeout(() => setChatLoadingStage(1), 2500);
    const savingTimer = window.setTimeout(() => setChatLoadingStage(2), 6500);
    return () => {
      window.clearTimeout(reviewingTimer);
      window.clearTimeout(savingTimer);
    };
  }, [chatLoading]);

  function openAssistant(opener?: HTMLElement) {
    if (opener) openerRef.current = opener;
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

  function startChat() {
    if (!sessionIdRef.current) sessionIdRef.current = crypto.randomUUID();
    setScreen("chat");
    setChatError("");
    trackGoogleEvent("assistant_chat_started", { assistant: "signmons_calldesk" });
  }

  async function sendChatMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = chatInput.trim();
    if (!message || chatLoading) return;

    setChatInput("");
    await submitChatMessage(message);
  }

  async function submitChatMessage(message: string, retry = false) {
    if (!message || chatLoading) return;

    if (!sessionIdRef.current) sessionIdRef.current = crypto.randomUUID();
    if (!retry) {
      const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", text: message };
      setChatMessages((messages) => [...messages, userMessage]);
    }
    setChatError("");
    setChatLoadingStage(0);
    setChatLoading(true);
    trackGoogleEvent("assistant_message_sent", { assistant: "signmons_calldesk" });

    try {
      const response = await fetch("/api/signmons", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId: sessionIdRef.current, message, website: "" }),
      });
      const result = await response.json() as SignmonsApiResult;
      if (!response.ok || !result.reply) {
        throw new Error(result.error || "The assistant could not respond.");
      }

      setChatMessages((messages) => [...messages, {
        id: crypto.randomUUID(),
        role: "assistant",
        text: result.reply as string,
        safety: result.requiresHumanHandoff === true,
        success: result.status === "job_created" || result.status === "availability",
      }]);
      if (result.status === "availability" && result.jobId && result.slots?.length) {
        setAppointmentJobId(result.jobId);
        setAppointmentSlots(result.slots);
      }
      setLastFailedMessage("");
      trackGoogleEvent("assistant_response_received", {
        assistant: "signmons_calldesk",
        safety_handoff: result.requiresHumanHandoff === true,
        response_status: result.status ?? "reply",
      });
    } catch (error) {
      setLastFailedMessage(message);
      setChatError(error instanceof Error ? error.message : "The assistant could not respond.");
    } finally {
      setChatLoading(false);
      setChatLoadingStage(0);
    }
  }

  async function confirmAppointment(slot: AppointmentSlot) {
    if (!appointmentJobId || bookingSlotToken) return;
    setBookingSlotToken(slot.token);
    setChatError("");
    try {
      const response = await fetch("/api/signmons/appointments/confirm", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          sessionId: sessionIdRef.current,
          jobId: appointmentJobId,
          slotToken: slot.token,
        }),
      });
      const result = await response.json() as { status?: string; appointmentLabel?: string; jobReference?: string; managementPath?: string; error?: string };
      if (!response.ok || result.status !== "appointment_confirmed") {
        if (response.status === 409) {
          setAppointmentSlots((slots) => slots.filter((choice) => choice.token !== slot.token));
        }
        trackGoogleEvent("assistant_appointment_failed", {
          assistant: "signmons_calldesk",
          failure_status: response.status,
        });
        throw new Error(result.error || "We could not confirm that appointment.");
      }
      setAppointmentSlots([]);
      setAppointmentJobId("");
      setChatMessages((messages) => [...messages, {
        id: crypto.randomUUID(),
        role: "assistant",
        text: `Your residential diagnostic appointment is confirmed for ${result.appointmentLabel ?? slot.label}${result.jobReference ? ` — reference ${result.jobReference}` : ""}. Use the secure link below to reschedule or cancel. Keep the link private.`,
        success: true,
        manageHref: result.managementPath,
      }]);
      trackGoogleEvent("assistant_appointment_confirmed", {
        assistant: "signmons_calldesk",
        appointment_start: slot.start,
      });
    } catch (error) {
      setChatError(error instanceof Error ? error.message : "We could not confirm that appointment.");
    } finally {
      setBookingSlotToken("");
    }
  }

  function retryLastMessage() {
    if (!lastFailedMessage || chatLoading) return;
    void submitChatMessage(lastFailedMessage, true);
  }

  function trackHandoff(method: "call" | "text" | "email" | "request_form") {
    trackGoogleEvent("assistant_handoff", {
      handoff_method: method,
      request_path: requestPath ?? (screen === "chat" ? "chat" : "life_safety"),
      property_type: propertyType ?? "not_selected",
    });
    if (method === "request_form") setOpen(false);
  }

  function reset() {
    setScreen("start");
    setRequestPath(null);
    setPropertyType(null);
    setChatError("");
    setAppointmentSlots([]);
    setAppointmentJobId("");
  }

  return <>
    <button
      ref={launcherRef}
      type="button"
      className="signmons-launcher"
      aria-label="Open Ask Eternity service chatbot"
      aria-haspopup="dialog"
      aria-expanded={open}
      onClick={(event) => openAssistant(event.currentTarget)}
    >
      <span className="signmons-launcher-icon" aria-hidden="true">✦</span>
      <span className="signmons-launcher-copy"><b>Ask Eternity</b><small>AI help now</small></span>
      <span className="signmons-visually-hidden">Automated service assistant</span>
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
            Messages are processed by Signmons and OpenAI, may be stored in service logs and may be reviewed by Eternity. This assistant is not a technician and cannot diagnose equipment. Eligible residential diagnostic visits can be confirmed only from the live appointment choices shown here. Do not enter payment-card, Social Security, medical or other sensitive information.
          </p>

          {screen === "start" && <>
            <div className="signmons-chat-intro">
              <span>AI-assisted service conversation</span>
              <h2>Get a quick first response.</h2>
              <p>Describe the equipment problem, request service or find the right next step. Human follow-up is available when needed.</p>
            </div>
            <div className="signmons-quick-actions" aria-label="Popular assistant actions">
              <button type="button" onClick={startChat}><strong>Describe a problem</strong><span>Chat about the equipment symptoms</span></button>
              <Link href="/#schedule" onClick={() => trackHandoff("request_form")}><strong>Request service</strong><span>Send details to Eternity</span></Link>
              <button type="button" onClick={showSafety}><strong>Emergency safety</strong><span>Gas, CO, fire or electrical danger</span></button>
              <Link href="/areas-we-serve" onClick={() => setOpen(false)}><strong>Check service area</strong><span>Greater Cleveland coverage</span></Link>
            </div>
            <div className="signmons-progress"><span>Choose a service type</span><b>Guided routing</b></div>
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

          {screen === "chat" && <>
            <div className="signmons-chat-heading">
              <div><span>AI-assisted conversation</span><strong>Ask Eternity</strong></div>
              <button type="button" onClick={reset}>Service menu</button>
            </div>
            <div className="signmons-messages" aria-live="polite" aria-busy={chatLoading}>
              {chatMessages.map((message) => <div key={message.id} className={`signmons-message ${message.role}${message.safety ? " safety" : ""}${message.success ? " success" : ""}`}>
                <span>{message.role === "assistant" ? "Assistant" : "You"}</span>
                <p>{message.text}</p>
                {message.manageHref && <a
                  className="signmons-manage-link"
                  href={message.manageHref}
                  onClick={() => trackGoogleEvent("appointment_manage_opened", { source: "assistant_confirmation" })}
                >Manage appointment →</a>}
              </div>)}
              {chatLoading && <div className="signmons-message assistant loading"><span>Assistant</span><p>{[
                "Preparing a response…",
                "Reviewing the request details…",
                "Finishing securely—please keep this window open…",
              ][chatLoadingStage]}</p></div>}
              <div ref={chatEndRef} />
            </div>
            {appointmentSlots.length > 0 && <section className="signmons-slots" aria-labelledby="signmons-slots-title">
              <span>Live availability</span>
              <h3 id="signmons-slots-title">Choose an arrival window</h3>
              <p>Selecting a time confirms this residential diagnostic appointment.</p>
              <div>
                {appointmentSlots.map((slot) => <button
                  type="button"
                  key={slot.token}
                  disabled={Boolean(bookingSlotToken)}
                  onClick={() => void confirmAppointment(slot)}
                >
                  {bookingSlotToken === slot.token ? "Confirming…" : slot.label}
                </button>)}
              </div>
              <small>Times are shown in Eastern Time and are rechecked when selected.</small>
            </section>}
            {chatError && <div className="signmons-chat-error" role="alert">
              <strong>We couldn’t finish that step.</strong>
              <span>{chatError} Your previous details are still in this chat.</span>
              <div>
                <button type="button" onClick={retryLastMessage} disabled={chatLoading}>Try again</button>
                <a href="tel:+12167033183">Call</a>
                <a href="sms:+12167033183">Text</a>
              </div>
            </div>}
            <form className="signmons-chat-form" onSubmit={sendChatMessage}>
              <label htmlFor="signmons-message">Describe the equipment or service question</label>
              <textarea
                id="signmons-message"
                value={chatInput}
                maxLength={1000}
                rows={3}
                placeholder="Example: My furnace is running, but the air is not warm."
                disabled={Boolean(bookingSlotToken)}
                onChange={(event) => setChatInput(event.target.value)}
              />
              <div><span>{chatInput.length}/1,000</span><button type="submit" disabled={chatLoading || Boolean(bookingSlotToken) || !chatInput.trim()}>{chatLoading ? "Sending…" : "Send message"}</button></div>
            </form>
            <p className="signmons-chat-limit">For immediate danger, leave the area when appropriate and call 911 or the utility emergency line. For urgent service, call <a href="tel:+12167033183">216-703-3183</a>.</p>
            <div className="signmons-chat-handoff">
              <a href="tel:+12167033183" onClick={() => trackHandoff("call")}>Call Eternity</a>
              <a href="sms:+12167033183" onClick={() => trackHandoff("text")}>Text the team</a>
              <Link href="/#schedule" onClick={() => trackHandoff("request_form")}>Request service</Link>
            </div>
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
          <span>Assistant technology by <a href="https://signmons.com/" target="_blank" rel="noreferrer">Signmons</a></span>
          <span><Link href="/privacy">Privacy</Link> · <Link href="/terms">Terms</Link></span>
        </footer>
      </section>
    </div>}
  </>;
}

"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { trackGoogleEvent } from "./Analytics";

type RequestPath = "urgent" | "cooling" | "heating" | "commercial" | "estimate" | "maintenance";
type PropertyType = "home" | "business" | "managed";
type Screen = "start" | "property" | "handoff" | "chat" | "safety";
type ChatMessage = { id: string; role: "assistant" | "user"; text: string; safety?: boolean };

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
  const [chatError, setChatError] = useState("");
  const launcherRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLElement>(null);
  const sessionIdRef = useRef("");
  const chatEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (screen === "chat") chatEndRef.current?.scrollIntoView({ block: "nearest" });
  }, [screen, chatMessages, chatLoading]);

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

    if (!sessionIdRef.current) sessionIdRef.current = crypto.randomUUID();
    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", text: message };
    setChatMessages((messages) => [...messages, userMessage]);
    setChatInput("");
    setChatError("");
    setChatLoading(true);
    trackGoogleEvent("assistant_message_sent", { assistant: "signmons_calldesk" });

    try {
      const response = await fetch("/api/signmons", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ sessionId: sessionIdRef.current, message, website: "" }),
      });
      const result = await response.json() as { reply?: string; error?: string; requiresHumanHandoff?: boolean };
      if (!response.ok || !result.reply) {
        throw new Error(result.error || "The assistant could not respond.");
      }

      setChatMessages((messages) => [...messages, {
        id: crypto.randomUUID(),
        role: "assistant",
        text: result.reply as string,
        safety: result.requiresHumanHandoff === true,
      }]);
      trackGoogleEvent("assistant_response_received", {
        assistant: "signmons_calldesk",
        safety_handoff: result.requiresHumanHandoff === true,
      });
    } catch (error) {
      setChatError(error instanceof Error ? error.message : "The assistant could not respond.");
    } finally {
      setChatLoading(false);
    }
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
  }

  return <>
    <button
      ref={launcherRef}
      type="button"
      className="signmons-launcher"
      aria-label="Open Ask Eternity service chatbot"
      aria-haspopup="dialog"
      aria-expanded={open}
      onClick={openAssistant}
    >
      <span className="signmons-launcher-icon" aria-hidden="true">✦</span>
      <span className="signmons-launcher-copy"><b>Ask Eternity</b><small>Service chatbot</small></span>
      <span className="signmons-launcher-actions" aria-hidden="true"><i>Ask</i><i>Service</i><i>Safety</i></span>
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
            Messages are processed by Signmons and OpenAI, may be stored in service logs and may be reviewed by Eternity. This assistant is not a technician, cannot diagnose equipment or book an appointment. Do not enter payment-card, Social Security, medical or other sensitive information.
          </p>

          {screen === "start" && <>
            <div className="signmons-chat-intro">
              <span>AI-assisted service conversation</span>
              <h2>Get a quick first response.</h2>
              <p>Describe the equipment problem in your own words. The assistant can ask follow-up questions and prepare details for human review.</p>
              <button type="button" onClick={startChat}>I understand — start chat</button>
            </div>
            <button type="button" className="signmons-safety-choice" onClick={showSafety}>
              <strong>Gas, carbon monoxide, fire or electrical danger</strong>
              <span>Show immediate safety guidance</span>
            </button>
            <div className="signmons-progress"><span>Prefer guided routing?</span><b>Choose the closest match</b></div>
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
              {chatMessages.map((message) => <div key={message.id} className={`signmons-message ${message.role}${message.safety ? " safety" : ""}`}>
                <span>{message.role === "assistant" ? "Assistant" : "You"}</span>
                <p>{message.text}</p>
              </div>)}
              {chatLoading && <div className="signmons-message assistant loading"><span>Assistant</span><p>Preparing a response…</p></div>}
              <div ref={chatEndRef} />
            </div>
            {chatError && <div className="signmons-chat-error" role="alert">{chatError}</div>}
            <form className="signmons-chat-form" onSubmit={sendChatMessage}>
              <label htmlFor="signmons-message">Describe the equipment or service question</label>
              <textarea
                id="signmons-message"
                value={chatInput}
                maxLength={1000}
                rows={3}
                placeholder="Example: My furnace is running, but the air is not warm."
                onChange={(event) => setChatInput(event.target.value)}
              />
              <div><span>{chatInput.length}/1,000</span><button type="submit" disabled={chatLoading || !chatInput.trim()}>{chatLoading ? "Sending…" : "Send message"}</button></div>
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

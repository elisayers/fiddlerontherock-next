"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

type Status = "idle" | "success" | "error";

function getInitialMessage(searchParams: URLSearchParams) {
  const show = searchParams.get("show");
  const slot = searchParams.get("slot");
  const booking = searchParams.get("booking");
  const type = searchParams.get("type");

  if (booking === "request") {
    return [
      "I would like to request availability.",
      show ? `Show: ${show}` : "",
      slot ? `Preferred slot: ${slot}` : "",
      "Please follow up with current next steps.",
    ].filter(Boolean).join("\n");
  }

  if (type) {
    return `I am reaching out about ${type}.`;
  }

  return "";
}

export default function ContactInquiryForm() {
  const searchParams = useSearchParams();
  const [name, setName] = useState(searchParams.get("name") ?? "");
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [phone, setPhone] = useState(searchParams.get("phone") ?? "");
  const [type, setType] = useState(searchParams.get("type") ?? "Private Serenade");
  const [date, setDate] = useState(searchParams.get("date") ?? "");
  const [message, setMessage] = useState(getInitialMessage(searchParams));
  const [status, setStatus] = useState<Status>(searchParams.get("sent") === "1" ? "success" : "idle");
  const [error, setError] = useState("");

  const helperText = useMemo(() => {
    if (type.toLowerCase().includes("press")) return "Include deadline, outlet, and any asset request.";
    if (type.toLowerCase().includes("merch")) return "Ask for current inventory, signed items, or gift needs.";
    if (type.toLowerCase().includes("ticket")) return "Tell us which show and date you want if you already know it.";
    return "Share the type of experience, your ideal timing, and any planning details that matter.";
  }, [type]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!name.trim() || !email.trim() || !type.trim() || !message.trim()) {
      setStatus("error");
      setError("Please complete all required fields before sending.");
      return;
    }

    const subject = encodeURIComponent(`FOTR Inquiry: ${type}`);
    const body = encodeURIComponent(
      [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "Not provided"}`,
        `Inquiry Type: ${type}`,
        `Preferred Date: ${date || "Not specified"}`,
        "",
        message,
      ].join("\n")
    );

    window.location.href = `mailto:hello@fiddlerontherock.com?subject=${subject}&body=${body}`;
    setStatus("success");
  }

  return (
    <div style={{ display: "grid", gap: "24px" }}>
      <div className="checkout-status-card" style={{ maxWidth: "860px" }}>
        <h4>Direct contact is the current fallback.</h4>
        <p>
          This form prepares your inquiry and opens your email app to send it to <a href="mailto:hello@fiddlerontherock.com">hello@fiddlerontherock.com</a>. If you prefer, you can also email or call Tyler directly after filling in the details below.
        </p>
      </div>

      <form className="form-grid" onSubmit={handleSubmit} noValidate>
        <label>
          Name *
          <input name="name" placeholder="Your name" value={name} onChange={(event) => setName(event.target.value)} required />
        </label>
        <label>
          Email *
          <input name="email" type="email" placeholder="name@email.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>
        <label>
          Phone
          <input name="phone" type="tel" placeholder="Best callback number" value={phone} onChange={(event) => setPhone(event.target.value)} />
        </label>
        <label>
          Inquiry type *
          <select name="type" value={type} onChange={(event) => setType(event.target.value)} required>
            <option>Private Serenade</option>
            <option>Public show tickets</option>
            <option>Private event</option>
            <option>Press</option>
            <option>Merch</option>
            <option>General question</option>
          </select>
          <span style={{ fontSize: "0.78rem", color: "var(--color-muted)" }}>{helperText}</span>
        </label>
        <label>
          Preferred date
          <input name="date" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        </label>
        <label className="full">
          Message *
          <textarea name="message" rows={7} placeholder="Tell us about the experience you want to create." value={message} onChange={(event) => setMessage(event.target.value)} required />
        </label>
        <div className="full" style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
          <button className="btn btn-primary" type="submit">Open Email Draft</button>
          <a className="btn btn-ghost" href="mailto:hello@fiddlerontherock.com">Email Directly</a>
        </div>
      </form>

      {status === "success" ? (
        <div className="checkout-status-card" style={{ maxWidth: "860px" }}>
          <h4>Email draft opened.</h4>
          <p>If your email app did not open, send your inquiry to hello@fiddlerontherock.com and Tyler will reply directly.</p>
        </div>
      ) : null}

      {status === "error" ? (
        <div className="booking-error" style={{ maxWidth: "860px" }}>
          {error}
        </div>
      ) : null}
    </div>
  );
}

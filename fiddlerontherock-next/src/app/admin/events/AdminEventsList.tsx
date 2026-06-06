"use client";

import { useState } from "react";
import { updateEvent } from "./actions";

type TicketType = {
  id: string;
  tier: "general" | "vip";
  audience: "adult" | "kid_18_under" | "under_8";
  label: string;
  price_cents: number;
};

type EventItem = {
  id: string;
  slug: string;
  title: string;
  event_type: "public_show" | "serenade";
  weekday: number | null;
  start_time: string | null;
  default_capacity: number;
  under_8_free_enabled: boolean;
  active: boolean;
  ticket_types?: TicketType[];
};

export default function AdminEventsList({ initialEvents }: { initialEvents: EventItem[] }) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [capacity, setCapacity] = useState(40);
  const [under8Free, setUnder8Free] = useState(true);
  const [active, setActive] = useState(true);
  const [prices, setPrices] = useState<{ [id: string]: number }>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const startEdit = (ev: EventItem) => {
    setEditingId(ev.id);
    setCapacity(ev.default_capacity);
    setUnder8Free(ev.under_8_free_enabled);
    setActive(ev.active);
    const initialPrices: { [id: string]: number } = {};
    ev.ticket_types?.forEach((t) => {
      initialPrices[t.id] = t.price_cents / 100;
    });
    setPrices(initialPrices);
    setMessage(null);
  };

  const handlePriceChange = (id: string, val: string) => {
    const num = parseFloat(val);
    setPrices((prev) => ({ ...prev, [id]: isNaN(num) ? 0 : num }));
  };

  const handleSave = async (eventId: string) => {
    setLoading(true);
    setMessage(null);

    const priceUpdates = Object.entries(prices).map(([id, val]) => ({
      id,
      priceCents: Math.round(val * 100),
    }));

    const res = await updateEvent(eventId, capacity, under8Free, active, priceUpdates);
    setLoading(false);

    if (res.success) {
      setEditingId(null);
      setMessage("Show configuration updated successfully.");
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage("Error: " + res.error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {message && (
        <div
          style={{
            padding: "12px",
            background: message.startsWith("Error") ? "rgba(220, 50, 50, 0.15)" : "rgba(212, 175, 55, 0.1)",
            border: `1px solid ${message.startsWith("Error") ? "rgba(220, 50, 50, 0.3)" : "var(--color-gold)"}`,
            borderRadius: "4px",
            color: message.startsWith("Error") ? "#f87171" : "var(--color-gold)",
            fontSize: "0.9rem",
          }}
        >
          {message}
        </div>
      )}

      {initialEvents.map((ev) => {
        const isEditing = editingId === ev.id;
        return (
          <div
            key={ev.id}
            className="admin-panel"
            style={{
              padding: "24px",
              border: isEditing ? "1px solid var(--color-gold)" : "1px solid rgba(255,255,255,0.08)",
              background: "rgba(20, 16, 12, 0.4)",
              borderRadius: "8px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
              <div>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", margin: 0, color: "var(--color-gold)" }}>
                  {ev.title} <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.4)", verticalAlign: "middle" }}>({ev.slug})</span>
                </h3>
                <p style={{ margin: "4px 0 0 0", fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>
                  {ev.event_type === "public_show" ? "Public Show" : "Private Serenade"} • Standard schedule:{" "}
                  {ev.weekday !== null ? ["Sundays", "Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays", "Saturdays"][ev.weekday] : "Custom"}{" "}
                  {ev.start_time ? `at ${ev.start_time.slice(0, 5)}` : ""}
                </p>
              </div>

              {!isEditing && (
                <button
                  onClick={() => startEdit(ev)}
                  className="button"
                  style={{ padding: "6px 16px", fontSize: "0.85rem", background: "transparent", border: "1px solid var(--color-gold)", color: "var(--color-gold)" }}
                >
                  Edit Configuration
                </button>
              )}
            </div>

            {isEditing ? (
              <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    <label style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>DEFAULT CAPACITY</label>
                    <input
                      type="number"
                      value={capacity}
                      onChange={(e) => setCapacity(parseInt(e.target.value) || 0)}
                      style={{ padding: "8px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", color: "#fff" }}
                    />
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px", height: "100%", marginTop: "20px" }}>
                    <input
                      type="checkbox"
                      id={`active-${ev.id}`}
                      checked={active}
                      onChange={(e) => setActive(e.target.checked)}
                      style={{ cursor: "pointer", width: "18px", height: "18px" }}
                    />
                    <label htmlFor={`active-${ev.id}`} style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", cursor: "pointer" }}>
                      Active (Display publicly)
                    </label>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "10px", height: "100%", marginTop: "20px" }}>
                    <input
                      type="checkbox"
                      id={`free-${ev.id}`}
                      checked={under8Free}
                      onChange={(e) => setUnder8Free(e.target.checked)}
                      style={{ cursor: "pointer", width: "18px", height: "18px" }}
                    />
                    <label htmlFor={`free-${ev.id}`} style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.8)", cursor: "pointer" }}>
                      Under 8 Free Reservation
                    </label>
                  </div>
                </div>

                <div>
                  <h4 style={{ fontSize: "0.9rem", color: "var(--color-gold)", marginBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "4px" }}>
                    Ticket Pricing ($)
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px" }}>
                    {ev.ticket_types
                      ?.filter((t) => t.audience !== "under_8")
                      .map((t) => (
                        <div key={t.id} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                          <label style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>
                            {t.tier.toUpperCase()} {t.audience === "kid_18_under" ? "KIDS" : "ADULT"}
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            value={prices[t.id] ?? 0}
                            onChange={(e) => handlePriceChange(t.id, e.target.value)}
                            style={{ padding: "8px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", color: "#fff" }}
                          />
                        </div>
                      ))}
                  </div>
                </div>

                <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                  <button
                    disabled={loading}
                    onClick={() => handleSave(ev.id)}
                    className="button"
                    style={{ padding: "8px 20px", fontSize: "0.9rem", background: "var(--color-gold)", border: "none", color: "var(--color-bg)" }}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                  <button
                    disabled={loading}
                    onClick={() => setEditingId(null)}
                    className="button"
                    style={{ padding: "8px 20px", fontSize: "0.9rem", background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#fff" }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
                <div>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>CAPACITY & ACCESSIBILITY</span>
                  <div style={{ fontSize: "0.95rem", marginTop: "4px" }}>
                    Default Capacity: <strong>{ev.default_capacity} seats</strong>
                    <br />
                    Under-8 Free: <strong>{ev.under_8_free_enabled ? "Enabled" : "Disabled"}</strong>
                    <br />
                    Status: <strong style={{ color: ev.active ? "#34d399" : "#f87171" }}>{ev.active ? "Active" : "Inactive"}</strong>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>TICKET PRICING</span>
                  <div style={{ fontSize: "0.95rem", marginTop: "4px", display: "flex", flexDirection: "column", gap: "2px" }}>
                    {ev.ticket_types
                      ?.filter((t) => t.audience !== "under_8")
                      .map((t) => (
                        <div key={t.id} style={{ display: "flex", justifyContent: "space-between", maxWidth: "240px" }}>
                          <span>{t.label}:</span>
                          <strong>${(t.price_cents / 100).toFixed(2)}</strong>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

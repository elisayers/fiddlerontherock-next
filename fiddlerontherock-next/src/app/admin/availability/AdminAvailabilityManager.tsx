"use client";

import { useState } from "react";
import { createOccurrence, createAvailabilitySlot, toggleSlotStatus } from "./actions";

type EventItem = {
  id: string;
  title: string;
  default_capacity: number;
};

type Occurrence = {
  id: string;
  event_id: string;
  start_at: string;
  capacity: number;
  paid_count: number;
  held_count: number;
  sold_out_override: boolean;
  active: boolean;
  events?: { title: string };
};

type SerenadeSlot = {
  id: string;
  start_at: string;
  capacity: number;
  paid_count: number;
  held_count: number;
  location_label: string;
  sold_out_override: boolean;
  active: boolean;
};

export default function AdminAvailabilityManager({
  events,
  initialOccurrences,
  initialSerenades,
}: {
  events: EventItem[];
  initialOccurrences: Occurrence[];
  initialSerenades: SerenadeSlot[];
}) {
  const [activeTab, setActiveTab] = useState<"public" | "serenade">("public");
  
  // Public Show Form State
  const [selectedEventId, setSelectedEventId] = useState(events[0]?.id || "");
  const [publicDateTime, setPublicDateTime] = useState("");
  const [publicCapacity, setPublicCapacity] = useState(48);

  // Serenade Form State
  const [serenadeDateTime, setSerenadeDateTime] = useState("");
  const [serenadeLocation, setSerenadeLocation] = useState<"secret_spot" | "open_air_spot">("secret_spot");
  const [serenadeCapacity, setSerenadeCapacity] = useState(10);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleAddPublic = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEventId || !publicDateTime) return;
    setLoading(true);
    setMessage(null);

    const res = await createOccurrence(selectedEventId, publicDateTime, publicCapacity);
    setLoading(false);
    if (res.success) {
      setPublicDateTime("");
      setMessage("Public show occurrence created successfully.");
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage("Error: " + res.error);
    }
  };

  const handleAddSerenade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!serenadeDateTime) return;
    setLoading(true);
    setMessage(null);

    const res = await createAvailabilitySlot(serenadeDateTime, serenadeLocation, serenadeCapacity);
    setLoading(false);
    if (res.success) {
      setSerenadeDateTime("");
      setMessage("Private Serenade slot created successfully.");
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage("Error: " + res.error);
    }
  };

  const handleToggle = async (
    id: string,
    type: "occurrence" | "serenade",
    field: "active" | "sold_out_override",
    currVal: boolean
  ) => {
    setMessage(null);
    const res = await toggleSlotStatus(id, type, field, !currVal);
    if (!res.success) {
      setMessage("Error: " + res.error);
    }
  };

  const formatDt = (isoStr: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(isoStr));
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

      {/* Tabs */}
      <div style={{ display: "flex", gap: "16px", borderBottom: "1px solid rgba(255,255,255,0.08)", paddingBottom: "12px" }}>
        <button
          onClick={() => setActiveTab("public")}
          style={{
            background: "transparent",
            border: "none",
            borderBottom: activeTab === "public" ? "2px solid var(--color-gold)" : "2px solid transparent",
            color: activeTab === "public" ? "var(--color-gold)" : "rgba(255,255,255,0.6)",
            padding: "8px 16px",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Public Show Dates
        </button>
        <button
          onClick={() => setActiveTab("serenade")}
          style={{
            background: "transparent",
            border: "none",
            borderBottom: activeTab === "serenade" ? "2px solid var(--color-gold)" : "2px solid transparent",
            color: activeTab === "serenade" ? "var(--color-gold)" : "rgba(255,255,255,0.6)",
            padding: "8px 16px",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Sedona Serenades Slots
        </button>
      </div>

      {activeTab === "public" ? (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "32px", alignItems: "start" } as any}>
          {/* List of Public Occurrences */}
          <div className="admin-panel" style={{ overflowX: "auto" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--color-gold)", margin: "0 0 16px 0" }}>Active Show Dates</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Show</th>
                  <th>Date & Time</th>
                  <th>Booked</th>
                  <th>Held</th>
                  <th>Capacity</th>
                  <th>Sold Out</th>
                  <th>Visible</th>
                </tr>
              </thead>
              <tbody>
                {initialOccurrences.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", color: "rgba(255,255,255,0.4)" }}>No public occurrences found. Use the panel on the right to create one.</td>
                  </tr>
                ) : (
                  initialOccurrences.map((occ) => (
                    <tr key={occ.id}>
                      <td>{occ.events?.title || "Fiddler on the Rock"}</td>
                      <td>{formatDt(occ.start_at)}</td>
                      <td>{occ.paid_count}</td>
                      <td>{occ.held_count}</td>
                      <td>{occ.capacity}</td>
                      <td>
                        <button
                          onClick={() => handleToggle(occ.id, "occurrence", "sold_out_override", occ.sold_out_override)}
                          style={{
                            padding: "3px 8px",
                            fontSize: "0.75rem",
                            background: occ.sold_out_override ? "var(--color-gold)" : "transparent",
                            border: "1px solid var(--color-gold)",
                            color: occ.sold_out_override ? "var(--color-bg)" : "var(--color-gold)",
                            cursor: "pointer",
                            borderRadius: "3px",
                          }}
                        >
                          {occ.sold_out_override ? "SOLD OUT" : "AVAILABLE"}
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleToggle(occ.id, "occurrence", "active", occ.active)}
                          style={{
                            padding: "3px 8px",
                            fontSize: "0.75rem",
                            background: occ.active ? "#34d399" : "transparent",
                            border: `1px solid ${occ.active ? "#34d399" : "rgba(255,255,255,0.2)"}`,
                            color: occ.active ? "#111" : "rgba(255,255,255,0.6)",
                            cursor: "pointer",
                            borderRadius: "3px",
                          }}
                        >
                          {occ.active ? "PUBLIC" : "HIDDEN"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Add Public Occurrences */}
          <div className="admin-panel" style={{ padding: "24px", background: "rgba(30,25,20,0.4)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--color-gold)", margin: "0 0 20px 0" }}>Schedule Public Show</h3>
            <form onSubmit={handleAddPublic} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>SELECT SHOW TYPE</label>
                <select
                  value={selectedEventId}
                  onChange={(e) => {
                    setSelectedEventId(e.target.value);
                    const defaultCap = events.find((ev) => ev.id === e.target.value)?.default_capacity || 40;
                    setPublicCapacity(defaultCap);
                  }}
                  style={{ padding: "10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", color: "#fff" }}
                >
                  {events.map((ev) => (
                    <option key={ev.id} value={ev.id}>{ev.title}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>DATE & TIME</label>
                <input
                  type="datetime-local"
                  value={publicDateTime}
                  onChange={(e) => setPublicDateTime(e.target.value)}
                  required
                  style={{ padding: "10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", color: "#fff" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>CAPACITY (SEATS)</label>
                <input
                  type="number"
                  value={publicCapacity}
                  onChange={(e) => setPublicCapacity(parseInt(e.target.value) || 0)}
                  required
                  style={{ padding: "10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", color: "#fff" }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="button"
                style={{ background: "var(--color-gold)", color: "var(--color-bg)", border: "none", padding: "12px", fontWeight: "600", cursor: "pointer", marginTop: "8px" }}
              >
                {loading ? "Creating..." : "Add Show Date"}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "32px", alignItems: "start" } as any}>
          {/* List of Serenade Slots */}
          <div className="admin-panel" style={{ overflowX: "auto" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--color-gold)", margin: "0 0 16px 0" }}>Active Serenades Availability</h3>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Date & Time</th>
                  <th>Booked</th>
                  <th>Held</th>
                  <th>Capacity</th>
                  <th>Sold Out</th>
                  <th>Visible</th>
                </tr>
              </thead>
              <tbody>
                {initialSerenades.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: "center", color: "rgba(255,255,255,0.4)" }}>No private serenade slots found. Use the panel on the right to create one.</td>
                  </tr>
                ) : (
                  initialSerenades.map((slot) => (
                    <tr key={slot.id}>
                      <td>{slot.location_label}</td>
                      <td>{formatDt(slot.start_at)}</td>
                      <td>{slot.paid_count}</td>
                      <td>{slot.held_count}</td>
                      <td>{slot.capacity}</td>
                      <td>
                        <button
                          onClick={() => handleToggle(slot.id, "serenade", "sold_out_override", slot.sold_out_override)}
                          style={{
                            padding: "3px 8px",
                            fontSize: "0.75rem",
                            background: slot.sold_out_override ? "var(--color-gold)" : "transparent",
                            border: "1px solid var(--color-gold)",
                            color: slot.sold_out_override ? "var(--color-bg)" : "var(--color-gold)",
                            cursor: "pointer",
                            borderRadius: "3px",
                          }}
                        >
                          {slot.sold_out_override ? "SOLD OUT" : "AVAILABLE"}
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => handleToggle(slot.id, "serenade", "active", slot.active)}
                          style={{
                            padding: "3px 8px",
                            fontSize: "0.75rem",
                            background: slot.active ? "#34d399" : "transparent",
                            border: `1px solid ${slot.active ? "#34d399" : "rgba(255,255,255,0.2)"}`,
                            color: slot.active ? "#111" : "rgba(255,255,255,0.6)",
                            cursor: "pointer",
                            borderRadius: "3px",
                          }}
                        >
                          {slot.active ? "PUBLIC" : "HIDDEN"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Add Serenade Slot */}
          <div className="admin-panel" style={{ padding: "24px", background: "rgba(30,25,20,0.4)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "8px" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", color: "var(--color-gold)", margin: "0 0 20px 0" }}>Create Serenade Slot</h3>
            <form onSubmit={handleAddSerenade} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>SELECT LOCATION</label>
                <select
                  value={serenadeLocation}
                  onChange={(e) => setSerenadeLocation(e.target.value as any)}
                  style={{ padding: "10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", color: "#fff" }}
                >
                  <option value="secret_spot">The Secret Spot (Canyon walk)</option>
                  <option value="open_air_spot">The Open-Air Spot (Red Rock view)</option>
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>DATE & TIME</label>
                <input
                  type="datetime-local"
                  value={serenadeDateTime}
                  onChange={(e) => setSerenadeDateTime(e.target.value)}
                  required
                  style={{ padding: "10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", color: "#fff" }}
                />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                <label style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.7)" }}>SLOT CAPACITY</label>
                <input
                  type="number"
                  value={serenadeCapacity}
                  onChange={(e) => setSerenadeCapacity(parseInt(e.target.value) || 0)}
                  required
                  style={{ padding: "10px", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "4px", color: "#fff" }}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="button"
                style={{ background: "var(--color-gold)", color: "var(--color-bg)", border: "none", padding: "12px", fontWeight: "600", cursor: "pointer", marginTop: "8px" }}
              >
                {loading ? "Creating..." : "Add Availability Slot"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { useState } from "react";

type OrderItem = {
  id: string;
  label: string;
  quantity: number;
  unit_amount_cents: number;
  total_cents: number;
  metadata: any;
};

type Order = {
  id: string;
  show_id: string;
  slot_kind: "event_occurrence" | "availability_slot";
  status: "pending" | "paid" | "canceled" | "expired" | "refunded";
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  subtotal_cents: number;
  capacity_units: number;
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  ghl_contact_id: string | null;
  ghl_opportunity_id: string | null;
  ghl_synced_at: string | null;
  ghl_sync_error: string | null;
  paid_at: string | null;
  created_at: string;
  order_items?: OrderItem[];
};

export default function AdminOrdersList({ initialOrders }: { initialOrders: Order[] }) {
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const filtered = initialOrders.filter((order) => {
    const matchesStatus = filterStatus === "all" || order.status === filterStatus;
    const name = order.customer_name?.toLowerCase() || "";
    const email = order.customer_email?.toLowerCase() || "";
    const show = order.show_id.toLowerCase();
    const q = search.toLowerCase();
    const matchesSearch = name.includes(q) || email.includes(q) || show.includes(q);
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "#34d399";
      case "pending":
        return "#fbbf24";
      case "canceled":
      case "expired":
        return "#f87171";
      default:
        return "#9ca3af";
    }
  };

  const showName = (id: string) => {
    if (id === "one-man-symphony") return "One Man Symphony";
    if (id === "legends-of-the-fiddle") return "Legends of the Fiddle";
    if (id === "sedona-serenades") return "Sedona Serenades";
    return id;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {/* Filters and Search */}
      <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <input
            type="text"
            placeholder="Search by name, email, or show..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "8px 16px",
              width: "280px",
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "4px",
              color: "#fff",
              fontSize: "0.9rem",
            }}
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            style={{
              padding: "8px 12px",
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "4px",
              color: "#fff",
              fontSize: "0.9rem",
            }}
          >
            <option value="all">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="expired">Expired</option>
            <option value="canceled">Canceled</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>

        <div style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }}>
          Found <strong>{filtered.length}</strong> orders
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-panel" style={{ overflowX: "auto" }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Show</th>
              <th>Seats</th>
              <th>Total</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: "center", color: "rgba(255,255,255,0.4)", padding: "20px" }}>
                  No orders found.
                </td>
              </tr>
            ) : (
              filtered.map((order) => (
                <tr key={order.id}>
                  <td style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", fontFamily: "monospace" }}>
                    {order.id.slice(0, 8)}...
                  </td>
                  <td>
                    <strong>{order.customer_name || "Guest User"}</strong>
                    <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.5)" }}>{order.customer_email || "No email"}</div>
                  </td>
                  <td>{showName(order.show_id)}</td>
                  <td>{order.capacity_units}</td>
                  <td>${(order.subtotal_cents / 100).toFixed(2)}</td>
                  <td>
                    <span style={{ color: getStatusColor(order.status), fontWeight: "600", fontSize: "0.85rem" }}>
                      {order.status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    {new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" }).format(
                      new Date(order.created_at)
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedOrder(order)}
                      style={{
                        padding: "4px 10px",
                        fontSize: "0.8rem",
                        background: "transparent",
                        border: "1px solid var(--color-gold)",
                        color: "var(--color-gold)",
                        cursor: "pointer",
                        borderRadius: "3px",
                      }}
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Order Inspection Modal */}
      {selectedOrder && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
            padding: "20px",
          }}
          onClick={() => setSelectedOrder(null)}
        >
          <div
            style={{
              background: "var(--color-bg)",
              border: "1px solid rgba(212, 175, 55, 0.2)",
              borderRadius: "8px",
              maxWidth: "600px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "32px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
              <div>
                <span style={{ color: "var(--color-gold)", fontSize: "0.8rem", letterSpacing: "0.05em" }}>ORDER DETAILS</span>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", margin: "4px 0 0 0" }}>
                  {showName(selectedOrder.show_id)}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "24px" }}>
              <div>
                <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>CUSTOMER INFO</span>
                <div style={{ fontSize: "0.95rem", marginTop: "4px" }}>
                  <strong>{selectedOrder.customer_name || "N/A"}</strong>
                  <div>{selectedOrder.customer_email || "N/A"}</div>
                  <div>{selectedOrder.customer_phone || "N/A"}</div>
                </div>
              </div>

              <div>
                <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>ORDER STATUS</span>
                <div style={{ fontSize: "0.95rem", marginTop: "4px" }}>
                  Status:{" "}
                  <strong style={{ color: getStatusColor(selectedOrder.status) }}>
                    {selectedOrder.status.toUpperCase()}
                  </strong>
                  <div>Capacity Reserved: {selectedOrder.capacity_units} seats</div>
                  <div>Subtotal: ${(selectedOrder.subtotal_cents / 100).toFixed(2)}</div>
                </div>
              </div>
            </div>

            {/* Ticket items */}
            <div style={{ marginBottom: "24px" }}>
              <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>TICKET SELECTIONS & ADD-ONS</span>
              <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "6px" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", textAlign: "left" }}>
                    <th style={{ padding: "8px 0" }}>Item</th>
                    <th style={{ padding: "8px 0", textAlign: "center" }}>Qty</th>
                    <th style={{ padding: "8px 0", textAlign: "right" }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.order_items?.map((item) => (
                    <tr key={item.id} style={{ borderBottom: "1px solid rgba(255,255,255,0.04)", fontSize: "0.9rem" }}>
                      <td style={{ padding: "8px 0" }}>{item.label}</td>
                      <td style={{ padding: "8px 0", textAlign: "center" }}>{item.quantity}</td>
                      <td style={{ padding: "8px 0", textAlign: "right" }}>
                        ${(item.total_cents / 100).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Tech IDs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "20px" }}>
              <div>
                <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>STRIPE DETAILS</span>
                <div style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.7)", fontFamily: "monospace", marginTop: "4px" }}>
                  Session ID: {selectedOrder.stripe_session_id || "N/A"}
                  <br />
                  Payment Intent: {selectedOrder.stripe_payment_intent_id || "N/A"}
                  <br />
                  Paid At: {selectedOrder.paid_at ? new Date(selectedOrder.paid_at).toLocaleString() : "N/A"}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

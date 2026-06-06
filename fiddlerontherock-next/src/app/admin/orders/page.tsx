import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { PageHero, Section } from "@/components/PagePrimitives";
import AdminOrdersList from "./AdminOrdersList";

export const metadata: Metadata = {
  title: "Admin Orders | Fiddler on the Rock",
  description: "Review Fiddler on the Rock booking orders and payment status.",
};

export default async function AdminOrdersPage() {
  const supabase = createClient();

  // Query orders along with their order_items, ordered by created_at descending
  const { data: orders, error } = await supabase
    .from("orders")
    .select(`
      *,
      order_items (*)
    `)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading orders:", error);
  }

  const ordersData = orders || [];

  return (
    <>
      <PageHero
        eyebrow="Admin"
        title="Orders & Sync Audit"
        subtitle="Track seat bookings, payment confirmations, and GHL CRM integration status."
      />
      <Section title="Seat Bookings">
        <AdminOrdersList initialOrders={ordersData as any} />
      </Section>
    </>
  );
}

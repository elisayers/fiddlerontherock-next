import type { Metadata } from "next";
import { PageHero, Section } from "@/components/PagePrimitives";

export const metadata: Metadata = {
  title: "Admin Orders | Fiddler on the Rock",
  description: "Review Fiddler on the Rock booking orders and payment status.",
};

export default function AdminOrdersPage() {
  return (
    <>
      <PageHero eyebrow="Admin" title="Orders and payment status" subtitle="Paid counts must only change after Stripe webhook confirmation, never after the browser success page." />
      <Section title="Order states">
        <div className="admin-grid">
          <div className="admin-panel"><h3>Held</h3><p>Seat hold exists and expires after 15 minutes if checkout is abandoned.</p></div>
          <div className="admin-panel"><h3>Pending</h3><p>Stripe Checkout session created, but payment has not been confirmed by webhook.</p></div>
          <div className="admin-panel"><h3>Paid</h3><p>Webhook verified. Order is confirmed and paid counts are incremented.</p></div>
          <div className="admin-panel"><h3>Released</h3><p>Expired holds are released and no longer block availability.</p></div>
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { CardGrid, InfoCard, PageHero, Section } from "@/components/PagePrimitives";

export const metadata: Metadata = {
  title: "Booking Admin | Fiddler on the Rock",
  description: "Admin dashboard for Fiddler on the Rock booking inventory.",
};

export default function AdminPage() {
  return (
    <>
      <PageHero eyebrow="Admin" title="Booking control room" subtitle="Manage public show dates, Serenades availability, capacities, prices, holds, orders, and Stripe payment status." />
      <Section title="Admin sections">
        <CardGrid>
          <InfoCard title="Events" body="Public show definitions, ticket tiers, capacities, and under-8 free-seat setting." href="/admin/events" cta="Open" />
          <InfoCard title="Availability" body="Create Serenades slots and block Tyler globally across public and private inventory." href="/admin/availability" cta="Open" />
          <InfoCard title="Orders" body="Review pending, held, paid, canceled, and refunded orders after Stripe webhook confirmation." href="/admin/orders" cta="Open" />
        </CardGrid>
        <div className="admin-panel">
          <h3>Before production</h3>
          <p>Connect Supabase Auth, add at least one row in <code>admin_profiles</code>, run the booking migration, and add Stripe webhook secrets in Vercel.</p>
          <Link className="text-link" href="/admin/login">Admin login setup</Link>
        </div>
      </Section>
    </>
  );
}

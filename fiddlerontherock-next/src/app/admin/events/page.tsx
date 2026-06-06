import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { PageHero, Section } from "@/components/PagePrimitives";
import AdminEventsList from "./AdminEventsList";

export const metadata: Metadata = {
  title: "Admin Events | Fiddler on the Rock",
  description: "Manage public Fiddler on the Rock show definitions.",
};

export default async function AdminEventsPage() {
  const supabase = createClient();

  // Query events along with their ticket types
  const { data: events, error } = await supabase
    .from("events")
    .select(`
      *,
      ticket_types (*)
    `)
    .order("title");

  if (error) {
    console.error("Error loading events:", error);
  }

  const eventsData = events || [];

  return (
    <>
      <PageHero
        eyebrow="Admin"
        title="Public Show Setup"
        subtitle="Manage show definitions, general/VIP pricing, default capacities, and under-8 reservation status."
      />
      <Section title="Show Configurations">
        <AdminEventsList initialEvents={eventsData} />
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { PageHero, Section } from "@/components/PagePrimitives";
import AdminAvailabilityManager from "./AdminAvailabilityManager";

export const metadata: Metadata = {
  title: "Admin Availability | Fiddler on the Rock",
  description: "Manage Tyler Carson availability for public shows and Sedona Serenades.",
};

export default async function AdminAvailabilityPage() {
  const supabase = createClient();

  // Query events for occurrence creation selector
  const { data: events } = await supabase
    .from("events")
    .select("id,title,default_capacity")
    .eq("active", true)
    .order("title");

  // Query occurrences ordered by start time
  const { data: occurrences } = await supabase
    .from("event_occurrences")
    .select(`
      *,
      events (title)
    `)
    .order("start_at", { ascending: true });

  // Query availability slots ordered by start time
  const { data: serenades } = await supabase
    .from("availability_slots")
    .select("*")
    .order("start_at", { ascending: true });

  const eventsData = events || [];
  const occurrencesData = occurrences || [];
  const serenadesData = serenades || [];

  return (
    <>
      <PageHero
        eyebrow="Admin"
        title="Tyler's Shared Calendar"
        subtitle="Manage public show occurrences and private Sedona Serenades slots to keep Tyler's calendar coordinated."
      />
      <Section title="Manage Scheduling">
        <AdminAvailabilityManager
          events={eventsData}
          initialOccurrences={occurrencesData as any}
          initialSerenades={serenadesData as any}
        />
      </Section>
    </>
  );
}

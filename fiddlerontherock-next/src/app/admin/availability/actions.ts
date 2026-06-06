"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createOccurrence(eventId: string, startAt: string, capacity: number) {
  const supabase = createClient();
  const start = new Date(startAt);
  const end = new Date(start.getTime() + 90 * 60 * 1000); // default 90 minutes

  const { error } = await supabase.from("event_occurrences").insert({
    event_id: eventId,
    start_at: start.toISOString(),
    end_at: end.toISOString(),
    capacity,
  });

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/availability");
  return { success: true };
}

export async function createAvailabilitySlot(
  startAt: string,
  locationSlug: "secret_spot" | "open_air_spot",
  capacity: number
) {
  const supabase = createClient();
  const start = new Date(startAt);
  const end = new Date(start.getTime() + 120 * 60 * 1000); // 120 mins duration
  const locationLabel = locationSlug === "secret_spot" ? "The Secret Spot" : "The Open-Air Spot";

  const { error } = await supabase.from("availability_slots").insert({
    show_id: "sedona-serenades",
    location_slug: locationSlug,
    location_label: locationLabel,
    start_at: start.toISOString(),
    end_at: end.toISOString(),
    duration_minutes: 120,
    buffer_minutes: 30,
    capacity,
  });

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/availability");
  return { success: true };
}

export async function toggleSlotStatus(
  id: string,
  type: "occurrence" | "serenade",
  field: "active" | "sold_out_override",
  value: boolean
) {
  const supabase = createClient();
  const table = type === "occurrence" ? "event_occurrences" : "availability_slots";
  const columnName = field === "active" ? "active" : "sold_out_override";

  const { error } = await supabase
    .from(table)
    .update({ [columnName]: value })
    .eq("id", id);

  if (error) return { success: false, error: error.message };
  revalidatePath("/admin/availability");
  return { success: true };
}

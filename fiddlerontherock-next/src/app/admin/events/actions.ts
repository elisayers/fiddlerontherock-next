"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateEvent(
  eventId: string,
  defaultCapacity: number,
  under8Free: boolean,
  active: boolean,
  prices: { id: string; priceCents: number }[]
) {
  const supabase = createClient();

  // Update event details
  const { error: eventErr } = await supabase
    .from("events")
    .update({
      default_capacity: defaultCapacity,
      under_8_free_enabled: under8Free,
      active,
    })
    .eq("id", eventId);

  if (eventErr) {
    return { success: false, error: eventErr.message };
  }

  // Update ticket prices
  for (const p of prices) {
    const { error: priceErr } = await supabase
      .from("ticket_types")
      .update({ price_cents: p.priceCents })
      .eq("id", p.id);

    if (priceErr) {
      return { success: false, error: priceErr.message };
    }
  }

  revalidatePath("/admin/events");
  return { success: true };
}

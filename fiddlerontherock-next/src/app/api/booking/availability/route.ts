import { NextResponse } from "next/server";
import { demoAvailability, remainingSeats } from "@/lib/booking/catalog";
import { supabaseConfigured, supabaseRest } from "@/lib/booking/supabase";
import type { ShowId } from "@/lib/booking/types";

type PublicSlotRow = { id: string; start_at: string; end_at: string; capacity: number; paid_count: number; held_count: number; sold_out_override: boolean; events: { slug: ShowId; title: string } };
type SerenadeSlotRow = { id: string; start_at: string; end_at: string; capacity: number; paid_count: number; held_count: number; sold_out_override: boolean; location_slug: string; location_label: string };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const show = (searchParams.get("show") || "one-man-symphony") as ShowId;

  if (supabaseConfigured()) {
    try {
      if (show === "sedona-serenades") {
        const rows = await supabaseRest<SerenadeSlotRow[]>("availability_slots?select=id,start_at,end_at,capacity,paid_count,held_count,sold_out_override,location_slug,location_label&active=eq.true&order=start_at.asc");
        const slots = rows.map((row) => ({
          id: row.id,
          showId: show,
          startsAt: row.start_at,
          endsAt: row.end_at,
          capacity: row.capacity,
          paidCount: row.paid_count,
          heldCount: row.held_count,
          soldOutOverride: row.sold_out_override,
          location: row.location_slug,
          label: row.location_label,
          remaining: Math.max(0, row.capacity - row.paid_count - row.held_count),
          soldOut: row.sold_out_override || row.capacity - row.paid_count - row.held_count <= 0,
        }));
        return NextResponse.json({ slots, demo: false });
      }

      const rows = await supabaseRest<PublicSlotRow[]>(`event_occurrences?select=id,start_at,end_at,capacity,paid_count,held_count,sold_out_override,events!inner(slug,title)&events.slug=eq.${show}&active=eq.true&order=start_at.asc`);
      const slots = rows.map((row) => ({
        id: row.id,
        showId: row.events.slug,
        startsAt: row.start_at,
        endsAt: row.end_at,
        capacity: row.capacity,
        paidCount: row.paid_count,
        heldCount: row.held_count,
        soldOutOverride: row.sold_out_override,
        label: row.events.title,
        remaining: Math.max(0, row.capacity - row.paid_count - row.held_count),
        soldOut: row.sold_out_override || row.capacity - row.paid_count - row.held_count <= 0,
      }));
      return NextResponse.json({ slots, demo: false });
    } catch (e) {
      console.warn("Supabase fetch failed, falling back to demo mode:", e);
    }
  }

  const slots = demoAvailability(show).map((slot) => ({ ...slot, remaining: remainingSeats(slot), soldOut: remainingSeats(slot) <= 0 }));
  return NextResponse.json({ slots, demo: true });
}

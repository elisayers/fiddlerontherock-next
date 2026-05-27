import { NextResponse } from "next/server";
import { priceBooking } from "@/lib/booking/pricing";
import { createCheckoutSession } from "@/lib/booking/stripe";
import { supabaseConfigured, supabaseRpc } from "@/lib/booking/supabase";
import { stripeConfigured } from "@/lib/booking/stripe";
import type { BookingSelection } from "@/lib/booking/types";

export async function POST(request: Request) {
  try {
    const selection = (await request.json()) as BookingSelection;
    const priced = priceBooking(selection);
    if (priced.errors.length) return NextResponse.json({ error: priced.errors.join(" ") }, { status: 400 });
    if (priced.requiresRequest) return NextResponse.json({ requestOnly: true, redirectUrl: "/contact?booking=request" });
    if (!supabaseConfigured() || !stripeConfigured()) return NextResponse.json({ error: "Online checkout is temporarily paused while payment setup is connected." }, { status: 503 });

    let orderId = "demo_" + Date.now();
    let demo = true;

    const slotKind = selection.showId === "sedona-serenades" ? "availability_slot" : "event_occurrence";
    orderId = await supabaseRpc<string>("booking_place_hold", {
      p_show_id: selection.showId,
      p_slot_kind: slotKind,
      p_slot_id: selection.slotId,
      p_capacity_units: priced.capacityUnits,
      p_subtotal_cents: priced.subtotal,
      p_source_attribution: selection.source ?? null,
      p_items: priced.lines,
    });
    demo = false;

    const origin = new URL(request.url).origin;
    const session = await createCheckoutSession({
      orderId,
      priced,
      successUrl: origin + "/booking/success",
      cancelUrl: origin + "/booking/canceled",
      metadata: { orderId, showId: selection.showId, slotId: selection.slotId, source: selection.source ?? "" },
    });

    return NextResponse.json({ url: session.url, checkoutUrl: session.url, orderId, priced, holdExpiresInMinutes: 15, demo });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Checkout failed." }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { priceBooking } from "@/lib/booking/pricing";
import { createCheckoutSession } from "@/lib/booking/stripe";
import { supabaseConfigured, supabaseRpc, supabasePatch } from "@/lib/booking/supabase";
import { stripeConfigured } from "@/lib/booking/stripe";
import type { BookingSelection } from "@/lib/booking/types";

export async function POST(request: Request) {
  try {
    const selection = (await request.json()) as BookingSelection;
    const priced = priceBooking(selection);
    const requestParams = new URLSearchParams({
      booking: "request",
      show: selection.showId,
      source: selection.source ?? "",
      checkout: "offline",
    });
    if (selection.slotId) requestParams.set("slot", selection.slotId);
    if (selection.customer?.name) requestParams.set("name", selection.customer.name);
    if (selection.customer?.email) requestParams.set("email", selection.customer.email);
    if (selection.customer?.phone) requestParams.set("phone", selection.customer.phone);

    if (priced.errors.length) return NextResponse.json({ error: priced.errors.join(" ") }, { status: 400 });
    if (priced.requiresRequest) return NextResponse.json({ requestOnly: true, redirectUrl: "/contact?" + requestParams.toString() });
    if (!supabaseConfigured() || !stripeConfigured()) return NextResponse.json({ requestOnly: true, redirectUrl: "/contact?" + requestParams.toString() });

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

    // Save customer details in orders table right after hold is placed
    if (selection.customer) {
      await supabasePatch(`orders?id=eq.${orderId}`, {
        customer_name: selection.customer.name ?? null,
        customer_email: selection.customer.email ?? null,
        customer_phone: selection.customer.phone ?? null,
      });
    }

    const origin = new URL(request.url).origin;
    const session = await createCheckoutSession({
      orderId,
      priced,
      successUrl: origin + "/booking/success",
      cancelUrl: origin + "/booking/canceled",
      metadata: { orderId, showId: selection.showId, slotId: selection.slotId, source: selection.source ?? "" },
      customerEmail: selection.customer?.email,
    });

    return NextResponse.json({ url: session.url, checkoutUrl: session.url, orderId, priced, holdExpiresInMinutes: 15, demo });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Checkout failed." }, { status: 500 });
  }
}

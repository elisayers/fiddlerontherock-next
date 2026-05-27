import { NextResponse } from "next/server";
import { verifyStripeWebhook } from "@/lib/booking/stripe";
import { supabaseConfigured, supabasePatch, supabaseRpc } from "@/lib/booking/supabase";
import { recordGhlSyncError, syncBookingToGhl } from "@/lib/ghl";

export async function POST(request: Request) {
  const rawBody = await request.text();
  try {
    const event = await verifyStripeWebhook(rawBody, request.headers.get("stripe-signature"));
    if (event.type === "checkout.session.completed") {
      const orderId = event.data.object.metadata?.orderId ?? null;
      if (orderId && supabaseConfigured()) {
        await supabaseRpc("booking_confirm_stripe_order", {
          p_order_id: orderId,
          p_session_id: event.data.object.id,
          p_payment_intent_id: event.data.object.payment_intent ?? null,
          p_raw_event: event,
        });
        await supabasePatch(`orders?id=eq.${orderId}`, {
          customer_name: event.data.object.customer_details?.name ?? null,
          customer_email: event.data.object.customer_details?.email ?? null,
          customer_phone: event.data.object.customer_details?.phone ?? null,
        });
        try {
          await syncBookingToGhl({
            orderId,
            stripeSessionId: event.data.object.id,
            stripePaymentIntentId: event.data.object.payment_intent ?? null,
            stripeCustomer: event.data.object.customer_details,
            stripeAmountTotal: event.data.object.amount_total ?? null,
          });
        } catch (ghlError) {
          console.error("GoHighLevel booking sync failed", { orderId, error: ghlError });
          await recordGhlSyncError(orderId, ghlError);
        }
      }
      return NextResponse.json({ received: true, confirmed: true, orderId });
    }
    return NextResponse.json({ received: true, ignored: event.type });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid webhook." }, { status: 400 });
  }
}

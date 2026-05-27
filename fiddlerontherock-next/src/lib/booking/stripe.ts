import type { PricedOrder } from "./types";
import { createHmac, timingSafeEqual } from "node:crypto";

export function stripeConfigured() { return Boolean(process.env.STRIPE_SECRET_KEY); }
export async function createCheckoutSession(input: { orderId: string; priced: PricedOrder; successUrl: string; cancelUrl: string; metadata: Record<string, string> }) { const secret = process.env.STRIPE_SECRET_KEY; if (!secret) return { url: input.successUrl + "?mock=1&order=" + encodeURIComponent(input.orderId) }; const params = new URLSearchParams(); params.set("mode", "payment"); params.set("success_url", input.successUrl + "?session_id={CHECKOUT_SESSION_ID}"); params.set("cancel_url", input.cancelUrl); params.set("phone_number_collection[enabled]", "true"); params.set("billing_address_collection", "auto"); Object.entries(input.metadata).forEach(([key, value]) => params.set("metadata[" + key + "]", value)); input.priced.lines.filter((line) => line.total > 0).forEach((line, index) => { params.set("line_items[" + index + "][quantity]", String(line.quantity)); params.set("line_items[" + index + "][price_data][currency]", "usd"); params.set("line_items[" + index + "][price_data][unit_amount]", String(line.unitAmount)); params.set("line_items[" + index + "][price_data][product_data][name]", line.label); }); const response = await fetch("https://api.stripe.com/v1/checkout/sessions", { method: "POST", headers: { Authorization: "Bearer " + secret, "Content-Type": "application/x-www-form-urlencoded", "Stripe-Version": "2026-02-25.clover" }, body: params }); if (!response.ok) throw new Error(await response.text()); return (await response.json()) as { url: string; id: string }; }

export async function verifyStripeWebhook(rawBody: string, signature: string | null) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret || !signature) throw new Error("Stripe webhook secret or signature missing.");

  const parts = Object.fromEntries(signature.split(",").map((part) => {
    const [key, value] = part.split("=");
    return [key, value];
  }));
  const timestamp = parts.t;
  const v1 = parts.v1;
  if (!timestamp || !v1) throw new Error("Stripe webhook signature is malformed.");

  const ageSeconds = Math.abs(Date.now() / 1000 - Number(timestamp));
  if (!Number.isFinite(ageSeconds) || ageSeconds > 300) throw new Error("Stripe webhook signature is outside tolerance.");

  const expected = createHmac("sha256", secret).update(`${timestamp}.${rawBody}`).digest("hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  const receivedBuffer = Buffer.from(v1, "hex");
  if (expectedBuffer.length !== receivedBuffer.length || !timingSafeEqual(expectedBuffer, receivedBuffer)) {
    throw new Error("Stripe webhook signature verification failed.");
  }

  return JSON.parse(rawBody) as {
    type: string;
    id: string;
    data: {
      object: {
        id: string;
        amount_total?: number;
        customer_details?: { name?: string | null; email?: string | null; phone?: string | null };
        metadata?: Record<string, string>;
        payment_status?: string;
        payment_intent?: string;
      };
    };
  };
}

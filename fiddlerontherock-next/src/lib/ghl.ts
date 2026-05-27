import { supabaseConfigured, supabasePatch, supabaseRest } from "@/lib/booking/supabase";

type StripeCustomerDetails = {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
};

type GhlSyncInput = {
  orderId: string;
  stripeSessionId: string;
  stripePaymentIntentId?: string | null;
  stripeCustomer?: StripeCustomerDetails;
  stripeAmountTotal?: number | null;
};

type BookingOrder = {
  id: string;
  show_id: string;
  slot_kind: "event_occurrence" | "availability_slot";
  slot_id: string;
  customer_name: string | null;
  customer_email: string | null;
  customer_phone: string | null;
  subtotal_cents: number;
  capacity_units: number;
  stripe_session_id: string | null;
  stripe_payment_intent_id: string | null;
  ghl_contact_id: string | null;
  ghl_opportunity_id: string | null;
  ghl_synced_at: string | null;
};

type BookingItem = {
  label: string;
  quantity: number;
  total_cents: number;
};

type PublicOccurrence = {
  start_at: string;
  end_at: string;
  events: { title: string; slug: string };
};

type SerenadeSlot = {
  start_at: string;
  end_at: string;
  location_label: string;
};

type GhlPipeline = {
  id: string;
  name: string;
  stages?: { id: string; name: string }[];
};

const showLabels: Record<string, string> = {
  "one-man-symphony": "One Man Symphony",
  "legends-of-the-fiddle": "Legends of the Fiddle",
  "sedona-serenades": "Sedona Serenades",
};

const bookingTags: Record<string, string> = {
  "one-man-symphony": "Booked - One Man Symphony",
  "legends-of-the-fiddle": "Booked - Legends of the Fiddle",
  "sedona-serenades": "Booked - Sedona Serenades",
};

export function ghlConfigured() {
  return Boolean(process.env.GHL_API_KEY && process.env.GHL_LOCATION_ID && process.env.GHL_PIPELINE_ID);
}

async function ghlRequest<T>(path: string, options: { method?: string; body?: unknown } = {}): Promise<T> {
  const apiKey = process.env.GHL_API_KEY;
  if (!apiKey) throw new Error("GHL_API_KEY is not configured.");

  const response = await fetch(`https://services.leadconnectorhq.com${path}`, {
    method: options.method ?? "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      Version: "2021-07-28",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store",
  });

  if (!response.ok) throw new Error(await response.text());
  return (await response.json()) as T;
}

async function getOrder(orderId: string) {
  const [order] = await supabaseRest<BookingOrder[]>(`orders?select=*&id=eq.${orderId}&limit=1`);
  if (!order) throw new Error("Order not found for GHL sync.");
  return order;
}

async function getOrderItems(orderId: string) {
  return supabaseRest<BookingItem[]>(`order_items?select=label,quantity,total_cents&order_id=eq.${orderId}&order=id.asc`);
}

async function getBookingSlot(order: BookingOrder) {
  if (order.slot_kind === "event_occurrence") {
    const [slot] = await supabaseRest<PublicOccurrence[]>(`event_occurrences?select=start_at,end_at,events(title,slug)&id=eq.${order.slot_id}&limit=1`);
    return { selectedDateTime: slot?.start_at ?? "", eventShowName: slot?.events?.title ?? showLabels[order.show_id] ?? order.show_id };
  }

  const [slot] = await supabaseRest<SerenadeSlot[]>(`availability_slots?select=start_at,end_at,location_label&id=eq.${order.slot_id}&limit=1`);
  return { selectedDateTime: slot?.start_at ?? "", eventShowName: `${showLabels[order.show_id] ?? "Sedona Serenades"}${slot?.location_label ? ` - ${slot.location_label}` : ""}` };
}

async function getPipelineStageId() {
  const pipelines = await ghlRequest<{ pipelines?: GhlPipeline[] }>(`/opportunities/pipelines?locationId=${process.env.GHL_LOCATION_ID}`);
  const pipeline = pipelines.pipelines?.find((item) => item.id === process.env.GHL_PIPELINE_ID || item.name === "Fiddler Bookings");
  const stageId = pipeline?.stages?.[0]?.id;
  if (!stageId) throw new Error("GHL pipeline stage not found for Fiddler Bookings.");
  return stageId;
}

async function upsertContact(input: { name: string; email: string; phone: string; tag: string; orderId: string }) {
  const response = await ghlRequest<{ contact?: { id?: string }; id?: string }>("/contacts/upsert", {
    method: "POST",
    body: {
      locationId: process.env.GHL_LOCATION_ID,
      name: input.name,
      email: input.email,
      phone: input.phone,
      tags: [input.tag],
      source: "Fiddler on the Rock booking checkout",
      customFields: [{ key: "last_booking_order_id", field_value: input.orderId }],
    },
  });

  const contactId = response.contact?.id ?? response.id;
  if (!contactId) throw new Error("GHL contact upsert did not return a contact ID.");
  return contactId;
}

async function createOrUpdateOpportunity(input: {
  opportunityId?: string | null;
  contactId: string;
  orderId: string;
  opportunityName: string;
  eventShowName: string;
  selectedDateTime: string;
  quantity: number;
  totalPaidCents: number;
  stripeSessionId: string;
  stripePaymentIntentId?: string | null;
}) {
  const stageId = await getPipelineStageId();
  const body = {
    locationId: process.env.GHL_LOCATION_ID,
    pipelineId: process.env.GHL_PIPELINE_ID,
    pipelineStageId: stageId,
    contactId: input.contactId,
    name: input.opportunityName,
    status: "open",
    monetaryValue: input.totalPaidCents / 100,
    customFields: [
      { key: "booking_order_id", field_value: input.orderId },
      { key: "event_show_name", field_value: input.eventShowName },
      { key: "selected_date_time", field_value: input.selectedDateTime },
      { key: "quantity", field_value: String(input.quantity) },
      { key: "total_paid", field_value: String(input.totalPaidCents / 100) },
      { key: "stripe_session_id", field_value: input.stripeSessionId },
      { key: "stripe_payment_id", field_value: input.stripePaymentIntentId ?? "" },
    ],
  };

  if (input.opportunityId) {
    const response = await ghlRequest<{ opportunity?: { id?: string }; id?: string }>(`/opportunities/${input.opportunityId}`, { method: "PUT", body });
    return response.opportunity?.id ?? response.id ?? input.opportunityId;
  }

  const response = await ghlRequest<{ opportunity?: { id?: string }; id?: string }>("/opportunities/", { method: "POST", body });
  const opportunityId = response.opportunity?.id ?? response.id;
  if (!opportunityId) throw new Error("GHL opportunity call did not return an opportunity ID.");
  return opportunityId;
}

export async function syncBookingToGhl(input: GhlSyncInput) {
  if (!supabaseConfigured()) return { skipped: true, reason: "Supabase is not configured." };
  if (!ghlConfigured()) return { skipped: true, reason: "GoHighLevel is not configured." };

  const order = await getOrder(input.orderId);
  if (order.ghl_synced_at && order.ghl_contact_id && order.ghl_opportunity_id) {
    return { skipped: true, reason: "Order already synced to GoHighLevel.", contactId: order.ghl_contact_id, opportunityId: order.ghl_opportunity_id };
  }

  const items = await getOrderItems(order.id);
  const slot = await getBookingSlot(order);
  const name = input.stripeCustomer?.name ?? order.customer_name ?? "";
  const email = input.stripeCustomer?.email ?? order.customer_email ?? "";
  const phone = input.stripeCustomer?.phone ?? order.customer_phone ?? "";
  const tag = bookingTags[order.show_id] ?? "Booked - Fiddler on the Rock";
  const totalPaidCents = input.stripeAmountTotal ?? order.subtotal_cents;
  const quantity = order.capacity_units || items.reduce((sum, item) => sum + item.quantity, 0);

  if (!email && !phone) throw new Error("Cannot sync booking to GHL without customer email or phone.");

  const contactId = await upsertContact({ name, email, phone, tag, orderId: order.id });
  const opportunityId = await createOrUpdateOpportunity({
    opportunityId: order.ghl_opportunity_id,
    contactId,
    orderId: order.id,
    opportunityName: `${slot.eventShowName} - ${name || email || phone}`,
    eventShowName: slot.eventShowName,
    selectedDateTime: slot.selectedDateTime,
    quantity,
    totalPaidCents,
    stripeSessionId: input.stripeSessionId,
    stripePaymentIntentId: input.stripePaymentIntentId,
  });

  await supabasePatch<BookingOrder[]>(`orders?id=eq.${order.id}`, {
    customer_name: name || null,
    customer_email: email || null,
    customer_phone: phone || null,
    ghl_contact_id: contactId,
    ghl_opportunity_id: opportunityId,
    ghl_synced_at: new Date().toISOString(),
    ghl_sync_error: null,
  });

  return { skipped: false, contactId, opportunityId };
}

export async function recordGhlSyncError(orderId: string, error: unknown) {
  if (!supabaseConfigured()) return;
  const message = error instanceof Error ? error.message : "Unknown GoHighLevel sync error.";
  await supabasePatch<BookingOrder[]>(`orders?id=eq.${orderId}`, {
    ghl_sync_error: message.slice(0, 2000),
  });
}

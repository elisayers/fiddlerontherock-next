# Fiddler on the Rock Booking MVP Setup

This app now includes the custom booking MVP structure for Supabase + Stripe Checkout.

## Current Mode

Without live environment variables, the app runs in demo mode:

- Availability comes from local seeded demo dates.
- Stripe Checkout returns the local success page instead of charging.
- Admin pages show the control structure and setup requirements.

## Required Environment Variables

Add these locally and in Vercel before production booking is enabled:

```bash
NEXT_PUBLIC_SITE_URL=https://www.fiddlerontherock.com
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
GHL_API_KEY=
GHL_LOCATION_ID=
GHL_PIPELINE_ID=
```

Never expose `SUPABASE_SERVICE_ROLE_KEY`, `STRIPE_SECRET_KEY`, or `GHL_API_KEY` to browser code.

## Supabase Setup

1. Create the Supabase project.
2. Run `supabase/migrations/202605260001_booking_mvp.sql`.
3. Create the admin user with Supabase Auth.
4. Insert the admin user's auth UUID into `admin_profiles`.
5. Add real `event_occurrences` for One Man Symphony and Legends of the Fiddle.
6. Add real `availability_slots` for Sedona Serenades.

## Stripe Setup

1. Create Stripe account products only if desired; Checkout Sessions can also use dynamic line items.
2. Add `STRIPE_SECRET_KEY`.
3. Create a webhook endpoint for `/api/stripe/webhook`.
4. Subscribe to `checkout.session.completed`.
5. Add `STRIPE_WEBHOOK_SECRET`.
6. Test with Stripe CLI or dashboard test events.

## GoHighLevel Setup

1. Create or confirm the pipeline named `Fiddler Bookings`.
2. Add the pipeline ID to `GHL_PIPELINE_ID`.
3. Add the location ID to `GHL_LOCATION_ID`.
4. Add a private integration/API key to `GHL_API_KEY`.
5. Create custom fields in GHL for the booking data if you want them visible on opportunities:
   - `booking_order_id`
   - `event_show_name`
   - `selected_date_time`
   - `quantity`
   - `total_paid`
   - `stripe_session_id`
   - `stripe_payment_id`
6. The webhook sync creates or updates the contact, applies the matching booking tag, and creates or updates one opportunity per order.

## Booking Rules Implemented

- Public shows use one compact form: date/time, General or VIP, adult count, kids count, under-8 free reservation count, source attribution.
- Sedona Serenades uses one compact form: date/time, direct-bookable package, guest count, allowed add-ons, and source attribution.
- Request-only paths stay out of checkout: Photography, Your Location, Sedona Memory Package, and Private Events for 11+ guests.
- No per-person VIP upgrade cards, cancellation protection, discount codes, or gift cards in MVP.
- Checkout holds seats for 15 minutes conceptually; production hold persistence requires Supabase env connection.
- Paid counts must only increase from verified Stripe webhook events.
- After Stripe confirms payment, GoHighLevel sync runs as a best-effort CRM step. Ticket fulfillment stays successful even if GHL is temporarily unavailable.

## Production Gap List

- Add editable Supabase Auth admin forms to replace the current admin setup screens.
- Confirm the GHL opportunity custom field keys match the live location's configured custom fields.

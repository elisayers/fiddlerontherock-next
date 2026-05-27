# CODEX_REBUILD_GUIDE.md - Fiddler on the Rock

This is the active rebuild guide for Codex work on the Next.js public site.

## Priorities

- Sell the Sedona experience first: Living Music, red rocks, sunset, intimacy, and national credibility.
- Keep Tyler as the guide and the visitor as the hero.
- Preserve the dark luxury design system from DESIGN_SYSTEM.md: Ink, Gold, Cream, Cormorant Garamond, DM Sans, Space Mono.
- Use Framer Motion for section reveals, hover lifts, video facades, and cinematic transitions without hurting Core Web Vitals.
- Keep all video interaction on-site through VideoFacade or local video files.

## Architecture

Primary pages: Home, Experiences, One Man Symphony, Legends of the Fiddle, Sedona Serenades, Booking, Media, CBS, Documentary, Videos, Music, Press, What People Say, Merch, Support, About, Contact.

Public URLs stay short: /cbs, /documentary, /videos, /music. The /media page is a hub, not the parent URL for every media page.

## Booking, Commerce, and CRM

- Tickets: custom Supabase + Stripe Checkout booking MVP inside this Next.js app.
- Stripe Checkout collects payment. Paid counts must only increase after the verified Stripe webhook confirms `checkout.session.completed`.
- Public show UX uses one compact form: date, General or VIP, attendee counts, and source attribution.
- Sedona Serenades direct checkout includes The Secret Spot and The Open-Air Spot only.
- Request-only paths: Photography, Your Location, Sedona Memory Package, and private events for 11+ guests.
- Merch: Square catalog and checkout only after catalog cleanup.
- GoHighLevel is no longer the primary ticketing layer; use it only for CRM/follow-up if reintroduced later.
- GoHighLevel sync now runs after verified Stripe payment: create/update contact, apply booking tag, and create/update a `Fiddler Bookings` opportunity.
- Ticket fulfillment must remain independent from GoHighLevel. If GHL is down, log the sync error and keep the booking paid/confirmed.
- Production booking setup lives in `BOOKING_MVP_SETUP.md`; database schema lives in `supabase/migrations/202605260001_booking_mvp.sql`.

## Ratings

The /what-people-say page is built for live official API integration. Use Google Places, Yelp Fusion, Tripadvisor Content API, and Meta/Facebook only where permissions and display rules allow. Cache provider responses server-side. Exclude owner responses.

## SEO

Every route should have metadata. Preserve clean redirects from legacy Wix-ish URLs. Use Event schema for public shows, LocalBusiness/PerformingGroup schema sitewide, Video schema for CBS/documentary/video pages, and Product schema only after Square merch data is clean.

## Launch Checklist

- Connect Supabase and Stripe environment variables.
- Connect GoHighLevel environment variables for post-payment CRM sync.
- Replace demo availability with real public show dates and Serenades slots.
- Confirm Stripe webhook updates orders and capacity before taking live payments.
- Replace placeholder Square merch links with production links.
- Confirm CBS/documentary video files or rights-cleared embed sources.
- Clean Square merch catalog before exposing live merch products.
- Add real review API keys and cache layer.
- Verify sitemap, robots, metadata, OpenGraph, schema, and mobile navigation.

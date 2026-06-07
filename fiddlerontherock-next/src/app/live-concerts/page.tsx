import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/PagePrimitives";
import { supabaseConfigured } from "@/lib/booking/supabase";
import { createClient } from "@/utils/supabase/server";
import { demoAvailability } from "@/lib/booking/catalog";
import { experiences } from "@/lib/data";
import EventsCalendar from "./EventsCalendar";
import "./events.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Live Concerts | Fiddler on the Rock",
  description: "Browse upcoming live violin performances by Tyler Carson in Sedona, Arizona. Reserve your tickets online.",
};

type UpcomingEvent = {
  id: string;
  slug: string;
  title: string;
  startAt: string;
  endAt: string;
  capacity: number;
  paidCount: number;
  heldCount: number;
  location: string;
  image: string;
  generalPrice: string;
  vipPrice: string;
  soldOut: boolean;
  isWeekly: boolean;
};

export default async function EventsPage() {
  let upcomingEvents: UpcomingEvent[] = [];
  let isDemo = true;

  if (supabaseConfigured()) {
    try {
      const supabase = createClient();
      
      // Query upcoming occurrences
      const { data: occurrences, error: occErr } = await supabase
        .from("event_occurrences")
        .select(`
          id,
          start_at,
          end_at,
          capacity,
          paid_count,
          held_count,
          sold_out_override,
          active,
          events (
            id,
            slug,
            title,
            event_type,
            weekday,
            default_capacity
          )
        `)
        .eq("active", true)
        .gte("start_at", new Date().toISOString())
        .order("start_at", { ascending: true });

      // Query ticket prices
      const { data: ticketTypes } = await supabase
        .from("ticket_types")
        .select("event_id, tier, price_cents, active")
        .eq("active", true);

      if (!occErr && occurrences && occurrences.length > 0) {
        isDemo = false;
        upcomingEvents = occurrences.map((occ: any) => {
          const showSlug = occ.events?.slug || "one-man-symphony";
          const exp = experiences.find((e) => e.id === showSlug);
          
          // Find pricing
          const eventId = occ.events?.id;
          const prices = ticketTypes?.filter((t) => t.event_id === eventId) || [];
          const genPriceVal = prices.find((p) => p.tier === "general")?.price_cents;
          const vipPriceVal = prices.find((p) => p.tier === "vip")?.price_cents;

          const remaining = Math.max(0, occ.capacity - occ.paid_count - occ.held_count);
          const isSoldOut = Boolean(occ.sold_out_override) || remaining <= 0;

          return {
            id: occ.id,
            slug: showSlug,
            title: occ.events?.title || "Live Performance",
            startAt: occ.start_at,
            endAt: occ.end_at,
            capacity: occ.capacity,
            paidCount: occ.paid_count,
            heldCount: occ.held_count,
            location: exp?.where || "Sedona, Arizona",
            image: exp?.image || "/images/red-rock-concert.jpg",
            generalPrice: genPriceVal ? `$${(genPriceVal / 100).toFixed(2)}` : "$55.00",
            vipPrice: vipPriceVal ? `$${(vipPriceVal / 100).toFixed(2)}` : "$85.00",
            soldOut: isSoldOut,
            isWeekly: occ.events?.weekday !== null,
          };
        });
      }
    } catch (e) {
      console.error("Supabase query failed, falling back to static seeded data:", e);
    }
  }

  // Fallback to local seeded/demo catalog data
  if (upcomingEvents.length === 0) {
    const omsDemo = demoAvailability("one-man-symphony");
    const lotfDemo = demoAvailability("legends-of-the-fiddle");

    const combinedDemo = [...omsDemo, ...lotfDemo].sort(
      (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime()
    );

    upcomingEvents = combinedDemo.map((slot) => {
      const exp = experiences.find((e) => e.id === slot.showId);
      const remaining = Math.max(0, slot.capacity - slot.paidCount - slot.heldCount);
      const isSoldOut = remaining <= 0;

      return {
        id: slot.id,
        slug: slot.showId,
        title: slot.label || (slot.showId === "one-man-symphony" ? "One Man Symphony" : "Legends of the Fiddle"),
        startAt: slot.startsAt,
        endAt: slot.endsAt,
        capacity: slot.capacity,
        paidCount: slot.paidCount,
        heldCount: slot.heldCount,
        location: exp?.where || "Sedona, Arizona",
        image: exp?.image || "/images/red-rock-concert.jpg",
        generalPrice: "$55.00",
        vipPrice: "$85.00",
        soldOut: isSoldOut,
        isWeekly: true,
      };
    });
  }

  return (
    <>
      <PageHero
        eyebrow="Live Concerts"
        title="Sedona Concert Schedule"
        subtitle="Experience live violin in the heart of Sedona's majestic landscape. Select a gold-rimmed date on the calendar below to reserve your seats."
        image="/images/red-rock-concert.jpg"
      />

      <Section>
        <div className="events-container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
            <h2 className="section-title" style={{ margin: 0 }}>Upcoming Performances</h2>
            {isDemo && (
              <span style={{ fontSize: "0.8rem", color: "rgba(255, 255, 255, 0.4)", border: "1px solid rgba(255, 255, 255, 0.15)", padding: "4px 8px", borderRadius: "4px" }}>
                Demo Schedule
              </span>
            )}
          </div>

          {/* Render calendar view component */}
          <EventsCalendar initialEvents={upcomingEvents} />

          <div className="special-notice-box">
            <h3>Planning a Private Event?</h3>
            <p>
              Book an exclusive, private concert for your group, proposal, anniversary, or milestone event. Tyler will perform just for you at a scenic Red Rock overlook.
            </p>
            <Link href="/private-events" className="btn btn-primary" style={{ padding: "10px 28px" }}>
              Explore Private Events
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

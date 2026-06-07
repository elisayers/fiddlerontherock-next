import type { Metadata } from "next";
import { PageHero, Section } from "@/components/PagePrimitives";

export const metadata: Metadata = {
  title: "Terms of Service | Fiddler on the Rock",
  description: "Terms of Service for Fiddler on the Rock. Learn about booking rules, cancellations, and venue guidelines.",
};

export default function TermsOfServicePage() {
  return (
    <div className="site-main">
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="Last Updated: June 2026"
        image="/images/tyler-performance.jpg"
      />

      <Section>
        <div style={{ maxWidth: "800px", margin: "0 auto", color: "var(--color-cream-soft)", lineHeight: "1.8" }}>
          <p className="lede" style={{ color: "var(--color-cream)" }}>
            Welcome to Fiddler on the Rock. By accessing our website, purchasing tickets, or booking a private experience, you agree to comply with and be bound by the following Terms of Service.
          </p>

          <h3 style={{ color: "var(--color-gold)", margin: "40px 0 20px", fontFamily: "var(--font-serif)", fontSize: "1.8rem" }}>1. Booking and Payments</h3>
          <p>
            All ticket purchases for live public concerts and reservation fees for private Sedona Serenades must be paid in full at checkout. Payments are processed securely via Stripe. Your seats are held for 15 minutes conceptually during checkout.
          </p>

          <h3 style={{ color: "var(--color-gold)", margin: "40px 0 20px", fontFamily: "var(--font-serif)", fontSize: "1.8rem" }}>2. Cancellation & Weather Policy</h3>
          <p>
            Tyler Carson performs live outdoor concerts in natural Sedona settings. In the event of high winds, rain, or severe weather conditions:
          </p>
          <ul style={{ paddingLeft: "20px", margin: "16px 0" }}>
            <li><strong>Public Shows (e.g. One Man Symphony):</strong> If a show is cancelled due to weather, we will notify you and offer a transfer to a future date or a full refund.</li>
            <li><strong>Private Sedona Serenades:</strong> We will monitor the local weather leading up to your booking. If weather prevents an outdoor performance, we will coordinate to find an indoor alternative (such as your resort/accommodation patio) or reschedule to a different slot during your stay.</li>
          </ul>

          <h3 style={{ color: "var(--color-gold)", margin: "40px 0 20px", fontFamily: "var(--font-serif)", fontSize: "1.8rem" }}>3. Venue Guidelines & Respecting Nature</h3>
          <p>
            Many Fiddler on the Rock performances are held in fragile outdoor habitats (e.g., Red Rock vistas, museum grounds). All attendees must:
          </p>
          <ul style={{ paddingLeft: "20px", margin: "16px 0" }}>
            <li>Follow "Leave No Trace" principles (no littering, stay on designated paths).</li>
            <li>Respect the quiet setting of Tyler's acoustic spaces.</li>
            <li>Obey any instructions provided by staff regarding parking and seating.</li>
          </ul>

          <h3 style={{ color: "var(--color-gold)", margin: "40px 0 20px", fontFamily: "var(--font-serif)", fontSize: "1.8rem" }}>4. Intellectual Property</h3>
          <p>
            All original music, documentary materials, logos, images, and text content featured on this website are the property of Tyler Carson and Fiddler on the Rock, protected under international copyright law.
          </p>

          <h3 style={{ color: "var(--color-gold)", margin: "40px 0 20px", fontFamily: "var(--font-serif)", fontSize: "1.8rem" }}>5. Contact Us</h3>
          <p>
            For questions about these terms, please contact us via our website form.
          </p>
        </div>
      </Section>
    </div>
  );
}

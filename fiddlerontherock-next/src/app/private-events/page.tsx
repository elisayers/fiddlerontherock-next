import type { Metadata } from "next";
import Image from "next/image";
import BookingForm from "@/components/BookingForm";
import { CardGrid, InfoCard, PageHero, Section, FeatureSplit } from "@/components/PagePrimitives";

export const metadata: Metadata = { 
  title: "Private Events & Bespoke Concerts | Fiddler on the Rock", 
  description: "World-class live violin music for weddings, proposals, corporate events, and wellness retreats in Sedona's Red Rocks." 
};

export default function PrivateEventsPage() { 
  return (
    <>
      <PageHero 
        eyebrow="Private Events" 
        title="World-Class Live Music for Your Most Important Moments." 
        subtitle="From romantic mountaintop proposals and destination weddings to immersive corporate retreats, Tyler Carson designs bespoke soundscapes that capture the heartbeat of Sedona." 
        image="/images/tyler-romantic-sunset.jpg" 
        ctas={[
          { label: "Book an Event", href: "#book" }, 
          { label: "Inquire Online", href: "/contact?booking=request" }
        ]} 
      />

      <Section title="The canyon is your private concert hall.">
        <FeatureSplit
          image="/images/sedona-violin-sunset-proposal.jpg"
          alt="Tyler Carson playing violin for a couple at sunset in Sedona"
          eyebrow="A Bespoke Experience"
          title="Designed for Planners, Brides, and Milestone Celebrations"
          body="Whether you are coordinating a high-end corporate retreat, planning a dream red rock wedding, or arranging an intimate anniversary proposal, Tyler Carson works directly with coordinators and clients to compose the perfect musical narrative. We offer self-contained outdoor setups that respect the nature guidelines of Sedona while delivering pristine acoustic performance."
          ctas={[{ label: "Reserve Your Date", href: "#book" }]}
        />
      </Section>

      {/* Performance Formats Section */}
      <Section eyebrow="Performance Formats" title="The Formats: One Man Symphony vs. Acoustic Elegance" tone="soft">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px" }}>
          <div style={{ background: "rgba(19,22,30,0.68)", border: "1px solid rgba(200,169,110,0.18)", padding: "36px", borderRadius: "2px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-gold)", display: "block", marginBottom: "12px" }}>
              High Energy & Cinematic
            </span>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--color-cream)", marginBottom: "16px", marginTop: 0 }}>
              The One Man Symphony
            </h3>
            <p style={{ color: "var(--color-cream-soft)", fontSize: "0.95rem", lineHeight: "1.7" }}>
              Tyler's signature loops weave violin, rare horn violin, and digital looping pedals into a rich soundscape that feels like a full orchestra. Performing creative arrangements of Led Zeppelin, Taylor Swift, Disney theme songs, and original stories, this format is perfect for high-impact receptions, cocktails, and dynamic corporate keynotes.
            </p>
          </div>

          <div style={{ background: "rgba(19,22,30,0.68)", border: "1px solid rgba(200,169,110,0.18)", padding: "36px", borderRadius: "2px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-gold)", display: "block", marginBottom: "12px" }}>
              Pure & Intimate
            </span>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--color-cream)", marginBottom: "16px", marginTop: 0 }}>
              Acoustic & Classical Elegance
            </h3>
            <p style={{ color: "var(--color-cream-soft)", fontSize: "0.95rem", lineHeight: "1.7" }}>
              A pure unamplified performance where the violin meets the raw silence of the canyons. Featuring classical masterpieces (Bach, Vivaldi), traditional Celtic fire, and serene ambient melodies. Ideal for wedding ceremonies, sacred mountaintop proposals, intimate dinner parties, and yoga/breathwork settings.
            </p>
          </div>
        </div>
      </Section>

      {/* Wellness & Spiritual Retreats Section */}
      <Section eyebrow="Retreats & Healing" title="Vibrational Resonance: Wellness & Spiritual Retreats">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
          <div>
            <p className="lede" style={{ fontSize: "1.1rem", color: "var(--color-cream)" }}>
              As a featured Insight Timer artist who has performed on the sacred grounds of the Matrimandir in Auroville, India, Tyler Carson designs music specifically for vibrational healing, meditation, and spiritual recovery.
            </p>
            <p style={{ color: "var(--color-cream-soft)", fontSize: "1rem", lineHeight: "1.7" }}>
              Tyler's personal healing journey from spasmodic dysphonia (which took his speaking voice but opened his violin resonance) infuses his retreat performances with deep presence, resilience, and transformation. His soundscapes integrate seamlessly into yoga classes, sound baths, meditation journeys, and spiritual retreats in the heart of Sedona's energy vortexes.
            </p>
          </div>
          <div style={{ position: 'relative', height: '360px', width: '100%', border: "1px solid rgba(200,169,110,0.18)" }}>
            <Image src="/images/secret-cave-hero.jpg" alt="Tyler Carson performing inside a red rock cave" fill className="image-cover" />
          </div>
        </div>
      </Section>

      <Section id="spots" title="Two secret spots. Both unforgettable." tone="soft">
        <div className="card-grid">
          <div className="info-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: '240px', width: '100%' }}>
              <Image src="/images/secret-cave-hero.jpg" alt="The Secret Spot" fill className="image-cover" />
            </div>
            <div style={{ padding: '28px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <p className="card-eyebrow">Natural Acoustic Canyon</p>
              <h3>The Secret Spot</h3>
              <p style={{ flexGrow: 1 }}>A hidden canyon formation with natural acoustics and a short, easy walk from parking.</p>
            </div>
          </div>

          <div className="info-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: '240px', width: '100%' }}>
              <Image src="/images/sedona-serenade-sunset-overlook.jpg" alt="The Open-Air Spot" fill className="image-cover" />
            </div>
            <div style={{ padding: '28px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <p className="card-eyebrow">Vast Red Rock Vista</p>
              <h3>The Open-Air Spot</h3>
              <p style={{ flexGrow: 1 }}>A sweeping Red Rock vista with flat, accessible terrain and wide Sedona views.</p>
            </div>
          </div>

          <div className="info-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: '240px', width: '100%' }}>
              <Image src="/images/serenades-3.jpg" alt="Your Location" fill className="image-cover" />
            </div>
            <div style={{ padding: '28px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <p className="card-eyebrow">Custom Event</p>
              <h3>Your Location</h3>
              <p style={{ flexGrow: 1 }}>Hotel, villa, Airbnb patio, or private venue requests are custom events and route to a request form.</p>
              <a href="/contact?booking=your-location" className="text-link" style={{ marginTop: '20px' }}>Request</a>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Choose your experience.">
        <CardGrid>
          <InfoCard 
            title="Romantic Escape" 
            eyebrow="$399 for two" 
            body="Just the two of you, the red canyon, and music that makes time stop. Kids ages 6-18 may be added at $97 each; under 5 are free." 
          />
          <InfoCard 
            title="The Gathering" 
            eyebrow="$149 per person" 
            body="Friends, family, a few couples together. Direct booking for 3-6 guests." 
          />
          <InfoCard 
            title="The Celebration" 
            eyebrow="$125 per person" 
            body="A bigger gathering, still intimate. Direct booking for 7-10 guests." 
          />
          <InfoCard 
            title="Sedona Memory Package" 
            eyebrow="Starts at $2,000" 
            body="Photographer, 20+ edited photos, chocolates, spring water, and dedication card. Five-day minimum; two to four weeks ahead recommended." 
            href="/contact?booking=memory-package" 
            cta="Request" 
          />
        </CardGrid>
      </Section>

      <Section id="book" eyebrow="Direct booking" title="Select your package, location, and time.">
        <BookingForm showId="sedona-serenades" />
      </Section>
    </>
  ); 
}
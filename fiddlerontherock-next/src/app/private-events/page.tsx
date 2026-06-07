import type { Metadata } from "next";
import Image from "next/image";
import BookingForm from "@/components/BookingForm";
import { CardGrid, InfoCard, PageHero, Section, FeatureSplit } from "@/components/PagePrimitives";

export const metadata: Metadata = { 
  title: "Private Events | Fiddler on the Rock", 
  description: "Private Sedona violin experience for couples, proposals, anniversaries, corporate events, and retreats." 
};

export default function PrivateEventsPage() { 
  return (
    <>
      <PageHero 
        eyebrow="Private Events" 
        title="A violin concert just for you in the Red Rocks." 
        subtitle="Canyon walls, open sky, and Tyler Carson playing a private Living Music concert for your group." 
        image="/images/tyler-romantic-sunset.jpg" 
        ctas={[
          { label: "Book a Private Event", href: "#book" }, 
          { label: "Request Custom Event", href: "/contact?booking=request" }
        ]} 
      />

      <Section title="The canyon is your private concert hall.">
        <FeatureSplit
          image="/images/red-rock-concert.jpg"
          alt="Tyler Carson playing violin for a couple at sunset in Sedona"
          eyebrow="An Intimate Sacred Evening"
          title="Where music meets the silence of the Red Rocks."
          body="No stage, no amplification, no barrier. Walk into a natural canyon or step onto a flat Red Rock vista. Tyler Carson crafts a custom soundscape that responds to the wind, the sunset, and your presence."
          ctas={[{ label: "Reserve Your Date", href: "#book" }]}
        />
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
              <Image src="/images/serenades-1.jpg" alt="The Open-Air Spot" fill className="image-cover" />
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
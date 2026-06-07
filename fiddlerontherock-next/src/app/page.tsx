import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import { ButtonLink, CardGrid, FeatureSplit, InfoCard, PageHero, Section } from "@/components/PagePrimitives";
import { cbs, experiences, home, testimonials } from "@/lib/data";
import { localBusinessSchema, aggregateRatingSchema } from "@/lib/schema";
export const metadata: Metadata = { 
  title: "Live Violin Concerts in Sedona | Fiddler on the Rock", 
  description: "Experience live violin concerts in Sedona's Red Rocks. Book public sunset shows, private Sedona Serenades, and intimate music events. As seen on CBS Mornings." 
};

export default function HomePage() { 
  const displayReviews = [
    { platform: "Google", rating: "5.0", count: "120+ Reviews", text: "We flew in from Austin and this was, without question, the highlight of our entire trip. Nothing comes close to this.", author: "Karen M." },
    { platform: "Tripadvisor", rating: "5.0", count: "80+ Reviews", text: "A Sedona experience unlike anything else. You are sitting under red rock cliffs listening to a master violinist.", author: "David L." },
    { platform: "Yelp", rating: "5.0", count: "30+ Reviews", text: "Music, views, and the feeling that you found something rare. Absolute presence and connection.", author: "Sarah H." },
    { platform: "Facebook", rating: "99%", count: "Recommended", text: "An unforgettable night in the Red Rocks. The loops make one violin sound like an entire symphony.", author: "Marcus T." }
  ];

  return (
    <>
      <JsonLd data={[localBusinessSchema(), aggregateRatingSchema()]} />
      
      {/* 1. Hero Section */}
      <PageHero 
        title={home.headline} 
        subtitle={home.subheadline} 
        image="/images/tyler-hero.jpg" 
        ctas={[home.primaryCta, home.secondaryCta]} 
      />

      {/* 2. Problem/Solution Section */}
      <Section eyebrow="Sedona Nightlife" title="Don't Settle for an Ordinary Evening in Sedona" tone="soft">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--color-gold)", marginBottom: "16px" }}>The Sedona Challenge</h3>
            <p className="lede" style={{ fontSize: "1.1rem" }}>
              Most visitors come to Sedona seeking connection and quiet beauty, but end up spending their evenings in noisy, crowded dining rooms or typical tourist spots. They miss the true spirit of the landscape.
            </p>
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--color-cream)", marginBottom: "16px" }}>The Immersive Solution</h3>
            <p style={{ color: "var(--color-cream-soft)", fontSize: "1.02rem", lineHeight: "1.75" }}>
              Fiddler on the Rock offers a category of one experience: a world-class violin concert held in the absolute silence of the Red Rock landscape. No stage barriers, no heavy amplification. Just your presence, shifting sunset light, and music that opens something deeper.
            </p>
          </div>
        </div>
      </Section>

      {/* 3. The 3 Experiences Section */}
      <Section eyebrow="Intimate Offerings" title="Choose Your Sedona Soundscape">
        <p className="lede">
          Come find your own spark through three curated music experiences built for visitors who want more than another standard sightseeing stop.
        </p>
        <CardGrid>
          {experiences.map((item) => (
            <InfoCard 
              key={item.id} 
              eyebrow={item.eyebrow} 
              title={item.title} 
              body={item.summary} 
              href={item.href} 
              cta="Explore Experience" 
            />
          ))}
        </CardGrid>
      </Section>

      {/* 4. Guide's Authority Section (CBS + Lenedra Quote + Masonry Reviews) */}
      <Section eyebrow="As seen on CBS Mornings" title="National Spotlight. Sedona Resonance.">
        <FeatureSplit 
          image="/images/tyler-sedona-solos.jpg" 
          alt="Tyler Carson in Sedona" 
          title="CBS came to Sedona for the story behind the music." 
          body={cbs.subheadline + " " + cbs.body} 
          ctas={[
            { label: "Watch CBS Segment", href: "/media-merch?tab=watch-listen" }, 
            { label: "Read Tyler's Story", href: "/about" }
          ]} 
        />
        
        {/* Lenedra Quote Block */}
        <div className="quote-block" style={{ marginTop: 64, marginBottom: 56 }}>
          <p>"Hearing Tyler's music is like experiencing a force of nature."</p>
          <cite>Lenedra J. Carroll, Manager of Global Pop Star Jewel</cite>
        </div>

        {/* Masonry Review Grid */}
        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", marginBottom: "28px", textAlign: "center" }}>
          Verified by Hundreds of Travelers
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
          {displayReviews.map((rev) => (
            <div key={rev.platform} className="review-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-gold)" }}>
                  {rev.platform}
                </span>
                <span style={{ fontSize: "0.8rem", color: "var(--color-cream)" }}>
                  ★ {rev.rating} <span style={{ fontSize: "0.7rem", color: "var(--color-muted)" }}>({rev.count})</span>
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--color-cream-soft)", fontStyle: "italic", flexGrow: 1, lineHeight: "1.6" }}>
                "{rev.text}"
              </p>
              <span style={{ fontSize: "0.75rem", color: "var(--color-cream)", fontWeight: 500 }}>
                — {rev.author}
              </span>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Three-Step Plan Section */}
      <Section eyebrow="Easy Steps" title="Three Steps to an Unforgettable Sedona Night" tone="soft">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px", marginTop: "16px" }}>
          
          {/* Step 1 */}
          <div style={{ background: "rgba(11,13,18,0.4)", border: "1px solid rgba(200,169,110,0.1)", padding: "32px 24px", borderRadius: "2px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.8rem", color: "var(--color-gold)", display: "block", marginBottom: "16px" }}>
              01
            </span>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "var(--color-cream)", marginBottom: "12px", marginTop: 0 }}>
              Select Your Sunset
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-cream-soft)", margin: 0, lineHeight: "1.6" }}>
              Choose the experience that fits your visit. The signature One Man Symphony loop concert, a theatrical Saturday night show, or a romantic private serenade overlook.
            </p>
          </div>

          {/* Step 2 */}
          <div style={{ background: "rgba(11,13,18,0.4)", border: "1px solid rgba(200,169,110,0.1)", padding: "32px 24px", borderRadius: "2px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.8rem", color: "var(--color-gold)", display: "block", marginBottom: "16px" }}>
              02
            </span>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "var(--color-cream)", marginBottom: "12px", marginTop: 0 }}>
              Secure Your Seats
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-cream-soft)", margin: 0, lineHeight: "1.6" }}>
              Use our simple, enclosure checkout to reserve ticket packages. Select General or VIP seating directly on your preferred date without mandatory account signup.
            </p>
          </div>

          {/* Step 3 */}
          <div style={{ background: "rgba(11,13,18,0.4)", border: "1px solid rgba(200,169,110,0.1)", padding: "32px 24px", borderRadius: "2px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.8rem", color: "var(--color-gold)", display: "block", marginBottom: "16px" }}>
              03
            </span>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "var(--color-cream)", marginBottom: "12px", marginTop: 0 }}>
              Feel the Music
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-cream-soft)", margin: 0, lineHeight: "1.6" }}>
              Step into the scenic Red Rock setting, sit back, relax, and let the soundtrack of the canyon connect you deeply to the majesty of Sedona.
            </p>
          </div>

        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "48px" }}>
          <ButtonLink link={home.primaryCta} />
        </div>
      </Section>

      <Link href="/experience" className="floating-client-link" aria-label="Client Review Landing Page">
        <Image src="/images/logo-white.png" alt="Logo" width={40} height={40} />
      </Link>
    </>
  ); 
}
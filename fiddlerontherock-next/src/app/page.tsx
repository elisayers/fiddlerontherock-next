import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import { ButtonLink, CardGrid, FeatureSplit, InfoCard, PageHero, Section } from "@/components/PagePrimitives";
import { cbs, experiences, home } from "@/lib/data";
import { localBusinessSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Live Violin Concerts in Sedona | Fiddler on the Rock",
  description: "Experience live violin concerts in Sedona's Red Rocks. Book public sunset shows, private Sedona Serenades, and intimate music events. As seen on CBS Mornings.",
};

export default function HomePage() {
  const displayReviews = [
    { platform: "Guest Review", text: "We flew in from Austin and this was, without question, the highlight of our entire trip. Nothing comes close to this.", author: "Karen M." },
    { platform: "CBS Mornings", text: cbs.quote, author: "Lindsey Stirling" },
    { platform: "Festival Praise", text: "EXTRAORDINARY doesn't even begin to describe this multi-talented performer, composer, and musical genius.", author: "Patrick Schweiss" },
    { platform: "Guest Review", text: "A Sedona experience unlike anything else. You are sitting under red rock cliffs listening to a master violinist.", author: "Guest comment" },
  ];

  return (
    <>
      <JsonLd data={localBusinessSchema()} />

      <PageHero
        title={home.headline}
        subtitle={home.subheadline}
        image="/images/tyler-hero.jpg"
        ctas={[home.primaryCta, home.secondaryCta]}
        className="hero-home"
        align="left"
        imagePosition="72% center"
        mobileImagePosition="64% center"
      />

      <Section eyebrow="Sedona Nightlife" title="Don't Settle for an Ordinary Evening in Sedona" tone="soft">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--color-gold)", marginBottom: "16px" }}>The Sedona Challenge</h3>
            <p className="lede" style={{ fontSize: "1.1rem" }}>
              Most visitors come to Sedona seeking connection and quiet beauty, but end up spending their evenings in noisy, crowded dining rooms or typical tourist stops. They miss the stillness that makes the landscape unforgettable.
            </p>
          </div>
          <div>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--color-cream)", marginBottom: "16px" }}>The Immersive Solution</h3>
            <p style={{ color: "var(--color-cream-soft)", fontSize: "1.02rem", lineHeight: "1.75" }}>
              Fiddler on the Rock offers a one-of-one Sedona evening: a live violin concert in the quiet of the Red Rocks. No stage barrier, no overproduced spectacle, just presence, changing light, and music that belongs to the place.
            </p>
          </div>
        </div>
      </Section>

      <Section eyebrow="Intimate Offerings" title="Choose Your Sedona Soundscape">
        <p className="lede">
          {"Three distinct ways to experience Tyler Carson's music, each shaped for guests who want more than another item on the itinerary."}
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

      <Section eyebrow="As seen on CBS Mornings" title="National Spotlight. Sedona Resonance.">
        <FeatureSplit
          image="/images/tyler-sedona-solos.jpg"
          alt="Tyler Carson in Sedona"
          title="CBS came to Sedona for the story behind the music."
          body={cbs.subheadline + " " + cbs.body}
          ctas={[
            { label: "Watch CBS Segment", href: "/media-merch?tab=watch-listen" },
            { label: "Read Tyler's Story", href: "/about" },
          ]}
        />

        <div className="quote-block" style={{ marginTop: 64, marginBottom: 56 }}>
          <p><span aria-hidden="true">&ldquo;</span>Hearing Tyler&apos;s music is like experiencing a force of nature.<span aria-hidden="true">&rdquo;</span></p>
          <cite>Lenedra J. Carroll, manager of Jewel</cite>
        </div>

        <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", marginBottom: "28px", textAlign: "center" }}>
          Guest praise and published recognition
        </h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
          {displayReviews.map((rev) => (
            <div key={rev.platform + rev.author} className="review-card">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--color-gold)" }}>
                  {rev.platform}
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--color-cream-soft)", fontStyle: "italic", flexGrow: 1, lineHeight: "1.6" }}>
                <><span aria-hidden="true">&ldquo;</span>{rev.text}<span aria-hidden="true">&rdquo;</span></>
              </p>
              <span style={{ fontSize: "0.75rem", color: "var(--color-cream)", fontWeight: 500 }}>
                {rev.author}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Easy Steps" title="Three Steps to an Unforgettable Sedona Night" tone="soft">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px", marginTop: "16px" }}>
          <div style={{ background: "rgba(11,13,18,0.4)", border: "1px solid rgba(200,169,110,0.1)", padding: "32px 24px", borderRadius: "2px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.8rem", color: "var(--color-gold)", display: "block", marginBottom: "16px" }}>01</span>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "var(--color-cream)", marginBottom: "12px", marginTop: 0 }}>Select Your Sunset</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-cream-soft)", margin: 0, lineHeight: "1.6" }}>
              Choose the concert or private experience that fits your trip, from loop-driven public shows to a private serenade built around one moment.
            </p>
          </div>

          <div style={{ background: "rgba(11,13,18,0.4)", border: "1px solid rgba(200,169,110,0.1)", padding: "32px 24px", borderRadius: "2px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.8rem", color: "var(--color-gold)", display: "block", marginBottom: "16px" }}>02</span>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "var(--color-cream)", marginBottom: "12px", marginTop: 0 }}>Send Your Request</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-cream-soft)", margin: 0, lineHeight: "1.6" }}>
              Pick your date, seating, or package details. If online checkout is still being finalized for your selection, Tyler follows up directly to confirm availability.
            </p>
          </div>

          <div style={{ background: "rgba(11,13,18,0.4)", border: "1px solid rgba(200,169,110,0.1)", padding: "32px 24px", borderRadius: "2px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "1.8rem", color: "var(--color-gold)", display: "block", marginBottom: "16px" }}>03</span>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", color: "var(--color-cream)", marginBottom: "12px", marginTop: 0 }}>Experience the Music Live</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-cream-soft)", margin: 0, lineHeight: "1.6" }}>
              Arrive in the Red Rocks, settle in, and let the violin do what the landscape already began.
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

import type { Metadata } from "next";
import { ButtonLink, FeatureSplit, PageHero, Section } from "@/components/PagePrimitives";

export const metadata: Metadata = {
  title: "About Tyler Carson | Sedona Violinist & Creator of Fiddler on the Rock",
  description: "Learn about Tyler Carson's classical background, international performances, recovery journey, and the Sedona story behind Fiddler on the Rock.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Tyler Carson"
        title="A classical musician, an international performer, and the artist behind Sedona's signature red rock concert experience."
        subtitle="Fiddler on the Rock grew from decades of violin study, years on world stages, and a personal turning point that made the instrument Tyler Carson's clearest voice."
        image="/images/tyler-portrait-hero.jpg"
        align="left"
        imagePosition="60% center"
        mobileImagePosition="64% center"
      />

      <Section eyebrow="Early Years" title="Classical training came first. Story followed later.">
        <p className="lede">
          Tyler Carson began on violin in Victoria, British Columbia, and was already performing as a featured classical soloist while still in his teens. That foundation still defines the control, tone, and technical precision guests hear in Sedona today.
        </p>
        <p>
          Over time, his path moved beyond one genre or one stage. Touring and performance opportunities carried him through Canada, Japan, Thailand, Germany, and the Cayman Islands, building a career rooted in discipline but never limited to recital-hall expectations.
        </p>
      </Section>

      <Section eyebrow="The Turning Point" title="When Tyler lost his voice, the violin had to carry more." tone="soft">
        <FeatureSplit
          image="/images/tyler-sedona-solos.jpg"
          alt="Tyler Carson performing in Sedona"
          title="Spasmodic dysphonia changed the way Tyler communicated, but it also clarified the work."
          body="Instead of overdramatizing the setback, Tyler's story is best understood as a refocusing. The speaking and singing voice became unreliable. The violin did not. What had always been an instrument became a direct line to expression, presence, and connection. That shift now shapes every Fiddler on the Rock performance."
          ctas={[
            { label: "Watch CBS Feature", href: "/cbs" },
            { label: "See Live Concerts", href: "/live-concerts" },
          ]}
        />
      </Section>

      <Section eyebrow="Sedona" title="The Red Rocks gave the music its natural stage.">
        <p className="lede">
          Sedona was not just a backdrop. It became part of the performance language. The silence, canyon acoustics, changing light, and sense of scale all influenced the shape of the experience Tyler now calls Living Music.
        </p>
        <p>
          Public concerts, private serenades, and special events all grow from that same idea: the music should feel site-specific, intimate, and impossible to separate from the landscape around it.
        </p>
      </Section>

      <Section eyebrow="Invitation" title="Come hear the full story live." tone="soft">
        <p className="lede">
          Whether you join a Thursday or Saturday concert, plan a proposal, or book a private event, the invitation is the same: step out of the usual Sedona schedule and into an evening led by violin, light, and presence.
        </p>
        <div className="button-row left">
          <ButtonLink link={{ label: "Get Concert Tickets", href: "/live-concerts" }} />
          <ButtonLink link={{ label: "Book a Private Event", href: "/private-events" }} variant="ghost" />
        </div>
      </Section>
    </>
  );
}

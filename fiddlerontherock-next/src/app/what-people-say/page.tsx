import type { Metadata } from "next";
import { CardGrid, InfoCard, PageHero, Section } from "@/components/PagePrimitives";
import { reviews } from "@/lib/data";
import ReviewsWall from "@/components/ReviewsWall";
import JsonLd from "@/components/JsonLd";
import { aggregateRatingSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Guest Comments & Press Praise | Fiddler on the Rock Sedona",
  description: "Read guest comments, press praise, and published reactions to Tyler Carson's live violin performances in Sedona.",
};

export default function ReviewsPage() {
  return (
    <>
      <JsonLd data={aggregateRatingSchema()} />
      <PageHero
        eyebrow="Reviews"
        title="What People Say"
        subtitle="A mix of guest comments, media praise, and published reactions to Tyler Carson's live performances in Sedona."
        image="/images/red-rock-concert.jpg"
        align="left"
        imagePosition="center center"
        mobileImagePosition="58% center"
      />

      <Section title="Selected Praise" eyebrow="Guest Comments">
        <p className="lede">
          These highlights use only comments and public praise already represented on the site. Live platform-specific review feeds appear below only when connected.
        </p>
        <CardGrid>
          {reviews.map((item) => (
            <InfoCard
              key={item.platform + item.author}
              eyebrow={`${item.platform} | ${item.rating}`}
              title={item.count}
              body={`"${item.quote}" ${item.author}`}
            />
          ))}
        </CardGrid>
      </Section>

      <Section id="wall-of-love" title="Live Review Feed" eyebrow="When Connected" tone="soft">
        <p className="lede" style={{ marginBottom: "12px" }}>
          Platform-specific reviews are shown here when Google, Yelp, or Facebook data is connected. Until then, use the curated comments above or contact Tyler directly for current references.
        </p>
        <ReviewsWall />
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { CardGrid, InfoCard, PageHero, Section } from "@/components/PagePrimitives";
import { reviews } from "@/lib/data";
import ReviewsWall from "@/components/ReviewsWall";

export const metadata: Metadata = {
  title: "Wall of Love | Guest Reviews | Fiddler on the Rock",
  description: "Read verified guest ratings and reviews for Fiddler on the Rock from Google, Tripadvisor, Facebook, and Yelp.",
};

export default function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title="What People Say"
        subtitle="Read real stories and testimonials from guests who have experienced Tyler Carson's live violin performances in the Red Rocks of Sedona."
        image="/images/red-rock-concert.jpg"
      />

      {/* Ratings Snapshot */}
      <Section title="Ratings Snapshot" eyebrow="Verified Satisfaction">
        <p className="lede">
          Fiddler on the Rock consistently holds a 5-star rating across major platforms. Here is a brief snapshot of our verified profiles.
        </p>
        <CardGrid>
          {reviews.map((item) => (
            <InfoCard
              key={item.platform}
              eyebrow={item.platform + " — " + item.rating}
              title={item.count}
              body={`"${item.quote}" — ${item.author}`}
            />
          ))}
        </CardGrid>
      </Section>

      {/* Dynamic Wall of Love Reviews Grid */}
      <Section id="wall-of-love" title="The Wall of Love" eyebrow="Detailed Experiences" tone="soft">
        <p className="lede" style={{ marginBottom: "12px" }}>
          Read the full, detailed reviews and filtering by category (public concerts, private weddings, and spiritual retreats) to see why guests describe Tyler's concerts as the highlight of their Sedona visit.
        </p>
        <ReviewsWall />
      </Section>
    </>
  );
}
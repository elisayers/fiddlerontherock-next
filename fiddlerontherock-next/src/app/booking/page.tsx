import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import { CardGrid, InfoCard, PageHero, Section } from "@/components/PagePrimitives";
import { experiences } from "@/lib/data";
import type { ShowId } from "@/lib/booking/types";
export const metadata: Metadata = { title: "Book Fiddler on the Rock Tickets", description: "Reserve seats for Fiddler on the Rock public shows and private Sedona Serenades experiences." };

const validShows: ShowId[] = ["one-man-symphony", "legends-of-the-fiddle", "sedona-serenades"];

export default function BookingPage({ searchParams }: { searchParams?: { show?: string } }) {
  const requestedShow = validShows.includes(searchParams?.show as ShowId) ? (searchParams?.show as ShowId) : undefined;
  const activeShow = requestedShow ?? "one-man-symphony";
  const title = experiences.find((item) => item.id === activeShow)?.title ?? "One Man Symphony";

  return (
    <>
      <PageHero eyebrow="Booking" title="Reserve your Sedona music experience." subtitle="Choose a show, pick the date that fits your visit, and request the seats or private experience you want." image="/images/tyler-red-rock.jpg" />
      <Section title="Start with the show">
        <CardGrid>{experiences.map((item) => <InfoCard key={item.id} eyebrow={item.admission} title={item.title} body={item.summary} href={`/booking?show=${item.id}`} cta="Choose This Show" />)}</CardGrid>
      </Section>
      <Section eyebrow="Reserve seats" title={title}>
        <BookingForm showId={activeShow} compact />
      </Section>
    </>
  );
}

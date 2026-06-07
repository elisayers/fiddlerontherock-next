import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import { CardGrid, InfoCard, PageHero, Section } from "@/components/PagePrimitives";
import { experiences } from "@/lib/data";
export const metadata: Metadata = {
  title: "Legends of the Fiddle Concert | Fiddler on the Rock Sedona",
  description: "Join Tyler Carson for Legends of the Fiddle, a theatrical Saturday night live violin concert at Sedona Dances HQ in West Sedona."
};
export default function ShowPage() { const item = experiences[2]; return <><PageHero eyebrow={item.eyebrow} title={item.title} subtitle={item.summary} image={item.image} ctas={[{ label: "Book Now", href: "#book" }]} /><Section title="Saturday nights in Sedona just got legendary."><p className="lede">Legends of the Fiddle is Tyler's theatrical concert: Celtic fire, classical triumph, mythic storytelling, and a single violin transformed into a full concert experience.</p><CardGrid><InfoCard title="The Experience" body={item.experience} /><InfoCard title="VIP" body="VIP includes early venue entry, priority seating, meet and greet, and a deeper behind-the-scenes experience." /><InfoCard title="Admission" body="General Admission is $55. VIP is $85. Kids 18 and under are $22." /></CardGrid></Section><Section id="book" eyebrow="Simple checkout" title="Choose one date, one tier, and your guest count." tone="soft"><BookingForm showId="legends-of-the-fiddle" /></Section></>; }
import type { Metadata } from "next";
import { CardGrid, InfoCard, PageHero, Section } from "@/components/PagePrimitives";
import { experiences } from "@/lib/data";
export const metadata: Metadata = { title: "Upcoming Fiddler on the Rock Experiences", description: "Upcoming Sedona concerts and private experience paths for Fiddler on the Rock." };
export default function EventsPage() { return <><PageHero eyebrow="Upcoming" title="Upcoming Sedona music experiences." subtitle="Choose the show that fits your night, then reserve seats or request a private concert in the Red Rocks." image="/images/red-rock-concert.jpg" /><Section title="Choose your experience"><CardGrid>{experiences.map((item) => <InfoCard key={item.id} eyebrow={item.when} title={item.title} body={item.summary} href={item.href} cta="View Details" />)}</CardGrid></Section></>; }

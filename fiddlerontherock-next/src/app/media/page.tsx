import type { Metadata } from "next";
import { CardGrid, InfoCard, PageHero, Section } from "@/components/PagePrimitives";
import { mediaLinks } from "@/lib/data";
export const metadata: Metadata = { title: "Fiddler on the Rock Media", description: "Media hub for CBS Mornings, the Living Music documentary, performance videos, and Tyler Carson music." };
export default function MediaPage() { return <><PageHero eyebrow="Media" title="CBS, documentary, videos, and music." subtitle="The media hub keeps the main menu short while giving every major story its own search-ready page." image="/images/tyler-white-pants-smiling.jpg" /><Section title="Choose what you want to watch or hear."><CardGrid>{mediaLinks.map((item) => <InfoCard key={item.href} title={item.label} body="A dedicated on-site media page designed to keep visitors inside the Fiddler on the Rock experience." href={item.href} cta="Open" />)}</CardGrid></Section></>; }

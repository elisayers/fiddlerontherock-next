import type { Metadata } from "next";
import { CardGrid, InfoCard, PageHero, Section } from "@/components/PagePrimitives";
import { merchItems } from "@/lib/data";
export const metadata: Metadata = { title: "Fiddler on the Rock Merch", description: "Official apparel, physical music, and keepsakes from Fiddler on the Rock." };
export default function MerchPage() { return <><PageHero eyebrow="Merch" title="Fiddler on the Rock Merch" subtitle="Apparel, music, and keepsakes are available for purchase at all live concerts." image="/images/logo-black.png" /><Section title="Catalog"><CardGrid>{merchItems.map((item) => <InfoCard key={item.title} title={item.title} body={item.detail} />)}</CardGrid></Section></>; }
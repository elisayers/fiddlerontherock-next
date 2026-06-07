import type { Metadata } from "next";
import { PageHero, Section } from "@/components/PagePrimitives";
import { support } from "@/lib/data";
export const metadata: Metadata = {
  title: "Support the Project & Crowdfunding | Fiddler on the Rock Sedona",
  description: "Learn how you can support Tyler Carson's Living Music project and the Fiddler on the Rock crowdfunding campaign on Indiegogo."
};
export default function SupportPage() { return <><PageHero eyebrow="Support" title={support.headline} subtitle={support.body} image="/images/tyler-leaping.jpg" ctas={[{ label: "Open Indiegogo", href: support.href, external: true }, { label: "Watch Documentary", href: "/documentary" }]} /><Section title="Separate from tickets and merch"><p className="lede">Support is a third path. Tickets are for attending a show, merch is for buying products, and crowdfunding is for helping the larger Living Music project grow.</p></Section></>; }
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink, CardGrid, InfoCard, PageHero, Section } from "@/components/PagePrimitives";
import { pressItems } from "@/lib/data";
export const metadata: Metadata = {
  title: "Fiddler on the Rock Press & Media Coverage | Sedona Violinist",
  description: "Read news features and press coverage for Tyler Carson, Sedona's Fiddler on the Rock, including features on CBS Mornings, Red Rock News, and Visit Sedona."
};
export default function PressPage() { return <><PageHero eyebrow="Press" title="News, features, and national proof." subtitle="CBS leads the story, supported by selected local, tourism, and regional coverage." image="/images/cbs-white-pants-closeup.jpg" ctas={[{ label: "Open EPK", href: "/epk" }, { label: "Watch CBS", href: "/cbs" }]} /><Section title="Featured coverage"><CardGrid>{pressItems.map((item) => <Link key={item.title + item.outlet} href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined} className="card-link"><article className="info-card">{"logo" in item && item.logo ? <div className="press-logo"><Image src={item.logo} alt={item.outlet + " logo"} width={180} height={80} /></div> : <p className="press-wordmark">{item.outlet}</p>}<p className="card-eyebrow">{item.outlet}</p><h3>{item.title}</h3><p>{item.summary}</p><span className="text-link">{item.href.startsWith("/") ? "Open" : "Read"}</span></article></Link>)}</CardGrid></Section><Section eyebrow="Press kit" title="Need the quick media package?" tone="soft"><p className="lede">The EPK page collects Tyler's short bio, press images, logo files, and selected coverage in one clean destination for press contacts, venues, grant applications, and partners.</p><div className="button-row left"><ButtonLink link={{ label: "Open EPK", href: "/epk" }} /></div></Section></>; }

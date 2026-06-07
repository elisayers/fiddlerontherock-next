import type { Metadata } from "next";
import { ButtonLink, PageHero, Section } from "@/components/PagePrimitives";
export const metadata: Metadata = {
  title: "About Tyler Carson | Sedona Violinist & Creator of Fiddler on the Rock",
  description: "Learn about Tyler Carson, the classical soloist and looping violinist behind Sedona's Fiddler on the Rock. Tracing his journey from world stages to red rock concerts."
};
export default function AboutPage() { return <><PageHero eyebrow="Tyler Carson" title="The guide is the musician who had to find another voice." subtitle="Tyler knows what it is to lose the ability to speak and discover that the violin can carry what words cannot." image="/images/tyler-portrait-hero.jpg" /><Section title="Authority, reframed as invitation"><p className="lede">Tyler Carson has performed on world stages, appeared on CBS Mornings, and built a life of music in Sedona. The new story is not only what Tyler has done. It is what visitors experience when the Red Rocks, silence, and violin meet in the same moment.</p><div className="button-row left"><ButtonLink link={{ label: "Watch CBS", href: "/cbs" }} /><ButtonLink variant="ghost" link={{ label: "Book", href: "/booking" }} /></div></Section></>; }

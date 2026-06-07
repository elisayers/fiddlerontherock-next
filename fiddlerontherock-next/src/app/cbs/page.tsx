import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import VideoFacade from "@/components/VideoFacade";
import { ButtonLink, PageHero, Section } from "@/components/PagePrimitives";
import { cbs } from "@/lib/data";
import { videoSchema } from "@/lib/schema";
export const metadata: Metadata = {
  title: "As Seen on CBS Mornings | Tyler Carson, Fiddler on the Rock",
  description: "Watch the national CBS Mornings feature story on Tyler Carson, the Sedona violinist who lost his voice and found a deeper sound in the Red Rocks."
};
export default function CBSPage() { return <><JsonLd data={videoSchema(cbs.title, cbs.subheadline, "/images/cbs-experiences-hero.png", "https://www.youtube.com/watch?v=" + cbs.youtubeId)} /><PageHero title={cbs.headline} subtitle={cbs.subheadline} image="/images/cbs-experiences-hero.png" /><Section><div className="video-embed-container" style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", maxWidth: "100%", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)" }}><iframe src={"https://www.youtube.com/embed/" + cbs.youtubeId + "?rel=0&modestbranding=1"} title={cbs.title} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div></Section><Section title="What brought CBS to Sedona" tone="soft"><p className="lede">{cbs.body}</p><div className="quote-block"><p>{cbs.quote}</p><cite>{cbs.attribution}</cite></div><div className="button-row left"><ButtonLink link={{ label: "See All Experiences", href: "/experiences" }} /><ButtonLink variant="ghost" link={{ label: "Read Tyler's Story", href: "/about" }} /></div></Section></>; }

import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import VideoFacade from "@/components/VideoFacade";
import { ButtonLink, PageHero, Section } from "@/components/PagePrimitives";
import { cbs } from "@/lib/data";
import { videoSchema } from "@/lib/schema";
export const metadata: Metadata = { title: "Tyler Carson on CBS Mornings", description: "Watch the CBS Mornings feature on Tyler Carson, the Sedona violinist who lost his voice and found it in the violin." };
export default function CBSPage() { return <><JsonLd data={videoSchema(cbs.title, cbs.subheadline, "/images/cbs-white-pants-closeup.jpg", "https://www.youtube.com/watch?v=" + cbs.youtubeId)} /><PageHero title={cbs.headline} subtitle={cbs.subheadline} image="/images/cbs-white-pants-closeup.jpg" /><Section><VideoFacade youtubeId={cbs.youtubeId} title={cbs.title} poster="/images/cbs-white-pants-closeup.jpg" /></Section><Section title="What brought CBS to Sedona" tone="soft"><p className="lede">{cbs.body}</p><div className="quote-block"><p>{cbs.quote}</p><cite>{cbs.attribution}</cite></div><div className="button-row left"><ButtonLink link={{ label: "See All Experiences", href: "/experiences" }} /><ButtonLink variant="ghost" link={{ label: "Read Tyler's Story", href: "/about" }} /></div></Section></>; }

"use client";

import Image from "next/image";
import { useState } from "react";

type HeroVideoProps = { src?: string; mp4Src?: string; poster?: string };

export default function HeroVideo({ src = "/video/hero-loop.webm", mp4Src = "/video/hero-loop.mp4", poster = "/images/tyler-hero.jpg" }: HeroVideoProps) {
  const [failed, setFailed] = useState(false);
  if (failed) return <Image src={poster} alt="Tyler Carson performing in Sedona" fill priority sizes="100vw" className="image-cover" />;
  return <video className="image-cover" autoPlay muted loop playsInline preload="metadata" poster={poster} onError={() => setFailed(true)}><source src={src} type="video/webm" /><source src={mp4Src} type="video/mp4" /></video>;
}

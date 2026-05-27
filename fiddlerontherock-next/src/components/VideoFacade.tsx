"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { scaleIn } from "@/lib/motion";

type VideoFacadeProps = { youtubeId?: string; title: string; poster?: string; localSrc?: string };

export default function VideoFacade({ youtubeId, title, poster, localSrc }: VideoFacadeProps) {
  const [open, setOpen] = useState(false);
  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); }; if (open) window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey); }, [open]);
  const thumbnail = poster ?? (youtubeId ? "https://img.youtube.com/vi/" + youtubeId + "/maxresdefault.jpg" : "/images/tyler-hero.jpg");
  return <><motion.button type="button" className="video-facade" whileHover={{ scale: 1.015 }} onClick={() => setOpen(true)} aria-label={"Play " + title}><Image src={thumbnail} alt={title} fill sizes="(max-width: 768px) 100vw, 960px" className="image-cover" unoptimized={thumbnail.startsWith("https://")} /><span className="video-shade" /><motion.span className="play-button" animate={{ scale: [1, 1.08, 1] }} transition={{ repeat: Infinity, duration: 1.8 }}>Play</motion.span></motion.button><AnimatePresence>{open ? <motion.div className="video-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}><motion.div className="video-frame" variants={scaleIn} initial="hidden" animate="visible" exit="hidden" onClick={(event) => event.stopPropagation()}>{localSrc ? <video controls autoPlay playsInline className="video-player"><source src={localSrc} /></video> : youtubeId ? <iframe src={"https://www.youtube.com/embed/" + youtubeId + "?autoplay=1&rel=0&modestbranding=1"} title={title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /> : null}</motion.div><button type="button" className="modal-close" onClick={() => setOpen(false)}>Close</button></motion.div> : null}</AnimatePresence></>;
}

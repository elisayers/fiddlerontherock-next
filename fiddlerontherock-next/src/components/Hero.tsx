"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { hero } from "@/lib/data";
import HeroVideo from "./HeroVideo";

import { fadeUp, staggerContainer } from "@/lib/motion";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const opacityOverlay = useTransform(scrollYProgress, [0, 0.6], [0.28, 0.52]);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--color-ink)",
      }}
    >
      {/* Parallax background */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-15%",
          y: yImg,
          willChange: "transform",
        }}
      >
        <HeroVideo src="/video/hero-loop.webm" mp4Src="/video/hero-loop.mp4" />
      </motion.div>

      {/* Dark overlay — thickens on scroll */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(11,13,18,0.18) 0%, rgba(11,13,18,0.58) 100%)",
          opacity: opacityOverlay,
        }}
      />

      {/* Subtle vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 60%, transparent 40%, rgba(11,13,18,0.35) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Content */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          padding: "0 24px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {/* Eyebrow */}
        <motion.div
          variants={fadeUp}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "36px",
          }}
        >
          <span style={{ display: "block", width: "28px", height: "1px", background: "var(--color-gold)", opacity: 0.5 }} />
          <span
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--color-gold)",
            }}
          >
            Sedona, Arizona
          </span>
          <span style={{ display: "block", width: "28px", height: "1px", background: "var(--color-gold)", opacity: 0.5 }} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(4rem, 10vw, 8.5rem)",
            fontWeight: 300,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            color: "var(--color-cream)",
            marginBottom: "28px",
          }}
        >
          {hero.headline}
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={fadeUp}
          style={{
            fontSize: "clamp(1rem, 1.8vw, 1.18rem)",
            fontWeight: 300,
            color: "rgba(245,240,232,0.72)",
            maxWidth: "540px",
            margin: "0 auto 52px",
            lineHeight: 1.75,
            letterSpacing: "0.01em",
          }}
        >
          {hero.subheadline}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <HeroButton href={hero.ctaPrimary.href} primary>
            {hero.ctaPrimary.label}
          </HeroButton>
          <HeroButton href={hero.ctaSecondary.href}>
            {hero.ctaSecondary.label}
          </HeroButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
          cursor: "pointer",
        }}
        onClick={() => window.scrollBy({ top: window.innerHeight, behavior: "smooth" })}
      >
        <span
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "0.55rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(138,143,168,0.6)",
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{ color: "var(--color-gold)", opacity: 0.6, fontSize: "0.8rem" }}
        >
          ↓
        </motion.div>
      </motion.div>
    </section>
  );
}

function HeroButton({
  href,
  primary = false,
  children,
}: {
  href: string;
  primary?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Link
        href={href}
        style={{
          display: "inline-block",
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "0.68rem",
          fontWeight: 400,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          textDecoration: "none",
          padding: "16px 36px",
          border: "1px solid",
          transition: "background 0.25s ease, color 0.25s ease, border-color 0.25s ease",
          ...(primary
            ? {
                background: "var(--color-gold)",
                color: "var(--color-ink)",
                borderColor: "var(--color-gold)",
              }
            : {
                background: "transparent",
                color: "var(--color-cream)",
                borderColor: "rgba(245,240,232,0.25)",
              }),
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLElement;
          if (primary) {
            el.style.background = "transparent";
            el.style.color = "var(--color-gold)";
          } else {
            el.style.borderColor = "var(--color-gold)";
            el.style.color = "var(--color-gold)";
          }
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLElement;
          if (primary) {
            el.style.background = "var(--color-gold)";
            el.style.color = "var(--color-ink)";
            el.style.borderColor = "var(--color-gold)";
          } else {
            el.style.borderColor = "rgba(245,240,232,0.25)";
            el.style.color = "var(--color-cream)";
          }
        }}
      >
        {children}
      </Link>
    </motion.div>
  );
}

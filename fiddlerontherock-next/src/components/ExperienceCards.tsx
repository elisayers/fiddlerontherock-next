"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { experienceCards as experiences } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function ExperienceCards() {

  return (
    <section
      style={{
        position: "relative",
        padding: "120px 52px",
        background: "var(--color-ink)",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, zIndex: 0, opacity: 0.12 }}>
        <Image
          src="/images/tyler-romantic-sunset.jpg"
          alt="Sunset over Red Rocks"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{ position: "relative", zIndex: 1 }}
      >
      {/* Section header */}
      <motion.div
        variants={fadeUp}
        style={{
          textAlign: "center",
          maxWidth: "600px",
          margin: "0 auto 80px",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "28px",
          }}
        >
          <span
            style={{
              display: "block",
              width: "28px",
              height: "1px",
              background: "var(--color-gold)",
              opacity: 0.45,
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "var(--color-gold)",
            }}
          >
            Experiences
          </span>
          <span
            style={{
              display: "block",
              width: "28px",
              height: "1px",
              background: "var(--color-gold)",
              opacity: 0.45,
            }}
          />
        </div>

        <h2
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
            fontWeight: 300,
            lineHeight: 1.1,
            color: "var(--color-cream)",
            letterSpacing: "-0.01em",
          }}
        >
          Every experience is{" "}
          <em style={{ fontStyle: "italic", color: "var(--color-gold)" }}>
            singular
          </em>
        </h2>
      </motion.div>

      {/* Cards grid */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(340px, 100%), 1fr))",
          gap: "2px",
        }}
      >
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} exp={exp} />
        ))}
      </div>
      </motion.div>
    </section>
  );
}

function ExperienceCard({
  exp,
}: {
  exp: (typeof experiences)[number];
}) {
  const isAccent = exp.accent;

  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4 }}
    >
      <div
        style={{
          background: isAccent ? "var(--color-ink-soft)" : "transparent",
          border: `1px solid ${isAccent ? "var(--color-gold-rule)" : "rgba(138,143,168,0.12)"}`,
          padding: "52px 44px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          transition: "border-color 0.25s ease",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            "rgba(200,169,110,0.35)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = isAccent
            ? "var(--color-gold-rule)"
            : "rgba(138,143,168,0.12)";
        }}
      >
        {/* Top accent bar for featured card */}
        {isAccent && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "2px",
              background: "var(--color-gold)",
            }}
          />
        )}

        {/* Tag */}
        <span
          style={{
            fontFamily: "var(--font-space-mono), monospace",
            fontSize: "0.58rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: isAccent ? "var(--color-gold)" : "var(--color-muted)",
            marginBottom: "24px",
            display: "block",
          }}
        >
          {exp.tag}
        </span>

        {/* Title */}
        <h3
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            fontWeight: 300,
            lineHeight: 1.15,
            color: "var(--color-cream)",
            marginBottom: "20px",
          }}
        >
          {exp.title}
        </h3>

        {/* Rule */}
        <div
          style={{
            width: "32px",
            height: "1px",
            background: isAccent ? "var(--color-gold)" : "var(--color-muted)",
            opacity: 0.4,
            marginBottom: "24px",
          }}
        />

        {/* Description */}
        <p
          style={{
            fontSize: "0.95rem",
            fontWeight: 300,
            color: "var(--color-cream-soft)",
            lineHeight: 1.8,
            flex: 1,
            marginBottom: "40px",
          }}
        >
          {exp.description}
        </p>

        {/* CTA */}
        <motion.div whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
          <Link
            href={exp.href}
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: isAccent ? "var(--color-gold)" : "var(--color-muted)",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color =
                "var(--color-gold)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = isAccent
                ? "var(--color-gold)"
                : "var(--color-muted)";
            }}
          >
            {exp.cta}
            <span style={{ fontSize: "0.9rem" }}>→</span>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}

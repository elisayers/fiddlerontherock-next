"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { staggerContainer, slideInLeft, slideInRight } from "@/lib/motion";
import VideoFacade from "@/components/VideoFacade";
import { cbsSection } from "@/lib/data";

export default function CBSSection() {

  return (
    <section
      style={{
        background: "var(--color-ink-soft)",
        borderTop: "1px solid var(--color-muted-rule)",
        borderBottom: "1px solid var(--color-muted-rule)",
        padding: "100px 52px",
        overflow: "hidden",
      }}
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "center",
        }}
        className="grid-cbs"
      >
        {/* Left — label + quote */}
        <motion.div variants={slideInLeft}>
          {/* "As Seen On" eyebrow */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "40px",
            }}
          >
            <span
              style={{
                display: "block",
                width: "32px",
                height: "1px",
                background: "var(--color-gold)",
                opacity: 0.45,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-space-mono), monospace",
                fontSize: "0.58rem",
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
              }}
            >
              {cbsSection.eyebrow}
            </span>
          </div>

          {/* CBS logo text */}
          <div
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              fontWeight: 300,
              lineHeight: 1.0,
              color: "var(--color-cream)",
              marginBottom: "40px",
              letterSpacing: "-0.01em",
            }}
          >
            CBS{" "}
            <em style={{ fontStyle: "italic", color: "var(--color-gold)" }}>
              Mornings
            </em>
          </div>

          {/* Quote */}
          <blockquote
            style={{
              fontFamily: "var(--font-cormorant), Georgia, serif",
              fontSize: "clamp(1.5rem, 3vw, 2.1rem)",
              fontStyle: "italic",
              fontWeight: 300,
              color: "var(--color-cream-soft)",
              lineHeight: 1.35,
              marginBottom: "20px",
              position: "relative",
              paddingLeft: "20px",
              borderLeft: "2px solid var(--color-gold-rule)",
            }}
          >
            {cbsSection.quote}
          </blockquote>
          <p
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-gold)",
            }}
          >
            — {cbsSection.quoteAttribution}
          </p>

          {/* CTA */}
          <motion.div
            style={{ marginTop: "48px" }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href={cbsSection.ctaSecondary.href}
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--color-gold)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {cbsSection.ctaSecondary.label}
              <span style={{ fontSize: "0.8rem" }}>→</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right — context copy */}
        <motion.div variants={slideInRight}>
          <p
            style={{
              fontSize: "1.08rem",
              fontWeight: 300,
              color: "var(--color-cream-soft)",
              lineHeight: 1.82,
              marginBottom: "40px",
            }}
          >
            {cbsSection.body}
          </p>

          <VideoFacade youtubeId={cbsSection.youtubeId} title="CBS Mornings Segment" />

          {/* Press badges */}
          <div
            style={{
              display: "flex",
              gap: "24px",
              marginTop: "48px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            {["CBS Mornings", "Red Rock News", "Insight Timer", "DTPR"].map(
              (outlet) => (
                <span
                  key={outlet}
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.56rem",
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--color-muted)",
                    padding: "5px 12px",
                    border: "1px solid var(--color-muted-rule)",
                  }}
                >
                  {outlet}
                </span>
              )
            )}
          </div>
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          .grid-cbs {
            grid-template-columns: 1fr !important;
            gap: 52px !important;
          }
        }
      `}</style>
    </section>
  );
}

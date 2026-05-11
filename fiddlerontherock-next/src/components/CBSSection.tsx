"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CBSSection() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      style={{
        background: "var(--color-ink-soft)",
        borderTop: "1px solid var(--color-muted-rule)",
        borderBottom: "1px solid var(--color-muted-rule)",
        padding: "100px 52px",
        overflow: "hidden",
      }}
    >
      <div
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
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
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
              As Seen On
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
            That was so fun!! You are such a great player.
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
            — Lindsey Stirling · CBS Mornings
          </p>

          {/* CTA */}
          <motion.div
            style={{ marginTop: "48px" }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/press"
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
              Watch the Segment
              <span style={{ fontSize: "0.8rem" }}>→</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right — context copy */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p
            style={{
              fontSize: "1.08rem",
              fontWeight: 300,
              color: "var(--color-cream-soft)",
              lineHeight: 1.82,
              marginBottom: "22px",
            }}
          >
            CBS Mornings traveled to Sedona to cover Tyler Carson's story — a
            violinist who lost his voice and found something more powerful. The
            segment introduced a national audience to the red rocks, the music,
            and a message about resilience the network knew would resonate.
          </p>
          <p
            style={{
              fontSize: "1.08rem",
              fontWeight: 300,
              color: "var(--color-cream-soft)",
              lineHeight: 1.82,
            }}
          >
            On set that day, Tyler performed alongside Lindsey Stirling — one of
            the most recognized violinists in the world. Her reaction says more
            than any review could.
          </p>

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
      </div>

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

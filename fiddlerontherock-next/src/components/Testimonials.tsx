"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  const current = testimonials[active];

  return (
    <section
      ref={ref}
      style={{
        padding: "120px 52px",
        background: "var(--color-ink-soft)",
        borderTop: "1px solid var(--color-muted-rule)",
        overflow: "hidden",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "72px",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-space-mono), monospace",
              fontSize: "0.58rem",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "var(--color-gold)",
            }}
          >
            What people say
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "var(--color-gold)",
              opacity: 0.2,
            }}
          />
        </motion.div>

        {/* Quote carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {/* Giant quote mark */}
              <div
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "7rem",
                  lineHeight: 0.6,
                  color: "var(--color-gold)",
                  opacity: 0.2,
                  marginBottom: "8px",
                  userSelect: "none",
                }}
              >
                "
              </div>

              <blockquote
                style={{
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "clamp(1.7rem, 4vw, 2.6rem)",
                  fontStyle: "italic",
                  fontWeight: 300,
                  lineHeight: 1.3,
                  color: "var(--color-cream)",
                  marginBottom: "36px",
                }}
              >
                {current.quote}
              </blockquote>

              <div>
                <p
                  style={{
                    fontFamily: "var(--font-space-mono), monospace",
                    fontSize: "0.62rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--color-gold)",
                    marginBottom: "4px",
                  }}
                >
                  {current.author}
                </p>
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--color-muted)",
                    fontWeight: 300,
                  }}
                >
                  {current.context}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dot nav */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "56px",
            }}
          >
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 0",
                  display: "flex",
                  alignItems: "center",
                }}
                aria-label={`Testimonial ${i + 1}`}
              >
                <motion.span
                  animate={{
                    width: i === active ? "28px" : "8px",
                    background:
                      i === active
                        ? "var(--color-gold)"
                        : "rgba(138,143,168,0.35)",
                  }}
                  transition={{ duration: 0.35 }}
                  style={{
                    display: "block",
                    height: "2px",
                    borderRadius: "1px",
                  }}
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

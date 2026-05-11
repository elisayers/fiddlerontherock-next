"use client";

import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function EmailSignup() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");

    // TODO: Replace with actual signup endpoint (GoHighLevel or Formspree)
    try {
      await new Promise((res) => setTimeout(res, 900)); // placeholder
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section
      ref={ref}
      style={{
        padding: "120px 52px",
        background: "var(--color-ink)",
        borderTop: "1px solid var(--color-muted-rule)",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "32px",
          }}
        >
          <span
            style={{
              display: "block",
              width: "24px",
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
            Stay Connected
          </span>
          <span
            style={{
              display: "block",
              width: "24px",
              height: "1px",
              background: "var(--color-gold)",
              opacity: 0.45,
            }}
          />
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 300,
            lineHeight: 1.15,
            color: "var(--color-cream)",
            marginBottom: "20px",
          }}
        >
          Be the first to know about{" "}
          <em style={{ fontStyle: "italic", color: "var(--color-gold)" }}>
            new concerts
          </em>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.18 }}
          style={{
            fontSize: "0.98rem",
            fontWeight: 300,
            color: "var(--color-cream-soft)",
            lineHeight: 1.75,
            marginBottom: "48px",
          }}
        >
          Concert dates, private availability, and occasional dispatches from
          the red rocks. No noise.
        </motion.p>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.26 }}
          style={{
            display: "flex",
            gap: "0",
            maxWidth: "480px",
            margin: "0 auto",
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            disabled={status === "loading" || status === "success"}
            style={{
              flex: 1,
              padding: "16px 22px",
              background: "var(--color-ink-soft)",
              border: "1px solid rgba(138,143,168,0.18)",
              borderRight: "none",
              color: "var(--color-cream)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.9rem",
              fontWeight: 300,
              outline: "none",
              transition: "border-color 0.2s",
              minWidth: 0,
            }}
            onFocus={(e) => {
              (e.target as HTMLElement).style.borderColor =
                "rgba(200,169,110,0.45)";
            }}
            onBlur={(e) => {
              (e.target as HTMLElement).style.borderColor =
                "rgba(138,143,168,0.18)";
            }}
          />
          <motion.button
            type="submit"
            disabled={status === "loading" || status === "success"}
            whileHover={{ opacity: 0.88 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: "16px 28px",
              background:
                status === "success" ? "rgba(100,200,100,0.2)" : "var(--color-gold)",
              border: "none",
              color: status === "success" ? "#7ecb7e" : "var(--color-ink)",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor:
                status === "loading" || status === "success"
                  ? "default"
                  : "pointer",
              fontWeight: 400,
              flexShrink: 0,
              transition: "background 0.3s ease",
            }}
          >
            {status === "loading"
              ? "..."
              : status === "success"
              ? "✓ Subscribed"
              : "Subscribe"}
          </motion.button>
        </motion.form>

        {status === "error" && (
          <p
            style={{
              marginTop: "12px",
              fontSize: "0.78rem",
              color: "rgba(200,100,100,0.8)",
            }}
          >
            Something went wrong. Please try again.
          </p>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.36 }}
          style={{
            marginTop: "20px",
            fontSize: "0.72rem",
            color: "rgba(138,143,168,0.45)",
            letterSpacing: "0.04em",
          }}
        >
          No spam, ever. Unsubscribe anytime.
        </motion.p>
      </div>
    </section>
  );
}

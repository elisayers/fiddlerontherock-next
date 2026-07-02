"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/motion";

export default function EmailSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) {
      setStatus("error");
      return;
    }

    const subject = encodeURIComponent("FOTR mailing list request");
    const body = encodeURIComponent(`Please add this email to updates from Fiddler on the Rock:\n\n${email}`);
    window.location.href = `mailto:hello@fiddlerontherock.com?subject=${subject}&body=${body}`;
    setStatus("success");
  }

  return (
    <section
      style={{
        padding: "120px 52px",
        background: "var(--color-ink)",
        textAlign: "center",
      }}
    >
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} style={{ maxWidth: "600px", margin: "0 auto" }}>
        <motion.div variants={fadeUp} style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "32px" }}>
          <span style={{ display: "block", width: "24px", height: "1px", background: "var(--color-gold)", opacity: 0.45 }} />
          <span style={{ fontFamily: "var(--font-space-mono), monospace", fontSize: "0.58rem", letterSpacing: "0.26em", textTransform: "uppercase", color: "var(--color-gold)" }}>
            Stay Connected
          </span>
          <span style={{ display: "block", width: "24px", height: "1px", background: "var(--color-gold)", opacity: 0.45 }} />
        </motion.div>

        <motion.h2 variants={fadeUp} style={{ fontFamily: "var(--font-cormorant), Georgia, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, lineHeight: 1.15, color: "var(--color-cream)", marginBottom: "20px" }}>
          Be the first to know about <em style={{ fontStyle: "italic", color: "var(--color-gold)" }}>new concerts</em>
        </motion.h2>

        <motion.p variants={fadeUp} style={{ fontSize: "0.98rem", fontWeight: 300, color: "var(--color-cream-soft)", lineHeight: 1.75, marginBottom: "48px" }}>
          Concert dates, private availability, and occasional dispatches from the Red Rocks.
        </motion.p>

        <motion.form onSubmit={handleSubmit} variants={fadeUp} style={{ display: "flex", gap: "0", maxWidth: "480px", margin: "0 auto" }}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            disabled={status === "success"}
            style={{ flex: 1, padding: "16px 22px", background: "var(--color-ink-soft)", border: "1px solid rgba(138,143,168,0.18)", borderRight: "none", color: "var(--color-cream)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "0.9rem", fontWeight: 300, outline: "none", minWidth: 0 }}
          />
          <motion.button
            type="submit"
            disabled={status === "success"}
            whileHover={{ opacity: 0.88 }}
            whileTap={{ scale: 0.98 }}
            style={{ padding: "16px 28px", background: "var(--color-gold)", border: "none", color: "var(--color-ink)", fontFamily: "var(--font-dm-sans), sans-serif", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", cursor: status === "success" ? "default" : "pointer", fontWeight: 400 }}
          >
            {status === "success" ? "Email Ready" : "Join"}
          </motion.button>
        </motion.form>

        {status === "error" ? (
          <p style={{ marginTop: "12px", fontSize: "0.78rem", color: "rgba(200,100,100,0.8)" }}>
            Enter an email address to prepare the request.
          </p>
        ) : null}

        {status === "success" ? (
          <p style={{ marginTop: "12px", fontSize: "0.78rem", color: "var(--color-muted)" }}>
            Your email app should open with a ready-to-send request.
          </p>
        ) : null}

        <motion.p variants={fadeUp} style={{ marginTop: "20px", fontSize: "0.72rem", color: "rgba(138,143,168,0.45)", letterSpacing: "0.04em" }}>
          You can also email hello@fiddlerontherock.com directly.
        </motion.p>
      </motion.div>
    </section>
  );
}

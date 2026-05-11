"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { navLinks } from "@/lib/data";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: "22px 52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.4s ease, backdrop-filter 0.4s ease",
          background: scrolled
            ? "rgba(11,13,18,0.94)"
            : "linear-gradient(to bottom, rgba(11,13,18,0.88) 0%, rgba(11,13,18,0) 100%)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(138,143,168,0.08)" : "1px solid transparent",
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "1.1rem",
            fontWeight: 300,
            color: "var(--color-cream)",
            textDecoration: "none",
            letterSpacing: "0.015em",
          }}
        >
          Fiddler <em style={{ fontStyle: "italic", color: "var(--color-gold)" }}>on the</em> Rock
        </Link>

        {/* Desktop links */}
        <ul
          style={{
            display: "flex",
            gap: "40px",
            listStyle: "none",
            alignItems: "center",
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.68rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--color-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--color-cream)")
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLElement).style.color = "var(--color-muted)")
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <Link
          href="/serenades"
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-ink)",
            background: "var(--color-gold)",
            textDecoration: "none",
            padding: "10px 22px",
            transition: "opacity 0.2s",
            display: "inline-block",
          }}
          className="hidden md:inline-block"
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = "0.8")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.opacity = "1")
          }
        >
          Book Experience
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            display: "flex",
            flexDirection: "column",
            gap: "5px",
          }}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{
                rotate:
                  menuOpen && i === 0 ? 45 : menuOpen && i === 2 ? -45 : 0,
                y: menuOpen && i === 0 ? 7 : menuOpen && i === 2 ? -7 : 0,
                opacity: menuOpen && i === 1 ? 0 : 1,
              }}
              transition={{ duration: 0.25 }}
              style={{
                display: "block",
                width: "22px",
                height: "1px",
                background: "var(--color-cream)",
                transformOrigin: "center",
              }}
            />
          ))}
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 99,
          background: "rgba(11,13,18,0.97)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "36px",
        }}
      >
        {navLinks.map((link, i) => (
          <motion.div
            key={link.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: menuOpen ? 1 : 0, y: menuOpen ? 0 : 20 }}
            transition={{ delay: menuOpen ? i * 0.08 : 0, duration: 0.4 }}
          >
            <Link
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "2.4rem",
                fontWeight: 300,
                color: "var(--color-cream)",
                textDecoration: "none",
                letterSpacing: "0.01em",
              }}
            >
              {link.label}
            </Link>
          </motion.div>
        ))}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: menuOpen ? 1 : 0 }}
          transition={{ delay: 0.32, duration: 0.4 }}
        >
          <Link
            href="/serenades"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--color-ink)",
              background: "var(--color-gold)",
              textDecoration: "none",
              padding: "14px 32px",
              marginTop: "12px",
              display: "inline-block",
            }}
          >
            Book Experience
          </Link>
        </motion.div>
      </motion.div>
    </>
  );
}

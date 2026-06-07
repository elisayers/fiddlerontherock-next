"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { experiences } from "@/lib/data";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (pathname === "/experience") return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/experience") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, pathname]);

  if (pathname === "/experience" || pathname.startsWith("/booking")) return null;

  return (
    <header className={"site-nav " + (scrolled ? "site-nav-scrolled" : "")}>
      <Link href="/" className="nav-logo" aria-label="Fiddler on the Rock home" onClick={() => setOpen(false)}>
        <Image src="/images/logo-white.png" alt="Fiddler on the Rock" width={52} height={52} priority />
        <span>Fiddler on the Rock</span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        <Link href="/">Home</Link>
        <Link href="/live-concerts">Live Concerts</Link>
        <Link href="/private-events">Private Events</Link>
        <Link href="/media-merch">Media & Merch</Link>
      </nav>

      {/* Utility Contact Link (Envelope Icon) */}
      <Link href="/contact" className="nav-contact-utility" aria-label="Contact Tyler">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ display: 'block' }}>
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
          <polyline points="22,6 12,13 2,6"></polyline>
        </svg>
      </Link>

      <button
        className="menu-button"
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        <span />
        <span />
        <span />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="mobile-panel"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "24px", marginTop: "24px" }}>
              <Link href="/" onClick={() => setOpen(false)} style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: pathname === "/" ? "var(--color-gold)" : "var(--color-cream)" }}>
                Home
              </Link>
              <Link href="/live-concerts" onClick={() => setOpen(false)} style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: pathname === "/live-concerts" ? "var(--color-gold)" : "var(--color-cream)" }}>
                Live Concerts
              </Link>
              <Link href="/private-events" onClick={() => setOpen(false)} style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: pathname === "/private-events" ? "var(--color-gold)" : "var(--color-cream)" }}>
                Private Events
              </Link>
              <Link href="/media-merch" onClick={() => setOpen(false)} style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: pathname.startsWith("/media-merch") ? "var(--color-gold)" : "var(--color-cream)" }}>
                Media & Merch
              </Link>
              <Link href="/contact" onClick={() => setOpen(false)} style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", color: pathname === "/contact" ? "var(--color-gold)" : "var(--color-cream)" }}>
                Contact
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

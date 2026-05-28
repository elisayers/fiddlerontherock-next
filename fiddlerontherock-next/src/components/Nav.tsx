"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { experiences } from "@/lib/data";
import { usePathname } from "next/navigation";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const experienceLinks = experiences.map((item) => ({ label: item.title, href: item.href }));

  const mediaNavLinks = [
    { label: "CBS", href: "/cbs" },
    { label: "Documentary", href: "/documentary" },
    { label: "Videos", href: "/videos" },
    { label: "Music", href: "/music" }
  ];

  const pressNavLinks = [
    { label: "Press", href: "/press" },
    { label: "EPK", href: "/epk" },
    { label: "Reviews", href: "/what-people-say" }
  ];

  const aboutNavLinks = [
    { label: "About", href: "/about" },
    { label: "Support", href: "/support" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <header className={"site-nav " + (scrolled ? "site-nav-scrolled" : "")}>
      <Link href="/" className="nav-logo" aria-label="Fiddler on the Rock home" onClick={() => setOpen(false)}>
        <Image src="/images/logo-white.png" alt="Fiddler on the Rock" width={52} height={52} priority />
        <span>Fiddler on the Rock</span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        <div className="nav-dropdown">
          <Link href="/">Home</Link>
          <div className="dropdown-panel">
            <Link href="/experience">Landing Page</Link>
          </div>
        </div>
        
        <div className="nav-dropdown">
          <Link href="/experiences">Experiences</Link>
          <div className="dropdown-panel">
            {experienceLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="nav-dropdown">
          <Link href="/media">Media</Link>
          <div className="dropdown-panel">
            {mediaNavLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="nav-dropdown">
          <Link href="/press">Press</Link>
          <div className="dropdown-panel">
            {pressNavLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <Link href="/merch">Merch</Link>

        <div className="nav-dropdown">
          <Link href="/about">About</Link>
          <div className="dropdown-panel">
            {aboutNavLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <Link href="/booking" className="nav-cta">Book</Link>

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
          >
            <MobileGroup
              title="Home"
              links={[
                { label: "Fiddler Home", href: "/" },
                { label: "Landing Page", href: "/experience" }
              ]}
              onClick={() => setOpen(false)}
            />
            <MobileGroup
              title="Experiences"
              links={[{ label: "All Experiences", href: "/experiences" }, ...experienceLinks]}
              onClick={() => setOpen(false)}
            />
            <MobileGroup
              title="Media"
              links={[{ label: "Media Hub", href: "/media" }, ...mediaNavLinks]}
              onClick={() => setOpen(false)}
            />
            <MobileGroup
              title="Press"
              links={pressNavLinks}
              onClick={() => setOpen(false)}
            />
            <MobileGroup
              title="Merch"
              links={[{ label: "Merch Store", href: "/merch" }]}
              onClick={() => setOpen(false)}
            />
            <MobileGroup
              title="About"
              links={aboutNavLinks}
              onClick={() => setOpen(false)}
            />
            <Link className="mobile-book" href="/booking" onClick={() => setOpen(false)}>
              Book an Experience
            </Link>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

function MobileGroup({ title, links, onClick }: { title: string; links: { label: string; href: string }[]; onClick: () => void }) {
  return (
    <div className="mobile-group">
      <p>{title}</p>
      {links.map((link) => (
        <Link key={link.href + link.label} href={link.href} onClick={onClick}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}

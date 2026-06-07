"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { site, socialLinks, support } from "@/lib/data";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  if (pathname === "/experience" || pathname.startsWith("/booking")) return null;
  const year = new Date().getFullYear();

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      await new Promise((res) => setTimeout(res, 900));
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="site-footer">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", marginBottom: "48px" }}>
        {/* Brand column */}
        <div className="footer-brand" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px", margin: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Image src="/images/logo-white.png" alt="Fiddler on the Rock" width={56} height={56} />
            <span style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", letterSpacing: "0.02em" }}>Fiddler on the Rock</span>
          </div>
          <p style={{ marginTop: "8px", maxWidth: "460px" }}>Tyler Carson performs live violin in the Red Rocks of Sedona, Arizona.</p>
          
          <div style={{ display: "flex", gap: "20px", marginTop: "16px" }}>
            {socialLinks.map((link) => {
              const Icon = getSocialIcon(link.label);
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "var(--color-gold)",
                    opacity: 0.6,
                    transition: "opacity 0.25s ease, transform 0.2s ease",
                    display: "inline-flex",
                    alignItems: "center"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = "1";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = "0.6";
                    e.currentTarget.style.transform = "none";
                  }}
                  aria-label={link.label}
                >
                  {Icon}
                </a>
              );
            })}
          </div>
        </div>

        {/* Newsletter Signup ("Stay Connected") */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "480px" }}>
          <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "0.68rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "var(--color-gold)", margin: 0 }}>
            Stay Connected
          </h3>
          <p style={{ margin: 0, color: "var(--color-cream-soft)", fontSize: "0.9rem" }}>
            Join the list for first access to concert dates, music releases, and stories from the Sedona canyons.
          </p>
          <form onSubmit={handleSubscribe} style={{ display: "flex", width: "100%", marginTop: "8px" }}>
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === "loading" || status === "success"}
              style={{
                flex: 1,
                padding: "12px 16px",
                background: "var(--color-ink)",
                border: "1px solid rgba(200, 169, 110, 0.2)",
                borderRight: "none",
                color: "var(--color-cream)",
                fontSize: "0.85rem",
                outline: "none"
              }}
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              style={{
                padding: "12px 20px",
                background: "var(--color-gold)",
                color: "var(--color-ink)",
                border: "none",
                fontFamily: "var(--font-sans)",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 600,
                cursor: "pointer"
              }}
            >
              {status === "loading" ? "..." : status === "success" ? "Subscribed" : "Join"}
            </button>
          </form>
          {status === "error" && (
            <p style={{ color: "rgba(200,100,100,0.8)", fontSize: "0.75rem", margin: 0 }}>Something went wrong. Please try again.</p>
          )}
        </div>
      </div>

      <div className="footer-grid" style={{ borderTop: "1px solid rgba(138,143,168,0.1)", paddingTop: "42px" }}>
        <FooterColumn 
          title="Explore" 
          links={[
            { label: "Home", href: "/" },
            { label: "Live Concerts", href: "/live-concerts" },
            { label: "Private Events", href: "/private-events" },
            { label: "Media & Merch", href: "/media-merch" },
            { label: "Contact", href: "/contact" }
          ]} 
        />
        <FooterColumn 
          title="Listen & Follow" 
          links={[
            { label: "Spotify", href: "https://open.spotify.com/search/tyler%20carson", external: true },
            { label: "Apple Music", href: "https://music.apple.com/us/search?term=Tyler%20Carson", external: true },
            { label: "YouTube", href: "https://www.youtube.com/@fiddlerontherock", external: true },
            { label: "Instagram", href: "https://www.instagram.com/fiddlerontherock/", external: true },
            { label: "Facebook", href: "https://www.facebook.com/fiddlerontherock/", external: true }
          ]} 
        />
        <FooterColumn 
          title="Info" 
          links={[
            { label: "About Tyler", href: "/about" },
            { label: "Press Kit (EPK)", href: "/epk" },
            { label: "Reviews", href: "/what-people-say" },
            { label: "Support Campaign", href: "/support" }
          ]} 
        />
        <FooterColumn 
          title="Legal" 
          links={[
            { label: "Privacy Policy", href: "/privacy" },
            { label: "Terms of Service", href: "/terms" }
          ]} 
        />
      </div>

      <div className="footer-support">
        <p><span>Support the next chapter.</span> {support.body}</p>
        <Link href={site.indiegogo} target="_blank" rel="noopener noreferrer">Indiegogo</Link>
      </div>

      <div className="footer-bottom">
        <p>© {year} Tyler Carson. Sedona, Arizona.</p>
        <div style={{ display: "flex", gap: "16px" }}>
          <Link href="/privacy" style={{ textDecoration: "none", color: "inherit" }}>Privacy Policy</Link>
          <span>•</span>
          <Link href="/terms" style={{ textDecoration: "none", color: "inherit" }}>Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string; external?: boolean }[] }) {
  return (
    <div className="footer-column">
      <h2>{title}</h2>
      {links.map((link) => (
        <Link key={title + link.label} href={link.href} target={link.external ? "_blank" : undefined} rel={link.external ? "noopener noreferrer" : undefined}>
          {link.label}
        </Link>
      ))}
    </div>
  );
}

function getSocialIcon(label: string) {
  switch (label.toLowerCase()) {
    case "instagram":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      );
    case "facebook":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      );
    case "youtube":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
        </svg>
      );
    case "spotify":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.982-.336.076-.67-.135-.746-.47-.077-.337.135-.67.472-.747 3.852-.88 7.15-.506 9.82 1.13.295.18.387.563.207.862zm1.225-2.73c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.082-1.182-.413.125-.85-.107-.975-.52-.125-.413.107-.85.52-.975 3.678-1.117 8.243-.573 11.35 1.34.367.227.488.708.26 1.076zm.106-2.83C14.69 8.878 9.24 8.7 6.09 9.654c-.5.152-1.025-.136-1.177-.638-.152-.5.137-1.025.638-1.177 3.657-1.11 9.65-.9 13.38 1.314.45.267.6.846.333 1.296-.267.45-.847.6-1.296.333z"/>
        </svg>
      );
    case "apple music":
    case "apple":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
      );
    default:
      return null;
  }
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { experiences, site, socialLinks, support } from "@/lib/data";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/experience") return null;
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="footer-brand" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px", marginBottom: "42px" }}>
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

      <div className="footer-grid">
        <FooterColumn 
          title="Experiences" 
          links={[
            { label: "Events Calendar", href: "/events" },
            ...experiences.map((item) => ({ label: item.title, href: item.href }))
          ]} 
        />
        <FooterColumn 
          title="Media" 
          links={[
            { label: "CBS Feature", href: "/cbs" },
            { label: "Documentary", href: "/documentary" },
            { label: "Videos", href: "/videos" },
            { label: "Music", href: "/music" }
          ]} 
        />
        <FooterColumn 
          title="Press" 
          links={[
            { label: "Press Hub", href: "/press" },
            { label: "EPK", href: "/epk" },
            { label: "Reviews", href: "/what-people-say" }
          ]} 
        />
        <FooterColumn 
          title="About" 
          links={[
            { label: "About Tyler", href: "/about" },
            { label: "Support Campaign", href: "/support" },
            { label: "Contact", href: "/contact" }
          ]} 
        />
      </div>

      <div className="footer-support">
        <p><span>Support the next chapter.</span> {support.body}</p>
        <Link href={site.indiegogo} target="_blank" rel="noopener noreferrer">Indiegogo</Link>
      </div>

      <div className="footer-bottom">
        <p>© {year} Tyler Carson. Sedona, Arizona.</p>
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

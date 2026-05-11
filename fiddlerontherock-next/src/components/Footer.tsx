import Link from "next/link";
import { navLinks } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--color-ink-soft)",
        borderTop: "1px solid var(--color-muted-rule)",
        padding: "56px 52px 48px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: "48px",
            marginBottom: "56px",
            flexWrap: "wrap",
          }}
        >
          {/* Wordmark + tagline */}
          <div>
            <Link
              href="/"
              style={{
                fontFamily: "var(--font-cormorant), Georgia, serif",
                fontSize: "1.4rem",
                fontWeight: 300,
                color: "var(--color-cream)",
                textDecoration: "none",
                display: "block",
                marginBottom: "10px",
                letterSpacing: "0.01em",
              }}
            >
              Fiddler{" "}
              <em style={{ fontStyle: "italic", color: "var(--color-gold)" }}>
                on the
              </em>{" "}
              Rock
            </Link>
            <p
              style={{
                fontSize: "0.78rem",
                color: "var(--color-muted)",
                fontWeight: 300,
                maxWidth: "240px",
                lineHeight: 1.7,
              }}
            >
              Tyler Carson · Violin in the red rocks of Sedona, Arizona.
            </p>
          </div>

          {/* Nav columns */}
          <div
            style={{
              display: "flex",
              gap: "64px",
              flexWrap: "wrap",
            }}
          >
            <FooterCol label="Experiences">
              <FooterLink href="/serenades">Sedona Serenades</FooterLink>
              <FooterLink href="/concerts">Nature Concerts</FooterLink>
              <FooterLink href="/contact">Private Events</FooterLink>
            </FooterCol>
            <FooterCol label="Tyler">
              <FooterLink href="/about">About</FooterLink>
              <FooterLink href="/press">Press</FooterLink>
              <FooterLink href="/press">CBS Mornings</FooterLink>
            </FooterCol>
            <FooterCol label="Connect">
              <FooterLink href="https://instagram.com" external>Instagram</FooterLink>
              <FooterLink href="https://youtube.com" external>YouTube</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </FooterCol>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap",
            paddingTop: "24px",
            borderTop: "1px solid var(--color-muted-rule)",
          }}
        >
          <p
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(138,143,168,0.4)",
            }}
          >
            © {year} Tyler Carson · Sedona, Arizona
          </p>
          <div style={{ display: "flex", gap: "28px" }}>
            {["Privacy", "Terms"].map((label) => (
              <Link
                key={label}
                href={`/${label.toLowerCase()}`}
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(138,143,168,0.35)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--color-muted)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color =
                    "rgba(138,143,168,0.35)";
                }}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p
        style={{
          fontFamily: "var(--font-space-mono), monospace",
          fontSize: "0.56rem",
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--color-gold)",
          marginBottom: "20px",
          opacity: 0.75,
        }}
      >
        {label}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {children}
      </div>
    </div>
  );
}

function FooterLink({
  href,
  external = false,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      style={{
        fontSize: "0.82rem",
        fontWeight: 300,
        color: "var(--color-muted)",
        textDecoration: "none",
        transition: "color 0.2s",
        display: "block",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--color-cream)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = "var(--color-muted)";
      }}
    >
      {children}
    </Link>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CardGrid, PageHero, Section } from "@/components/PagePrimitives";
import { epk, epkPressItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "Electronic Press Kit | Tyler Carson, Fiddler on the Rock",
  description: "Industry-facing press kit for Tyler Carson and Fiddler on the Rock, including bio, media coverage, and press assets.",
};

export default function EPKPage() {
  return (
    <>
      <PageHero
        eyebrow="Tyler Carson / Fiddler on the Rock"
        title="CBS-featured violinist and creator of Sedona's signature Red Rock concert experience."
        subtitle="Use this press kit for bios, story background, asset requests, and current media coverage."
        image={epk.jumpImage}
        align="left"
        imagePosition="68% center"
        mobileImagePosition="60% center"
        ctas={[
          { label: "Watch Performance Reel", href: "/media-merch?tab=watch-listen" },
          { label: "Contact for Booking", href: "/contact?type=press" },
        ]}
      />

      <Section eyebrow={epk.location} title="Artist Bio">
        <div className="feature-split">
          <div className="feature-image">
            <Image src={epk.image} alt="Tyler Carson press photo" fill sizes="(max-width: 768px) 100vw, 50vw" className="image-cover" />
          </div>
          <div className="feature-copy">
            <p className="eyebrow">{epk.date}</p>
            {epk.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="button-row left">
              <a className="btn btn-primary" href="/images/epk/tyler-red-rock.jpg" download>
                Download Press Photos
              </a>
              <Link className="btn btn-ghost" href="/contact?type=press&asset=one-sheet">
                Request One-Sheet
              </Link>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Assets" title="Available Press Materials" tone="soft">
        <CardGrid>
          <article className="info-card">
            <p className="card-eyebrow">Downloads</p>
            <h3>Press Photos</h3>
            <p>Primary press image plus supporting artwork are available now from the current EPK asset set.</p>
            <a className="text-link" href="/images/epk/tyler-red-rock.jpg" download>Download</a>
          </article>
          <article className="info-card">
            <p className="card-eyebrow">Fallback</p>
            <h3>One-Sheet</h3>
            <p>A formatted one-sheet is available on request while the final downloadable PDF is being prepared.</p>
            <Link className="text-link" href="/contact?type=press&asset=one-sheet">Request</Link>
          </article>
          <article className="info-card">
            <p className="card-eyebrow">Booking</p>
            <h3>Press & Booking Contact</h3>
            <p>Use the contact page for interview requests, event booking, media coordination, and custom asset needs.</p>
            <Link className="text-link" href="/contact?type=press">Contact</Link>
          </article>
        </CardGrid>
      </Section>

      <Section id="coverage" eyebrow="Press" title="Current Coverage">
        <CardGrid>
          {epkPressItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="card-link"
            >
              <article className="info-card">
                {item.logo ? (
                  <div className="press-logo">
                    <Image src={item.logo} alt={`${item.outlet} logo`} width={180} height={80} />
                  </div>
                ) : (
                  <p className="press-wordmark">{item.outlet}</p>
                )}
                <p className="card-eyebrow">{item.outlet}</p>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <span className="text-link">Read</span>
              </article>
            </Link>
          ))}
        </CardGrid>
      </Section>
    </>
  );
}

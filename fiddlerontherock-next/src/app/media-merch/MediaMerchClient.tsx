"use client";

import { Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import VideoFacade from "@/components/VideoFacade";
import { ButtonLink, CardGrid, InfoCard, PageHero, Section } from "@/components/PagePrimitives";
import { musicItems, socialLinks, videos, documentary, cbs, merchItems } from "@/lib/data";
import { videoSchema } from "@/lib/schema";

function MediaMerchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab: "watch-listen" | "shop" = searchParams.get("tab") === "shop" ? "shop" : "watch-listen";

  const handleTabChange = (tab: "watch-listen" | "shop") => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`/media-merch?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      {activeTab === "watch-listen" ? (
        <JsonLd
          data={[
            videoSchema(documentary.headline, documentary.subheadline, "/images/living-music-documentary-cover.jpeg", `https://www.youtube.com/watch?v=${documentary.youtubeId}`),
            videoSchema(cbs.title, cbs.subheadline, "/images/cbs-experiences-hero.png", `https://www.youtube.com/watch?v=${cbs.youtubeId}`),
          ]}
        />
      ) : null}

      <PageHero
        eyebrow="Music & Media"
        title={activeTab === "watch-listen" ? "Watch, listen, and follow Tyler Carson." : "Merch is being prepared for a fuller online release."}
        subtitle={activeTab === "watch-listen"
          ? "Start with the CBS feature, the Living Music documentary, and the performance archive."
          : "Concert merchandise and take-home keepsakes are available at live events now. Online ordering is being finalized, so use this page as a current merch overview and inquiry point."}
        image={activeTab === "watch-listen" ? "/images/tyler-performance.jpg" : "/images/tyler-red-rock.jpg"}
        align="left"
        imagePosition={activeTab === "watch-listen" ? "center center" : "60% center"}
        mobileImagePosition="58% center"
      />

      <div className="tab-navigation-container">
        <button className={`tab-btn ${activeTab === "watch-listen" ? "active" : ""}`} onClick={() => handleTabChange("watch-listen")}>
          Watch & Listen
        </button>
        <button className={`tab-btn ${activeTab === "shop" ? "active" : ""}`} onClick={() => handleTabChange("shop")}>
          Merch & Keepsakes
        </button>
      </div>

      {activeTab === "watch-listen" ? (
        <>
          <Section eyebrow="National Feature" title={cbs.headline}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "36px", marginBottom: "48px" }}>
              <div className="video-embed-container" style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", maxWidth: "100%", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.08)" }}>
                <iframe
                  src={`https://www.youtube.com/embed/${cbs.youtubeId}?rel=0&modestbranding=1`}
                  title={cbs.title}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="lede">{cbs.body}</p>
              <div className="quote-block">
                <p>{cbs.quote}</p>
                <cite>{cbs.attribution}</cite>
              </div>
            </div>
          </Section>

          <Section eyebrow="Award-Winning Short" title={documentary.headline} tone="soft">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
              <div className="documentary-cover" style={{ margin: "0 auto", width: "100%", maxWidth: "400px" }}>
                <Image src="/images/living-music-documentary-cover.jpeg" alt="Living Music documentary cover art" fill sizes="(max-width: 900px) 100vw, 400px" className="image-cover" />
              </div>
              <div>
                <p className="lede">{documentary.body}</p>
                <div className="laurel-row">
                  <span>Illuminate Film Festival Jury Prize</span>
                  <span>Prescott Film Festival Best Documentary Short</span>
                  <span>Madrid International Film Festival Official Selection</span>
                  <span>St. Louis International Film Festival Official Selection</span>
                  <span>Awareness Festival Official Selection</span>
                  <span>BendFilm Official Selection</span>
                </div>
                <div className="quote-block" style={{ marginBottom: "28px" }}>
                  <p>{documentary.quote}</p>
                  <cite>{documentary.attribution}</cite>
                </div>
                <div className="button-row left">
                  <ButtonLink link={{ label: "Support the Project", href: "/support" }} />
                </div>
              </div>
            </div>
          </Section>

          <Section eyebrow="Performance Archive" title="More Ways to Watch">
            <div style={{ marginBottom: "52px" }}>
              <VideoFacade youtubeId={videos[0].youtubeId} title="Fiddler on the Rock video archive" poster="/images/tyler-performance.jpg" />
            </div>
            <CardGrid>
              {videos.map((item) => (
                <InfoCard key={item.title} eyebrow={item.type} title={item.title} body="Watch Tyler Carson perform live in Sedona and explore the broader story behind the project." href={item.href} cta="Watch" />
              ))}
            </CardGrid>
          </Section>

          <Section eyebrow="Music" title="Listen Online" tone="soft">
            <p className="lede">Original music, loop-based arrangements, and the sound world behind Fiddler on the Rock.</p>
            <div style={{ marginBottom: "40px" }}>
              <CardGrid>
                {musicItems.map((item) => <InfoCard key={item.title} title={item.title} body={item.detail} />)}
              </CardGrid>
            </div>
            <CardGrid>
              {socialLinks.filter((item) => ["Spotify", "Apple Music", "YouTube"].includes(item.label)).map((item) => (
                <InfoCard key={item.label} title={item.label} body={`Listen to Tyler Carson on ${item.label}.`} href={item.href} cta="Open" />
              ))}
            </CardGrid>
          </Section>
        </>
      ) : (
        <>
          <Section eyebrow="Merch" title="Concert merch, music, and keepsakes">
            <p className="lede" style={{ marginBottom: "32px" }}>
              Merchandise is available at live shows now. Online ordering is being finalized, so this page functions as a polished overview instead of a broken storefront.
            </p>
            <CardGrid>
              {merchItems.map((item) => <InfoCard key={item.title} title={item.title} body={item.detail} />)}
            </CardGrid>
          </Section>

          <Section eyebrow="Need Something Specific?" title="Request the current merch list" tone="soft">
            <div className="checkout-status-card" style={{ maxWidth: "860px" }}>
              <h4>Online merch checkout is being finalized.</h4>
              <p>
                If you want current inventory, signed items, or a gift request, send a note and Tyler will confirm what is available directly.
              </p>
              <div className="button-row left" style={{ marginTop: 4 }}>
                <ButtonLink link={{ label: "Contact Tyler", href: "/contact?type=merch" }} />
                <ButtonLink link={{ label: "See Live Shows", href: "/live-concerts" }} variant="ghost" />
              </div>
            </div>
          </Section>
        </>
      )}
    </>
  );
}

export default function MediaMerchClient() {
  return (
    <div className="site-main">
      <Suspense
        fallback={
          <div style={{ display: "grid", placeItems: "center", minHeight: "100vh", background: "var(--color-ink)", color: "var(--color-cream-soft)", padding: "32px" }}>
            <div className="checkout-status-card" style={{ maxWidth: "700px" }}>
              <h4>Loading music and media.</h4>
              <p>The media library is opening now. If the page stalls, refresh once or use the contact page for the latest links.</p>
            </div>
          </div>
        }
      >
        <MediaMerchContent />
      </Suspense>
    </div>
  );
}

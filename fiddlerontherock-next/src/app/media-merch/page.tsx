"use client";

import { Suspense, useState, useEffect } from "react";
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
  
  // Read tab parameter, fallback to 'watch-listen'
  const tabParam = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState<"watch-listen" | "shop">("watch-listen");

  useEffect(() => {
    if (tabParam === "shop") {
      setActiveTab("shop");
    } else {
      setActiveTab("watch-listen");
    }
  }, [tabParam]);

  const handleTabChange = (tab: "watch-listen" | "shop") => {
    setActiveTab(tab);
    // Update URL query parameter without full reload
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.push(`/media-merch?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      {activeTab === "watch-listen" && (
        <JsonLd
          data={[
            videoSchema(
              documentary.headline,
              documentary.subheadline,
              "/images/living-music-documentary-cover.jpeg",
              "https://www.youtube.com/watch?v=" + documentary.youtubeId
            ),
            videoSchema(
              cbs.title,
              cbs.subheadline,
              "/images/cbs-experiences-hero.png",
              "https://www.youtube.com/watch?v=" + cbs.youtubeId
            )
          ]}
        />
      )}

      <PageHero
        eyebrow="Hub"
        title={activeTab === "watch-listen" ? "Watch & Listen" : "Fiddler on the Rock Shop"}
        subtitle={
          activeTab === "watch-listen"
            ? "Immerse yourself in Tyler Carson's Living Music story: CBS features, the award-winning documentary, performance videos, and studio recordings."
            : "Bring a piece of the Sedona experience home. Official Fiddler on the Rock apparel, physical recordings, and unique keepsakes."
        }
        image={
          activeTab === "watch-listen"
            ? "/images/tyler-performance.jpg"
            : "/images/logo-black.png"
        }
      />

      {/* Sub-Navigation Tabs */}
      <div className="tab-navigation-container">
        <button
          className={`tab-btn ${activeTab === "watch-listen" ? "active" : ""}`}
          onClick={() => handleTabChange("watch-listen")}
        >
          Watch & Listen
        </button>
        <button
          className={`tab-btn ${activeTab === "shop" ? "active" : ""}`}
          onClick={() => handleTabChange("shop")}
        >
          Shop Merch
        </button>
      </div>

      {activeTab === "watch-listen" ? (
        <>
          {/* Section 1: The CBS Mornings Feature */}
          <Section eyebrow="National Feature" title={cbs.headline}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "36px", marginBottom: "48px" }}>
              <div
                className="video-embed-container"
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                  overflow: "hidden",
                  maxWidth: "100%",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.08)"
                }}
              >
                <iframe
                  src={"https://www.youtube.com/embed/" + cbs.youtubeId + "?rel=0&modestbranding=1"}
                  title={cbs.title}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
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

          {/* Section 2: Living Music Documentary */}
          <Section eyebrow="Award-Winning Short" title={documentary.headline} tone="soft">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "48px", alignItems: "center" }}>
              <div className="documentary-cover" style={{ margin: "0 auto", width: "100%", maxWidth: "400px" }}>
                <Image
                  src="/images/living-music-documentary-cover.jpeg"
                  alt="Living Music documentary cover art"
                  fill
                  sizes="(max-width: 900px) 100vw, 400px"
                  className="image-cover"
                />
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

          {/* Section 3: Performance Video Archive */}
          <Section eyebrow="Performances" title="Sedona Performance Videos">
            <div style={{ marginBottom: "52px" }}>
              <VideoFacade youtubeId={videos[0].youtubeId} title="Fiddler on the Rock video archive" poster="/images/tyler-performance.jpg" />
            </div>
            <h3 style={{ marginBottom: "24px", fontFamily: "var(--font-serif)", fontSize: "1.8rem" }}>More Videos</h3>
            <CardGrid>
              {videos.map((item) => (
                <InfoCard
                  key={item.title}
                  eyebrow={item.type}
                  title={item.title}
                  body="Watch Tyler Carson perform his loops and original songs live in Sedona's red rocks."
                  href={item.href}
                  cta="Watch"
                />
              ))}
            </CardGrid>
          </Section>

          {/* Section 4: Discography & Streaming */}
          <Section eyebrow="Music Discography" title="The Sound of the Red Rocks" tone="soft">
            <p className="lede">Explore Tyler Carson's original compositions and loops, shaped by recovery, presence, and the quiet beauty of the desert landscape.</p>
            <div style={{ marginBottom: "52px" }}>
              <CardGrid>
                {musicItems.map((item) => (
                  <InfoCard key={item.title} title={item.title} body={item.detail} />
                ))}
              </CardGrid>
            </div>
            <h3 style={{ marginBottom: "24px", fontFamily: "var(--font-serif)", fontSize: "1.8rem" }}>Listen Online</h3>
            <CardGrid>
              {socialLinks
                .filter((item) => ["Spotify", "Apple Music", "YouTube"].includes(item.label))
                .map((item) => (
                  <InfoCard
                    key={item.label}
                    title={item.label}
                    body={`Stream Tyler's albums and singles on ${item.label}.`}
                    href={item.href}
                    cta="Listen"
                  />
                ))}
            </CardGrid>
          </Section>
        </>
      ) : (
        /* Shop Tab */
        <Section title="Available Merchandise">
          <p className="lede" style={{ marginBottom: "48px" }}>
            Bring the soundtrack of the Red Rocks back home with you. Official apparel, music records, and mementos are available at all weekly concerts, or you can purchase online below.
          </p>
          <CardGrid>
            {merchItems.map((item) => (
              <InfoCard
                key={item.title}
                title={item.title}
                body={item.detail}
                href={item.title.toLowerCase().includes("gift") ? "/contact?booking=gift-cards" : undefined}
                cta={item.title.toLowerCase().includes("gift") ? "Inquire" : undefined}
              />
            ))}
          </CardGrid>
        </Section>
      )}
    </>
  );
}

export default function MediaMerchPage() {
  return (
    <div className="site-main">
      <Suspense fallback={
        <div style={{ display: "grid", placeItems: "center", minHeight: "100vh", background: "var(--color-ink)", color: "var(--color-cream-soft)" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Loading...</p>
        </div>
      }>
        <MediaMerchContent />
      </Suspense>
    </div>
  );
}

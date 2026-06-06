"use client";

import { useEffect, useState } from "react";
import BookingForm from "@/components/BookingForm";
import "./experience.css";

export default function ExperienceLandingPage() {
  const [stickyVisible, setStickyVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setStickyVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="experience-landing">
      {/* Landing Page Content */}
      

{/* ═══════════════════ HERO ═══════════════════ */}
<section className="hero">
  <div className="hero-bg"></div>
  <div className="hero-overlay"></div>
  <div className="hero-content">
    <img src="/images/experience/packages-hero.png" alt="Fiddler on the Rock" className="hero-logo" />
    <p className="hero-eyebrow">Sedona, Arizona · Private Concert Experience</p>
    <h1>A Violin Concert<br /><em>Just for You</em><br />in the Red Rocks</h1>
    <p className="hero-sub">Tyler Carson leads you to a secret vantage point among Sedona's ancient cliffs — and plays a private concert you'll never stop talking about.</p>
    <a href="#book" className="hero-cta">Reserve Your Experience</a>
  </div>
  <div className="hero-scroll">
    <div className="scroll-line"></div>
    <span>Scroll</span>
  </div>
</section>

{/* ═══════════════════ OPENING QUOTE ═══════════════════ */}
<section className="intro-section">
  <div className="container">
    <p className="big-quote">"She searched for the perfect word to describe it. When she couldn't find one, she said he was doing God's work — turning the landscape into music she could feel throughout her whole body."</p>
    <span className="big-quote-attr">— A guest, after her Red Rock Nature Concert</span>
  </div>
</section>

{/* ═══════════════════ WHAT IS IT ═══════════════════ */}
<section>
  <div className="container">
    <span className="section-eyebrow">What to expect</span>
    <h2 className="section-title">This isn't a show.<br /><em>It's a moment.</em></h2>
    <p className="section-lead">Tyler Carson has performed for tens of thousands around the world and millions on television — but nothing compares to a Sedona Serenade experience. Physically emersed in the breathtaking Red Rock landscapes, this private live violin performance invites you into a moment that feels cinematic, emotional, and completely unforgettable.</p>

    <div className="steps-grid">
      <div className="step-card">
        <p className="step-number">Step 01</p>
        <h3>You Book</h3>
        <p>Send an inquiry below. Tyler confirms your date and shares the meeting point — usually 5 minutes from parking.</p>
      </div>
      <div className="step-card">
        <p className="step-number">Step 02</p>
        <h3>You Arrive</h3>
        <p>Tyler meets you at the trailhead. Artesian spring water is waiting. The Red Rocks do the rest.</p>
      </div>
      <div className="step-card">
        <p className="step-number">Step 03</p>
        <h3>He Plays</h3>
        <p>A private concert among the cliffs. No crowd. No stage. Just music, canyon walls, and open sky above you.</p>
      </div>
      <div className="step-card">
        <p className="step-number">Step 04</p>
        <h3>You Remember</h3>
        <p>Guests consistently say the same thing: "I'll never forget this." You'll understand why when it happens.</p>
      </div>
    </div>
  </div>
</section>

{/* ═══════════════════ LOCATIONS ═══════════════════ */}
<section className="locations-section">
  <div className="container">
    <span className="section-eyebrow">The Locations</span>
    <h2 className="section-title">Two secret spots.<br /><em>Both unforgettable.</em></h2>
    <p className="section-lead">Tyler has scouted Sedona's public lands to find the most breathtaking — and most personal — stages imaginable. Your group size and mobility guide where he takes you.</p>

    <div className="locations-grid">
      <div className="location-card">
        <span className="location-tag">The Secret Spot</span>
        <h3>A Hidden Canyon Formation</h3>
        <p>Tyler has found a natural formation tucked deep into the Red Rock landscape — the kind of place most visitors to Sedona never know exists. Ancient walls, canyon silence, and acoustics that make the violin sound like it's coming from the earth itself.</p>
        <div className="location-detail"><span className="location-detail-icon">⟶</span><span>Short, easy walk from parking — about 5 minutes</span></div>
        <div className="location-detail"><span className="location-detail-icon">⟶</span><span>No hiking experience or fitness level required</span></div>
        <div className="location-detail"><span className="location-detail-icon">⟶</span><span>Natural canyon acoustics that have to be heard to be believed</span></div>
        <div className="location-detail"><span className="location-detail-icon">⟶</span><span>The exact location is revealed after booking — that's part of it</span></div>
      </div>
      <div className="location-card">
        <span className="location-tag">The Open-Air Spot</span>
        <h3>A Sweeping Red Rock Vista</h3>
        <p>An open, breathtaking setting framed by Sedona's iconic red cliffs on every side. No narrow trail, no elevation — just wide sky, ancient rock, and music carried on the desert air. Tyler's choice for guests who want the full panoramic experience.</p>
        <div className="location-detail"><span className="location-detail-icon">⟶</span><span>Flat and fully accessible — no trail navigation needed</span></div>
        <div className="location-detail"><span className="location-detail-icon">⟶</span><span>Ideal for guests with mobility considerations</span></div>
        <div className="location-detail"><span className="location-detail-icon">⟶</span><span>360-degree Red Rock views in every direction</span></div>
        <div className="location-detail"><span className="location-detail-icon">⟶</span><span>Stunning at any time of day — extraordinary at sunset</span></div>
      </div>
      <div className="location-card">
        <span className="location-tag">Premium Option</span>
        <h3>Your Location</h3>
        <p>Hotel suite. Private villa. Airbnb patio. If you have a special setting in mind — a place that already means something to you — Tyler will bring the concert there.</p>
        <div className="location-detail"><span className="location-detail-icon">⟶</span><span>Perfect for proposals, anniversaries, private events</span></div>
        <div className="location-detail"><span className="location-detail-icon">⟶</span><span>Custom pricing based on location and logistics</span></div>
        <div className="location-detail"><span className="location-detail-icon">⟶</span><span>Alcohol and catering fully welcome at your venue</span></div>
        <a href="#book" className="map-link">Inquire for Pricing ↗</a>
      </div>
    </div>
  </div>
</section>

{/* ═══════════════════ TESTIMONIALS ═══════════════════ */}
<section className="testimonials-section">
  <div className="container-wide">
    <div style={{ maxWidth: "680px" }}>
      <span className="section-eyebrow">What people say</span>
      <h2 className="section-title">Real moments.<br /><em>Real words.</em></h2>
    </div>

    <div className="testimonials-grid">
      <div className="testimonial-card">
        <p className="testimonial-quote">"Such a unique experience. The kind of thing you talk about for the rest of your life — that time a violinist played a private concert for me in the Sedona Red Rocks."</p>
        <span className="testimonial-attr">— Red Rock Nature Concert guest</span>
      </div>
      <div className="testimonial-card">
        <p className="testimonial-quote">"Mind blown. We went to Sedona expecting beautiful scenery — we didn't expect to be completely undone by a violin in a canyon."</p>
        <span className="testimonial-attr">— Red Rock Nature Concert guest</span>
      </div>
      <div className="testimonial-card">
        <p className="testimonial-quote">"She and her daughter bought every one of his albums — all fourteen of them — right there in the canyon. She just had to take the music home."</p>
        <span className="testimonial-attr">— After a single Red Rock Nature Concert</span>
      </div>
      <div className="testimonial-card">
        <p className="testimonial-quote">"I just had the honor and the pleasure of listening to Tyler's CD for the first time and I'm blown away all over again! He's amazing!!! So gifted! I LOVE HIM!!! Thank you for such an incredible gift."</p>
        <span className="testimonial-attr">— Cheryl</span>
      </div>
    </div>
  </div>
</section>

{/* ═══════════════════ REVIEWS ═══════════════════ */}
<section className="video-section">
  <div className="container" style={{ textAlign: "center" }}>
    <span className="section-eyebrow">What people are saying</span>
    <h2 className="section-title">Rated <em>5 Stars</em><br />on Every Platform.</h2>
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "40px", marginTop: "48px", flexWrap: "wrap", rowGap: "24px" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "1.6rem", letterSpacing: "0.1em", color: "#C8A96E", marginBottom: "10px" }}>★★★★★</div>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.5)" }}>Google Reviews</div>
      </div>
      <div style={{ width: "1px", height: "40px", background: "rgba(200,169,110,0.15)", flexShrink: "0" }}></div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "1.6rem", letterSpacing: "0.1em", color: "#C8A96E", marginBottom: "10px" }}>★★★★★</div>
        <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(245,240,232,0.5)" }}>TripAdvisor</div>
      </div>
    </div>

    {/* Review Cards */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))", gap: "24px", marginTop: "64px", textAlign: "left" }}>
      <div className="testimonial-card g-review">
        <div className="ta-badge">
          <span className="g-stars">★★★★★</span>
          <span className="g-label">Google · Verified Review</span>
        </div>
        <p className="testimonial-quote">"What an incredibly magical man! With his very first note, he has captivated my attention and sent his music through my soul! I absolutely adore his talent along with his beautiful smile and soul! Thank you for adding to an already beautiful moment for my son and I!!"</p>
        <span className="testimonial-attr">— Mercedes Thornhill · Local Guide</span>
      </div>
      <div className="testimonial-card ta-review">
        <div className="ta-badge">
          <span className="ta-stars">★★★★★</span>
          <span className="ta-label">TripAdvisor · Verified Review</span>
        </div>
        <p className="testimonial-quote">"If you are anywhere near Sedona do not miss Tyler's performance. His musical talent is beyond my comprehension. I was mesmerized and so joy-filled absorbing the beautiful music and creative selections. This performance will stick with me for a long time — thank you Tyler, and thank you for taking the time to visit with us after the show."</p>
        <span className="testimonial-attr">— Barbara S · March 2026</span>
      </div>
      <div className="testimonial-card g-review">
        <div className="ta-badge">
          <span className="g-stars">★★★★★</span>
          <span className="g-label">Google · Verified Review</span>
        </div>
        <p className="testimonial-quote">"This was one of the best experiences we had in Sedona! How do you beat an exceptional violinist doing his thing as the sun sets on the Sedona red rocks and the moon appears behind him. It was perfect. Everyone should experience this while visiting Sedona. Such a talented young man with an incredible story!"</p>
        <span className="testimonial-attr">— Patricia Vericker · Local Guide</span>
      </div>
      <div className="testimonial-card g-review">
        <div className="ta-badge">
          <span className="g-stars">★★★★★</span>
          <span className="g-label">Google · Verified Review</span>
        </div>
        <p className="testimonial-quote">"If you have the chance to see Tyler Carson perform, DO NOT MISS IT! He is extraordinarily talented and plays a variety of music that will appeal to anyone. You've never heard the violin like this. You'll want to dance. No one was still in their seats. And hearing his heartfelt journey to where he is today is also moving and joyous. Just go!!"</p>
        <span className="testimonial-attr">— Renee Kelly · Local Guide</span>
      </div>
      <div className="testimonial-card ta-review">
        <div className="ta-badge">
          <span className="ta-stars">★★★★★</span>
          <span className="ta-label">TripAdvisor · Verified Review</span>
        </div>
        <p className="testimonial-quote">"This was a birthday celebration gift for my husband. We did the VIP and it was well worth it!! Listening to the talented Fiddler on the Rock while enjoying the view was outstanding! Sedona is a special place and he made our trip magical with his music. Looking forward to attending again when we are back in Sedona!"</p>
        <span className="testimonial-attr">— Christine P · October 2025</span>
      </div>
      <div className="testimonial-card ta-review">
        <div className="ta-badge">
          <span className="ta-stars">★★★★★</span>
          <span className="ta-label">TripAdvisor · Verified Review</span>
        </div>
        <p className="testimonial-quote">"What an honor to watch someone who has mastered their craft while at the same time exuding the confident stage presence required for a show of this magnitude, in the most fun, joyful and authentic way possible. A heart-based experience for sure!"</p>
        <span className="testimonial-attr">— Julie H · Solo Guest · February 2025</span>
      </div>
    </div>
  </div>
</section>

{/* ═══════════════════ PHOTO GALLERY ═══════════════════ */}
<section className="gallery-section">
  <div className="gallery-header">
    <span className="section-eyebrow">The Experience</span>
    <h2 className="section-title" style={{ marginBottom: "14px" }}>Moments from the<br /><em>canyon.</em></h2>
    <p style={{ fontSize: "15px", fontWeight: "300", color: "var(--muted)", lineHeight: "1.65" }}>Real moments from real guests — in the Red Rocks, under open sky.</p>
  </div>
  <div className="gallery-grid">
    <div className="gallery-item g-love">
      <img src="/images/experience/serenade-love.jpg" alt="Couple sharing a moment during a private violin experience in Sedona" loading="lazy" />
    </div>
    <div className="gallery-item g-crew">
      <img src="/images/experience/happy-crew.jpg" alt="Happy guests enjoying a Sedona Red Rock concert" loading="lazy" />
    </div>
    <div className="gallery-item g-tyler">
      <img src="/images/experience/tyler-serenade-story.jpg" alt="Tyler Carson performing violin in the Sedona Red Rocks" loading="lazy" />
    </div>
    <div className="gallery-item g-sunset">
      <img src="/images/experience/sunset-serenades.jpg" alt="Sunset during a private violin concert in Sedona" loading="lazy" />
    </div>
    <div className="gallery-item g-redrock">
      <img src="/images/experience/redrock-views.jpg" alt="Red Rock canyon views during a Sedona concert" loading="lazy" />
    </div>
    <div className="gallery-item g-seats">
      <img src="/images/experience/serenade-seats.jpg" alt="Intimate seating arrangement for a Sedona Red Rock concert" loading="lazy" />
    </div>
  </div>
  <div className="gallery-footer">
    <a href="#pricing" className="btn-gold">See Pricing & Book</a>
  </div>
</section>

{/* ═══════════════════ PRICING ═══════════════════ */}
<section className="pricing-section" id="pricing">
  <div className="container-wide">
    <div style={{ maxWidth: "680px" }}>
      <span className="section-eyebrow">Pricing & Availability</span>
      <h2 className="section-title">Choose your<br /><em>experience.</em></h2>
      <p className="section-lead">Every experience includes Sedona Artesian Spring Water. Tyler books a limited number of concerts each month — dates fill up, especially around sunset.</p>
    </div>

    <div className="pricing-grid">

      {/* LEFT: The Gathering */}
      <div className="pricing-card">
        <h3>The Gathering</h3>
        <p className="pricing-tagline">Friends, family, a few couples together — the canyon sounds different when you share it with the people you love most.</p>
        <div className="price-main">$149</div>
        <p className="price-note">Per person · 3–6 guests</p>
        <div className="price-breakdown">
          <div className="price-row"><span>3 guests</span><span>$447</span></div>
          <div className="price-row"><span>4 guests</span><span>$596</span></div>
          <div className="price-row"><span>5 guests</span><span>$745</span></div>
          <div className="price-row"><span>6 guests (max)</span><span>$894</span></div>
        </div>
        <ul className="pricing-includes">
          <li>75-minute canyon concert experience</li>
          <li>Tyler's secret sunset location</li>
          <li>Sedona Artesian Spring Water for all</li>
          <li>Choice of Posse Grounds or Cultural Park</li>
        </ul>
        <a href="#book" className="pricing-btn">Book Your Group</a>
      </div>

      {/* MIDDLE: Romantic (featured) */}
      <div className="pricing-card featured">
        <h3>Romantic Escape</h3>
        <p className="pricing-tagline">Just the two of you, the red canyon, and music that makes time stop. This is the one people talk about for years.</p>
        <div className="price-main">$399</div>
        <p className="price-note">For two guests · Everything included</p>
        <ul className="pricing-includes">
          <li>75-minute intimate canyon concert</li>
          <li>Tyler's secret sunset location</li>
          <li>Sedona Artesian Spring Water included</li>
          <li>Artisan chocolates — a little something extra</li>
          <li>Handwritten song dedication card from Tyler</li>
          <li>Children under 5 are welcome at no charge</li>
          <li>Ages 6–15 may be added at $97 each</li>
          <li>Photographers welcome — just mention at booking</li>
        </ul>
        <a href="#book" className="pricing-btn">Reserve This Experience</a>
      </div>

      {/* RIGHT: The Celebration */}
      <div className="pricing-card">
        <h3>The Celebration</h3>
        <p className="pricing-tagline">A bigger gathering, still intimate. Seven to ten people experiencing live music under the red cliffs — something none of you will forget.</p>
        <div className="price-main">$125</div>
        <p className="price-note">Per person · 7–10 guests</p>
        <div className="price-breakdown">
          <div className="price-row"><span>7 guests</span><span>$875</span></div>
          <div className="price-row"><span>8 guests</span><span>$1,000</span></div>
          <div className="price-row"><span>9 guests</span><span>$1,125</span></div>
          <div className="price-row"><span>10 guests (max)</span><span>$1,250</span></div>
        </div>
        <ul className="pricing-includes">
          <li>75-minute canyon concert experience</li>
          <li>Cultural Park — easy access for larger groups</li>
          <li>Sedona Artesian Spring Water for all</li>
          <li>Ideal for reunions, retreats, milestones</li>
        </ul>
        <a href="#book" className="pricing-btn">Book Your Celebration</a>
      </div>

      {/* FULL-WIDTH: Memory Package */}
      <div className="pricing-card memory-pkg">
        <div>
          <span className="section-eyebrow" style={{ display: "block", marginBottom: "8px", color: "#c8a0f0" }}>Sedona Memory Package</span>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.2rem", fontWeight: "400", marginBottom: "8px", lineHeight: "1.1" }}>Live music. The canyon at golden hour.<br /><em>And someone to capture all of it.</em></h3>
          <p style={{ fontSize: "0.9rem", color: "rgba(245,240,232,0.6)", marginBottom: "28px", maxWidth: "600px", lineHeight: "1.6" }}>The Romantic Escape, elevated. A professional Sedona photographer joins your experience and documents the entire concert — Tyler playing against the canyon, the canyon light, the moment that made you drive out here in the first place. 20+ edited photos delivered within 5 days.</p>
          <div className="price-main" style={{ fontSize: "2.8rem", marginBottom: "6px" }}>$2,000</div>
          <p className="price-note" style={{ marginBottom: "28px" }}>For two guests · Photography + Concert · 5-day advance booking required</p>
          <div className="includes-cols">
            <ul className="pricing-includes">
              <li>Full Romantic Escape experience</li>
              <li>Professional Sedona photographer</li>
              <li>60-minute photography session</li>
              <li>20+ edited digital photos</li>
            </ul>
            <ul className="pricing-includes">
              <li>Delivered within 5 business days</li>
              <li>Artisan chocolates + spring water</li>
              <li>Handwritten song dedication card</li>
              <li>Children under 5 free · Ages 6–15 add $97</li>
            </ul>
          </div>
        </div>
        <div style={{ textAlign: "center" }}>
          <a href="#book" className="pricing-btn">Book the Memory Package</a>
          <p style={{ fontSize: "9px", color: "rgba(245,240,232,0.35)", marginTop: "12px", fontFamily: "'Space Mono',monospace", letterSpacing: "0.1em" }}>Limited availability</p>
        </div>
      </div>

      {/* FULL-WIDTH: Private Events */}
      <div className="pricing-card private-event">
        <div className="pe-text">
          <span className="section-eyebrow" style={{ display: "block", marginBottom: "8px" }}>Private Events · 11+ Guests</span>
          <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.9rem", fontWeight: "400", color: "#fff", marginBottom: "10px" }}>Planning something bigger?</h3>
          <p style={{ fontSize: "0.9rem", color: "rgba(245,240,232,0.65)", lineHeight: "1.6", maxWidth: "600px" }}>Corporate retreats, wedding celebrations, milestone gatherings — Tyler creates fully customized experiences for larger events. Pricing is built around your group, your vision, and your location. Reach out and he'll put something together for you.</p>
        </div>
        <div className="pe-cta">
          <a href="#book" className="pricing-btn" style={{ display: "inline-block" }}>Request a Quote</a>
        </div>
      </div>

    </div>
  </div>
</section>

{/* ═══════════════════ ADD-ONS ═══════════════════ */}
<section className="addons-section">
  <div className="container-wide">
    <div style={{ maxWidth: "680px" }}>
      <span className="section-eyebrow">Enhance Your Experience</span>
      <h2 className="section-title">Make it<br /><em>even more.</em></h2>
    </div>
    <div className="addons-grid">
      <div className="addon-card">
        <span className="addon-icon">🎵</span>
        <h4>Your Song on Violin</h4>
        <p>Have Tyler learn and perform your favorite song's melody on violin during the concert. A deeply personal touch that transforms the experience into something that belongs entirely to you.</p>
        <span className="addon-badge optional">+$250 per song</span>
      </div>
      <div className="addon-card">
        <span className="addon-icon">📸</span>
        <h4>Photography</h4>
        <p>A photographer to capture the experience — the setting, the music, the look on your face. Because you'll want proof this happened.</p>
        <span className="addon-badge optional">Inquiry only</span>
      </div>
      <div className="addon-card">
        <span className="addon-icon">💧</span>
        <h4>Artesian Spring Water</h4>
        <p>Cold Sedona Artesian Spring Water waiting for you when you arrive. Because the desert is beautiful and also hot.</p>
        <span className="addon-badge included">Included with every booking</span>
      </div>
      <div className="addon-card">
        <span className="addon-icon">🍫</span>
        <h4>Handmade Organic Chocolate</h4>
        <p>Locally sourced artisan chocolate — a small indulgence that pairs surprisingly well with violin music and canyon air.</p>
        <span className="addon-badge optional">Available add-on</span>
      </div>
    </div>
  </div>
</section>

{/* ═══════════════════ WHAT TO EXPECT ═══════════════════ */}
<section className="expect-section">
  <div className="container">
    <span className="section-eyebrow">Good to know</span>
    <h2 className="section-title">Before you<br /><em>arrive.</em></h2>

    <div className="expect-grid">
      <div className="expect-block">
        <h3>What to wear</h3>
        <div className="expect-item"><div className="expect-dot"></div><p>Dress for the weather that day — Sedona can shift. Comfortable shoes for a short, easy walk.</p></div>
        <div className="expect-item"><div className="expect-dot"></div><p>If you're booking for midday or afternoon, bring sunglasses and a hat. The sun is serious out here.</p></div>
        <div className="expect-item"><div className="expect-dot"></div><p>Sunset bookings are the most comfortable — warm air, golden light, and the canyon turns every shade of orange and red.</p></div>
        <div className="expect-item"><div className="expect-dot"></div><p>Layers are smart in spring and fall. Mornings in the canyon can be cool even when the afternoon is warm.</p></div>
      </div>
      <div className="expect-block">
        <h3>What to expect</h3>
        <div className="expect-item"><div className="expect-dot"></div><p>The entire experience runs about 75 minutes — walk, concert, and back to your car.</p></div>
        <div className="expect-item"><div className="expect-dot"></div><p>No prior experience with classical music required. Tyler plays what the moment calls for.</p></div>
        <div className="expect-item"><div className="expect-dot"></div><p>These are public lands — occasionally there are other people nearby. Tyler knows how to find the quiet.</p></div>
        <div className="expect-item"><div className="expect-dot"></div><p>Most guests say very little during the concert. Something about the combination of the music and the space makes everyone go quiet in the best way.</p></div>
      </div>
    </div>
  </div>
</section>

{/* ═══════════════════ FAQ ═══════════════════ */}
<section className="faq-section">
  <div className="container">
    <span className="section-eyebrow">Questions</span>
    <h2 className="section-title">Everything you<br /><em>want to know.</em></h2>

    <div className="faq-list">
      <div className="faq-item">
        <p className="faq-q">How far do we have to walk?</p>
        <p className="faq-a">About 5 minutes from the parking area to the concert location. It's an easy, flat trail — no hiking experience needed. If anyone in your group has mobility concerns, Tyler will take you to Cultural Park, which is even more accessible.</p>
      </div>
      <div className="faq-item">
        <p className="faq-q">How many people can come?</p>
        <p className="faq-a">The Red Rock Nature Concert is designed for intimate groups — 2 to 6 people. This is what keeps it personal. For larger groups of 8 or more, ask about Private Group Events.</p>
      </div>
      <div className="faq-item">
        <p className="faq-q">What kind of music does Tyler play?</p>
        <p className="faq-a">Tyler's style blends classical training with original composition and improvisation. He plays what the moment calls for — sometimes orchestral, sometimes melodic and personal, always connected to the landscape around you.</p>
      </div>
      <div className="faq-item">
        <p className="faq-q">What's the best time of day to book?</p>
        <p className="faq-a">Every time of day in Sedona offers something different depending on the season and your comfort preferences. Sunset is always a favorite for its dramatic light and cooler temperatures, while mornings are peaceful, vibrant, and less crowded. Midday experiences can also be beautiful — especially during cooler months — just be sure to bring appropriate clothing, hats, and water for the desert climate.</p>
      </div>
      <div className="faq-item">
        <p className="faq-q">Can we bring alcohol or champagne?</p>
        <p className="faq-a">Alcohol isn't permitted at the public canyon locations — but if you book a Custom Location (your hotel, villa, or Airbnb), you're absolutely welcome to include champagne, cocktails, or anything else you'd like.</p>
      </div>
      <div className="faq-item">
        <p className="faq-q">Can we pick a specific location?</p>
        <p className="faq-a">Tyler will choose the best spot for your group size and mobility. But if you have a specific place in mind — even your own property — a Custom Location booking puts you in control. Contact Tyler to discuss.</p>
      </div>
      <div className="faq-item">
        <p className="faq-q">Is this good for a proposal?</p>
        <p className="faq-a">There is almost no better setting on earth for a proposal than a private violin concert among Sedona's red cliffs at sunset. Tyler has done this. Book early and let him know — he'll help you set it up perfectly.</p>
      </div>
    </div>
  </div>
</section>

{/* ═══════════════════ BOOKING FORM ═══════════════════ */}
<section className="booking-section" id="book">
  <div className="container" style={{ textAlign: "center" }}>
    <span className="section-eyebrow">Reserve Your Experience</span>
    <h2 className="section-title">Choose your experience.<br /><em>We'll handle the rest.</em></h2>
    <p className="section-lead" style={{ margin: "0 auto" }}>Select your experience below and the price calculates instantly. Tyler personally confirms every booking within 24 hours. Dates fill fast — especially at sunset.</p>

    <div style={{ marginTop: 56 }}>
      <BookingForm showId="sedona-serenades" />
    </div>
  </div>
</section>

{/* ═══════════════════ FOOTER ═══════════════════ */}
<footer className="page-footer">
  <img src="/images/experience/packages-hero.png" alt="Fiddler on the Rock" className="footer-logo" />
  <p className="footer-text">Tyler Carson · Sedona, Arizona · Red Rock Nature Concert</p>
  <a href="https://fiddleontherock.com" className="footer-link">fiddleontherock.com</a>
</footer>









      {/* React Interactive Sticky Bar */}
      <div className={`sticky-bar ${stickyVisible ? "visible" : ""}`}>
        <p className="sticky-text">A private violin concert in <span>the Sedona Red Rocks</span></p>
        <a href="#book" className="sticky-cta" onClick={(e) => handleSmoothScroll(e, "book")}>Reserve Now</a>
      </div>
    </div>
  );
}

# Fiddler on the Rock — Website PRD
## Product Requirements Document · v1.0

> This document is the hand-off brief for Podcode / Cursor / any AI coding agent.
> Read DESIGN_SYSTEM.md and CLAUDE.md first. This file covers WHAT to build and WHY.

---

## Project Overview

**Client:** Tyler Carson · Fiddler on the Rock  
**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind v4 · Framer Motion 11  
**Repo:** `https://github.com/Akumasyn/fiddlerontherock.git`  
**Deploy:** Vercel → `fiddlerontherock.com`  
**CMS (future):** GoHighLevel  
**Design:** See `DESIGN_SYSTEM.md` for all tokens, fonts, colors, motion specs

---

## Goals

1. Replace the existing Wix site with a premium, motion-forward Next.js site
2. Establish Tyler Carson as a world-class, sought-after experience provider
3. Drive bookings via GoHighLevel CRM integration
4. Create content that lives on the site and does NOT redirect to YouTube
5. Demonstrate the value of Sedona + world-class violin as a category of one

---

## Pages

### 1. Home (`/`)
**Status:** Components built, needs video integration + micro-motion polish

Sections in order:
- `<Nav>` — fixed, glass-on-scroll
- `<Hero>` — full viewport, parallax bg video loop, staggered headline reveal
- `<CBSSection>` — 2-column: CBS feature left, Lindsey Stirling quote right
- `<ExperienceCards>` — 3 cards: Serenades, Red Rock Experience, Corporate/Events
- `<Testimonials>` — AnimatePresence carousel, 4–6 reviews
- `<EmailSignup>` — inline form → GoHighLevel list
- `<Footer>` — 3-column: brand / experiences / connect

**Hero video:** Background loop, autoPlay muted loop playsInline. See Video Strategy below.

---

### 2. Experiences (`/experiences`)
**Status:** Existing HTML page (`experience_v01.html`) — needs Next.js port

Sections:
- `<PageHero>` — section hero with parallax, "The Experiences" headline
- `<ExperienceDetail id="red-rock">` — full-width feature: description, pricing, gallery, book CTA
- `<ExperienceDetail id="serenade">` — same pattern
- `<ExperienceDetail id="corporate">` — same pattern
- `<ReviewGrid>` — Google + TripAdvisor reviews (verified badges, color-coded borders)
- `<PhotoGallery>` — Masonry or CSS Grid gallery, lightbox on click
- `<BookingCTA>` — GoHighLevel booking widget embed

---

### 3. Serenades (`/serenades`)
**Status:** Existing HTML page (`serenades_v02.html`) — needs Next.js port

Sections:
- `<PageHero>` — "Sedona Serenades" headline, romantic atmosphere
- `<HowItWorks>` — 3-step visual process (Choose, Customize, Experience)
- `<SerenadeTiers>` — pricing tiers (Sunrise / Sunset / Full Experience)
- `<VideoShowcase>` — custom facade player showing serenade clips
- `<ReviewHighlights>` — curated TripAdvisor reviews
- `<BookingCTA>` — GoHighLevel integration

---

### 4. Press / EPK (`/press`)
**Status:** Existing EPK pages — needs Next.js port + content

Sections:
- `<EPKHero>` — Tyler portrait, name, tagline
- `<PressFeatures>` — CBS, media logos, pull quotes
- `<BiographySection>` — short and long bio (toggle)
- `<TechRider>` — downloadable PDF link
- `<PressPhotos>` — downloadable hi-res pack
- `<ContactForm>` — press inquiry → GoHighLevel

---

### 5. About (`/about`) — NEW
**Status:** Not yet built

Sections:
- `<StoryHero>` — Tyler full-width portrait + origin story
- `<Timeline>` — key milestones (training, move to Sedona, CBS, growth)
- `<PhilosophySection>` — "Why Sedona" / why live music outdoors matters
- `<VideoFacade>` — Tyler's story video (YouTube facade, no redirect)
- `<CallToAction>` — Book an experience

---

### 6. Contact / Book (`/contact`)
**Status:** Not yet built

Sections:
- `<BookingHero>` — minimal, elegant
- `<ExperiencePicker>` — select which experience (cards, radio-style)
- `<GoHighLevelEmbed>` — GHL booking calendar/form widget
- `<FAQAccordion>` — 6–8 common questions with AnimatePresence expand/collapse

---

## Component Inventory

### Built (needs motion polish)
| Component | File | Notes |
|---|---|---|
| Nav | `Nav.tsx` | Glass scroll state ✓ mobile menu ✓ |
| Hero | `Hero.tsx` | Needs real background video |
| CBSSection | `CBSSection.tsx` | Complete |
| ExperienceCards | `ExperienceCards.tsx` | Complete |
| Testimonials | `Testimonials.tsx` | Complete |
| EmailSignup | `EmailSignup.tsx` | Needs GHL endpoint |
| Footer | `Footer.tsx` | Complete |

### To Build
| Component | Priority | Notes |
|---|---|---|
| `HeroVideo.tsx` | P0 | MUX/Cloudinary background loop wrapper |
| `VideoFacade.tsx` | P0 | YouTube facade — thumbnail → lightbox |
| `PageHero.tsx` | P1 | Reusable interior page hero |
| `ExperienceDetail.tsx` | P1 | Full-width experience section |
| `ReviewGrid.tsx` | P1 | Google + TripAdvisor, color-coded |
| `PhotoGallery.tsx` | P1 | CSS Grid + lightbox |
| `BookingCTA.tsx` | P1 | GoHighLevel widget wrapper |
| `VideoShowcase.tsx` | P2 | Multi-video facade section |
| `FAQAccordion.tsx` | P2 | AnimatePresence expand/collapse |
| `Timeline.tsx` | P2 | About page milestones |
| `SerenadeTiers.tsx` | P2 | Pricing cards |
| `HowItWorks.tsx` | P2 | 3-step visual |
| `EPKHero.tsx` | P3 | Press page hero |
| `PressPhotos.tsx` | P3 | Press kit downloads |

---

## Video Strategy

### Hero Background Loops

**Purpose:** Full-viewport autoplay loops behind hero headlines — creates cinematic atmosphere, no sound.

**Provider options (choose one):**
- **MUX** (recommended): `npm install @mux/mux-video` · Adaptive bitrate · Global CDN · Analytics built-in
  - Playback ID goes into `data-playback-id` on `<mux-video>` element
  - Cost: ~$0.015/GB storage, $0.01/GB delivery
- **Cloudinary**: `cl_video` with transformation `q_auto:low,f_webm` for loops
  - Simpler setup, already image CDN if you have an account

**Implementation pattern:**
```tsx
// HeroVideo.tsx
<div className="absolute inset-0 overflow-hidden">
  <video
    autoPlay muted loop playsInline preload="metadata"
    className="w-full h-full object-cover"
    poster="/images/hero-poster.jpg"
  >
    <source src="[MUX_OR_CLOUDINARY_URL].webm" type="video/webm" />
    <source src="[MUX_OR_CLOUDINARY_URL].mp4" type="video/mp4" />
  </video>
  <div className="absolute inset-0 bg-ink/55" /> {/* overlay */}
</div>
```

**Video assets needed for hero loops:**
| Slot | Description | Source | Status |
|---|---|---|---|
| Home hero | Tyler performing at Red Rock, aerial or wide | Current Wix site or reshoot | NEEDED |
| Experiences hero | Sunset performance, intimate | Current Wix site | NEEDED |
| Serenades hero | Couple + Tyler, golden hour | Current Wix site | NEEDED |
| About hero | Tyler portrait/walkthrough, cinematic | Reshoot recommended | NEEDED |

**To download from Wix:** Open Wix site → Media Manager → download all videos. Save in `/public/video/` with descriptive names.

---

### Content Videos (YouTube Facade Player)

**Purpose:** Show longer-form content (CBS segment, Lindsey Stirling reaction, experience highlights) without ever redirecting users to YouTube. Keeps engagement on-site.

**Rule:** Never use `<iframe src="https://www.youtube.com/...">` directly in the page. Always use the facade pattern.

**Implementation:**
```tsx
// VideoFacade.tsx
// 1. Show thumbnail (YouTube maxresdefault or custom poster)
// 2. On click: AnimatePresence mounts overlay
// 3. Overlay contains <iframe> with ?autoplay=1&rel=0&modestbranding=1
// 4. Close on Escape keydown or click outside iframe

interface VideoFacadeProps {
  youtubeId: string
  title: string
  posterUrl?: string  // custom poster overrides YouTube thumbnail
}
```

**Videos needed (facade player):**
| Video | YouTube ID | Section | Priority |
|---|---|---|---|
| CBS News feature | `[TO BE CONFIRMED]` | CBSSection + Press | P0 |
| Tyler origin/story | `[TO BE CONFIRMED]` | About page | P1 |
| Red Rock experience highlight | `[TO BE CONFIRMED]` | Experiences | P1 |
| Serenade highlight reel | `[TO BE CONFIRMED]` | Serenades | P1 |
| Lindsey Stirling reaction | `[TO BE CONFIRMED]` | CBSSection / Home | P2 |

**Action item:** Tyler to provide YouTube video IDs or channel URL so IDs can be confirmed.

---

## Micro-Motion Specification

All motion is driven by **Framer Motion 11**. See `DESIGN_SYSTEM.md` section 4 for easing constants and variant definitions.

### Motion Hierarchy (priority order)
1. Hero parallax — most impactful, always on
2. Section stagger reveals — every section entrance
3. Card hover lifts — every card
4. Carousel transitions — AnimatePresence crossfade
5. Video facade — thumbnail hover scale + play pulse
6. Nav glass transition — scroll-triggered
7. Page transitions — route changes
8. FAQ accordion — height expand/collapse

### Shared Motion Library
Create `src/lib/motion.ts` with:
- `fadeUp` variant
- `staggerContainer` variant
- `easeSilk` and `easeExpo` constants
- `slideInLeft` / `slideInRight` for 2-column sections
- `scaleIn` for modal/overlay entrances
- `cardHover` for whileHover

### Performance Rules
- Use `will-change: transform` only on actively animating elements
- `viewport={{ once: true }}` on all whileInView — no re-trigger
- Lazy load video — `preload="metadata"` not `preload="auto"`
- Use CSS transitions for color/opacity changes; Framer Motion for transforms only

---

## GoHighLevel CMS Integration

**Status:** Planned — implement after core site is live.

### Integration Points
| Component | GHL Hook | Type |
|---|---|---|
| `EmailSignup.tsx` | GHL contact form API | POST to GHL webhook |
| `BookingCTA.tsx` | GHL calendar embed | `<iframe>` or GHL JS widget |
| `/contact` page | GHL booking form | GHL hosted form embed |
| Blog/content | GHL blog (optional) | CMS API or iframe |

### Email Signup Implementation (Phase 1)
Replace placeholder endpoint in `EmailSignup.tsx`:
```tsx
const response = await fetch('https://services.leadconnectorhq.com/hooks/[WEBHOOK_ID]/webhook-trigger/[TRIGGER_ID]', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, source: 'website_signup' })
})
```

---

## SEO & Metadata

Each page needs:
```tsx
export const metadata: Metadata = {
  title: 'Page Title | Fiddler on the Rock',
  description: '...',
  openGraph: {
    images: [{ url: '/images/og/page-name.jpg', width: 1200, height: 630 }]
  }
}
```

- OG images: 1200×630, dark bg with gold typography — create for each page
- `sitemap.ts` — generate dynamic sitemap for Vercel
- `robots.ts` — standard allow-all
- Structured data: `LocalBusiness` + `MusicEvent` schema on experience pages

---

## Deployment & Git Workflow

```bash
# Branch strategy
main          → auto-deploys to fiddlerontherock.com (Vercel)
dev           → preview deployments
feature/*     → individual component work

# Before pushing (Windows)
del .git\index.lock    # if lock file exists
git add [specific files]
git commit -m "feat: ..."
git push origin main
```

**Vercel project:** `fiddler-on-the-rock.vercel.app`  
**Environment variables needed in Vercel dashboard:**
- `NEXT_PUBLIC_GHL_WEBHOOK` — GoHighLevel webhook URL
- `NEXT_PUBLIC_MUX_ENV_KEY` — MUX environment key (when added)

---

## Phase Roadmap

### Phase 1 — Core Launch (current)
- [x] Next.js scaffold with design system
- [x] Home page components
- [ ] Hero background video (MUX or Cloudinary)
- [ ] VideoFacade component (YouTube facade)
- [ ] GoHighLevel email signup endpoint
- [ ] SEO metadata on all pages
- [ ] Deploy to fiddlerontherock.com

### Phase 2 — Full Site
- [ ] Experiences page (port from HTML)
- [ ] Serenades page (port from HTML)
- [ ] Press/EPK page (port from HTML)
- [ ] About page (new)
- [ ] Contact/Book page (new)
- [ ] Photo gallery + lightbox

### Phase 3 — CMS & Optimization
- [ ] GoHighLevel booking calendar embed
- [ ] Blog/content from GHL CMS
- [ ] OG image generation (Next.js `ImageResponse`)
- [ ] Performance audit (Lighthouse 90+)
- [ ] Analytics (Vercel Analytics or Plausible)

---

*Generated by Identity Override · May 2025 · For hand-off to Podcode / Cursor*

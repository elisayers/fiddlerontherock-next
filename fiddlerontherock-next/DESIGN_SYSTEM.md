# Fiddler on the Rock — Design System
## Source of Truth · v1.0

> Feed this file directly into Anti-Gravity, Cursor, or any AI coding tool as the single source of truth for all visual decisions. Every token defined here maps 1:1 to the `@theme` block in `src/app/globals.css`.

---

## 1. Color Palette

| Token | Hex | CSS Variable | Usage |
|---|---|---|---|
| Ink | `#0B0D12` | `--color-ink` | Page background, primary dark surface |
| Ink Soft | `#13161E` | `--color-ink-soft` | Card backgrounds, secondary surfaces |
| Ink Mid | `#1E2230` | `--color-ink-mid` | Hover states, subtle overlays |
| Gold | `#C8A96E` | `--color-gold` | Primary accent, CTAs, eyebrows, borders |
| Gold Light | `#E0C98A` | `--color-gold-light` | Hover state for gold elements |
| Cream | `#F5F0E8` | `--color-cream` | Primary text on dark backgrounds |
| Cream Soft | `rgba(245,240,232,0.65)` | `--color-cream-soft` | Body copy, secondary text |
| Muted | `#8a8fa8` | `--color-muted` | Captions, metadata, nav links |

### Color Semantics
- **Never** use white (`#ffffff`) — use Cream instead
- **Never** use black (`#000000`) — use Ink instead
- Gold is the only warm accent; do not introduce red, orange, or other warm tones
- Dark overlays use `rgba(11,13,18,0.85)` (Ink at 85% opacity) for video overlays/modals
- Gold borders: `rgba(200,169,110,0.15)` resting, `rgba(200,169,110,0.35)` active/featured

---

## 2. Typography

### Font Families

| Role | Family | CSS Variable | Usage |
|---|---|---|---|
| Display / Serif | `Cormorant Garamond` | `--font-cormorant` | H1, H2, pull quotes, hero headlines, italic accents |
| Body / UI | `DM Sans` | `--font-dm-sans` | Body copy, nav, buttons, captions, forms |
| Mono / Eyebrow | `Space Mono` | `--font-space-mono` | Section eyebrows, labels, tracking-heavy small caps |

### Font Loading
```html
<!-- In <head> of layout.tsx — use link tag, NOT next/font/google -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=Space+Mono:wght@400;700&display=swap" />
```

### Type Scale

| Level | Font | Size | Weight | Letter Spacing | Color |
|---|---|---|---|---|---|
| Hero H1 | Cormorant | `clamp(48px, 7vw, 96px)` | 300 | normal | Cream |
| Section H2 | Cormorant | `clamp(32px, 4vw, 56px)` | 300 | normal | Cream |
| Card H3 | Cormorant | `20px–24px` | 400 | normal | Cream |
| Eyebrow | Space Mono | `10px–11px` | 400 | `0.3em` | Gold |
| Body | DM Sans | `15px–16px` | 300 | `0.01em` | Cream Soft |
| Caption / Meta | DM Sans | `12px–13px` | 400 | `0.02em` | Muted |
| Button / Nav | DM Sans | `11px` | 500 | `0.12em–0.18em` | (context) |
| Quote / Pull | Cormorant italic | `20px–28px` | 300 | normal | Cream |

### Typography Rules
- Cormorant italic in Gold = the brand's signature moment (CBS headline, hero accents)
- DM Sans weight 300 for body; weight 500 for UI labels and buttons only
- Space Mono **only** for eyebrows — never for body copy
- All-caps + letter-spacing applies only to Space Mono and DM Sans UI labels, never to Cormorant
- Line height: `1.1` for display, `1.4` for subheads, `1.7` for body, `1.5` for pull quotes

---

## 3. Spacing & Layout

### Base Unit
`4px` — all spacing is a multiple of 4.

### Common Values
| Token | Value | Usage |
|---|---|---|
| `xs` | `4px` | Icon gaps, tight inline spacing |
| `sm` | `8px` | Internal component padding |
| `md` | `16px` | Standard gap |
| `lg` | `24px` | Card padding, section sub-gaps |
| `xl` | `40px` | Section horizontal padding |
| `2xl` | `64px` | Section vertical padding |
| `3xl` | `96px` | Hero vertical padding |

### Grid System
- Max content width: `1200px`
- Mobile breakpoint: `768px`
- Tablet: `1024px`
- 3-column card grid: `repeat(auto-fit, minmax(280px, 1fr))`
- 2-column section layout: `grid-template-columns: 1fr 1fr` with `gap: clamp(32px, 5vw, 64px)`

### Nav Height
- Desktop: `72px`
- Mobile: `60px`
- `position: fixed; top: 0; z-index: 50`
- Scroll-glass state: `background: rgba(11,13,18,0.92); backdrop-filter: blur(12px)`

---

## 4. Motion System (Framer Motion)

### Easing Curves

| Name | Value | Usage |
|---|---|---|
| `easesilk` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | Fade-ups, standard reveals |
| `easeexpo` | `cubic-bezier(0.76, 0, 0.24, 1)` | Nav slide, modal open, dramatic entrances |

```js
// In Framer Motion variants
const easeSilk = [0.25, 0.46, 0.45, 0.94]
const easeExpo = [0.76, 0, 0.24, 1]
```

### Core Animation Variants

```js
// Standard fade-up (use on section content)
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeSilk } }
}

// Stagger container (wraps multiple fadeUp children)
export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
}

// Hero parallax (useScroll + useTransform)
// scrollY mapped to y: [0, -60] on background layer
// scrollY mapped to opacity: [0, 0.4] on overlay

// Card hover lift
whileHover={{ y: -4, transition: { duration: 0.25, ease: easeSilk } }}

// Scroll-triggered section reveal
// Use: <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
```

### Micro-Motion Rules (MicroMotion Standard)
1. **Every hero section** gets a parallax background (useScroll + useTransform)
2. **Every section reveal** uses staggered fadeUp via `whileInView`
3. **Every card** has a `whileHover` lift of `y: -4`
4. **Testimonial carousel** uses `AnimatePresence` with crossfade (opacity 0→1, duration 0.5s)
5. **Nav** scrolls into glass mode with a `transition: { duration: 0.3 }` on background/blur
6. **Animated pill dots** in carousel: width animates `8px → 28px` on active
7. **Button hover**: subtle scale `1 → 1.02` plus color shift; no jump
8. **Page transitions**: `AnimatePresence` mode="wait" with 0.3s fade between routes
9. **Scroll indicator**: bounce animation in hero, `animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}`
10. **Video facade**: thumbnail scale on hover `1 → 1.04`, play button pulse `scale: [1, 1.08, 1]`

### What NOT to animate
- Do not animate layout shifts (height/width changes)
- Do not use spring physics on text — only on spatial transforms
- Keep `duration` under `0.9s` for any UI feedback
- `once: true` on all `whileInView` — no repeat on scroll-back

---

## 5. Component Patterns

### Button Variants

```tsx
// Primary (Gold fill)
className="bg-gold text-ink text-[11px] tracking-[0.15em] uppercase px-7 py-3.5 font-medium 
           hover:bg-gold-light transition-colors duration-300"

// Ghost (Gold border)
className="border border-gold/40 text-gold text-[11px] tracking-[0.15em] uppercase px-7 py-3.5
           hover:border-gold/70 hover:bg-gold/5 transition-all duration-300"

// Text link
className="text-gold text-[10px] tracking-[0.15em] uppercase hover:text-gold-light transition-colors"
```

### Card Pattern

```tsx
// Standard card
className="bg-ink-soft border border-gold/10 p-7 hover:-translate-y-1 transition-transform duration-300"

// Featured card (top gold bar + stronger border)
className="bg-ink-soft border border-gold/35 p-7 relative"
// Gold accent bar: absolute top-0 left-0 right-0 h-[3px] bg-gold
```

### Section Eyebrow

```tsx
<p className="font-mono text-[10px] tracking-[0.3em] text-gold uppercase mb-3">
  Section Label
</p>
```

### Gold Left-Border Quote

```tsx
<blockquote className="border-l-2 border-gold pl-6">
  <p className="font-serif text-xl italic text-cream leading-relaxed">"Quote text"</p>
  <cite className="text-[11px] tracking-[0.12em] text-muted uppercase not-italic mt-3 block">
    — Attribution
  </cite>
</blockquote>
```

---

## 6. Video Strategy

### Hero Background Loops (MUX or Cloudinary)
- Format: WebM (primary) + MP4 (fallback)
- Max bitrate: 2–4 Mbps for WebM, 3–5 Mbps for MP4
- Resolution: 1920×1080 minimum, 4K source preferred
- Duration: 15–30 second seamless loop
- Treatment: `mix-blend-mode: multiply` or dark overlay `rgba(11,13,18,0.55)` on top
- Attributes: `autoPlay muted loop playsInline preload="metadata"`
- MUX: use `@mux/mux-video` npm package or MUX Uploader
- Cloudinary: use `cl_video` transformations with `q_auto:low` for loops

### Embedded Content Player (YouTube Facade)
- Never link out to `youtube.com` or embed standard `<iframe src="youtube.com">`
- Pattern: show static thumbnail → user clicks → inline lightbox/modal plays video
- Thumbnail: use `https://img.youtube.com/vi/{VIDEO_ID}/maxresdefault.jpg`
- On click: overlay mounts via `AnimatePresence`, contains `<iframe>` with `?autoplay=1&rel=0&modestbranding=1`
- Overlay: full-screen `fixed` div, `bg-ink/90 backdrop-blur-sm`, close on Escape or click outside
- Play button: animated pulse, Framer Motion `scale: [1, 1.08, 1] transition: repeat Infinity`

---

## 7. Tailwind v4 Notes

This project uses **Tailwind v4** — no `tailwind.config.ts`.

- All tokens live in `src/app/globals.css` inside the `@theme {}` block
- PostCSS plugin is `@tailwindcss/postcss` (not `tailwindcss` in postcss.config)
- Custom classes reference tokens as `text-gold`, `bg-ink`, `border-gold/40` etc.
- Do **not** create a `tailwind.config.ts` — it's unused and confusing in v4
- `@layer utilities` is available for one-off helpers if needed

---

## 8. File Conventions

```
src/
  app/
    globals.css          ← ALL design tokens (@theme block)
    layout.tsx           ← Google Fonts link tag here
    page.tsx             ← Section assembly only
  components/
    Nav.tsx              ← Fixed nav, glass scroll state
    Hero.tsx             ← Parallax + stagger + scroll indicator
    CBSSection.tsx       ← 2-col grid, gold italic headline, quote
    ExperienceCards.tsx  ← 3-col auto-fit, card hover lift
    Testimonials.tsx     ← AnimatePresence carousel
    EmailSignup.tsx      ← Inline form, GoHighLevel endpoint
    Footer.tsx           ← 3-col nav footer
    VideoFacade.tsx      ← (TO BUILD) YouTube facade player
    HeroVideo.tsx        ← (TO BUILD) MUX/Cloudinary background loop
  lib/
    data.ts              ← All content (CMS-ready — no hardcoded copy in components)
    motion.ts            ← Shared animation variants + easing constants
```

---

*Generated by Identity Override · May 2025 · Feed to Anti-Gravity / Cursor / Podcode*

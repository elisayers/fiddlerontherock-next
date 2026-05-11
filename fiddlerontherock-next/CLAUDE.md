# CLAUDE.md — Fiddler on the Rock · Agent Instructions

> This file is for AI coding agents (Cursor, Podcode, Claude Code, Copilot).
> Read this before touching any file in this repo.

---

## Project Identity

**What this is:** Premium Next.js website for Tyler Carson — a world-class violinist performing exclusively in Sedona, Arizona. The aesthetic is dark luxury, cinematic, emotionally elevated. Think high-end editorial meets desert mysticism.

**The vibe:** This is not a generic musician site. Every interaction should feel like discovering something rare. Motion is essential. Typography carries the brand. Nothing is generic.

**Production URL:** `fiddlerontherock.com`  
**Repo:** `https://github.com/Akumasyn/fiddlerontherock.git`  
**Vercel project:** `fiddler-on-the-rock.vercel.app`

---

## Stack — Exact Versions

```
Next.js     14.2.x  (App Router, src/ directory)
TypeScript  5.x
Tailwind    4.x     (NO tailwind.config.ts — @theme block in globals.css)
Framer Motion 11.x
React       18.x
Node        18+
```

**PostCSS config must use `@tailwindcss/postcss`** — not `tailwindcss`.

---

## Critical Rules — Read Before Writing Any Code

### 1. Design System is Law
- All colors, fonts, spacing, and motion values come from `DESIGN_SYSTEM.md`
- All color tokens are already in `src/app/globals.css` `@theme` block
- Do NOT hardcode hex values — use CSS variables (`--color-gold`, `--color-ink`, etc.) or Tailwind classes (`text-gold`, `bg-ink`)
- Do NOT introduce new colors, fonts, or spacing that aren't in the design system

### 2. Tailwind v4 — Different from v3
- No `tailwind.config.ts` — it doesn't apply in v4
- Custom tokens are defined in `@theme {}` inside `globals.css`
- Use them as regular Tailwind classes: `bg-ink`, `text-gold`, `border-gold/40`
- Opacity modifiers work: `bg-gold/10`, `border-cream/30`

### 3. Google Fonts — Link Tag Only
- DO NOT use `next/font/google` — it fails in build environments without network
- Fonts are loaded via `<link>` tag in `src/app/layout.tsx` head
- DO NOT change this — it works on Vercel and in the browser correctly

### 4. Motion — Always Use Framer Motion, Never CSS Alone
- Every section reveal: `whileInView` with `fadeUp` variant from `src/lib/motion.ts`
- Every card: `whileHover={{ y: -4 }}`
- Every route change: `AnimatePresence` mode="wait"
- Hero sections: `useScroll` + `useTransform` for parallax
- Carousels: `AnimatePresence` with crossfade
- Motion library lives in `src/lib/motion.ts` — import from there, don't re-define

### 5. No YouTube Embeds — Use VideoFacade
- Never `<iframe src="https://www.youtube.com/...">` directly in JSX
- Always wrap in `<VideoFacade youtubeId="..." title="..." />` component
- The facade shows a thumbnail, user clicks, lightbox opens inline
- This keeps users on the site and prevents YouTube's autoplay/recommends

### 6. Content Lives in `src/lib/data.ts`
- No hardcoded copy in components
- All text content (testimonials, experience descriptions, nav links, etc.) is in `data.ts`
- If you need new content arrays, add them to `data.ts`
- This makes the site CMS-ready (GoHighLevel integration later)

### 7. Component Architecture
- One component per file
- All components are in `src/components/`
- All components are `'use client'` if they use Framer Motion, hooks, or interactivity
- Server components: layout.tsx, page.tsx, and any purely static wrappers
- Props should be typed with TypeScript interfaces at the top of each file

---

## File Map

```
src/
  app/
    globals.css          ← DESIGN TOKENS HERE (not tailwind.config)
    layout.tsx           ← Google Fonts link tag, metadata
    page.tsx             ← Assembles section components, no logic
  components/
    Nav.tsx              ← Fixed nav, scroll glass, mobile hamburger→X
    Hero.tsx             ← Parallax, stagger, scroll indicator bounce
    CBSSection.tsx       ← 2-col: CBS headline (gold italic) + Lindsey quote
    ExperienceCards.tsx  ← 3-col grid, card hover lift, stagger reveal
    Testimonials.tsx     ← AnimatePresence quote carousel, pill dots
    EmailSignup.tsx      ← Inline form, GoHighLevel webhook endpoint
    Footer.tsx           ← 3-col nav footer
    VideoFacade.tsx      ← (TODO) YouTube facade player
    HeroVideo.tsx        ← (TODO) MUX/Cloudinary background loop
  lib/
    data.ts              ← All content — no copy in components
    motion.ts            ← Shared variants: fadeUp, staggerContainer, etc.
public/
  images/                ← tyler-hero.jpg, tyler-red-rock.jpg
  video/                 ← (TODO) hero loop videos
```

---

## Motion Library (`src/lib/motion.ts`)

If this file doesn't exist yet, create it with:

```ts
export const easeSilk = [0.25, 0.46, 0.45, 0.94] as const
export const easeExpo = [0.76, 0, 0.24, 1] as const

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeSilk } }
}

export const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeSilk } }
}

export const slideInRight = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: easeSilk } }
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeExpo } }
}
```

---

## Patterns to Use

### Section Reveal Pattern
```tsx
'use client'
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  <motion.h2 variants={fadeUp}>Heading</motion.h2>
  <motion.p variants={fadeUp}>Body text</motion.p>
</motion.div>
```

### Card with Hover Lift
```tsx
<motion.div
  className="bg-ink-soft border border-gold/10 p-7"
  whileHover={{ y: -4, transition: { duration: 0.25 } }}
>
  {/* card content */}
</motion.div>
```

### Hero Parallax
```tsx
'use client'
import { useScroll, useTransform, motion } from 'framer-motion'
import { useRef } from 'react'

const ref = useRef(null)
const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

<section ref={ref}>
  <motion.div style={{ y }} className="absolute inset-0">
    {/* background image or video */}
  </motion.div>
</section>
```

### Section Eyebrow
```tsx
<p className="font-mono text-[10px] tracking-[0.3em] text-gold uppercase mb-3">
  Label Text
</p>
```

---

## What NOT to Do

- Do NOT use `position: fixed` inside components (breaks Framer Motion AnimatePresence)
- Do NOT use `@apply` in components — write Tailwind classes inline
- Do NOT import from `next/font/google` — fonts use `<link>` tag
- Do NOT add a `tailwind.config.ts` or `tailwind.config.js` — unused in v4
- Do NOT hardcode any copy text in JSX — put it in `data.ts`
- Do NOT embed YouTube iframes directly — use VideoFacade component
- Do NOT use `<img>` tag — use Next.js `<Image>` from `next/image`
- Do NOT use `export default` for types/interfaces — use `export` inline
- Do NOT animate `height` or `width` with Framer Motion — use `scaleY` or `layout` prop instead
- Do NOT use `display: none` on mobile for sections — use responsive Tailwind classes

---

## TypeScript Conventions

```ts
// Props interface at top of each component file
interface NavProps {
  transparent?: boolean
}

// Data types in src/lib/data.ts
interface Experience {
  id: string
  title: string
  description: string
  price?: string
  href: string
}

// No `any` — use `unknown` and narrow types
// No `as` casts unless absolutely necessary
```

---

## Build & Deploy

```bash
# Dev
npm run dev

# Type check (use this to verify before pushing)
npx tsc --noEmit

# Build (requires real machine — sandbox has memory limits)
npm run build

# The lock file issue (Windows)
# If git fails with index.lock error, user must run:
del .git\index.lock
```

**Vercel deploys automatically on push to `main`.**  
Environment variables must be set in Vercel dashboard — not in `.env` files committed to git.

---

## Todo (Phase 1 — immediate)

- [ ] Create `src/lib/motion.ts` with shared variants
- [ ] Build `VideoFacade.tsx` component (YouTube facade pattern)
- [ ] Build `HeroVideo.tsx` component (MUX or Cloudinary video loop)
- [ ] Wire GoHighLevel webhook to `EmailSignup.tsx`
- [ ] Add `metadata` exports to every page
- [ ] Create `/public/video/` directory and add hero loop files

---

*Owner: Identity Override (Eli Sayers) · Client: Tyler Carson · Updated: May 2025*

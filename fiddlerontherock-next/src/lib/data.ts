// ── Fiddler on the Rock — Site Data ─────────────────────────────────────────
// Source of truth: WebsiteCopy_v3.docx + WebsiteCopy_v3_HomeCBS.docx
// CMS placeholder: swap these exports for GoHighLevel API calls later.
// ─────────────────────────────────────────────────────────────────────────────

// ── HOME PAGE ─────────────────────────────────────────────────────────────────

export const hero = {
  headline: "You've never heard anything like this.",
  subheadline:
    "Live violin. Sedona's red rock canyon. No stage, no amplification, no barrier between the music and the landscape.",
  ctaPrimary: { label: "See Upcoming Concerts", href: "/events" },
  ctaSecondary: { label: "Book a Private Experience", href: "/sedona-serenades" },
}

export const cbsSection = {
  eyebrow: "As Seen on CBS Mornings",
  headline: "As Seen on CBS Mornings",
  body:
    "CBS Mornings traveled to Sedona to cover Tyler's story — a violinist who lost his voice and discovered something more powerful. Watch the segment below.",
  quote: "That was so fun!! You are such a great player.",
  quoteAttribution: "Lindsey Stirling, CBS Mornings",
  ctaPrimary: { label: "Read Tyler's Full Story", href: "/about" },
  ctaSecondary: { label: "Watch the Full CBS Segment", href: "/cbs" },
  // YouTube video ID — confirm with Tyler and replace CBS_VIDEO_ID below
  youtubeId: "CBS_VIDEO_ID",
}

export const emailSignup = {
  headline: "Stay Connected",
  body:
    "Get first access to Thursday concert dates, behind-the-scenes from the red rocks, and music you won't hear anywhere else.",
  buttonLabel: "Join the List",
  // Wire to Kit/ConvertKit when email platform migration is complete
  // Placeholder: GoHighLevel webhook as interim
}

// ── EXPERIENCES ───────────────────────────────────────────────────────────────

export const experiences = [
  {
    id: "one-man-symphony",
    tag: "As Seen on CBS Mornings",
    title: "One Man Symphony",
    tagline: "Sedona's iconic Thursday evening concert — live violin in a setting you won't find anywhere else.",
    description:
      "Tyler performs against one of Sedona's most dramatic natural backdrops — a private red rock stage as the canyon light shifts to gold. His signature one-man-symphony weaves loop pedals and rare horn violin through Led Zeppelin, Disney, and Taylor Swift into something that sounds like an entire orchestra. Original compositions woven with personal stories of healing and triumph.",
    when: "Thursdays, 5:45 PM (doors open 5:00 PM)",
    pricing: [
      { label: "General Admission", price: "$55" },
      { label: "VIP", price: "$85" },
    ],
    bonus: "Free museum entry with every ticket — a $20-per-couple value.",
    ctas: [
      { label: "General Admission", href: "/one-man-symphony" },
      { label: "VIP Admission", href: "/one-man-symphony?tier=vip" },
    ],
    href: "/one-man-symphony",
    accent: false,
  },
  {
    id: "sedona-serenades",
    tag: "Exclusive Private Violin Experience",
    title: "Sedona Serenades",
    tagline:
      "For those who want to be inside the music — not watching it from a seat.",
    description:
      "A short hike into the red rocks brings you to your private concert location. Just you, your companions, and the canyon. I perform a full private concert as the canyon light shifts around you. My “Living Music” approach pulls you fully into the present — the sound of the violin meeting the silence of the red rocks. An hour that most Sedona visitors never know is possible.",
    why: "This is the most intimate experience I offer. Couples book this for proposals, anniversaries, and moments that deserve a soundtrack that belongs entirely to them.",
    when: "Scheduled around your visit — contact to arrange",
    pricing: [
      { label: "Starting at $499 for two", price: "" },
      { label: "$149 per additional adult", price: "" },
    ],
    locations: [
      {
        id: "secret-cave",
        name: "Secret Cave",
        description:
          "A 5-minute walk from parking into a natural canyon formation. Natural rock shelter, the sound of wind through the canyon, complete privacy. This is what people mean when they say Sedona changes you.",
        href: "/sedona-serenades?location=secret-cave",
      },
      {
        id: "cultural-park",
        name: "Cultural Park",
        description:
          "Flat, fully accessible terrain. No hiking required. Open red rock views with the same private, exclusive experience. Ideal for guests with mobility considerations or those who want to arrive and immediately be in the moment.",
        href: "/sedona-serenades?location=cultural-park",
      },
    ],
    ctas: [
      { label: "Secret Cave — Book This Location", href: "/sedona-serenades?location=secret-cave" },
      { label: "Cultural Park — Book This Location", href: "/sedona-serenades?location=cultural-park" },
    ],
    href: "/sedona-serenades",
    accent: true,
    voiceNote: "First person — Tyler speaking directly to the buyer",
  },
  {
    id: "legends-of-the-fiddle",
    tag: "As Seen on CBS Mornings",
    title: "Legends of the Fiddle",
    tagline:
      "Tyler's most immersive performance — cinematic scale, mythic storytelling, one violin.",
    description:
      "An immersive musical journey through the legends that shaped the violin across centuries — from Celtic fire to classical triumph to the devil going down to Georgia. This is the concert Tyler was born to play: soaring technique, mythic narratives, and the kind of moment where a single musician fills the entire room. Discover how the triumphs of musical legends mirror your own story.",
    where: "Sedona Dances Headquarters, West Sedona",
    when: "Saturdays, 6:45 PM (doors open 6:30 PM)",
    pricing: [
      { label: "General Admission", price: "$55" },
      { label: "VIP", price: "$85" },
    ],
    pullQuotes: [
      { quote: "Sheer brilliance.", context: "Debuted to a sold-out house at the Sedona International Film Festival" },
      {
        quote:
          "EXTRAORDINARY doesn't even begin to describe this multi-talented performer, composer, and musical genius.",
        attribution: "Patrick Schweiss, Executive Director, SIFF",
      },
    ],
    ctas: [
      { label: "General Admission", href: "/legends-of-the-fiddle" },
      { label: "VIP Admission", href: "/legends-of-the-fiddle?tier=vip" },
    ],
    href: "/legends-of-the-fiddle",
    accent: false,
  },
]

// ── HOME PAGE EXPERIENCE CARDS (short teasers) ────────────────────────────────
// These are the simplified card versions used on the home page only.
// Full copy is on each experience's destination page.

export const experienceCards = [
  {
    id: "one-man-symphony",
    tag: "Thursdays · Red Rock Canyon",
    title: "One Man Symphony",
    description:
      "Thursdays in the red rocks. Tyler's signature one-man-orchestra — loop pedals, rare horn violin, and a private canyon stage as Sedona does what Sedona does to the light.",
    cta: "See Thursday's Concert",
    href: "/one-man-symphony",
    accent: false,
  },
  {
    id: "sedona-serenades",
    tag: "Private · By Arrangement",
    title: "Sedona Serenades",
    description:
      "A private outdoor concert built entirely for your group. You hike in, Tyler plays, the canyon holds you. The most intimate experience in the Southwest.",
    cta: "Book a Private Experience",
    href: "/sedona-serenades",
    accent: true,
  },
  {
    id: "legends-of-the-fiddle",
    tag: "Saturdays · Sedona Dances HQ",
    title: "Legends of the Fiddle",
    description:
      "Tyler's most theatrical show. Saturday evenings at Sedona Dances HQ — cinematic, mythic, one violin filling the room.",
    cta: "See Saturday's Show",
    href: "/legends-of-the-fiddle",
    accent: false,
  },
]

// ── DECISION TREE (Experiences page) ─────────────────────────────────────────

export const decisionTree = [
  {
    prompt: "First time in Sedona?",
    recommendation: "One Man Symphony",
    body: "A private red rock stage at sunset, Tyler's full one-man-orchestra experience. This is the classic Sedona evening.",
  },
  {
    prompt: "Planning something unforgettable for someone you love?",
    recommendation: "Sedona Serenades",
    body: "A private concert in the red rocks, built entirely for the two of you. Proposals, anniversaries, or simply the kind of evening that becomes a story you tell for the rest of your lives.",
  },
  {
    prompt: "Ready for a full concert experience?",
    recommendation: "Legends of the Fiddle",
    body: "Tyler's most theatrical show — cinematic, mythic, and technically extraordinary. Saturday evenings at Sedona Dances HQ.",
  },
  {
    prompt: "Can't decide?",
    recommendation: null,
    body: "Many guests book all three. Each one is a completely different experience of Tyler's music. Together, they're the complete Sedona sound.",
  },
]

export const limitedSeating = {
  headline: "Limited Seating",
  left: "Every Tyler Carson experience is designed to stay intimate. One Man Symphony and Legends of the Fiddle hold small audiences by design. Sedona Serenades is private by definition. When dates fill, they fill. Sedona visitors who wait too long to decide are the ones who leave wishing they hadn't.",
  right: "Don't let your Sedona visit be just another tourist experience. Choose the musical adventure that makes your time here unforgettable.",
  cta: { label: "Book Your Experience Now", href: "/events" },
}

// ── TESTIMONIALS ──────────────────────────────────────────────────────────────
// Source: Wix slider — 10 reviews total.
// Karen's Austin TX Google 5-star review leads per Eli's direction.
// TODO: Pull remaining 8 verified reviews from the Wix slider and add below.

export const testimonials = [
  {
    // Lead slide — keep this first per Eli's instruction
    quote:
      "We flew in from Austin and this was, without question, the highlight of our entire trip. We've been to Sedona three times. Nothing comes close to this.",
    author: "Karen M.",
    context: "Google · ★★★★★ · Austin, TX",
  },
  {
    quote: "That was so fun!! You are such a great player.",
    author: "Lindsey Stirling",
    context: "CBS Mornings",
  },
  {
    quote:
      "The most magical thing I have ever witnessed. We were completely speechless. Our guests still talk about it months later.",
    author: "Sarah & Michael T.",
    context: "Private Wedding, Sedona",
  },
  {
    quote:
      "I've traveled the world for music and nothing has moved me like violin in the red rocks at sunrise. Book this. Don't think. Just book it.",
    author: "James R.",
    context: "Nature Concert Guest",
  },
  {
    quote:
      "Tyler proposed to me with violin echoing off the canyon walls. I said yes before he even finished the song.",
    author: "Priya K.",
    context: "Sedona Serenade",
  },
  // TODO: Add remaining verified reviews from Wix slider to reach 10 total
]

// ── PRESS ─────────────────────────────────────────────────────────────────────

export const pressItems = [
  {
    outlet: "CBS Mornings",
    blurb:
      "National television feature on Tyler's story — a violinist who lost his voice and discovered something more powerful, performing alongside Lindsey Stirling.",
    href: "/cbs",
  },
  {
    outlet: "Sedona International Film Festival",
    blurb:
      '"EXTRAORDINARY doesn\'t even begin to describe this multi-talented performer, composer, and musical genius." — Patrick Schweiss, Executive Director',
    href: "#",
  },
  {
    outlet: "Red Rock News",
    blurb:
      "Sedona's paper of record covers the man behind the music and what it means to play where the canyon listens.",
    href: "#",
  },
  {
    outlet: "Insight Timer",
    blurb:
      "Featured in the wellness community's largest platform as an artist whose music facilitates deep presence and healing.",
    href: "#",
  },
]

// ── CBS PAGE ──────────────────────────────────────────────────────────────────

export const cbsPage = {
  hero: {
    headline: "As Seen on CBS Mornings",
    subheadline:
      "CBS Mornings traveled to Sedona to cover Tyler Carson's story — a violinist who lost his voice and found something more powerful. The segment introduced a national audience to the red rocks, the music, and a message about resilience the network knew would resonate.",
  },
  // YouTube video ID — confirm with Tyler
  youtubeId: "CBS_VIDEO_ID",
  featuredQuote: {
    text: "That was so fun!! You are such a great player.",
    attribution: "Lindsey Stirling, on CBS Mornings after performing with Tyler Carson",
  },
  storySection: {
    headline: "What Brought CBS to Sedona",
    body: "The segment wasn't about a concert. It was about what happens when a musician loses the ability to speak — and discovers that the violin can do what the voice no longer can.\n\nCBS followed Tyler into the red rocks, into the canyon where he performs, and into the story of spasmodic dysphonia, recovery, and what music means when it becomes survival rather than career. The segment aired nationally and introduced millions of viewers to a story that had been unfolding quietly in the Sedona landscape for years.\n\nOn set that day, Tyler performed alongside Lindsey Stirling — one of the most recognized violinists in the world. Her reaction says more than any review could.",
  },
  ctas: [
    { label: "See All Experiences", href: "/experiences" },
    { label: "Read Tyler's Full Story", href: "/about" },
  ],
  seo: {
    title: "Tyler Carson on CBS Mornings | Fiddler on the Rock | Sedona",
    description:
      "Watch the CBS Mornings feature on Tyler Carson — the Sedona violinist who lost his voice and found it in the violin. Featuring Lindsey Stirling. As seen on national television.",
  },
}

// ── SEO (per page) ────────────────────────────────────────────────────────────

export const seo = {
  home: {
    title: "Live Violin Concerts in Sedona | Fiddler on the Rock",
    description:
      "Tyler Carson performs live outdoor violin concerts in Sedona's red rock landscape every Thursday and Saturday — and by private booking year-round. As seen on CBS Mornings.",
    ogImage: "/images/og/home.jpg",
  },
  experiences: {
    title: "Live Music Experiences in Sedona | Fiddler on the Rock",
    description:
      "Three live violin experiences in Sedona's red rock landscape. Thursday and Saturday concerts, plus private Sedona Serenades for couples. Book now.",
    ogImage: "/images/og/experiences.jpg",
  },
  cbs: {
    title: "Tyler Carson on CBS Mornings | Fiddler on the Rock | Sedona",
    description:
      "Watch the CBS Mornings feature on Tyler Carson — the Sedona violinist who lost his voice and found it in the violin. Featuring Lindsey Stirling.",
    ogImage: "/images/og/cbs.jpg",
  },
}

// ── NAV ───────────────────────────────────────────────────────────────────────

export const navLinks = [
  { label: "Concerts", href: "/events" },
  { label: "Serenades", href: "/sedona-serenades" },
  { label: "About", href: "/about" },
  { label: "Press", href: "/cbs" },
]

# Portfolio UI Redesign — Design Spec

**Date:** 2026-05-16  
**Author:** Nikul Goyani  
**Stack:** Next.js 13, TypeScript, Tailwind CSS, Framer Motion, react-icons

---

## Overview

A full UI rebuild of `portfolio-nextjs` from its current skeleton state (Navbar only) into a complete, production-quality single-page portfolio. The design uses a **dark neon aesthetic** with **violet accent** (`#a78bfa`), smooth **Framer Motion** scroll animations, and five content sections on one scrollable page.

---

## Design Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Theme | Dark (`#0f0f1a` bg) | Developer-culture aesthetic, stands out |
| Accent color | Violet `#a78bfa` | Ties into existing brand (#5651e5), sophisticated |
| Layout | Single page scroll | Simplest, most common for dev portfolios |
| Animations | Framer Motion | Professional scroll reveals, one dep, ~30kb |
| Email | EmailJS / Formspree | No backend required |

---

## Color Palette

```
Background primary:   #0f0f1a
Background alternate: #080810  (every other section)
Accent primary:       #a78bfa  (violet)
Accent glow:          rgba(167,139,250,0.12)
Text primary:         #f1f5f9
Text secondary:       #94a3b8
Text muted:           #475569
Border subtle:        #1e293b
Border accent:        rgba(167,139,250,0.15)
Status green:         #4ade80
```

---

## Architecture

```
portfolio-nextjs/
├── components/
│   ├── Navbar.tsx          # Fixed glassmorphism navbar
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Skills.tsx
│   │   ├── Projects.tsx
│   │   └── Contact.tsx
│   └── ui/
│       ├── SectionTag.tsx  # Reusable "// Label" section header
│       └── Footer.tsx
├── src/app/
│   ├── page.tsx            # Composes all sections
│   ├── layout.tsx
│   └── globals.css         # Updated dark theme base styles
└── public/assets/
    └── NG.jpg              # Existing photo (used in About)
```

### New dependency
```bash
npm install framer-motion
```

No other new dependencies. react-icons already installed.

---

## Section Specs

### 1. Navbar (`components/Navbar.tsx`)

**Current state:** Broken — mobile sidebar has no state, always visible. Image paths wrong.

**Redesign:**
- Fixed position, full width, `z-[100]`
- Background: `rgba(15,15,26,0.85)` with `backdrop-filter: blur(12px)`
- Bottom border: `1px solid rgba(167,139,250,0.12)`
- Logo: `N.` — bold, white, dot in violet
- Desktop nav links: Home · About · Skills · Projects · Contact — anchor links (`#about`, `#skills`, etc.), violet on active/hover
- Right: "Resume ↗" outlined button linking to PDF resume in `/public`
- Mobile: hamburger icon (react-icons `AiOutlineMenu`), slides in sidebar from left, close button, `useState` for open/close toggle
- Framer Motion: fade in from top on load (`y: -20 → 0, opacity: 0 → 1`)

**Fixes from current code:**
- Add `useState(false)` for mobile menu open state
- Fix image path: `/assets/NG.jpg` not `/../public/assets/NG.jpg`
- Remove always-open mobile sidebar

---

### 2. Hero (`components/sections/Hero.tsx`)

- Full viewport height (`min-h-screen`), centered content
- Background: `#0f0f1a` with subtle radial violet glow top-right
- Decorative dot grid (CSS, right side, opacity 0.25) — placeholder until photo added
- Content (left-aligned, max-width 600px):
  - Pill badge: `▸ Front-End Developer` (violet bg, rounded-full)
  - H1: `Hi, I'm` + line break + `Nikul Goyani` (white, 54px bold, "Nikul" in violet)
  - Subtitle: `Building fast, modern web experiences` (muted, 20px light weight)
  - Description paragraph: 2 sentences about tech focus (13px, muted)
  - CTAs: Primary `View Projects →` (violet filled) + Secondary `Download CV` (outlined)
  - Social pills row: GitHub · LinkedIn · Email (pill-shaped, muted, violet on hover)
- Framer Motion: `staggerChildren` — badge → name → subtitle → desc → CTAs → socials, each `y: 30 → 0, opacity: 0 → 1`

---

### 3. About (`components/sections/About.tsx`)

- Background: `#0f0f1a`, `id="about"`
- Two-column grid (`grid-cols-[1fr_1.3fr]`, gap 60px), stacks on mobile
- **Left column:**
  - Photo: `<Image src="/assets/NG.jpg">` in a violet-bordered rounded frame (220×280px)
  - "Available for work" badge (green pulse dot) — positioned bottom-right of photo
- **Right column:**
  - `SectionTag` → H2 `Passionate about great interfaces`
  - 2 short bio paragraphs (editable placeholder copy)
  - 3 stat cards grid (`Years exp. / Projects / Tech stack`) — violet numbers
  - "Download Resume ↗" outlined button
- Framer Motion: left col slides from left, right col slides from right, triggered by `whileInView`

---

### 4. Skills (`components/sections/Skills.tsx`)

- Background: `#080810`, `id="skills"`
- `SectionTag` → H2 `What I work with` → description para
- 3 category cards grid (`grid-cols-3`, stacks to 1 col on mobile):
  - **Frontend:** React, Next.js, TypeScript, JavaScript, HTML5, CSS3
  - **Styling:** Tailwind CSS, Framer Motion, Styled Components, SASS, Figma
  - **Tools & Other:** Git/GitHub, REST APIs, Node.js, Vercel, VS Code
  - Each card: violet category label + emoji icon + chip grid
  - Each chip: `[dot] TechName` — violet dot, border, hover glow
- "Also familiar with" row below: Redux, React Query, Firebase, MongoDB, PostgreSQL (muted badge style)
- Framer Motion: cards stagger up (`staggerChildren: 0.1`) on `whileInView`

---

### 5. Projects (`components/sections/Projects.tsx`)

- Background: `#0f0f1a`, `id="projects"`
- Section header row: H2 `Things I've built` (left) + `View All on GitHub ↗` button (right)
- **Featured project card** (2-col: preview left, info right):
  - Left: gradient bg with browser-chrome mockup — replace with `<Image>` screenshot
  - Right: `⭐ Featured Project` pill badge, title, 2–3 line description, tech tag row, Live Demo + GitHub buttons
- **3-column project grid** below (stacks to 1 col mobile):
  - Each card: gradient preview area, title, short description, tech stack tags
  - Hover: `translateY(-4px)` + violet border glow
- All project data as a typed `Project[]` array in the component (easy to edit)
- Framer Motion: featured card fades in, grid cards stagger up

---

### 6. Contact (`components/sections/Contact.tsx`)

- Background: `#080810`, `id="contact"`
- `SectionTag` → H2 `Let's work together` → sub-paragraph
- Two-column layout:
  - **Left:** 3 info cards (Email, Location, Status) + social button row (GitHub, LinkedIn, Twitter/X)
  - **Right:** Form — Name + Email (side by side), Subject, Message textarea, Send button
- Form submission: EmailJS (`@emailjs/browser`) — no backend. Sign up free at emailjs.com, add service/template IDs to `.env.local`. Show success/error state after submit.
- Input focus: violet border glow (`border-violet-500/50`)
- Footer inside section: `N.` logo + `© 2026 Nikul Goyani · Built with Next.js & Tailwind`
- Framer Motion: left col from left, right col from right on `whileInView`

---

### 7. Shared: `SectionTag` component

```tsx
// Reusable section label used in all 5 sections
// Renders: "// label ————"
const SectionTag = ({ children }: { children: string }) => (
  <div className="flex items-center gap-3 text-violet-400 text-xs tracking-widest uppercase mb-3">
    {children}
    <span className="flex-1 h-px bg-violet-400/20 max-w-[60px]" />
  </div>
)
```

---

## globals.css Changes

Replace current light-theme base styles with dark theme:

```css
@layer base {
  body {
    @apply bg-[#0f0f1a] text-slate-200 tracking-wide;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-bold;
  }
  h1 { @apply text-4xl sm:text-5xl md:text-6xl; }
  h2 { @apply text-3xl sm:text-4xl; }
  li { @apply cursor-pointer; }
  html { @apply scroll-smooth; }
}
```

---

## Responsive Breakpoints

| Section | Mobile | Tablet (md) | Desktop (lg+) |
|---|---|---|---|
| Navbar | hamburger sidebar | hamburger sidebar | full horizontal links |
| Hero | stacked, centered | stacked | left-aligned, dot grid right |
| About | stacked (photo top) | stacked | 2-col grid |
| Skills | 1-col cards | 2-col cards | 3-col cards |
| Projects | 1-col | featured + 2-col grid | featured + 3-col grid |
| Contact | stacked | stacked | 2-col |

---

## Known Issues Fixed

1. **Navbar mobile menu always open** — add `const [nav, setNav] = useState(false)` and conditionally render sidebar
2. **Wrong image path** — change `"/../public/assets/NG.jpg"` → `"/assets/NG.jpg"` everywhere
3. **All nav links point to `"/"`** — change to anchor links (`#about`, `#skills`, `#projects`, `#contact`)
4. **No page content** — all 5 sections built from scratch
5. **Meta description** — update from "Generated by create next app" to a real description

---

## Out of Scope

- Blog / writing section
- Dark/light mode toggle
- i18n / multi-language
- CMS integration
- Analytics
- Authentication / login (no login system exists or is planned)

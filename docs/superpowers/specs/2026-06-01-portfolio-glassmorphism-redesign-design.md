# Portfolio Glassmorphism Redesign — Design Spec

**Date:** 2026-06-01
**Approach:** Full Dark Glassmorphism (Approach 2)
**Status:** Approved

---

## Decisions Locked In

| Decision | Choice |
|---|---|
| Design style | Glassmorphism — frosted glass cards, `backdrop-filter: blur`, `rgba` backgrounds |
| Color mode | Dark-first (`#0a0a1a` base). Keep theme toggle but dark is the primary experience |
| Accent color | Violet — keep existing `#a78bfa` / `violet-400`. No color change needed |
| Hero layout | Two-column split: text left, frosted glass photo card right |
| New section | Experience Timeline — between About and Skills |
| Background | Layered radial gradient orbs (violet/purple) on deep dark base |

---

## Global Styles

### Background
```css
background:
  radial-gradient(ellipse at 20% 50%, rgba(109,40,217,0.12) 0%, transparent 60%),
  radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.10) 0%, transparent 50%),
  linear-gradient(160deg, #0a0a1a 0%, #0d0b1f 40%, #100d26 100%);
```
Two ambient blur orbs (`filter: blur(80px)`) positioned top-right and bottom-left on each major section.

### CSS Variables (update `globals.css`)
```css
.dark {
  --bg-primary: #0a0a1a;
  --bg-secondary: #0d0b1f;
  --navbar-bg: rgba(255,255,255,0.04);
  --glass-bg: rgba(255,255,255,0.04);
  --glass-border: rgba(255,255,255,0.08);
  --glass-border-accent: rgba(139,92,246,0.2);
  --border-subtle: rgba(255,255,255,0.05);
}
```

### Glassmorphism Utility Pattern
All cards follow this pattern:
```css
background: rgba(255,255,255,0.04);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border: 1px solid rgba(255,255,255,0.08);
border-radius: 16px–22px (varies by component);
```
Top-edge highlight:
```css
::before { background: linear-gradient(to right, transparent, rgba(167,139,250,0.3), transparent); height: 1px; }
```

### Section Tag Component (`SectionTag.tsx`)
Update to match new style:
- `background: rgba(139,92,246,0.1)`
- `border: 1px solid rgba(139,92,246,0.2)`
- `border-radius: 6px`
- Prefix `◈` icon

---

## Navbar

**Structure:** Full-width floating pill — wraps all nav content in a single glass container.

```
[N.]   [Home · About · Experience · Skills · Projects · Contact]   [☀ | Resume ↗]
```

- Container: `background: rgba(255,255,255,0.04)`, `backdrop-filter: blur(20px)`, `border-radius: 16px`, `border: 1px solid rgba(255,255,255,0.08)`
- Outer wrapper: `padding: 16px 48px` (creates floating gap from page edges)
- Logo: `N.` where `.` is `text-violet-400`
- Nav links: `text-xs uppercase tracking-widest text-white/45 hover:text-violet-400`
- Add **"Experience"** link pointing to `#experience`
- Theme toggle: small 32×32 glass button
- Resume button: violet outline pill `border: 1px solid rgba(167,139,250,0.35)`

---

## Hero Section

**Layout:** CSS Grid `grid-template-columns: 1fr auto`, gap 60px, vertically centered.

### Left column
1. **Badge pill** — `rgba(139,92,246,0.12)` bg, `border-radius: 100px`, text: `▸ V&V Expert · Software Test Engineer`
2. **H1** — 64px / `font-weight: 900` / `letter-spacing: -2px`. `Hi, I'm` white, `Nikul` violet-400, `kumar Goyani` white
3. **Subtitle** — 16px light weight, `text-white/50`. Bold words use `text-white/75`
4. **Description** — 13px, `text-white/35`, max-width 440px
5. **CTA row** — Primary: `bg: linear-gradient(135deg, #7c3aed, #6d28d9)` + glow shadow. Secondary: glass outline
6. **Social pills** — GitHub, LinkedIn, Email as rounded pills with `border: 1px solid rgba(255,255,255,0.08)`

### Right column — Photo card
- **Ambient glow** — `position: absolute`, `radial-gradient(rgba(139,92,246,0.2), transparent)`, `filter: blur(60px)`
- **Photo card** — 220×290px, `backdrop-filter: blur(16px)`, `border-radius: 24px`, image `object-cover`. Gradient overlay `linear-gradient(to bottom, transparent 50%, rgba(109,40,217,0.3) 100%)`
- **"Available" badge** — absolutely positioned `bottom: -14px, left: 50%, translateX(-50%)`. Glass bg, green dot with `box-shadow: 0 0 8px #22c55e`, violet text
- **Floating stat card** — `position: absolute, top: 20px, left: -50px`. Shows `6+` / `Years exp.` in a small glass card. Hidden on mobile (`hidden lg:block`) to avoid overflow.

---

## About Section

**Layout:** CSS Grid `grid-template-columns: auto 1fr`, gap 64px.

### Left — Photo
- 200×260px glass card (`border-radius: 20px`), same frosted treatment as hero but smaller
- Bottom-right corner badge: "Available for work" with green dot
- Bottom gradient overlay on photo

### Right — Content
- SectionTag → H2 (`Passionate about software quality`) → 2 paragraphs
- **Stats row** — 3 equal glass cards (`border-radius: 14px`), each with top-highlight `::before`. Values: `6+`, `9+`, `ISTQB`
- **Resume link** — glass outline button, violet text, `↗` arrow

---

## Experience Section *(new)*

**Position:** Between About and Skills. `id="experience"`.

### Timeline
- Left vertical line: `position: absolute, left: 20px`, `background: linear-gradient(to bottom, rgba(139,92,246,0.5), transparent)`
- Each item: dot + card side by side with `gap: 32px`

### Dot variants
- **Current role:** `background: linear-gradient(135deg, #7c3aed, #a78bfa)`, `box-shadow: 0 0 12px rgba(139,92,246,0.6)`
- **Past roles:** `background: rgba(139,92,246,0.25)`, no glow

### Timeline card
- Glass card (`border-radius: 16px`), top-highlight `::before`
- **Current role card:** `border-color: rgba(139,92,246,0.2)`, subtle violet tint background
- Card content: role title, company + location, date badge (violet pill), description, skill tags

### Entries to populate (placeholder — user to provide real data)
1. Sr. Software Test Engineer — Straumann Group, Chemnitz (2023–Present) ← current
2. [Previous roles — user to fill in]

---

## Skills Section

**Layout:** 3-column CSS Grid, same as current.

### Skill card changes
- Glass treatment: `backdrop-filter: blur(12px)`, `border-radius: 18px`, top-highlight
- **Category header:** Icon in a small glass pill (`40×40px, border-radius: 10px`) + uppercase label beside it
- Skill tags: slightly larger (`font-size: 11px`, `padding: 6px 12px`, `border-radius: 8px`), dot prefix

### "Also familiar with" bar
- Contained in a single glass row with `border-radius: 14px`, darker bg
- Label + tags inline

---

## Projects Section

**Featured card changes**
- Glass container with `border-color: rgba(139,92,246,0.2)` + violet glow shadow
- Top-highlight gradient stronger on left side
- "Featured Project" badge → violet pill
- Primary CTA gets `box-shadow: 0 0 18px rgba(124,58,237,0.25)` glow

**Project grid cards**
- Glass cards with hover: `translateY(-3px)` + `border-color: rgba(139,92,246,0.25)`
- Grid overlay on visual area (subtle `rgba(139,92,246,0.04)` line pattern)

---

## Contact Section

**Layout:** CSS Grid `grid-template-columns: 1fr 1.1fr`, gap 48px.

### Left — Info
- 3 glass info cards (Email, Location, Status). Icon in `42×42px` violet glass square
- Social row: GitHub, LinkedIn, Twitter as equal-width glass cards

### Right — Form
- Inputs: `background: rgba(255,255,255,0.04)`, `border-radius: 10px`, violet focus border
- Submit button: `linear-gradient(135deg, #7c3aed, #6d28d9)` + glow shadow
- Form field layout unchanged (2-col name/email row, full-width subject + message)

---

## Footer

Three-column layout inside Contact section wrapper:
- Left: `N.` logo
- Center: copyright + tagline
- Right: GitHub + LinkedIn links + back-to-top `↑` button (glass square)

---

## Page Structure (updated section order)

```
<Navbar />          ← floating pill, adds Experience link
<Hero />            ← photo split layout
<About />           ← glassmorphism cards
<Experience />      ← NEW vertical timeline
<Skills />          ← glass cards, icon headers
<Projects />        ← glass cards, featured glow
<Contact />         ← glass form + info cards + Footer
```

---

## Files to Create / Modify

| File | Action |
|---|---|
| `src/app/globals.css` | Update CSS variables, add glassmorphism utility classes |
| `components/Navbar.tsx` | Floating pill layout, add Experience link |
| `components/sections/Hero.tsx` | Photo split layout, ambient glow, available badge |
| `components/sections/About.tsx` | Glass stats cards, glass photo card |
| `components/sections/Experience.tsx` | **NEW** — vertical timeline section |
| `components/sections/Skills.tsx` | Glass cards with icon headers |
| `components/sections/Projects.tsx` | Glass cards, featured glow, hover lift |
| `components/sections/Contact.tsx` | Glass form inputs, info cards |
| `components/ui/SectionTag.tsx` | Update to new glass pill style |
| `components/ui/Footer.tsx` | Three-column layout |
| `src/app/page.tsx` | Add `<Experience />` between About and Skills |

---

## Setup Notes

- Add `.superpowers/` to `.gitignore` to exclude brainstorm session files from version control

---

## Out of Scope

- Light mode is not redesigned (keep existing light mode as-is; dark is primary)
- No new font (keep Inter)
- No animation library changes (keep Framer Motion)
- No backend/API changes
- No new sections beyond Experience

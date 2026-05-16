# Portfolio UI Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the portfolio-nextjs skeleton into a complete, production-quality dark-theme single-page portfolio for Nikul Goyani.

**Architecture:** Single `src/app/page.tsx` composes five section components (Hero, About, Skills, Projects, Contact) plus a fixed Navbar. Each section is a `'use client'` component using Framer Motion for scroll-triggered animations. Shared UI primitives live in `components/ui/`.

**Tech Stack:** Next.js 13, TypeScript, Tailwind CSS, Framer Motion, react-icons, @emailjs/browser

---

## File Map

| Action | Path |
|---|---|
| Modify | `src/app/globals.css` |
| Modify | `src/app/layout.tsx` |
| Modify | `src/app/page.tsx` |
| Modify | `components/Navbar.tsx` |
| Create | `components/ui/SectionTag.tsx` |
| Create | `components/ui/Footer.tsx` |
| Create | `components/sections/Hero.tsx` |
| Create | `components/sections/About.tsx` |
| Create | `components/sections/Skills.tsx` |
| Create | `components/sections/Projects.tsx` |
| Create | `components/sections/Contact.tsx` |
| Create | `.env.local` (EmailJS keys — not committed) |

> **Verification:** This project has no test suite set up. Each task is verified by running `npx tsc --noEmit` (type-check) and then `npm run dev` + browser check. Add `.env.local` to `.gitignore` before first commit.

---

## Task 1: Install Dependencies + Update globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Install framer-motion and emailjs**

```bash
cd C:\Users\Nikul\Documents\Portfolio\portfolio-nextjs
npm install framer-motion @emailjs/browser
```

Expected: both packages added to `node_modules` and `package.json`.

- [ ] **Step 2: Replace globals.css with dark theme base**

Replace the entire content of `src/app/globals.css` with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

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

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git init
git add src/app/globals.css package.json package-lock.json
git commit -m "feat: install framer-motion + emailjs, dark theme base styles"
```

---

## Task 2: Create SectionTag and Footer UI Components

**Files:**
- Create: `components/ui/SectionTag.tsx`
- Create: `components/ui/Footer.tsx`

- [ ] **Step 1: Create SectionTag component**

Create `components/ui/SectionTag.tsx`:

```tsx
const SectionTag = ({ children }: { children: string }) => (
  <div className="flex items-center gap-3 text-violet-400 text-xs tracking-widest uppercase mb-3">
    {children}
    <span className="h-px bg-violet-400/20 w-[60px]" />
  </div>
);

export default SectionTag;
```

- [ ] **Step 2: Create Footer component**

Create `components/ui/Footer.tsx`:

```tsx
const Footer = () => (
  <div className="mt-16 pt-8 border-t border-[#1e293b] flex items-center justify-between flex-wrap gap-4">
    <span className="text-xl font-black text-white">
      N<span className="text-violet-400">.</span>
    </span>
    <span className="text-xs text-slate-600">
      © 2026 Nikul Goyani · Built with Next.js &amp; Tailwind
    </span>
  </div>
);

export default Footer;
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/ui/SectionTag.tsx components/ui/Footer.tsx
git commit -m "feat: add SectionTag and Footer shared UI components"
```

---

## Task 3: Rebuild Navbar

**Files:**
- Modify: `components/Navbar.tsx`

Fixes from current broken state: mobile sidebar always visible (no state), wrong image paths, links pointing to `"/"`.

- [ ] **Step 1: Replace Navbar.tsx entirely**

Replace the full content of `components/Navbar.tsx` with:

```tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      className="fixed w-full z-[100] border-b"
      style={{
        background: 'rgba(15,15,26,0.85)',
        backdropFilter: 'blur(12px)',
        borderColor: 'rgba(167,139,250,0.12)',
      }}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between px-6 lg:px-16 h-16">
        <a href="#" className="text-xl font-black text-white">
          N<span className="text-violet-400">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-xs uppercase tracking-widest text-slate-400 hover:text-violet-400 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:block text-xs uppercase tracking-widest text-violet-400 border border-violet-400/40 px-4 py-2 rounded-md hover:bg-violet-400/10 transition-colors"
        >
          Resume ↗
        </a>

        <button
          className="md:hidden text-slate-400 hover:text-violet-400"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
        >
          <AiOutlineMenu size={24} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/70 z-[100]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="fixed top-0 left-0 w-[75%] sm:w-[60%] h-screen z-[200] p-10 flex flex-col"
              style={{
                background: '#0f0f1a',
                borderRight: '1px solid rgba(167,139,250,0.15)',
              }}
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-black text-white">
                  N<span className="text-violet-400">.</span>
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="text-slate-400 hover:text-violet-400"
                  aria-label="Close menu"
                >
                  <AiOutlineClose size={24} />
                </button>
              </div>
              <ul className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-lg uppercase tracking-widest text-slate-300 hover:text-violet-400 transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto text-xs uppercase tracking-widest text-violet-400 border border-violet-400/40 px-4 py-3 rounded-md text-center hover:bg-violet-400/10 transition-colors"
              >
                Resume ↗
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Navbar.tsx
git commit -m "fix: rebuild Navbar with glassmorphism, mobile menu state, Framer Motion"
```

---

## Task 4: Create Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Create directory**

```bash
mkdir -p components/sections
```

- [ ] **Step 2: Create Hero.tsx**

Create `components/sections/Hero.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';
import { AiFillGithub, AiFillLinkedin, AiOutlineMail } from 'react-icons/ai';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const socials = [
  { label: 'GitHub', icon: AiFillGithub, href: 'https://github.com/NikulGoyani369' },
  { label: 'LinkedIn', icon: AiFillLinkedin, href: 'https://linkedin.com/in/' },
  { label: 'Email', icon: AiOutlineMail, href: 'mailto:kabuterlokhani@gmail.com' },
];

const Hero = () => (
  <section
    className="relative min-h-screen flex items-center px-6 lg:px-24 overflow-hidden"
    style={{ background: '#0f0f1a' }}
  >
    {/* Radial violet glow top-right */}
    <div
      className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
      style={{
        background: 'radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)',
      }}
    />

    {/* Decorative dot grid */}
    <div className="absolute right-16 top-1/2 -translate-y-1/2 hidden lg:grid grid-cols-4 gap-3 opacity-20 pointer-events-none">
      {Array.from({ length: 48 }).map((_, i) => (
        <div key={i} className="w-1 h-1 rounded-full bg-violet-400" />
      ))}
    </div>

    <motion.div
      className="relative z-10 max-w-2xl"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.div
        variants={item}
        className="inline-flex items-center gap-2 text-xs text-violet-400 tracking-widest uppercase mb-5 bg-violet-400/10 border border-violet-400/20 px-4 py-2 rounded-full"
      >
        <span>▸</span> Front-End Developer
      </motion.div>

      <motion.h1
        variants={item}
        className="text-5xl md:text-7xl font-black leading-tight mb-3"
      >
        <span className="text-white">Hi, I&apos;m</span>
        <br />
        <span className="text-violet-400">Nikul</span>
        <span className="text-white"> Goyani</span>
      </motion.h1>

      <motion.p variants={item} className="text-xl font-light text-slate-400 mb-4">
        Building <span className="text-slate-300">fast, modern web experiences</span>
      </motion.p>

      <motion.p
        variants={item}
        className="text-sm text-slate-500 leading-relaxed max-w-md mb-8"
      >
        I craft pixel-perfect, accessible interfaces with React and Next.js.
        Focused on clean code, smooth interactions, and shipping things that work.
      </motion.p>

      <motion.div variants={item} className="flex gap-3 flex-wrap mb-10">
        <a
          href="#projects"
          className="bg-violet-400 text-[#0f0f1a] text-xs font-bold uppercase tracking-widest px-7 py-3 rounded-md hover:bg-violet-300 transition-colors"
        >
          View Projects →
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-violet-400/40 text-violet-400 text-xs uppercase tracking-widest px-7 py-3 rounded-md hover:bg-violet-400/10 transition-colors"
        >
          Download CV
        </a>
      </motion.div>

      <motion.div variants={item} className="flex gap-3 flex-wrap">
        {socials.map(({ label, icon: Icon, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-slate-500 border border-[#1e293b] px-4 py-2 rounded-full hover:border-violet-400/50 hover:text-violet-400 transition-colors"
          >
            <Icon size={14} />
            {label}
          </a>
        ))}
      </motion.div>
    </motion.div>
  </section>
);

export default Hero;
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add components/sections/Hero.tsx
git commit -m "feat: add Hero section with Framer Motion stagger animation"
```

---

## Task 5: Create About Section

**Files:**
- Create: `components/sections/About.tsx`

- [ ] **Step 1: Create About.tsx**

Create `components/sections/About.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionTag from '../ui/SectionTag';

const stats = [
  { value: '2+', label: 'Years exp.' },
  { value: '10+', label: 'Projects' },
  { value: '5+', label: 'Tech stack' },
];

const fadeLeft = {
  hidden: { x: -40, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.6 } },
};

const fadeRight = {
  hidden: { x: 40, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.6 } },
};

const About = () => (
  <section
    id="about"
    className="px-6 lg:px-24 py-24"
    style={{ background: '#0f0f1a' }}
  >
    <div className="grid lg:grid-cols-[1fr_1.3fr] gap-16 items-center max-w-5xl mx-auto">
      {/* Left: photo */}
      <motion.div
        className="flex justify-center lg:justify-start"
        variants={fadeLeft}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <div className="relative">
          <div className="w-[220px] h-[280px] rounded-2xl border-2 border-violet-400/25 overflow-hidden bg-[#1e1e3f]">
            <Image
              src="/assets/NG.jpg"
              alt="Nikul Goyani"
              width={220}
              height={280}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 flex items-center gap-2 bg-[#0f0f1a] border border-violet-400/25 rounded-xl px-3 py-2 text-xs text-violet-400 tracking-wide whitespace-nowrap">
            <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
            Available for work
          </div>
        </div>
      </motion.div>

      {/* Right: content */}
      <motion.div
        variants={fadeRight}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        <SectionTag>About me</SectionTag>
        <h2 className="text-white mb-4">
          Passionate about{' '}
          <span className="text-violet-400">great interfaces</span>
        </h2>
        <p className="text-sm text-slate-500 leading-relaxed mb-3">
          I&apos;m Nikul Goyani, a front-end developer who specialises in building
          fast, accessible, and visually polished web applications using React and
          Next.js.
        </p>
        <p className="text-sm text-slate-500 leading-relaxed mb-6">
          When I&apos;m not coding, I&apos;m exploring new UI patterns, contributing
          to open source, or sharpening my design eye on Dribbble.
        </p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map(({ value, label }) => (
            <div
              key={label}
              className="border border-[#1e293b] rounded-xl p-4 text-center"
              style={{ background: 'rgba(167,139,250,0.04)' }}
            >
              <span className="block text-2xl font-black text-violet-400">{value}</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">
                {label}
              </span>
            </div>
          ))}
        </div>

        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs text-violet-400 border border-violet-400/30 px-5 py-3 rounded-md hover:bg-violet-400/10 transition-colors uppercase tracking-widest"
        >
          Download Resume ↗
        </a>
      </motion.div>
    </div>
  </section>
);

export default About;
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/About.tsx
git commit -m "feat: add About section with photo, stats, and slide-in animation"
```

---

## Task 6: Create Skills Section

**Files:**
- Create: `components/sections/Skills.tsx`

- [ ] **Step 1: Create Skills.tsx**

Create `components/sections/Skills.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';
import SectionTag from '../ui/SectionTag';

const categories = [
  {
    icon: '⚛️',
    label: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
  },
  {
    icon: '🎨',
    label: 'Styling',
    skills: ['Tailwind CSS', 'Framer Motion', 'Styled Components', 'SASS', 'Figma'],
  },
  {
    icon: '🛠️',
    label: 'Tools & Other',
    skills: ['Git / GitHub', 'REST APIs', 'Node.js', 'Vercel', 'VS Code'],
  },
];

const alsoFamiliar = ['Redux', 'React Query', 'Firebase', 'MongoDB', 'PostgreSQL'];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const Skills = () => (
  <section
    id="skills"
    className="px-6 lg:px-24 py-24"
    style={{ background: '#080810' }}
  >
    <div className="max-w-5xl mx-auto">
      <SectionTag>Skills</SectionTag>
      <h2 className="text-white mb-3">
        What I <span className="text-violet-400">work with</span>
      </h2>
      <p className="text-sm text-slate-500 mb-12 max-w-md leading-relaxed">
        Technologies and tools I use to build production-ready web applications.
      </p>

      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {categories.map(({ icon, label, skills }) => (
          <motion.div
            key={label}
            variants={cardVariants}
            className="border rounded-2xl p-6"
            style={{
              background: 'rgba(167,139,250,0.04)',
              borderColor: 'rgba(167,139,250,0.1)',
            }}
          >
            <div className="flex items-center gap-2 text-violet-400 text-xs tracking-widest uppercase mb-5">
              <span>{icon}</span>
              {label}
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1.5 text-xs text-slate-400 border border-[#1e293b] bg-white/[0.03] px-3 py-1.5 rounded-md hover:border-violet-400/40 hover:text-slate-200 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400/60" />
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-10 pt-8 border-t border-[#1e293b] flex flex-wrap items-center gap-3">
        <span className="text-[10px] text-slate-600 uppercase tracking-widest whitespace-nowrap">
          Also familiar with
        </span>
        {alsoFamiliar.map((tech) => (
          <span
            key={tech}
            className="text-xs text-slate-500 border border-[#1e293b] bg-white/[0.03] px-3 py-1 rounded"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Skills.tsx
git commit -m "feat: add Skills section with staggered card animation"
```

---

## Task 7: Create Projects Section

**Files:**
- Create: `components/sections/Projects.tsx`

- [ ] **Step 1: Create Projects.tsx**

Create `components/sections/Projects.tsx`:

```tsx
'use client';

import { motion } from 'framer-motion';
import SectionTag from '../ui/SectionTag';

interface Project {
  title: string;
  description: string;
  tech: string[];
  live: string;
  github: string;
  gradient: string;
  emoji: string;
}

const featured: Project = {
  title: 'Your Best Project Name',
  description:
    'A short 2–3 sentence description of what this project does, the problem it solves, and why it is impressive. Keep it punchy and results-focused.',
  tech: ['Next.js', 'TypeScript', 'Tailwind', 'Prisma'],
  live: 'https://your-live-demo.com',
  github: 'https://github.com/NikulGoyani369',
  gradient: 'from-[#1a1a2e] to-[#16213e]',
  emoji: '🚀',
};

const projects: Project[] = [
  {
    title: 'Project Two',
    description: 'Brief description of what this does and why it matters.',
    tech: ['React', 'Node.js', 'MongoDB'],
    live: '#',
    github: '#',
    gradient: 'from-[#1a1a2e] to-[#2d1b4e]',
    emoji: '🛍️',
  },
  {
    title: 'Project Three',
    description: 'Brief description of what this does and why it matters.',
    tech: ['React', 'D3.js', 'REST API'],
    live: '#',
    github: '#',
    gradient: 'from-[#0f1f2e] to-[#1a3a4e]',
    emoji: '📊',
  },
  {
    title: 'Project Four',
    description: 'Brief description of what this does and why it matters.',
    tech: ['Next.js', 'Supabase', 'Tailwind'],
    live: '#',
    github: '#',
    gradient: 'from-[#1a2e1a] to-[#1a4e2d]',
    emoji: '🌿',
  },
];

const cardVariants = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const Projects = () => (
  <section
    id="projects"
    className="px-6 lg:px-24 py-24"
    style={{ background: '#0f0f1a' }}
  >
    <div className="max-w-5xl mx-auto">
      <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
        <div>
          <SectionTag>Projects</SectionTag>
          <h2 className="text-white">
            Things I&apos;ve <span className="text-violet-400">built</span>
          </h2>
        </div>
        <a
          href="https://github.com/NikulGoyani369"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-violet-400 border border-violet-400/30 px-4 py-2 rounded-md hover:bg-violet-400/10 transition-colors uppercase tracking-widest"
        >
          View All on GitHub ↗
        </a>
      </div>

      {/* Featured project */}
      <motion.div
        className="grid lg:grid-cols-[1.2fr_1fr] border border-violet-400/15 rounded-2xl overflow-hidden mb-5"
        style={{ background: 'rgba(167,139,250,0.04)' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div
          className={`bg-gradient-to-br ${featured.gradient} min-h-[200px] flex items-center justify-center text-6xl relative overflow-hidden`}
        >
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg,transparent,transparent 30px,rgba(167,139,250,1) 30px,rgba(167,139,250,1) 31px),repeating-linear-gradient(90deg,transparent,transparent 30px,rgba(167,139,250,1) 30px,rgba(167,139,250,1) 31px)',
            }}
          />
          <span className="relative z-10">{featured.emoji}</span>
        </div>

        <div className="p-8 flex flex-col justify-center">
          <span className="inline-block text-[9px] uppercase tracking-widest text-violet-400 bg-violet-400/10 border border-violet-400/20 px-3 py-1 rounded-full mb-4 w-fit">
            ⭐ Featured Project
          </span>
          <h3 className="text-lg font-bold text-white mb-3">{featured.title}</h3>
          <p className="text-xs text-slate-500 leading-relaxed mb-4">
            {featured.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {featured.tech.map((t) => (
              <span
                key={t}
                className="text-[10px] text-slate-500 border border-[#1e293b] px-2 py-0.5 rounded"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-3">
            <a
              href={featured.live}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-violet-400 text-[#0f0f1a] text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-md hover:bg-violet-300 transition-colors"
            >
              Live Demo ↗
            </a>
            <a
              href={featured.github}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-[#1e293b] text-slate-400 text-xs uppercase tracking-widest px-5 py-2.5 rounded-md hover:border-violet-400/40 hover:text-violet-400 transition-colors"
            >
              GitHub →
            </a>
          </div>
        </div>
      </motion.div>

      {/* Project grid */}
      <motion.div
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {projects.map((p) => (
          <motion.div
            key={p.title}
            variants={cardVariants}
            className="border border-[#1e293b] bg-white/[0.02] rounded-xl overflow-hidden hover:-translate-y-1 hover:border-violet-400/30 transition-all duration-300"
          >
            <div
              className={`bg-gradient-to-br ${p.gradient} h-28 flex items-center justify-center text-4xl`}
            >
              {p.emoji}
            </div>
            <div className="p-5">
              <h3 className="text-sm font-bold text-slate-200 mb-2">{p.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-3">
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[9px] text-slate-500 border border-[#1e293b] px-2 py-0.5 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a
                  href={p.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-violet-400 hover:underline"
                >
                  Live ↗
                </a>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] text-slate-500 hover:text-violet-400"
                >
                  GitHub →
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default Projects;
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/sections/Projects.tsx
git commit -m "feat: add Projects section with featured card and grid"
```

---

## Task 8: Create Contact Section + .env.local

**Files:**
- Create: `components/sections/Contact.tsx`
- Create: `.env.local`

- [ ] **Step 1: Create .env.local for EmailJS credentials**

Create `.env.local` in the project root (this file is gitignored):

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Sign up free at https://emailjs.com, create a service + email template, then replace the placeholder values above.

- [ ] **Step 2: Ensure .env.local is gitignored**

Open `.gitignore` and confirm `.env.local` is listed. If not, add it:

```
.env.local
```

- [ ] **Step 3: Create Contact.tsx**

Create `components/sections/Contact.tsx`:

```tsx
'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { AiFillGithub, AiFillLinkedin, AiOutlineTwitter, AiOutlineMail } from 'react-icons/ai';
import { MdLocationOn } from 'react-icons/md';
import SectionTag from '../ui/SectionTag';
import Footer from '../ui/Footer';

type Status = 'idle' | 'sending' | 'success' | 'error';

const socials = [
  { label: 'GitHub', icon: AiFillGithub, href: 'https://github.com/NikulGoyani369' },
  { label: 'LinkedIn', icon: AiFillLinkedin, href: 'https://linkedin.com/in/' },
  { label: 'Twitter', icon: AiOutlineTwitter, href: 'https://twitter.com/' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const emailjs = await import('@emailjs/browser');
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputClass =
    'w-full bg-white/[0.03] border border-[#1e293b] rounded-lg px-4 py-3 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-violet-500/50 focus:bg-violet-400/[0.04] transition-colors';

  return (
    <section
      id="contact"
      className="px-6 lg:px-24 py-24"
      style={{ background: '#080810' }}
    >
      <div className="max-w-5xl mx-auto">
        <SectionTag>Contact</SectionTag>
        <h2 className="text-white mb-3">
          Let&apos;s <span className="text-violet-400">work together</span>
        </h2>
        <p className="text-sm text-slate-500 max-w-md leading-relaxed mb-12">
          Have a project in mind, or just want to say hi? Drop me a message — I
          typically reply within 24 hours.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: info cards + socials */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex flex-col gap-4 mb-6">
              {[
                {
                  icon: <AiOutlineMail size={20} />,
                  label: 'Email',
                  value: 'kabuterlokhani@gmail.com',
                },
                {
                  icon: <MdLocationOn size={20} />,
                  label: 'Location',
                  value: 'Your City, Country',
                },
                {
                  icon: <span className="text-base">⚡</span>,
                  label: 'Status',
                  value: 'Available for freelance & full-time',
                  valueClass: 'text-green-400',
                },
              ].map(({ icon, label, value, valueClass }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 border rounded-xl p-5"
                  style={{
                    background: 'rgba(167,139,250,0.04)',
                    borderColor: 'rgba(167,139,250,0.1)',
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-violet-400/10 flex items-center justify-center text-violet-400 flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">
                      {label}
                    </div>
                    <div className={`text-sm ${valueClass ?? 'text-slate-200'}`}>
                      {value}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              {socials.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 border border-[#1e293b] bg-white/[0.02] rounded-xl py-3 text-xs text-slate-500 hover:border-violet-400/30 hover:text-violet-400 transition-colors"
                >
                  <Icon size={16} />
                  {label}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-2">
                  Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-2">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="your@email.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-2">
                Subject
              </label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                placeholder="What's this about?"
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-[10px] text-slate-500 uppercase tracking-widest mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Your message here..."
                className={`${inputClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="bg-violet-400 text-[#0f0f1a] text-xs font-bold uppercase tracking-widest py-4 rounded-lg hover:bg-violet-300 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message →'}
            </button>

            {status === 'success' && (
              <p className="text-xs text-green-400 text-center">
                Message sent! I&apos;ll reply soon.
              </p>
            )}
            {status === 'error' && (
              <p className="text-xs text-red-400 text-center">
                Something went wrong. Please email directly.
              </p>
            )}
          </motion.form>
        </div>

        <Footer />
      </div>
    </section>
  );
};

export default Contact;
```

- [ ] **Step 4: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add components/sections/Contact.tsx .gitignore
git commit -m "feat: add Contact section with EmailJS form and Footer"
```

---

## Task 9: Wire Up page.tsx + Update layout.tsx

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Replace page.tsx**

Replace the full content of `src/app/page.tsx` with:

```tsx
import Navbar from '../../components/Navbar';
import Hero from '../../components/sections/Hero';
import About from '../../components/sections/About';
import Skills from '../../components/sections/Skills';
import Projects from '../../components/sections/Projects';
import Contact from '../../components/sections/Contact';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
```

- [ ] **Step 2: Update layout.tsx metadata**

Replace the full content of `src/app/layout.tsx` with:

```tsx
import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Nikul Goyani | Front-End Developer',
  description:
    'Front-end developer specialising in React, Next.js, and TypeScript. Building fast, accessible, and beautiful web experiences.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Start dev server and verify in browser**

```bash
npm run dev
```

Open http://localhost:3000 and verify:
- Dark background loads immediately (no flash of light theme)
- Navbar fades in from top, `N.` logo visible, links work as anchors
- Hamburger menu opens/closes sidebar on mobile widths (resize browser to < 768px)
- Hero section fills viewport, stagger animation plays on load
- Scrolling to About shows slide-in animation for photo and content
- Scrolling to Skills shows staggered card animation
- Scrolling to Projects shows featured card and grid
- Scrolling to Contact shows info cards and form
- Footer visible at bottom of Contact section

- [ ] **Step 5: Final commit**

```bash
git add src/app/page.tsx src/app/layout.tsx
git commit -m "feat: wire up all sections in page.tsx, update metadata"
```

---

## Post-Implementation Checklist

- [ ] Replace placeholder project data in `Projects.tsx` with real projects
- [ ] Update social links in `Hero.tsx` and `Contact.tsx` with real URLs
- [ ] Update stat numbers in `About.tsx` (years exp, projects, tech stack)
- [ ] Update location in `Contact.tsx` info card
- [ ] Add `resume.pdf` to `public/` folder (currently linked but missing)
- [ ] Set up EmailJS account and fill in `.env.local` values
- [ ] Update bio paragraphs in `About.tsx` with real copy

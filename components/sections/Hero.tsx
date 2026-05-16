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

'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
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
  { label: 'LinkedIn', icon: AiFillLinkedin, href: 'https://www.linkedin.com/in/nikulkumar-goyani/' },
  { label: 'Email', icon: AiOutlineMail, href: 'mailto:gnikul36@gmail.com' },
];

const Hero = () => (
  <section
    className="relative min-h-screen flex items-center px-6 lg:px-24 py-20 overflow-hidden"
    style={{ background: 'var(--bg-primary)' }}
  >
    {/* Ambient glow orbs */}
    <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(109,40,217,0.15) 0%, transparent 70%)', filter: 'blur(80px)' }} />
    <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full pointer-events-none"
      style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', filter: 'blur(80px)' }} />

    <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
      {/* Left */}
      <motion.div variants={container} initial="hidden" animate="show" className="text-center lg:text-left">

        {/* Mobile photo — centered, shown only on small screens */}
        <motion.div variants={item} className="flex justify-center mb-8 lg:hidden">
          <div className="relative">
            <div className="absolute inset-[-20px] rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)', filter: 'blur(30px)' }} />
            <div className="relative w-[140px] h-[140px] overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '50%', boxShadow: '0 16px 40px rgba(0,0,0,0.4)' }}>
              <Image src="/assets/Nirmalbhai.jpg" alt="Nikul Goyani" width={140} height={140} className="object-cover w-full h-full" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5 whitespace-nowrap"
              style={{ background: 'rgba(10,10,26,0.9)', backdropFilter: 'blur(12px)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '100px', padding: '4px 10px' }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" style={{ boxShadow: '0 0 6px #4ade80' }} />
              <span className="text-violet-400 text-[9px] tracking-widest uppercase">Available</span>
            </div>
          </div>
        </motion.div>

        <motion.div variants={item}
          className="inline-flex items-center gap-2 text-xs text-violet-400 tracking-widest uppercase mb-6 px-4 py-2 rounded-full"
          style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)' }}>
          <span>▸</span> V&amp;V Expert · Software Test Engineer
        </motion.div>

        <motion.h1 variants={item}
          className="font-black leading-tight mb-4 text-white"
          style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', letterSpacing: '-1.5px' }}>
          <span>Hi, I&apos;m</span><br />
          <span className="text-violet-400">Nikul</span>
          <span>kumar Goyani</span>
        </motion.h1>

        <motion.p variants={item} className="text-base font-light mb-3 text-white/50">
          Delivering{' '}
          <span className="text-white/75 font-medium">reliable, high-quality software</span>
        </motion.p>

        <motion.p variants={item} className="text-sm leading-relaxed max-w-md mb-8 text-white/35 mx-auto lg:mx-0">
          ISTQB certified Senior Software Test Engineer with 6+ years of experience in quality
          engineering, test automation, and V&amp;V in complex regulated environments.
          Currently at Straumann Group, Chemnitz.
        </motion.p>

        <motion.div variants={item} className="flex gap-3 flex-wrap mb-10 justify-center lg:justify-start">
          <a href="#projects"
            className="text-xs font-bold uppercase tracking-widest px-7 py-3.5 rounded-xl text-white transition-all hover:brightness-110"
            style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', border: '1px solid rgba(167,139,250,0.3)', boxShadow: '0 0 24px rgba(124,58,237,0.3)' }}>
            View Projects →
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest text-violet-400 px-7 py-3.5 rounded-xl transition-colors hover:bg-violet-400/10"
            style={{ background: 'rgba(167,139,250,0.06)', border: '1px solid rgba(167,139,250,0.2)' }}>
            Download CV
          </a>
        </motion.div>

        <motion.div variants={item} className="flex gap-3 flex-wrap justify-center lg:justify-start">
          {socials.map(({ label, icon: Icon, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs px-4 py-2 rounded-full transition-colors text-white/35 hover:border-violet-400/50 hover:text-violet-400"
              style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)' }}>
              <Icon size={14} />
              {label}
            </a>
          ))}
        </motion.div>
      </motion.div>

      {/* Right: Photo card — desktop only */}
      <motion.div
        className="hidden lg:flex justify-center relative"
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <div className="absolute inset-[-30px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 70%)', filter: 'blur(40px)' }} />

        {/* Floating stat card */}
        <div className="absolute top-5 -left-12 z-10"
          style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '10px 14px', boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}>
          <div className="text-violet-400 font-black text-xl leading-none">6+</div>
          <div className="text-[9px] uppercase tracking-widest mt-1 text-white/30">Years exp.</div>
        </div>

        {/* Photo card */}
        <div className="relative w-[220px] h-[290px] overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '24px', boxShadow: '0 24px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
          <Image src="/assets/Nirmalbhai.jpg" alt="Nikul Goyani" width={220} height={290} className="object-cover w-full h-full" />
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(109,40,217,0.3) 100%)' }} />
        </div>

        {/* Available badge */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 whitespace-nowrap"
          style={{ background: 'rgba(10,10,26,0.9)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(139,92,246,0.3)', borderRadius: '100px', padding: '6px 14px', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' }}>
          <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" style={{ boxShadow: '0 0 8px #4ade80' }} />
          <span className="text-violet-400 text-[10px] tracking-widest uppercase">Available for work</span>
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;

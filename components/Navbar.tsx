'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const navLinks = [
  { label: 'Home',           href: '#',                id: ''               },
  { label: 'About',          href: '#about',           id: 'about'          },
  { label: 'Experience',     href: '#experience',      id: 'experience'     },
  { label: 'Skills',         href: '#skills',          id: 'skills'         },
  { label: 'Certifications', href: '#certifications',  id: 'certifications' },
  { label: 'Projects',       href: '#projects',        id: 'projects'       },
  { label: 'Contact',        href: '#contact',         id: 'contact'        },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    // Scroll progress bar
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };

    // Scroll-spy: mark whichever section is in the middle of the viewport
    const sectionIds = navLinks.map((l) => l.id).filter(Boolean);
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    // Home active when near top
    const onScrollHome = () => {
      if (window.scrollY < 100) setActiveSection('');
    };

    window.addEventListener('scroll', onScroll,     { passive: true });
    window.addEventListener('scroll', onScrollHome, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('scroll', onScrollHome);
      observers.forEach((o) => o.disconnect());
    };
  }, []);

  return (
    <>
      {/* ── Scroll progress bar ── */}
      <div className="fixed top-0 left-0 right-0 z-[200] h-[2px]"
        style={{ background: 'rgba(255,255,255,0.04)' }}>
        <div
          className="h-full transition-all duration-100"
          style={{
            width: `${scrollProgress}%`,
            background: 'linear-gradient(to right, #7c3aed, #a78bfa)',
            boxShadow: '0 0 8px rgba(139,92,246,0.5)',
          }}
        />
      </div>

      {/* ── Navbar ── */}
      <motion.nav
        className="fixed w-full z-[100] px-6 lg:px-12 pt-4"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="flex items-center justify-between px-6 h-14 rounded-2xl border"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderColor: 'rgba(255,255,255,0.08)',
          }}
        >
          <a href="#" className="text-xl font-black text-white">
            N<span className="text-violet-400">.</span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = link.id === activeSection;
              return (
                <li key={link.label} className="relative">
                  <a
                    href={link.href}
                    className="text-xs uppercase tracking-widest transition-colors duration-200"
                    style={{ color: isActive ? '#a78bfa' : 'rgba(255,255,255,0.45)' }}
                  >
                    {link.label}
                  </a>
                  {/* Active dot indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-dot"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-violet-400"
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/nikulkumar-goyani/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs uppercase tracking-widest text-violet-400 px-4 py-2 rounded-lg transition-colors hover:bg-violet-400/10"
              style={{ border: '1px solid rgba(167,139,250,0.35)' }}
            >
              Resume ↗
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              className="text-white/40 hover:text-violet-400"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <AiOutlineMenu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/70 z-[150]"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setOpen(false)}
              />
              <motion.div
                className="fixed top-0 left-0 w-[75%] sm:w-[60%] h-screen z-[200] p-10 flex flex-col"
                style={{ background: 'var(--sidebar-bg)', borderRight: '1px solid rgba(167,139,250,0.15)' }}
                initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-12">
                  <span className="text-xl font-black text-white">
                    N<span className="text-violet-400">.</span>
                  </span>
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="text-white/40 hover:text-violet-400 transition-colors"
                  >
                    <AiOutlineClose size={24} />
                  </button>
                </div>
                <ul className="flex flex-col gap-8">
                  {navLinks.map((link) => {
                    const isActive = link.id === activeSection;
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-lg uppercase tracking-widest transition-colors"
                          style={{ color: isActive ? '#a78bfa' : 'rgba(255,255,255,0.6)' }}
                          onClick={() => setOpen(false)}
                        >
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
                <a
                  href="https://www.linkedin.com/in/nikulkumar-goyani/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="mt-auto text-xs uppercase tracking-widest text-violet-400 border border-violet-400/40 px-4 py-3 rounded-md text-center hover:bg-violet-400/10 transition-colors"
                >
                  Resume ↗
                </a>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
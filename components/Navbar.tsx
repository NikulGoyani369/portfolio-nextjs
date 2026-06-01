'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { BsSun, BsMoon } from 'react-icons/bs';

const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
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
        <a href="#" className="text-xl font-black text-slate-900 dark:text-white">
          N<span className="text-violet-400">.</span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href}
                className="text-xs uppercase tracking-widest transition-colors text-white/45 hover:text-violet-400">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {mounted && (
            <button onClick={toggleTheme} aria-label="Toggle theme"
              className="w-8 h-8 flex items-center justify-center rounded-lg border transition-colors text-white/40 hover:text-violet-400"
              style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.08)' }}>
              {theme === 'dark' ? <BsSun size={14} /> : <BsMoon size={14} />}
            </button>
          )}
          <a href="https://www.linkedin.com/in/nikulkumar-goyani/" target="_blank" rel="noopener noreferrer"
            className="text-xs uppercase tracking-widest text-violet-400 px-4 py-2 rounded-lg transition-colors hover:bg-violet-400/10"
            style={{ border: '1px solid rgba(167,139,250,0.35)' }}>
            Resume ↗
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          {mounted && (
            <button onClick={toggleTheme} aria-label="Toggle theme"
              className="p-1.5 rounded-md transition-colors text-white/40 hover:text-violet-400">
              {theme === 'dark' ? <BsSun size={16} /> : <BsMoon size={16} />}
            </button>
          )}
          <button className="text-white/40 hover:text-violet-400" onClick={() => setOpen(true)} aria-label="Open menu">
            <AiOutlineMenu size={24} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 bg-black/70 z-[150]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} />
            <motion.div
              className="fixed top-0 left-0 w-[75%] sm:w-[60%] h-screen z-[200] p-10 flex flex-col"
              style={{ background: 'var(--sidebar-bg)', borderRight: '1px solid rgba(167,139,250,0.15)' }}
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-black text-slate-900 dark:text-white">
                  N<span className="text-violet-400">.</span>
                </span>
                <button onClick={() => setOpen(false)} aria-label="Close menu"
                  className="text-white/40 hover:text-violet-400 transition-colors">
                  <AiOutlineClose size={24} />
                </button>
              </div>
              <ul className="flex flex-col gap-8">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}
                      className="text-lg uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-violet-400 transition-colors"
                      onClick={() => setOpen(false)}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a href="https://www.linkedin.com/in/nikulkumar-goyani/" target="_blank" rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="mt-auto text-xs uppercase tracking-widest text-violet-400 border border-violet-400/40 px-4 py-3 rounded-md text-center hover:bg-violet-400/10 transition-colors">
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

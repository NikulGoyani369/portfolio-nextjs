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
              className="fixed inset-0 bg-black/70 z-[150]"
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
  );
};

export default Navbar;

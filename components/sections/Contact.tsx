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
  { label: 'LinkedIn', icon: AiFillLinkedin, href: 'https://www.linkedin.com/in/nikulkumar-goyani/' },
  { label: 'Twitter', icon: AiOutlineTwitter, href: 'https://twitter.com/' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        { from_name: form.name, from_email: form.email, subject: form.subject, message: form.message },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const inputBase = 'w-full rounded-[10px] px-4 py-3 text-xs outline-none glass-input font-[inherit]';
  const inputStyle = { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' };

  return (
    <section id="contact" className="px-6 lg:px-24 py-24" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <SectionTag>Contact</SectionTag>
        <h2 className="text-white mb-3">
          Let&apos;s <span className="text-violet-400">work together</span>
        </h2>
        <p className="text-sm leading-relaxed max-w-md mb-12 text-white/35">
          Have a project in mind, or just want to say hi? Drop me a message — I typically reply within 24 hours.
        </p>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div initial={{ x: -40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="flex flex-col gap-4 mb-6">
              {[
                { icon: <AiOutlineMail size={20} />, label: 'Email', value: 'gnikul39@gmail.com', green: false },
                { icon: <MdLocationOn size={20} />, label: 'Location', value: 'Chemnitz, Germany', green: false },
                { icon: <span className="text-base">⚡</span>, label: 'Status', value: 'Available for freelance & full-time', green: true },
              ].map(({ icon, label, value, green }) => (
                <div key={label} className="flex items-center gap-4 relative rounded-[14px] p-5 overflow-hidden"
                  style={{ background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(to right, transparent, rgba(167,139,250,0.2), transparent)' }} />
                  <div className="w-[42px] h-[42px] rounded-xl flex items-center justify-center text-violet-400 flex-shrink-0"
                    style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}>
                    {icon}
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest mb-1 text-white/25">{label}</div>
                    <div className={`text-sm font-medium ${green ? 'text-green-400' : 'text-white/75'}`}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              {socials.map(({ label, icon: Icon, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs transition-colors text-white/35 hover:text-violet-400"
                  style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.03)' }}>
                  <Icon size={16} />{label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.form onSubmit={handleSubmit} className="flex flex-col gap-4"
            initial={{ x: 40, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-[10px] uppercase tracking-widest mb-2 text-white/30">Name</label>
                <input id="contact-name" name="name" value={form.name} onChange={handleChange} required placeholder="Your name" className={inputBase} style={inputStyle} />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-[10px] uppercase tracking-widest mb-2 text-white/30">Email</label>
                <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange} required placeholder="your@email.com" className={inputBase} style={inputStyle} />
              </div>
            </div>
            <div>
              <label htmlFor="contact-subject" className="block text-[10px] uppercase tracking-widest mb-2 text-white/30">Subject</label>
              <input id="contact-subject" name="subject" value={form.subject} onChange={handleChange} required placeholder="What's this about?" className={inputBase} style={inputStyle} />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-[10px] uppercase tracking-widest mb-2 text-white/30">Message</label>
              <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Your message here..." className={`${inputBase} resize-none`} style={inputStyle} />
            </div>
            <button type="submit" disabled={status === 'sending'}
              className="py-4 rounded-xl text-white text-xs font-bold uppercase tracking-widest transition-all hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #6d28d9)', border: '1px solid rgba(167,139,250,0.3)', boxShadow: '0 0 28px rgba(124,58,237,0.25)' }}>
              {status === 'sending' ? 'Sending...' : 'Send Message →'}
            </button>
            {status === 'success' && <p className="text-xs text-green-400 text-center">Message sent! I&apos;ll reply soon.</p>}
            {status === 'error' && <p className="text-xs text-red-400 text-center">Something went wrong. Please email directly.</p>}
          </motion.form>
        </div>

        <Footer />
      </div>
    </section>
  );
};

export default Contact;

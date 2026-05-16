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

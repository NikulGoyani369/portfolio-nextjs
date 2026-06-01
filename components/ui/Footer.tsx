const Footer = () => (
  <div className="mt-12 lg:mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4"
    style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
    <span className="text-lg font-black text-white order-1">
      N<span className="text-violet-400">.</span>
    </span>
    <span className="text-xs text-center leading-relaxed order-3 sm:order-2" style={{ color: 'rgba(255,255,255,0.2)' }}>
      © 2026 <span className="font-medium" style={{ color: 'rgba(167,139,250,0.6)' }}>Nikulkumar Goyani</span> · Built with Next.js &amp; Tailwind CSS
      <br />Chemnitz, Germany · Open to opportunities
    </span>
    <div className="flex items-center gap-3 order-2 sm:order-3">
      <div className="flex gap-4">
        {[
          { label: 'GitHub', href: 'https://github.com/NikulGoyani369' },
          { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nikulkumar-goyani/' },
        ].map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer"
            className="text-xs uppercase transition-colors hover:text-violet-400 text-white/25"
            style={{ letterSpacing: '1.5px' }}>
            {label}
          </a>
        ))}
      </div>
      <a href="#" className="w-9 h-9 flex items-center justify-center rounded-[10px] text-violet-400 transition-colors hover:bg-violet-400/20"
        style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}>
        ↑
      </a>
    </div>
  </div>
);

export default Footer;

const SectionTag = ({ children }: { children: string }) => (
  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-[10px] text-violet-400 tracking-[0.2em] uppercase mb-4"
    style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.2)' }}>
    <span className="text-[8px]">◈</span>
    {children}
  </div>
);

export default SectionTag;

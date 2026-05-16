const SectionTag = ({ children }: { children: string }) => (
  <div className="flex items-center gap-3 text-violet-400 text-xs tracking-widest uppercase mb-3">
    {children}
    <span className="h-px bg-violet-400/20 w-[60px]" />
  </div>
);

export default SectionTag;

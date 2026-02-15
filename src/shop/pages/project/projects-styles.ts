export const s = {
  main: "min-h-screen bg-black text-white font-sans overflow-x-hidden selection:bg-[#44d62c] selection:text-black italic",
  neuralBg: "fixed inset-0 z-0 pointer-events-none overflow-hidden",
  patternOverlay:
    "absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]",
  glowCenter:
    "absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#44d62c10_0%,transparent_50%)] animate-pulse",

  contentWrapper: "relative z-10 max-w-7xl mx-auto px-6 py-40 md:py-52",
  headerBox: "flex flex-col mb-32 border-l-2 border-[#44d62c]/30 pl-10",
  repoLabel:
    "text-[#44d62c] font-mono text-xs uppercase tracking-[0.5em] mb-4 flex items-center gap-2",
  mainTitle:
    "text-7xl md:text-9xl font-black tracking-tighter uppercase italic leading-none",
  description: "mt-8 text-neutral-500 max-w-xl text-lg italic leading-relaxed",

  grid: "grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 mb-40",

  cardWrapper:
    "group relative rounded-[2.5rem] bg-neutral-900/20 border border-neutral-800/50 p-2 backdrop-blur-3xl hover:border-[#44d62c]/40 transition-all duration-700 hover:shadow-[0_0_50px_rgba(68,214,44,0.1)]",
  imageContainer: "relative h-72 rounded-[2.2rem] overflow-hidden",
  categoryBadge:
    "absolute top-6 left-6 z-20 flex items-center gap-2 bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-neutral-800 text-[#44d62c] text-[9px] font-black font-mono uppercase tracking-[0.2em]",
  cardImage:
    "w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out",
  cardTitle:
    "text-3xl font-black text-white mb-4 uppercase italic tracking-tighter group-hover:text-[#44d62c] transition-colors duration-500 break-words [overflow-wrap:anywhere] leading-tight",
  cardDesc: "text-neutral-500 text-sm mb-8 leading-relaxed line-clamp-3 italic",

  techTag:
    "text-[9px] font-bold bg-neutral-950 border border-neutral-900 px-3 py-1.5 rounded-lg text-neutral-400 uppercase tracking-widest group-hover:border-[#44d62c]/30 group-hover:text-white transition-all",

  btnGithub:
    "flex-1 h-14 rounded-2xl border-neutral-800 bg-transparent text-neutral-400 hover:bg-white hover:text-black transition-all duration-500 font-black text-[10px] uppercase tracking-widest",
  btnLive:
    "flex-1 h-14 rounded-2xl bg-[#44d62c] text-black hover:bg-white transition-all duration-500 font-black text-[10px] uppercase tracking-widest shadow-lg",

  emptyState:
    "col-span-full py-32 text-center border-2 border-dashed border-neutral-900 rounded-[4rem]",
  ctaWrapper:
    "relative group p-1.5 rounded-[3.5rem] bg-gradient-to-r from-transparent via-[#44d62c]/20 to-transparent",
  ctaInner:
    "bg-neutral-950 border border-neutral-900 p-20 rounded-[3.3rem] text-center overflow-hidden relative",
  ctaTitle:
    "text-4xl md:text-6xl font-black mb-8 italic uppercase tracking-tighter",
  ctaBtn:
    "h-20 px-12 bg-white text-black font-black uppercase tracking-[0.4em] text-xs rounded-full hover:bg-[#44d62c] transition-all duration-500 group-hover:scale-105 shadow-2xl",
};

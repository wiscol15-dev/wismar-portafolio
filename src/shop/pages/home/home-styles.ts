export const s = {
  main: "bg-black text-white font-sans overflow-x-hidden selection:bg-[#44d62c] selection:text-black relative italic",

  ambientWrapper: "fixed inset-0 z-0 pointer-events-none overflow-hidden",
  ambientGlow:
    "absolute top-[-10%] left-[-5%] w-[800px] h-[800px] rounded-full bg-[#44d62c]/10 blur-[130px] animate-pulse mix-blend-screen",
  ambientGrid:
    "absolute inset-0 bg-[linear-gradient(to_right,#44d62c05_1px,transparent_1px),linear-gradient(to_bottom,#44d62c05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]",

  heroHeader:
    "relative min-h-screen flex flex-col items-center justify-start pt-32 md:pt-44 px-6",
  statusBadge:
    "inline-flex items-center gap-3 px-5 py-2 rounded-full bg-neutral-900/50 border border-[#44d62c]/30 backdrop-blur-xl mb-8 shadow-[0_0_30px_rgba(68,214,44,0.1)] group",
  statusText:
    "text-[10px] text-neutral-400 group-hover:text-[#44d62c] transition-colors font-mono uppercase tracking-[0.3em]",
  heroH1:
    "text-6xl md:text-[8.5rem] font-black tracking-tighter mb-8 leading-[0.8] uppercase",
  heroGradientText:
    "bg-clip-text text-transparent bg-gradient-to-r from-white via-[#44d62c] to-neutral-700",
  heroP:
    "text-lg md:text-2xl text-neutral-500 max-w-3xl mx-auto mb-16 leading-relaxed font-light",
  heroCTA:
    "w-full sm:w-auto font-black bg-[#44d62c] text-black hover:bg-white shadow-[0_0_40px_rgba(68,214,44,0.3)] transition-all border-0 rounded-2xl h-16 px-12 uppercase tracking-[0.2em] text-[11px]",
  heroSecondaryBtn:
    "w-full sm:w-auto gap-3 bg-transparent border-neutral-800 text-neutral-400 hover:border-[#44d62c] hover:text-[#44d62c] rounded-2xl h-16 px-12 transition-all font-black uppercase tracking-[0.2em] text-[11px] backdrop-blur-md",

  profileGrid:
    "max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-8 z-10 items-stretch",
  profileCardWrapper:
    "relative h-full min-h-[600px] w-full rounded-[3.5rem] overflow-hidden bg-neutral-900/10 border border-neutral-800/50 group-hover:border-[#44d62c]/50 transition-all duration-700",
  profileImg:
    "absolute inset-0 w-full h-full object-cover grayscale brightness-75 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000",
  profileGradient:
    "absolute bottom-0 left-0 p-12 z-20 bg-gradient-to-t from-black via-black/90 to-transparent w-full pt-60",
  profileBadge:
    "inline-flex items-center gap-2 px-4 py-1.5 bg-[#44d62c] text-black rounded-lg text-[10px] font-black mb-6 uppercase tracking-[0.3em] shadow-[0_0_20px_#44d62c]",
  profileTitle:
    "text-5xl md:text-6xl font-black text-white mb-4 uppercase tracking-tighter leading-none",
  profileSub: "text-neutral-400 font-mono text-base leading-relaxed italic",

  bentoCard:
    "w-full rounded-[3rem] border border-neutral-800/50 bg-neutral-900/10 backdrop-blur-3xl p-10 hover:border-[#44d62c]/40 hover:bg-[#44d62c]/5 transition-all duration-500 group relative overflow-hidden flex flex-col justify-center",
  bentoIconBox:
    "w-16 h-16 bg-[#44d62c]/10 rounded-2xl flex items-center justify-center mb-6 text-[#44d62c] group-hover:bg-[#44d62c] group-hover:text-black transition-all",
  bentoLabel:
    "text-[9px] font-mono text-neutral-600 uppercase tracking-[0.4em] mb-2 block",
  bentoTitle:
    "text-2xl font-black text-white uppercase tracking-tighter leading-none group-hover:text-[#44d62c]",

  metricGrid:
    "grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-y border-neutral-900/50",
  metricLabel:
    "flex items-center gap-2 text-neutral-600 text-[9px] font-mono uppercase tracking-[0.2em] mb-3 group-hover:text-[#44d62c] transition-colors",
  metricVal:
    "text-3xl font-black uppercase italic tracking-widest text-neutral-400 group-hover:text-white transition-colors",
};

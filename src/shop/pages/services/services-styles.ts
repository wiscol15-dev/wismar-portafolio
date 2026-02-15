export const s = {
  main: "min-h-screen bg-neutral-950 text-white font-sans overflow-x-hidden selection:bg-[#44d62c] selection:text-black italic",
  ambientWrapper: "fixed inset-0 z-0 pointer-events-none overflow-hidden",
  ambientGlow:
    "absolute top-[10%] right-[-10%] w-[1000px] h-[1000px] rounded-full bg-[#44d62c]/5 blur-[150px] animate-pulse",
  ambientGrid:
    "absolute inset-0 bg-[linear-gradient(to_right,#44d62c05_1px,transparent_1px),linear-gradient(to_bottom,#44d62c05_1px,transparent_1px)] bg-[size:4rem_4rem]",
  ambientOverlay: "absolute inset-0 bg-neutral-950/20 backdrop-blur-[1px]",

  contentWrapper: "relative z-10 max-w-7xl mx-auto px-6 py-32",
  header: "text-center mb-24 max-w-5xl mx-auto",
  mainTitle:
    "text-5xl md:text-8xl font-black mb-10 tracking-tighter uppercase leading-[0.85]",
  gradientText:
    "text-transparent bg-clip-text bg-gradient-to-r from-white via-[#44d62c] to-[#2b8a1d]",
  impactText:
    "text-xl md:text-2xl text-neutral-400 mb-12 leading-relaxed font-light max-w-4xl mx-auto",

  section: "mb-24",
  categoryHeader:
    "flex items-center gap-4 mb-12 border-b border-[#44d62c]/20 pb-4",
  categoryHeaderRight:
    "flex items-center gap-4 mb-12 border-b border-[#44d62c]/20 pb-4 justify-end text-right",
  categoryNumber: "text-[#44d62c] text-3xl font-black",
  categoryTitle: "text-4xl font-bold text-white uppercase tracking-tighter",
  grid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
  gridThree: "grid grid-cols-1 md:grid-cols-3 gap-6",

  cardArticle:
    "h-full p-6 rounded-2xl bg-black border border-[#44d62c]/20 hover:border-[#44d62c] transition-all duration-300 group hover:bg-[#44d62c]/5 hover:-translate-y-1 relative overflow-hidden",
  cardGlow:
    "absolute inset-0 bg-[#44d62c]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500",
  cardIconBox:
    "w-12 h-12 bg-[#44d62c]/10 rounded-lg flex items-center justify-center mb-4 text-[#44d62c] group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_-3px_rgba(68,214,44,0.3)]",
  cardTitle:
    "text-xl font-bold text-white mb-2 group-hover:text-[#44d62c] transition-colors",
  cardDesc: "text-neutral-400 text-sm leading-relaxed",

  ctaSection:
    "rounded-[4rem] bg-neutral-900/40 border border-neutral-800 p-16 text-center relative overflow-hidden backdrop-blur-md shadow-3xl group",
  ctaGlowLine:
    "absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#44d62c] to-transparent opacity-100 group-hover:animate-pulse",
  ctaTitle:
    "text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter uppercase italic",
  ctaDesc: "text-neutral-400 mb-12 max-w-3xl mx-auto text-xl font-light italic",
  ctaBtn:
    "font-black bg-[#44d62c] text-black hover:bg-white shadow-[0_0_30px_rgba(68,214,44,0.4)] transition-all border-0 text-xl py-8 px-14 rounded-3xl flex items-center gap-4 transform hover:scale-105 active:scale-95 uppercase tracking-widest",
};

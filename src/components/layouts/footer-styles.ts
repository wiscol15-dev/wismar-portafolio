export const s = {
  footer:
    "relative bg-black border-t border-neutral-900 pt-20 pb-10 overflow-hidden italic selection:bg-[#44d62c] selection:text-black",
  gridBg: "absolute inset-0 opacity-20 pointer-events-none",
  gridPattern:
    "absolute inset-0 bg-[linear-gradient(to_right,#44d62c05_1px,transparent_1px),linear-gradient(to_bottom,#44d62c05_1px,transparent_1px)] bg-[size:3rem_3rem]",

  container: "max-w-7xl mx-auto px-6 relative z-10",
  mainGrid: "grid grid-cols-1 md:grid-cols-4 gap-12 mb-16",

  identityCol: "col-span-1 md:col-span-1 space-y-6",
  brandLogo: "font-black text-2xl tracking-tighter uppercase",
  brandDesc:
    "text-[11px] text-neutral-500 font-mono leading-relaxed uppercase tracking-widest",
  socialBox: "flex gap-4",
  socialIcon:
    "p-2 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400 hover:text-[#44d62c] hover:border-[#44d62c]/50 transition-all duration-300",

  columnTitle:
    "text-white font-black uppercase text-[10px] tracking-[0.3em] mb-8 flex items-center gap-2",

  linksList: "space-y-4",
  navLink:
    "group text-[11px] text-neutral-500 hover:text-white flex items-center gap-2 transition-colors uppercase font-bold tracking-tighter",
  chevron: "text-[#44d62c] opacity-0 group-hover:opacity-100 transition-all",

  telemetryBox: "space-y-4",
  loadIndicator: "bg-neutral-900/50 border border-neutral-800 p-4 rounded-xl",
  loadLabel: "flex justify-between text-[9px] font-mono text-neutral-500 mb-2",
  barWrapper: "h-[2px] bg-neutral-800 w-full overflow-hidden",
  barFill: "h-full bg-[#44d62c] w-[65%] animate-pulse",
  stackInfo: "text-[9px] font-mono text-neutral-600 leading-tight",

  ctaCard:
    "bg-[#44d62c]/5 border border-[#44d62c]/10 p-6 rounded-[2rem] space-y-4",
  ctaText: "text-[10px] font-bold text-neutral-400 leading-relaxed uppercase",
  ctaBtn:
    "inline-flex items-center gap-2 bg-[#44d62c] text-black px-4 py-2 rounded-full font-black text-[9px] uppercase hover:bg-white transition-colors",

  bottomWrapper:
    "pt-10 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-6",
  copyright: "text-[9px] font-mono text-neutral-600 uppercase tracking-widest",
  legalBox:
    "flex gap-8 text-[9px] font-mono text-neutral-700 uppercase tracking-tighter",
  legalLink: "hover:text-neutral-400 cursor-pointer transition-colors",
};

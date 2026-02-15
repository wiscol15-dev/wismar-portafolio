// src/shop/pages/profile/profile-styles.ts

export const s = {
  main: "min-h-screen bg-black text-white pt-24 pb-20 px-6 overflow-x-hidden relative selection:bg-[#44d62c] selection:text-black font-sans italic",
  ambientWrapper: "fixed inset-0 z-0 pointer-events-none",
  ambientGrid:
    "absolute inset-0 bg-[radial-gradient(#44d62c08_1.5px,transparent_1px)] bg-[size:40px_40px] opacity-40",
  ambientGlow:
    "absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#44d62c]/5 rounded-full blur-[150px] animate-pulse",

  backLink:
    "inline-flex items-center gap-3 text-neutral-600 hover:text-[#44d62c] transition-all mb-10 group font-mono text-[10px] tracking-[0.3em] uppercase",
  backIconBox:
    "p-2 rounded-lg bg-neutral-900 group-hover:bg-[#44d62c]/10 border border-neutral-800 group-hover:border-[#44d62c]/30",

  bentoContainer:
    "relative rounded-[3rem] bg-neutral-900/10 border border-neutral-800/50 backdrop-blur-3xl p-3 mb-12 overflow-hidden shadow-2xl group/main",
  bentoGrid: "grid grid-cols-1 lg:grid-cols-12 gap-4",

  imgCol:
    "lg:col-span-4 relative min-h-[600px] overflow-hidden rounded-[2.8rem] border border-neutral-800 group/img",
  profileImg:
    "absolute inset-0 w-full h-full object-cover grayscale brightness-75 group-hover/img:grayscale-0 group-hover/img:scale-105 transition-all duration-1000",
  identityBadge:
    "inline-flex items-center gap-2 px-3 py-1 bg-[#44d62c] text-black rounded-full text-[8px] font-black tracking-[0.2em] mb-4 shadow-[0_0_20px_#44d62c]",
  nameTitle:
    "text-4xl font-black uppercase text-white tracking-tighter leading-none mb-2",

  infoCol: "lg:col-span-8 p-10 lg:p-20 flex flex-col justify-center relative",
  settingsBadge:
    "inline-flex items-center gap-2 px-4 py-1.5 rounded-xl border border-[#44d62c]/30 bg-[#44d62c]/5 text-[#44d62c] text-[10px] font-mono uppercase tracking-[0.4em] mb-8 w-fit shadow-[0_0_15px_rgba(68,214,44,0.1)]",
  mainTitle:
    "text-6xl md:text-8xl font-black tracking-tighter leading-[0.85] uppercase mb-10",
  bioText:
    "text-lg md:text-xl text-neutral-400 font-light leading-relaxed max-w-3xl mb-12 border-l-2 border-[#44d62c] pl-8",

  exportBtn:
    "bg-[#44d62c] hover:bg-white text-black font-black uppercase text-[11px] tracking-[0.2em] h-16 px-12 rounded-2xl shadow-[0_10px_40px_rgba(68,214,44,0.3)] border-0 transition-all",
  socialLink:
    "p-5 bg-neutral-900 border border-neutral-800 rounded-2xl hover:border-white hover:text-white transition-all",

  techGrid: "grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12",
  techCard:
    "p-10 rounded-[3rem] bg-neutral-900/20 border border-neutral-800/50 backdrop-blur-xl relative overflow-hidden group",
  techIconBox: "p-3 rounded-xl border",

  timelineSection:
    "rounded-[4rem] bg-neutral-900/10 border border-neutral-800/50 p-12 backdrop-blur-3xl relative",
  timelineItem: "relative pl-20 group",
  timelineCard:
    "p-8 rounded-[2.5rem] bg-neutral-900/20 border border-neutral-800/50 group-hover:bg-[#44d62c]/5 transition-all duration-500 shadow-xl",

  footer:
    "mt-20 pt-10 border-t border-neutral-900/50 flex flex-col md:flex-row justify-between items-center gap-6 opacity-30",
};

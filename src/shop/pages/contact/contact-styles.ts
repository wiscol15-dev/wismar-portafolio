export const s = {
  mainWrapper:
    "min-h-screen bg-neutral-950 text-white font-sans overflow-x-hidden selection:bg-[#44d62c] selection:text-black flex flex-col italic",
  ambientWrapper: "fixed inset-0 z-0 pointer-events-none overflow-hidden",
  ambientGlow:
    "absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#44d62c]/10 via-neutral-950 to-neutral-950",
  ambientGrid:
    "absolute inset-0 bg-[linear-gradient(to_right,#44d62c10_1px,transparent_1px),linear-gradient(to_bottom,#44d62c10_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]",

  mainContent:
    "relative z-10 flex-grow flex items-start justify-center px-6 pt-32 pb-12",
  grid: "grid grid-cols-1 lg:grid-cols-2 gap-16 items-start",

  statusBadge:
    "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#44d62c]/10 border border-[#44d62c]/20 text-[#44d62c] text-[10px] font-mono mb-6 uppercase tracking-widest",
  titleH1:
    "text-5xl md:text-7xl font-black mb-6 tracking-tighter leading-none uppercase italic",
  description: "text-xl text-neutral-500 mb-12 max-w-lg leading-relaxed italic",

  infoCard:
    "flex items-center gap-5 p-5 rounded-2xl bg-neutral-900/40 border border-neutral-800/50 hover:border-[#44d62c]/50 hover:bg-[#44d62c]/5 transition-all group",
  iconBox:
    "p-3 bg-neutral-900 rounded-xl text-[#44d62c] group-hover:shadow-[0_0_15px_rgba(68,214,44,0.3)] transition-all",
  cardLabel:
    "text-[9px] font-black text-neutral-600 uppercase tracking-[0.3em] mb-1",
  cardValue: "text-lg font-bold tracking-tight",

  terminalCard:
    "relative rounded-[2.5rem] bg-black border border-neutral-800 shadow-2xl shadow-[#44d62c]/5 overflow-hidden group",
  terminalHeader:
    "bg-neutral-900/50 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-neutral-800",
  terminalHeaderDots: "flex gap-2",
  dotRed: "w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40",
  dotYellow:
    "w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40",
  dotGreen:
    "w-2.5 h-2.5 rounded-full bg-[#44d62c]/20 border border-[#44d62c]/40",
  terminalTitle:
    "text-[9px] font-mono text-neutral-600 uppercase tracking-widest",

  formPadding: "p-8 md:p-10 relative",
  formGroup: "space-y-7 relative z-10",
  inputLabel:
    "text-[#44d62c] text-[10px] font-mono ml-1 uppercase tracking-widest",
  input:
    "w-full bg-neutral-950 border border-neutral-800 rounded-xl px-5 py-4 text-white focus:border-[#44d62c] outline-none transition-all font-mono text-xs",
  textarea:
    "w-full bg-neutral-950 border border-neutral-800 rounded-xl px-5 py-4 text-white focus:border-[#44d62c] outline-none transition-all font-mono text-xs resize-none leading-relaxed",

  archGrid: "grid grid-cols-2 gap-3",
  archBtn:
    "cursor-pointer py-3 rounded-xl border text-[9px] text-center transition-all font-black uppercase tracking-widest",
  archActive:
    "bg-[#44d62c]/10 border-[#44d62c] text-[#44d62c] shadow-[0_0_15px_rgba(68,214,44,0.1)]",
  archDefault:
    "bg-neutral-950 border-neutral-800 text-neutral-600 hover:border-neutral-700",

  submitBtn:
    "w-full h-16 font-black uppercase tracking-[0.4em] text-[10px] transition-all duration-500 rounded-2xl border-0",
};

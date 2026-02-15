export const s = {
  main: "p-8 space-y-10 bg-black min-h-screen text-white italic animate-in fade-in duration-500",
  headerBox:
    "flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-neutral-900 pb-8",
  mainTitle:
    "text-3xl font-black uppercase italic tracking-tighter text-white leading-none",
  versionLabel:
    "text-neutral-500 font-mono text-[10px] uppercase tracking-widest mt-3",

  statsGrid: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
  statCard:
    "group bg-neutral-900/40 border border-neutral-800 p-6 rounded-[2rem] hover:border-[#44d62c]/50 transition-all cursor-pointer relative overflow-hidden active:scale-95",
  statIconBox:
    "p-3 bg-black rounded-2xl border border-neutral-800 group-hover:border-[#44d62c]/30 transition-all",
  statBadge:
    "text-[10px] font-mono text-[#44d62c] bg-[#44d62c]/10 px-2 py-1 rounded-full font-bold border border-[#44d62c]/20 uppercase",
  statName:
    "text-neutral-500 text-[10px] font-mono uppercase tracking-widest font-bold relative z-10",
  statValue: "text-3xl font-black text-white mt-1 italic tracking-tighter",

  bottomGrid: "grid grid-cols-1 lg:grid-cols-3 gap-8",
  logsCard:
    "lg:col-span-2 bg-neutral-900/20 border border-neutral-800 rounded-[2.5rem] p-8 backdrop-blur-xl",
  logsTitle:
    "text-xl font-bold uppercase italic tracking-tight flex items-center gap-3 text-white mb-8",
  logItem:
    "p-4 rounded-2xl bg-black/60 border border-neutral-900 flex justify-between items-center group hover:border-[#44d62c]/30 transition-all",
  logAction: "text-[10px] text-white font-bold uppercase tracking-wider",
  logUser: "text-[8px] font-mono text-neutral-500",
  logStatusBadge:
    "px-2 py-0.5 rounded-md bg-[#44d62c]/5 border border-[#44d62c]/20 text-[#44d62c] text-[7px] font-black uppercase tracking-tighter",

  healthCard:
    "bg-neutral-900/40 border border-neutral-800 rounded-[2.5rem] p-8 flex flex-col relative overflow-hidden group",
  healthIconBg:
    "absolute -right-4 -top-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity",
  healthTitle:
    "text-xs font-black uppercase text-white mb-6 flex items-center gap-2",
  progressBar: "h-1 bg-neutral-800 rounded-full overflow-hidden",

  modalOverlay:
    "fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300",
  modalContent:
    "bg-neutral-900 border border-neutral-800 w-full max-w-4xl rounded-[3rem] overflow-hidden shadow-2xl",
  modalHeader:
    "p-8 border-b border-neutral-800 flex justify-between items-center bg-black/40",
  modalBody: "p-8 max-h-[60vh] overflow-y-auto custom-scrollbar",
  modalFooter:
    "p-8 bg-black/40 border-t border-neutral-800 flex justify-center",

  userItem:
    "p-5 rounded-2xl bg-black border border-neutral-900 flex justify-between items-center hover:border-blue-500/30 transition-all",
  userIconBox:
    "w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20",

  orderCard:
    "p-6 rounded-[2.5rem] bg-black border border-neutral-800 hover:border-[#44d62c]/40 transition-all group",
  orderServiceItem:
    "flex items-center justify-between bg-neutral-900/30 p-3 rounded-xl border border-neutral-800/50",
};

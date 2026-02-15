export const s = {
  main: "min-h-screen bg-black text-white pt-24 pb-20 px-6 italic selection:bg-[#44d62c] selection:text-black font-sans",
  contentWrapper: "max-w-7xl mx-auto relative z-10",

  header: "flex justify-between items-center mb-16",
  backLink:
    "inline-flex items-center gap-2 text-neutral-600 hover:text-[#44d62c] font-mono text-[10px] uppercase tracking-widest transition-all",
  syncBadge:
    "flex items-center gap-4 bg-neutral-900/50 px-4 py-2 rounded-full border border-neutral-800",
  syncIndicator: "w-2 h-2 rounded-full bg-[#44d62c] animate-pulse",
  syncText: "text-[9px] font-mono text-neutral-400 uppercase tracking-tighter",

  heroBox: "mb-24 border-l-4 border-[#44d62c] pl-10 py-4",
  heroTitle:
    "text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-6",
  heroDesc: "max-w-2xl text-neutral-500 text-lg md:text-xl leading-relaxed",

  layoutGrid: "grid grid-cols-1 lg:grid-cols-3 gap-16",
  servicesCol: "lg:col-span-2 space-y-24",

  sectionTitleBox: "flex items-center gap-4 mb-12 text-white",
  sectionTitle: "text-3xl font-black uppercase tracking-tight italic",
  cardGrid: "grid grid-cols-1 md:grid-cols-2 gap-6",

  cardArticle: "group rounded-[3rem] border-2 transition-all duration-500",
  cardSelected: "border-[#44d62c] bg-[#44d62c]/5 scale-[1.02]",
  cardDefault: "border-neutral-900 bg-neutral-900/20 hover:border-neutral-700",
  iconBox: "p-5 rounded-[1.8rem] transition-all",
  iconSelected: "bg-[#44d62c] text-black shadow-[0_0_20px_#44d62c]",
  iconDefault: "bg-black text-[#44d62c] border border-neutral-800",
  priceText: "text-2xl font-black text-white italic",
  serviceName:
    "text-2xl font-black uppercase italic text-white mb-3 tracking-tight group-hover:text-[#44d62c] transition-colors",
  categoryLabel:
    "text-[10px] font-mono text-neutral-500 uppercase mb-8 border-l border-neutral-800 pl-4",
  expandedDesc:
    "mt-8 p-8 rounded-[2.2rem] bg-black/60 border border-[#44d62c]/20 animate-in fade-in slide-in-from-top-4",

  sidebar: "lg:col-span-1",
  sidebarBox:
    "sticky top-28 bg-neutral-900/10 border border-neutral-800 p-10 rounded-[3.5rem] backdrop-blur-3xl shadow-2xl overflow-hidden group",
  sidebarTitle: "text-2xl font-black uppercase italic flex items-center gap-3",
  totalText:
    "text-6xl font-black text-[#44d62c] tracking-tighter leading-none mb-10 italic",
  executeBtn:
    "w-full h-20 bg-[#44d62c] text-black font-black uppercase text-xs tracking-[0.4em] rounded-3xl shadow-lg border-0 flex gap-3 transition-all active:scale-95",

  emptyStateBox:
    "col-span-full py-16 border-2 border-dashed border-neutral-900 rounded-[3.5rem] flex flex-col items-center justify-center opacity-30",
  loadingOverlay:
    "absolute inset-0 bg-black/95 z-50 flex flex-col items-center justify-center",

  modalOverlay:
    "fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-xl animate-in zoom-in duration-300",
  modalContent:
    "bg-neutral-900 border border-[#44d62c]/30 w-full max-w-xl rounded-[4rem] p-16 text-center shadow-2xl relative overflow-hidden",
};

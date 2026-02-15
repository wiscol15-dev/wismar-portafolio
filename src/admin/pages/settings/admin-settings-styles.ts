export const s = {
  main: "p-8 space-y-10 bg-black min-h-screen text-white italic selection:bg-[#44d62c] selection:text-black animate-in fade-in duration-700",

  header:
    "flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-neutral-900 pb-8 font-sans",
  titleH1:
    "text-3xl font-black uppercase italic tracking-tighter text-white leading-none",
  versionSub:
    "text-neutral-500 font-mono text-[10px] uppercase tracking-[0.3em] mt-3",
  statusBadge:
    "px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl flex items-center gap-3",

  layoutGrid: "grid grid-cols-1 lg:grid-cols-3 gap-10",
  mainCol: "lg:col-span-2 space-y-8 font-sans",
  sideCol: "lg:col-span-1 space-y-8 font-sans",

  editorCard:
    "bg-neutral-900/40 border border-neutral-800 p-8 rounded-[3rem] backdrop-blur-md relative overflow-hidden",
  editorTitle:
    "text-xl font-bold uppercase italic text-white flex items-center gap-3",
  cancelBtn:
    "text-xs font-mono text-red-500 uppercase flex items-center gap-1 hover:text-white transition-colors",
  formContainer:
    "space-y-6 p-8 bg-black/60 rounded-[2.5rem] border mb-10 relative z-10 transition-colors",

  label: "text-[8px] font-mono text-[#44d62c] uppercase ml-2",
  input:
    "w-full bg-neutral-950 border border-neutral-800 rounded-xl px-5 py-3 text-xs font-mono outline-none focus:border-[#44d62c]",
  select:
    "w-full bg-neutral-950 border border-neutral-800 rounded-xl px-5 py-3 text-xs font-mono outline-none focus:border-[#44d62c] appearance-none",
  textarea:
    "w-full bg-neutral-950 border border-neutral-800 rounded-2xl px-5 py-4 text-xs font-sans italic outline-none focus:border-[#44d62c] h-32 resize-none leading-relaxed",

  submitBtn:
    "w-full h-14 font-black uppercase text-[10px] tracking-[0.4em] rounded-2xl transition-all flex gap-3 shadow-xl border-0",

  itemCard:
    "flex items-center justify-between p-6 bg-neutral-950/60 border border-neutral-900 rounded-[2rem] group hover:border-[#44d62c]/30 transition-all duration-300",
  itemIconBox:
    "p-4 bg-black rounded-2xl text-neutral-700 group-hover:text-[#44d62c] border border-neutral-800 shadow-inner",
  itemName: "text-white text-sm font-black uppercase tracking-widest",
  itemSub:
    "text-[8px] font-mono text-neutral-600 uppercase mt-1 tracking-tighter italic",
  itemPrice: "text-lg font-black text-[#44d62c] italic",

  sidebarCard:
    "bg-neutral-900/40 border border-neutral-800 p-10 rounded-[3rem] backdrop-blur-md",
  toggleBox:
    "flex items-center justify-between p-5 bg-black/40 border border-neutral-800 rounded-3xl",
  toggleSwitch:
    "w-12 h-6 appearance-none bg-neutral-800 rounded-full checked:bg-[#44d62c] transition-all cursor-pointer relative after:content-[''] after:absolute after:w-4 after:h-4 after:bg-white after:rounded-full after:top-1 after:left-1 checked:after:left-7 after:transition-all",

  syncWrapper:
    "bg-[#44d62c] p-1.5 rounded-[3.5rem] shadow-[0_0_50px_rgba(68,214,44,0.15)]",
  syncInner: "bg-neutral-950 p-10 rounded-[3.3rem] text-center",
  syncTitle:
    "text-2xl font-black uppercase italic text-white mb-4 tracking-tighter leading-none",
  syncBtn:
    "w-full h-20 bg-[#44d62c] text-black font-black uppercase text-xs tracking-[0.4em] rounded-[2rem] hover:scale-105 transition-all border-0 shadow-2xl flex gap-3 items-center justify-center",

  deniedWrapper:
    "min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center",
  deniedTitle: "text-2xl font-black uppercase text-white tracking-tighter",
};

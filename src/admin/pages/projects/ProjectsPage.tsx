import { useState } from "react";
import {
  Trash2,
  ExternalLink,
  Save,
  Layers,
  ShoppingCart,
  MessageSquare,
  CheckCircle2,
  Search,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminControlPanel = () => {
  const [activeTab, setActiveTab] = useState<
    "projects" | "orders" | "messages"
  >("projects");
  const [searchTerm, setSearchTerm] = useState("");

  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "E-commerce Hub",
      tech: "React, .NET",
      image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=400",
    },
  ]);

  const [orders, setOrders] = useState([
    {
      id: "ORD-77",
      client: "Tech Solutions",
      pack: "Gold AI",
      total: "€4,200",
      date: "13/02/2026",
      active: true,
    },
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      name: "Ana Silva",
      email: "ana@funchal.pt",
      msg: "Interesada en una Landing Page Elite.",
      date: "Hoy",
    },
  ]);

  const [projectForm, setProjectForm] = useState({
    title: "",
    tech: "",
    image: "",
  });

  const handleSaveProject = () => {
    if (!projectForm.title) return;
    const newProj = { ...projectForm, id: Date.now() };
    setProjects([newProj, ...projects]);
    setProjectForm({ title: "", tech: "", image: "" });
  };

  const deleteProject = (id: number) =>
    setProjects(projects.filter((p) => p.id !== id));

  const completeOrder = (id: string) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, active: false } : o)));
    console.log(`Orden ${id} marcada como procesada.`);
  };

  const deleteMessage = (id: number) => {
    setMessages(messages.filter((m) => m.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 animate-in fade-in duration-500 selection:bg-[#44d62c] selection:text-black">
      <div className="mb-12 border-b border-neutral-900 pb-8 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8">
        <div>
          <h1 className="text-3xl font-black uppercase italic tracking-tighter">
            Terminal_<span className="text-[#44d62c]">Administrativa</span>
          </h1>
          <p className="text-neutral-500 font-mono text-[10px] mt-2 uppercase tracking-[0.2em]">
            // Sistema_de_Control_Integral_Funchal_v2.0
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative group">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-600 group-focus-within:text-[#44d62c] transition-colors"
              size={16}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar_en_sistema..."
              className="bg-neutral-900/50 border border-neutral-800 rounded-xl pl-12 pr-4 py-2 text-xs font-mono outline-none focus:border-[#44d62c] w-64 transition-all"
            />
          </div>

          <div className="flex bg-neutral-900/50 p-1 rounded-2xl border border-neutral-800">
            {(["projects", "orders", "messages"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${activeTab === tab ? "bg-[#44d62c] text-black" : "text-neutral-500 hover:text-white"}`}
              >
                {tab === "projects" && <Layers size={14} />}
                {tab === "orders" && <ShoppingCart size={14} />}
                {tab === "messages" && <MessageSquare size={14} />}
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="bg-neutral-900/30 border border-neutral-800 p-8 rounded-[2.5rem] h-fit backdrop-blur-md">
              <h3 className="text-white font-black uppercase italic mb-6 flex items-center gap-2">
                <Filter size={16} className="text-[#44d62c]" /> Inyectar_Data
              </h3>
              <div className="space-y-4">
                <input
                  value={projectForm.title}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, title: e.target.value })
                  }
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 font-mono text-sm text-white outline-none focus:border-[#44d62c] transition-all"
                  placeholder="Nombre_Proyecto"
                />
                <input
                  value={projectForm.tech}
                  onChange={(e) =>
                    setProjectForm({ ...projectForm, tech: e.target.value })
                  }
                  className="w-full bg-black border border-neutral-800 rounded-xl px-4 py-3 font-mono text-sm text-white outline-none focus:border-[#44d62c] transition-all"
                  placeholder="Stack_Técnico"
                />
                <Button
                  onClick={handleSaveProject}
                  className="w-full h-12 bg-[#44d62c] text-black font-black uppercase text-[10px] tracking-widest rounded-xl hover:bg-[#3ec428]"
                >
                  <Save size={16} className="mr-2" /> Guardar_en_Memoria
                </Button>
              </div>
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects
                .filter((p) =>
                  p.title.toLowerCase().includes(searchTerm.toLowerCase()),
                )
                .map((p) => (
                  <div
                    key={p.id}
                    className="bg-neutral-900/20 border border-neutral-800 p-6 rounded-[2rem] flex items-center gap-6 group hover:border-[#44d62c]/30 transition-all"
                  >
                    <div className="relative w-20 h-20 overflow-hidden rounded-xl">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-black uppercase italic tracking-tight">
                        {p.title}
                      </h4>
                      <p className="text-[#44d62c] font-mono text-[9px] mb-4">
                        {p.tech}
                      </p>
                      <div className="flex gap-4">
                        <button
                          onClick={() => deleteProject(p.id)}
                          className="text-neutral-600 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                        <button className="text-neutral-600 hover:text-white transition-colors">
                          <ExternalLink size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="bg-neutral-900/20 border border-neutral-800 rounded-[2.5rem] p-8 overflow-hidden backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-[11px]">
                <thead>
                  <tr className="text-neutral-600 uppercase border-b border-neutral-800">
                    <th className="pb-6">Protocolo_ID</th>
                    <th className="pb-6">Entidad_Cliente</th>
                    <th className="pb-6">Plan_Activo</th>
                    <th className="pb-6">Presupuesto</th>
                    <th className="pb-6">Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {orders
                    .filter((o) =>
                      o.client.toLowerCase().includes(searchTerm.toLowerCase()),
                    )
                    .map((o) => (
                      <tr
                        key={o.id}
                        className="border-b border-neutral-800/50 hover:bg-white/5 transition-all"
                      >
                        <td className="py-6 text-[#44d62c] font-bold tracking-widest">
                          {o.id}
                        </td>
                        <td className="text-white font-black uppercase italic">
                          {o.client}
                        </td>
                        <td className="text-neutral-400 font-light">
                          {o.pack}
                        </td>
                        <td className="text-white font-black">{o.total}</td>
                        <td>
                          <button
                            onClick={() => completeOrder(o.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-black uppercase text-[9px] transition-all ${o.active ? "bg-[#44d62c]/10 text-[#44d62c] hover:bg-[#44d62c] hover:text-black" : "bg-neutral-800 text-neutral-600 cursor-not-allowed"}`}
                          >
                            <CheckCircle2 size={14} />{" "}
                            {o.active ? "Procesar" : "Finalizado"}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {messages
              .filter((m) =>
                m.name.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((m) => (
                <div
                  key={m.id}
                  className="bg-neutral-900/30 border border-neutral-800 p-8 rounded-[2.5rem] relative group hover:border-[#44d62c]/50 transition-all"
                >
                  <button
                    onClick={() => deleteMessage(m.id)}
                    className="absolute top-6 right-6 text-neutral-700 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                  <div className="mb-6 inline-block p-3 bg-black rounded-xl border border-neutral-800 shadow-inner">
                    <MessageSquare className="text-[#44d62c]" size={20} />
                  </div>
                  <h4 className="text-white font-black uppercase italic text-lg tracking-tighter">
                    {m.name}
                  </h4>
                  <p className="text-[#44d62c] font-mono text-[10px] mb-6 lowercase">
                    {m.email}
                  </p>
                  <div className="bg-black/40 p-4 rounded-xl border border-neutral-800/50 shadow-inner">
                    <p className="text-neutral-400 text-xs italic leading-relaxed">
                      {m.msg}
                    </p>
                  </div>
                  <div className="mt-6 pt-6 border-t border-neutral-800 flex justify-between items-center text-[9px] font-mono text-neutral-600 uppercase tracking-widest">
                    <span>Recibido</span>
                    <span>{m.date}</span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminControlPanel;

import { useState } from "react";
import {
  Users,
  ShoppingBag,
  MessageSquare,
  TrendingUp,
  X,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/context/ProjectsContext";
import { s } from "./admin-styles";

const AdminControlPanel = () => {
  const { orders, deleteOrder } = useProjects();
  const [selectedStat, setSelectedStat] = useState<string | null>(null);

  const [messages] = useState([
    {
      id: 1,
      name: "Juan Pérez",
      email: "juan@tech.pt",
      text: "Me interesa el pack Gold.",
      date: "Hace 2h",
    },
    {
      id: 2,
      name: "Maria Doss",
      email: "maria@web.com",
      text: "Consulta sobre SEO Pro.",
      date: "Hace 5h",
    },
  ]);

  const stats = [
    {
      id: "presupuestos",
      name: "Presupuestos Totales",
      value: orders.length,
      icon: <ShoppingBag className="text-[#44d62c]" />,
      change: orders.length > 0 ? "Activo" : "Sin Data",
    },
    {
      id: "mensajes",
      name: "Mensajes Pendientes",
      value: messages.length,
      icon: <MessageSquare className="text-yellow-500" />,
      change: "Sync",
    },
    {
      id: "usuarios",
      name: "Usuarios Registrados",
      value: "28",
      icon: <Users className="text-blue-500" />,
      change: "+4%",
    },
    {
      id: "conversion",
      name: "Tasa de Conversión",
      value: "18%",
      icon: <TrendingUp className="text-[#44d62c]" />,
      change: "+2.1%",
    },
  ];

  return (
    <div className={s.main}>
      <header className={s.header}>
        <h1 className={s.titleH1}>
          Panel_<span className="text-[#44d62c]">Administrativo</span>
        </h1>
        <p className={s.subtitle}>
          // Control de operaciones y métricas de rendimiento_ [Funchal_Host]
        </p>
      </header>

      <div className={s.statsGrid}>
        {stats.map((stat) => (
          <div
            key={stat.id}
            onClick={() => setSelectedStat(stat.id)}
            className={s.statCard}
          >
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={s.iconBox}>{stat.icon}</div>
              <span className={s.badge}>{stat.change}</span>
            </div>
            <p className={s.statName}>{stat.name}</p>
            <p className={s.statValue}>{stat.value}</p>
            <div className="absolute inset-0 bg-gradient-to-br from-[#44d62c]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      {selectedStat && (
        <div className={s.modalOverlay}>
          <div className={s.modalContent}>
            <div className={s.modalHeader}>
              <div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white">
                  Detalles_{" "}
                  <span className="text-[#44d62c]">{selectedStat}</span>
                </h3>
                <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest mt-1">
                  // Nodo_Informativo_Sincronizado
                </p>
              </div>
              <button
                onClick={() => setSelectedStat(null)}
                className="p-3 hover:bg-white/10 rounded-2xl transition-colors text-neutral-500 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className={s.modalBody}>
              {selectedStat === "presupuestos" && (
                <div className="space-y-4">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <article key={order.id} className={s.orderCard}>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-[#44d62c] font-mono text-[9px] font-black uppercase tracking-widest">
                              {order.id}
                            </p>
                            <h4 className="text-white font-bold uppercase text-sm mt-1">
                              {order.clientName}
                            </h4>{" "}
                            <p className="text-neutral-500 text-[10px] italic">
                              {order.clientEmail}
                            </p>{" "}
                          </div>
                          <p className="text-[#44d62c] font-black text-xl">
                            {order.totalAmount}
                          </p>{" "}
                        </div>

                        <div className="grid grid-cols-1 gap-2 mt-2">
                          {order.services?.map((service: any, idx: number) => (
                            <div key={idx} className={s.serviceItem}>
                              <span className="text-white text-[10px] font-bold uppercase">
                                {service.name}
                              </span>
                              <span className="text-[#44d62c] font-mono text-[10px]">
                                €{service.price}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-end pt-4 border-t border-neutral-800">
                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="p-2 text-neutral-800 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </article>
                    ))
                  ) : (
                    <p className="text-center text-neutral-600 font-mono text-xs py-10">
                      // No se han detectado protocolos de compra
                    </p>
                  )}
                </div>
              )}

              {selectedStat === "mensajes" && (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={s.msgCard}>
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-[#44d62c] font-black uppercase italic text-sm">
                          {msg.name}
                        </h4>
                        <span className="text-[9px] font-mono text-neutral-600">
                          {msg.date}
                        </span>
                      </div>
                      <p className="text-neutral-400 text-xs italic mb-3 border-l-2 border-neutral-800 pl-4">
                        "{msg.text}"
                      </p>
                      <p className="text-[10px] font-mono text-neutral-500">
                        {msg.email}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {(selectedStat === "usuarios" ||
                selectedStat === "conversion") && (
                <div className="text-center py-10 opacity-30 grayscale">
                  <TrendingUp
                    className="mx-auto text-neutral-700 mb-4"
                    size={48}
                  />
                  <p className="text-neutral-500 font-mono text-xs uppercase tracking-widest">
                    Módulo de analítica bajo protocolo de encriptación_
                  </p>
                </div>
              )}
            </div>

            <footer className="p-8 bg-black/40 border-t border-neutral-800 text-center">
              <Button
                onClick={() => setSelectedStat(null)}
                className={s.submitBtn}
              >
                Cerrar_Terminal
              </Button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminControlPanel;

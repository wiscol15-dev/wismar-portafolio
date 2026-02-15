import { useState, useEffect } from "react";
import {
  Users,
  ShoppingBag,
  MessageSquare,
  TrendingUp,
  X,
  Trash2,
  ArrowUpRight,
  Loader2,
  ShieldAlert,
  CheckCircle2,
  Search,
  Ban,
  Globe,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/context/ProjectsContext";
import { db } from "@/firebase/config";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { s } from "./dashboard-styles";

const DashboardPage = () => {
  const { orders, deleteOrder, messages } = useProjects();
  const [selectedStat, setSelectedStat] = useState<string | null>(null);
  const [userCount, setUserCount] = useState<number>(0);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [systemLogs, setSystemLogs] = useState<any[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);

  useEffect(() => {
    const unsubUsers = onSnapshot(
      query(collection(db, "users"), orderBy("createdAt", "desc")),
      (snapshot) => {
        setRecentUsers(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        );
        setUserCount(snapshot.size);
        setLoadingUsers(false);
      },
      () => setLoadingUsers(false),
    );

    const unsubLogs = onSnapshot(
      query(
        collection(db, "security_logs"),
        orderBy("timestamp", "desc"),
        limit(10),
      ),
      (snapshot) => {
        setSystemLogs(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        );
        setLoadingLogs(false);
      },
      () => setLoadingLogs(false),
    );

    return () => {
      unsubUsers();
      unsubLogs();
    };
  }, []);

  const calculateConversion = () => {
    if (loadingUsers || userCount === 0) return "0%";
    return `${((orders.length / userCount) * 100).toFixed(1)}%`;
  };

  const stats = [
    {
      id: "presupuestos",
      name: "Presupuestos Totales",
      value: orders.length,
      icon: <ShoppingBag className="text-[#44d62c]" />,
      change: "Actualizado",
    },
    {
      id: "mensajes",
      name: "Mensajes Pendientes",
      value: messages.length,
      icon: <MessageSquare className="text-yellow-500" />,
      change: "Nuevo_Log",
    },
    {
      id: "usuarios",
      name: "Usuarios Registrados",
      value: loadingUsers ? "---" : userCount,
      icon: <Users className="text-blue-500" />,
      change: "Live_Data",
    },
    {
      id: "conversion",
      name: "Tasa de Conversión",
      value: loadingUsers ? "---" : calculateConversion(),
      icon: <TrendingUp className="text-[#44d62c]" />,
      change: "ROI_Optimizado",
    },
  ];

  return (
    <div className={s.main}>
      <div className={s.headerBox}>
        <div>
          <h1 className={s.mainTitle}>
            Sistema <span className="text-[#44d62c]">Administrativo</span>
          </h1>
          <p className={s.versionLabel}>
            // Nodo_Central_EU [Madeira_Core_v3.5]
          </p>
        </div>
      </div>

      <div className={s.statsGrid}>
        {stats.map((stat) => (
          <div
            key={stat.id}
            onClick={() => setSelectedStat(stat.id)}
            className={s.statCard}
          >
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={s.statIconBox}>{stat.icon}</div>
              <span className={s.statBadge}>{stat.change}</span>
            </div>
            <p className={s.statName}>{stat.name}</p>
            <div className="flex items-center gap-2 relative z-10">
              <p className={s.statValue}>{stat.value}</p>
              {loadingUsers &&
                (stat.id === "usuarios" || stat.id === "conversion") && (
                  <Loader2 size={14} className="animate-spin text-blue-500" />
                )}
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowUpRight size={14} className="text-[#44d62c]" />
            </div>
          </div>
        ))}
      </div>

      <div className={s.bottomGrid}>
        <section className={s.logsCard}>
          <h2 className={s.logsTitle}>
            <ShieldAlert className="text-[#44d62c]" size={20} />{" "}
            Auditoría_de_Sistemas
          </h2>
          <div className="space-y-3">
            {loadingLogs ? (
              <div className="flex justify-center p-10">
                <Loader2 className="animate-spin text-[#44d62c]" />
              </div>
            ) : systemLogs.length > 0 ? (
              systemLogs.map((log) => (
                <div key={log.id} className={s.logItem}>
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${log.status === "Success" ? "bg-[#44d62c]" : "bg-red-500"}`}
                    />
                    <div className="flex flex-col">
                      <span className={s.logAction}>{log.action}</span>
                      <span className={s.logUser}>
                        {log.user || "Nodo_Externo"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[8px] font-mono text-neutral-600 uppercase">
                      {log.timestamp?.toDate().toLocaleTimeString() ||
                        "Sincronizando..."}
                    </span>
                    <div className={s.logStatusBadge}>{log.status}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-[10px] font-mono text-neutral-600 uppercase py-10">
                // Sin registros
              </p>
            )}
          </div>
        </section>

        <section className={s.healthCard}>
          <div className={s.healthIconBg}>
            <Globe size={160} />
          </div>
          <h3 className={s.healthTitle}>
            <Zap size={14} className="text-[#44d62c]" /> Health_Check
          </h3>
          <div className="space-y-6 flex-1">
            <div className="space-y-2">
              <div className="flex justify-between text-[9px] font-mono uppercase text-neutral-500">
                <span>Database_Load</span>
                <span className="text-[#44d62c]">12%</span>
              </div>
              <div className={s.progressBar}>
                <div className="h-full bg-[#44d62c] w-[12%] animate-pulse" />
              </div>
            </div>
            <div className="pt-4 border-t border-neutral-800/50">
              <p className="text-[8px] font-mono text-neutral-600 uppercase tracking-widest leading-relaxed">
                // Host: Funchal_Core <br /> // Status: Operativo
              </p>
            </div>
          </div>
        </section>
      </div>

      {selectedStat && (
        <div className={s.modalOverlay}>
          <div className={s.modalContent}>
            <header className={s.modalHeader}>
              <h3 className="text-2xl font-black uppercase italic text-white">
                Data_<span className="text-[#44d62c]">{selectedStat}</span>
              </h3>
              <button
                onClick={() => setSelectedStat(null)}
                className="p-3 bg-black border border-neutral-800 rounded-2xl text-[#44d62c] hover:bg-neutral-800 transition-all"
              >
                <X size={20} />
              </button>
            </header>

            <div className={s.modalBody}>
              {selectedStat === "usuarios" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-black/40 p-4 rounded-2xl border border-neutral-800 mb-6">
                    <Search size={16} className="text-neutral-500" />
                    <input
                      type="text"
                      placeholder="Filtrar nodo..."
                      className="bg-transparent text-xs font-mono outline-none w-full text-white"
                    />
                  </div>
                  {recentUsers.map((user) => (
                    <div key={user.id} className={s.userItem}>
                      <div className="flex items-center gap-4">
                        <div className={s.userIconBox}>
                          <Globe size={20} />
                        </div>
                        <div>
                          <h4 className="text-white text-[11px] font-black uppercase">
                            {user.firstName} {user.lastName}
                          </h4>
                          <p className="text-[9px] font-mono text-neutral-600">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <button className="p-2 text-neutral-800 hover:text-red-500">
                        <Ban size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {selectedStat === "presupuestos" && (
                <div className="space-y-6">
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <article key={order.id} className={s.orderCard}>
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex gap-4 items-center">
                            <div className="p-4 bg-[#44d62c]/5 rounded-2xl border border-[#44d62c]/10 text-[#44d62c]">
                              <ShieldCheck size={20} />
                            </div>
                            <div>
                              <p className="text-[#44d62c] font-mono text-[9px] font-black tracking-[0.3em] mb-1">
                                {order.id} // {order.date}
                              </p>
                              <h4 className="text-white font-black uppercase text-xl italic">
                                {order.clientName || "Usuario_Legacy"}
                              </h4>
                              <p className="text-[10px] font-mono text-neutral-600 mt-1">
                                {order.clientEmail || "No_Email"}
                              </p>
                            </div>
                          </div>
                          <p className="text-white font-black text-2xl italic">
                            {order.totalAmount || "€0"}
                          </p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-neutral-900">
                          <p className="text-[8px] text-neutral-700 uppercase font-black tracking-[0.4em] mb-4">
                            Log_Servicios:
                          </p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {order.services?.map(
                              (service: any, idx: number) => (
                                <div key={idx} className={s.orderServiceItem}>
                                  <span className="text-[10px] font-bold text-neutral-400 uppercase">
                                    {service.name}
                                  </span>
                                  <span className="text-[9px] font-mono text-[#44d62c]">
                                    €{service.price}
                                  </span>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                        <div className="text-right flex justify-end gap-3 mt-6">
                          <button className="p-2 text-neutral-800 hover:text-[#44d62c]">
                            <CheckCircle2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="p-2 text-neutral-800 hover:text-red-500"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </article>
                    ))
                  ) : (
                    <p className="text-center font-mono text-[10px] text-neutral-600 uppercase py-10">
                      // Sin presupuestos
                    </p>
                  )}
                </div>
              )}
            </div>

            <footer className={s.modalFooter}>
              <Button
                onClick={() => setSelectedStat(null)}
                className="bg-[#44d62c] text-black font-black uppercase text-[10px] tracking-[0.2em] px-12 h-14 rounded-2xl border-0 shadow-[0_0_20px_rgba(68,214,44,0.2)]"
              >
                Cerrar_Terminal_Datos
              </Button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;

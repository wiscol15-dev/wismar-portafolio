import { useState, useEffect } from "react";
import { Outlet, Navigate, Link, useLocation, useNavigate } from "react-router";
import {
  LayoutDashboard,
  Settings,
  Database,
  LogOut,
  Globe,
  ChevronRight,
  Loader2,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AdminLoyaouts = () => {
  const { currentUser, logout, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [timestamp, setTimestamp] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(
      () => setTimestamp(new Date().toLocaleTimeString()),
      1000,
    );
    return () => clearInterval(timer);
  }, []);

  const isAdmin = currentUser?.email === "wiscol15@gmail.com";

  const handleLogout = async () => {
    try {
      navigate("/", { replace: true });

      setTimeout(async () => {
        await logout();
        console.log("SISTEMA: Terminal cerrada correctamente.");
      }, 100);
    } catch (error) {
      console.error("LOGOUT_CRITICAL_FAILURE:", error);
    }
  };

  if (loading)
    return (
      <div className="h-screen bg-black flex items-center justify-center font-mono italic">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="text-[#44d62c] animate-spin" size={40} />
          <span className="text-[#44d62c] text-[10px] tracking-[0.5em] animate-pulse uppercase">
            Sincronizando_Privilegios_EU...
          </span>
        </div>
      </div>
    );

  if (!isAdmin) return <Navigate to="/auth/login" replace />;

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <LayoutDashboard size={18} />,
    },
    {
      name: "Sistemas & Proyectos",
      path: "/admin/projects",
      icon: <Database size={18} />,
    },
    {
      name: "Protocolos",
      path: "/admin/settings",
      icon: <Settings size={18} />,
    },
  ];

  return (
    <div className="flex h-screen bg-[#050505] text-white font-mono overflow-hidden italic selection:bg-[#44d62c] selection:text-black">
      <aside className="w-72 border-r border-[#44d62c]/10 bg-black flex flex-col relative">
        <div className="absolute inset-y-0 right-0 w-[1px] bg-gradient-to-b from-transparent via-[#44d62c]/20 to-transparent" />

        <Link
          to="/"
          className="p-8 border-b border-neutral-900 bg-neutral-900/10 group hover:bg-[#44d62c]/5 transition-all duration-300 block text-center"
          title="Retornar a la Interfaz Pública"
        >
          <div className="font-black text-xl tracking-tighter group-hover:scale-105 transition-transform duration-300">
            <span className="text-[#44d62c] group-hover:text-white">&lt;</span>
            <span className="text-white group-hover:text-[#44d62c]">
              Wismar<span className="text-neutral-500">.Dev</span>
            </span>
            <span className="text-[#44d62c] group-hover:text-white">/&gt;</span>
          </div>
          <p className="text-[7px] text-neutral-600 uppercase tracking-[0.4em] mt-2 group-hover:text-[#44d62c]/60 transition-colors">
            // Nodo_Principal
          </p>
        </Link>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto mt-4">
          <p className="px-4 text-[8px] text-neutral-600 uppercase font-black mb-4 tracking-[0.3em]">
            Administración_Terminal
          </p>

          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center justify-between p-3 rounded-xl transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-[#44d62c]/10 text-[#44d62c] border border-[#44d62c]/20 shadow-[0_0_20px_rgba(68,214,44,0.05)]"
                  : "text-neutral-500 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-[10px] font-bold uppercase tracking-widest">
                  {item.name}
                </span>
              </div>
              {location.pathname === item.path && (
                <ChevronRight
                  size={14}
                  className="animate-in slide-in-from-left-2"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-neutral-900 bg-neutral-900/10">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-3 w-full p-4 rounded-xl text-red-500 bg-red-500/5 border border-red-500/10 hover:bg-red-500 hover:text-white transition-all font-black text-[10px] uppercase tracking-[0.2em]"
          >
            <LogOut size={16} /> Finalizar_Terminal
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-14 border-b border-neutral-900 bg-black/50 backdrop-blur-md flex items-center justify-between px-8 relative z-20">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <Globe size={14} className="text-[#44d62c]" />
              <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest">
                Network: <span className="text-white">W-DEV_BACKBONE</span>
              </span>
            </div>
          </div>
          <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest border-x border-neutral-800 px-6">
            {timestamp} <span className="text-[#44d62c]">GMT+1</span>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-8 relative">
          <div className="relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminLoyaouts;

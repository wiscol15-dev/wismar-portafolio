import { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import {
  Menu,
  X,
  User,
  ShieldCheck,
  LogOut,
  ShoppingCart,
  Languages,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { t, setLanguage, language } = useLanguage();

  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = () => {
    try {
      const savedCart = localStorage.getItem("funchal_marketplace_cart");
      if (savedCart) {
        const items = JSON.parse(savedCart);
        setCartCount(Array.isArray(items) ? items.length : 0);
      } else {
        setCartCount(0);
      }
    } catch (error) {
      setCartCount(0);
    }
  };

  useEffect(() => {
    updateCartCount();
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "funchal_marketplace_cart") updateCartCount();
    };
    window.addEventListener("storage", handleStorageChange);
    const interval = setInterval(updateCartCount, 1000);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
      navigate("/");
    } catch (error) {
      console.error("Error_Desconexión:", error);
    }
  };

  const navItems = [
    { name: t.nav.services, path: "/services" },
    { name: t.nav.projects, path: "/projects" },
    { name: t.nav.contact, path: "/contact" },
  ];

  const isAdmin = currentUser?.email === "wiscol15@gmail.com";
  const isMarketplaceActive = location.pathname === "/marketplace";

  return (
    <nav
      className="fixed top-0 w-full z-[100] border-b border-[#44d62c]/10 backdrop-blur-xl transition-all duration-500 italic selection:bg-[#44d62c] selection:text-black"
      aria-label="Navegación Principal"
    >
      <div
        className="absolute inset-0 bg-black/70 shadow-2xl"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">
        <Link
          to="/"
          onClick={() => setIsOpen(false)}
          className="font-black text-2xl tracking-tighter group transition-transform duration-300 active:scale-95 uppercase"
          aria-label="Ir a la página de inicio de Wismar.Dev"
        >
          <span
            className="text-[#44d62c] group-hover:text-white transition-colors"
            aria-hidden="true"
          >
            &lt;
          </span>
          <span className="text-white group-hover:text-[#44d62c] transition-colors">
            Wismar<span className="text-neutral-500">.Dev</span>
          </span>
          <span
            className="text-[#44d62c] group-hover:text-white transition-colors"
            aria-hidden="true"
          >
            /&gt;
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              aria-expanded={isLangOpen}
              aria-haspopup="listbox"
              aria-label="Seleccionar idioma"
              className="flex items-center gap-2 px-4 py-2 bg-neutral-900/50 border border-neutral-800 rounded-xl text-[10px] font-black uppercase tracking-widest text-neutral-400 hover:text-[#44d62c] hover:border-[#44d62c]/30 transition-all"
            >
              <Languages
                size={14}
                className="text-[#44d62c]"
                aria-hidden="true"
              />
              <span>Languages</span>
              <ChevronDown
                size={12}
                className={`transition-transform duration-300 ${isLangOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>

            {isLangOpen && (
              <ul
                className="absolute top-full mt-2 right-0 w-40 bg-black border border-neutral-800 rounded-2xl p-2 shadow-2xl animate-in fade-in zoom-in-95 z-[110]"
                role="listbox"
              >
                {[
                  { id: "es", name: "Español", flag: "ES" },
                  { id: "en", name: "English", flag: "US" },
                  { id: "pt", name: "Português", flag: "PT" },
                ].map((lang) => (
                  <li
                    key={lang.id}
                    role="option"
                    aria-selected={language === lang.id}
                  >
                    <button
                      onClick={() => {
                        setLanguage(lang.id);
                        setIsLangOpen(false);
                      }}
                      className={`w-full flex justify-between items-center px-4 py-3 rounded-xl text-[10px] font-bold uppercase transition-all ${language === lang.id ? "bg-[#44d62c]/10 text-[#44d62c]" : "text-neutral-500 hover:bg-neutral-900 hover:text-white"}`}
                    >
                      {lang.name}
                      <span
                        className="opacity-30 font-mono text-[8px]"
                        aria-hidden="true"
                      >
                        {lang.flag}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex items-center gap-4 border-r border-neutral-800 pr-6">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `px-5 py-2.5 rounded-2xl text-base font-black tracking-widest uppercase transition-all duration-300 border ${
                    isActive
                      ? "text-[#44d62c] border-[#44d62c] bg-[#44d62c]/10 shadow-[0_0_20px_rgba(68,214,44,0.1)]"
                      : "text-neutral-400 border-transparent hover:border-neutral-800 hover:text-white"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>

          <Link
            to="/marketplace"
            aria-label={`Ir al carrito, tienes ${cartCount} productos`}
            className={`relative p-3 rounded-2xl border transition-all duration-300 group ${
              isMarketplaceActive
                ? "text-[#44d62c] border-[#44d62c] bg-[#44d62c]/10"
                : "bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-white"
            }`}
          >
            <ShoppingCart
              size={24}
              className="group-hover:rotate-12 transition-transform"
              aria-hidden="true"
            />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#44d62c] text-black text-[11px] font-black w-6 h-6 flex items-center justify-center rounded-full animate-in zoom-in shadow-[0_0_20px_rgba(68,214,44,0.5)]">
                {cartCount}
              </span>
            )}
          </Link>

          {currentUser ? (
            <div className="flex items-center gap-6 pl-4 animate-in fade-in">
              {isAdmin && (
                <Link
                  to="/admin"
                  className="flex items-center gap-2 p-3 bg-[#44d62c]/10 border border-[#44d62c]/30 rounded-2xl text-[#44d62c] hover:bg-[#44d62c] hover:text-black transition-all group"
                  aria-label="Acceder al Panel de Administración Root"
                >
                  <ShieldCheck size={20} aria-hidden="true" />
                  <span className="text-[11px] font-black uppercase tracking-tighter">
                    ADMIN_ROOT
                  </span>
                </Link>
              )}
              <div className="flex flex-col items-end">
                <span className="text-[11px] font-mono text-white uppercase tracking-tighter">
                  {currentUser.displayName || "NODE_ACTIVE"}
                </span>
                <button
                  onClick={handleLogout}
                  aria-label="Cerrar sesión"
                  className="text-[9px] font-bold text-neutral-600 hover:text-red-500 uppercase mt-1 transition-colors"
                >
                  [ {t.nav.logout} ]
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="flex items-center gap-2 bg-white text-black hover:bg-[#44d62c] h-12 px-7 text-sm font-black uppercase rounded-2xl transition-all shadow-lg"
              aria-label="Iniciar sesión en la plataforma"
            >
              <User size={18} aria-hidden="true" /> {t.nav.login}
            </Link>
          )}
        </div>

        {/* Mobile Toggle & Icons */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            to="/marketplace"
            aria-label="Carrito de compras"
            className={`relative p-3 border rounded-2xl transition-all ${isMarketplaceActive ? "text-[#44d62c] border-[#44d62c]" : "bg-neutral-900/50 border-neutral-800 text-[#44d62c]"}`}
          >
            <ShoppingCart size={28} aria-hidden="true" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <button
            className="p-3 text-[#44d62c] bg-neutral-900/50 border border-neutral-800 rounded-2xl transition-all"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú de navegación"}
          >
            {isOpen ? (
              <X size={30} aria-hidden="true" />
            ) : (
              <Menu size={30} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-24 left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-[#44d62c]/20 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-8 space-y-4">
            <div
              className="grid grid-cols-3 gap-2 mb-4"
              role="group"
              aria-label="Selección de idioma móvil"
            >
              {["es", "en", "pt"].map((langId) => (
                <button
                  key={langId}
                  onClick={() => {
                    setLanguage(langId);
                    setIsOpen(false);
                  }}
                  aria-pressed={language === langId}
                  className={`py-3 rounded-xl border text-[10px] font-black uppercase ${language === langId ? "bg-[#44d62c] text-black border-[#44d62c]" : "bg-neutral-900 text-neutral-500 border-neutral-800"}`}
                >
                  {langId}
                </button>
              ))}
            </div>

            {navItems.map((item, idx) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-black uppercase tracking-[0.2em] flex items-center justify-between p-5 rounded-2xl border transition-all ${isActive ? "bg-[#44d62c] text-black border-[#44d62c]" : "bg-neutral-900/30 text-white border-neutral-800"}`
                }
              >
                <span>{item.name}</span>
                <span
                  className="text-xs font-mono opacity-50"
                  aria-hidden="true"
                >
                  0{idx + 1}
                </span>
              </NavLink>
            ))}

            <NavLink
              to="/marketplace"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-lg font-black uppercase tracking-[0.2em] flex items-center justify-between p-5 rounded-2xl border transition-all ${isActive ? "bg-[#44d62c] text-black border-[#44d62c]" : "bg-neutral-900/30 text-white border-neutral-800"}`
              }
            >
              <span>{t.nav.marketplace}</span>
              <ShoppingCart size={20} aria-hidden="true" />
            </NavLink>

            <div className="pt-6 border-t border-neutral-900">
              {currentUser ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full h-14 bg-red-600/10 text-red-500 border border-red-600/30 font-black uppercase text-sm rounded-2xl"
                >
                  <LogOut size={20} aria-hidden="true" />{" "}
                  {t.nav.logout.toUpperCase()}
                </button>
              ) : (
                <Link
                  to="/auth/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full h-16 bg-white text-black font-black uppercase rounded-2xl"
                >
                  <User size={22} aria-hidden="true" />{" "}
                  {t.nav.login.toUpperCase()}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

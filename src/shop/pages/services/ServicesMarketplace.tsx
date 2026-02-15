import { useState, useEffect } from "react";
import {
  ShoppingCart,
  ArrowLeft,
  Info,
  Crown,
  Terminal,
  Loader2,
  CheckCircle,
  Briefcase,
  Zap,
  Layers,
  Rocket,
  Database,
  BrainCircuit,
  CheckSquare,
  Square,
  Globe,
} from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/context/ProjectsContext";
import { useAuth } from "@/context/AuthContext";
import { useLanguage } from "@/context/LanguageContext";
import { db } from "@/firebase/config";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import MetaTags from "@/components/seo/MetaTags";
import { s } from "./marketplace-styles";

const ServicesMarketplace = () => {
  const { addOrder } = useProjects();
  const { currentUser } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<any[]>(() => {
    const savedCart = localStorage.getItem("funchal_marketplace_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("funchal_marketplace_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const servicesRef = collection(db, "marketplace_items");
    const q = query(servicesRef, orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const dynamicServices = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setServices(dynamicServices);
        setLoading(false);
      },
      (error) => {
        console.error("FALLO_AUDITORIA_MARKET:", error);
        setLoading(false);
      },
    );
    return () => unsubscribe();
  }, []);

  if (!t || !t.nav || !t.hero)
    return <LoadingScreen message="Sincronizando_Diccionarios_Sistemas..." />;

  const toggleService = (service: any) => {
    if (cart.find((s) => s.id === service.id))
      setCart(cart.filter((s) => s.id !== service.id));
    else setCart([...cart, service]);
  };

  const toggleSelectAll = () => {
    if (cart.length === services.length) setCart([]);
    else setCart([...services]);
  };

  const handleProcessOrder = async () => {
    if (!currentUser) {
      navigate("/auth/login");
      return;
    }
    setIsSyncing(true);
    try {
      const orderPayload = {
        clientName: currentUser.displayName || "Usuario_Anonimo",
        clientEmail: currentUser.email || "No_Email",
        totalAmount: `€${totalPrice.toLocaleString()}`,
        services: cart.map((s) => ({
          id: s.id,
          name: s.name,
          price: Number(s.price),
          category: s.category || "General",
        })),
      };
      await addOrder(orderPayload);
      setIsSyncing(false);
      setCart([]);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("ERROR_PROCESAMIENTO_NUBE:", error);
      setIsSyncing(false);
    }
  };

  const totalPrice = cart.reduce(
    (acc, curr) => acc + (Number(curr.price) || 0),
    0,
  );
  const isAllSelected = services.length > 0 && cart.length === services.length;
  const webServices = services.filter(
    (s) => s.category === "Web_Dev" || s.category === "Full_Stack",
  );
  const aiServices = services.filter(
    (s) =>
      s.category === "AI_UX" ||
      s.category === "Automation" ||
      s.category === "UI_UX",
  );

  if (loading)
    return <LoadingScreen message="Sincronizando_Nodos_Marketplace..." />;

  return (
    <>
      <MetaTags
        title="Marketplace"
        description={
          language === "es"
            ? "Configura tu próximo ecosistema digital..."
            : "Configure your next digital ecosystem..."
        }
      />

      <main className={s.main}>
        <div className={s.contentWrapper}>
          <header className={s.header}>
            <Link to="/" className={s.backLink}>
              <ArrowLeft size={14} /> [ {t.nav.projects.toUpperCase()} ]
            </Link>
            <div className={s.syncBadge}>
              <div className={s.syncIndicator} />
              <span className={s.syncText}>
                Persistencia: Cloud_Sync_Active
              </span>
            </div>
          </header>

          <div className={s.heroBox}>
            <h1 className={s.heroTitle}>
              <span className="flex items-center gap-4">
                <Crown className="text-[#44d62c]" size={60} /> {t.hero.inject}
              </span>{" "}
              <span className="text-[#44d62c]">{t.hero.power}</span>
            </h1>
            <p className={s.heroDesc}>{t.hero.description}</p>
          </div>

          <div className={s.layoutGrid}>
            <div className={s.servicesCol}>
              <section aria-labelledby="web-services-title">
                <div className={s.sectionTitleBox}>
                  <Layers className="text-[#44d62c]" size={32} />
                  <h2 id="web-services-title" className={s.sectionTitle}>
                    01. {t.services.web}
                  </h2>
                </div>
                <div className={s.cardGrid}>
                  {webServices.length > 0 ? (
                    webServices.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        isSelected={!!cart.find((s) => s.id === service.id)}
                        toggleService={toggleService}
                        expandedId={expandedId}
                        setExpandedId={setExpandedId}
                        labels={{
                          info: "Info",
                          hide: language === "en" ? "Hide" : "Ocultar",
                          add: language === "en" ? "Add" : "Añadir",
                          remove: language === "en" ? "Remove" : "Eliminar",
                        }}
                      />
                    ))
                  ) : (
                    <EmptyState message="Esperando Inyección Web_Core..." />
                  )}
                </div>
              </section>

              <section aria-labelledby="ai-services-title">
                <div className={s.sectionTitleBox}>
                  <BrainCircuit className="text-blue-500" size={32} />
                  <h2 id="ai-services-title" className={s.sectionTitle}>
                    02. {t.services.ai}
                  </h2>
                </div>
                <div className={s.cardGrid}>
                  {aiServices.length > 0 ? (
                    aiServices.map((service) => (
                      <ServiceCard
                        key={service.id}
                        service={service}
                        isSelected={!!cart.find((s) => s.id === service.id)}
                        toggleService={toggleService}
                        expandedId={expandedId}
                        setExpandedId={setExpandedId}
                        labels={{
                          info: "Info",
                          hide: language === "en" ? "Hide" : "Ocultar",
                          add: language === "en" ? "Add" : "Añadir",
                          remove: language === "en" ? "Remove" : "Eliminar",
                        }}
                      />
                    ))
                  ) : (
                    <EmptyState message="Esperando Células de IA..." />
                  )}
                </div>
              </section>
            </div>

            <aside className={s.sidebar}>
              <div className={s.sidebarBox}>
                {isSyncing && (
                  <div className={s.loadingOverlay}>
                    <Loader2
                      className="text-[#44d62c] animate-spin mb-4"
                      size={40}
                    />
                    <p className="text-[10px] font-mono text-[#44d62c] uppercase tracking-[0.3em]">
                      {language === "es"
                        ? "Transmitiendo_Orden..."
                        : "Transmitting_Order..."}
                    </p>
                  </div>
                )}
                <div className="flex justify-between items-center mb-6">
                  <h2 className={s.sidebarTitle}>
                    <ShoppingCart className="text-[#44d62c]" /> Config
                  </h2>
                  <button
                    onClick={toggleSelectAll}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] font-black uppercase transition-all ${isAllSelected ? "border-[#44d62c] text-[#44d62c] bg-[#44d62c]/10" : "border-neutral-800 text-neutral-500 hover:text-white"}`}
                  >
                    {isAllSelected ? (
                      <CheckSquare size={14} />
                    ) : (
                      <Square size={14} />
                    )}{" "}
                    {isAllSelected ? "Limpiar_Todo" : "Seleccionar_Todo"}
                  </button>
                </div>
                <div className="space-y-4 mb-10 min-h-[150px] max-h-[400px] overflow-y-auto custom-scrollbar">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 opacity-30">
                      <Briefcase size={40} className="mb-4" />
                      <p className="text-[10px] font-mono uppercase tracking-[0.2em]">
                        Memoria_Vacía
                      </p>
                    </div>
                  ) : (
                    cart.map((s) => (
                      <div
                        key={s.id}
                        className="flex justify-between items-center animate-in slide-in-from-right-2 border-b border-neutral-900/50 pb-2"
                      >
                        <span className="text-[11px] font-mono uppercase text-neutral-400 tracking-tighter truncate w-40">
                          _ {s.name}
                        </span>
                        <span className="text-[#44d62c] font-black text-xs">
                          €{Number(s.price).toLocaleString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>
                <div className="pt-8 border-t border-neutral-800">
                  <p className={s.totalText}>€{totalPrice.toLocaleString()}</p>
                  <Button
                    disabled={cart.length === 0 || isSyncing}
                    onClick={handleProcessOrder}
                    className={s.executeBtn}
                  >
                    <Rocket size={20} /> <Terminal size={18} />{" "}
                    {language === "es" ? "EJECUTAR_ORDEN" : "EXECUTE_ORDER"}
                  </Button>
                  <div className="flex items-center justify-center gap-3 mt-8">
                    <Globe className="text-neutral-700" size={14} />
                    <p className="text-[8px] font-mono text-neutral-600 uppercase tracking-widest italic">
                      Madeira_Node_v3.5
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>

        {showSuccessModal && (
          <div role="dialog" aria-modal="true" className={s.modalOverlay}>
            <div className={s.modalContent}>
              <CheckCircle className="text-[#44d62c] mx-auto mb-10" size={80} />
              <h3 className="text-4xl font-black uppercase italic text-white mb-6">
                {language === "es" ? "Orden Transmitida" : "Order Transmitted"}
              </h3>
              <p className="text-neutral-400 text-lg italic border-y border-neutral-800 py-6 mb-12">
                {language === "es"
                  ? "Protocolo completado. Datos verificados."
                  : "Protocol completed. Cloud data verified."}
              </p>
              <Button
                onClick={() => setShowSuccessModal(false)}
                className="bg-[#44d62c] text-black font-black uppercase tracking-[0.4em] px-16 h-16 rounded-full border-0 shadow-lg"
              >
                TERMINAR_
              </Button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

const ServiceCard = ({
  service,
  isSelected,
  toggleService,
  expandedId,
  setExpandedId,
  labels,
}: any) => {
  const isExpanded = expandedId === service.id;
  const isAI =
    service.category === "AI_UX" || service.category === "Automation";
  return (
    <article
      className={`${s.cardArticle} ${isSelected ? s.cardSelected : s.cardDefault}`}
    >
      <div className="p-8">
        <div className="flex justify-between items-start mb-8">
          <div
            className={`${s.iconBox} ${isSelected ? s.iconSelected : s.iconDefault}`}
          >
            {isAI ? <BrainCircuit size={24} /> : <Zap size={24} />}
          </div>
          <p className={s.priceText}>
            €{Number(service.price).toLocaleString()}
          </p>
        </div>
        <h3 className={s.serviceName}>{service.name}</h3>
        <p className={s.categoryLabel}>{service.category} // MOD_V3.5</p>
        <div className="flex gap-3">
          <Button
            variant="ghost"
            onClick={() => setExpandedId(isExpanded ? null : service.id)}
            className={`flex-1 h-12 rounded-2xl border text-[10px] font-black uppercase ${isExpanded ? "bg-white text-black border-white" : "border-neutral-800 text-neutral-500 hover:text-white"}`}
          >
            <Info size={14} className="mr-2" />{" "}
            {isExpanded ? labels.hide : labels.info}
          </Button>
          <Button
            onClick={() => toggleService(service)}
            className={`flex-1 h-12 rounded-2xl font-black text-[10px] uppercase border-0 shadow-lg ${isSelected ? "bg-red-600 text-white" : "bg-white text-black hover:bg-[#44d62c]"}`}
          >
            {isSelected ? labels.remove : labels.add}
          </Button>
        </div>
        {isExpanded && (
          <div className={s.expandedDesc}>
            <p className="text-sm text-neutral-300 leading-relaxed italic border-l border-[#44d62c] pl-6">
              {service.description || "Injecting asset telemetry..."}
            </p>
          </div>
        )}
      </div>
    </article>
  );
};

const LoadingScreen = ({ message }: { message: string }) => (
  <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono italic text-[#44d62c]">
    <Loader2 className="animate-spin mb-4" size={40} />
    <span className="text-[10px] uppercase tracking-[0.3em] animate-pulse">
      {message}
    </span>
  </div>
);

const EmptyState = ({ message }: { message: string }) => (
  <div className={s.emptyStateBox}>
    <Database size={40} className="mb-4 text-neutral-600" />
    <p className="text-[10px] font-mono uppercase tracking-[0.5em]">
      {message}
    </p>
  </div>
);

export default ServicesMarketplace;

import { useState, useEffect } from "react";
import {
  Shield,
  Save,
  Wifi,
  AlertTriangle,
  Briefcase,
  ShoppingBag,
  Plus,
  Trash2,
  Edit3,
  DollarSign,
  Loader2,
  BrainCircuit,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/firebase/config";
import { useAuth } from "@/context/AuthContext";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { s } from "./admin-settings-styles";

const AdminSettingsPage = () => {
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.email === "wiscol15@gmail.com";

  const [siteData, setSiteData] = useState({
    profileName: "Wismar.DEV",
    profileTitle: "Full Stack Engineer",
    profileBio: "Construyendo la infraestructura digital del futuro.",
    marketplaceHero: "Soluciones Digitales de Alto Rendimiento",
    maintenanceMode: false,
  });

  const [marketItems, setMarketItems] = useState<any[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [newItem, setNewItem] = useState({
    name: "",
    price: "",
    category: "Web_Dev",
    description: "",
  });

  useEffect(() => {
    const q = query(
      collection(db, "marketplace_items"),
      orderBy("timestamp", "desc"),
    );
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setMarketItems(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        );
        setLoadingItems(false);
      },
      (error) => {
        console.error("FALLO_AUDITORIA:", error);
        setLoadingItems(false);
      },
    );
    return () => unsubscribe();
  }, []);

  const handleProcessItem = async () => {
    if (!isAdmin) return alert("ACCESO_DENEGADO: No tienes permisos Root.");
    if (!newItem.name || !newItem.price || !newItem.description)
      return alert("ERROR: Parámetros incompletos.");

    try {
      if (editingId) {
        await updateDoc(doc(db, "marketplace_items", editingId), {
          ...newItem,
          price: Number(newItem.price),
          lastUpdate: serverTimestamp(),
        });
        setEditingId(null);
      } else {
        await addDoc(collection(db, "marketplace_items"), {
          ...newItem,
          price: Number(newItem.price),
          timestamp: serverTimestamp(),
        });
      }
      setNewItem({ name: "", price: "", category: "Web_Dev", description: "" });
    } catch (error) {
      console.error("FALLO_NUBE:", error);
    }
  };

  const startEditing = (item: any) => {
    setEditingId(item.id);
    setNewItem({
      name: item.name,
      price: item.price.toString(),
      category: item.category,
      description: item.description,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteMarketItem = async (id: string) => {
    if (!isAdmin || !confirm("¿Confirmar purga definitiva?")) return;
    try {
      await deleteDoc(doc(db, "marketplace_items", id));
    } catch (error) {
      console.error("FALLO_PURGA:", error);
    }
  };

  const handleSaveSettings = () =>
    alert("NÚCLEO ACTUALIZADO: Cambios propagados.");

  if (!isAdmin) {
    return (
      <div className={s.deniedWrapper}>
        <Shield size={64} className="text-red-600 mb-6 animate-pulse" />
        <h1 className={s.deniedTitle}>Acceso Restringido</h1>
        <p className="text-neutral-500 font-mono text-xs mt-2 uppercase tracking-widest">
          // Solo administrador Root.
        </p>
      </div>
    );
  }

  return (
    <div className={s.main}>
      <header className={s.header}>
        <div>
          <h1 className={s.titleH1}>
            CENTRO <span className="text-[#44d62c]">DE_MANDO</span>
          </h1>
          <p className={s.versionSub}>
            // Nodo_Funchal: Gestión de Activos Críticos
          </p>
        </div>
        <div className={s.statusBadge}>
          <Wifi size={14} className="text-[#44d62c] animate-pulse" />
          <span className="text-[10px] font-mono font-bold uppercase text-neutral-400">
            Status: Sincronizado
          </span>
        </div>
      </header>

      <div className={s.layoutGrid}>
        <main className={s.mainCol}>
          <section className={s.editorCard}>
            <div className="flex justify-between items-center mb-8 relative z-10">
              <h2 className={s.editorTitle}>
                <ShoppingBag
                  className={editingId ? "text-blue-500" : "text-[#44d62c]"}
                  size={22}
                />
                {editingId ? "Modificar_Activo" : "Gestión_de_Activos"}
              </h2>
              {editingId && (
                <button
                  onClick={() => {
                    setEditingId(null);
                    setNewItem({
                      name: "",
                      price: "",
                      category: "Web_Dev",
                      description: "",
                    });
                  }}
                  className={s.cancelBtn}
                >
                  <X size={14} /> Cancelar_Edición
                </button>
              )}
            </div>

            <div
              className={`${s.formContainer} ${editingId ? "border-blue-500/50" : "border-neutral-800 border-dashed"}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className={s.label}>Identificador_Servicio</label>
                  <input
                    type="text"
                    placeholder="Ej: Landing_Elite"
                    value={newItem.name}
                    onChange={(e) =>
                      setNewItem({ ...newItem, name: e.target.value })
                    }
                    className={s.input}
                  />
                </div>
                <div className="space-y-2">
                  <label className={s.label}>Precio_Adquisición</label>
                  <div className="relative">
                    <DollarSign
                      className="absolute left-3 top-3 text-neutral-700"
                      size={14}
                    />
                    <input
                      type="number"
                      placeholder="500"
                      value={newItem.price}
                      onChange={(e) =>
                        setNewItem({ ...newItem, price: e.target.value })
                      }
                      className={`${s.input} pl-10`}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className={s.label}>Categoría_Nodo</label>
                  <select
                    value={newItem.category}
                    onChange={(e) =>
                      setNewItem({ ...newItem, category: e.target.value })
                    }
                    className={s.select}
                  >
                    <option value="Web_Dev">01. Web_Development</option>
                    <option value="Full_Stack">02. Full_Stack_Core</option>
                    <option value="AI_UX">03. AI_Expansion</option>
                    <option value="Automation">04. AI_Automation</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className={s.label}>Descripción_Persuasiva</label>
                <textarea
                  placeholder="Redacta el impacto técnico aquí..."
                  value={newItem.description}
                  onChange={(e) =>
                    setNewItem({ ...newItem, description: e.target.value })
                  }
                  className={s.textarea}
                />
              </div>

              <Button
                onClick={handleProcessItem}
                className={`${s.submitBtn} ${editingId ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-white text-black hover:bg-[#44d62c]"}`}
              >
                {editingId ? <Edit3 size={18} /> : <Plus size={18} />}
                {editingId
                  ? "ACTUALIZAR_DATOS_ACTIVO"
                  : "INYECTAR_ACTIVO_EN_NUBE"}
              </Button>
            </div>

            <div className="space-y-4">
              {loadingItems ? (
                <div className="flex justify-center p-10">
                  <Loader2 className="animate-spin text-[#44d62c]" />
                </div>
              ) : (
                marketItems.map((item) => (
                  <article key={item.id} className={s.itemCard}>
                    <div className="flex items-center gap-6">
                      <div className={s.itemIconBox}>
                        {item.category.includes("AI") ? (
                          <BrainCircuit size={22} />
                        ) : (
                          <Briefcase size={22} />
                        )}
                      </div>
                      <div>
                        <h4 className={s.itemName}>{item.name}</h4>
                        <p className={s.itemSub}>
                          {item.category} // ID_{item.id.slice(-5)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <p className={s.itemPrice}>${item.price}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => startEditing(item)}
                          className="p-3 text-neutral-800 hover:text-blue-500 transition-colors"
                        >
                          <Edit3 size={18} />
                        </button>
                        <button
                          onClick={() => deleteMarketItem(item.id)}
                          className="p-3 text-neutral-800 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </main>

        <aside className={s.sideCol}>
          <section className={s.sidebarCard}>
            <h2 className="text-xs font-black uppercase text-neutral-500 mb-8 flex items-center gap-2 tracking-[0.2em]">
              <Shield size={16} className="text-[#44d62c]" /> Seguridad_Funchal
            </h2>
            <div className={s.toggleBox}>
              <div className="flex items-center gap-4">
                <AlertTriangle size={20} className="text-yellow-500" />
                <span className="text-[11px] font-black uppercase text-white tracking-tighter">
                  Mantenimiento
                </span>
              </div>
              <input
                type="checkbox"
                checked={siteData.maintenanceMode}
                onChange={(e) =>
                  setSiteData({
                    ...siteData,
                    maintenanceMode: e.target.checked,
                  })
                }
                className={s.toggleSwitch}
              />
            </div>
          </section>

          <section className={s.syncWrapper}>
            <div className={s.syncInner}>
              <h2 className={s.syncTitle}>Sincronizar Nodo_</h2>
              <Button onClick={handleSaveSettings} className={s.syncBtn}>
                <Save size={24} /> EJECUTAR_PROTOCOLOS
              </Button>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
};

export default AdminSettingsPage;

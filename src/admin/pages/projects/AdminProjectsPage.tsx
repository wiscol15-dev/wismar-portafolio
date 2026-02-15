import { useState } from "react";
import {
  Trash2,
  Save,
  Layers,
  Code2,
  Edit3,
  X,
  Github,
  ExternalLink,
  Database,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/context/ProjectsContext";
import { s } from "./admin-projects-styles";
import MetaTags from "@/components/seo/MetaTags";

const AdminProjectsPage = () => {
  const { projects, addProject, deleteProject } = useProjects();

  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    tech: "",
    image: "",
    description: "",
    category: "Web_App",
    link: "",
    github: "",
  });

  const startEditing = (proj: any) => {
    setEditingId(proj.id);
    setFormData({
      title: proj.title,
      tech: proj.tech.join(", "),
      image: proj.image,
      description: proj.description,
      category: proj.category || "Web_App",
      link: proj.link || "",
      github: proj.github || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: "",
      tech: "",
      image: "",
      description: "",
      category: "Web_App",
      link: "",
      github: "",
    });
  };

  const handleSave = async () => {
    if (!formData.title || !formData.tech)
      return alert("ERROR: Parámetros críticos del sistema incompletos.");

    const projectPayload = {
      ...formData,
      tech: formData.tech.split(",").map((t) => t.trim()),
    };

    if (editingId) {
      await deleteProject(editingId);
      await addProject(projectPayload);
      setEditingId(null);
    } else {
      await addProject(projectPayload);
    }
    handleCancelEdit();
  };

  return (
    <div className={s.main}>
      {/* PROTOCOLO SEO ADMINISTRATIVO */}
      <MetaTags
        title="Gestión de Proyectos"
        description="Consola de administración para la gestión de activos y proyectos del portafolio."
      />

      {/* HEADER TÉCNICO */}
      <header className={s.header}>
        <div>
          <h1 className={s.titleH1}>Terminal_Project_Manager</h1>
          <p className={s.subtitle}>
            // Nodo_Funchal: Gestión de Activos de Portafolio
          </p>
        </div>
        <div className={s.countBadge}>
          <Database
            size={14}
            className="text-[#44d62c] animate-pulse"
            aria-hidden="true"
          />
          <span className={s.countText}>{projects.length} Nodos_Live</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <section
          className={`${s.editorCard} ${editingId ? s.editorEditMode : s.editorAddMode}`}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className={s.editorTitle}>
              {editingId ? (
                <Edit3 className="text-blue-500" size={18} aria-hidden="true" />
              ) : (
                <Layers
                  className="text-[#44d62c]"
                  size={18}
                  aria-hidden="true"
                />
              )}
              {editingId ? "Modificar_Nodo" : "Inyectar_Nuevo_Nodo"}
            </h2>
            {editingId && (
              <button
                onClick={handleCancelEdit}
                className={s.cancelBtn}
                aria-label="Cancelar edición actual"
              >
                <X size={12} aria-hidden="true" /> CANCELAR
              </button>
            )}
          </div>

          <div className="space-y-5">
            <div className="space-y-1">
              <label htmlFor="proj-title" className={s.label}>
                Identificador_Título
              </label>
              <input
                id="proj-title"
                className={s.input}
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="proj-tech" className={s.label}>
                Stack_Tecnológico (Separado por coma)
              </label>
              <input
                id="proj-tech"
                className={s.input}
                value={formData.tech}
                onChange={(e) =>
                  setFormData({ ...formData, tech: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label htmlFor="proj-link" className={s.label}>
                  Demo_Link
                </label>
                <input
                  id="proj-link"
                  className={s.input}
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <label htmlFor="proj-github" className={s.label}>
                  GitHub_Repo
                </label>
                <input
                  id="proj-github"
                  className={s.input}
                  value={formData.github}
                  onChange={(e) =>
                    setFormData({ ...formData, github: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-1">
              <label htmlFor="proj-image" className={s.label}>
                Asset_Visual (URL_Image)
              </label>
              <input
                id="proj-image"
                className={s.input}
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="proj-desc" className={s.label}>
                Documentación_Sistema
              </label>
              <textarea
                id="proj-desc"
                className={s.textarea}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <Button
              onClick={handleSave}
              aria-label={
                editingId
                  ? "Guardar cambios en el proyecto"
                  : "Publicar nuevo proyecto"
              }
              className={`w-full h-14 font-black uppercase tracking-widest rounded-2xl border-0 shadow-lg transition-all ${editingId ? "bg-blue-600 text-white hover:bg-blue-500" : "bg-[#44d62c] text-black hover:bg-[#3ec428]"}`}
            >
              {editingId ? (
                <Terminal size={18} className="mr-2" aria-hidden="true" />
              ) : (
                <Save size={18} className="mr-2" aria-hidden="true" />
              )}
              {editingId ? "Actualizar_Registro" : "Ejecutar_Compilación"}
            </Button>
          </div>
        </section>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 content-start">
          {projects.map((proj) => (
            <article key={proj.id} className={s.projectCard}>
              <div className="flex justify-between items-start mb-6">
                <div className={s.cardIconBox} aria-hidden="true">
                  <Code2 size={20} />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(proj)}
                    className={s.btnEdit}
                    aria-label={`Editar proyecto ${proj.title}`}
                  >
                    <Edit3 size={18} />
                  </button>
                  <button
                    onClick={() => deleteProject(proj.id)}
                    className={s.btnDelete}
                    aria-label={`Eliminar proyecto ${proj.title}`}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="font-black text-white uppercase italic text-lg tracking-tighter mb-2 group-hover:text-[#44d62c] transition-colors">
                  {proj.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.tech.map((t: string, i: number) => (
                    <span key={i} className={s.techTag}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className={s.cardImgWrapper}>
                  <img
                    src={proj.image}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    alt={`Previsualización de ${proj.title}`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
                    <div className="flex gap-3">
                      {proj.github && (
                        <Github
                          size={14}
                          className="text-neutral-400 hover:text-white"
                          aria-label="Enlace a GitHub"
                        />
                      )}
                      {proj.link && (
                        <ExternalLink
                          size={14}
                          className="text-neutral-400 hover:text-white"
                          aria-label="Enlace a Demo en vivo"
                        />
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-neutral-600 line-clamp-2 italic leading-relaxed">
                  {proj.description}
                </p>
              </div>
            </article>
          ))}
          {projects.length === 0 && (
            <div className={s.emptyState} role="status">
              <Database size={48} className="mb-4" aria-hidden="true" />
              <p className="uppercase text-[10px] tracking-[0.4em]">
                Esperando_Inyección_de_Datos
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProjectsPage;

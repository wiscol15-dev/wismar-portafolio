import { useEffect, useRef, useState } from "react";
import {
  Layers,
  ArrowRight,
  Github,
  ExternalLink,
  Code2,
  Database,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/context/ProjectsContext";
import { useLanguage } from "@/context/LanguageContext";
import MetaTags from "@/components/seo/MetaTags";
import { s } from "./projects-styles";

import { db } from "@/firebase/config";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

const NeuralBackground = () => (
  <div className={s.neuralBg} aria-hidden="true">
    <div className={s.patternOverlay} />
    <div className={s.glowCenter} />
    <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-[#44d62c]/10 rounded-full blur-[120px] animate-blob" />
    <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-[#44d62c]/5 rounded-full blur-[150px] animate-blob animation-delay-2000" />
  </div>
);

const ScrollReveal = ({
  children,
  direction = "bottom",
  delay = "0",
  className = "",
}: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const animations = {
    bottom: "animate-in slide-in-from-bottom-32 fade-in zoom-in-95",
    top: "animate-in slide-in-from-top-32 fade-in zoom-in-95",
    left: "animate-in slide-in-from-left-32 fade-in zoom-in-95",
    right: "animate-in slide-in-from-right-32 fade-in zoom-in-95",
  };

  return (
    <div
      ref={ref}
      className={`${className} duration-1000 ease-&lsqb;cubic-bezier(0.23,1,0.32,1)&rsqb; ${isVisible ? `${animations[direction as keyof typeof animations]} opacity-100` : "opacity-0"}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
};

const ProjectCard = ({
  title,
  category,
  description,
  tech,
  link,
  github,
  image,
  index,
}: any) => {
  const delay = `${index * 150}ms`;
  return (
    <ScrollReveal direction={index % 2 === 0 ? "left" : "right"} delay={delay}>
      <article className={s.cardWrapper}>
        <div className={s.imageContainer}>
          <div className="absolute inset-0 bg-gradient-to-t from-black z-10 opacity-60" />
          <img
            src={image}
            alt={`Vista previa del proyecto: ${title}`}
            className={s.cardImage}
            loading="lazy"
          />
          <div className={s.categoryBadge}>
            <Code2 size={12} aria-hidden="true" /> {category || "Software_Node"}
          </div>
        </div>
        <div className="p-8">
          <h3 className={s.cardTitle}>{title}</h3>
          <p className={s.cardDesc}>"{description}"</p>
          <div className="flex flex-wrap gap-2 mb-10">
            {tech.map((t: string) => (
              <span key={t} className={s.techTag}>
                {t}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className={s.btnGithub} asChild>
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver código fuente de ${title} en GitHub`}
              >
                <Github size={16} className="mr-2" aria-hidden="true" />{" "}
                Source_Code
              </a>
            </Button>
            <Button className={s.btnLive} asChild>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Lanzar aplicación en vivo de ${title}`}
              >
                <ExternalLink size={16} className="mr-2" aria-hidden="true" />{" "}
                Launch_Live
              </a>
            </Button>
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
};

const ProjectsPage = () => {
  const { projects: contextProjects } = useProjects();
  const { t, language } = useLanguage();

  const [publicProjects, setPublicProjects] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    const fetchPublicData = async () => {
      if (contextProjects && contextProjects.length > 0) {
        setPublicProjects(contextProjects);
        setIsSyncing(false);
        return;
      }

      try {
        const q = query(collection(db, "projects"), orderBy("title", "asc"));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPublicProjects(data);
      } catch (error) {
        console.error("FALLO_RECUPERACION_PUBLICA:", error);
      } finally {
        setIsSyncing(false);
      }
    };

    fetchPublicData();
  }, [contextProjects]);

  if (!t || !t.projects || isSyncing) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono text-[#44d62c]">
        <Loader2 className="animate-spin mb-4" size={40} />
        <span className="text-[10px] uppercase tracking-[0.5em] animate-pulse">
          Sincronizando_Galeria...
        </span>
      </div>
    );
  }

  return (
    <div className={s.main}>
      <MetaTags
        title="Proyectos & Sistemas"
        description={
          language === "es"
            ? "Repositorio de activos digitales y ecosistemas de alto rendimiento desarrollados por Wismar D. Colmenares."
            : "Repository of digital assets developed by Wismar D. Colmenares."
        }
      />

      <NeuralBackground />

      <main className={s.contentWrapper}>
        <div className={s.headerBox}>
          <ScrollReveal direction="left">
            <span className={s.repoLabel}>
              <Database size={14} aria-hidden="true" /> Repositorio_Central_v2.0
            </span>
            <h1 className={s.mainTitle}>
              {t.nav.projects} <span className="text-[#44d62c]">_</span>
            </h1>
            <p className={s.description}>
              {t.projects.title}. {t.hero.description}
            </p>
          </ScrollReveal>
        </div>

        <div className={s.grid}>
          {publicProjects.length > 0 ? (
            publicProjects.map((project, index) => (
              <ProjectCard key={project.id} {...project} index={index} />
            ))
          ) : (
            <div className={s.emptyState}>
              <Layers
                size={48}
                className="mx-auto text-neutral-800 mb-6 animate-pulse"
                aria-hidden="true"
              />
              <p className="text-neutral-600 font-mono text-xs uppercase tracking-widest">
                // No_Assets_Detected_In_Cloud
              </p>
            </div>
          )}
        </div>

        <ScrollReveal direction="top">
          <div className={s.ctaWrapper}>
            <div className={s.ctaInner}>
              <div className="absolute top-0 left-0 w-full h-1 bg-[#44d62c] group-hover:animate-pulse transition-all" />
              <h2 className={s.ctaTitle}>
                {t.contact.title.split(" ")[0]}{" "}
                <span className="text-[#44d62c]">Siguiente_Despliegue</span>?
              </h2>
              <Button className={s.ctaBtn} asChild>
                <a href="/contact" aria-label="Ir a la página de contacto">
                  {t.contact.send}{" "}
                  <ArrowRight className="ml-3" aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </main>
    </div>
  );
};

export default ProjectsPage;

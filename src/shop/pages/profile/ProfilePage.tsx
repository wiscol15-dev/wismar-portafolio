import { useEffect, useState } from "react";
import {
  Briefcase,
  Cpu,
  ArrowLeft,
  Github,
  Linkedin,
  Terminal,
  Download,
  Globe,
  GraduationCap,
  ExternalLink,
  ShieldCheck,
  Languages,
  Map,
  Flag,
  Loader2,
} from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import perfil2 from "@/assets/perfil2.webp";
import MetaTags from "@/components/seo/MetaTags";
import { s } from "./profile-styles";

const ProfilePage = () => {
  const { t, language } = useLanguage();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!t || !t.profile) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-[#44d62c]" />
      </div>
    );
  }

  const experience = [
    {
      year: "2025 — Present",
      role:
        language === "en"
          ? "Freelance Web Architect"
          : language === "pt"
            ? "Arquiteto Web Freelance"
            : "Arquitecto Web Freelance",
      company: "Funchal Hub",
      desc:
        language === "en"
          ? "Leading the development of reactive platforms and Full-Stack ecosystems."
          : "Liderando el desarrollo de plataformas reactivas y ecosistemas Full-Stack.",
    },
    {
      year: "2023 — 2024",
      role: "Frontend Developer",
      company: "Solvex Dominicana",
      desc:
        language === "en"
          ? "Engineering corporate interfaces and data flow optimization."
          : "Ingeniería de interfaces corporativas y optimización de flujos de datos.",
    },
    {
      year: "2020 — 2023",
      role:
        language === "en"
          ? "Software Support Specialist"
          : "Software Support Specialist",
      company: "Xtudia SRL",
      desc:
        language === "en"
          ? "Critical infrastructure maintenance and operational data systems support."
          : "Mantenimiento de infraestructuras críticas y soporte de sistemas de gestión de datos.",
    },
  ];

  return (
    <>
      <MetaTags
        title="Perfil Profesional"
        description={
          language === "es"
            ? "Explora la trayectoria técnica y certificaciones de Wismar D. Colmenares B., especialista en arquitecturas React y ecosistemas Full-Stack."
            : "Explore the professional trajectory and certifications of Wismar D. Colmenares B., specialist in React architectures and Full-Stack ecosystems."
        }
      />

      <main className={s.main}>
        <style>{`@keyframes cpuBreath { 0%, 100% { opacity: 0.1; filter: drop-shadow(0 0 5px #44d62c); } 50% { opacity: 0.5; filter: drop-shadow(0 0 45px #44d62c); } } .cpu-animate { animation: cpuBreath 4s ease-in-out infinite; }`}</style>

        <div className={s.ambientWrapper}>
          <div className={s.ambientGrid} />
          <div className={s.ambientGlow} />
        </div>

        <div
          className={`max-w-7xl mx-auto relative z-10 transition-all duration-1000 transform ${isMounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          <header>
            <Link to="/" className={s.backLink} aria-label="Volver al inicio">
              <div className={s.backIconBox}>
                <ArrowLeft
                  size={14}
                  className="group-hover:-translate-x-1 transition-transform"
                />
              </div>
              TERMINAL_DEPARTURE
            </Link>
          </header>

          <section className={s.bentoContainer}>
            <div className={s.bentoGrid}>
              <div className={s.imgCol}>
                <img
                  src={perfil2}
                  alt="Wismar D. Colmenares B. - Full Stack Systems Engineer"
                  loading="eager"
                  fetchPriority="high"
                  width="600"
                  height="600"
                  className={s.profileImg}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-10 z-20">
                  <div className={s.identityBadge}>
                    <ShieldCheck size={12} /> IDENTITY_SECURED
                  </div>
                  <h2 className={s.nameTitle}>
                    Wismar D. <br /> Colmenares B.
                  </h2>
                  <div className="flex items-center gap-2 text-[#44d62c] font-mono text-[9px] uppercase tracking-widest">
                    <span className="w-2 h-2 bg-[#44d62c] rounded-full animate-pulse" />{" "}
                    Madeira_Node // Core_v3.5
                  </div>
                </div>
              </div>

              <div className={s.infoCol}>
                <div
                  className="absolute top-10 right-10 pointer-events-none rotate-12 cpu-animate"
                  aria-hidden="true"
                >
                  <Cpu size={220} className="text-[#44d62c]" />
                </div>
                <div className={s.settingsBadge}>
                  <Terminal size={14} /> {t.profile.settings}
                </div>
                <h1 className={s.mainTitle}>
                  {t.profile.title.split(" ")[0]} <br />
                  <span className="text-[#44d62c]">
                    {t.profile.title.split(" ")[1]}
                  </span>
                </h1>
                <p className={s.bioText}>{t.profile.bio}</p>
                <div className="flex flex-wrap gap-5">
                  <Button
                    className={s.exportBtn}
                    aria-label="Descargar currículum"
                  >
                    <Download className="mr-3" size={18} /> EXPORT_CV_DATA
                  </Button>
                  <nav className="flex gap-3">
                    <a
                      href="https://linkedin.com/in/wismar-colmenares/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={s.socialLink}
                      aria-label="Conectar en LinkedIn"
                    >
                      <Linkedin size={22} />
                    </a>
                    <a
                      href="https://github.com/wiscol15-dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={s.socialLink}
                      aria-label="Ver repositorios en GitHub"
                    >
                      <Github size={22} />
                    </a>
                  </nav>
                </div>
              </div>
            </div>
          </section>

          <div className={s.techGrid}>
            <section className={s.techCard}>
              <Map
                className="absolute -right-8 -bottom-8 size-40 text-[#44d62c] opacity-[0.03] group-hover:rotate-12 transition-transform duration-700"
                aria-hidden="true"
              />
              <div className="flex items-center gap-3 mb-10">
                <div
                  className={`${s.techIconBox} bg-[#44d62c]/10 text-[#44d62c] border-[#44d62c]/20`}
                >
                  <Globe size={20} />
                </div>
                <h3 className="text-lg font-black uppercase italic tracking-tighter">
                  Geo_Location
                </h3>
              </div>
              <div className="space-y-6">
                <article className="p-6 rounded-2xl bg-black border border-neutral-800 group-hover:border-[#44d62c]/30 transition-all">
                  <p className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest mb-1">
                    {t.profile.origin.split(":")[0]}
                  </p>
                  <p className="text-xl font-bold flex items-center gap-2">
                    Venezuela{" "}
                    <Flag
                      size={14}
                      className="text-neutral-500"
                      aria-hidden="true"
                    />
                  </p>
                </article>
                <article className="p-6 rounded-2xl bg-black border border-neutral-800 group-hover:border-[#44d62c]/30 transition-all">
                  <p className="text-[9px] font-mono text-neutral-600 uppercase tracking-widest mb-1">
                    {t.profile.current.split(":")[0]}
                  </p>
                  <p className="text-xl font-bold">Funchal, Madeira, PT</p>
                </article>
                <div className="p-6 rounded-2xl bg-[#44d62c]/5 border border-[#44d62c]/20">
                  <p className="text-[9px] font-mono text-[#44d62c] uppercase tracking-widest mb-1">
                    Legal_Status
                  </p>
                  <p className="text-sm font-black uppercase italic">
                    {t.profile.status}
                  </p>
                </div>
              </div>
            </section>

            <section className={s.techCard}>
              <div className="flex items-center gap-3 mb-10">
                <div
                  className={`${s.techIconBox} bg-blue-500/10 text-blue-500 border-blue-500/20`}
                >
                  <Languages size={20} />
                </div>
                <h3 className="text-lg font-black uppercase italic tracking-tighter">
                  Language_Cores
                </h3>
              </div>
              <div className="space-y-8">
                {[
                  {
                    lang: language === "es" ? "Español" : "Spanish",
                    level: "Native",
                    progress: "w-full",
                    color: "bg-[#44d62c]",
                  },
                  {
                    lang: language === "es" ? "Portugués" : "Portuguese",
                    level: "B2 Upper Intermediate",
                    progress: "w-[80%]",
                    color: "bg-blue-500",
                  },
                  {
                    lang: language === "es" ? "Inglés" : "English",
                    level: "B1 Intermediate",
                    progress: "w-[60%]",
                    color: "bg-neutral-500",
                  },
                ].map((l, i) => (
                  <article key={i} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <h4 className="font-bold uppercase tracking-tighter">
                        {l.lang}
                      </h4>
                      <span className="text-[9px] font-mono text-neutral-500 uppercase">
                        {l.level}
                      </span>
                    </div>
                    <div
                      className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden"
                      role="progressbar"
                      aria-valuenow={
                        l.lang === "Spanish"
                          ? 100
                          : l.lang === "Portuguese"
                            ? 80
                            : 60
                      }
                      aria-valuemin={0}
                      aria-valuemax={100}
                    >
                      <div
                        className={`h-full ${l.color} ${l.progress} rounded-full transition-all duration-1000 opacity-70`}
                      />
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className={s.techCard}>
              <div className="flex items-center gap-3 mb-10">
                <div
                  className={`${s.techIconBox} bg-yellow-500/10 text-yellow-500 border-yellow-500/20`}
                >
                  <GraduationCap size={20} />
                </div>
                <h3 className="text-lg font-black uppercase italic tracking-tighter">
                  Academic_Payload
                </h3>
              </div>
              <div className="space-y-4">
                <article className="p-5 rounded-2xl bg-black border border-neutral-800 flex flex-col transition-all hover:border-[#44d62c]/30">
                  <p className="text-[#44d62c] text-[8px] font-mono uppercase font-black mb-1 italic">
                    HighSchool_Diploma
                  </p>
                  <h4 className="text-white font-bold text-[11px] uppercase tracking-tighter">
                    {t.profile.highschool}
                  </h4>
                </article>
                {[
                  {
                    title: "React: Cero a Experto",
                    url: "https://www.udemy.com/certificate/UC-4710d9a9-2aab-47f1-a438-062ae38256ce/",
                  },
                  {
                    title: "JavaScript Moderno",
                    url: "https://www.udemy.com/certificate/UC-04cf64bd-ff56-493c-ab0b-993ef4ccb539/",
                  },
                  {
                    title: "Desarrollo Web Moderno",
                    url: "https://www.udemy.com/certificate/UC-31c5857e-9165-43f6-a8be-80dfd939d770/",
                  },
                ].map((course, idx) => (
                  <article key={idx}>
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-5 rounded-2xl bg-black border border-neutral-800 hover:border-[#44d62c]/50 transition-all group/item"
                      aria-label={`Ver certificado de ${course.title}`}
                    >
                      <div className="flex flex-col">
                        <p className="text-[#44d62c] text-[8px] font-mono uppercase font-black mb-1">
                          COURSE_VERIFIED
                        </p>
                        <h4 className="text-white font-bold text-[11px] uppercase tracking-tighter">
                          {course.title}
                        </h4>
                      </div>
                      <ExternalLink
                        size={14}
                        className="text-neutral-700 group-hover/item:text-[#44d62c] transition-colors"
                      />
                    </a>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <section className={s.timelineSection}>
            <div className="flex items-center gap-3 mb-16 border-b border-neutral-800 pb-8">
              <div className="w-14 h-14 rounded-2xl bg-[#44d62c]/10 flex items-center justify-center text-[#44d62c] border border-[#44d62c]/20">
                <Briefcase size={24} aria-hidden="true" />
              </div>
              <h2 className="text-3xl font-black uppercase italic tracking-tighter">
                Experience_Timeline_Log
              </h2>
            </div>
            <div className="space-y-20 relative before:absolute before:left-[27px] before:top-4 before:bottom-4 before:w-[1px] before:bg-gradient-to-b before:from-[#44d62c] before:to-neutral-900">
              {experience.map((exp, i) => (
                <article key={i} className={s.timelineItem}>
                  <div className="absolute left-0 top-1 w-14 h-14 rounded-2xl bg-black border border-neutral-800 flex items-center justify-center z-10">
                    <div
                      className="w-2 h-2 bg-[#44d62c] rounded-full animate-ping"
                      aria-hidden="true"
                    />
                  </div>
                  <div className={s.timelineCard}>
                    <span className="text-xs font-mono text-[#44d62c] font-black uppercase tracking-[0.3em] mb-2 block">
                      {exp.year}
                    </span>
                    <h3 className="text-2xl font-black text-white uppercase italic mb-1">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-neutral-500 font-mono uppercase mb-6 tracking-widest">
                      {exp.company}
                    </p>
                    <p className="text-neutral-400 text-lg font-light leading-relaxed max-w-2xl italic">
                      "{exp.desc}"
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <footer className={s.footer}>
            <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.4em]">
              <Globe size={14} aria-hidden="true" />{" "}
              GLOBAL_INFRASTRUCTURE_VERIFIED
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] italic">
              WISMAR.DEV_PROTOCOL_ENCRYPTED
            </div>
          </footer>
        </div>
      </main>
    </>
  );
};

export default ProfilePage;

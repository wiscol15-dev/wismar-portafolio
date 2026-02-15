import { useEffect, useRef, useState, memo } from "react";
import { Link } from "react-router";
import perfilImg from "@/assets/perfil.webp";
import {
  ArrowRight,
  Sparkles,
  Terminal,
  Cpu,
  Loader2,
  Zap,
  ShieldCheck,
  Rocket,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import MetaTags from "@/components/seo/MetaTags";
import { s } from "./home-styles";

const ScrollReveal = memo(
  ({ children, direction = "bottom", delay = "0", className = "" }: any) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);

            if (ref.current) observer.unobserve(ref.current);
          }
        },
        { threshold: 0.05 },
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }, []);

    const animations = {
      bottom: "animate-in slide-in-from-bottom-24 fade-in zoom-in-95",
      top: "animate-in slide-in-from-top-24 fade-in zoom-in-95",
      left: "animate-in slide-in-from-left-24 fade-in zoom-in-95",
      right: "animate-in slide-in-from-right-24 fade-in zoom-in-95",
    };

    return (
      <div
        ref={ref}
        className={`${className} duration-700 ease-&lsqb;cubic-bezier(0.23,1,0.32,1)&rsqb; ${
          isVisible
            ? `${(animations as any)[direction]} opacity-100`
            : "opacity-0"
        }`}
        style={{ animationDelay: delay }}
      >
        {children}
      </div>
    );
  },
);

const HomePage = () => {
  const { t, language } = useLanguage();

  if (!t || !t.home) {
    return (
      <div
        className="min-h-screen bg-black flex flex-col items-center justify-center font-mono text-[#44d62c]"
        role="alert"
        aria-busy="true"
      >
        <Loader2 className="animate-spin mb-4" size={40} aria-hidden="true" />
        <span className="animate-pulse tracking-[0.5em] uppercase text-[10px]">
          Inyectando_Sistemas...
        </span>
      </div>
    );
  }

  return (
    <>
      <MetaTags
        title="Inicio"
        description={
          language === "es"
            ? "Desarrollo de ecosistemas digitales de alto rendimiento. Wismar D. Colmenares, especialista en React e inyección de IA."
            : "High-performance digital ecosystem development. Wismar D. Colmenares, React & AI specialist."
        }
        keywords="React Specialist, Next.js, Madeira Developer, Full Stack Engineer"
      />

      <main className={s.main} id="main-content">
        <div className={s.ambientWrapper} aria-hidden="true">
          <div className={s.ambientGlow} />
          <div className={s.ambientGrid} />
        </div>

        <header className={s.heroHeader}>
          <div className="text-center max-w-5xl mx-auto z-10">
            <ScrollReveal direction="top">
              <div className={s.statusBadge}>
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#44d62c] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#44d62c]"></span>
                </div>
                <span className={s.statusText}>
                  System_Status: Optimal_Operations
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="bottom" delay="100ms">
              <h1 className={s.heroH1}>
                {language === "es"
                  ? "DESARROLLADOR"
                  : language === "pt"
                    ? "DESENVOLVEDOR"
                    : "WEB"}
                <br />
                <span className={s.heroGradientText}>
                  {language === "en" ? "DEVELOPER." : "WEB."}
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="bottom" delay="200ms">
              <p className={s.heroP}>
                {language === "en"
                  ? "Architecting robust infrastructures where technical precision meets disruptive creativity. I transform complex ideas into high-performance digital ecosystems engineered for global scalability."
                  : language === "pt"
                    ? "Arquitetando infraestruturas robustas onde a precisão técnica encontra a criatividade disruptiva. Transformo ideias complexas em ecossistemas digitais de alto desempenho para escalabilidade global."
                    : "Arquitectando infraestructuras robustas donde la precisión técnica converge con la creatividad disruptiva. Transformo ideas complejas en ecosistemas digitales de alto rendimiento diseñados para la escalabilidad global."}
              </p>
            </ScrollReveal>

            <ScrollReveal direction="top" delay="300ms">
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button
                  size="lg"
                  asChild
                  className={s.heroCTA}
                  aria-label={t.home.cta}
                >
                  <Link to="/marketplace" className="flex items-center gap-2">
                    <Rocket size={18} aria-hidden="true" /> {t.home.cta}
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className={s.heroSecondaryBtn}
                  asChild
                >
                  <a
                    href="https://wa.me/351938642800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.nav.contact} <ArrowRight size={18} aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </header>

        <section
          className="relative min-h-screen flex items-center px-6 py-12"
          aria-labelledby="profile-heading"
        >
          <div className={s.profileGrid}>
            <div className="md:col-span-8 flex">
              <ScrollReveal direction="left" className="w-full">
                <Link
                  to="/perfil"
                  className="block group cursor-pointer h-full"
                  aria-label="Ver perfil completo"
                >
                  <div className={s.profileCardWrapper}>
                    <div className="absolute inset-[-50%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0%,#44d62c30_40%,transparent_100%)] animate-[spin_6s_linear_infinite] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-[2px] rounded-[calc(3.5rem-2px)] bg-black overflow-hidden">
                      <img
                        src={perfilImg}
                        alt="Wismar D. Colmenares"
                        loading="eager"
                        fetchPriority="high"
                        className={s.profileImg}
                      />
                      <div className={s.profileGradient}>
                        <div className={s.profileBadge}>
                          <ShieldCheck size={14} /> DEPLOYED_PROFILE
                        </div>
                        <h2 id="profile-heading" className={s.profileTitle}>
                          Wismar D. Colmenares
                        </h2>
                        <p className={s.profileSub}>
                          Full Stack Engineer{" "}
                          <span className="text-[#44d62c]">///</span> Madeira,
                          PT
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            </div>

            <div className="md:col-span-4 flex flex-col gap-8 justify-between">
              {[
                {
                  icon: <Sparkles size={24} />,
                  title: t.home.subtitle.split(" & ")[0],
                  label: "UI_EXCELLENCE",
                },
                {
                  icon: <Terminal size={24} />,
                  title: "CLEAN_INFRA",
                  label: "STABILITY_NODE",
                },
                {
                  icon: <Cpu size={24} />,
                  title: t.home.subtitle.split(" & ")[1],
                  label: "AI_ORCHESTRATION",
                },
              ].map((card, idx) => (
                <ScrollReveal
                  key={idx}
                  direction="right"
                  delay={`${(idx + 1) * 200}ms`}
                  className="flex-1 flex"
                >
                  <article className={s.bentoCard}>
                    <div className={s.bentoIconBox}>{card.icon}</div>
                    <span className={s.bentoLabel}>// {card.label}</span>
                    <h3 className={s.bentoTitle}>{card.title}</h3>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="relative min-h-[60vh] flex flex-col justify-center px-6 py-12">
          <div className="max-w-7xl mx-auto w-full z-10">
            <ScrollReveal direction="top">
              <div className={s.metricGrid}>
                {[
                  {
                    label: "Global_Access",
                    val: "24/7",
                    icon: <Globe size={14} />,
                  },
                  { label: "Uptime", val: "99.9%", icon: <Zap size={14} /> },
                  {
                    label: "Protocol",
                    val: "v4.2.0",
                    icon: <Terminal size={14} />,
                  },
                  {
                    label: "Security",
                    val: "SSL_READY",
                    icon: <ShieldCheck size={14} />,
                  },
                ].map((stat, i) => (
                  <div key={i} className="group" role="status">
                    <div className={s.metricLabel}>
                      {stat.icon} {stat.label}
                    </div>
                    <div
                      className={
                        stat.val === "99.9%"
                          ? `${s.metricVal} text-[#44d62c]`
                          : s.metricVal
                      }
                    >
                      {stat.val}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
    </>
  );
};

export default HomePage;

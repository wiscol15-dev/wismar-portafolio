import { useEffect, useRef, useState } from "react";
import {
  Layout,
  Building2,
  UserCircle,
  ShoppingCart,
  Zap,
  Wrench,
  Server,
  Smartphone,
  Search,
  MessageCircle,
  Globe,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { useLanguage } from "@/context/LanguageContext";
import MetaTags from "@/components/seo/MetaTags";
import { s } from "./services-styles";

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
    bottom: "animate-in slide-in-from-bottom-24 fade-in zoom-in-95",
    top: "animate-in slide-in-from-top-24 fade-in zoom-in-95",
    left: "animate-in slide-in-from-left-24 fade-in zoom-in-95",
    right: "animate-in slide-in-from-right-24 fade-in zoom-in-95",
  };

  return (
    <div
      ref={ref}
      className={`${className} duration-700 ease-out ${isVisible ? `${animations[direction as keyof typeof animations]} opacity-100` : "opacity-0"}`}
      style={{ animationDelay: delay }}
    >
      {children}
    </div>
  );
};

const ServiceCard = ({ icon: Icon, title, description, delay }: any) => (
  <ScrollReveal direction="bottom" delay={delay} className="h-full">
    <article className={s.cardArticle}>
      <div className={s.cardGlow} />
      <div className="relative z-10">
        <div className={s.cardIconBox}>
          <Icon size={24} />
        </div>
        <h3 className={s.cardTitle}>{title}</h3>
        <p className={s.cardDesc}>{description}</p>
      </div>
    </article>
  </ScrollReveal>
);

const ServicesPage = () => {
  const { t, language } = useLanguage();

  if (!t || !t.services) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-[#44d62c]" size={40} />
      </div>
    );
  }

  const impactBio = {
    es: "Como React & Next.js Specialist, diseño ecosistemas digitales que trascienden lo convencional. Mi enfoque combina una arquitectura de código impecable con una optimización obsesiva por el rendimiento, asegurando que tu infraestructura no solo sea escalable, sino capaz de dominar el tráfico global con tiempos de carga quirúrgicos.",
    en: "As a React & Next.js Specialist, I engineer digital ecosystems that transcend the conventional. My approach merges flawless code architecture with an obsessive focus on performance, ensuring your infrastructure is not only scalable but capable of dominating global traffic with surgical load times.",
    pt: "Como React & Next.js Specialist, projeto ecossistemas digitais que transcendem o convencional. Minha abordagem une uma arquitetura de código impecável com uma otimização obsessiva pelo desempenho, garantindo que sua infraestrutura não seja apenas escalável, mas capaz de dominar o tráfego global com tempos de carregamento cirúrgicos.",
  };

  return (
    <>
      <MetaTags
        title="Servicios Tecnológicos"
        description={
          language === "es"
            ? "Soluciones avanzadas en React & Next.js..."
            : "Advanced React & Next.js solutions..."
        }
        keywords="Desarrollo React, Next.js Specialist, E-commerce Madeira"
      />

      <div className={s.main}>
        <div className={s.ambientWrapper}>
          <div className={s.ambientGlow} />
          <div className={s.ambientGrid} />
          <div className={s.ambientOverlay} />
        </div>

        <div className={s.contentWrapper}>
          <header className={s.header}>
            <ScrollReveal direction="top">
              <h1 className={s.mainTitle}>
                {t.services.title.split(" ")[0]} <br />
                <span className={s.gradientText}>
                  {t.services.title.split(" ").slice(1).join(" ")}
                </span>
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="bottom" delay="100ms">
              <p className={s.impactText}>
                {language === "es"
                  ? impactBio.es
                  : language === "pt"
                    ? impactBio.pt
                    : impactBio.en}
              </p>
            </ScrollReveal>
          </header>

          <section className={s.section}>
            <ScrollReveal direction="left">
              <div className={s.categoryHeader}>
                <span className={s.categoryNumber}>01.</span>
                <h2 className={s.categoryTitle}>{t.services.web}</h2>
              </div>
            </ScrollReveal>
            <div className={s.grid}>
              <ServiceCard
                icon={Layout}
                title="Landing Pages"
                description={
                  language === "en"
                    ? "High-conversion systems..."
                    : "Sistemas de alta conversión..."
                }
                delay="0ms"
              />
              <ServiceCard
                icon={Building2}
                title="Enterprise Solutions"
                description={
                  language === "en"
                    ? "Scalable corporate architectures..."
                    : "Arquitecturas corporativas..."
                }
                delay="100ms"
              />
              <ServiceCard
                icon={UserCircle}
                title="Premium Portfolios"
                description={
                  language === "en"
                    ? "Digital identity nodes..."
                    : "Nodos de identidad digital..."
                }
                delay="200ms"
              />
              <ServiceCard
                icon={ShoppingCart}
                title="E-commerce v2.0"
                description={
                  language === "en"
                    ? "Optimized stores..."
                    : "Tiendas optimizadas..."
                }
                delay="300ms"
              />
            </div>
          </section>

          <section className={s.section}>
            <ScrollReveal direction="right">
              <div className={s.categoryHeaderRight}>
                <h2 className={s.categoryTitle}>Performance & Tuning</h2>
                <span className={s.categoryNumber}>02.</span>
              </div>
            </ScrollReveal>
            <div className={s.grid}>
              <ServiceCard
                icon={Zap}
                title="Core Web Vitals"
                description="Optimization for 100% Lighthouse scoring."
                delay="0ms"
              />
              <ServiceCard
                icon={Wrench}
                title="Legacy Refactor"
                description="Modernizing old stacks into React nodes."
                delay="100ms"
              />
              <ServiceCard
                icon={Server}
                title="Serverless Ops"
                description="Zero-downtime deployment strategies."
                delay="200ms"
              />
              <ServiceCard
                icon={Smartphone}
                title="Mobile-First UI"
                description="Pixel-perfect responsive architectures."
                delay="300ms"
              />
            </div>
          </section>

          <section className={s.section}>
            <ScrollReveal direction="left">
              <div className={s.categoryHeader}>
                <span className={s.categoryNumber}>03.</span>
                <h2 className={s.categoryTitle}>{t.services.ai}</h2>
              </div>
            </ScrollReveal>
            <div className={s.gridThree}>
              <ServiceCard
                icon={Search}
                title="Predictive SEO"
                description="AI-driven data structure and visibility."
                delay="0ms"
              />
              <ServiceCard
                icon={MessageCircle}
                title="Neural Agents"
                description="Next-gen AI chatbots integration."
                delay="100ms"
              />
              <ServiceCard
                icon={Globe}
                title="Cloud Clusters"
                description="Dns, Ssl and custom email nodes."
                delay="200ms"
              />
            </div>
          </section>

          <ScrollReveal direction="bottom">
            <section className={s.ctaSection}>
              <div className={s.ctaGlowLine} />
              <h2 className={s.ctaTitle}>
                {language === "en"
                  ? "Evolve your digital node?"
                  : "¿Evolucionar tu nodo digital?"}
              </h2>
              <p className={s.ctaDesc}>
                Implementando arquitecturas de alto rendimiento diseñadas por un
                React & Next.js Specialist. // MADEIRA_DEPLOYMENT_ACTIVE
              </p>
              <div className="flex justify-center">
                <Button size="lg" className={s.ctaBtn} asChild>
                  <Link to="/marketplace">
                    {t.nav.marketplace} <ArrowRight size={24} />
                  </Link>
                </Button>
              </div>
            </section>
          </ScrollReveal>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;

import React, { useEffect, useRef, useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  Cpu,
  Loader2,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProjects } from "@/context/ProjectsContext";
import { useLanguage } from "@/context/LanguageContext";
import MetaTags from "@/components/seo/MetaTags";
import { s } from "./contact-styles";

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

const ContactPage = () => {
  const { addMessage } = useProjects();
  const { t, language } = useLanguage();

  const initialFormState = {
    name: "",
    email: "",
    projectType: "Web_App",
    message: "",
  };
  const [formData, setFormData] = useState(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);
    try {
      await addMessage({
        name: formData.name,
        email: formData.email,
        text: `[PROTOCOLO_${formData.projectType.toUpperCase()}]: ${formData.message}`,
      });
      setIsSuccess(true);
      setFormData(initialFormState);
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error("TRANSMISSION_FAILED:", err);
      setError(true);
      setTimeout(() => setError(false), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <MetaTags
        title="Contacto"
        description={
          language === "es"
            ? "Inicia la transmisión de tu proyecto. Contacta con Wismar D. Colmenares para el desarrollo de infraestructuras React de alto rendimiento."
            : "Start your project transmission. Contact Wismar D. Colmenares for high-performance React infrastructure development."
        }
        keywords="Contacto Desarrollador, Freelance React Madeira, Next.js Developer Contact, Wismar.DEV"
      />

      <div className={s.mainWrapper}>
        <div className={s.ambientWrapper}>
          <div className={s.ambientGlow} />
          <div className={s.ambientGrid} />
        </div>

        <main className={s.mainContent}>
          <div className="max-w-7xl mx-auto w-full lg:mt-[-40px]">
            <div className={s.grid}>
              <ScrollReveal direction="left">
                <div className={s.statusBadge}>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#44d62c] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#44d62c]"></span>
                  </span>
                  Link_Status: Establish
                </div>

                <h1 className={s.titleH1}>
                  {t.contact.title.split(" ")[0]} <br />
                  <span className="text-[#44d62c]">
                    {t.contact.title.split(" ").slice(1).join(" ")}.
                  </span>
                </h1>

                <p className={s.description}>
                  {t.hero.description} // Madeira_Node_Funchal
                </p>

                <div className="space-y-4">
                  {[
                    {
                      icon: MapPin,
                      label: "Base_Ops",
                      val: "Funchal, Madeira, PT",
                      link: "#",
                    },
                    {
                      icon: Phone,
                      label: "Direct_Line",
                      val: "+351 938 642 800",
                      link: "tel:+351938642800",
                    },
                    {
                      icon: Mail,
                      label: "Core_Mail",
                      val: "wiscol15@gmail.com",
                      link: "mailto:wiscol15@gmail.com",
                    },
                  ].map((item, idx) => (
                    <a key={idx} href={item.link} className={s.infoCard}>
                      <div className={s.iconBox}>
                        <item.icon size={22} />
                      </div>
                      <div>
                        <h3 className={s.cardLabel}>{item.label}</h3>
                        <p className={s.cardValue}>{item.val}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right" delay="200ms">
                <section className={s.terminalCard}>
                  <header className={s.terminalHeader}>
                    <div className={s.terminalHeaderDots}>
                      <div className={s.dotRed} />
                      <div className={s.dotYellow} />
                      <div className={s.dotGreen} />
                    </div>
                    <div className={s.terminalTitle}>
                      transmission_v3.0 // root@client_input
                    </div>
                  </header>

                  <div className={s.formPadding}>
                    <form onSubmit={handleSubmit} className={s.formGroup}>
                      <div className="space-y-2">
                        <label
                          className={s.inputLabel}
                        >{`<input type="${t.contact.name.toLowerCase()}" />`}</label>
                        <input
                          required
                          placeholder={t.contact.name}
                          className={s.input}
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label
                          className={s.inputLabel}
                        >{`<input type="${t.contact.email.toLowerCase().replace(" ", "_")}" />`}</label>
                        <input
                          type="email"
                          required
                          placeholder={t.contact.email}
                          className={s.input}
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>

                      <div className="space-y-3">
                        <label className={s.inputLabel}>
                          {'<select type="architecture" />'}
                        </label>
                        <div className={s.archGrid}>
                          {[
                            "Web_App",
                            "E-commerce",
                            "Landing",
                            "AI_Protocol",
                          ].map((type) => (
                            <div
                              key={type}
                              onClick={() =>
                                setFormData({ ...formData, projectType: type })
                              }
                              className={`${s.archBtn} ${formData.projectType === type ? s.archActive : s.archDefault}`}
                            >
                              {type}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label
                          className={s.inputLabel}
                        >{`<textarea type="${t.contact.message.toLowerCase()}" />`}</label>
                        <textarea
                          rows={4}
                          required
                          placeholder={t.contact.message}
                          className={s.textarea}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={`${s.submitBtn} ${isSuccess ? "bg-emerald-600 text-white" : error ? "bg-red-600 text-white" : "bg-[#44d62c] text-black hover:bg-white shadow-[0_10px_30px_rgba(68,214,44,0.2)]"}`}
                      >
                        {isSubmitting ? (
                          <Loader2 className="animate-spin" />
                        ) : isSuccess ? (
                          <div className="flex items-center gap-2">
                            <CheckCircle2 size={18} /> SUCCESS_TRANSMISSION
                          </div>
                        ) : error ? (
                          <div className="flex items-center gap-2">
                            <ShieldAlert size={18} /> SYSTEM_FAILURE
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Cpu size={18} /> {t.contact.send.toUpperCase()}
                          </div>
                        )}
                      </Button>
                    </form>
                  </div>
                </section>
              </ScrollReveal>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ContactPage;

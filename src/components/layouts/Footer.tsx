import {
  Github,
  Linkedin,
  Mail,
  Globe,
  Cpu,
  Terminal,
  ChevronRight,
  Code2,
} from "lucide-react";
import { Link } from "react-router";
import { s } from "./footer-styles"; // Inyección de estilos

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Sistemas", path: "/projects" },
    { name: "Marketplace", path: "/marketplace" },
    { name: "Servicios", path: "/services" },
    { name: "Contacto", path: "/contact" },
  ];

  const socialLinks = [
    {
      icon: <Github size={18} />,
      href: "https://github.com/",
      label: "GitHub",
    },
    {
      icon: <Linkedin size={18} />,
      href: "https://linkedin.com/",
      label: "LinkedIn",
    },
    {
      icon: <Mail size={18} />,
      href: "mailto:wiscol15@gmail.com",
      label: "Email",
    },
  ];

  return (
    <footer className={s.footer}>
      <div className={s.gridBg}>
        <div className={s.gridPattern} />
      </div>

      <div className={s.container}>
        <div className={s.mainGrid}>
          {/* COLUMNA 1: IDENTIDAD */}
          <div className={s.identityCol}>
            <div className={s.brandLogo}>
              <span className="text-[#44d62c]">&lt;</span>
              Wismar<span className="text-neutral-500">.Dev</span>
              <span className="text-[#44d62c]">/&gt;</span>
            </div>
            <p className={s.brandDesc}>
              Arquitecturas digitales de alto rendimiento. Especializado en
              inyección de IA y ecosistemas Full-Stack desde Funchal.
            </p>
            <div className={s.socialBox}>
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  className={s.socialIcon}
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* COLUMNA 2: PROTOCOLOS */}
          <div>
            <h3 className={s.columnTitle}>
              <Terminal size={14} className="text-[#44d62c]" /> Protocolos_Rutas
            </h3>
            <ul className={s.linksList}>
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className={s.navLink}>
                    <ChevronRight size={12} className={s.chevron} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLUMNA 3: TELEMETRÍA */}
          <div>
            <h3 className={s.columnTitle}>
              <Cpu size={14} className="text-[#44d62c]" /> System_Telemetry
            </h3>
            <div className={s.telemetryBox}>
              <div className={s.loadIndicator}>
                <div className={s.loadLabel}>
                  <span>Server_Load</span>
                  <span className="text-[#44d62c]">v2.1.0-Stable</span>
                </div>
                <div className={s.barWrapper}>
                  <div className={s.barFill} />
                </div>
              </div>
              <p className={s.stackInfo}>
                // Ubicación: Funchal, Madeira, PT <br />
                // Status: Operational_24/7 <br />
                // Stack: React_Node_Firebase
              </p>
            </div>
          </div>

          {/* COLUMNA 4: CTA */}
          <div>
            <h3 className={s.columnTitle}>
              <Globe size={14} className="text-[#44d62c]" /> Global_Link
            </h3>
            <div className={s.ctaCard}>
              <p className={s.ctaText}>
                ¿Listo para inyectar innovación técnica en tu proyecto?
              </p>
              <Link to="/contact" className={s.ctaBtn}>
                Ejecutar_Protocolo <Code2 size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* BOTTOM: COPYRIGHT */}
        <div className={s.bottomWrapper}>
          <p className={s.copyright}>
            © {currentYear} Wismar Colmenares. Todos los derechos reservados. //
            Madeira_Systems
          </p>
          <div className={s.legalBox}>
            <span className={s.legalLink}>Política_de_Cifrado</span>
            <span className={s.legalLink}>Protocolos_Seguros</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

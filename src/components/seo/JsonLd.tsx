import { useLanguage } from "@/context/LanguageContext";

const JsonLd = () => {
  const { language } = useLanguage();

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Wismar D. Colmenares B.",
    alternateName: "Wismar.DEV",
    url: "https://tu-dominio.com",
    image: "https://tu-dominio.com/perfil.jpg",
    jobTitle:
      language === "en"
        ? "React & Next.js Specialist"
        : "Especialista en React & Next.js",
    description:
      language === "en"
        ? "Web Developer specializing in high-performance digital ecosystems with React and Next.js."
        : "Desarrollador Web especializado en ecosistemas digitales de alto rendimiento con React y Next.js.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Funchal",
      addressRegion: "Madeira",
      addressCountry: "PT",
    },
    sameAs: [
      "https://www.linkedin.com/in/wismar-colmenares/",
      "https://github.com/wiscol15-dev",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Web Development",
      "Artificial Intelligence Integration",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};

export default JsonLd;

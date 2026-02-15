import React, { createContext, useContext, useState, useEffect } from "react";

const translations: any = {
  es: {
    nav: {
      services: "Servicios",
      projects: "Proyectos",
      contact: "Contacto",
      marketplace: "Marketplace_",
      login: "Identificarse",
      logout: "Salir",
    },
    footer: {
      telemetry: "Telemetría_Sistemas",
      global_link: "Vínculo_Global",
      rights: "Todos los derechos reservados.",
    },
    hero: {
      inject: "INYECTA",
      power: "PODER_",
      description: "Tu configuración se mantiene intacta en el disco local.",
    },
    home: {
      title: "Ingeniero de Sistemas",
      subtitle: "Arquitecturas Full-Stack & IA",
      cta: "Explorar_Nodos",
    },
    services: {
      title: "Catálogo de Infraestructura",
      web: "Desarrollo de Sistemas",
      ai: "Protocolos IA",
    },
    projects: {
      title: "Galería de Proyectos",
      filter: "Filtrar_Tecnología",
    },
    contact: {
      title: "Protocolo de Contacto",
      name: "Nombre_Usuario",
      email: "Email_Nodo",
      message: "Payload_Mensaje",
      send: "Transmitir_Datos",
    },
    profile: {
      title: "Ingeniería Informática",
      settings: "Configuración_Nodo",
      bio: "Arquitecto de software venezolano con residencia permanente en la Unión Europea, operando actualmente desde el nodo estratégico de Funchal, Madeira. Mi trayectoria de cinco años no es solo una acumulación de tiempo, sino una evolución constante desde las bases autodidactas hasta la maestría técnica. Me especializo en inyectar escalabilidad y alto rendimiento en infraestructuras digitales complejas, fusionando la creatividad del frontend con una lógica de sistemas rigurosa para dominar el ecosistema tecnológico europeo.",
      highschool: "Bachiller en Ciencias",
      status: "Residente Permanente",
      origin: "Nodo de Origen: Venezuela",
      current: "Operación Actual: Portugal",
    },
  },
  en: {
    nav: {
      services: "Services",
      projects: "Projects",
      contact: "Contact",
      marketplace: "Marketplace_",
      login: "Login",
      logout: "Logout",
    },
    footer: {
      telemetry: "System_Telemetry",
      global_link: "Global_Link",
      rights: "All rights reserved.",
    },
    hero: {
      inject: "INJECT",
      power: "POWER_",
      description: "Your configuration remains intact on the local disk.",
    },
    home: {
      title: "Systems Engineer",
      subtitle: "Full-Stack & AI Architectures",
      cta: "Explore_Nodes",
    },
    services: {
      title: "Infrastructure Catalog",
      web: "Systems Development",
      ai: "AI Protocols",
    },
    projects: {
      title: "Project Gallery",
      filter: "Filter_Technology",
    },
    contact: {
      title: "Contact Protocol",
      name: "User_Name",
      email: "Node_Email",
      message: "Message_Payload",
      send: "Transmit_Data",
    },
    profile: {
      title: "Computer Engineering",
      settings: "Node_Settings",
      bio: "Venezuelan software architect with permanent residency in the European Union, currently operating from the strategic node of Funchal, Madeira. My five-year journey is not just an accumulation of time, but a constant evolution from self-taught foundations to technical mastery. I specialize in injecting scalability and high performance into complex digital infrastructures, merging frontend creativity with rigorous systems logic to dominate the European technological ecosystem.",
      highschool: "High School - Science Major",
      status: "Permanent Resident",
      origin: "Origin Node: Venezuela",
      current: "Current Operation: Portugal",
    },
  },
  pt: {
    nav: {
      services: "Serviços",
      projects: "Projetos",
      contact: "Contacto",
      marketplace: "Marketplace_",
      login: "Entrar",
      logout: "Sair",
    },
    footer: {
      telemetry: "Telemetria_Sistemas",
      global_link: "Link_Global",
      rights: "Todos os direitos reservados.",
    },
    hero: {
      inject: "INJETE",
      power: "PODER_",
      description: "Sua configuração permanece intacta no disco local.",
    },
    home: {
      title: "Arquiteto de Sistemas",
      subtitle: "Arquiteturas Full-Stack & IA",
      cta: "Explorar_Nós",
    },
    services: {
      title: "Catálogo de Infraestrutura",
      web: "Desenvolvimento de Sistemas",
      ai: "Protocolos IA",
    },
    projects: {
      title: "Galeria de Projetos",
      filter: "Filtrar_Tecnologia",
    },
    contact: {
      title: "Protocolo de Contacto",
      name: "Nome_Usuário",
      email: "Email_Nó",
      message: "Payload_Mensagem",
      send: "Transmitir_Dados",
    },
    profile: {
      title: "Engenharia Informática",
      settings: "Configurações_Nó",
      bio: "Arquiteto de software venezuelano com residência permanente na União Europeia, operando atualmente a partir do nó estratégico do Funchal, Madeira. Minha trajetória de cinco anos não é apenas um acúmulo de tempo, mas uma evolução constante desde as bases autodidatas até o domínio técnico. Especializo-me em injetar escalabilidade e alto desempenho em infraestruturas digitais complexas, fundindo a criatividade do frontend com uma lógica de sistemas rigorosa para dominar o ecossistema tecnológico europeu.",
      highschool: "Bacharel em Ciências",
      status: "Residente Permanente",
      origin: "Nó de Origem: Venezuela",
      current: "Operação Atual: Portugal",
    },
  },
};

interface LanguageContextType {
  language: string;
  t: any;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = useState(
    localStorage.getItem("sys_lang") || "es",
  );

  useEffect(() => {
    localStorage.setItem("sys_lang", language);
  }, [language]);

  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  return context;
};

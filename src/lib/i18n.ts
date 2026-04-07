import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pt: {
    translation: {
      header: {
        home: "Início",
        company: "Empresa",
        infrastructure: "Infraestrutura",
        portfolio: "Portfólio",
        contact: "Contato",
        quote: "Fazer Orçamento",
      },
      hero: {
        title1: "EXCELÊNCIA EM",
        title2: "ENGENHARIA",
        subtitle: "Construindo o futuro da infraestrutura em todo o Brasil desde 1998. Especializados em rodovias, desenvolvimento urbano e grandes obras públicas.",
        discover: "Descubra Mais",
        portfolio: "Nosso Portfólio",
        scroll: "Role para descobrir"
      },
      company: {
        title1: "História &",
        title2: "Qualidade",
        p1: "Fundada em 1998, a EHL — Eletro Hidro Ltda. é referência em engenharia pesada e infraestrutura no Brasil. Atuamos em rodovias, desenvolvimento urbano e grandes obras públicas com excelência técnica e compromisso com a qualidade.",
        p2: "Nossa equipe multidisciplinar de engenheiros e especialistas entrega soluções de classe mundial que resistem ao tempo. Nosso legado é construído sobre confiança, excelência técnica e busca constante pela inovação.",
        years: "Anos de Experiência",
        delivered: "Obras Entregues",
        level: "Nível A",
        collaborators: "Colaboradores"
      },
      infrastructure: {
        title1: "Infraestrutura &",
        title2: "Capacidades",
        subtitle: "Soluções completas em engenharia pesada e infraestrutura para projetos de qualquer escala.",
        paving: "Pavimentação Rodoviária",
        pavingDesc: "Execução de obras em rodovias federais e estaduais — terraplenagem, drenagem e pavimentação asfáltica.",
        urban: "Desenvolvimento Urbano",
        urbanDesc: "Loteamentos, infraestrutura urbana e obras de saneamento em grandes empreendimentos.",
        drainage: "Galerias Pluviais",
        drainageDesc: "Construção de galerias de águas pluviais e sistemas de drenagem para mobilidade urbana.",
        publicWorks: "Obras Públicas",
        publicWorksDesc: "Execução de grandes obras públicas com certificação PBQP-H e ISO 9001.",
        earthwork: "Terraplenagem",
        earthworkDesc: "Movimentação de terra em larga escala para obras de infraestrutura e mineração.",
        structures: "Obras de Arte Especiais",
        structuresDesc: "Pontes, viadutos e estruturas de contenção com engenharia de alta complexidade."
      },
      portfolio: {
        title1: "Projetos em",
        title2: "Destaque",
        subtitle: "Obras de engenharia de excelência por todo o Brasil."
      },
      contact: {
        title1: "Entre em",
        title2: "Contato",
        subtitle: "Pronto para iniciar seu próximo projeto? Vamos conversar sobre como transformar sua visão em realidade.",
        address: "Endereço",
        phone: "Telefone",
        email: "E-mail",
        press: "Assessoria de Imprensa",
        namePlaceholder: "Seu Nome",
        emailPlaceholder: "Endereço de E-mail",
        subjectPlaceholder: "Assunto",
        messagePlaceholder: "Conte-nos sobre o seu projeto...",
        sendButton: "Enviar Mensagem"
      },
      footer: {
        desc: "Excelência em engenharia desde 1998. Entregando soluções de classe mundial em infraestrutura, pavimentação e obras públicas por todo o Brasil.",
        company: "Empresa",
        companyLinks: {
          about: "Sobre Nós",
          team: "Nossa Equipe",
          careers: "Carreiras",
          certs: "Certificações"
        },
        services: "Serviços",
        serviceLinks: {
          paving: "Pavimentação",
          urban: "Urbanização",
          earthwork: "Terraplenagem",
          drainage: "Drenagem"
        },
        rights: "© 2024 Eletro Hidro Ltda. Todos os direitos reservados."
      }
    }
  },
  en: {
    translation: {
      header: {
        home: "Home",
        company: "Company",
        infrastructure: "Infrastructure",
        portfolio: "Portfolio",
        contact: "Contact",
        quote: "Get a Quote",
      },
      hero: {
        title1: "ENGINEERING",
        title2: "EXCELLENCE",
        subtitle: "Building the future of infrastructure across Brazil since 1998. Specialized in highways, urban development, and massive public works.",
        discover: "Discover More",
        portfolio: "Our Portfolio",
        scroll: "Scroll to discover"
      },
      company: {
        title1: "Heritage &",
        title2: "Quality",
        p1: "Founded in 1998, EHL — Eletro Hidro Ltda. is a benchmark in heavy engineering and infrastructure in Brazil. We operate in highways, urban development, and major public works with technical excellence and commitment to quality.",
        p2: "Our multidisciplinary team of engineers and specialists delivers world-class solutions that stand the test of time. Our legacy is built on trust, technical excellence, and a constant search for innovation.",
        years: "Years of Experience",
        delivered: "Projects Delivered",
        level: "Level A",
        collaborators: "Collaborators"
      },
      infrastructure: {
        title1: "Infrastructure &",
        title2: "Capabilities",
        subtitle: "Complete solutions in heavy engineering and infrastructure for projects of any scale.",
        paving: "Highway Paving",
        pavingDesc: "Execution of works on federal and state highways — earthworks, drainage, and asphalt paving.",
        urban: "Urban Development",
        urbanDesc: "Subdivisions, urban infrastructure, and sanitation works in large developments.",
        drainage: "Storm Sewers",
        drainageDesc: "Construction of storm sewers and drainage systems for urban mobility.",
        publicWorks: "Public Works",
        publicWorksDesc: "Execution of major public works with PBQP-H and ISO 9001 certification.",
        earthwork: "Earthworks",
        earthworkDesc: "Large-scale earthmoving for infrastructure and mining works.",
        structures: "Special Structures",
        structuresDesc: "Bridges, viaducts, and containment structures with highly complex engineering."
      },
      portfolio: {
        title1: "Featured",
        title2: "Projects",
        subtitle: "Engineering excellence projects throughout Brazil."
      },
      contact: {
        title1: "Get in",
        title2: "Touch",
        subtitle: "Ready to start your next project? Let's talk about how to turn your vision into reality.",
        address: "Address",
        phone: "Phone",
        email: "Email",
        press: "Press Office",
        namePlaceholder: "Your Name",
        emailPlaceholder: "Email Address",
        subjectPlaceholder: "Subject",
        messagePlaceholder: "Tell us about your project...",
        sendButton: "Send Message"
      },
      footer: {
        desc: "Engineering excellence since 1998. Delivering world-class solutions in infrastructure, paving, and public works across Brazil.",
        company: "Company",
        companyLinks: {
          about: "About Us",
          team: "Our Team",
          careers: "Careers",
          certs: "Certifications"
        },
        services: "Services",
        serviceLinks: {
          paving: "Paving",
          urban: "Urbanization",
          earthwork: "Earthworks",
          drainage: "Drainage"
        },
        rights: "© 2024 Eletro Hidro Ltda. All rights reserved."
      }
    }
  },
  es: {
    translation: {
      header: {
        home: "Inicio",
        company: "Empresa",
        infrastructure: "Infraestructura",
        portfolio: "Portafolio",
        contact: "Contacto",
        quote: "Cotizar",
      },
      hero: {
        title1: "EXCELENCIA EN",
        title2: "INGENIERÍA",
        subtitle: "Construyendo el futuro de la infraestructura en todo Brasil desde 1998. Especializados en carreteras, desarrollo urbano y grandes obras públicas.",
        discover: "Descubre Más",
        portfolio: "Nuestro Portafolio",
        scroll: "Desplázate para descubrir"
      },
      company: {
        title1: "Historia &",
        title2: "Calidad",
        p1: "Fundada en 1998, EHL — Eletro Hidro Ltda. es un referente en ingeniería pesada e infraestructura en Brasil. Operamos en carreteras, desarrollo urbano y grandes obras públicas con excelencia técnica y compromiso con la calidad.",
        p2: "Nuestro equipo multidisciplinario de ingenieros y especialistas entrega soluciones de clase mundial que perduran en el tiempo. Nuestro legado se basa en la confianza, la excelencia técnica y la búsqueda constante de innovación.",
        years: "Años de Experiencia",
        delivered: "Obras Entregadas",
        level: "Nivel A",
        collaborators: "Colaboradores"
      },
      infrastructure: {
        title1: "Infraestructura &",
        title2: "Capacidades",
        subtitle: "Soluciones completas en ingeniería pesada e infraestructura para proyectos de cualquier escala.",
        paving: "Pavimentación de Carreteras",
        pavingDesc: "Ejecución de obras en carreteras federales y estatales — movimiento de tierras, drenaje y pavimentación asfáltica.",
        urban: "Desarrollo Urbano",
        urbanDesc: "Loteamientos, infraestructura urbana y obras de saneamiento en grandes desarrollos.",
        drainage: "Alcantarillado Pluvial",
        drainageDesc: "Construcción de alcantarillado pluvial y sistemas de drenaje para la movilidad urbana.",
        publicWorks: "Obras Públicas",
        publicWorksDesc: "Ejecución de grandes obras públicas con certificación PBQP-H e ISO 9001.",
        earthwork: "Movimiento de Tierras",
        earthworkDesc: "Movimiento de tierras a gran escala para obras de infraestructura y minería.",
        structures: "Estructuras Especiales",
        structuresDesc: "Puentes, viaductos y estructuras de contención con ingeniería de alta complejidad."
      },
      portfolio: {
        title1: "Proyectos",
        title2: "Destacados",
        subtitle: "Obras de excelencia en ingeniería por todo Brasil."
      },
      contact: {
        title1: "Ponte en",
        title2: "Contacto",
        subtitle: "¿Listo para comenzar tu próximo proyecto? Hablemos sobre cómo convertir tu visión en realidad.",
        address: "Dirección",
        phone: "Teléfono",
        email: "Correo Electrónico",
        press: "Oficina de Prensa",
        namePlaceholder: "Tu Nombre",
        emailPlaceholder: "Correo Electrónico",
        subjectPlaceholder: "Asunto",
        messagePlaceholder: "Cuéntanos sobre tu proyecto...",
        sendButton: "Enviar Mensaje"
      },
      footer: {
        desc: "Excelencia en ingeniería desde 1998. Entregando soluciones de clase mundial en infraestructura, pavimentación y obras públicas en todo Brasil.",
        company: "Empresa",
        companyLinks: {
          about: "Sobre Nosotros",
          team: "Nuestro Equipo",
          careers: "Carreras",
          certs: "Certificaciones"
        },
        services: "Servicios",
        serviceLinks: {
          paving: "Pavimentación",
          urban: "Urbanización",
          earthwork: "Movimiento de Tierras",
          drainage: "Drenaje"
        },
        rights: "© 2024 Eletro Hidro Ltda. Todos los derechos reservados."
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt', // idioma padrão
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
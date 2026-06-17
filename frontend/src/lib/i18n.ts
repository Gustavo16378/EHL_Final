import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pt: {
    translation: {
      header: {
        home: "Início",
        company: "Empresa",
        equipments: "Equipamentos",
        constructions: "Obras",
        infrastructure: "Infraestrutura",
        portfolio: "Portfólio",
        contact: "Contato",
        quote: "Fazer Orçamento",
      },
      hero: {
        title1: "EXCELÊNCIA",
        title2: "EM ENGENHARIA",
        subtitle: "Construindo o futuro da infraestrutura em todo o Brasil desde 1998. Especializados em rodovias, desenvolvimento urbano e grandes obras públicas.",
        discover: "Descubra Mais",
        portfolio: "Nosso Portfólio",
        iso: "ISO 9001:2015 Certificado",
        pbqp: "PBQP do Habitat — Nível A",
        widgets: {
          video: "Vídeo",
          videoTitle: "Vídeo institucional",
          videoUnavailable: "Vídeo indisponível.",
          weather: "Tempo agora",
          todayRange: "Hoje",
          rain: "Chuva",
          rainYes: "Sim",
          rainNo: "Não",
          updatedAt: "Atualizado em",
          loading: "Carregando…",
          usdError: "Não foi possível carregar a cotação agora.",
          weatherNoLocation: "Permita a localização para ver o clima.",
          weatherError: "Não foi possível carregar o clima agora.",
          exchange: "Câmbio",
          wind: "Vento",
          forecast: "Próximos dias",
          feelsLike: "Sensação",
          humidity: "Umidade",
          conditions: {
            clear: "Céu limpo",
            partlyCloudy: "Parcialmente nublado",
            cloudy: "Nublado",
            fog: "Neblina",
            drizzle: "Garoa",
            rain: "Chuva",
            snow: "Neve",
            thunderstorm: "Tempestade"
          }
        },
        caption: {
          viewWork: "Ver obra"
        }
      },
      company: {
        title1: "História &",
        title2: "Qualidade",
        p1: "Fundada em 1998, a EHL — Eletro Hidro Ltda. é referência em engenharia pesada e infraestrutura no Brasil. Atuamos em rodovias, desenvolvimento urbano e grandes obras públicas com excelência técnica e compromisso com a qualidade.",
        p2: "Nossa equipe multidisciplinar de engenheiros e especialistas entrega soluções de classe mundial que resistem ao tempo. Nosso legado é construído sobre confiança, excelência técnica e busca constante pela inovação.",
        iso: "ISO 9001:2015 — Sistema de Gestão da Qualidade",
        pbqp: "PBQP do Habitat — Nível A",
        licensing: "Licenciamento Ambiental Completo",
        safety: "Segurança do Trabalho — NR-18 Compliance",
        years: "Anos de Experiência",
        delivered: "Obras Entregues",
        level: "Nível A",
        collaborators: "Colaboradores",
        imageAlt: "Sede da EHL — Eletro Hidro Ltda."
      },

      equipments: {
        title1: "Nossos",
        title2: " Equipamentos",
        subtitle: "Frota própria de máquinas pesadas e equipamentos de última geração para atender obras de qualquer porte e complexidade.",
        1: {
          title: "Escavadeiras Hidráulicas",
          description: "Máquinas de alta performance para escavação de valas, fundações e movimentação de terra em grandes volumes. Frota com modelos de 20 a 50 toneladas.",
          amount: "12 unidades",
          category: "Escavação"
        },
        2: {
          title: "Caminhões Basculantes",
          description: "Frota de caminhões caçamba para transporte de terra, brita e materiais de construção. Capacidades de 14 m³ a 25 m³.",
          amount: "28 unidades",
          category: "Transporte"
        },
        3: {
          title: "Pavimentadoras de Asfalto",
          description: "Equipamentos de última geração para aplicação de massa asfáltica com controle eletrônico de espessura e nivelamento automático.",
          amount: "4 unidades",
          category: "Pavimentação"
        },
        4: {
          title: "Motoniveladoras",
          description: "Máquinas para nivelamento e regularização de terrenos, preparo de sub-base e manutenção de estradas não pavimentadas.",
          amount: "6 unidades",
          category: "Terraplenagem"
        },
        5: {
          title: "Pás Carregadeiras",
          description: "Equipamentos versáteis para carga, descarga e movimentação de materiais em obras de infraestrutura e mineração.",
          amount: "8 unidades",
          category: "Movimentação"
        },
        6: {
          title: "Rolos Compactadores",
          description: "Rolos vibratórios para compactação de aterros, sub-base e camadas asfálticas, garantindo a densidade especificada em projeto.",
          amount: "10 unidades",
          category: "Compactação"
        }
      },
      constructions: {
        title1: "Obras",
        title2: " em Andamento",
        subtitle: "Acompanhe os projetos que a EHL está executando neste momento — engenharia pesada com excelência em todo o Brasil.",
        inProgressTitle: "Obras em andamento",
        viewAll: "Ver todas",
        delivery: "Entrega",
        loading: "Carregando…",
        empty: "Nenhuma obra cadastrada no momento.",
        labels: {
          location: "Localização",
          client: "Cliente",
          forecast: "Previsão"
        },
        1: {
          title: "Duplicação da BR-040 — Trecho Cristalina/GO",
          city: "Cristalina",
          uf: "GO",
          client: "DNIT",
          status: "Em andamento",
          deliveryForecast: "Dez/2025",
          description: "Duplicação, terraplenagem e pavimentação asfáltica de 42 km em rodovia federal.",
          type: "Pavimentação Rodoviária"
        },
        2: {
          title: "Infraestrutura Urbana — Loteamento Parque das Águas",
          city: "Uberlândia",
          uf: "MG",
          client: "Construtora Ápia",
          status: "Em andamento",
          deliveryForecast: "Mar/2026",
          description: "Rede de drenagem, galerias pluviais, pavimentação e sinalização de loteamento com 1.200 lotes.",
          type: "Desenvolvimento Urbano"
        },
        3: {
          title: "Ponte sobre o Rio Paranaíba — MS-395",
          city: "Paranaíba",
          uf: "MS",
          client: "Governo do Estado de MS",
          status: "Em andamento",
          deliveryForecast: "Jun/2026",
          description: "Construção de ponte em concreto protendido com 180 m de extensão e acessos rodoviários.",
          type: "Obras de Arte Especiais"
        },
        4: {
          title: "Sistema de Drenagem — Av. Brasil, Anápolis",
          city: "Anápolis",
          uf: "GO",
          client: "Prefeitura de Anápolis",
          status: "Em andamento",
          deliveryForecast: "Set/2025",
          description: "Implantação de galerias de águas pluviais e recapeamento asfáltico em 8 km de avenida.",
          type: "Galerias Pluviais"
        },
        5: {
          title: "Terraplenagem — Complexo Logístico Triângulo",
          city: "Uberaba",
          uf: "MG",
          client: "Log Commercial Properties",
          status: "Em andamento",
          deliveryForecast: "Nov/2025",
          description: "Movimentação de 450.000 m³ de terra para plataforma industrial e acessos viários.",
          type: "Terraplenagem"
        },
        6: {
          title: "Restauração da GO-060 — Trecho Goiânia/Trindade",
          city: "Goiânia",
          uf: "GO",
          client: "AGETOP",
          status: "Em andamento",
          deliveryForecast: "Fev/2026",
          description: "Fresagem, recapeamento e sinalização horizontal/vertical em 25 km de rodovia estadual.",
          type: "Pavimentação Rodoviária"
        }
      },
      portfolio: {
        title1: "Projetos em",
        title2: "Destaque",
        subtitle: "Obras de engenharia de excelência por todo o Brasil.",
        detailsTitle: "Detalhes de Execução",
        1: {
          title: "Vila Olímpica dos Jogos Indígenas",
          category: "Infraestrutura",
          location: "Palmas - TO",
          description: "Construção completa do complexo esportivo para os Jogos Mundiais dos Povos Indígenas, incluindo infraestrutura viária, drenagem, paisagismo e edificações de apoio.",
          details: {
            1: "Terraplenagem e pavimentação do complexo",
            2: "Sistema completo de drenagem pluvial",
            3: "Infraestrutura elétrica e iluminação",
            4: "Obras de contenção e paisagismo"
          }
        },
        2: {
          title: "Alphaville Palmas & Eusébio-CE",
          category: "Desenvolvimento Urbano",
          location: "Palmas-TO / Eusébio-CE",
          description: "Execução de infraestrutura completa para loteamentos Alphaville, incluindo terraplenagem, pavimentação, redes de drenagem e abastecimento de água.",
          details: {
            1: "Terraplenagem e movimentação de terra",
            2: "Pavimentação asfáltica e intertravamento",
            3: "Redes de água e esgoto sanitário",
            4: "Drenagem e galerias pluviais"
          }
        },
        3: {
          title: "BR-163 PA & GO-520",
          category: "Pavimentação Rodoviária",
          location: "Pará / Goiás",
          description: "Obras de pavimentação e restauração em rodovias federais e estaduais, incluindo drenagem profunda, terraplenagem e sinalização viária.",
          details: {
            1: "Pavimentação asfáltica — CBUQ e TST",
            2: "Drenagem profunda e superficial",
            3: "Terraplenagem e regularização do subleito",
            4: "Sinalização horizontal e vertical"
          }
        },
        4: {
          title: "Mobilidade Urbana Gurupi-TO",
          category: "Mobilidade Urbana",
          location: "Gurupi - TO",
          description: "Execução de pavimentação e galerias de águas pluviais para melhoria da mobilidade urbana, contemplando diversas avenidas e ruas do município.",
          details: {
            1: "Galerias de águas pluviais em concreto",
            2: "Pavimentação asfáltica urbana",
            3: "Meio-fio e sarjeta",
            4: "Sinalização e acessibilidade"
          }
        }
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
        sendButton: "Enviar Mensagem",
        sentButton: "Mensagem enviada!"
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
        equipments: "Equipments",
        constructions: "Constructions",
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
        iso: "ISO 9001:2015 Certified",
        pbqp: "PBQP do Habitat — Level A",
        widgets: {
          video: "Video",
          videoTitle: "Institutional video",
          videoUnavailable: "Video unavailable.",
          weather: "Weather now",
          todayRange: "Today",
          rain: "Rain",
          rainYes: "Yes",
          rainNo: "No",
          updatedAt: "Updated at",
          loading: "Loading…",
          usdError: "Couldn't load the exchange rate right now.",
          weatherNoLocation: "Allow location access to see weather.",
          weatherError: "Couldn't load the weather right now.",
          exchange: "Exchange",
          wind: "Wind",
          forecast: "Next days",
          feelsLike: "Feels like",
          humidity: "Humidity",
          conditions: {
            clear: "Clear sky",
            partlyCloudy: "Partly cloudy",
            cloudy: "Cloudy",
            fog: "Fog",
            drizzle: "Drizzle",
            rain: "Rain",
            snow: "Snow",
            thunderstorm: "Thunderstorm"
          }
        },
        caption: {
          viewWork: "View work"
        }
      },
      company: {
        title1: "Heritage &",
        title2: "Quality",
        p1: "Founded in 1998, EHL — Eletro Hidro Ltda. is a benchmark in heavy engineering and infrastructure in Brazil. We operate in highways, urban development, and major public works with technical excellence and commitment to quality.",
        p2: "Our multidisciplinary team of engineers and specialists delivers world-class solutions that stand the test of time. Our legacy is built on trust, technical excellence, and a constant search for innovation.",
        iso: "ISO 9001:2015 — Quality Management System",
        pbqp: "PBQP do Habitat — Level A",
        licensing: "Comprehensive Environmental Licensing",
        safety: "Occupational Safety — NR-18 Compliance",
        years: "Years of Experience",
        delivered: "Projects Delivered",
        level: "Level A",
        collaborators: "Collaborators",
        imageAlt: "EHL — Eletro Hidro Ltda. headquarters"
      },

      equipments: {
        title1: "Our",
        title2: " Equipment",
        subtitle: "In-house fleet of heavy machinery and state-of-the-art equipment to serve projects of any size and complexity.",
        1: {
          title: "Hydraulic Excavators",
          description: "High-performance machines for digging trenches, foundations, and moving large volumes of earth. Fleet with models from 20 to 50 tons.",
          amount: "12 units",
          category: "Excavation"
        },
        2: {
          title: "Dump Trucks",
          description: "Fleet of dump trucks for transporting earth, gravel, and construction materials. Capacities from 14 m³ to 25 m³.",
          amount: "28 units",
          category: "Transport"
        },
        3: {
          title: "Asphalt Pavers",
          description: "State-of-the-art equipment for applying asphalt mix with electronic thickness control and automatic leveling.",
          amount: "4 units",
          category: "Paving"
        },
        4: {
          title: "Motor Graders",
          description: "Machines for grading and leveling terrain, preparing sub-base, and maintaining unpaved roads.",
          amount: "6 units",
          category: "Earthmoving"
        },
        5: {
          title: "Wheel Loaders",
          description: "Versatile equipment for loading, unloading, and moving materials in infrastructure and mining projects.",
          amount: "8 units",
          category: "Material Handling"
        },
        6: {
          title: "Compactor Rollers",
          description: "Vibratory rollers for compacting embankments, sub-base, and asphalt layers, ensuring the density specified in the project.",
          amount: "10 units",
          category: "Compaction"
        }
      },

      constructions: {
        title1: "Projects",
        title2: " in Progress",
        subtitle: "Follow the projects EHL is currently executing — heavy engineering with excellence across Brazil.",
        inProgressTitle: "Projects in progress",
        viewAll: "View all",
        delivery: "Delivery",
        loading: "Loading…",
        empty: "No projects registered at the moment.",
        labels: {
          location: "Location",
          client: "Client",
          forecast: "Forecast"
        },
        1: {
          title: "BR-040 Duplication — Cristalina/GO Stretch",
          city: "Cristalina",
          uf: "GO",
          client: "DNIT",
          status: "In progress",
          deliveryForecast: "Dec/2025",
          description: "Duplication, earthworks and asphalt paving of 42 km on a federal highway.",
          type: "Highway Paving"
        },
        2: {
          title: "Urban Infrastructure — Parque das Águas Subdivision",
          city: "Uberlândia",
          uf: "MG",
          client: "Ápia Construction",
          status: "In progress",
          deliveryForecast: "Mar/2026",
          description: "Stormwater drainage network, culverts, paving and signage for a subdivision with 1,200 lots.",
          type: "Urban Development"
        },
        3: {
          title: "Bridge over the Paranaíba River — MS-395",
          city: "Paranaíba",
          uf: "MS",
          client: "Government of the State of MS",
          status: "In progress",
          deliveryForecast: "Jun/2026",
          description: "Construction of a prestressed concrete bridge with 180 m span and highway access works.",
          type: "Special Structures"
        },
        4: {
          title: "Drainage System — Av. Brasil, Anápolis",
          city: "Anápolis",
          uf: "GO",
          client: "Anápolis City Hall",
          status: "In progress",
          deliveryForecast: "Sep/2025",
          description: "Installation of stormwater galleries and asphalt resurfacing along 8 km of avenue.",
          type: "Stormwater Galleries"
        },
        5: {
          title: "Earthworks — Triângulo Logistics Complex",
          city: "Uberaba",
          uf: "MG",
          client: "Log Commercial Properties",
          status: "In progress",
          deliveryForecast: "Nov/2025",
          description: "Movement of 450,000 m³ of soil for an industrial platform and road accesses.",
          type: "Earthworks"
        },
        6: {
          title: "GO-060 Rehabilitation — Goiânia/Trindade Stretch",
          city: "Goiânia",
          uf: "GO",
          client: "AGETOP",
          status: "In progress",
          deliveryForecast: "Feb/2026",
          description: "Milling, resurfacing and horizontal/vertical signage along 25 km of state highway.",
          type: "Highway Paving"
        }
      },

      portfolio: {
        title1: "Featured",
        title2: "Projects",
        subtitle: "Engineering excellence projects throughout Brazil.",
        detailsTitle: "Execution Details",
        1: {
          title: "Indigenous Games Olympic Village",
          category: "Infrastructure",
          location: "Palmas - TO",
          description: "Full construction of the sports complex for the World Indigenous Peoples Games, including road infrastructure, drainage, landscaping, and support buildings.",
          details: {
            1: "Earthworks and paving of the complex",
            2: "Complete stormwater drainage system",
            3: "Electrical infrastructure and lighting",
            4: "Retaining works and landscaping"
          }
        },
        2: {
          title: "Alphaville Palmas & Eusébio-CE",
          category: "Urban Development",
          location: "Palmas-TO / Eusébio-CE",
          description: "Delivery of complete infrastructure for Alphaville residential developments, including earthworks, paving, drainage networks, and water supply.",
          details: {
            1: "Earthworks and soil movement",
            2: "Asphalt paving and interlocking pavement",
            3: "Water and sanitary sewer networks",
            4: "Drainage and stormwater galleries"
          }
        },
        3: {
          title: "BR-163 PA & GO-520",
          category: "Highway Paving",
          location: "Pará / Goiás",
          description: "Paving and rehabilitation works on federal and state highways, including deep drainage, earthworks, and road signage.",
          details: {
            1: "Asphalt paving — CBUQ and TST",
            2: "Deep and surface drainage",
            3: "Earthworks and subgrade regularization",
            4: "Horizontal and vertical signage"
          }
        },
        4: {
          title: "Urban Mobility — Gurupi-TO",
          category: "Urban Mobility",
          location: "Gurupi - TO",
          description: "Urban paving and stormwater galleries to improve mobility, covering several avenues and streets in the municipality.",
          details: {
            1: "Concrete stormwater galleries",
            2: "Urban asphalt paving",
            3: "Curb and gutter",
            4: "Signage and accessibility"
          }
        }
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
        sendButton: "Send Message",
        sentButton: "Message Sent!"
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
        equipments: "Equipos",
        constructions: "Obras",
        infrastructure: "Infraestructura",
        portfolio: "Portafolio",
        contact: "Contacto",
        quote: "Cotizar",
      },
      hero: {
        title1: "EXCELENCIA",
        title2: "EN INGENIERÍA",
        subtitle: "Construyendo el futuro de la infraestructura en todo Brasil desde 1998. Especializados en carreteras, desarrollo urbano y grandes obras públicas.",
        discover: "Descubre Más",
        portfolio: "Nuestro Portafolio",
        iso: "ISO 9001:2015 Certificado",
        pbqp: "PBQP do Habitat — Nivel A",
        widgets: {
          video: "Video",
          videoTitle: "Video institucional",
          videoUnavailable: "Video no disponible.",
          weather: "Tiempo ahora",
          todayRange: "Hoy",
          rain: "Lluvia",
          rainYes: "Sí",
          rainNo: "No",
          updatedAt: "Actualizado en",
          loading: "Cargando…",
          usdError: "No se pudo cargar la cotización ahora.",
          weatherNoLocation: "Permite la ubicación para ver el clima.",
          weatherError: "No se pudo cargar el clima ahora.",
          exchange: "Cambio",
          wind: "Viento",
          forecast: "Próximos días",
          feelsLike: "Sensación",
          humidity: "Humedad",
          conditions: {
            clear: "Cielo despejado",
            partlyCloudy: "Parcialmente nublado",
            cloudy: "Nublado",
            fog: "Niebla",
            drizzle: "Llovizna",
            rain: "Lluvia",
            snow: "Nieve",
            thunderstorm: "Tormenta"
          }
        },
        caption: {
          viewWork: "Ver obra"
        }
      },
      company: {
        title1: "Historia &",
        title2: "Calidad",
        p1: "Fundada en 1998, EHL — Eletro Hidro Ltda. es un referente en ingeniería pesada e infraestructura en Brasil. Operamos en carreteras, desarrollo urbano y grandes obras públicas con excelencia técnica y compromiso con la calidad.",
        p2: "Nuestro equipo multidisciplinario de ingenieros y especialistas entrega soluciones de clase mundial que perduran en el tiempo. Nuestro legado se basa en la confianza, la excelencia técnica y la búsqueda constante de innovación.",
        iso: "ISO 9001:2015 — Sistema de Gestión de Calidad",
        pbqp: "PBQP do Habitat — Nivel A",
        licensing: "Licenciamiento Ambiental Completo",
        safety: "Seguridad Laboral — Cumplimiento NR-18",
        years: "Años de Experiencia",
        delivered: "Obras Entregadas",
        level: "Nivel A",
        collaborators: "Colaboradores",
        imageAlt: "Sede de EHL — Eletro Hidro Ltda."
      },
      equipments: {
        title1: "Nuestros ",
        title2: " Equipos",
        subtitle: "Flota propia de maquinaria pesada y equipos de última generación para atender obras de cualquier tamaño y complejidad.",
        1: {
          title: "Excavadoras Hidráulicas",
          description: "Máquinas de alto rendimiento para excavación de zanjas, cimientos y movimiento de grandes volúmenes de tierra. Flota con modelos de 20 a 50 toneladas.",
          amount: "12 unidades",
          category: "Excavación"
        },
        2: {
          title: "Camiones Volquete",
          description: "Flota de camiones volquete para transporte de tierra, grava y materiales de construcción. Capacidades de 14 m³ a 25 m³.",
          amount: "28 unidades",
          category: "Transporte"
        },
        3: {
          title: "Pavimentadoras de Asfalto",
          description: "Equipos de última generación para la aplicación de mezcla asfáltica con control electrónico de espesor y nivelación automática.",
          amount: "4 unidades",
          category: "Pavimentación"
        },
        4: {
          title: "Motoniveladoras",
          description: "Máquinas para nivelación y regularización de terrenos, preparación de sub-base y mantenimiento de carreteras no pavimentadas.",
          amount: "6 unidades",
          category: "Movimiento de Tierras"
        },
        5: {
          title: "Palas Cargadoras",
          description: "Equipos versátiles para carga, descarga y movimiento de materiales en obras de infraestructura y minería.",
          amount: "8 unidades",
          category: "Manipulación de Materiales"
        },
        6: {
          title: "Rodillos Compactadores",
          description: "Rodillos vibratorios para la compactación de terraplenes, sub-base y capas asfálticas, garantizando la densidad especificada en el proyecto.",
          amount: "10 unidades",
          category: "Compactación"
        }
      },
      constructions: {
        title1: "Obras",
        title2: " en Ejecución",
        subtitle: "Sigue los proyectos que EHL está ejecutando ahora — ingeniería pesada con excelencia en todo Brasil.",
        inProgressTitle: "Obras en ejecución",
        viewAll: "Ver todas",
        delivery: "Entrega",
        loading: "Cargando…",
        empty: "Ninguna obra registrada por el momento.",
        labels: {
          location: "Ubicación",
          client: "Cliente",
          forecast: "Previsión"
        },
        1: {
          title: "Duplicación de la BR-040 — Tramo Cristalina/GO",
          city: "Cristalina",
          uf: "GO",
          client: "DNIT",
          status: "En ejecución",
          deliveryForecast: "Dic/2025",
          description: "Duplicación, movimiento de tierras y pavimentación asfáltica de 42 km en carretera federal.",
          type: "Pavimentación Vial"
        },
        2: {
          title: "Infraestructura Urbana — Loteamiento Parque das Águas",
          city: "Uberlândia",
          uf: "MG",
          client: "Constructora Ápia",
          status: "En ejecución",
          deliveryForecast: "Mar/2026",
          description: "Red de drenaje, galerías pluviales, pavimentación y señalización de un loteamiento con 1.200 lotes.",
          type: "Desarrollo Urbano"
        },
        3: {
          title: "Puente sobre el Río Paranaíba — MS-395",
          city: "Paranaíba",
          uf: "MS",
          client: "Gobierno del Estado de MS",
          status: "En ejecución",
          deliveryForecast: "Jun/2026",
          description: "Construcción de un puente de hormigón pretensado con 180 m de extensión y accesos viales.",
          type: "Obras Especiales"
        },
        4: {
          title: "Sistema de Drenaje — Av. Brasil, Anápolis",
          city: "Anápolis",
          uf: "GO",
          client: "Alcaldía de Anápolis",
          status: "En ejecución",
          deliveryForecast: "Sep/2025",
          description: "Implantación de galerías pluviales y recapado asfáltico en 8 km de avenida.",
          type: "Galerías Pluviales"
        },
        5: {
          title: "Movimiento de Tierras — Complejo Logístico Triângulo",
          city: "Uberaba",
          uf: "MG",
          client: "Log Commercial Properties",
          status: "En ejecución",
          deliveryForecast: "Nov/2025",
          description: "Movimiento de 450.000 m³ de tierra para plataforma industrial y accesos viales.",
          type: "Movimiento de Tierras"
        },
        6: {
          title: "Restauración de la GO-060 — Tramo Goiânia/Trindade",
          city: "Goiânia",
          uf: "GO",
          client: "AGETOP",
          status: "En ejecución",
          deliveryForecast: "Feb/2026",
          description: "Fresado, recapado y señalización horizontal/vertical en 25 km de carretera estadual.",
          type: "Pavimentación Vial"
        }
      },

      portfolio: {
        title1: "Proyectos",
        title2: "Destacados",
        subtitle: "Obras de excelencia en ingeniería por todo Brasil.",
        detailsTitle: "Detalles de Ejecución",
        1: {
          title: "Villa Olímpica de los Juegos Indígenas",
          category: "Infraestructura",
          location: "Palmas - TO",
          description: "Construcción completa del complejo deportivo para los Juegos Mundiales de los Pueblos Indígenas, incluyendo infraestructura vial, drenaje, paisajismo y edificaciones de apoyo.",
          details: {
            1: "Movimiento de tierras y pavimentación del complejo",
            2: "Sistema completo de drenaje pluvial",
            3: "Infraestructura eléctrica e iluminación",
            4: "Obras de contención y paisajismo"
          }
        },
        2: {
          title: "Alphaville Palmas & Eusébio-CE",
          category: "Desarrollo Urbano",
          location: "Palmas-TO / Eusébio-CE",
          description: "Ejecución de infraestructura completa para loteamientos Alphaville, incluyendo movimiento de tierras, pavimentación, redes de drenaje y abastecimiento de agua.",
          details: {
            1: "Movimiento de tierras y excavación",
            2: "Pavimentación asfáltica y adoquinado",
            3: "Redes de agua y alcantarillado sanitario",
            4: "Drenaje y galerías pluviales"
          }
        },
        3: {
          title: "BR-163 PA & GO-520",
          category: "Pavimentación Vial",
          location: "Pará / Goiás",
          description: "Obras de pavimentación y restauración en carreteras federales y estaduales, incluyendo drenaje profundo, movimiento de tierras y señalización vial.",
          details: {
            1: "Pavimentación asfáltica — CBUQ y TST",
            2: "Drenaje profundo y superficial",
            3: "Movimiento de tierras y regularización de la subrasante",
            4: "Señalización horizontal y vertical"
          }
        },
        4: {
          title: "Movilidad Urbana — Gurupi-TO",
          category: "Movilidad Urbana",
          location: "Gurupi - TO",
          description: "Ejecución de pavimentación y galerías pluviales para mejorar la movilidad urbana, abarcando diversas avenidas y calles del municipio.",
          details: {
            1: "Galerías pluviales de concreto",
            2: "Pavimentación asfáltica urbana",
            3: "Bordillo y cuneta",
            4: "Señalización y accesibilidad"
          }
        }
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
        sendButton: "Enviar Mensaje",
        sentButton: "¡Mensaje enviado!"
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

const LANG_TAGS: Record<string, string> = { pt: 'pt-BR', en: 'en', es: 'es' };
const SUPPORTED = ['pt', 'en', 'es'];

const readStoredLang = (): string => {
  try {
    const v = localStorage.getItem('ehl-lang');
    if (v && SUPPORTED.includes(v)) return v;
  } catch { /* localStorage indisponível */ }
  return 'pt';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: readStoredLang(), // idioma padrão (persistido entre sessões)
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false
    }
  });

// Mantém <html lang> em sincronia com o idioma ativo e persiste a escolha do usuário.
const applyLang = (lng: string) => {
  if (typeof document !== 'undefined') {
    document.documentElement.lang = LANG_TAGS[lng] || lng;
  }
};
applyLang(i18n.language);
i18n.on('languageChanged', (lng) => {
  applyLang(lng);
  try { localStorage.setItem('ehl-lang', lng); } catch { /* ignore */ }
});

export default i18n;
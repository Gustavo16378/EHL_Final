// Mock — dados estáticos, sem Strapi
import portfolioFerroviaNorteSul from '@/assets/portifolio/FerroviaNorteSul.jpg';
import portfolioFerroviaOesteLeste from '@/assets/portifolio/FerroviaOesteLeste.jpg';
import portfolioPonteFHC from '@/assets/portifolio/PontePresidenteFHC.jpg';
import portfolioGO139 from '@/assets/portifolio/GO-139.jpg';
import portfolioParaisoTocantins from '@/assets/portifolio/ParaisoTocantins.jpg';
import portfolioGurupiTo from '@/assets/portifolio/GurupiTo.jpg';
import portfolioFormosoAraguaia from '@/assets/portifolio/FormosoAraguaia.jpg';
import portfolioAlphavillePalmas from '@/assets/portifolio/AlphavillePalmas.jpg';
import obraConsorcioPontes from '@/assets/ConsorcioPontes.jpeg';
import obraAltaFloresta from '@/assets/AltaFloresta.jpeg';
import obraNS15 from '@/assets/NS15Palmas.jpg';
import equipCaminhao from '@/assets/equip-caminhao.jpg';
import equipMotoniveladora from '@/assets/equip-motoniveladora.jpg';
import equipPaCarregadeira from '@/assets/equip-pa-carregadeira.jpg';
import equipPavimentadora from '@/assets/equip-pavimentadora.jpg';
import equipRoloCompactador from '@/assets/equip-rolo-compactador.jpg';
import equipEscavadeira from '@/assets/equip-escavadeira.jpg';

export const resolveLocale = (language: string | undefined) => {
  const value = (language ?? 'pt').toLowerCase();
  if (value.startsWith('pt')) return 'pt';
  if (value.startsWith('en')) return 'en';
  if (value.startsWith('es')) return 'es';
  return 'pt';
};

export const getCmsImageUrl = (_image: unknown): string | null => {
  if (typeof _image === 'string') return _image;
  return null;
};

// Página única — componentes já usam i18n como fallback
export const fetchSingle = async <TAttributes>(
  _apiName: string,
  _opts?: object,
): Promise<TAttributes | null> => null;

type MockEntity<T> = { id: number; attributes: T };

// ---------------------------------------------------------------------------
// Equipamentos
// ---------------------------------------------------------------------------
const EQUIPAMENTOS: Record<string, MockEntity<Record<string, unknown>>[]> = {
  pt: [
    { id: 1, attributes: { name: 'Escavadeiras Hidráulicas', description: 'Máquinas de alta performance para escavação de valas, fundações e movimentação de terra em grandes volumes. Frota com modelos de 20 a 50 toneladas.', amount: '12 unidades', category: 'Escavação', image: equipEscavadeira } },
    { id: 2, attributes: { name: 'Caminhões Basculantes', description: 'Frota de caminhões caçamba para transporte de terra, brita e materiais de construção. Capacidades de 14 m³ a 25 m³.', amount: '28 unidades', category: 'Transporte', image: equipCaminhao } },
    { id: 3, attributes: { name: 'Pavimentadoras de Asfalto', description: 'Equipamentos de última geração para aplicação de massa asfáltica com controle eletrônico de espessura e nivelamento automático.', amount: '4 unidades', category: 'Pavimentação', image: equipPavimentadora } },
    { id: 4, attributes: { name: 'Motoniveladoras', description: 'Máquinas para nivelamento e regularização de terrenos, preparo de sub-base e manutenção de estradas não pavimentadas.', amount: '6 unidades', category: 'Terraplenagem', image: equipMotoniveladora } },
    { id: 5, attributes: { name: 'Pás Carregadeiras', description: 'Equipamentos versáteis para carga, descarga e movimentação de materiais em obras de infraestrutura e mineração.', amount: '8 unidades', category: 'Movimentação', image: equipPaCarregadeira } },
    { id: 6, attributes: { name: 'Rolos Compactadores', description: 'Rolos vibratórios para compactação de aterros, sub-base e camadas asfálticas, garantindo a densidade especificada em projeto.', amount: '10 unidades', category: 'Compactação', image: equipRoloCompactador } },
  ],
  en: [
    { id: 1, attributes: { name: 'Hydraulic Excavators', description: 'High-performance machines for digging trenches, foundations, and moving large volumes of earth. Fleet with models from 20 to 50 tons.', amount: '12 units', category: 'Excavation', image: equipEscavadeira } },
    { id: 2, attributes: { name: 'Dump Trucks', description: 'Fleet of dump trucks for transporting earth, gravel, and construction materials. Capacities from 14 m³ to 25 m³.', amount: '28 units', category: 'Transport', image: equipCaminhao } },
    { id: 3, attributes: { name: 'Asphalt Pavers', description: 'State-of-the-art equipment for applying asphalt mix with electronic thickness control and automatic leveling.', amount: '4 units', category: 'Paving', image: equipPavimentadora } },
    { id: 4, attributes: { name: 'Motor Graders', description: 'Machines for grading and leveling terrain, preparing sub-base, and maintaining unpaved roads.', amount: '6 units', category: 'Earthmoving', image: equipMotoniveladora } },
    { id: 5, attributes: { name: 'Wheel Loaders', description: 'Versatile equipment for loading, unloading, and moving materials in infrastructure and mining projects.', amount: '8 units', category: 'Material Handling', image: equipPaCarregadeira } },
    { id: 6, attributes: { name: 'Compactor Rollers', description: 'Vibratory rollers for compacting embankments, sub-base, and asphalt layers, ensuring the density specified in the project.', amount: '10 units', category: 'Compaction', image: equipRoloCompactador } },
  ],
  es: [
    { id: 1, attributes: { name: 'Excavadoras Hidráulicas', description: 'Máquinas de alto rendimiento para excavación de zanjas, cimientos y movimiento de grandes volúmenes de tierra. Flota con modelos de 20 a 50 toneladas.', amount: '12 unidades', category: 'Excavación', image: equipEscavadeira } },
    { id: 2, attributes: { name: 'Camiones Volquete', description: 'Flota de camiones volquete para transporte de tierra, grava y materiales de construcción. Capacidades de 14 m³ a 25 m³.', amount: '28 unidades', category: 'Transporte', image: equipCaminhao } },
    { id: 3, attributes: { name: 'Pavimentadoras de Asfalto', description: 'Equipos de última generación para la aplicación de mezcla asfáltica con control electrónico de espesor y nivelación automática.', amount: '4 unidades', category: 'Pavimentación', image: equipPavimentadora } },
    { id: 4, attributes: { name: 'Motoniveladoras', description: 'Máquinas para nivelación y regularización de terrenos, preparación de sub-base y mantenimiento de carreteras no pavimentadas.', amount: '6 unidades', category: 'Movimiento de Tierras', image: equipMotoniveladora } },
    { id: 5, attributes: { name: 'Palas Cargadoras', description: 'Equipos versátiles para carga, descarga y movimiento de materiales en obras de infraestructura y minería.', amount: '8 unidades', category: 'Manipulación de Materiales', image: equipPaCarregadeira } },
    { id: 6, attributes: { name: 'Rodillos Compactadores', description: 'Rodillos vibratorios para la compactación de terraplenes, sub-base y capas asfálticas, garantizando la densidad especificada en el proyecto.', amount: '10 unidades', category: 'Compactación', image: equipRoloCompactador } },
  ],
};

// ---------------------------------------------------------------------------
// Obras em andamento
// ---------------------------------------------------------------------------
const OBRAS: Record<string, MockEntity<Record<string, unknown>>[]> = {
  pt: [
    { id: 1, attributes: { name: 'Consórcio Pontes — Ponte Gov. Siqueira Campos', city: 'Palmas', uf: 'TO', client: 'Governo do Estado do Tocantins', situacao: 'Em andamento', deliveryForecast: 'Dez/2026', description: 'Duplicação e restauração da Ponte Governador José Wilson Siqueira Campos (TO-080), uma das principais obras de arte especiais do Tocantins, conectando Palmas ao Plano Diretor Norte sobre o Lago de Palmas.', type: 'Obras de Arte Especiais', image: obraConsorcioPontes } },
    { id: 2, attributes: { name: 'Avenida NS-15 — Palmas', city: 'Palmas', uf: 'TO', client: 'Prefeitura de Palmas', situacao: 'Em andamento', deliveryForecast: 'Set/2026', description: 'Execução de obras de infraestrutura urbana na Avenida NS-15 em Palmas-TO, contemplando terraplenagem, drenagem pluvial, pavimentação asfáltica e sinalização viária em trecho estratégico da capital tocantinense.', type: 'Infraestrutura Urbana', image: obraNS15 } },
    { id: 3, attributes: { name: 'MT-325 — Alta Floresta', city: 'Alta Floresta', uf: 'MT', client: 'Sinfra-MT', situacao: 'Em andamento', deliveryForecast: 'Jul/2026', description: 'Execução de obras rodoviárias na MT-325, trecho do município de Alta Floresta no norte do Mato Grosso. Contrato com a Secretaria de Infraestrutura e Logística do Estado do Mato Grosso (Sinfra-MT).', type: 'Pavimentação Rodoviária Estadual', image: obraAltaFloresta } },
  ],
  en: [
    { id: 1, attributes: { name: 'Bridge Consortium — Gov. Siqueira Campos Bridge', city: 'Palmas', uf: 'TO', client: 'Government of the State of Tocantins', situacao: 'In progress', deliveryForecast: 'Dec/2026', description: 'Duplication and restoration of the Governador José Wilson Siqueira Campos Bridge (TO-080), one of Tocantins\' main special structures, connecting Palmas to the Northern Urban Plan over Palmas Lake.', type: 'Special Structures', image: obraConsorcioPontes } },
    { id: 2, attributes: { name: 'NS-15 Avenue — Palmas', city: 'Palmas', uf: 'TO', client: 'Palmas City Hall', situacao: 'In progress', deliveryForecast: 'Sep/2026', description: 'Urban infrastructure works on NS-15 Avenue in Palmas-TO, including earthworks, stormwater drainage, asphalt paving, and road signage on a strategic stretch of Tocantins\' capital city.', type: 'Urban Infrastructure', image: obraNS15 } },
    { id: 3, attributes: { name: 'MT-325 — Alta Floresta', city: 'Alta Floresta', uf: 'MT', client: 'Sinfra-MT', situacao: 'In progress', deliveryForecast: 'Jul/2026', description: 'Road works on MT-325, in the municipality of Alta Floresta in northern Mato Grosso. Contract with the Secretaria de Infraestrutura e Logística of the State of Mato Grosso (Sinfra-MT).', type: 'State Highway Paving', image: obraAltaFloresta } },
  ],
  es: [
    { id: 1, attributes: { name: 'Consorcio Puentes — Puente Gov. Siqueira Campos', city: 'Palmas', uf: 'TO', client: 'Gobierno del Estado de Tocantins', situacao: 'En ejecución', deliveryForecast: 'Dic/2026', description: 'Duplicación y restauración del Puente Governador José Wilson Siqueira Campos (TO-080), una de las principales obras de arte especiales de Tocantins, que conecta Palmas con el Plan Director Norte sobre el Lago de Palmas.', type: 'Obras Especiales', image: obraConsorcioPontes } },
    { id: 2, attributes: { name: 'Avenida NS-15 — Palmas', city: 'Palmas', uf: 'TO', client: 'Municipalidad de Palmas', situacao: 'En ejecución', deliveryForecast: 'Sep/2026', description: 'Obras de infraestructura urbana en la Avenida NS-15 de Palmas-TO, incluyendo movimiento de tierras, drenaje pluvial, pavimentación asfáltica y señalización vial en un tramo estratégico de la capital tocantinense.', type: 'Infraestructura Urbana', image: obraNS15 } },
    { id: 3, attributes: { name: 'MT-325 — Alta Floresta', city: 'Alta Floresta', uf: 'MT', client: 'Sinfra-MT', situacao: 'En ejecución', deliveryForecast: 'Jul/2026', description: 'Obras viales en la MT-325, tramo del municipio de Alta Floresta en el norte de Mato Grosso. Contrato con la Secretaría de Infraestructura y Logística del Estado de Mato Grosso (Sinfra-MT).', type: 'Pavimentación Vial Estadual', image: obraAltaFloresta } },
  ],
};

// ---------------------------------------------------------------------------
// Portfólio — ordenado por importância (escala e contratante)
// ---------------------------------------------------------------------------
const PORTFOLIO: Record<string, MockEntity<Record<string, unknown>>[]> = {
  pt: [
    {
      id: 1,
      attributes: {
        title: 'Ferrovia Norte-Sul — Lote 14',
        image: portfolioFerroviaNorteSul,
        category: 'Ferrovia Federal',
        location: 'Tocantins',
        description: 'Execução de obras de terraplenagem, drenagem e estruturas no Lote 14 da Ferrovia Norte-Sul (EF-151), um dos maiores projetos de infraestrutura logística do Brasil. A ferrovia conecta o centro-norte do país, atravessando o Tocantins e viabilizando o escoamento da produção agrícola do cerrado para os portos do Norte. Contrato com VALEC Engenharia, Construções e Ferrovias S.A., empresa pública federal.',
        details: [
          'Terraplenagem em solo e rocha com grande volume de movimentação',
          'Obras de arte correntes — bueiros, pontilhões e galerias',
          'Obras de arte especiais — pontes e viadutos ferroviários',
          'Drenagem longitudinal e transversal do corpo estradal',
          'Contratante: VALEC Engenharia, Construções e Ferrovias S.A.',
          'Trecho localizado no estado do Tocantins',
        ],
      },
    },
    {
      id: 2,
      attributes: {
        title: 'Ferrovia Oeste-Leste (FIOL) — Lote 07F',
        image: portfolioFerroviaOesteLeste,
        category: 'Ferrovia Federal',
        location: 'Bahia',
        description: 'Participação nas obras da Ferrovia de Integração Oeste-Leste (EF-334 / FIOL), contrato CON009 Lote 07F, na Bahia. A FIOL conectará o interior da Bahia ao Porto de Ilhéus (1.527 km), integrando a produção agrícola e mineral do oeste baiano ao mercado exportador. A EHL executou terraplenagem, drenagem e obras de arte especiais nesse trecho estratégico.',
        details: [
          'Terraplenagem, corte e aterro em solo e rocha',
          'Drenagem pluvial longitudinal e transversal',
          'Obras de arte especiais — pontes e viadutos',
          'Contratante: VALEC / Ministério dos Transportes',
          'Trecho no estado da Bahia — Ferrovia EF-334',
        ],
      },
    },
    {
      id: 3,
      attributes: {
        title: 'Ponte Presidente FHC — Iluminação',
        image: portfolioPonteFHC,
        category: 'Obras de Arte Especiais',
        location: 'Palmas / Paraíso do Tocantins — TO',
        description: 'Execução do projeto de iluminação do aterro e da Ponte Presidente Fernando Henrique Cardoso sobre o Rio Tocantins e o lago da Usina Hidrelétrica Luiz Eduardo Magalhães (UHE Lajeado). A obra é um símbolo da integração entre Palmas e a região de Paraíso do Tocantins, com visibilidade estratégica para o estado.',
        details: [
          'Iluminação do aterro de acesso — margem esquerda e direita',
          'Iluminação da ponte sobre o Rio Tocantins',
          'Iluminação do espelho d\'água do lago da UHE Luiz Eduardo Magalhães',
          'Infraestrutura elétrica de alta e média tensão',
          'Obra de referência para o estado do Tocantins',
        ],
      },
    },
    {
      id: 4,
      attributes: {
        title: 'Pro-Município — 139 Municípios do Tocantins',
        image: portfolioGO139,
        category: 'Manutenção Rodoviária',
        location: 'Estado do Tocantins',
        description: 'Execução do Programa Pro-Município, em consórcio com a empresa JM, abrangendo conservação e manutenção do pavimento asfáltico de vias urbanas em 139 municípios do Tocantins. O programa foi a maior ação de conservação rodoviária municipal já realizada no estado, garantindo trafegabilidade e qualidade de vida à população.',
        details: [
          'Conservação e manutenção de pavimento em 139 municípios',
          'Tapa-buracos, fresagem e recapeamento asfáltico',
          'Sinalização horizontal e vertical',
          'Consórcio EHL / JM',
          'Contratante: Governo do Estado do Tocantins',
        ],
      },
    },
    {
      id: 5,
      attributes: {
        title: 'BR-153 — Entroncamento Tupiratins (44,68 km)',
        image: portfolioParaisoTocantins,
        category: 'Pavimentação Rodoviária Federal',
        location: 'Tocantins',
        description: 'Execução de complementação de terraplenagem, pavimentação asfáltica e obras de arte especiais no trecho do Entroncamento BR-153 / Tupiratins, totalizando 44,68 km. A BR-153 (Rodovia Belém-Brasília / Rodovia Bernardo Sayão) é o principal eixo rodoviário do centro-norte do Brasil, cortando o estado do Tocantins longitudinalmente.',
        details: [
          'Terraplenagem complementar e regularização do subleito',
          'Pavimentação asfáltica em CBUQ — 44,68 km',
          'Obras de arte especiais — pontes e viadutos',
          'Obras de arte correntes — bueiros e pontilhões',
          'Contratante: DNIT — Departamento Nacional de Infraestrutura de Transportes',
        ],
      },
    },
    {
      id: 6,
      attributes: {
        title: 'BR-163 PA — Vila Moraes Almeida / Vila Planalto',
        image: portfolioGurupiTo,
        category: 'Pavimentação Rodoviária Federal',
        location: 'Pará',
        description: 'Participação nas obras de pavimentação da BR-163 (Rodovia Cuiabá–Santarém) no trecho Vila Moraes Almeida / Vila Planalto, no Pará, integrando o Consórcio CEFF. A BR-163 é um corredor estratégico para o escoamento da produção agrícola do centro-oeste brasileiro em direção aos portos do Norte do país.',
        details: [
          'Terraplenagem e regularização da plataforma viária',
          'Pavimentação asfáltica em CBUQ',
          'Drenagem superficial e profunda',
          'Sinalização horizontal e vertical',
          'Participação via Consórcio CEFF',
        ],
      },
    },
    {
      id: 7,
      attributes: {
        title: 'BR-242/TO — Restauração Formoso do Araguaia',
        image: portfolioFormosoAraguaia,
        category: 'Pavimentação Rodoviária Federal',
        location: 'Formoso do Araguaia — TO',
        description: 'Execução das obras remanescentes de restauração da Rodovia Federal BR-242/TO no trecho de Formoso do Araguaia, contratadas pelo DNIT. A BR-242 conecta o sul do Tocantins ao oeste do Brasil, sendo fundamental para o escoamento agrícola da região do Araguaia.',
        details: [
          'Restauração do pavimento asfáltico deteriorado',
          'Correção de defeitos de superfície e estruturais',
          'Intervenção em obras de arte correntes',
          'Drenagem e limpeza de dispositivos existentes',
          'Contratante: DNIT — 9ª Unidade Regional de Goiás/TO',
        ],
      },
    },
    {
      id: 8,
      attributes: {
        title: 'Alphaville Palmas 1 e 2',
        image: portfolioAlphavillePalmas,
        category: 'Desenvolvimento Urbano Privado',
        location: 'Palmas — TO',
        description: 'Execução de terraplenagem, drenagem, pavimentação asfáltica e sinalização viária das obras externas dos empreendimentos Alphaville Palmas 1 e 2, na capital do Tocantins. A marca Alphaville é referência nacional em qualidade urbanística, e a EHL entregou toda a infraestrutura viária externa necessária para o pleno funcionamento dos condomínios.',
        details: [
          'Terraplenagem e movimentação de terra',
          'Pavimentação asfáltica das vias externas',
          'Sinalização viária horizontal e vertical',
          'Rede de drenagem pluvial',
          'Contratante: Alphaville Urbanismo S.A.',
        ],
      },
    },
  ],

  en: [
    {
      id: 1,
      attributes: {
        title: 'North-South Railway — Lot 14',
        image: portfolioFerroviaNorteSul,
        category: 'Federal Railway',
        location: 'Tocantins',
        description: 'Execution of earthworks, drainage, and structural works on Lot 14 of the North-South Railway (EF-151), one of the largest logistics infrastructure projects in Brazil. The railway links the central-north region of the country, crossing Tocantins and enabling the flow of agricultural commodities from the cerrado to Northern ports. Contract with VALEC Engenharia, Construções e Ferrovias S.A., a federal state enterprise.',
        details: [
          'Earthworks in soil and rock with large volume movement',
          'Common structures — culverts and small bridges',
          'Special structures — bridges and railway viaducts',
          'Longitudinal and transverse drainage',
          'Client: VALEC Engenharia, Construções e Ferrovias S.A.',
          'Stretch located in the state of Tocantins',
        ],
      },
    },
    {
      id: 2,
      attributes: {
        title: 'West-East Railway (FIOL) — Lot 07F',
        image: portfolioFerroviaOesteLeste,
        category: 'Federal Railway',
        location: 'Bahia',
        description: 'Participation in the construction of the West-East Integration Railway (EF-334 / FIOL), contract CON009 Lot 07F, in Bahia. FIOL will connect the interior of Bahia to the Port of Ilhéus (1,527 km), integrating agricultural and mineral production from western Bahia to export markets. EHL executed earthworks, drainage, and special structures on this strategic stretch.',
        details: [
          'Earthworks, cut and fill in soil and rock',
          'Longitudinal and transverse stormwater drainage',
          'Special structures — bridges and viaducts',
          'Client: VALEC / Ministry of Transport',
          'Stretch in the state of Bahia — Railway EF-334',
        ],
      },
    },
    {
      id: 3,
      attributes: {
        title: 'FHC Bridge — Illumination Works',
        image: portfolioPonteFHC,
        category: 'Special Structures',
        location: 'Palmas / Paraíso do Tocantins — TO',
        description: 'Execution of the illumination project for the causeway and the Presidente Fernando Henrique Cardoso Bridge over the Tocantins River and the Luiz Eduardo Magalhães Hydroelectric Plant (UHE Lajeado) reservoir. The bridge is a landmark connecting Palmas to the Paraíso do Tocantins region, with strategic visibility for the entire state of Tocantins.',
        details: [
          'Causeway lighting — both banks',
          'Bridge lighting over the Tocantins River',
          'Water surface illumination of the UHE Luiz Eduardo Magalhães reservoir',
          'High and medium voltage electrical infrastructure',
          'Landmark infrastructure for the state of Tocantins',
        ],
      },
    },
    {
      id: 4,
      attributes: {
        title: 'Pro-Município — 139 Municipalities of Tocantins',
        image: portfolioGO139,
        category: 'Road Maintenance',
        location: 'State of Tocantins',
        description: 'Execution of the Pro-Município Program, in consortium with JM, covering conservation and maintenance of asphalt pavement on urban roads in 139 municipalities of Tocantins. The program was the largest municipal road maintenance action ever undertaken in the state, ensuring trafficability and quality of life for the population.',
        details: [
          'Pavement conservation and maintenance across 139 municipalities',
          'Pothole repairs, milling, and asphalt resurfacing',
          'Horizontal and vertical road signage',
          'EHL / JM Consortium',
          'Client: Government of the State of Tocantins',
        ],
      },
    },
    {
      id: 5,
      attributes: {
        title: 'BR-153 — Tupiratins Junction (44.68 km)',
        image: portfolioParaisoTocantins,
        category: 'Federal Highway Paving',
        location: 'Tocantins',
        description: 'Completion of earthworks, asphalt paving, and special structures on the BR-153 / Tupiratins Junction stretch, totaling 44.68 km. BR-153 (Belém-Brasília Highway / Bernardo Sayão Highway) is the main road axis of central-northern Brazil, running longitudinally through the state of Tocantins.',
        details: [
          'Complementary earthworks and subgrade regularization',
          'Asphalt paving in CBUQ — 44.68 km',
          'Special structures — bridges and viaducts',
          'Common structures — culverts and small bridges',
          'Client: DNIT — National Department of Transport Infrastructure',
        ],
      },
    },
    {
      id: 6,
      attributes: {
        title: 'BR-163 PA — Vila Moraes Almeida / Vila Planalto',
        image: portfolioGurupiTo,
        category: 'Federal Highway Paving',
        location: 'Pará',
        description: 'Participation in paving works on BR-163 (Cuiabá–Santarém Highway), Vila Moraes Almeida / Vila Planalto stretch, in Pará, as part of the CEFF Consortium. BR-163 is a strategic corridor for the flow of agricultural production from central-western Brazil to Northern ports.',
        details: [
          'Earthworks and road platform regularization',
          'Asphalt paving in CBUQ',
          'Surface and deep drainage',
          'Horizontal and vertical road signage',
          'Participation via CEFF Consortium',
        ],
      },
    },
    {
      id: 7,
      attributes: {
        title: 'BR-242/TO — Rehabilitation in Formoso do Araguaia',
        image: portfolioFormosoAraguaia,
        category: 'Federal Highway Paving',
        location: 'Formoso do Araguaia — TO',
        description: 'Execution of remaining rehabilitation works on Federal Highway BR-242/TO in the Formoso do Araguaia stretch, contracted by DNIT. BR-242 connects southern Tocantins to western Brazil, playing a key role in agricultural logistics for the Araguaia region.',
        details: [
          'Rehabilitation of deteriorated asphalt pavement',
          'Surface and structural defect correction',
          'Intervention on existing drainage structures',
          'Cleaning of existing drainage devices',
          'Client: DNIT — 9th Regional Unit Goiás/TO',
        ],
      },
    },
    {
      id: 8,
      attributes: {
        title: 'Alphaville Palmas 1 and 2',
        image: portfolioAlphavillePalmas,
        category: 'Private Urban Development',
        location: 'Palmas — TO',
        description: 'Execution of earthworks, drainage, asphalt paving, and road signage for the external infrastructure of Alphaville Palmas 1 and 2 developments in Tocantins\' capital. The Alphaville brand is a national benchmark for urban quality, and EHL delivered all the external road infrastructure required for the full operation of the condominiums.',
        details: [
          'Earthworks and soil movement',
          'Asphalt paving of external roads',
          'Horizontal and vertical road signage',
          'Stormwater drainage network',
          'Client: Alphaville Urbanismo S.A.',
        ],
      },
    },
  ],

  es: [
    {
      id: 1,
      attributes: {
        title: 'Ferrocarril Norte-Sur — Lote 14',
        image: portfolioFerroviaNorteSul,
        category: 'Ferrocarril Federal',
        location: 'Tocantins',
        description: 'Ejecución de movimiento de tierras, drenaje y estructuras en el Lote 14 del Ferrocarril Norte-Sur (EF-151), uno de los mayores proyectos de infraestructura logística de Brasil. El ferrocarril conecta el centro-norte del país atravesando Tocantins y viabiliza el flujo de la producción agrícola del cerrado hacia los puertos del Norte. Contrato con VALEC Engenharia, Construções e Ferrovias S.A., empresa pública federal.',
        details: [
          'Movimiento de tierras en suelo y roca con gran volumen',
          'Obras de arte corrientes — alcantarillas y pontones',
          'Obras de arte especiales — puentes y viaductos ferroviarios',
          'Drenaje longitudinal y transversal',
          'Contratante: VALEC Engenharia, Construções e Ferrovias S.A.',
          'Tramo ubicado en el estado de Tocantins',
        ],
      },
    },
    {
      id: 2,
      attributes: {
        title: 'Ferrocarril Oeste-Este (FIOL) — Lote 07F',
        image: portfolioFerroviaOesteLeste,
        category: 'Ferrocarril Federal',
        location: 'Bahía',
        description: 'Participación en las obras del Ferrocarril de Integración Oeste-Este (EF-334 / FIOL), contrato CON009 Lote 07F, en Bahía. La FIOL conectará el interior de Bahía con el Puerto de Ilhéus (1.527 km), integrando la producción agrícola y mineral del oeste bahiano a los mercados exportadores. EHL ejecutó movimiento de tierras, drenaje y obras de arte especiales en este tramo estratégico.',
        details: [
          'Movimiento de tierras, corte y terraplén en suelo y roca',
          'Drenaje pluvial longitudinal y transversal',
          'Obras de arte especiales — puentes y viaductos',
          'Contratante: VALEC / Ministerio de Transportes',
          'Tramo en el estado de Bahía — Ferrocarril EF-334',
        ],
      },
    },
    {
      id: 3,
      attributes: {
        title: 'Puente Pdte. FHC — Iluminación',
        image: portfolioPonteFHC,
        category: 'Obras de Arte Especiales',
        location: 'Palmas / Paraíso do Tocantins — TO',
        description: 'Ejecución del proyecto de iluminación del terraplén y del Puente Presidente Fernando Henrique Cardoso sobre el Río Tocantins y el embalse de la Central Hidroeléctrica Luiz Eduardo Magalhães (UHE Lajeado). El puente es un símbolo de integración entre Palmas y la región de Paraíso do Tocantins, con visibilidad estratégica para todo el estado.',
        details: [
          'Iluminación del terraplén de acceso — ambas márgenes',
          'Iluminación del puente sobre el Río Tocantins',
          'Iluminación del espejo de agua del embalse UHE Luiz Eduardo Magalhães',
          'Infraestructura eléctrica de alta y media tensión',
          'Obra de referencia para el estado de Tocantins',
        ],
      },
    },
    {
      id: 4,
      attributes: {
        title: 'Pro-Município — 139 Municipios de Tocantins',
        image: portfolioGO139,
        category: 'Mantenimiento Vial',
        location: 'Estado de Tocantins',
        description: 'Ejecución del Programa Pro-Município, en consorcio con la empresa JM, abarcando la conservación y mantenimiento del pavimento asfáltico de vías urbanas en 139 municipios de Tocantins. El programa fue la mayor acción de conservación vial municipal realizada en el estado, garantizando transitabilidad y calidad de vida a la población.',
        details: [
          'Conservación y mantenimiento de pavimento en 139 municipios',
          'Bacheo, fresado y recapado asfáltico',
          'Señalización horizontal y vertical',
          'Consorcio EHL / JM',
          'Contratante: Gobierno del Estado de Tocantins',
        ],
      },
    },
    {
      id: 5,
      attributes: {
        title: 'BR-153 — Empalme Tupiratins (44,68 km)',
        image: portfolioParaisoTocantins,
        category: 'Pavimentación Vial Federal',
        location: 'Tocantins',
        description: 'Complementación de movimiento de tierras, pavimentación asfáltica y obras de arte especiales en el tramo Empalme BR-153 / Tupiratins, totalizando 44,68 km. La BR-153 (Carretera Belém-Brasília) es el principal eje vial del centro-norte de Brasil, recorriendo longitudinalmente el estado de Tocantins.',
        details: [
          'Movimiento de tierras complementario y regularización de la subrasante',
          'Pavimentación asfáltica en CBUQ — 44,68 km',
          'Obras de arte especiales — puentes y viaductos',
          'Obras de arte corrientes — alcantarillas y pontones',
          'Contratante: DNIT — Departamento Nacional de Infraestructura de Transportes',
        ],
      },
    },
    {
      id: 6,
      attributes: {
        title: 'BR-163 PA — Vila Moraes Almeida / Vila Planalto',
        image: portfolioGurupiTo,
        category: 'Pavimentación Vial Federal',
        location: 'Pará',
        description: 'Participación en las obras de pavimentación de la BR-163 (Carretera Cuiabá–Santarém), tramo Vila Moraes Almeida / Vila Planalto, en Pará, integrando el Consorcio CEFF. La BR-163 es un corredor estratégico para el flujo de la producción agrícola del centro-oeste brasileño hacia los puertos del Norte del país.',
        details: [
          'Movimiento de tierras y regularización de la plataforma vial',
          'Pavimentación asfáltica en CBUQ',
          'Drenaje superficial y profundo',
          'Señalización horizontal y vertical',
          'Participación vía Consorcio CEFF',
        ],
      },
    },
    {
      id: 7,
      attributes: {
        title: 'BR-242/TO — Restauración Formoso do Araguaia',
        image: portfolioFormosoAraguaia,
        category: 'Pavimentación Vial Federal',
        location: 'Formoso do Araguaia — TO',
        description: 'Ejecución de obras remanentes de restauración de la Carretera Federal BR-242/TO en el tramo de Formoso do Araguaia, contratadas por el DNIT. La BR-242 conecta el sur de Tocantins con el oeste de Brasil, siendo fundamental para la logística agrícola de la región del Araguaia.',
        details: [
          'Restauración del pavimento asfáltico deteriorado',
          'Corrección de defectos superficiales y estructurales',
          'Intervención en obras de arte corrientes existentes',
          'Limpieza de dispositivos de drenaje',
          'Contratante: DNIT — 9ª Unidad Regional Goiás/TO',
        ],
      },
    },
    {
      id: 8,
      attributes: {
        title: 'Alphaville Palmas 1 y 2',
        image: portfolioAlphavillePalmas,
        category: 'Desarrollo Urbano Privado',
        location: 'Palmas — TO',
        description: 'Ejecución de movimiento de tierras, drenaje, pavimentación asfáltica y señalización vial de las obras externas de los desarrollos Alphaville Palmas 1 y 2, en la capital de Tocantins. La marca Alphaville es referencia nacional en calidad urbanística, y EHL entregó toda la infraestructura vial externa necesaria para el pleno funcionamiento de los condominios.',
        details: [
          'Movimiento de tierras y excavación',
          'Pavimentación asfáltica de las vías externas',
          'Señalización vial horizontal y vertical',
          'Red de drenaje pluvial',
          'Contratante: Alphaville Urbanismo S.A.',
        ],
      },
    },
  ],
};

// ---------------------------------------------------------------------------
// Hero — slides curados do carrossel (legenda + rota por slide)
// ---------------------------------------------------------------------------
export type HeroSlide = {
  id: number;
  image: string;
  title: string;
  location: string;
  category: string;
  href: string;
};

export const HERO_SLIDES: Record<string, HeroSlide[]> = {
  pt: [
    { id: 1, image: portfolioPonteFHC, title: 'Ponte Presidente FHC', location: 'Palmas / Paraíso do Tocantins — TO', category: 'Obras de Arte Especiais', href: '/portfolio' },
    { id: 2, image: portfolioFerroviaNorteSul, title: 'Ferrovia Norte-Sul — Lote 14', location: 'Tocantins', category: 'Ferrovia Federal', href: '/portfolio' },
    { id: 3, image: obraConsorcioPontes, title: 'Consórcio Pontes — Ponte Gov. Siqueira Campos', location: 'Palmas — TO', category: 'Em andamento · Entrega Dez/2026', href: '/ConstructionsPage' },
    { id: 4, image: portfolioAlphavillePalmas, title: 'Alphaville Palmas 1 e 2', location: 'Palmas — TO', category: 'Desenvolvimento Urbano Privado', href: '/portfolio' },
    { id: 5, image: portfolioGO139, title: 'Pro-Município — 139 Municípios', location: 'Estado do Tocantins', category: 'Manutenção Rodoviária', href: '/portfolio' },
  ],
  en: [
    { id: 1, image: portfolioPonteFHC, title: 'President FHC Bridge', location: 'Palmas / Paraíso do Tocantins — TO', category: 'Special Structures', href: '/portfolio' },
    { id: 2, image: portfolioFerroviaNorteSul, title: 'North-South Railway — Lot 14', location: 'Tocantins', category: 'Federal Railway', href: '/portfolio' },
    { id: 3, image: obraConsorcioPontes, title: 'Bridge Consortium — Gov. Siqueira Campos Bridge', location: 'Palmas — TO', category: 'In progress · Delivery Dec/2026', href: '/ConstructionsPage' },
    { id: 4, image: portfolioAlphavillePalmas, title: 'Alphaville Palmas 1 and 2', location: 'Palmas — TO', category: 'Private Urban Development', href: '/portfolio' },
    { id: 5, image: portfolioGO139, title: 'Pro-Município — 139 Municipalities', location: 'State of Tocantins', category: 'Road Maintenance', href: '/portfolio' },
  ],
  es: [
    { id: 1, image: portfolioPonteFHC, title: 'Puente Pdte. FHC', location: 'Palmas / Paraíso do Tocantins — TO', category: 'Obras de Arte Especiales', href: '/portfolio' },
    { id: 2, image: portfolioFerroviaNorteSul, title: 'Ferrocarril Norte-Sur — Lote 14', location: 'Tocantins', category: 'Ferrocarril Federal', href: '/portfolio' },
    { id: 3, image: obraConsorcioPontes, title: 'Consorcio Puentes — Puente Gov. Siqueira Campos', location: 'Palmas — TO', category: 'En ejecución · Entrega Dic/2026', href: '/ConstructionsPage' },
    { id: 4, image: portfolioAlphavillePalmas, title: 'Alphaville Palmas 1 y 2', location: 'Palmas — TO', category: 'Desarrollo Urbano Privado', href: '/portfolio' },
    { id: 5, image: portfolioGO139, title: 'Pro-Município — 139 Municipios', location: 'Estado de Tocantins', category: 'Mantenimiento Vial', href: '/portfolio' },
  ],
};

export const getHeroSlides = (locale: string): HeroSlide[] =>
  HERO_SLIDES[locale] ?? HERO_SLIDES.pt;

const COLLECTIONS: Record<string, Record<string, MockEntity<Record<string, unknown>>[]>> = {
  equipments: EQUIPAMENTOS,
  constructions: OBRAS,
  'portfolio-projects': PORTFOLIO,
};

export const fetchCollection = async <TAttributes>(
  apiName: string,
  opts?: { locale?: string; populate?: string; sort?: string },
): Promise<Array<{ id: number; attributes: TAttributes }>> => {
  const locale = opts?.locale ?? 'pt';
  const data = COLLECTIONS[apiName]?.[locale] ?? COLLECTIONS[apiName]?.['pt'] ?? [];
  return data as unknown as Array<{ id: number; attributes: TAttributes }>;
};

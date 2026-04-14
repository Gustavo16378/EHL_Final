import teamImg from "@/assets/TIME.png";
import founderCezar from "@/assets/Cézar.png";
import founderLuiz from "@/assets/Luiz.png";
import founderMatheus from "@/assets/Matheus.png";
import { LightboxImage } from "./ImageLightbox";

const founders = [
  {
    name: "Cézar Leão",
    role: "Diretor técnico e fundador",
    img: founderCezar,
    bio: "Professor de Educação Física, com mais de 20 anos de Docência Universitária. Pós-graduado em treinamento esportivo e MBA em Planejamento e Gestão Organizacional, tem passagem como Técnico da Seleção Brasileira de Handebol.",
  },
  {
    name: "Luiz Capatan",
    role: "Gerente executivo e fundador",
    img: founderLuiz,
    bio: "Professor de Educação Física com pós graduação em Treinamento Esportivo e MBA em Gestão Empresarial pela FVG. Gestor de futebol pela CBF / FIFA. Especialização em Administração esportiva pela COB. Atua como gestor da Escola oficial do Flamengo em Palmas.",
  },
  {
    name: "Matheus Morbeck",
    role: "Gerente executivo e fundador",
    img: founderMatheus,
    bio: "Professor de Educação Física, Licenciado em Ciências da Saúde. Conselheiro Titular do Conselho Regional de Educação Física – CREF 14. Coordenador do curso de Educação Física da ULBRA – PALMAS.",
  },
];

const AboutSection = () => (
  <section id="sobre" className="min-h-screen flex flex-col justify-center py-24 bg-background">
    <div className="container mx-auto px-4 lg:px-8">
      <p className="font-body text-sm uppercase tracking-[0.25em] text-accent mb-3 text-center">Quem somos</p>
      <h2 className="font-display text-4xl md:text-6xl text-foreground text-center mb-6">
        Nossa <span className="text-accent">História</span>
      </h2>

      {/* History */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <p className="font-body text-muted-foreground leading-relaxed mb-4">
            A LCM Gestão e Treinamento Esportivo foi idealizada em 2011 por Luiz Eduardo, o "Pestão", inspirado pelo crescimento das corridas de rua nas grandes capitais. Ele compartilhou sua visão com o professor Cézar Leão e, posteriormente, com Matheus Morbeck, unindo forças para criar uma empresa focada na organização de eventos esportivos em Palmas-TO, especialmente corridas de rua. O nome LCM é uma homenagem aos três fundadores: Luiz, Cézar e Matheus.
          </p>
          <p className="font-body text-muted-foreground leading-relaxed mb-4">
            Atualmente, com 14 anos de atuação, a LCM realiza cerca de 15 eventos por ano, além de desenvolver projetos esportivos, arbitragem de torneios e cursos de capacitação.
          </p>
          <div className="grid grid-cols-3 gap-4 mt-6">
            {[
              { label: "Missão", text: "Promover o esporte através de eventos de excelência" },
              { label: "Visão", text: "Ser referência nacional em corridas de rua" },
              { label: "Valores", text: "Excelência, profissionalismo e paixão" },
            ].map((v) => (
              <div key={v.label} className="border border-border rounded-lg p-4">
                <p className="font-display text-lg text-accent">{v.label}</p>
                <p className="font-body text-xs text-muted-foreground mt-1">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <LightboxImage
            src={teamImg}
            alt="Equipe LCM em evento"
            className="rounded-2xl w-full object-cover aspect-video"
            loading="lazy"
            width={1200}
            height={600}
          />
        </div>
      </div>

      {/* Founders */}
      <h3 className="font-display text-3xl md:text-4xl text-foreground text-center mb-12">
        Conheça nossos <span className="text-accent">fundadores</span>
      </h3>
      <div className="grid md:grid-cols-3 gap-10">
        {founders.map((f) => (
          <div key={f.name} className="text-center">
            <LightboxImage
              src={f.img}
              alt={f.name}
              className="w-40 h-40 md:w-48 md:h-48 rounded-full object-cover mx-auto mb-4 border-4 border-accent/20 hover:border-accent transition-colors"
              loading="lazy"
              width={512}
              height={512}
            />
            <h4 className="font-display text-2xl text-foreground">{f.name}</h4>
            <p className="font-body text-sm text-accent font-semibold mb-3">{f.role}</p>
            <p className="font-body text-xs text-muted-foreground leading-relaxed">{f.bio}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;

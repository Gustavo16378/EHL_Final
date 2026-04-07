import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Route, Building2, Droplets, HardHat, Mountain, Layers } from 'lucide-react';
import equipmentImage from '@/assets/equipment-machinery.jpg';

const capabilities = [
  { icon: Route, title: 'Pavimentação Rodoviária', desc: 'Execução de obras em rodovias federais e estaduais — terraplenagem, drenagem e pavimentação asfáltica.' },
  { icon: Building2, title: 'Desenvolvimento Urbano', desc: 'Loteamentos, infraestrutura urbana e obras de saneamento em grandes empreendimentos.' },
  { icon: Droplets, title: 'Galerias Pluviais', desc: 'Construção de galerias de águas pluviais e sistemas de drenagem para mobilidade urbana.' },
  { icon: HardHat, title: 'Obras Públicas', desc: 'Execução de grandes obras públicas com certificação PBQP-H e ISO 9001.' },
  { icon: Mountain, title: 'Terraplenagem', desc: 'Movimentação de terra em larga escala para obras de infraestrutura e mineração.' },
  { icon: Layers, title: 'Obras de Arte Especiais', desc: 'Pontes, viadutos e estruturas de contenção com engenharia de alta complexidade.' },
];

const InfrastructureSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="infrastructure" className="py-32 relative">
      <div className="absolute inset-0 opacity-10">
        <img src={equipmentImage} alt="" className="w-full h-full object-cover" loading="lazy" width={1280} height={960} />
      </div>
      <div className="absolute inset-0 bg-background/95" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className={`text-center max-w-2xl mx-auto mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="w-12 h-[2px] gradient-red-line mx-auto mb-6" />
          <h2 className="text-4xl sm:text-5xl font-extralight text-foreground mb-6">
            Infrastructure & <span className="text-primary font-light">Capabilities</span>
          </h2>
          <p className="text-silver font-light text-lg">
            Soluções completas em engenharia pesada e infraestrutura para projetos de qualquer escala.
          </p>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="group p-8 rounded-lg border border-border bg-card/50 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1"
            >
              <cap.icon size={28} className="text-primary mb-5 group-hover:scale-110 transition-transform" />
              <h3 className="text-foreground text-lg font-medium mb-3">{cap.title}</h3>
              <p className="text-muted-foreground text-sm font-light leading-relaxed">{cap.desc}</p>
              <div className="w-0 h-[2px] bg-primary mt-6 transition-all duration-500 group-hover:w-12" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;

import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowUpRight, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import portfolioOlimpica from '@/assets/portfolio-olimpica.jpg';
import portfolioUrban from '@/assets/portfolio-urban.jpg';
import portfolioHighway from '@/assets/portfolio-highway.jpg';
import portfolioMobility from '@/assets/portfolio-mobility.jpg';

interface Project {
  image: string;
  title: string;
  category: string;
  location: string;
  description: string;
  details: string[];
}

const projects: Project[] = [
  {
    image: portfolioOlimpica,
    title: 'Vila Olímpica dos Jogos Indígenas',
    category: 'Infraestrutura',
    location: 'Palmas - TO',
    description: 'Construção completa do complexo esportivo para os Jogos Mundiais dos Povos Indígenas, incluindo infraestrutura viária, drenagem, paisagismo e edificações de apoio.',
    details: [
      'Terraplenagem e pavimentação do complexo',
      'Sistema completo de drenagem pluvial',
      'Infraestrutura elétrica e iluminação',
      'Obras de contenção e paisagismo',
    ],
  },
  {
    image: portfolioUrban,
    title: 'Alphaville Palmas & Eusébio-CE',
    category: 'Desenvolvimento Urbano',
    location: 'Palmas-TO / Eusébio-CE',
    description: 'Execução de infraestrutura completa para loteamentos Alphaville, incluindo terraplenagem, pavimentação, redes de drenagem e abastecimento de água.',
    details: [
      'Terraplenagem e movimentação de terra',
      'Pavimentação asfáltica e intertravamento',
      'Redes de água e esgoto sanitário',
      'Drenagem e galerias pluviais',
    ],
  },
  {
    image: portfolioHighway,
    title: 'BR-163 PA & GO-520',
    category: 'Pavimentação Rodoviária',
    location: 'Pará / Goiás',
    description: 'Obras de pavimentação e restauração em rodovias federais e estaduais, incluindo drenagem profunda, terraplenagem e sinalização viária.',
    details: [
      'Pavimentação asfáltica — CBUQ e TST',
      'Drenagem profunda e superficial',
      'Terraplenagem e regularização do subleito',
      'Sinalização horizontal e vertical',
    ],
  },
  {
    image: portfolioMobility,
    title: 'Mobilidade Urbana Gurupi-TO',
    category: 'Mobilidade Urbana',
    location: 'Gurupi - TO',
    description: 'Execução de pavimentação e galerias de águas pluviais para melhoria da mobilidade urbana, contemplando diversas avenidas e ruas do município.',
    details: [
      'Galerias de águas pluviais em concreto',
      'Pavimentação asfáltica urbana',
      'Meio-fio e sarjeta',
      'Sinalização e acessibilidade',
    ],
  },
];

const PortfolioSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="portfolio" className="py-32">
      <div className="container mx-auto px-6" ref={ref}>
        <div className={`flex flex-col sm:flex-row sm:items-end justify-between mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <div className="w-12 h-[2px] gradient-red-line mb-6" />
            <h2 className="text-4xl sm:text-5xl font-extralight text-foreground">
              Featured <span className="text-primary font-light">Projects</span>
            </h2>
          </div>
          <p className="text-silver font-light mt-4 sm:mt-0 max-w-sm">
            Obras de engenharia de excelência por todo o Brasil.
          </p>
        </div>

        <div className={`grid md:grid-cols-2 gap-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {projects.map((project, i) => (
            <div
              key={project.title}
              onClick={() => setSelectedProject(project)}
              className={`group relative rounded-lg overflow-hidden cursor-pointer ${i === 0 ? 'md:row-span-2 min-h-[500px]' : 'min-h-[240px]'}`}
            >
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                width={1280}
                height={960}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-primary text-xs font-medium uppercase tracking-wider">{project.category}</span>
                  <span className="text-muted-foreground text-xs">— {project.location}</span>
                </div>
                <div className="flex items-end justify-between">
                  <h3 className="text-foreground text-xl sm:text-2xl font-light">{project.title}</h3>
                  <ArrowUpRight size={20} className="text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl bg-card border-border p-0 overflow-hidden">
          {selectedProject && (
            <>
              <div className="relative h-64 sm:h-80">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <span className="text-primary text-xs font-medium uppercase tracking-wider">{selectedProject.category}</span>
                  <span className="text-muted-foreground text-xs ml-2">— {selectedProject.location}</span>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <DialogHeader>
                  <DialogTitle className="text-2xl sm:text-3xl font-light text-foreground">
                    {selectedProject.title}
                  </DialogTitle>
                  <DialogDescription className="text-silver font-light leading-relaxed mt-3">
                    {selectedProject.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-6 space-y-3">
                  <h4 className="text-foreground text-sm font-medium uppercase tracking-wider">Detalhes de Execução</h4>
                  {selectedProject.details.map((detail) => (
                    <div key={detail} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-muted-foreground text-sm font-light">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PortfolioSection;

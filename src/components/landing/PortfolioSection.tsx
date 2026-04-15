import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import portfolioOlimpica from '@/assets/portfolio-olimpica.jpg';
import portfolioUrban from '@/assets/portfolio-urban.jpg';
import portfolioHighway from '@/assets/portfolio-highway.jpg';
import portfolioMobility from '@/assets/portfolio-mobility.jpg';
import { useTranslation } from 'react-i18next';
import { fetchCollection, fetchSingle, getCmsImageUrl, resolveLocale } from '@/lib/cms';

interface Project {
  image: string;
  title: string;
  category: string;
  location: string;
  description: string;
  details: string[];
}

type CmsPortfolioProjectAttributes = {
  title?: string;
  category?: string;
  location?: string;
  description?: string;
  details?: unknown;
  image?: unknown;
};

type CmsPortfolioPageAttributes = {
  title1?: string;
  title2?: string;
  subtitle?: string;
  detailsTitle?: string;
};

const PortfolioSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { t, i18n } = useTranslation();
  const [cmsPage, setCmsPage] = useState<CmsPortfolioPageAttributes | null>(null);
  const [cmsProjects, setCmsProjects] = useState<Project[] | null>(null);

  const fallbackProjects: Project[] = [
    {
      image: portfolioOlimpica,
      title: t('portfolio.1.title'),
      category: t('portfolio.1.category'),
      location: t('portfolio.1.location'),
      description: t('portfolio.1.description'),
      details: [
        t('portfolio.1.details.1'),
        t('portfolio.1.details.2'),
        t('portfolio.1.details.3'),
        t('portfolio.1.details.4'),
      ],
    },
    {
      image: portfolioUrban,
      title: t('portfolio.2.title'),
      category: t('portfolio.2.category'),
      location: t('portfolio.2.location'),
      description: t('portfolio.2.description'),
      details: [
        t('portfolio.2.details.1'),
        t('portfolio.2.details.2'),
        t('portfolio.2.details.3'),
        t('portfolio.2.details.4'),
      ],
    },
    {
      image: portfolioHighway,
      title: t('portfolio.3.title'),
      category: t('portfolio.3.category'),
      location: t('portfolio.3.location'),
      description: t('portfolio.3.description'),
      details: [
        t('portfolio.3.details.1'),
        t('portfolio.3.details.2'),
        t('portfolio.3.details.3'),
        t('portfolio.3.details.4'),
      ],
    },
    {
      image: portfolioMobility,
      title: t('portfolio.4.title'),
      category: t('portfolio.4.category'),
      location: t('portfolio.4.location'),
      description: t('portfolio.4.description'),
      details: [
        t('portfolio.4.details.1'),
        t('portfolio.4.details.2'),
        t('portfolio.4.details.3'),
        t('portfolio.4.details.4'),
      ],
    },
  ];

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const locale = resolveLocale(i18n.language);

        const [page, items] = await Promise.all([
          fetchSingle<CmsPortfolioPageAttributes>('portfolio-page', { locale }),
          fetchCollection<CmsPortfolioProjectAttributes>('portfolio-projects', {
            locale,
            populate: 'image',
            sort: 'id:asc',
          }),
        ]);

        if (cancelled) return;
        setCmsPage(page);

        const mapped = items
          .map((entity) => {
            const attrs = entity.attributes ?? {};
            const imageUrl = getCmsImageUrl((attrs as any).image) ?? portfolioOlimpica;
            const rawDetails = (attrs as any).details;
            const details = Array.isArray(rawDetails)
              ? rawDetails.filter((d) => typeof d === 'string' && d.trim().length)
              : [];

            return {
              image: imageUrl,
              title: (attrs as any).title ?? '',
              category: (attrs as any).category ?? '',
              location: (attrs as any).location ?? '',
              description: (attrs as any).description ?? '',
              details,
            } satisfies Project;
          })
          .filter((p) => Boolean(p.title));

        setCmsProjects(mapped.length ? mapped : null);
      } catch {
        if (cancelled) return;
        setCmsPage(null);
        setCmsProjects(null);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [i18n.language]);

  const headerTitle1 = cmsPage?.title1 || t('portfolio.title1');
  const headerTitle2 = cmsPage?.title2 || t('portfolio.title2');
  const headerSubtitle = cmsPage?.subtitle || t('portfolio.subtitle');
  const detailsTitle = cmsPage?.detailsTitle || t('portfolio.detailsTitle');

  const projects = cmsProjects && cmsProjects.length ? cmsProjects : fallbackProjects;

  return (
    <section id="portfolio" className="py-32">
      <div className="container mx-auto px-6" ref={ref}>
        <div className={`flex flex-col sm:flex-row sm:items-end justify-between mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div>
            <div className="w-12 h-[2px] gradient-red-line mb-6" />
            <h2 className="text-4xl sm:text-5xl font-extralight text-foreground">
              {headerTitle1} <span className="text-primary font-light">{headerTitle2}</span>
            </h2>
          </div>
          <p className="text-silver font-light mt-4 sm:mt-0 max-w-sm">
            {headerSubtitle}
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
                  <h4 className="text-foreground text-sm font-medium uppercase tracking-wider">{detailsTitle}</h4>
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

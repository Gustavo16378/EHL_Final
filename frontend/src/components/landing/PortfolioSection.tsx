import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { ArrowUpRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useTranslation } from 'react-i18next';
import { fetchCollection, fetchSingle, getCmsImageUrl, resolveLocale } from '@/lib/cms';
import { useRefetchOnFocus } from '@/hooks/useRefetchOnFocus';

interface Project {
  id: number;
  image: string | null;
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
  const refetchTick = useRefetchOnFocus();
  const [cmsPage, setCmsPage] = useState<CmsPortfolioPageAttributes | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
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
            const rawDetails = (attrs as any).details;
            const details = Array.isArray(rawDetails)
              ? rawDetails.filter((d) => typeof d === 'string' && d.trim().length)
              : [];

            return {
              id: entity.id,
              image: getCmsImageUrl((attrs as any).image),
              title: (attrs as any).title ?? '',
              category: (attrs as any).category ?? '',
              location: (attrs as any).location ?? '',
              description: (attrs as any).description ?? '',
              details,
            } satisfies Project;
          })
          .filter((p) => Boolean(p.title));

        setProjects(mapped);
      } catch {
        if (cancelled) return;
        setCmsPage(null);
        setProjects([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [i18n.language, refetchTick]);

  const headerTitle1 = cmsPage?.title1 || t('portfolio.title1');
  const headerTitle2 = cmsPage?.title2 || t('portfolio.title2');
  const headerSubtitle = cmsPage?.subtitle || t('portfolio.subtitle');
  const detailsTitle = cmsPage?.detailsTitle || t('portfolio.detailsTitle');

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
          <p className="text-silver font-light mt-4 sm:mt-0 max-w-sm">{headerSubtitle}</p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-muted-foreground text-sm font-light">
            Carregando...
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground text-sm font-light">
            Nenhum projeto cadastrado no momento.
          </div>
        ) : (
          <div className={`grid md:grid-cols-2 gap-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {projects.map((project, i) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`group relative rounded-lg overflow-hidden cursor-pointer bg-card/50 ${i === 0 ? 'md:row-span-2 min-h-[500px]' : 'min-h-[240px]'}`}
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-card to-secondary/20" />
                )}
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
        )}
      </div>

      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl bg-card border-border p-0 overflow-hidden">
          {selectedProject && (
            <>
              <div className="relative h-64 sm:h-80 bg-card/50">
                {selectedProject.image ? (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-card to-secondary/20" />
                )}
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
                {selectedProject.details.length > 0 && (
                  <div className="mt-6 space-y-3">
                    <h4 className="text-foreground text-sm font-medium uppercase tracking-wider">{detailsTitle}</h4>
                    {selectedProject.details.map((detail) => (
                      <div key={detail} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-muted-foreground text-sm font-light">{detail}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PortfolioSection;

import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { MapPin, Calendar, User } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useTranslation } from 'react-i18next';
import { fetchCollection, fetchSingle, getCmsImageUrl, resolveLocale } from '@/lib/cms';
import { useRefetchOnFocus } from '@/hooks/useRefetchOnFocus';

interface Obra {
  id: number;
  nome: string;
  cidade: string;
  uf: string;
  cliente: string;
  status: string;
  previsaoEntrega: string;
  descricao: string;
  tipo: string;
  imagem: string | null;
}

type CmsConstructionAttributes = {
  name?: string;
  city?: string;
  uf?: string;
  client?: string;
  situacao?: string;
  deliveryForecast?: string;
  description?: string;
  type?: string;
  image?: unknown;
};

type CmsConstructionsPageAttributes = {
  title1?: string;
  title2?: string;
  subtitle?: string;
  labelLocation?: string;
  labelClient?: string;
  labelForecast?: string;
};

const ObrasSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [selected, setSelected] = useState<Obra | null>(null);
  const { t, i18n } = useTranslation();
  const refetchTick = useRefetchOnFocus();
  const [cmsPage, setCmsPage] = useState<CmsConstructionsPageAttributes | null>(null);
  const [obras, setObras] = useState<Obra[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const locale = resolveLocale(i18n.language);
        const [page, items] = await Promise.all([
          fetchSingle<CmsConstructionsPageAttributes>('constructions-page', { locale }),
          fetchCollection<CmsConstructionAttributes>('constructions', {
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
            return {
              id: entity.id,
              nome: (attrs as any).name ?? '',
              cidade: (attrs as any).city ?? '',
              uf: (attrs as any).uf ?? '',
              cliente: (attrs as any).client ?? '',
              status: (attrs as any).situacao ?? '',
              previsaoEntrega: (attrs as any).deliveryForecast ?? '',
              descricao: (attrs as any).description ?? '',
              tipo: (attrs as any).type ?? '',
              imagem: getCmsImageUrl((attrs as any).image),
            } satisfies Obra;
          })
          .filter((obra) => Boolean(obra.nome));

        setObras(mapped);
      } catch {
        if (cancelled) return;
        setCmsPage(null);
        setObras([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [i18n.language, refetchTick]);

  const headerTitle1 = cmsPage?.title1 || t('constructions.title1');
  const headerTitle2 = cmsPage?.title2 || t('constructions.title2');
  const headerSubtitle = cmsPage?.subtitle || t('constructions.subtitle');
  const labelLocation = cmsPage?.labelLocation || t('constructions.labels.location');
  const labelClient = cmsPage?.labelClient || t('constructions.labels.client');
  const labelForecast = cmsPage?.labelForecast || t('constructions.labels.forecast');

  return (
    <main className="min-h-screen py-32">
      <div className="container mx-auto px-6" ref={ref}>
        <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="w-12 h-[2px] gradient-red-line mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl font-extralight text-foreground mb-6">
            {headerTitle1}<span className="text-primary font-light">{headerTitle2}</span>
          </h1>
          <p className="text-silver font-light text-lg">{headerSubtitle}</p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-muted-foreground text-sm font-light">
            {t('constructions.loading') || 'Carregando...'}
          </div>
        ) : obras.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground text-sm font-light">
            {t('constructions.empty') || 'Nenhuma obra cadastrada no momento.'}
          </div>
        ) : (
          <div className={`grid md:grid-cols-2 xl:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {obras.map((obra) => (
              <div
                key={obra.id}
                onClick={() => setSelected(obra)}
                className="cursor-pointer group flex flex-col rounded-lg border border-border bg-card/80 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden bg-card/50">
                  {obra.imagem ? (
                    <img
                      src={obra.imagem}
                      alt={obra.nome}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      width={800}
                      height={600}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-card to-secondary/20" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-medium tracking-wider uppercase text-primary">{obra.tipo}</span>
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/20 text-primary flex items-center gap-1.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      {obra.status}
                    </span>
                  </div>
                </div>
                <div className="px-6 py-5 flex flex-col flex-1">
                  <h3 className="text-lg font-medium text-foreground mb-3 group-hover:text-primary transition-colors duration-300 leading-snug">
                    {obra.nome}
                  </h3>
                  <p className="text-silver text-sm font-light mb-5 leading-relaxed flex-1">{obra.descricao}</p>
                  <div className="space-y-2 text-sm text-muted-foreground border-t border-border pt-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary/60" />
                      <span>{obra.cidade}/{obra.uf}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary/60" />
                      <span>{obra.cliente}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary/60" />
                      <span>{labelForecast}: {obra.previsaoEntrega}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          <DialogContent className="max-w-2xl bg-card border-border p-0 overflow-hidden">
            {selected && (
              <>
                <div className="relative h-64 sm:h-80 bg-card/50">
                  {selected.imagem ? (
                    <img
                      src={selected.imagem}
                      alt={selected.nome}
                      className="w-full h-full object-cover"
                      width={800}
                      height={600}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-card to-secondary/20" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <span className="text-xs font-medium tracking-wider uppercase text-primary mb-2 block">{selected.tipo}</span>
                    <h2 className="text-2xl font-light text-foreground leading-snug">{selected.nome}</h2>
                  </div>
                </div>
                <div className="p-6 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/20 text-primary flex items-center gap-1.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      {selected.status}
                    </span>
                  </div>
                  <p className="text-silver font-light leading-relaxed">{selected.descricao}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border pt-5">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary/70" />
                      <div>
                        <p className="text-xs text-muted-foreground">{labelLocation}</p>
                        <p className="text-sm text-foreground">{selected.cidade}/{selected.uf}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-primary/70" />
                      <div>
                        <p className="text-xs text-muted-foreground">{labelClient}</p>
                        <p className="text-sm text-foreground">{selected.cliente}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary/70" />
                      <div>
                        <p className="text-xs text-muted-foreground">{labelForecast}</p>
                        <p className="text-sm text-foreground">{selected.previsaoEntrega}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
};

export default ObrasSection;

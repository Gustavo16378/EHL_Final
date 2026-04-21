import { useEffect, useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import equipmentBg from '@/assets/equipment-machinery.jpg';
import { useTranslation } from 'react-i18next';
import { fetchCollection, fetchSingle, getCmsImageUrl, resolveLocale } from '@/lib/cms';
import { useRefetchOnFocus } from '@/hooks/useRefetchOnFocus';

interface Equipamento {
  id: number;
  nome: string;
  descricao: string;
  quantidade: string;
  imagem: string | null;
  categoria: string;
}

type CmsEquipmentAttributes = {
  name?: string;
  description?: string;
  amount?: string;
  category?: string;
  image?: unknown;
};

type CmsEquipmentsPageAttributes = {
  title1?: string;
  title2?: string;
  subtitle?: string;
};

const EquipamentsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [selected, setSelected] = useState<Equipamento | null>(null);
  const { t, i18n } = useTranslation();
  const refetchTick = useRefetchOnFocus();
  const [cmsPage, setCmsPage] = useState<CmsEquipmentsPageAttributes | null>(null);
  const [equipamentos, setEquipamentos] = useState<Equipamento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const locale = resolveLocale(i18n.language);
        const [page, items] = await Promise.all([
          fetchSingle<CmsEquipmentsPageAttributes>('equipments-page', { locale }),
          fetchCollection<CmsEquipmentAttributes>('equipments', {
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
              descricao: (attrs as any).description ?? '',
              quantidade: (attrs as any).amount ?? '',
              categoria: (attrs as any).category ?? '',
              imagem: getCmsImageUrl((attrs as any).image),
            } satisfies Equipamento;
          })
          .filter((equip) => Boolean(equip.nome));

        setEquipamentos(mapped);
      } catch {
        if (cancelled) return;
        setCmsPage(null);
        setEquipamentos([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [i18n.language, refetchTick]);

  const headerTitle1 = cmsPage?.title1 || t('equipments.title1');
  const headerTitle2 = cmsPage?.title2 || t('equipments.title2');
  const headerSubtitle = cmsPage?.subtitle || t('equipments.subtitle');

  return (
    <main className="min-h-screen py-32 relative">
      <div className="absolute inset-0 opacity-5">
        <img src={equipmentBg} alt="" className="w-full h-full object-cover" loading="lazy" width={1280} height={960} />
      </div>
      <div className="absolute inset-0 bg-background/95" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="w-12 h-[2px] gradient-yellow-line mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl font-extralight text-foreground mb-6">
            {headerTitle1} <span className="text-primary font-light">{headerTitle2}</span>
          </h1>
          <p className="text-silver font-light text-lg">{headerSubtitle}</p>
        </div>

        {loading ? (
          <div className="text-center py-16 text-muted-foreground text-sm font-light">
            {t('equipments.loading') || 'Carregando...'}
          </div>
        ) : equipamentos.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground text-sm font-light">
            {t('equipments.empty') || 'Nenhum equipamento cadastrado no momento.'}
          </div>
        ) : (
          <div className={`grid md:grid-cols-2 xl:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {equipamentos.map((equip) => (
              <div
                key={equip.id}
                onClick={() => setSelected(equip)}
                className="cursor-pointer group rounded-lg border border-border bg-card/80 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative h-52 overflow-hidden bg-card/50">
                  {equip.imagem ? (
                    <img
                      src={equip.imagem}
                      alt={equip.nome}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      width={800}
                      height={600}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-card to-secondary/20" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                  <span className="absolute bottom-3 left-4 text-xs font-medium tracking-wider uppercase text-primary">
                    {equip.categoria}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                      {equip.nome}
                    </h3>
                  </div>
                  <p className="text-silver text-sm font-light leading-relaxed mb-4">{equip.descricao}</p>
                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    {equip.quantidade}
                  </div>
                  <div className="w-0 h-[2px] bg-primary mt-5 transition-all duration-500 group-hover:w-12" />
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
                    <span className="text-xs font-medium tracking-wider uppercase text-primary mb-2 block">{selected.categoria}</span>
                    <h2 className="text-2xl font-light text-foreground leading-snug">{selected.nome}</h2>
                  </div>
                </div>
                <div className="p-6 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium px-4 py-1.5 rounded-full bg-primary/20 text-primary flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {selected.quantidade}
                    </span>
                  </div>
                  <p className="text-silver font-light leading-relaxed text-base">{selected.descricao}</p>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
};

export default EquipamentsSection;

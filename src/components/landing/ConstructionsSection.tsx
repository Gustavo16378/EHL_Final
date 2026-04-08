import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { MapPin, Calendar, User, X } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import obraRodovia from '@/assets/obra-rodovia.jpg';
import obraDrenagem from '@/assets/obra-drenagem.jpg';
import obraPonte from '@/assets/obra-ponte.jpg';
import obraTerraplenagem from '@/assets/obra-terraplenagem.jpg';
import obraLoteamento from '@/assets/obra-loteamento.jpg';
import { useTranslation } from 'react-i18next';



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
  imagem: string;
}


const ObrasSection = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useScrollAnimation();
  const [selected, setSelected] = useState<Obra | null>(null);
  let title: string[] = [t('constructions.title1'), t('constructions.title2'), t('constructions.subtitle'), t('constructions.1.title'), t('constructions.2.title'), t('constructions.3.title'), t('constructions.4.title'), t('constructions.5.title')];

  let city: string[] = [t('constructions.1.city'), t('constructions.2.city'), t('constructions.3.city'), t('constructions.4.city'), t('constructions.5.city'), t('constructions.6.city')];
   
  let uf: string[] = [t('constructions.1.uf'), t('constructions.2.uf'), t('constructions.3.uf'), t('constructions.4.uf'), t('constructions.5.uf'), t('constructions.6.uf')];

  let client: string[] = [t('constructions.1.client'), t('constructions.2.client'), t('constructions.3.client'), t('constructions.4.client'), t('constructions.5.client'), t('constructions.6.client')];

  let status: string[] = [t('constructions.1.status'), t('constructions.2.status'), t('constructions.3.status'), t('constructions.4.status'), t('constructions.5.status'), t('constructions.6.status')];

  let deliveryforecast: string[] = [t('constructions.1.deliveryForecast'), t('constructions.2.deliveryForecast'), t('constructions.3.deliveryForecast'), t('constructions.4.deliveryForecast'), t('constructions.5.deliveryForecast'), t('constructions.6.deliveryForecast')];

  let description: string[] = [t('constructions.1.description'), t('constructions.2.description'), t('constructions.3.description'), t('constructions.4.description'), t('constructions.5.description'), t('constructions.6.description')];

  let type: string[] = [t('constructions.1.type'), t('constructions.2.type'), t('constructions.3.type'), t('constructions.4.type'), t('constructions.5.type'), t('constructions.6.type')];

  const obrasEmAndamento: Obra[] = [
    {
      id: 1,
      nome: t('constructions.title'),
      cidade: t('constructions.1.city'),
      uf: t('constructions.1.uf'),
      cliente: t('constructions.1.client'),
      status: t('constructions.1.status'),
      previsaoEntrega: t('constructions.1.deliveryForecast'),
      descricao: t('constructions.1.description'),
      tipo: t('constructions.1.type'),
      imagem: obraRodovia,
    },
    {
      id: 2,
      nome: t('constructions.2.title'),
      cidade: t('constructions.2.city'),
      uf: t('constructions.2.uf'),
      cliente: t('constructions.2.client'),
      status: t('constructions.2.status'),
      previsaoEntrega: t('constructions.2.deliveryForecast'),
      descricao: t('constructions.2.description'),
      tipo: t('constructions.2.type'),
      imagem: obraLoteamento,
    },
    {
      id: 3,
      nome: t('constructions.3.title'),
      cidade: t('constructions.3.city'),
      uf: t('constructions.3.uf'),
      cliente: t('constructions.3.client'),
      status: t('constructions.3.status'),
      previsaoEntrega: t('constructions.3.deliveryForecast'),
      descricao: t('constructions.3.description'),
      tipo: t('constructions.3.type'),
      imagem: obraPonte,
    },
    {
      id: 4,
      nome: t('constructions.4.title'),
      cidade: t('constructions.4.city'),
      uf: t('constructions.4.uf'),
      cliente: t('constructions.4.client'),
      status: t('constructions.4.status'),
      previsaoEntrega: t('constructions.4.deliveryForecast'),
      descricao: t('constructions.4.description'),
      tipo: t('constructions.4.type'),
      imagem: obraDrenagem,
    },
    {
      id: 5,
      nome: t('constructions.5.title'),
      cidade: t('constructions.5.city'),
      uf: t('constructions.5.uf'),
      cliente: t('constructions.5.client'),
      status: t('constructions.5.status'),
      previsaoEntrega: t('constructions.5.deliveryForecast'),
      descricao: t('constructions.5.description'),
      tipo: t('constructions.5.type'),
      imagem: obraTerraplenagem,
    },
    {
      id: 6,
      nome: t('constructions.6.title'),
      cidade: t('constructions.6.city'),
      uf: t('constructions.6.uf'),
      cliente: t('constructions.6.client'),
      status: t('constructions.6.status'),
      previsaoEntrega: t('constructions.6.deliveryForecast'),
      descricao: t('constructions.6.description'),
      tipo: t('constructions.6.type'),
      imagem: obraRodovia,
    },
  ];
  return (
    // ... JSX igual ao de ObrasPage ...
    <main className="min-h-screen py-32">
      <div className="container mx-auto px-6" ref={ref}>
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="w-12 h-[2px] gradient-red-line mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl font-extralight text-foreground mb-6">
            {t('constructions.title1')}<span className="text-primary font-light">{t('constructions.title2')}</span>
          </h1>
          <p className="text-silver font-light text-lg">
            {t('constructions.subtitle')}
          </p>
        </div>
        {/* ...restante do grid e modal... */}
        {/* Grid de obras */}
        <div className={`grid md:grid-cols-2 xl:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {obrasEmAndamento.map((obra) => (
            <div
              key={obra.id}
              onClick={() => setSelected(obra)}
              className="cursor-pointer group flex flex-col rounded-lg border border-border bg-card/80 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              {/* Imagem da obra */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={obra.imagem}
                  alt={obra.nome}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  width={800}
                  height={600}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <span className="text-xs font-medium tracking-wider uppercase text-primary">
                    {obra.tipo}
                  </span>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/20 text-primary flex items-center gap-1.5">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                    {obra.status}
                  </span>
                </div>
              </div>
              {/* Conteúdo */}
              <div className="px-6 py-5 flex flex-col flex-1">
                <h3 className="text-lg font-medium text-foreground mb-3 group-hover:text-primary transition-colors duration-300 leading-snug">
                  {obra.nome}
                </h3>
                <p className="text-silver text-sm font-light mb-5 leading-relaxed flex-1">
                  {obra.descricao}
                </p>
                {/* Meta info */}
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
                    <span>Previsão: {obra.previsaoEntrega}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Modal de detalhes */}
        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          <DialogContent className="max-w-2xl bg-card border-border p-0 overflow-hidden">
            {selected && (
              <>
                <div className="relative h-64 sm:h-80">
                  <img
                    src={selected.imagem}
                    alt={selected.nome}
                    className="w-full h-full object-cover"
                    width={800}
                    height={600}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                  <div className="absolute bottom-4 left-6 right-6">
                    <span className="text-xs font-medium tracking-wider uppercase text-primary mb-2 block">
                      {selected.tipo}
                    </span>
                    <h2 className="text-2xl font-light text-foreground leading-snug">
                      {selected.nome}
                    </h2>
                  </div>
                </div>
                <div className="p-6 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/20 text-primary flex items-center gap-1.5">
                      <span className="inline-block w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                      {selected.status}
                    </span>
                  </div>
                  <p className="text-silver font-light leading-relaxed">
                    {selected.descricao}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border pt-5">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-primary/70" />
                      <div>
                        <p className="text-xs text-muted-foreground">Localização</p>
                        <p className="text-sm text-foreground">{selected.cidade}/{selected.uf}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-primary/70" />
                      <div>
                        <p className="text-xs text-muted-foreground">Cliente</p>
                        <p className="text-sm text-foreground">{selected.cliente}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary/70" />
                      <div>
                        <p className="text-xs text-muted-foreground">Previsão</p>
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

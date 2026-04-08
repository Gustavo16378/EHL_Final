import { useState } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import equipEscavadeira from '@/assets/equip-caminhao.jpg';
import equipCaminhao from '@/assets/equip-caminhao.jpg';
import equipPavimentadora from '@/assets/equip-pavimentadora.jpg';
import equipMotoniveladora from '@/assets/equip-motoniveladora.jpg';
import equipPaCarregadeira from '@/assets/equip-pa-carregadeira.jpg';
import equipRoloCompactador from '@/assets/equip-rolo-compactador.jpg';
import equipmentBg from '@/assets/equipment-machinery.jpg';
import { useTranslation } from 'react-i18next';

interface Equipamento {
  nome: string;
  descricao: string;
  quantidade: string;
  imagem: string;
  categoria: string;
}

const equipamentos: Equipamento[] = [
  {
    nome: 'Escavadeiras Hidráulicas',
    descricao: 'Máquinas de alta performance para escavação de valas, fundações e movimentação de terra em grandes volumes. Frota com modelos de 20 a 50 toneladas.',
    quantidade: '12 unidades',
    imagem: equipEscavadeira,
    categoria: 'Escavação',
  },
  {
    nome: 'Caminhões Basculantes',
    descricao: 'Frota de caminhões caçamba para transporte de terra, brita e materiais de construção. Capacidades de 14 m³ a 25 m³.',
    quantidade: '28 unidades',
    imagem: equipCaminhao,
    categoria: 'Transporte',
  },
  {
    nome: 'Pavimentadoras de Asfalto',
    descricao: 'Equipamentos de última geração para aplicação de massa asfáltica com controle eletrônico de espessura e nivelamento automático.',
    quantidade: '4 unidades',
    imagem: equipPavimentadora,
    categoria: 'Pavimentação',
  },
  {
    nome: 'Motoniveladoras',
    descricao: 'Máquinas para nivelamento e regularização de terrenos, preparo de sub-base e manutenção de estradas não pavimentadas.',
    quantidade: '6 unidades',
    imagem: equipMotoniveladora,
    categoria: 'Terraplenagem',
  },
  {
    nome: 'Pás Carregadeiras',
    descricao: 'Equipamentos versáteis para carga, descarga e movimentação de materiais em obras de infraestrutura e mineração.',
    quantidade: '8 unidades',
    imagem: equipPaCarregadeira,
    categoria: 'Movimentação',
  },
  {
    nome: 'Rolos Compactadores',
    descricao: 'Rolos vibratórios para compactação de aterros, sub-base e camadas asfálticas, garantindo a densidade especificada em projeto.',
    quantidade: '10 unidades',
    imagem: equipRoloCompactador,
    categoria: 'Compactação',
  },
];

const EquipamentsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [selected, setSelected] = useState<Equipamento | null>(null);

  return (
    <main className="min-h-screen py-32 relative">
      {/* Background sutil */}
      <div className="absolute inset-0 opacity-5">
        <img src={equipmentBg} alt="" className="w-full h-full object-cover" loading="lazy" width={1280} height={960} />
      </div>
      <div className="absolute inset-0 bg-background/95" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        {/* Header */}
        <div className={`text-center max-w-3xl mx-auto mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="w-12 h-[2px] gradient-yellow-line mx-auto mb-6" />
          <h1 className="text-4xl sm:text-5xl font-extralight text-foreground mb-6">
            Nossos <span className="text-primary font-light">Equipamentos</span>
          </h1>
          <p className="text-silver font-light text-lg">
            Frota própria de máquinas pesadas e equipamentos de última geração para atender obras de qualquer porte e complexidade.
          </p>
        </div>

        {/* Grid de equipamentos */}
        <div className={`grid md:grid-cols-2 xl:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {equipamentos.map((equip) => (
            <div
              key={equip.nome}
              onClick={() => setSelected(equip)}
              className="cursor-pointer group rounded-lg border border-border bg-card/80 hover:border-primary/40 transition-all duration-500 hover:-translate-y-1 overflow-hidden"
            >
              {/* Imagem */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={equip.imagem}
                  alt={equip.nome}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  width={800}
                  height={600}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
                <span className="absolute bottom-3 left-4 text-xs font-medium tracking-wider uppercase text-primary">
                  {equip.categoria}
                </span>
              </div>

              {/* Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                    {equip.nome}
                  </h3>
                </div>
                <p className="text-silver text-sm font-light leading-relaxed mb-4">
                  {equip.descricao}
                </p>
                <div className="flex items-center gap-2 text-sm text-primary font-medium">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  {equip.quantidade}
                </div>
                <div className="w-0 h-[2px] bg-primary mt-5 transition-all duration-500 group-hover:w-12" />
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
                      {selected.categoria}
                    </span>
                    <h2 className="text-2xl font-light text-foreground leading-snug">
                      {selected.nome}
                    </h2>
                  </div>
                </div>
                <div className="p-6 space-y-5">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium px-4 py-1.5 rounded-full bg-primary/20 text-primary flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      {selected.quantidade}
                    </span>
                  </div>
                  <p className="text-silver font-light leading-relaxed text-base">
                    {selected.descricao}
                  </p>
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

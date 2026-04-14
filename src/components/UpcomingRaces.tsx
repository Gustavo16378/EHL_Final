import { useState } from "react";
import { Calendar, MapPin, Users, X } from "lucide-react";
import eventAerial from "@/assets/event-aerial.jpg";
import eventFinish from "@/assets/event-finish.jpg";
import eventVictory from "@/assets/event-victory.jpg";

type RaceData = {
  name: string;
  date: string;
  location: string;
  open: boolean;
  image: string;
  desc?: string;
  details?: string;
  participants?: string;
};

const races: RaceData[] = [
  {
    name: "Corrida LCM 15K",
    date: "15 de Junho, 2026",
    location: "Palmas - TO",
    open: true,
    image: eventAerial,
    desc: "A tradicional corrida de rua de Palmas, agora com percurso de 15km!",
    details: "Percurso plano pelas principais avenidas da cidade, com pontos de hidratação, chip de cronometragem e medalha para todos os concluintes.",
    participants: "3.000+ previstos",
  },
  {
    name: "Meia Maratona do Tocantins",
    date: "22 de Agosto, 2026",
    location: "Palmas - TO",
    open: true,
    image: eventFinish,
    desc: "A maior meia maratona do estado, reunindo atletas de todo o Brasil.",
    details: "21km de emoção, com premiação em dinheiro para os melhores colocados e estrutura completa para os participantes.",
    participants: "2.500+ previstos",
  },
  {
    name: "Night Run LCM",
    date: "10 de Outubro, 2026",
    location: "Palmas - TO",
    open: false,
    image: eventVictory,
    desc: "Corrida noturna com luzes, música e muita diversão!",
    details: "Percurso iluminado, DJ ao vivo e kit especial para todos os inscritos. Em breve mais informações.",
    participants: "3.000+ previstos",
  },
  {
    name: "Desafio Trail LCM",
    date: "05 de Dezembro, 2026",
    location: "Taquaruçu - TO",
    open: false,
    image: eventAerial,
    desc: "Desafio de trilha nas montanhas de Taquaruçu.",
    details: "Prova com subidas, descidas e paisagens incríveis. Modalidades de 7km e 15km. Em breve inscrições.",
    participants: "500+ previstos",
  },
  {
    name: "Desafio Trail LCM",
    date: "05 de Dezembro, 2026",
    location: "Taquaruçu - TO",
    open: false,
    image: eventAerial,
    desc: "Desafio de trilha nas montanhas de Taquaruçu.",
    details: "Prova com subidas, descidas e paisagens incríveis. Modalidades de 7km e 15km. Em breve inscrições.",
    participants: "500+ previstos",
  },
  {
    name: "Desafio Trail LCM",
    date: "05 de Dezembro, 2026",
    location: "Taquaruçu - TO",
    open: false,
    image: eventAerial,
    desc: "Desafio de trilha nas montanhas de Taquaruçu.",
    details: "Prova com subidas, descidas e paisagens incríveis. Modalidades de 7km e 15km. Em breve inscrições.",
    participants: "500+ previstos",
  },
  {
    name: "Desafio Trail LCM",
    date: "05 de Dezembro, 2026",
    location: "Taquaruçu - TO",
    open: false,
    image: eventAerial,
    desc: "Desafio de trilha nas montanhas de Taquaruçu.",
    details: "Prova com subidas, descidas e paisagens incríveis. Modalidades de 7km e 15km. Em breve inscrições.",
    participants: "500+ previstos",
  },
  {
    name: "Desafio Trail LCM",
    date: "05 de Dezembro, 2026",
    location: "Taquaruçu - TO",
    open: false,
    image: eventAerial,
    desc: "Desafio de trilha nas montanhas de Taquaruçu.",
    details: "Prova com subidas, descidas e paisagens incríveis. Modalidades de 7km e 15km. Em breve inscrições.",
    participants: "500+ previstos",
  },
  {
    name: "Desafio Trail LCM",
    date: "05 de Dezembro, 2026",
    location: "Taquaruçu - TO",
    open: false,
    image: eventAerial,
    desc: "Desafio de trilha nas montanhas de Taquaruçu.",
    details: "Prova com subidas, descidas e paisagens incríveis. Modalidades de 7km e 15km. Em breve inscrições.",
    participants: "500+ previstos",
  },
  {
    name: "Desafio Trail LCM",
    date: "05 de Dezembro, 2026",
    location: "Taquaruçu - TO",
    open: false,
    image: eventAerial,
    desc: "Desafio de trilha nas montanhas de Taquaruçu.",
    details: "Prova com subidas, descidas e paisagens incríveis. Modalidades de 7km e 15km. Em breve inscrições.",
    participants: "500+ previstos",
  },
  
];


const UpcomingRaces = () => {
  const [selected, setSelected] = useState<RaceData | null>(null);

  const orderedRaces = [...races.filter((r) => r.open), ...races.filter((r) => !r.open)].slice(0, 10);
  const columnCount = Math.min(2, Math.ceil(orderedRaces.length / 5));
  const columns = Array.from({ length: columnCount }, (_, i) => orderedRaces.slice(i * 5, (i + 1) * 5));

  const renderRaceCard = (r: RaceData) => (
    <div
      className="w-full text-left flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 p-6 rounded-2xl border border-border bg-card hover:border-accent/40 transition-colors"
      role="button"
      tabIndex={0}
      onClick={() => setSelected(r)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") setSelected(r);
      }}
    >
      <img
        src={r.image}
        alt={r.name}
        className="w-full sm:w-40 h-32 object-cover rounded-xl"
        loading="lazy"
        width={160}
        height={128}
      />

      <div className="flex-1 min-w-0">
        <h3 className="font-display text-2xl text-foreground break-words">{r.name}</h3>
        <div className="flex flex-wrap items-center gap-4 mt-2 text-muted-foreground font-body text-sm">
          <span className="flex items-center gap-1.5">
            <Calendar size={14} className="text-accent" /> {r.date}
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} className="text-accent" /> {r.location}
          </span>
        </div>
      </div>

      <div className="shrink-0 sm:ml-auto">
        {r.open ? (
          <a
            href="#contato"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent text-accent-foreground font-body font-semibold text-sm hover:brightness-110 transition"
          >
            Inscreva-se
          </a>
        ) : (
          <span className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-border text-muted-foreground font-body font-semibold text-sm">
            Em breve
          </span>
        )}
      </div>
    </div>
  );

  return (
    <section id="proximas" className="min-h-screen flex flex-col justify-center py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="font-body text-sm uppercase tracking-[0.25em] text-accent mb-3 text-center">Agenda</p>
        <h2 className="font-display text-4xl md:text-6xl text-foreground text-center mb-16">
          Próximas <span className="text-accent">corridas</span>
        </h2>

        {/* Máximo 5 por coluna; no máximo 2 colunas / 10 eventos */}
        {columnCount <= 1 ? (
          <div className="max-w-3xl mx-auto space-y-4">
            {columns[0]?.map((r) => (
              <div key={r.name + r.date}>{renderRaceCard(r)}</div>
            ))}
          </div>
        ) : (
          <div
            className={
              "mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 " +
              "max-w-6xl"
            }
          >
            {columns.map((col, idx) => (
              <div key={idx} className="space-y-4">
                {col.map((r) => (
                  <div key={r.name + r.date}>{renderRaceCard(r)}</div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal de detalhes da corrida */}
      {selected && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-card rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative aspect-video bg-surface-dark rounded-t-2xl overflow-hidden">
              <img
                src={selected.image}
                alt={selected.name}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-8">
              <h3 className="font-display text-3xl md:text-4xl text-foreground mb-2">{selected.name}</h3>
              <div className="flex flex-wrap items-center gap-4 mb-6 text-muted-foreground font-body text-sm">
                <span className="flex items-center gap-1.5"><Calendar size={14} className="text-accent" /> {selected.date}</span>
                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-accent" /> {selected.location}</span>
                {selected.participants && (
                  <span className="flex items-center gap-1.5"><Users size={14} className="text-accent" /> {selected.participants}</span>
                )}
              </div>

              {selected.open && (
                <a
                  href="#contato"
                  onClick={() => setSelected(null)}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent text-accent-foreground font-body font-semibold text-sm hover:brightness-110 transition mb-6"
                >
                  Inscreva-se
                </a>
              )}

              <p className="font-body text-foreground/80 leading-relaxed mb-4">{selected.desc || "Em breve mais informações sobre esta corrida."}</p>
              {selected.details && (
                <p className="font-body text-muted-foreground leading-relaxed">{selected.details}</p>
              )}
              {!selected.details && (
                <p className="font-body text-muted-foreground leading-relaxed">Em breve mais detalhes sobre o evento.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default UpcomingRaces;

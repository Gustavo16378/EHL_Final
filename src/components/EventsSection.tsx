import { useState } from "react";
import eventFinish from "@/assets/event-finish.jpg";
import eventAerial from "@/assets/event-aerial.jpg";
import eventVictory from "@/assets/event-victory.jpg";
import EventModal, { type EventData } from "./EventModal";

const events: EventData[] = [
  {
    name: "Corrida LCM 10K",
    date: "Março 2025",
    desc: "Mais de 2.000 corredores pelas ruas de Palmas.",
    location: "Palmas - TO",
    participants: "2.000+ participantes",
    details: "Um dos maiores eventos de corrida de rua do Tocantins, reunindo atletas amadores e profissionais em um percurso de 10km pelas principais avenidas de Palmas. Estrutura completa com hidratação, equipe médica, chip de cronometragem e premiação.",
    images: [eventAerial, eventFinish, eventVictory],
  },
  {
    name: "Desafio da Superação",
    date: "Junho 2024",
    desc: "Evento beneficente com atletas de todo o estado.",
    location: "Palmas - TO",
    participants: "1.500+ participantes",
    details: "Corrida beneficente que uniu esporte e solidariedade, arrecadando doações para instituições sociais do Tocantins. Percursos de 5km e 10km com categorias para todas as idades.",
    images: [eventFinish, eventVictory, eventAerial],
  },
  {
    name: "Night Run Tocantins",
    date: "Novembro 2024",
    desc: "Corrida noturna com percurso iluminado e show ao vivo.",
    location: "Palmas - TO",
    participants: "3.000+ participantes",
    details: "A maior corrida noturna do estado! Percurso iluminado com efeitos especiais, DJs ao longo do trajeto e show ao vivo na chegada. Uma experiência única que combina esporte e entretenimento.",
    images: [eventVictory, eventAerial, eventFinish],
  },
  
];


const stats = [
  { value: "14+", label: "Anos de atuação" },
  { value: "200+", label: "Eventos realizados" },
  { value: "15.000+", label: "Participantes atendidos" },
  { value: "15", label: "Eventos por ano" },
];

const EventsSection = () => {
  const [selected, setSelected] = useState<EventData | null>(null);

  return (
    <section id="eventos" className="min-h-screen flex flex-col justify-center bg-surface-dark">
      {/* Stats no topo - removido conforme solicitado */}

      {/* Portfólio */}
      <div className="container mx-auto px-4 lg:px-8 pb-24">
        <p className="font-body text-sm uppercase tracking-[0.25em] text-accent mb-3 text-center">Portfólio</p>
        <h2 className="font-display text-4xl md:text-6xl text-surface-dark-foreground text-center mb-16">
          Galeria de <span className="text-accent">conquistas</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {events.map((e) => (
            <div
              key={e.name}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] cursor-pointer"
              onClick={() => setSelected(e)}
            >
              <img
                src={e.images[0]}
                alt={e.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                width={800}
                height={600}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dark via-surface-dark/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-body text-xs uppercase tracking-widest text-accent mb-2">{e.date}</p>
                <h3 className="font-display text-2xl text-surface-dark-foreground mb-2">{e.name}</h3>
                <p className="font-body text-sm text-surface-dark-foreground/70">{e.desc}</p>
                <span className="inline-block mt-3 font-body text-xs text-accent font-semibold uppercase tracking-wider">
                  Ver detalhes →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && <EventModal event={selected} onClose={() => setSelected(null)} />}
    </section>
  );
};

export default EventsSection;

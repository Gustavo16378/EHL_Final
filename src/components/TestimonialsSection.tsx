import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Ana Paula Ferreira",
    role: "Participante",
    text: "Os eventos da LCM são de outro nível! A organização é impecável, desde a largada até a premiação. Já participei de mais de 5 corridas e todas superaram minhas expectativas.",
  },
  {
    name: "Carlos Eduardo Santos",
    role: "Corredor amador",
    text: "Profissionalismo de outro nível. Já participei de mais de 10 provas organizadas pela LCM e todas superaram minhas expectativas. Estrutura completa e segura.",
  },
  {
    name: "Mariana Oliveira",
    role: "Participante",
    text: "A Night Run da LCM foi uma experiência incrível. A energia do evento, o percurso iluminado e a festa no final fizeram valer cada quilômetro!",
  },
  {
    name: "Mariana Oliveira",
    role: "Participante",
    text: "A Night Run da LCM foi uma experiência incrível. A energia do evento, o percurso iluminado e a festa no final fizeram valer cada quilômetro!",
  },
  {
    name: "Mariana Oliveira",
    role: "Participante",
    text: "A Night Run da LCM foi uma experiência incrível. A energia do evento, o percurso iluminado e a festa no final fizeram valer cada quilômetro!",
  },
  {
    name: "Mariana Oliveira",
    role: "Participante",
    text: "A Night Run da LCM foi uma experiência incrível. A energia do evento, o percurso iluminado e a festa no final fizeram valer cada quilômetro!",
  },
];

const TestimonialsSection = () => (
  <section id="depoimentos" className="min-h-screen flex flex-col justify-center py-24 bg-background">
    <div className="container mx-auto px-4 lg:px-8">
      <p className="font-body text-sm uppercase tracking-[0.25em] text-accent mb-3 text-center">Depoimentos</p>
      <h2 className="font-display text-4xl md:text-6xl text-foreground text-center mb-16">
        O que dizem nossos <span className="text-accent">participantes</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="p-8 rounded-2xl border border-border bg-card hover:border-accent/40 transition-colors"
          >
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className="fill-accent text-accent" />
              ))}
            </div>
            <p className="font-body text-foreground/80 leading-relaxed mb-6 italic">"{t.text}"</p>
            <div>
              <p className="font-body font-semibold text-foreground">{t.name}</p>
              <p className="font-body text-sm text-muted-foreground">{t.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TestimonialsSection;

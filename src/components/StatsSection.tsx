const stats = [
  { value: "14+", label: "Anos de atuação" },
  { value: "200+", label: "Eventos realizados" },
  { value: "15.000+", label: "Participantes atendidos" },
  { value: "15", label: "Eventos por ano" },
];

const StatsSection = () => (
  <section className="bg-surface-dark pt-32 md:pt-40 pb-2">
    <div className="container mx-auto px-4 lg:px-8">
      <p className="font-body text-sm uppercase tracking-[0.25em] text-accent mb-3 text-center">Nossos números</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="font-display text-5xl md:text-7xl text-accent">{s.value}</p>
            <p className="font-body text-sm text-surface-dark-foreground/60 mt-2">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsSection;

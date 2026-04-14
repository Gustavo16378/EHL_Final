const sponsors = [
  { name: "Prefeitura de Palmas", initials: "PP" },
  { name: "Governo do Tocantins", initials: "GT" },
  { name: "EnergyDrink Co.", initials: "ED" },
  { name: "RunFit Sports", initials: "RF" },
  { name: "MedSaúde", initials: "MS" },
  { name: "TV Anhanguera", initials: "TV" },
];

const SponsorsSection = () => (
  <section id="sponsors" className="min-h-screen flex flex-col justify-center py-24 bg-secondary">
    <div className="container mx-auto px-4 lg:px-8">
      <p className="font-body text-sm uppercase tracking-[0.25em] text-accent mb-3 text-center">Parceiros</p>
      <h2 className="font-display text-4xl md:text-5xl text-foreground mb-12 text-center">
        Nossos <span className="text-accent">patrocinadores</span>
      </h2>

      <div className="flex flex-col lg:flex-row gap-12 items-start justify-center">
        {/* Patrocinadores à esquerda */}
        <div className="flex-1">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center">
            {sponsors.map((s) => (
              <div
                key={s.name}
                className="flex flex-col items-center justify-center h-28 rounded-xl border border-border bg-card px-4 hover:border-accent/40 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                  <span className="font-display text-xl text-accent">{s.initials}</span>
                </div>
                <span className="font-body font-semibold text-xs text-muted-foreground">{s.name}</span>
              </div>
            ))}
          </div>
          <p className="font-body text-sm text-muted-foreground mt-10 mb-12 text-center lg:text-left">
            Obrigado a todos os apoiadores que tornam nossos eventos possíveis.
          </p>
        </div>

        {/* Formulário à direita */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-xl bg-card rounded-xl shadow p-8">
            <h3 className="font-display text-2xl text-accent mb-4 text-center lg:text-left">Quero ser um patrocinador!</h3>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Nome da empresa"
                className="border border-border rounded px-4 py-2 bg-background text-foreground focus:border-accent outline-none"
                required
              />
              <input
                type="email"
                placeholder="E-mail para contato"
                className="border border-border rounded px-4 py-2 bg-background text-foreground focus:border-accent outline-none"
                required
              />
              <input
                type="tel"
                placeholder="Telefone (opcional)"
                className="border border-border rounded px-4 py-2 bg-background text-foreground focus:border-accent outline-none"
              />
              <textarea
                placeholder="Mensagem ou proposta"
                className="border border-border rounded px-4 py-2 bg-background text-foreground focus:border-accent outline-none min-h-[80px]"
                required
              />
              <button
                type="submit"
                className="mt-2 px-6 py-2 rounded-full bg-accent text-accent-foreground font-body font-semibold text-sm hover:brightness-110 transition"
              >
                Enviar proposta
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default SponsorsSection;

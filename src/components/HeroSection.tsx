import heroImg from "@/assets/hero-running.jpg";

const HeroSection = () => (
  <section id="inicio" className="relative h-screen flex items-center justify-center overflow-hidden">
    <img
      src={heroImg}
      alt="Corredores em ação durante prova de rua"
      className="absolute inset-0 w-full h-full object-cover"
      width={1920}
      height={1080}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-surface-dark/80 via-surface-dark/60 to-surface-dark/90" />

    <div className="relative z-10 text-center px-4 max-w-4xl animate-fade-up">
      <p className="font-body text-sm md:text-base uppercase tracking-[0.3em] text-accent mb-4">
        LCM Gestão e Treinamento Esportivo
      </p>
      <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl text-surface-dark-foreground leading-[0.95] mb-6">
        Os maiores eventos
        <br />
        <span className="text-accent">de corrida do Tocantins</span>
      </h1>
      <p className="font-body text-surface-dark-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-10">
        Referência em organização de corridas de rua no Tocantins. Eventos inesquecíveis, estrutura profissional e experiências que marcam.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="#contato"
          className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-accent text-accent-foreground font-body font-bold text-base hover:brightness-110 transition"
        >
          Solicite seu evento
        </a>
        <a
          href="#sobre"
          className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-surface-dark-foreground/30 text-surface-dark-foreground font-body font-semibold text-base hover:border-accent hover:text-accent transition"
        >
          Conheça a LCM
        </a>
      </div>
    </div>

    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
      <div className="w-6 h-10 border-2 border-surface-dark-foreground/40 rounded-full flex justify-center pt-2">
        <div className="w-1.5 h-3 bg-accent rounded-full" />
      </div>
    </div>
  </section>
);

export default HeroSection;

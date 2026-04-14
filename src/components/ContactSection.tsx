import { useState, type FormEvent } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    tipo: "Organizar evento",
    mensagem: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg = `Olá LCM! 👋\n\n*Nome:* ${form.nome}\n*E-mail:* ${form.email}\n*Telefone:* ${form.telefone}\n*Interesse:* ${form.tipo}\n\n*Mensagem:*\n${form.mensagem}`;
    const url = `https://wa.me/5563999990000?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <section id="contato" className="min-h-screen flex flex-col justify-center py-24 bg-surface-dark">
      <div className="container mx-auto px-4 lg:px-8">
        <p className="font-body text-sm uppercase tracking-[0.25em] text-accent mb-3 text-center">Contato</p>
        <h2 className="font-display text-4xl md:text-6xl text-surface-dark-foreground text-center mb-6">
          Vamos <span className="text-accent">conversar?</span>
        </h2>
        <p className="font-body text-surface-dark-foreground/60 max-w-xl mx-auto mb-12 text-center">
          Quer organizar um evento, patrocinar uma corrida ou se inscrever? Preencha o formulário e fale direto conosco pelo WhatsApp!
        </p>

        <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-body text-sm text-surface-dark-foreground/80 mb-1.5 block">Nome completo</label>
              <input
                required
                type="text"
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-surface-dark-foreground/5 border border-surface-dark-foreground/10 text-surface-dark-foreground font-body text-sm focus:outline-none focus:border-accent transition placeholder:text-surface-dark-foreground/30"
                placeholder="Seu nome"
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="font-body text-sm text-surface-dark-foreground/80 mb-1.5 block">E-mail</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface-dark-foreground/5 border border-surface-dark-foreground/10 text-surface-dark-foreground font-body text-sm focus:outline-none focus:border-accent transition placeholder:text-surface-dark-foreground/30"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label className="font-body text-sm text-surface-dark-foreground/80 mb-1.5 block">Telefone</label>
                <input
                  type="tel"
                  value={form.telefone}
                  onChange={(e) => setForm({ ...form, telefone: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-surface-dark-foreground/5 border border-surface-dark-foreground/10 text-surface-dark-foreground font-body text-sm focus:outline-none focus:border-accent transition placeholder:text-surface-dark-foreground/30"
                  placeholder="(63) 99999-0000"
                />
              </div>
            </div>
            <div>
              <label className="font-body text-sm text-surface-dark-foreground/80 mb-1.5 block">Interesse</label>
              <select
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-surface-dark-foreground/5 border border-surface-dark-foreground/10 text-surface-dark-foreground font-body text-sm focus:outline-none focus:border-accent transition"
              >
                <option>Organizar evento</option>
                <option>Inscrição em corrida</option>
                <option>Patrocínio / Parceria</option>
                <option>Consultoria esportiva</option>
                <option>Outro</option>
              </select>
            </div>
            <div>
              <label className="font-body text-sm text-surface-dark-foreground/80 mb-1.5 block">Mensagem</label>
              <textarea
                required
                rows={4}
                value={form.mensagem}
                onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-surface-dark-foreground/5 border border-surface-dark-foreground/10 text-surface-dark-foreground font-body text-sm focus:outline-none focus:border-accent transition placeholder:text-surface-dark-foreground/30 resize-none"
                placeholder="Conte-nos mais sobre o que precisa..."
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 w-full px-8 py-4 rounded-full bg-accent text-accent-foreground font-body font-bold text-base hover:brightness-110 transition"
            >
              <Send size={18} />
              Enviar pelo WhatsApp
            </button>
          </form>

          {/* Info */}
          <div className="flex flex-col justify-center space-y-8">
            {[
              { icon: Phone, label: "(63) 99999-0000", sub: "WhatsApp disponível" },
              { icon: Mail, label: "contato@lcmesportivo.com.br", sub: "Respondemos em até 24h" },
              { icon: MapPin, label: "Palmas - Tocantins", sub: "Capital do Tocantins" },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Icon size={20} className="text-accent" />
                </div>
                <div>
                  <p className="font-body font-semibold text-surface-dark-foreground">{label}</p>
                  <p className="font-body text-sm text-surface-dark-foreground/50">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

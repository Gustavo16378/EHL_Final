import { Instagram, Facebook, Youtube } from "lucide-react";

const Footer = () => (
  <footer className="bg-primary py-16">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid md:grid-cols-4 gap-10 mb-12">
        <div>
          <h3 className="font-display text-2xl text-primary-foreground mb-4">
            LCM <span className="text-accent">Esportivo</span>
          </h3>
          <p className="font-body text-sm text-primary-foreground/50 leading-relaxed">
            Referência em corridas de rua e gestão esportiva no Tocantins. Transformando vidas pelo esporte.
          </p>
        </div>

        <div>
          <h4 className="font-body font-semibold text-primary-foreground mb-4 text-sm uppercase tracking-wider">Links</h4>
          <ul className="space-y-2">
            {["Início", "Sobre", "Eventos", "Próximas Corridas", "FAQ"].map((l) => (
              <li key={l}>
                <a href={`#${l.toLowerCase().replace(/\s+/g, "").replace("í", "i").replace("ó", "o")}`} className="font-body text-sm text-primary-foreground/50 hover:text-accent transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-body font-semibold text-primary-foreground mb-4 text-sm uppercase tracking-wider">Contato</h4>
          <ul className="space-y-2 font-body text-sm text-primary-foreground/50">
            <li>(63) 99999-0000</li>
            <li>contato@lcmesportivo.com.br</li>
            <li>Palmas - Tocantins</li>
          </ul>
        </div>

        <div>
          <h4 className="font-body font-semibold text-primary-foreground mb-4 text-sm uppercase tracking-wider">Redes sociais</h4>
          <div className="flex gap-4">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors group"
              >
                <Icon size={18} className="text-primary-foreground/60 group-hover:text-accent-foreground" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 pt-8 text-center">
        <p className="font-body text-xs text-primary-foreground/40">
          © {new Date().getFullYear()} LCM Gestão e Treinamento Esportivo. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;

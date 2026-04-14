import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/assets/LCM.jpeg";

const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Eventos", href: "#eventos" },
  { label: "Próximas Corridas", href: "#proximas" },
  { label: "Patrocinadores", href: "#sponsors" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
];

import { useEffect } from "react";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      let found = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80 && rect.bottom > 80) {
            found = id;
            break;
          }
        }
      }
      setActive(found ? `#${found}` : "");
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-dark/95 backdrop-blur-md border-b border-surface-dark-foreground/10">
      <div className="container mx-auto flex items-center justify-between h-16 px-4 lg:px-8">
        <a href="#inicio" className="font-display text-2xl tracking-wider text-surface-dark-foreground">
          <img src={Logo} alt="LCM Gestão e Treinamento Esportivo" className="h-10 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={
                `text-sm font-body font-medium transition-colors px-1 ` +
                (active === l.href
                  ? "text-accent border-b-2 border-accent"
                  : "text-surface-dark-foreground/70 hover:text-accent")
              }
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contato"
          className="hidden md:inline-flex items-center px-6 py-2.5 rounded-full bg-accent text-accent-foreground font-body font-semibold text-sm hover:brightness-110 transition"
        >
          Contrate
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-surface-dark-foreground"
          aria-label="Menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-surface-dark border-t border-surface-dark-foreground/10 px-4 pb-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-surface-dark-foreground/80 hover:text-accent font-body text-sm transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contato"
            onClick={() => setOpen(false)}
            className="mt-3 block text-center px-6 py-3 rounded-full bg-accent text-accent-foreground font-body font-semibold text-sm"
          >
            Contrate
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

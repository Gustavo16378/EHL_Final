import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ehlLogo from '@/assets/ehl-logo.png';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t('header.home'), to: '/' },
    { label: t('header.company'), to: '/company' },
    { label: t('header.equipments'), to: '/equipments' },
    { label: t('header.constructions'), to: '/constructions' },
    { label: t('header.portfolio'), to: '/portfolio' },
    { label: t('header.institutional'), to: '/institutional' },
    { label: t('header.contact'), to: '/contact' },
  ];

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-glass border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="flex items-center gap-3">
          <img src={ehlLogo} alt="EHL - Eletro Hidro Ltda." className="h-10 w-auto" />
          <span className="hidden sm:block text-foreground font-light text-sm tracking-[0.2em] uppercase">
            Eletro Hidro
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Globe size={14} />
            <select 
              className="bg-transparent text-xs text-muted-foreground border-none outline-none cursor-pointer"
              onChange={handleLanguageChange}
              value={i18n.language}
            >
              <option value="pt">BR</option>
              <option value="en">EN</option>
              <option value="es">ES</option>
            </select>
          </div>
          <Link
            to="/contact"
            className="bg-primary text-primary-foreground px-5 py-2 rounded text-sm font-medium hover:opacity-90 transition-opacity"
          >
            {t('header.quote')}
          </Link>
        </div>

        <button
          className="lg:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden bg-glass border-t border-border animate-fade-in-slow">
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-muted-foreground hover:text-foreground transition-colors text-lg"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="bg-primary text-primary-foreground px-5 py-3 rounded text-center font-medium mt-2"
              onClick={() => setMobileOpen(false)}
            >
              {t('header.quote')}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

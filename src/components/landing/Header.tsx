import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ehlLogo from '@/assets/ehl-logo.png';
import { fetchSingle, getCmsImageUrl, resolveLocale } from '@/lib/cms';
import { useRefetchOnFocus } from '@/hooks/useRefetchOnFocus';

type CmsGlobalConfig = {
  logo?: unknown;
  companyName?: string;
  contactButtonLabel?: string;
};

const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const refetchTick = useRefetchOnFocus();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cmsGlobal, setCmsGlobal] = useState<CmsGlobalConfig | null>(null);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const locale = resolveLocale(i18n.language);
        const data = await fetchSingle<CmsGlobalConfig>('global-config', { locale, populate: 'logo' });
        if (!cancelled) setCmsGlobal(data);
      } catch {
        if (!cancelled) setCmsGlobal(null);
      }
    };
    load();
    return () => { cancelled = true; };
  }, [i18n.language, refetchTick]);

  const logoUrl = getCmsImageUrl(cmsGlobal?.logo) ?? null;
  const companyName = cmsGlobal?.companyName || 'Eletro Hidro';
  const contactLabel = cmsGlobal?.contactButtonLabel || t('header.contact');

  const navLinks = [
    { label: t('header.home'), to: '/' },
    { label: t('header.company'), to: '/company' },
    { label: t('header.equipments') || 'Equipamentos', to: '/EquipamentsPage' },
    { label: t('header.constructions') || 'Obras', to: '/ConstructionsPage' },
    { label: t('header.portfolio'), to: '/portfolio' },
  ];

  const isActive = (to: string) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

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
        scrolled ? 'bg-background border-b border-border' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logoUrl ?? ehlLogo}
            alt="EHL - Eletro Hidro Ltda."
            className="h-10 w-auto"
          />
          <span className="hidden sm:block text-foreground font-light text-sm tracking-[0.2em] uppercase">
            {companyName}
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm transition-colors relative group ${
                isActive(link.to)
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300 ${
                  isActive(link.to) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
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
            {contactLabel}
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
        <div className="lg:hidden bg-background border-t border-border animate-fade-in-slow">
          <nav className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`transition-colors text-lg ${
                  isActive(link.to) ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                }`}
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
              {contactLabel}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

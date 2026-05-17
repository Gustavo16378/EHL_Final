import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ehlLogo from '@/assets/Logo.png';
import { fetchSingle, getCmsImageUrl, resolveLocale } from '@/lib/cms';
import { useRefetchOnFocus } from '@/hooks/useRefetchOnFocus';
import { useScrollDirection } from '@/hooks/useScrollDirection';

type CmsGlobalConfig = {
  logo?: unknown;
  companyName?: string;
  contactButtonLabel?: string;
};

const langs = [
  { value: 'pt', label: 'BR' },
  { value: 'en', label: 'EN' },
  { value: 'es', label: 'ES' },
];

const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const refetchTick = useRefetchOnFocus();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [cmsGlobal, setCmsGlobal] = useState<CmsGlobalConfig | null>(null);
  const langRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (!langOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (!langRef.current?.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [langOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Trava scroll do body enquanto drawer está aberto
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const scrollDirection = useScrollDirection();
  const hidden = scrollDirection === 'down' && scrolled && !mobileOpen;

  const logoUrl = getCmsImageUrl(cmsGlobal?.logo) ?? null;
  const companyName = cmsGlobal?.companyName || 'Eletro Hidro Ltda.';
  const contactLabel = cmsGlobal?.contactButtonLabel || t('header.contact');
  const currentLang = langs.find((l) => l.value === i18n.language) ?? langs[0];

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

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-background border-b border-border' : 'bg-transparent'
        } ${hidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoUrl ?? ehlLogo}
              alt="EHL - Eletro Hidro Ltda."
              className="h-10 w-auto"
            />
            <span className="text-foreground font-light text-sm tracking-[0.2em] uppercase">
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
            {/* Language switcher — desktop */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <Globe size={14} />
                <span>{currentLang.label}</span>
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`}
                />
              </button>
              {langOpen && (
                <div className="absolute top-full right-0 mt-2 bg-card border border-border rounded-md shadow-lg overflow-hidden z-50 min-w-[72px]">
                  {langs.map((lang) => (
                    <button
                      key={lang.value}
                      onClick={() => { i18n.changeLanguage(lang.value); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-xs transition-colors ${
                        lang.value === i18n.language
                          ? 'text-primary bg-primary/10 font-medium'
                          : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              )}
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
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Backdrop — cobre tela toda (incluindo header), clica fora pra fechar */}
      <div
        className={`lg:hidden fixed inset-0 z-[51] bg-background/70 backdrop-blur-sm transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMobile}
        aria-hidden
      />

      {/* Drawer — desliza da direita, acima do backdrop e do header */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-72 bg-background border-l border-border z-[52] transition-transform duration-300 ease-in-out flex flex-col ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Topo do drawer com logo e botão fechar */}
        <div className="flex items-center justify-between px-6 h-[72px] border-b border-border flex-shrink-0">
          <Link to="/" className="flex items-center gap-2" onClick={closeMobile}>
            <img src={logoUrl ?? ehlLogo} alt="EHL" className="h-8 w-auto" />
          </Link>
          <button onClick={closeMobile} className="text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col px-6 pt-6 gap-5 flex-1 overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-lg transition-colors ${
                isActive(link.to) ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={closeMobile}
            >
              {link.label}
              {isActive(link.to) && (
                <span className="block mt-0.5 w-6 h-[2px] bg-primary rounded" />
              )}
            </Link>
          ))}
        </nav>

        <div className="px-6 pb-8 pt-4 border-t border-border space-y-4 flex-shrink-0">
          <Link
            to="/contact"
            className="block bg-primary text-primary-foreground px-5 py-3 rounded text-center text-sm font-medium hover:opacity-90 transition-opacity"
            onClick={closeMobile}
          >
            {contactLabel}
          </Link>

          {/* Language switcher — mobile */}
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-muted-foreground" />
            {langs.map((lang) => (
              <button
                key={lang.value}
                onClick={() => { i18n.changeLanguage(lang.value); closeMobile(); }}
                className={`text-xs px-3 py-1.5 rounded transition-colors ${
                  lang.value === i18n.language
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-muted-foreground border border-border hover:text-foreground'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

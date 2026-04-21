import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ehlLogo from '@/assets/Logo.png';
import { fetchSingle, getCmsImageUrl, resolveLocale } from '@/lib/cms';
import { useRefetchOnFocus } from '@/hooks/useRefetchOnFocus';

type CmsGlobalConfig = {
  logo?: unknown;
  companyName?: string;
  address?: string;
  footerDescription?: string;
  copyright?: string;
};

const Footer = () => {
  const { t, i18n } = useTranslation();
  const refetchTick = useRefetchOnFocus();
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
  const companyName = cmsGlobal?.companyName || 'Eletro Hidro Ltda.';
  const address = cmsGlobal?.address || '712 Sul Alameda 02 Lote 17ª · Palmas-TO · CEP: 77022-426';
  const description = cmsGlobal?.footerDescription || t('footer.desc');
  const copyright = cmsGlobal?.copyright || t('footer.rights');

  const navLinks = [
    { label: t('header.home'), to: '/' },
    { label: t('header.company'), to: '/company' },
    { label: t('header.equipments') || 'Equipamentos', to: '/EquipamentsPage' },
    { label: t('header.constructions') || 'Obras', to: '/ConstructionsPage' },
    { label: t('header.portfolio'), to: '/portfolio' },
    { label: t('header.contact'), to: '/contact' },
  ];

  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div className="max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <img
                src={logoUrl ?? ehlLogo}
                alt="EHL - Eletro Hidro Ltda."
                className="h-8 w-auto"
              />
              <span className="text-foreground font-light text-sm tracking-[0.15em] uppercase">
                {companyName}
              </span>
            </div>
            <p className="text-muted-foreground text-sm font-light leading-relaxed">
              {description}
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 content-start">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-muted-foreground text-xs">{copyright}</p>
          <p className="text-muted-foreground text-xs">{address}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

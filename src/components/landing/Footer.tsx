import { useTranslation } from 'react-i18next';
import { useCmsSingle } from '@/hooks/useCms';

type CmsGlobalConfig = {
  address?: string;
  copyright?: string;
  footerDescription?: string;
};

const Footer = () => {
  const { t } = useTranslation();
  // Mesmo `populate` do Header: assim os dois compartilham a mesma entrada de
  // cache e o global-config é buscado uma vez só por idioma.
  const { data: cmsGlobal } = useCmsSingle<CmsGlobalConfig>('global-config', { populate: 'logo' });

  const address = cmsGlobal?.address || '712 Sul Alameda 02 Lote 17ª · Palmas-TO · CEP: 77022-426';
  const copyright = cmsGlobal?.copyright || t('footer.rights');
  const description = cmsGlobal?.footerDescription;

  return (
    <footer className="border-t border-border py-6">
      <div className="container mx-auto px-6 flex flex-col gap-3">
        {description && (
          <p className="text-muted-foreground text-xs max-w-2xl">{description}</p>
        )}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-muted-foreground text-xs">{copyright}</p>
          <p className="text-muted-foreground text-xs">{address}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useTranslation } from 'react-i18next';
import ehlLogo from '@/assets/Logo.png';

const Footer = () => {
  const { t } = useTranslation();

  const address = '712 Sul Alameda 02 Lote 17ª · Palmas-TO · CEP: 77022-426';
  // Ano sempre atual: estava cravado como 2024 na tradução e já tinha vencido.
  const copyright = t('footer.rights', { year: new Date().getFullYear() });

  return (
    <footer className="border-t border-border py-4">
      <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-3">
          <img src={ehlLogo} alt="EHL" className="h-6 w-auto" />
          <p className="text-muted-foreground text-xs">{copyright}</p>
        </div>
        <p className="text-muted-foreground text-xs text-center sm:text-right">{address}</p>
      </div>
    </footer>
  );
};

export default Footer;

import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import ehlLogo from '@/assets/ehl-logo.png';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-border py-16">
      <div className="container mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src={ehlLogo} alt="EHL - Eletro Hidro Ltda." className="h-8 w-auto" />
              <span className="text-foreground font-light text-sm tracking-[0.15em] uppercase">
                Eletro Hidro Ltda.
              </span>
            </div>
            <p className="text-muted-foreground text-sm font-light max-w-sm leading-relaxed">
              {t('footer.desc')}
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FaLinkedin size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <FaFacebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-foreground text-sm font-medium mb-4">{t('footer.company')}</h4>
            <div className="space-y-3">
              {[
                { key: 'about', label: t('footer.companyLinks.about') },
                { key: 'team', label: t('footer.companyLinks.team') },
                { key: 'careers', label: t('footer.companyLinks.careers') },
                { key: 'certs', label: t('footer.companyLinks.certs') }
              ].map((link) => (
                <a key={link.key} href="#" className="block text-muted-foreground text-sm hover:text-foreground transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-foreground text-sm font-medium mb-4">{t('footer.services')}</h4>
            <div className="space-y-3">
              {[
                { key: 'paving', label: t('footer.serviceLinks.paving') },
                { key: 'urban', label: t('footer.serviceLinks.urban') },
                { key: 'earthwork', label: t('footer.serviceLinks.earthwork') },
                { key: 'drainage', label: t('footer.serviceLinks.drainage') }
              ].map((link) => (
                <a key={link.key} href="#" className="block text-muted-foreground text-sm hover:text-foreground transition-colors">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-xs">
            {t('footer.rights')}
          </p>
          <p className="text-muted-foreground text-xs">
            712 Sul Alameda 02 Lote 17ª · Palmas-TO · CEP: 77022-426
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

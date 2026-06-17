import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { MapPin, Phone, Mail, Send, Newspaper } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchSingle, resolveLocale } from '@/lib/cms';
import { useRefetchOnFocus } from '@/hooks/useRefetchOnFocus';

type CmsContactPageAttributes = {
  title1?: string;
  title2?: string;
  subtitle?: string;

  addressTitle?: string;
  addressText?: string;
  phoneTitle?: string;
  phoneText?: string;
  emailTitle?: string;
  emailText?: string;
  pressTitle?: string;
  pressText?: string;

  namePlaceholder?: string;
  emailPlaceholder?: string;
  subjectPlaceholder?: string;
  messagePlaceholder?: string;
  sendButton?: string;
  sentButton?: string;
};

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);
  const { t, i18n } = useTranslation();
  const refetchTick = useRefetchOnFocus();
  const [cmsPage, setCmsPage] = useState<CmsContactPageAttributes | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const locale = resolveLocale(i18n.language);
        const page = await fetchSingle<CmsContactPageAttributes>('contact-page', { locale });
        if (cancelled) return;
        setCmsPage(page);
      } catch {
        if (cancelled) return;
        setCmsPage(null);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [i18n.language, refetchTick]);

  const headerTitle1 = cmsPage?.title1 || t('contact.title1');
  const headerTitle2 = cmsPage?.title2 || t('contact.title2');
  const headerSubtitle = cmsPage?.subtitle || t('contact.subtitle');

  const addressTitle = cmsPage?.addressTitle || t('contact.address');
  const phoneTitle = cmsPage?.phoneTitle || t('contact.phone');
  const emailTitle = cmsPage?.emailTitle || t('contact.email');
  const pressTitle = cmsPage?.pressTitle || t('contact.press');

  const addressText = cmsPage?.addressText || '712 Sul Alameda 02 Lote 17ª\nPalmas-TO | CEP: 77022-426';
  const phoneText = cmsPage?.phoneText || '+55 63 3228-7700';
  const emailText = cmsPage?.emailText || 'ehl@ehl.com.br';
  const pressText = cmsPage?.pressText || '+55 63 3212-1392\ndiretoria@precisaassessoria.com.br';

  const namePlaceholder = cmsPage?.namePlaceholder || t('contact.namePlaceholder');
  const emailPlaceholder = cmsPage?.emailPlaceholder || t('contact.emailPlaceholder');
  const subjectPlaceholder = cmsPage?.subjectPlaceholder || t('contact.subjectPlaceholder');
  const messagePlaceholder = cmsPage?.messagePlaceholder || t('contact.messagePlaceholder');
  const sendButton = cmsPage?.sendButton || t('contact.sendButton');
  const sentButton = cmsPage?.sentButton || t('contact.sentButton');

  return (
    <section id="contact" className="py-32">
      <div className="container mx-auto px-6" ref={ref}>
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <div className="w-12 h-[2px] gradient-red-line mx-auto mb-6" />
            <h1 className="text-4xl sm:text-5xl font-extralight text-foreground mb-6">
              {headerTitle1} <span className="text-primary font-light">{headerTitle2}</span>
            </h1>
            <p className="text-silver font-light text-lg">
              {headerSubtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto mb-12">
            <div className="lg:col-span-2 space-y-8">
              {[
                { icon: MapPin, title: addressTitle, text: addressText },
                { icon: Phone, title: phoneTitle, text: phoneText },
                { icon: Mail, title: emailTitle, text: emailText },
                { icon: Newspaper, title: pressTitle, text: pressText },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <item.icon size={20} className="text-primary mt-1 flex-shrink-0" />
                  <div>
                    <div className="text-foreground text-sm font-medium mb-1">{item.title}</div>
                    <div className="text-muted-foreground text-sm whitespace-pre-line">{item.text}</div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder={namePlaceholder}
                  required
                  className="w-full bg-card border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder={emailPlaceholder}
                  required
                  className="w-full bg-card border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <input
                type="text"
                placeholder={subjectPlaceholder}
                className="w-full bg-card border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
              <textarea
                placeholder={messagePlaceholder}
                rows={5}
                required
                className="w-full bg-card border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-8 py-3.5 rounded text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                {submitted ? sentButton : sendButton}
                <Send size={16} />
              </button>
            </form>
          </div>
          <div className="max-w-5xl mx-auto rounded-lg overflow-hidden border border-border/50">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3926.454351653393!2d-48.3150536!3d-10.224891399999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9324cb76deed2087%3A0x1c5b3ce08c35dfca!2sEHL%20-%20Eletro%20Hidro!5e0!3m2!1spt-BR!2sbr!4v1779059805092!5m2!1spt-BR!2sbr"
              width="100%"
              height="380"
              style={{ border: 0, display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="EHL — Eletro Hidro no Google Maps"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

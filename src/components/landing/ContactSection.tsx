import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { MapPin, Phone, Mail, Send, Newspaper, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { resolveLocale, submitContact } from '@/lib/cms';
import { useCmsSingle } from '@/hooks/useCms';

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

const CAMPOS_INICIAIS = { name: '', email: '', subject: '', message: '', company: '' };

const campoClasses =
  'w-full bg-card border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors';

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const { t, i18n } = useTranslation();
  const { data: cmsPage } = useCmsSingle<CmsContactPageAttributes>('contact-page');

  const [campos, setCampos] = useState(CAMPOS_INICIAIS);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const atualizar =
    (campo: keyof typeof CAMPOS_INICIAIS) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setCampos((atual) => ({ ...atual, [campo]: e.target.value }));
      if (status === 'error') setStatus('idle');
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;

    setStatus('sending');
    try {
      await submitContact({
        name: campos.name.trim(),
        email: campos.email.trim(),
        subject: campos.subject.trim() || undefined,
        message: campos.message.trim(),
        sourceLocale: resolveLocale(i18n.language),
        company: campos.company,
      });
      setCampos(CAMPOS_INICIAIS);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

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
            <h2 className="text-4xl sm:text-5xl font-extralight text-foreground mb-6">
              {headerTitle1} <span className="text-primary font-light">{headerTitle2}</span>
            </h2>
            <p className="text-silver font-light text-lg">
              {headerSubtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
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

            <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5" noValidate={false}>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="contact-name" className="sr-only">
                    {namePlaceholder}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    maxLength={120}
                    value={campos.name}
                    onChange={atualizar('name')}
                    placeholder={namePlaceholder}
                    required
                    className={campoClasses}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="sr-only">
                    {emailPlaceholder}
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    maxLength={180}
                    value={campos.email}
                    onChange={atualizar('email')}
                    placeholder={emailPlaceholder}
                    required
                    className={campoClasses}
                  />
                </div>
              </div>

              <label htmlFor="contact-subject" className="sr-only">
                {subjectPlaceholder}
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                maxLength={180}
                value={campos.subject}
                onChange={atualizar('subject')}
                placeholder={subjectPlaceholder}
                className={campoClasses}
              />

              <label htmlFor="contact-message" className="sr-only">
                {messagePlaceholder}
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                maxLength={5000}
                value={campos.message}
                onChange={atualizar('message')}
                placeholder={messagePlaceholder}
                required
                className={`${campoClasses} resize-none`}
              />

              {/* Armadilha anti-spam: invisível para pessoas, preenchida por bots. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="contact-company">Empresa</label>
                <input
                  id="contact-company"
                  name="company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={campos.company}
                  onChange={atualizar('company')}
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="bg-primary text-primary-foreground px-8 py-3.5 rounded text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'sending' ? t('contact.sending') : status === 'sent' ? sentButton : sendButton}
                  {status === 'sending' ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                </button>

                <p aria-live="polite" role="status" className="text-sm">
                  {status === 'sent' && (
                    <span className="text-primary">{t('contact.successMessage')}</span>
                  )}
                  {status === 'error' && (
                    <span className="text-destructive">{t('contact.errorMessage')}</span>
                  )}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

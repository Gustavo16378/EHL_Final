import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { MapPin, Phone, Mail, Send, Newspaper } from 'lucide-react';
import { useState } from 'react';

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-32">
      <div className="container mx-auto px-6" ref={ref}>
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center max-w-2xl mx-auto mb-20">
            <div className="w-12 h-[2px] gradient-red-line mx-auto mb-6" />
            <h2 className="text-4xl sm:text-5xl font-extralight text-foreground mb-6">
              Get in <span className="text-primary font-light">Touch</span>
            </h2>
            <p className="text-silver font-light text-lg">
              Pronto para iniciar seu próximo projeto? Vamos conversar sobre como transformar sua visão em realidade.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
            <div className="lg:col-span-2 space-y-8">
              {[
                { icon: MapPin, title: 'Endereço', text: '712 Sul Alameda 02 Lote 17ª\nPalmas-TO | CEP: 77022-426' },
                { icon: Phone, title: 'Telefone', text: '+55 63 3228-7700' },
                { icon: Mail, title: 'Email', text: 'ehl@ehl.com.br' },
                { icon: Newspaper, title: 'Assessoria de Imprensa', text: '+55 63 3212-1392\ndiretoria@precisaassessoria.com.br' },
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
                  placeholder="Your Name"
                  required
                  className="w-full bg-card border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full bg-card border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                className="w-full bg-card border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors"
              />
              <textarea
                placeholder="Tell us about your project..."
                rows={5}
                required
                className="w-full bg-card border border-border rounded px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors resize-none"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-8 py-3.5 rounded text-sm font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                {submitted ? 'Message Sent!' : 'Send Message'}
                <Send size={16} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

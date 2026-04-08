import { ChevronDown, Shield, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import heroImage from '@/assets/hero-infrastructure.jpg';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Infrastructure engineering project"
          width={1920}
          height={1080}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      <div className="container mx-auto px-6 relative z-10 pt-24">
        <div className="max-w-3xl">
          <div className="animate-fade-up opacity-0" style={{ animationFillMode: 'forwards' }}>
            <div className="w-16 h-[2px] gradient-red-line mb-8" />
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extralight tracking-tight text-foreground leading-[1.05]">
              {t('hero.title1')}
              <br />
              <span className="font-light">{t('hero.title2')}</span>
              <span className="text-primary font-normal">.</span>
            </h1>
          </div>

          <p className="animate-fade-up opacity-0 animation-delay-400 text-silver text-lg sm:text-xl font-light mt-8 max-w-xl leading-relaxed" style={{ animationFillMode: 'forwards' }}>
            {t('hero.subtitle')}
          </p>

          <div className="animate-fade-up opacity-0 animation-delay-600 flex gap-4 mt-12" style={{ animationFillMode: 'forwards' }}>
            <a
              href="#company"
              className="bg-primary text-primary-foreground px-8 py-3.5 rounded text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {t('hero.discover')}
            </a>
            <a
              href="#portfolio"
              className="border border-border text-foreground px-8 py-3.5 rounded text-sm font-medium hover:bg-secondary transition-colors"
            >
              {t('hero.portfolio')}
            </a>
          </div>

          {/* Certification badges */}
          <div className="animate-fade-up opacity-0 animation-delay-800 flex flex-wrap gap-4 mt-16" style={{ animationFillMode: 'forwards' }}>
            <div className="flex items-center gap-2 bg-card/60 border border-border/50 rounded-full px-4 py-2 backdrop-blur-sm">
              <Shield size={14} className="text-primary" />
              <span className="text-xs text-silver font-light">{t('hero.iso')}</span>
            </div>
            <div className="flex items-center gap-2 bg-card/60 border border-border/50 rounded-full px-4 py-2 backdrop-blur-sm">
              <Award size={14} className="text-primary" />
              <span className="text-xs text-silver font-light">{t('hero.pbqp')}</span>
            </div>
          </div>
        </div>
      </div>

      
    </section>
  );
};

export default HeroSection;

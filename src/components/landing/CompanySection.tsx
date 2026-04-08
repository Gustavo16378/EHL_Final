import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Shield, Target, Award, Users, CheckCircle } from 'lucide-react';
import companyImage from '@/assets/company-office.jpg';
import { useTranslation } from 'react-i18next';



const CompanySection = () => {
  const { t } = useTranslation();
  
  let quality: string[] = [t('company.iso'), t('company.pbqp'), t('company.licensing'), t('company.safety')];

  const qualityItems = [
    quality[0],
    quality[1],
    quality[2],
    quality[3],
  ];

  let label: string[] = [t('company.years'), t('company.delivered'), t('company.level'), t('company.collaborators')];

  const stats = [
    { icon: Shield, value: '25+', label: label[0] },
    { icon: Target, value: '200+', label: label[1] },
    { icon: Award, value: 'Nível A', label: label[2] },
    { icon: Users, value: '800+', label: label[3] },
  ];

  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="company" className="py-32 relative">
      <div className="container mx-auto px-6" ref={ref}>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'animate-slide-left opacity-100' : 'opacity-0'}`}>
            <div className="w-12 h-[2px] gradient-red-line mb-6" />
            <h2 className="text-4xl sm:text-5xl font-extralight text-foreground mb-8 leading-tight">
              {t('company.title1')}
              <br />
              <span className="font-light text-primary">{t('company.title2')}</span>
            </h2>
            <p className="text-silver text-lg font-light leading-relaxed mb-6">
              {t('company.p1')}
            </p>
            <p className="text-muted-foreground font-light leading-relaxed mb-8">
              {t('company.p2')}
            </p>

            <div className="space-y-3">
              {qualityItems.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle size={16} className="text-primary flex-shrink-0" />
                  <span className="text-silver text-sm font-light">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={companyImage}
                alt="EHL corporate headquarters"
                width={1280}
                height={960}
                loading="lazy"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 mt-24 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <stat.icon size={24} className="mx-auto text-primary mb-4 group-hover:scale-110 transition-transform" />
              <div className="text-3xl sm:text-4xl font-light text-foreground mb-2">{stat.value}</div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanySection;

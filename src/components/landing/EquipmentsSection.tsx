import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Zap, Droplets, HardHat, Wrench, Truck, Settings } from 'lucide-react';
import equipmentImage from '@/assets/equipment-machinery.jpg';

const capabilities = [
  { icon: Zap, title: 'Electrical Systems', desc: 'High-voltage installations, substations, and power distribution networks.' },
  { icon: Droplets, title: 'Hydraulic Engineering', desc: 'Dam construction, water treatment plants, and hydraulic infrastructure.' },
  { icon: HardHat, title: 'Civil Construction', desc: 'Bridges, viaducts, tunnels, and large-scale structural engineering.' },
  { icon: Wrench, title: 'Maintenance', desc: 'Preventive and corrective maintenance for industrial equipment.' },
  { icon: Truck, title: 'Heavy Equipment', desc: 'Fleet of modern cranes, excavators, and specialized machinery.' },
  { icon: Settings, title: 'Automation', desc: 'Industrial automation and control systems integration.' },
];

const EquipmentsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="equipments" className="py-32 relative">
      {/* Full-width background image */}
      <div className="absolute inset-0 opacity-10">
        <img src={equipmentImage} alt="" className="w-full h-full object-cover" loading="lazy" width={1280} height={960} />
      </div>
      <div className="absolute inset-0 bg-background/95" />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <div className={`text-center max-w-2xl mx-auto mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="w-12 h-[2px] gradient-red-line mx-auto mb-6" />
          <h2 className="text-4xl sm:text-5xl font-extralight text-foreground mb-6">
            Equipments & <span className="text-primary font-light">Capabilities</span>
          </h2>
          <p className="text-silver font-light text-lg">
            State-of-the-art machinery and engineering expertise for projects of any scale.
          </p>
        </div>

        <div className={`grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="group p-8 rounded-lg border border-border bg-card/50 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1"
            >
              <cap.icon size={28} className="text-primary mb-5 group-hover:scale-110 transition-transform" />
              <h3 className="text-foreground text-lg font-medium mb-3">{cap.title}</h3>
              <p className="text-muted-foreground text-sm font-light leading-relaxed">{cap.desc}</p>
              <div className="w-0 h-[2px] bg-primary mt-6 transition-all duration-500 group-hover:w-12" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EquipmentsSection;
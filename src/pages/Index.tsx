import Header from '@/components/landing/Header';
import HeroSection from '@/components/landing/HeroSection';
import CompanySection from '@/components/landing/CompanySection';
import InfrastructureSection from '@/components/landing/InfrastructureSection';
import PortfolioSection from '@/components/landing/PortfolioSection';
import ContactSection from '@/components/landing/ContactSection';
import Footer from '@/components/landing/Footer';

const Index = () => (
  <div className="min-h-screen bg-background">
    <Header />
    <HeroSection />
    <CompanySection />
    <InfrastructureSection />
    <PortfolioSection />
    <ContactSection />
    <Footer />
  </div>
);

export default Index;

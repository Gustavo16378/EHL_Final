import { LightboxProvider } from "@/components/ImageLightbox";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import EventsSection from "@/components/EventsSection";
import UpcomingRaces from "@/components/UpcomingRaces";
import SponsorsSection from "@/components/SponsorsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => (
  <LightboxProvider>
    <Navbar />
    <HeroSection />
    <AboutSection />
    <StatsSection />
    <EventsSection />
    <UpcomingRaces />
    <SponsorsSection />
    <TestimonialsSection />
    <FAQSection />
    <ContactSection />
    <Footer />
  </LightboxProvider>
);

export default Index;

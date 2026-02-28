import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import HeroBenefitsStrip from '@/components/sections/HeroBenefitsStrip';
import ServicesSection from '@/components/sections/ServicesSection';
import PortfolioSection from '@/components/sections/PortfolioSection';
import PremiumPositioningSection from '@/components/sections/PremiumPositioningSection';
import CTASection from '@/components/sections/CTASection';
import StatsMiniSection from '@/components/sections/StatsMiniSection';

const Index = () => {
  return (
    <div className="home-dark min-h-screen bg-slate-900">
      <Header />
      <main className="bg-slate-900">
        <HeroSection />
        <div className="container mx-auto container-padding">
          <div className="section-divider-strong" />
        </div>
        <StatsMiniSection />
        <div className="container mx-auto container-padding">
          <div className="section-divider-strong" />
        </div>
        <PremiumPositioningSection />
        <div className="container mx-auto container-padding">
          <div className="section-divider-strong" />
        </div>
        <HeroBenefitsStrip />
        <div className="container mx-auto container-padding">
          <div className="section-divider-strong" />
        </div>
        <ServicesSection />
        <div className="container mx-auto container-padding">
          <div className="section-divider-strong" />
        </div>
        <PortfolioSection />
        <div className="container mx-auto container-padding">
          <div className="section-divider-strong" />
        </div>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;

import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation';
import heroHomeBg from '@/assets/hero-new.png';
import heroMacbookMockup from '@/assets/hero-macbook-mockup.png';
import webmaatBg from '@/assets/Webmaat.png';

const HeroSection = () => {
  const { language } = useLanguage();
  const heroContent = {
    title:
      language === 'nl'
        ? 'Digitale Oplossingen Op Maat'
        : 'Digital solutions for businesses that want to move forward.',
    subtitle:
      language === 'nl'
        ? 'Meer dan design, gebouwd voor groei.'
        : 'From professional websites to tailored digital systems. Fast, scalable, and future-proof.',
    cta: language === 'nl' ? 'Vraag Offerte Aan' : 'Request Quote',
    ctaSecondary: language === 'nl' ? 'Bekijk Ons Werk' : 'View Our Work',
  };

  return (
    <section
      className="relative isolate min-h-[42vh] sm:min-h-[46vh] md:min-h-[56vh] lg:min-h-[58vh] overflow-hidden bg-slate-900 pt-16 pb-6 sm:pt-18 sm:pb-7 md:pt-20 md:pb-8 lg:pt-24 lg:pb-10"
      style={{ backgroundColor: '#0f172a' }}
      data-hero-version="dark-v5-sync"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={heroHomeBg}
          alt="Webdesign hero background"
          className="w-full h-full object-cover object-center grayscale-[4%] brightness-[0.8] saturate-[1.08] contrast-[1.05]"
          onError={(event) => {
            const target = event.currentTarget;
            target.onerror = null;
            target.src = webmaatBg;
          }}
        />
        <div className="absolute inset-0 bg-slate-900/20" style={{ backgroundColor: 'rgba(15, 23, 42, 0.2)' }} />
        <div
          className="absolute inset-0 bg-gradient-to-r from-slate-950/35 via-slate-900/24 to-slate-900/12"
          style={{
            background:
              'linear-gradient(90deg, rgba(2,6,23,0.35) 0%, rgba(15,23,42,0.24) 55%, rgba(15,23,42,0.12) 100%)',
          }}
        />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{
          background:
            'linear-gradient(180deg, rgba(15,23,42,0) 0%, rgba(15,23,42,0.14) 42%, hsl(var(--soft-gray)) 100%)',
        }}
      />

      <div className="mx-auto w-full max-w-[1200px] px-3 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_440px]"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-4xl flex flex-col min-h-[calc(42vh-5.5rem)] sm:min-h-[calc(46vh-6.25rem)] md:min-h-0">
            <div className="flex-1 flex items-center md:flex-none md:block">
              <div className="md:max-w-2xl w-full">
            <motion.h1
              className="font-display text-[clamp(1.25rem,6.4vw,3.75rem)] sm:text-[2.2rem] md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.02] mb-4 text-center md:text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
              variants={fadeInUp}
            >
              {heroContent.title}
            </motion.h1>

            <motion.p
              className="text-base md:text-xl text-white/95 mb-6 max-w-2xl mx-auto md:mx-0 text-center md:text-left drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
              variants={fadeInUp}
            >
              {heroContent.subtitle}
            </motion.p>
              </div>
            </div>

            <motion.div className="pt-6 md:mt-10 lg:mt-12 grid grid-cols-2 gap-3 w-full max-w-md mx-auto md:mx-0" variants={fadeInUp}>
              <Button
                size="default"
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg group h-10 px-4"
              >
                <Link to="/quote">
                  {heroContent.cta}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                size="default"
                variant="outline"
                asChild
                className="w-full h-10 px-4 border-primary/60 text-white bg-primary/25 hover:bg-primary/35 hover:text-white"
              >
                <Link to="/portfolio">{heroContent.ctaSecondary}</Link>
              </Button>
            </motion.div>
          </div>

          <motion.div className="hidden lg:block" variants={fadeInUp}>
            <img
              src={heroMacbookMockup}
              alt="MacBook mockup met Web-Maat preview"
              className="w-full max-w-[440px] ml-auto drop-shadow-[0_18px_38px_rgba(0,0,0,0.48)]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

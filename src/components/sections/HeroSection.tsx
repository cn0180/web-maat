import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, Palette, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation';
import webmaatBg from '@/assets/Webmaat.png';

const heroHomeBg =
  'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1920&q=80';

const HeroSection = () => {
  const { language } = useLanguage();
  const heroContent = {
    title:
      language === 'nl'
        ? 'Digitale oplossingen voor groei.'
        : 'Digital solutions for growth.',
    subtitle:
      language === 'nl'
        ? 'Maatwerk websites voor bedrijven die online willen groeien.'
        : 'Tailored websites for businesses that want to grow online.',
    cta: language === 'nl' ? 'Vraag Offerte Aan' : 'Request Quote',
    ctaSecondary: language === 'nl' ? 'Bekijk Ons Werk' : 'View Our Work',
  };
  const heroPoints =
    language === 'nl'
      ? [
          { icon: BadgeCheck, label: 'Conversiegericht gebouwd' },
          { icon: Palette, label: 'Branding, design en naam' },
          { icon: TrendingUp, label: 'Gemaakt voor online groei' },
        ]
      : [
          { icon: BadgeCheck, label: 'Built for conversion' },
          { icon: Palette, label: 'Branding, design and naming' },
          { icon: TrendingUp, label: 'Made for online growth' },
        ];

  return (
    <section
      className="relative isolate min-h-[36vh] sm:min-h-[40vh] md:min-h-[48vh] lg:min-h-[50vh] overflow-hidden bg-slate-900 pt-12 pb-4 sm:pt-14 sm:pb-5 md:pt-16 md:pb-6 lg:pt-20 lg:pb-8"
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
        <div className="absolute -left-16 top-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute right-8 top-14 h-32 w-32 rounded-full bg-white/10 blur-3xl" />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{
          background:
            'linear-gradient(180deg, rgba(15,23,42,0) 0%, rgba(15,23,42,0.16) 52%, rgba(15,23,42,0.82) 100%)',
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-3 sm:px-6 lg:px-8">
        <motion.div
          className="grid items-start gap-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-4xl flex flex-col">
            <div className="flex-1 flex items-center md:flex-none md:block">
              <div className="w-full md:pt-5 lg:pt-8">
            <motion.p
              className="mb-4 inline-flex w-fit items-center rounded-full border border-white/15 bg-slate-900/55 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_10px_24px_rgba(2,6,23,0.26)] backdrop-blur-md mx-auto md:mx-0"
              variants={fadeInUp}
            >
              {language === 'nl' ? 'Websites, branding en groei' : 'Websites, branding and growth'}
            </motion.p>
            <motion.h1
              className="font-display text-[clamp(1.5rem,6.2vw,4.25rem)] sm:text-[2.35rem] md:text-[2.55rem] lg:text-[3.25rem] font-extrabold tracking-tight text-white leading-[0.98] mb-4 text-center md:text-left drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]"
              variants={fadeInUp}
            >
              {language === 'nl' ? (
                <>
                  Digitale oplossingen
                  <span className="block text-white">voor groei</span>
                </>
              ) : (
                heroContent.title
              )}
            </motion.h1>

            <motion.p
              className="text-base md:text-xl text-white mb-5 max-w-xl mx-auto md:mx-0 text-center md:text-left drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
              variants={fadeInUp}
            >
              {heroContent.subtitle}
            </motion.p>

            <motion.div
              className="grid gap-2.5 sm:grid-cols-3 mb-6 max-w-3xl mx-auto md:mx-0"
              variants={fadeInUp}
            >
              {heroPoints.map((point) => {
                const Icon = point.icon;
                return (
                  <div
                    key={point.label}
                    className="flex items-center gap-2.5 rounded-2xl border border-white/12 bg-slate-900/45 px-3.5 py-3 text-left shadow-[0_12px_30px_rgba(2,6,23,0.22)] backdrop-blur-sm"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/18 text-white">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium leading-snug text-white">{point.label}</span>
                  </div>
                );
              })}
            </motion.div>
              </div>
            </div>

            <motion.div className="pt-4 md:mt-12 lg:mt-14 grid grid-cols-2 gap-3 w-full max-w-md mx-auto md:mx-0" variants={fadeInUp}>
              <Button
                size="default"
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg group h-10 md:h-14 px-4 md:px-6 text-sm md:text-base"
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
                className="group w-full h-10 md:h-14 px-4 md:px-6 text-sm md:text-base border-slate-700 bg-slate-800 text-white transition-colors duration-300 hover:bg-slate-700 hover:text-white"
              >
                <Link to="/portfolio">
                  {heroContent.ctaSecondary}
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

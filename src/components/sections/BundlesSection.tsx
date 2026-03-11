import { Link } from 'react-router-dom';
import { bundles } from '@/data/services';
import { CheckCircle2, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';

const BundlesSection = () => {
  const { language } = useLanguage();
  const copy =
    language === 'nl'
      ? {
          eyebrow: 'Groeipakketten',
          title: 'Kies het pakket dat past bij uw bedrijf',
          subtitle: 'Van snel online tot volledig maatwerk.',
          popular: 'Meest gekozen',
          from: 'vanaf',
          moreInfo: 'Meer informatie',
          requestQuote: 'Offerte aanvragen',
          footerText: 'Niet zeker welk pakket past?',
          footerCta: 'Plan een gratis adviesgesprek',
        }
      : {
          eyebrow: 'Growth packages',
          title: 'Choose the package that fits your business',
          subtitle: 'From fast online to fully custom.',
          popular: 'Most popular',
          from: 'from',
          moreInfo: 'More info',
          requestQuote: 'Request quote',
          footerText: 'Not sure which package fits?',
          footerCta: 'Plan a free strategy call',
        };

  const bundlesCopy =
    language === 'nl'
      ? bundles
      : [
          {
            name: 'Starter',
            price: '€395',
            description:
              'Get online fast with a strong foundation. You supply the copy and images, we build a professional website within a proven structure.',
            features: [
              'Proven website structure',
              'Fits most industries',
              'Responsive for mobile and tablet',
              'Go live quickly',
            ],
          },
          {
            name: 'Growth',
            price: '€1150',
            description:
              'More influence on content, structure and look. We advise on design and layout so the website aligns with your business.',
            features: [
              'Personal advice',
              'Flexible page layout',
              'Design aligned to your business',
              'Basic SEO optimization',
            ],
            popular: true,
          },
          {
            name: 'Custom',
            price: '€2450',
            description: 'A fully unique website built around your business and goals.',
            features: [
              'Strategic intake',
              'Unique custom design',
              'Conversion-focused structure',
              'Scalable for growth',
            ],
          },
        ];

  return (
    <section className="section-padding relative overflow-hidden bg-slate-100">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-sky-200/40 blur-3xl" />
      </div>
      <motion.div
        className="container mx-auto container-padding relative"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="section-header mb-10" variants={fadeInUp}>
          <span className="text-primary text-sm font-semibold tracking-[0.14em] uppercase mb-2 block">
            {copy.eyebrow}
          </span>
          <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-900">
            {copy.title}
          </h2>
          <p className="text-slate-600 mt-3 max-w-xl mx-auto">{copy.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {bundlesCopy.map((bundle, index) => {
            const isPopular = Boolean(bundle.popular);
            return (
              <motion.div key={index} variants={fadeInUp}>
                <Card
                  className={`h-full min-h-[540px] relative overflow-visible rounded-[28px] transition-all duration-500 ${
                    isPopular
                      ? 'md:-translate-y-3 md:scale-[1.03] border-primary/35 ring-1 ring-primary/20 shadow-[0_24px_70px_rgba(37,99,235,0.18)] bg-gradient-to-b from-sky-50 to-white text-slate-900'
                      : 'bg-white border-slate-200 hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_22px_55px_rgba(15,23,42,0.10)] text-slate-900 shadow-[0_14px_38px_rgba(15,23,42,0.08)]'
                  }`}
                >
                  <div
                    className={`absolute inset-x-0 top-0 h-1 ${
                      isPopular
                        ? 'bg-gradient-to-r from-primary/75 via-primary to-primary/75'
                        : 'bg-gradient-to-r from-primary/20 via-primary/45 to-primary/20'
                    }`}
                  />
                  {isPopular && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                      <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                        <Star className="w-3 h-3" /> {copy.popular}
                      </span>
                    </div>
                  )}
                  <CardContent className="p-7 md:p-8 pt-16 relative h-full flex flex-col">
                    <div className="mb-5 text-center">
                      <h3 className="font-display text-[1.9rem] md:text-[2.15rem] font-extrabold text-slate-900 tracking-tight">
                        {bundle.name}
                      </h3>
                      <p className="mt-5 font-display text-4xl md:text-5xl font-extrabold text-primary leading-none">
                        {bundle.price}
                      </p>
                      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary/70">
                        {copy.from}
                      </p>
                    </div>

                    <p className="text-sm leading-relaxed mb-6 text-slate-600 text-center">
                      {bundle.description}
                    </p>

                    <div className="h-px mb-6 bg-slate-200" />

                    <div className="space-y-3.5 mb-7">
                      {bundle.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto grid gap-2">
                      <Button
                        asChild
                        variant="outline"
                        className="w-full h-11 rounded-xl border-primary/20 bg-primary/5 text-primary hover:bg-primary/10 hover:text-primary"
                      >
                        <Link to="/contact">{copy.moreInfo}</Link>
                      </Button>
                      <Button
                        asChild
                        className={`w-full h-11 rounded-xl ${
                          isPopular
                            ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                            : 'bg-primary/90 hover:bg-primary text-primary-foreground'
                        }`}
                      >
                        <Link to="/quote">{copy.requestQuote}</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div className="mt-8 text-center" variants={fadeInUp}>
          <p className="text-slate-600 text-sm md:text-base">
            {copy.footerText}{' '}
            <Link to="/contact" className="font-semibold text-primary hover:text-primary/80 transition-colors">
              {copy.footerCta}
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default BundlesSection;

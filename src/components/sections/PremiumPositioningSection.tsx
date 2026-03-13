import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation';
import { BadgeCheck, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ComparisonRow {
  feature: string;
  webmaat: string;
  market: string;
}

const PremiumPositioningSection = () => {
  const { language } = useLanguage();

  const comparisonRows: ComparisonRow[] =
    language === 'nl'
      ? [
          {
            feature: 'Design',
            webmaat: 'Uniek, merkgebonden',
            market: 'Concurrenten werken vaak semi-template; AI-sites blijven meestal generiek.',
          },
          {
            feature: 'SEO',
            webmaat: 'Geoptimaliseerd voor zoekmachines',
            market: 'Concurrenten bieden meestal basis SEO; AI-sites zijn vaak niet geoptimaliseerd.',
          },
          {
            feature: 'Veiligheid',
            webmaat: 'Updates, SSL, betrouwbare hosting',
            market: 'Pakket-afhankelijk en niet altijd proactief; AI-sites hebben vaak beperkte updates.',
          },
          {
            feature: 'Ondersteuning',
            webmaat: '24/7 support + doorontwikkeling',
            market: 'Concurrenten bieden vaak kantoortijden; AI-sites hebben meestal geen support.',
          },
          {
            feature: 'Conversie & funnel',
            webmaat: 'Funnel afgestemd op doelgroep',
            market: 'Vaak algemene funnel of standaard flow zonder maatwerk.',
          },
          {
            feature: 'Resultaten',
            webmaat: 'Meetbare groei & conversie',
            market: 'Resultaten wisselen vaker en zijn minder KPI-gestuurd.',
          },
        ]
      : [
          {
            feature: 'Design',
            webmaat: 'Unique and brand-focused',
            market: 'Competitors are often semi-template; AI sites usually look generic.',
          },
          {
            feature: 'SEO',
            webmaat: 'Optimized for search engines',
            market: 'Competitors usually offer basic SEO; AI sites are often not optimized.',
          },
          {
            feature: 'Security',
            webmaat: 'Updates, SSL, reliable hosting',
            market: 'Package-dependent and less proactive; AI sites often have limited updates.',
          },
          {
            feature: 'Support',
            webmaat: '24/7 support + optimization',
            market: 'Competitors are often business-hours only; AI sites usually provide no support.',
          },
          {
            feature: 'Conversion & funnel',
            webmaat: 'Funnel tailored to target audience',
            market: 'Typically a generic funnel or standard non-custom flow.',
          },
          {
            feature: 'Results',
            webmaat: 'Measurable growth & conversion',
            market: 'Outcomes are more mixed and less KPI-driven.',
          },
        ];

  const mobileWebmaatBullets =
    language === 'nl'
      ? [
          'Uniek, merkgebonden design',
          'SEO geoptimaliseerd',
          'Updates + SSL',
          '24/7 support',
          'Funnel op doelgroep',
          'Meetbare groei',
        ]
      : [
          'Brand-specific design',
          'SEO optimized',
          'Updates + SSL',
          '24/7 support',
          'Targeted funnel',
          'Measurable growth',
        ];

  const mobileMarketBullets =
    language === 'nl'
      ? [
          'Semi-template / generiek',
          'Basis of geen SEO',
          'Beperkte updates',
          'Kantoortijden',
          'Standaard flow',
          'Minder KPI-sturing',
        ]
      : [
          'Semi-template / generic',
          'Basic or no SEO',
          'Limited updates',
          'Office hours',
          'Standard flow',
          'Less KPI-driven',
        ];

  return (
    <section className="relative overflow-hidden py-10 md:py-12 bg-[#c8d0da]">
      <div className="glass-light absolute inset-0 pointer-events-none" />
      <div className="section-divider absolute top-0 left-0 right-0 z-[1]" />

      <motion.div
        className="container relative z-[2] mx-auto container-padding"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div className="max-w-3xl mx-auto text-center" variants={fadeInUp}>
          <h2 className="font-display text-2xl md:text-3xl !font-bold !text-primary mb-2">
            {language === 'nl' ? 'waarom maatwerk beter presteert' : 'Why Tailored Websites Perform Better'}
          </h2>
          <p className="text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {language === 'nl' ? (
              <>
                <span className="sm:hidden">Bekijk de verschillen tussen ons maatwerk en concurrenten.</span>
                <span className="hidden sm:inline">
                  Vergelijk zelf de verschillen tussen onze maatwerk websites en standaard AI-sites/concurrent-oplossingen.
                </span>
              </>
            ) : (
              <>
                <span className="sm:hidden">Compare our tailored sites with competitors.</span>
                <span className="hidden sm:inline">
                  Compare the difference between our tailored websites and standard AI/competitor solutions.
                </span>
              </>
            )}
          </p>
        </motion.div>

        <motion.div className="mt-8 rounded-2xl border border-border/70 bg-card/65 p-3 md:p-5" variants={fadeInUp}>
          <div className="grid grid-cols-2 gap-2 mb-3 md:hidden">
            <p className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary/80 bg-primary px-3 py-2.5 text-xs font-extrabold tracking-[0.08em] text-white text-center shadow-[0_14px_26px_hsl(var(--primary)/0.4)]">
              <BadgeCheck className="w-4 h-4 text-white" />
              Web-Maat
            </p>
            <p className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-400/90 bg-slate-200 px-3 py-2.5 text-xs font-extrabold tracking-[0.08em] text-slate-900 text-center shadow-[0_12px_22px_rgba(15,23,42,0.16)]">
              <Building2 className="w-4 h-4 text-slate-700" />
              {language === 'nl' ? 'Concurrenten' : 'Competitors'}
            </p>
          </div>

          <div className="hidden md:grid md:grid-cols-[0.72fr_1fr_1fr] md:gap-3 mb-4">
            <div className="inline-flex items-center px-3 text-sm font-bold text-slate-700">
              {language === 'nl' ? 'Aspect' : 'Aspect'}
            </div>
            <p className="h-12 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary/80 bg-primary px-3 text-base font-extrabold tracking-[0.08em] text-white text-center shadow-[0_14px_26px_hsl(var(--primary)/0.4)]">
              <BadgeCheck className="w-4 h-4 text-white" />
              Web-Maat
            </p>
            <p className="h-12 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-slate-400/90 bg-slate-200 px-3 text-base font-extrabold tracking-[0.08em] text-slate-900 text-center shadow-[0_12px_22px_rgba(15,23,42,0.16)]">
              <Building2 className="w-4 h-4 text-slate-700" />
              {language === 'nl' ? 'Concurrenten' : 'Competitors'}
            </p>
          </div>

          <div className="md:hidden">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-primary/20 bg-white/85 p-3 shadow-[0_10px_26px_rgba(15,23,42,0.08)]">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
                  Web-Maat
                </div>
                <ul className="space-y-2 text-[11px] text-slate-800">
                  {mobileWebmaatBullets.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/85 p-3 shadow-[0_10px_26px_rgba(15,23,42,0.08)]">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-slate-300/60 bg-slate-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-700">
                  {language === 'nl' ? 'Concurrenten' : 'Competitors'}
                </div>
                <ul className="space-y-2 text-[11px] text-slate-800">
                  {mobileMarketBullets.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-slate-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="hidden md:block">
            {comparisonRows.map((row) => (
              <div
                key={row.feature}
                className="rounded-lg md:rounded-none md:grid md:grid-cols-[0.72fr_1.14fr_1.14fr] md:gap-3 md:border-t md:border-border/60 bg-transparent p-2 md:p-0"
              >
                <div className="px-2.5 py-2 md:px-3 md:py-3">
                  <p className="text-[11px] md:text-sm font-extrabold text-slate-900 leading-tight tracking-[0.01em]">
                    {row.feature}:
                  </p>
                </div>
                <div className="min-h-[66px] flex items-center px-2.5 py-2 md:px-3 md:py-3 rounded-md md:rounded-none bg-white/85 md:bg-white/75 border border-slate-300/80 md:border-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_8px_18px_rgba(15,23,42,0.08)]">
                  <p className="text-[11px] md:text-sm text-slate-900 leading-relaxed">{row.webmaat}</p>
                </div>
                <div className="min-h-[66px] flex items-center px-2.5 py-2 md:px-3 md:py-3 rounded-md md:rounded-none bg-white/85 md:bg-white/75 border border-slate-300/80 md:border-0 mt-2 md:mt-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.72),0_8px_18px_rgba(15,23,42,0.08)]">
                  <p className="text-[11px] md:text-sm text-slate-900 leading-relaxed">{row.market}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="mt-7 text-center" variants={fadeInUp}>
          <Button asChild className="h-9 px-5 text-xs sm:h-12 sm:px-8 sm:text-base">
            <Link to="/contact">
              {language === 'nl' ? (
                <>
                  <span className="sm:hidden">Plan gesprek</span>
                  <span className="hidden sm:inline">Plan gratis adviesgesprek</span>
                </>
              ) : (
                <>
                  <span className="sm:hidden">Plan a call</span>
                  <span className="hidden sm:inline">Plan a free strategy call</span>
                </>
              )}
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PremiumPositioningSection;

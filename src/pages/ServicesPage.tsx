import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTASection from '@/components/sections/CTASection';
import BundlesSection from '@/components/sections/BundlesSection';
import { getLocalizedService, services, type ServiceItem } from '@/data/services';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation';
import { useLanguage } from '@/contexts/LanguageContext';


interface ServiceStat {
  value: string;
  label: string;
}

const serviceStatsBySlug: Record<'nl' | 'en', Record<string, ServiceStat[]>> = {
  nl: {
    webdesign: [
      { value: '2-4w', label: 'Gem. oplevering' },
      { value: '100%', label: 'Responsive' },
      { value: '5+', label: 'Kernpagina\'s' },
    ],
    webshop: [
      { value: '6+', label: 'Betaalmethodes' },
      { value: '99.9%', label: 'Uptime doel' },
      { value: '24/7', label: 'Bestelbaar' },
    ],
    'ai-implementatie': [
      { value: '24/7', label: 'Beschikbaarheid' },
      { value: '<1s', label: 'Gem. reactietijd' },
      { value: '70%', label: 'Automatisering' },
    ],
    'website-onderhoud': [
      { value: '24/7', label: 'Monitoring' },
      { value: 'Dagelijks', label: 'Back-ups' },
      { value: '<24u', label: 'Supportreactie' },
    ],
    seo: [
      { value: '20+', label: 'Keywords focus' },
      { value: 'Maandelijks', label: 'Rapportage' },
      { value: 'Lokaal+', label: 'SEO scope' },
    ],
  },
  en: {
    webdesign: [
      { value: '2-4w', label: 'Avg. delivery' },
      { value: '100%', label: 'Responsive' },
      { value: '5+', label: 'Core pages' },
    ],
    webshop: [
      { value: '6+', label: 'Payment methods' },
      { value: '99.9%', label: 'Uptime target' },
      { value: '24/7', label: 'Orderable' },
    ],
    'ai-implementatie': [
      { value: '24/7', label: 'Availability' },
      { value: '<1s', label: 'Avg. response' },
      { value: '70%', label: 'Automation' },
    ],
    'website-onderhoud': [
      { value: '24/7', label: 'Monitoring' },
      { value: 'Daily', label: 'Backups' },
      { value: '<24h', label: 'Support response' },
    ],
    seo: [
      { value: '20+', label: 'Keyword focus' },
      { value: 'Monthly', label: 'Reporting' },
      { value: 'Local+', label: 'SEO scope' },
    ],
  },
};

const defaultServiceStats: Record<'nl' | 'en', ServiceStat[]> = {
  nl: [
    { value: 'Maatwerk', label: 'Aanpak' },
    { value: 'Data', label: 'Optimalisatie' },
    { value: 'Support', label: 'Begeleiding' },
  ],
  en: [
    { value: 'Custom', label: 'Approach' },
    { value: 'Data', label: 'Optimization' },
    { value: 'Support', label: 'Guidance' },
  ],
};

const shortTitleBySlug: Record<'nl' | 'en', Record<string, string>> = {
  nl: {
    webdesign: 'Webdesign',
    webshop: 'Webshops',
    'ai-implementatie': 'AI Implementatie',
    'website-onderhoud': 'Onderhoud',
    seo: 'SEO',
  },
  en: {
    webdesign: 'Web Design',
    webshop: 'Webshops',
    'ai-implementatie': 'AI Implementation',
    'website-onderhoud': 'Maintenance',
    seo: 'SEO',
  },
};

const overviewItemsByLanguage = {
  nl: [
    {
      slug: 'webdesign',
      title: 'Webdesign',
      shortTitle: 'Webdesign',
      description: 'Professionele websites die vertrouwen opbouwen en klaar zijn voor aanvragen.',
      shortDescription: 'Websites die vertrouwen wekken.',
    },
    {
      slug: 'webshop',
      title: 'Webshops',
      shortTitle: 'Webshops',
      description: 'Slimme webshops met focus op snelheid, overzicht en meer online verkopen.',
      shortDescription: 'Snelle webshops die verkopen.',
    },
    {
      slug: 'ai-implementatie',
      title: 'AI automatisering',
      shortTitle: 'AI automatisering',
      description: 'Automatiseer support, opvolging en processen met slimme AI-oplossingen.',
      shortDescription: 'AI voor support en opvolging.',
    },
  ],
  en: [
    {
      slug: 'webdesign',
      title: 'Web Design',
      shortTitle: 'Web',
      description: 'Professional websites that build trust and are ready for new inquiries.',
      shortDescription: 'Websites that build trust.',
    },
    {
      slug: 'webshop',
      title: 'Webshops',
      shortTitle: 'Shop',
      description: 'Smart webshops focused on speed, clarity and more online sales.',
      shortDescription: 'Fast webshops that sell.',
    },
    {
      slug: 'ai-implementatie',
      title: 'AI automation',
      shortTitle: 'AI automation',
      description: 'Automate support, follow-ups and processes with smart AI solutions.',
      shortDescription: 'AI for support and follow-up.',
    },
  ],
} as const;

const ServiceSectionItem = ({
  service,
  index,
  isFirst = false,
  language,
}: {
  service: ServiceItem;
  index: number;
  isFirst?: boolean;
  language: 'nl' | 'en';
}) => {
  const Icon = service.icon;
  const serviceCopy = getLocalizedService(service, language);
  const serviceStats = serviceStatsBySlug[language][service.slug] ?? defaultServiceStats[language];
  const shortTitle = shortTitleBySlug[language][service.slug] ?? serviceCopy.title;
  const highlightFeatures = serviceCopy.features.slice(0, 3);
  const mobileHighlightFeatures =
    language === 'nl'
      ? ['Uniek maatwerk design', 'Responsive voor alle apparaten', 'Conversie-geoptimaliseerd']
      : ['Custom design', 'Responsive on all devices', 'Conversion-optimized'];
  const extraFeatures = serviceCopy.features.slice(3, 6);
  const mobileExtraFeatures = extraFeatures.slice(0, 3);
  const mobileDetails = serviceCopy.details.slice(0, 3);
  const isReversed = index % 2 === 1;

  return (
    <article className={isFirst ? 'pt-0 pb-8 md:pb-10' : 'py-8 md:py-10'}>
      <div className="-mt-1 md:-mt-2 mb-6 md:mb-8 text-center">
        <h3 className="font-display text-2xl md:text-4xl font-extrabold text-primary leading-tight tracking-tight drop-shadow-[0_8px_20px_rgba(30,64,175,0.28)]">
          {shortTitle}
        </h3>
      </div>
      <div className="relative">
        <div className="pointer-events-none absolute -left-14 top-10 h-44 w-44 rounded-full bg-primary/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 -bottom-12 h-48 w-48 rounded-full bg-sky-300/15 blur-3xl" />
        <div className="relative overflow-hidden rounded-[32px] border border-slate-200/70 bg-white/95 p-5 md:p-8 lg:p-10 shadow-[0_28px_70px_rgba(15,23,42,0.2)] transition-transform duration-500 hover:-translate-y-1">
          <div className="grid lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)] gap-8 lg:gap-12 items-center">
            <figure className={`relative ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
              <div className="absolute -inset-2 rounded-[32px] bg-gradient-to-br from-primary/25 via-slate-100/40 to-white/5 blur-2xl opacity-80" />
              <div className="relative overflow-hidden rounded-[28px] border border-white/70 shadow-[0_22px_55px_rgba(15,23,42,0.24)]">
                <img
                  src={service.image}
                  alt={serviceCopy.title}
                  className="w-full h-[280px] sm:h-[340px] md:h-[420px] lg:h-[470px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-slate-900/20 to-transparent" />
              </div>
              <div className="absolute -left-3 -top-3 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="mt-4 flex flex-wrap gap-2 lg:absolute lg:bottom-4 lg:left-4 lg:right-4 lg:mt-0">
                {serviceStats.map((stat) => (
                  <div
                    key={`${service.slug}-${stat.label}`}
                    className="flex-1 min-w-[110px] rounded-full border border-white/70 bg-white/85 px-4 py-2 shadow-sm backdrop-blur"
                  >
                    <p className="text-sm md:text-base font-semibold text-slate-900 leading-none">{stat.value}</p>
                    <p className="text-[11px] md:text-xs text-slate-600 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </figure>

            <div className={`flex flex-col lg:max-w-[480px] ${isReversed ? 'lg:order-1' : 'lg:order-2 lg:ml-auto'}`}>
              <p className="text-lg md:text-xl font-semibold text-slate-900 mb-2">{serviceCopy.subtitle}</p>
              <div className="h-px w-16 bg-gradient-to-r from-primary via-primary/40 to-transparent mb-4" />

              <div className="flex flex-wrap gap-2 mb-4 md:hidden">
                {mobileHighlightFeatures.map((feature) => (
                  <span
                    key={`${service.slug}-${feature}-highlight-mobile`}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-slate-50 px-3 py-2 text-[11px] font-semibold text-slate-900 shadow-sm"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
                    {feature}
                  </span>
                ))}
              </div>
              <div className="hidden md:flex flex-wrap gap-2 mb-5">
                {highlightFeatures.map((feature) => (
                  <span
                    key={`${service.slug}-${feature}-highlight`}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm"
                  >
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    {feature}
                  </span>
                ))}
              </div>

              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-5">
                {serviceCopy.description}
              </p>

              <div className="rounded-[26px] border border-slate-200/80 bg-gradient-to-br from-white via-slate-50 to-blue-50/40 p-4 md:p-5">
                <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                  <div>
                    <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600 shadow-sm">
                      {language === 'nl' ? 'Wat u krijgt' : 'What you get'}
                    </span>
                    <ul className="mt-3 space-y-2 text-[11px] text-slate-700 sm:hidden">
                      {mobileExtraFeatures.map((feature) => (
                        <li key={`${service.slug}-${feature}-mobile`} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-3 hidden sm:block space-y-2.5 text-sm text-slate-700">
                      {extraFeatures.map((feature) => (
                        <li key={`${service.slug}-${feature}`} className="flex items-start gap-2.5">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:border-l md:border-slate-200/70 md:pl-6">
                    <span className="inline-flex items-center rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-600 shadow-sm">
                      {language === 'nl' ? 'Aanpak & focus' : 'Approach & focus'}
                    </span>
                    <ul className="mt-3 space-y-2 text-[11px] text-slate-700 sm:hidden">
                      {mobileDetails.map((detail) => (
                        <li key={`${service.slug}-${detail}-mobile`} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-3 hidden sm:block space-y-2.5 text-sm text-slate-700">
                      {serviceCopy.details.map((detail) => (
                        <li key={`${service.slug}-${detail}`} className="flex items-start gap-2.5">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const ServicesPage = () => {
  const { language } = useLanguage();
  const overviewItems = overviewItemsByLanguage[language];

  return (
    <div className="services-dark min-h-screen bg-slate-900">
      <Header />
      <main className="pt-16 bg-slate-900">
        {/* Hero */}
        <section className="py-12 relative isolate overflow-hidden bg-slate-900">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1920&q=80"
              alt="Modern office"
              className="w-full h-full object-cover object-center grayscale-[4%] brightness-[0.8] saturate-[1.08] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-slate-900/20" style={{ backgroundColor: 'rgba(15, 23, 42, 0.2)' }} />
            <div
              className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-slate-900/58 to-slate-900/42"
              style={{
                background:
                  'linear-gradient(90deg, rgba(2,6,23,0.76) 0%, rgba(15,23,42,0.62) 55%, rgba(15,23,42,0.44) 100%)',
              }}
            />
          </div>
          <div className="container mx-auto container-padding relative">
            <div className="max-w-3xl">
              <h1 className="font-display text-3xl md:text-5xl font-extrabold text-blue-50 mb-3 tracking-tight drop-shadow-[0_10px_28px_rgba(2,6,23,0.52)]">
                {language === 'nl' ? 'Onze diensten' : 'Our services'}
              </h1>
              <p className="text-base md:text-xl text-white max-w-2xl drop-shadow-[0_6px_18px_rgba(2,6,23,0.42)]">
                {language === 'nl'
                  ? 'Webdesign, webshop, AI, onderhoud en SEO.'
                  : 'Web design, e-commerce, AI, maintenance and SEO.'}
              </p>
            </div>
          </div>
        </section>
        <div className="section-divider" />

        <section className="bg-slate-100 py-10 md:py-12">
          <motion.div
            className="container mx-auto container-padding"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="section-header mb-8 md:mb-10" variants={fadeInUp}>
              <span className="text-primary text-sm font-semibold tracking-[0.14em] uppercase mb-2 block">
                {language === 'nl' ? 'Overzicht' : 'Overview'}
              </span>
              <h2 className="font-display text-2xl md:text-4xl font-bold text-slate-900">
                {language === 'nl' ? 'Wat wij voor bedrijven bouwen' : 'What we build for businesses'}
              </h2>
              <p className="text-slate-600 mt-3 max-w-3xl mx-auto">
                {language === 'nl' ? (
                  <>
                    <span className="sm:hidden">Van websites tot automatisering, gericht op groei.</span>
                    <span className="hidden sm:inline">
                      Van snelle websites tot slimme automatisering. Alles gebouwd om meer vertrouwen, aanvragen en online groei te realiseren.
                    </span>
                  </>
                ) : (
                  <>
                    <span className="sm:hidden">From websites to automation, built for growth.</span>
                    <span className="hidden sm:inline">
                      From fast websites to smart automation. Built to drive trust, inquiries and online growth.
                    </span>
                  </>
                )}
              </p>
            </motion.div>

            <div className="grid grid-cols-3 gap-2 md:gap-4 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-slate-200/70 rounded-[22px] md:rounded-[28px] border border-slate-200/70 bg-white/70 p-2 md:p-3 shadow-[0_14px_36px_rgba(15,23,42,0.08)]">
              {overviewItems.map((item) => {
                const service = services.find((entry) => entry.slug === item.slug);
                if (!service) return null;
                const OverviewIcon = service.icon;

                return (
                  <motion.div key={item.slug} variants={fadeInUp}>
                    <div className="h-full rounded-[18px] md:rounded-[22px] bg-transparent p-3 md:p-6 transition-all duration-300 hover:bg-white/80">
                      <div className="mb-3 flex h-9 w-9 md:h-12 md:w-12 items-center justify-center rounded-xl md:rounded-2xl bg-primary shadow-lg">
                        <OverviewIcon className="h-4 w-4 md:h-6 md:w-6 text-white" />
                      </div>
                      <h3
                        className={`font-display ${item.slug === 'ai-implementatie' ? 'text-[11px]' : 'text-sm'} md:text-2xl font-bold text-slate-900 leading-tight`}
                      >
                        {'shortTitle' in item ? (
                          <>
                            <span className="sm:hidden">{item.shortTitle}</span>
                            <span className="hidden sm:inline">{item.title}</span>
                          </>
                        ) : (
                          item.title
                        )}
                      </h3>
                      <div className="mt-2 md:mt-3 h-px w-8 md:w-14 bg-gradient-to-r from-primary via-primary/40 to-transparent" />
                      <p className="mt-2 md:mt-4 text-[10px] md:text-sm leading-snug md:leading-relaxed text-slate-600 line-clamp-3">
                        {'shortDescription' in item ? (
                          <>
                            <span className="sm:hidden">{item.shortDescription}</span>
                            <span className="hidden sm:inline">{item.description}</span>
                          </>
                        ) : (
                          item.description
                        )}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>
        <div className="section-divider" />

        {/* Services */}
        <section className="bg-slate-900 pt-4 pb-16 md:pt-5 md:pb-20 lg:pt-6 lg:pb-24">
          <motion.div className="container mx-auto container-padding" variants={staggerContainer} initial="hidden" animate="visible">
            <div>
              {services.map((service, index) => (
                <motion.div
                  key={service.slug}
                  initial={{ opacity: 0, y: 24, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.06 }}
                >
                  <ServiceSectionItem service={service} index={index} isFirst={index === 0} language={language} />
                  {index < services.length - 1 && (
                    <div className="pt-4 md:pt-6 opacity-95">
                      <div className="section-divider-strong" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        <div className="section-divider" />

        <BundlesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;

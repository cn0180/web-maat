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
      description: 'Professionele websites die vertrouwen opbouwen en klaar zijn voor aanvragen.',
    },
    {
      slug: 'webshop',
      title: 'Webshops',
      description: 'Slimme webshops met focus op snelheid, overzicht en meer online verkopen.',
    },
    {
      slug: 'ai-implementatie',
      title: 'AI automatisering',
      description: 'Automatiseer support, opvolging en processen met slimme AI-oplossingen.',
    },
  ],
  en: [
    {
      slug: 'webdesign',
      title: 'Web Design',
      description: 'Professional websites that build trust and are ready for new inquiries.',
    },
    {
      slug: 'webshop',
      title: 'Webshops',
      description: 'Smart webshops focused on speed, clarity and more online sales.',
    },
    {
      slug: 'ai-implementatie',
      title: 'AI automation',
      description: 'Automate support, follow-ups and processes with smart AI solutions.',
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
  const extraFeatures = serviceCopy.features.slice(3, 6);
  const isReversed = index % 2 === 1;

  return (
    <article className={isFirst ? 'pt-0 pb-8 md:pb-10' : 'py-8 md:py-10'}>
      <div className="-mt-1 md:-mt-2 mb-6 md:mb-8 text-center">
        <h3 className="font-display text-2xl md:text-4xl font-extrabold text-primary leading-tight tracking-tight drop-shadow-[0_8px_20px_rgba(30,64,175,0.28)]">
          {shortTitle}
        </h3>
      </div>
      <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.12)] md:p-6 lg:p-7">
        <div className="grid lg:grid-cols-[minmax(0,1.14fr)_minmax(340px,0.86fr)] gap-8 lg:gap-14 items-center">
          <figure className={`relative ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}>
          <img
            src={service.image}
            alt={serviceCopy.title}
            className="w-full h-[280px] sm:h-[340px] md:h-[420px] lg:h-[470px] object-cover rounded-[24px] shadow-[0_22px_55px_rgba(15,23,42,0.22)]"
          />
          <div className="absolute inset-0 rounded-[24px] bg-gradient-to-t from-slate-950/35 via-slate-900/8 to-transparent" />
          <div className="absolute left-5 top-5 w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </figure>

          <div className={`flex flex-col lg:max-w-[470px] ${isReversed ? 'lg:order-1' : 'lg:order-2 lg:ml-auto'}`}>
          <p className="text-base md:text-lg text-slate-800 mb-4">{serviceCopy.subtitle}</p>
          <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
            {serviceStats.map((stat) => (
              <div key={`${service.slug}-${stat.label}`} className="rounded-2xl border border-slate-200 bg-white px-3 py-3 md:px-3.5 md:py-3.5 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
                <p className="text-sm md:text-base font-bold text-slate-900 leading-none">{stat.value}</p>
                <p className="text-[11px] md:text-xs text-slate-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="grid sm:grid-cols-3 gap-3 mb-5">
            {highlightFeatures.map((feature) => (
              <div
                key={`${service.slug}-${feature}-highlight`}
                className="rounded-2xl border border-slate-200 bg-white px-4 py-4 shadow-[0_10px_25px_rgba(15,23,42,0.06)]"
              >
                <CheckCircle2 className="h-5 w-5 text-primary mb-3" />
                <p className="text-sm font-medium text-slate-900 leading-snug">{feature}</p>
              </div>
            ))}
          </div>
          <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
            {serviceCopy.description}
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold text-slate-900 mb-2">
                {language === 'nl' ? 'Wat u krijgt' : 'What you get'}
              </p>
              <ul className="space-y-2.5 text-sm text-slate-700">
                {extraFeatures.map((feature) => (
                  <li key={`${service.slug}-${feature}`} className="flex items-start gap-2.5">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_10px_25px_rgba(15,23,42,0.06)]">
              <p className="text-sm font-semibold text-slate-900 mb-2">
                {language === 'nl' ? 'Aanpak & focus' : 'Approach & focus'}
              </p>
              <ul className="space-y-2.5 text-sm text-slate-700">
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
                {language === 'nl'
                  ? 'Van snelle websites tot slimme automatisering. Alles gebouwd om meer vertrouwen, aanvragen en online groei te realiseren.'
                  : 'From fast websites to smart automation. Built to drive trust, inquiries and online growth.'}
              </p>
            </motion.div>

            <div className="grid gap-4 lg:grid-cols-3 lg:gap-0 lg:divide-x lg:divide-slate-200/70 rounded-[28px] border border-slate-200 bg-white/80 p-2 md:p-3 shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
              {overviewItems.map((item) => {
                const service = services.find((entry) => entry.slug === item.slug);
                if (!service) return null;
                const OverviewIcon = service.icon;

                return (
                  <motion.div key={item.slug} variants={fadeInUp}>
                    <div className="h-full rounded-[22px] bg-transparent p-5 md:p-6 transition-all duration-300 hover:bg-slate-50">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary shadow-lg">
                        <OverviewIcon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-display text-2xl font-bold text-slate-900">{item.title}</h3>
                      <div className="mt-3 h-px w-14 bg-gradient-to-r from-primary via-primary/40 to-transparent" />
                      <p className="mt-4 text-sm leading-relaxed text-slate-600">{item.description}</p>
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

import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTASection from '@/components/sections/CTASection';
import { services, bundles, type ServiceItem } from '@/data/services';
import { Check, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation';


interface ServiceStat {
  value: string;
  label: string;
}

const serviceStatsBySlug: Record<string, ServiceStat[]> = {
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
};

const defaultServiceStats: ServiceStat[] = [
  { value: 'Maatwerk', label: 'Aanpak' },
  { value: 'Data', label: 'Optimalisatie' },
  { value: 'Support', label: 'Begeleiding' },
];

const shortTitleBySlug: Record<string, string> = {
  webdesign: 'Webdesign',
  webshop: 'Webshops',
  'ai-implementatie': 'AI Implementatie',
  'website-onderhoud': 'Onderhoud',
  seo: 'SEO',
};

const ServiceSectionItem = ({ service }: { service: ServiceItem }) => {
  const Icon = service.icon;
  const serviceStats = serviceStatsBySlug[service.slug] ?? defaultServiceStats;
  const shortTitle = shortTitleBySlug[service.slug] ?? service.title;

  return (
    <article className="py-8 md:py-10">
      <div className="-mt-1 md:-mt-2 mb-6 md:mb-8 text-center">
        <h3 className="font-display text-2xl md:text-4xl font-extrabold text-primary leading-tight tracking-tight drop-shadow-[0_8px_20px_rgba(30,64,175,0.28)]">
          {shortTitle}
        </h3>
      </div>
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <figure className="relative lg:order-1">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-[240px] sm:h-[300px] md:h-[360px] object-cover rounded-xl shadow-md"
          />
          <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-slate-950/35 via-slate-900/8 to-transparent" />
          <div className="absolute left-4 top-4 w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
            <Icon className="w-5 h-5 text-white" />
          </div>
        </figure>

        <div className="flex flex-col lg:order-2">
          <p className="text-base md:text-lg text-slate-200 mb-4">{service.subtitle}</p>
          <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4">
            {serviceStats.map((stat) => (
              <div key={`${service.slug}-${stat.label}`} className="rounded-lg border border-slate-700/70 bg-slate-800/60 px-3 py-2 md:px-3.5 md:py-2.5">
                <p className="text-sm md:text-base font-bold text-white leading-none">{stat.value}</p>
                <p className="text-[11px] md:text-xs text-slate-300 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="text-sm md:text-base text-slate-300 leading-relaxed mb-4">
            {service.description}
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-slate-700/70 bg-slate-800/45 p-4">
              <p className="text-sm font-semibold text-white mb-2">Wat u krijgt</p>
              <ul className="space-y-2 list-disc pl-5 text-sm text-slate-300">
                {service.features.slice(0, 4).map((feature) => (
                  <li key={`${service.slug}-${feature}`}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-slate-700/70 bg-slate-800/45 p-4">
              <p className="text-sm font-semibold text-white mb-2">Aanpak & focus</p>
              <ul className="space-y-2 list-disc pl-5 text-sm text-slate-300">
                {service.details.map((detail) => (
                  <li key={`${service.slug}-${detail}`}>{detail}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

const ServicesPage = () => {
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
              className="absolute inset-0 bg-gradient-to-r from-slate-950/35 via-slate-900/24 to-slate-900/12"
              style={{
                background:
                  'linear-gradient(90deg, rgba(2,6,23,0.65) 0%, rgba(15,23,42,0.55) 55%, rgba(15,23,42,0.40) 100%)',
              }}
            />
          </div>
          <div className="container mx-auto container-padding relative">
            <div className="max-w-2xl">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">
                Onze diensten
              </h1>
              <p className="text-slate-200">Webdesign, webshop, AI, onderhoud en SEO.</p>
            </div>
          </div>
        </section>
        <div className="section-divider" />

        {/* Services */}
		
        <section className="section-padding bg-slate-900">
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
                  <ServiceSectionItem service={service} />
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

        {/* Bundles / Pricing */}
        <section className="section-padding relative overflow-hidden bg-slate-900">
          <motion.div className="container mx-auto container-padding relative" variants={staggerContainer} initial="hidden" animate="visible">
            <motion.div className="section-header mb-10" variants={fadeInUp}>
              <span className="text-primary text-sm font-semibold tracking-[0.14em] uppercase mb-2 block">Groeipakketten</span>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white">Kies het pakket dat klanten oplevert</h2>
              <p className="text-slate-200 mt-3 max-w-xl mx-auto">Complete uitvoering voor meer leads en omzet, zonder losse onderdelen.</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {bundles.map((bundle, index) => {
                const isPopular = Boolean(bundle.popular);
                return (
                  <motion.div key={index} variants={fadeInUp}>
                    <Card
                      className={`h-full min-h-[430px] relative overflow-visible rounded-2xl transition-all duration-500 ${
                        isPopular
                          ? 'border-primary/45 ring-1 ring-primary/25 shadow-xl bg-white text-slate-900'
                          : 'bg-white border-border/70 hover:border-primary/35 hover:shadow-xl text-slate-900'
                      }`}
                    >
                      <div className={`absolute inset-x-0 top-0 h-1 ${isPopular ? 'bg-gradient-to-r from-primary/70 via-primary to-primary/70' : 'bg-gradient-to-r from-primary/45 via-primary/75 to-primary/45'}`} />
                      {isPopular && (
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
                          <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
                            <Star className="w-3 h-3" /> Populair
                          </span>
                        </div>
                      )}
                      <CardContent className="p-6 pt-16 relative h-full flex flex-col">
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-display text-xl font-bold text-slate-900">
                            {bundle.name}
                          </h3>
                          <span className="text-[11px] rounded-full px-2.5 py-1 bg-primary/10 text-primary font-semibold">
                            {index + 1}.0
                          </span>
                        </div>

                        <p className="text-sm mb-4 text-slate-600">
                          {bundle.description}
                        </p>

                        <div className="h-px mb-4 bg-border" />

                        <div className="space-y-2.5 mb-6">
                          {bundle.features.slice(0, 5).map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                              <span className="w-5 h-5 rounded-full inline-flex items-center justify-center bg-primary/12">
                                <Check className="w-3.5 h-3.5 text-primary" />
                              </span>
                              {feature}
                            </div>
                          ))}
                        </div>

                        <Button
                          asChild
                          className={`w-full mt-auto h-11 rounded-xl ${
                            isPopular
                              ? 'bg-primary hover:bg-primary/90 text-primary-foreground'
                              : 'bg-primary/90 hover:bg-primary text-primary-foreground'
                          }`}
                        >
                          <Link to="/quote">Vraag Offerte Aan</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default ServicesPage;

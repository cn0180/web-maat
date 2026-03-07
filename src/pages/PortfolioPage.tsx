import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTASection from '@/components/sections/CTASection';
import { useLanguage } from '@/contexts/LanguageContext';
import { featuredCaseStudyIds, projects } from '@/data/projects';
import { ArrowUpRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, useScrollAnimation } from '@/hooks/useScrollAnimation';

const CountUpValue = ({ end, suffix, start }: { end: number; suffix: string; start: boolean }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let frame = 0;
    let startTime: number | null = null;
    const duration = 1600;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setValue(Math.floor(end * progress));

      if (progress < 1) {
        frame = requestAnimationFrame(step);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [end, start]);

  return (
    <>
      {value}
      {suffix}
    </>
  );
};

const PortfolioPage = () => {
  const { t, language } = useLanguage();
  const { ref: statsRef, controls: statsControls, isInView: statsInView } = useScrollAnimation(0.2);
  const caseStudyProjects = featuredCaseStudyIds
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is (typeof projects)[number] => Boolean(project));
  const companyStats = [
    {
      value: 150,
      suffix: '+',
      label: language === 'nl' ? 'Projecten opgeleverd' : 'Projects delivered',
    },
    {
      value: 120,
      suffix: '+',
      label: language === 'nl' ? 'Websites live' : 'Websites live',
    },
    {
      value: 45,
      suffix: '+',
      label: language === 'nl' ? 'Webshops gebouwd' : 'Webshops built',
    },
    {
      value: 64,
      suffix: '+',
      label: language === 'nl' ? 'Onderhoudspakketten' : 'Maintenance plans',
    },
    {
      value: 70,
      suffix: '+',
      label: language === 'nl' ? 'SEO-trajecten' : 'SEO trajectories',
    },
    {
      value: 25,
      suffix: '+',
      label: language === 'nl' ? 'AI-implementaties' : 'AI implementations',
    },
    {
      value: 98,
      suffix: '%',
      label: language === 'nl' ? 'Klanttevredenheid' : 'Client satisfaction',
    },
    {
      value: 24,
      suffix: 'u',
      label: language === 'nl' ? 'Gem. responstijd' : 'Avg. response time',
    },
  ];

  return (
    <div className="portfolio-dark min-h-screen bg-slate-900">
      <Header />
      <main className="pt-16 bg-slate-900">
        {/* Hero with Image */}
        <section className="py-12 relative isolate overflow-hidden bg-slate-900">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80" 
              alt="Portfolio"
              className="w-full h-full object-cover object-center grayscale-[4%] brightness-[0.8] saturate-[1.08] contrast-[1.05]"
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
          <div className="container mx-auto container-padding relative">
            <div className="max-w-2xl">
              <h1 className="font-sans text-2xl md:text-3xl font-bold text-white mb-3">{t.pages.portfolio.hero}</h1>
              <p className="text-slate-200">{t.pages.portfolio.heroSubtitle}</p>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="section-padding bg-slate-900">
          <motion.div 
            className="container mx-auto container-padding"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Case Studies */}
            <motion.div className="mb-8 text-center" variants={fadeInUp}>
              <h2 className="section-title text-white">
                {language === 'nl' ? 'Door ons gemaakte websites met resultaat' : 'Websites we built with measurable results'}
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                {language === 'nl'
                  ? 'Concrete cijfers per project.'
                  : 'Concrete metrics per project.'}
              </p>
            </motion.div>

            <motion.div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5 mb-12" variants={fadeInUp}>
              {caseStudyProjects.map((project) => (
                <Link 
                  key={project.id} 
                  to={`/portfolio/${project.id}`} 
                  className="group block"
                >
                  <div className="overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl h-full rounded-xl">
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <img 
                        src={project.screenshot || project.image}
                        alt={`${project.title} screenshot`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                        onError={(event) => {
                          event.currentTarget.src = project.image;
                        }}
                      />
                      <div className="absolute top-4 left-4 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground backdrop-blur-sm">
                        {language === 'nl' ? 'Live case' : 'Live case'}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                        <span className="flex items-center gap-2 text-white font-medium">
                          {t.portfolio.viewProject}
                          <ArrowUpRight className="w-5 h-5" />
                        </span>
                      </div>
                    </div>
                    <div className="p-4 md:p-5">
                      <span className="text-primary text-xs md:text-sm font-semibold">{project.category[language]}</span>
                      <h3 className="font-sans text-base md:text-lg font-bold text-foreground mt-1 mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-xs md:text-sm mb-3 line-clamp-2">{project.description[language]}</p>
                      <div className="grid grid-cols-3 gap-2">
                        {project.kpis?.slice(0, 3).map((kpi) => (
                          <div key={`${project.id}-${kpi.value}`} className="rounded-lg bg-primary/5 border border-primary/10 px-2 py-2 text-center">
                            <p className="font-display text-sm md:text-base font-bold text-primary leading-tight">{kpi.value}</p>
                            <p className="text-[10px] md:text-[11px] text-muted-foreground leading-tight">{kpi.label[language]}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </motion.div>

            <div className="section-divider mb-10" />

            <motion.div
              ref={statsRef}
              className="mb-12"
              variants={staggerContainer}
              initial="hidden"
              animate={statsControls}
            >
              <motion.div className="mb-6 text-center" variants={fadeInUp}>
                <h2 className="section-title text-white">
                  {language === 'nl' ? 'Al onze cijfers in één overzicht' : 'All our numbers in one overview'}
                </h2>
                <p className="text-slate-300 max-w-2xl mx-auto">
                  {language === 'nl'
                    ? 'Projecten, websites, onderhoud, SEO en AI-trajecten helder op één plek.'
                    : 'Projects, websites, maintenance, SEO, and AI trajectories in one clear section.'}
                </p>
              </motion.div>

              <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4" variants={fadeInUp}>
                {companyStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl border border-white/15 bg-white/5 px-4 py-4 md:px-5 md:py-5 text-center"
                  >
                    <p className="text-2xl md:text-3xl font-display font-bold text-primary leading-none">
                      <CountUpValue end={stat.value} suffix={stat.suffix} start={statsInView} />
                    </p>
                    <p className="mt-2 text-xs md:text-sm text-slate-200">{stat.label}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

          </motion.div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;

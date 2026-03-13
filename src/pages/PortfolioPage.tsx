import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTASection from '@/components/sections/CTASection';
import { useLanguage } from '@/contexts/LanguageContext';
import { featuredCaseStudyIds, projects, type Project } from '@/data/projects';
import { BarChart3 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation';

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
    {
      value: 24,
      suffix: '/7',
      label: language === 'nl' ? 'Bereikbaarheid' : 'Availability',
    },
  ];

  const statsChunks = companyStats.reduce<typeof companyStats[]>((chunks, stat, index) => {
    if (index % 3 === 0) {
      chunks.push([]);
    }
    chunks[chunks.length - 1].push(stat);
    return chunks;
  }, []);

  const showcaseRows: Array<
    | { type: 'projects'; items: Project[] }
    | { type: 'stats'; items: typeof companyStats }
  > = [];
  for (let i = 0; i < caseStudyProjects.length; i += 2) {
    showcaseRows.push({ type: 'projects', items: caseStudyProjects.slice(i, i + 2) });
    const statsChunk = statsChunks[Math.floor(i / 2)];
    if (statsChunk && statsChunk.length > 0) {
      showcaseRows.push({ type: 'stats', items: statsChunk });
    }
  }

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
              className="absolute inset-0 bg-gradient-to-r from-slate-950/72 via-slate-900/56 to-slate-900/40"
              style={{
                background:
                  'linear-gradient(90deg, rgba(2,6,23,0.78) 0%, rgba(15,23,42,0.60) 55%, rgba(15,23,42,0.42) 100%)',
              }}
            />
          </div>
          <div className="container mx-auto container-padding relative">
            <div className="max-w-3xl">
              <h1 className="font-sans text-3xl md:text-5xl font-extrabold text-blue-50 mb-3 tracking-tight drop-shadow-[0_10px_28px_rgba(2,6,23,0.52)]">{t.pages.portfolio.hero}</h1>
              <p className="text-base md:text-xl text-white max-w-2xl drop-shadow-[0_6px_18px_rgba(2,6,23,0.42)]">{t.pages.portfolio.heroSubtitle}</p>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        <section className="section-padding bg-[#edf2f7] pt-6 md:pt-8">
          <motion.div 
            className="container mx-auto container-padding"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Case Studies */}
            <motion.div className="mb-8 text-center" variants={fadeInUp}>
              <h2 className="section-title text-primary">
                {language === 'nl' ? 'Door ons gemaakte websites met resultaat' : 'Websites we built with measurable results'}
              </h2>
            </motion.div>

            <motion.div className="space-y-8 mb-12" variants={fadeInUp}>
              {showcaseRows.map((row, rowIndex) => {
                if (row.type === 'projects') {
                  return (
                    <div key={`projects-${rowIndex}`} className="grid grid-cols-2 gap-4 md:gap-6 xl:gap-8">
                      {row.items.map((project, index) => (
                        <Link
                          key={project.id}
                          to={`/portfolio/${project.id}`}
                          className="group block w-full text-left"
                        >
                          <div className="py-2 md:py-3">
                            <div className="relative px-1 py-2 md:px-2 md:py-4">
                              <div className="relative mx-auto min-h-[160px] sm:min-h-[220px] md:min-h-[300px] w-full max-w-[740px]">
                                <div className="mx-auto w-full max-w-[740px]">
                                  <div className="rounded-[18px] md:rounded-[22px] bg-slate-950 p-2 shadow-[0_22px_56px_rgba(15,23,42,0.24)]">
                                    <div className="rounded-[14px] md:rounded-[18px] bg-slate-800 p-1.5">
                                      <div className="aspect-[16/10] overflow-hidden rounded-[12px] md:rounded-[14px] bg-white">
                                        <img
                                          src={project.screenshot || project.image}
                                          alt={`${project.title} screenshot`}
                                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                                          onError={(event) => {
                                            event.currentTarget.src = project.image;
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div
                                  className={`absolute bottom-0 ${index % 2 === 0 ? 'left-0 md:left-2' : 'right-0 md:right-2'} w-[80px] sm:w-[104px] md:w-[140px] rounded-[22px] md:rounded-[26px] bg-slate-950 p-1.5 shadow-[0_22px_48px_rgba(15,23,42,0.26)]`}
                                >
                                  <div className="rounded-[16px] md:rounded-[20px] bg-slate-800 p-1">
                                    <div className="aspect-[9/19] overflow-hidden rounded-[12px] md:rounded-[16px] bg-white">
                                      <img
                                        src={project.mobileImage ?? project.image}
                                        alt={`${project.title} mobile preview`}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <span className="sr-only">{project.title}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  );
                }

                return (
                  <div key={`stats-${rowIndex}`} className="grid grid-cols-3 gap-3 md:gap-4">
                    {row.items.map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-2xl border border-slate-200 bg-white px-4 py-4 md:px-5 md:py-5 text-center shadow-[0_12px_28px_rgba(15,23,42,0.08)]"
                      >
                        <p className="text-2xl md:text-3xl font-display font-bold text-primary leading-none">
                          <CountUpValue end={stat.value} suffix={stat.suffix} start />
                        </p>
                        <p className="mt-2 text-xs md:text-sm text-slate-600">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                );
              })}
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

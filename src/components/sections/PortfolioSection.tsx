import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { projects } from '@/data/projects';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation';
import { useEffect, useRef } from 'react';

const PortfolioSection = () => {
  const { t, language } = useLanguage();
  const { ref, controls } = useScrollAnimation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const recentProjectIds = [
    'rijscholen-advies',
    'phone-recovery',
    'promotioncars',
    'amster-vastgoed',
    'care-nexus',
    'van-der-bergen',
    'jesse-vanez',
  ];
  const displayProjects = projects.filter(p => recentProjectIds.includes(p.id));

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    const scrollSpeed = 0.55;

    const getLoopPoint = () => scrollContainer.scrollWidth / 2;

    const animate = () => {
      const loopPoint = getLoopPoint();
      if (loopPoint <= 0) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      scrollContainer.scrollLeft += scrollSpeed;

      // Seamless infinite loop: once we've crossed one full set, continue from the mirrored point.
      if (scrollContainer.scrollLeft >= loopPoint) {
        scrollContainer.scrollLeft -= loopPoint;
      }

      animationId = requestAnimationFrame(animate);
    };

    const timeoutId = setTimeout(() => {
      animationId = requestAnimationFrame(animate);
    }, 1000);

    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(135deg,#dbe3ec_0%,#eef3f8_42%,#d4dde8_100%)] py-7 md:py-8 lg:py-9">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.38),transparent_30%),radial-gradient(circle_at_82%_18%,rgba(148,163,184,0.14),transparent_22%),linear-gradient(120deg,rgba(255,255,255,0.14),transparent_40%,rgba(15,23,42,0.05)_100%)]" />
      <div className="absolute inset-0 pointer-events-none opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:60px_60px]" />
      <div className="section-divider absolute top-0 left-0 right-0 z-[1]" />

      <motion.div
        ref={ref}
        className="container relative z-[2] mx-auto container-padding"
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
      >
        <motion.div className="section-header mb-4 md:mb-5" variants={fadeInUp}>
          <h2 className="section-title !font-bold !text-slate-950">
            {language === 'nl' ? 'Resultaten' : 'Results'}
          </h2>
          <p className="section-subtitle text-slate-600">
            {language === 'nl'
              ? 'Gerealiseerd door Web-Maat.'
              : 'Delivered by Web-Maat.'}
          </p>
        </motion.div>

        <motion.div
          ref={scrollRef}
          className="flex gap-3 md:gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4"
          variants={fadeInUp}
        >
          {[...displayProjects, ...displayProjects].map((project, index) => (
            <Link
              key={`${project.id}-${index}`}
              to={`/portfolio/${project.id}`}
              className="group block flex-shrink-0 w-[calc(58vw-1rem)] min-w-[170px] md:w-[320px] lg:w-[360px] xl:w-[390px]"
            >
              <Card className="h-full overflow-hidden border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.97)_0%,rgba(240,245,251,0.95)_100%)] shadow-[0_16px_44px_rgba(0,0,0,0.24)] transition-all duration-500 hover:border-primary/35 hover:shadow-[0_22px_54px_rgba(0,0,0,0.32)]">
                <div className="relative overflow-hidden aspect-[16/9]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex items-center gap-2 text-white">
                      <span className="font-medium">{t.portfolio.viewProject}</span>
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-3.5 md:p-4">
                  <span className="mb-1 block text-[12px] font-semibold uppercase tracking-[0.16em] text-primary">
                    {project.category[language]}
                  </span>
                  <h3 className="mb-2 font-sans text-[15px] font-bold text-slate-900 transition-colors group-hover:text-primary md:text-[1.02rem] lg:text-[1.08rem]">
                    {project.title}
                  </h3>
                  {project.kpis?.[0] && (
                    <div className="mb-2.5 rounded-2xl border border-primary/12 bg-primary/5 px-3 py-2">
                      <div className="mb-1 flex items-center gap-2 text-primary">
                        <TrendingUp className="h-3.5 w-3.5" />
                        <span className="text-[11px] font-semibold uppercase tracking-[0.18em]">
                          {language === 'nl' ? 'Resultaat' : 'Outcome'}
                        </span>
                      </div>
                      <p className="text-[15px] font-bold leading-tight text-slate-900 md:text-[15px]">
                        {project.kpis[0].value} {project.kpis[0].label[language]}
                      </p>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-1.5">
                    {project.tags.slice(0, 2).map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className="justify-center border-none bg-primary/10 text-[11px] text-primary hover:bg-primary/16 md:text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </motion.div>

        <motion.div className="mt-4 text-center" variants={fadeInUp}>
          <Button
            asChild
            size="lg"
            className="h-11 px-6 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md"
          >
            <Link to="/portfolio">
              {language === 'nl' ? 'Bekijk Alle Projecten' : 'View All Projects'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default PortfolioSection;

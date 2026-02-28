import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
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

  const recentProjectIds = ['rijscholenadvies-bureau', 'phone-recovery', 'promotioncars', 'luxe-vastgoed'];
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
    <section className="relative overflow-hidden py-10 md:py-12 lg:py-14 bg-[#c8d0da]">
      <div className="glass-light absolute inset-0 pointer-events-none" />
      <div className="section-divider absolute top-0 left-0 right-0 z-[1]" />

      <motion.div
        ref={ref}
        className="container relative z-[2] mx-auto container-padding"
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
      >
        <motion.div className="section-header mb-6 md:mb-8" variants={fadeInUp}>
          <h2 className="section-title !text-primary !font-bold">
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
          className="flex gap-3 md:gap-7 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4"
          variants={fadeInUp}
        >
          {[...displayProjects, ...displayProjects].map((project, index) => (
            <Link
              key={`${project.id}-${index}`}
              to={`/portfolio/${project.id}`}
              className="group block flex-shrink-0 w-[calc(64vw-1rem)] min-w-[180px] md:w-[420px] lg:w-[500px] xl:w-[560px]"
            >
              <Card className="overflow-hidden bg-card border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl h-full">
                <div className="relative overflow-hidden aspect-[16/10]">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex items-center gap-2 text-white">
                      <span className="font-medium">{t.portfolio.viewProject}</span>
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                <CardContent className="p-4 md:p-6">
                  <span className="text-primary text-sm font-semibold mb-1 block">
                    {project.category[language]}
                  </span>
                  <h3 className="font-sans font-bold text-base md:text-xl lg:text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="grid grid-cols-3 gap-1.5 md:flex md:flex-wrap md:gap-2">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className={`justify-center bg-primary/10 text-primary hover:bg-primary/20 border-none text-[11px] md:text-xs truncate ${
                          tagIndex === 2 ? 'max-[360px]:hidden' : ''
                        }`}
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

        <motion.div className="text-center mt-6" variants={fadeInUp}>
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

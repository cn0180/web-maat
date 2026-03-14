import { Link } from 'react-router-dom';
import { Star, Quote, ArrowRight, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { projects } from '@/data/projects';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation';
import { useEffect, useRef } from 'react';

const TestimonialsSection = () => {
  const { t, language } = useLanguage();
  const { ref, controls } = useScrollAnimation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const testimonialBase = [
    {
      id: 'rijscholen-advies',
      name: 'Team Rijscholen Advies',
      role: language === 'nl' ? 'Platform' : 'Platform',
      text: {
        nl: 'Het platform is helder en levert ons dagelijks nieuwe aanmeldingen.',
        en: 'The platform is clear and brings in new sign-ups daily.',
      },
    },
    {
      id: 'promotioncars',
      name: 'PromotionCars',
      role: language === 'nl' ? 'Verhuur' : 'Rental',
      text: {
        nl: 'Klanten boeken sneller door de duidelijke flow en luxe uitstraling.',
        en: 'Customers book faster thanks to the clean flow and premium feel.',
      },
    },
    {
      id: 'amster-vastgoed',
      name: 'Amers Vastgoed',
      role: language === 'nl' ? 'Vastgoed' : 'Real estate',
      text: {
        nl: 'De presentatie straalt vertrouwen uit en levert meer kwalitatieve leads.',
        en: 'The presentation builds trust and delivers higher-quality leads.',
      },
    },
    {
      id: 'care-nexus',
      name: 'Care-Nexus',
      role: language === 'nl' ? 'Zorg' : 'Healthcare',
      text: {
        nl: 'De structuur is overzichtelijk en helpt ons beter gevonden te worden.',
        en: 'The structure is clear and helps us get found more easily.',
      },
    },
    {
      id: 'van-der-bergen',
      name: 'Studio van der Bergen',
      role: language === 'nl' ? 'Studio' : 'Studio',
      text: {
        nl: 'De portfolio en blog ogen premium en trekken organisch verkeer.',
        en: 'The portfolio and blog feel premium and attract organic traffic.',
      },
    },
    {
      id: 'jesse-vanez',
      name: 'Jesse Vanez',
      role: language === 'nl' ? 'Portfolio' : 'Portfolio',
      text: {
        nl: 'De site vangt de sfeer perfect en geeft het werk alle ruimte.',
        en: 'The site captures the mood perfectly and gives the work space.',
      },
    },
    {
      id: 'learn-buddy',
      name: 'Learn-Buddy',
      role: language === 'nl' ? 'AI platform' : 'AI platform',
      text: {
        nl: 'Ons AI-platform is nu duidelijker en conversiegericht gepositioneerd.',
        en: 'Our AI platform is now clearer and positioned for conversion.',
      },
    },
  ];

  const testimonials = testimonialBase
    .map((item) => {
      const project = projects.find((entry) => entry.id === item.id);
      return {
        name: item.name,
        company: project?.title ?? item.name,
        role: item.role,
        text: item.text[language],
        rating: 5,
        websiteUrl: project?.websiteUrl ?? '#',
      };
    })
    .filter((item) => item.websiteUrl && item.websiteUrl !== '#');

  const getHostnameLabel = (url: string) => {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
    }
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    const scrollSpeed = 0.7;

    const getLoopPoint = () => Math.max(1, scrollContainer.scrollWidth / 2);

    const animate = () => {
      const loopPoint = getLoopPoint();
      if (scrollContainer.scrollWidth <= scrollContainer.clientWidth) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      scrollContainer.scrollLeft = (scrollContainer.scrollLeft + scrollSpeed) % loopPoint;
      animationId = requestAnimationFrame(animate);
    };

    const start = () => {
      cancelAnimationFrame(animationId);
      animationId = requestAnimationFrame(animate);
    };

    const stop = () => {
      cancelAnimationFrame(animationId);
    };

    const timeoutId = window.setTimeout(start, 600);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stop();
      } else {
        start();
      }
    };

    window.addEventListener('resize', start);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.clearTimeout(timeoutId);
      stop();
      window.removeEventListener('resize', start);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <section className="section-padding relative overflow-hidden bg-soft">
      <motion.div 
        ref={ref}
        className="container mx-auto container-padding"
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
      >
        {/* Header */}
        <motion.div className="section-header" variants={fadeInUp}>
          <h2 className="section-title">{t.testimonials.title}</h2>
        </motion.div>

        {/* Testimonials Auto Scroll */}
        <motion.div
          ref={scrollRef}
          className="flex gap-4 overflow-x-hidden -mx-4 px-4"
          variants={fadeInUp}
        >
          {[...testimonials, ...testimonials].map((testimonial, index) => (
            <motion.div key={`${testimonial.name}-${index}`} variants={fadeInUp} className="flex-shrink-0 w-[78vw] sm:w-[320px] md:w-[360px] lg:w-[380px]">
              <Card className="bg-white/90 hover:bg-white transition-all duration-500 border-border/50 hover:border-primary/30 hover:shadow-lg h-full">
                <CardContent className="p-5">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Quote className="w-5 h-5 text-primary" />
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>

                  <div className="text-foreground leading-relaxed mb-5 text-sm">
                    <p>"{testimonial.text}"</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-sm text-foreground">
                        {testimonial.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {testimonial.role}, {testimonial.company}
                      </p>
                    </div>
                    <a
                      href={testimonial.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-primary transition-colors hover:border-primary/30 hover:bg-primary/5"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      {getHostnameLabel(testimonial.websiteUrl)}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div className="text-center mt-8" variants={fadeInUp}>
          <Button asChild size="lg" variant="outline" className="h-9 px-5 text-xs sm:h-12 sm:px-6 sm:text-sm border-primary/30 hover:bg-primary/5">
            <Link to="/testimonials">
              {language === 'nl' ? (
                <>
                  <span className="sm:hidden">Meer reviews</span>
                  <span className="hidden sm:inline">{t.testimonials.readMore}</span>
                </>
              ) : (
                <>
                  <span className="sm:hidden">More reviews</span>
                  <span className="hidden sm:inline">{t.testimonials.readMore}</span>
                </>
              )}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;

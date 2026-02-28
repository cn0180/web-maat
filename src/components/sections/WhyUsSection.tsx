import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useScrollAnimation, staggerContainer, fadeInUp } from '@/hooks/useScrollAnimation';

const WhyUsSection = () => {
  const { t, language } = useLanguage();
  const { ref, controls } = useScrollAnimation();

  return (
    <section className="py-12 md:py-14 lg:py-16 relative overflow-hidden bg-soft-blue">
      <motion.div
        ref={ref}
        className="container mx-auto container-padding"
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
      >
        <motion.div className="max-w-3xl" variants={fadeInUp}>
          <span className="text-primary text-sm font-medium tracking-wider uppercase mb-3 block">
            {language === 'nl' ? 'Over ons' : 'About us'}
          </span>
          <h2 className="section-title text-left mb-4">{t.about.subtitle}</h2>
          <p className="text-muted-foreground leading-relaxed mb-7">
            Van concept tot lancering, wij leveren excellentie. Wij helpen ambitieuze bedrijven hun digitale aanwezigheid te transformeren met vakmanschap en verfijning.
          </p>

          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg h-12 px-6">
            <Link to="/about">
              {t.common.learnMore}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WhyUsSection;

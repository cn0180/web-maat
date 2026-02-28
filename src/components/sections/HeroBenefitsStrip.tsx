import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation';

const HeroBenefitsStrip = () => {
  const { language } = useLanguage();

  const items = language === 'nl'
    ? [
        { lead: 'Gratis domein', sub: 'naar keuze' },
        { lead: 'Snelle hosting', sub: 'inbegrepen' },
        { lead: 'Zakelijke mail', sub: 'inbegrepen' },
      ]
    : [
        { lead: 'Free domain', sub: 'of your choice' },
        { lead: 'Fast hosting', sub: 'included' },
        { lead: 'Business email', sub: 'included' },
      ];

  return (
    <section className="relative overflow-hidden bg-[#c8d0da] py-4 md:py-6">
      <div className="glass-light absolute inset-0 pointer-events-none" />

      <motion.div
        className="container relative z-[2] mx-auto container-padding"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.35 }}
      >
        <motion.div className="grid grid-cols-3 gap-2 md:gap-4" variants={fadeInUp}>
          {items.map((item, index) => (
            <div
              key={item.lead}
              className={`text-center px-1 md:px-3 ${index > 0 ? 'border-l border-slate-400/70' : ''}`}
            >
              <p className="font-display text-[12px] sm:text-[13px] md:text-[15px] lg:text-[17px] font-bold tracking-[0.04em] text-primary leading-tight">
                {item.lead}
              </p>
              <p className="mt-1 text-[11px] sm:text-[11px] md:text-[12px] font-bold tracking-[0.02em] text-black leading-tight">
                {item.sub}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroBenefitsStrip;

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { fadeInUp, staggerContainer, useScrollAnimation } from '@/hooks/useScrollAnimation';

const AnimatedStatValue = ({ end, suffix, start }: { end: number; suffix: string; start: boolean }) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    let animationFrame = 0;
    let startTimestamp: number | null = null;
    const duration = 1800;

    const tick = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setValue(Math.floor(end * progress));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(tick);
      }
    };

    animationFrame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animationFrame);
  }, [start, end]);

  return (
    <>
      {value}
      {suffix}
    </>
  );
};

const StatsMiniSection = () => {
  const { language } = useLanguage();
  const { ref, controls, isInView } = useScrollAnimation(0.35);

  const stats = [
    { end: 150, suffix: '+', label: language === 'nl' ? 'Projecten' : 'Projects' },
    { end: 98, suffix: '%', label: language === 'nl' ? 'Tevreden' : 'Satisfied' },
    { end: 5, suffix: '+', label: language === 'nl' ? 'Jaar' : 'Years' },
    { end: 24, suffix: 'u', label: language === 'nl' ? 'Response' : 'Response' },
  ];

  return (
    <section className="relative overflow-hidden py-6 md:py-8 bg-[#c8d0da]">
      <div className="glass-light absolute inset-0 pointer-events-none" />

      <motion.div
        ref={ref}
        className="container relative z-[2] mx-auto container-padding"
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
      >
        <motion.div className="grid grid-cols-4 gap-2 md:gap-4" variants={fadeInUp}>
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-lg md:text-3xl font-display font-bold text-primary leading-none">
                <AnimatedStatValue end={stat.end} suffix={stat.suffix} start={isInView} />
              </p>
              <p className="text-[11px] md:text-sm text-slate-700 mt-1.5 md:mt-2">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default StatsMiniSection;

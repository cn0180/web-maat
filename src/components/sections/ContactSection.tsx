import { Link } from 'react-router-dom';
import { Phone, Mail, MessageCircle, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation';

const ContactSection = () => {
  const { t, language } = useLanguage();
  const { ref, controls } = useScrollAnimation();

  const whatsappNumber = '31645457394';
  const phoneNumber = '+31645457394';
  const emailAddress = 'info@web-maat.nl';

  const contactMethods = [
    {
      icon: Phone,
      title: t.contact.phone,
      value: phoneNumber,
      action: t.contact.callUs,
      href: `tel:${phoneNumber.replace(/\s/g, '')}`,
    },
    {
      icon: MessageCircle,
      title: t.contact.whatsapp,
      value: phoneNumber,
      action: t.contact.openWhatsapp,
      href: `https://wa.me/${whatsappNumber}`,
      external: true,
    },
    {
      icon: Mail,
      title: t.contact.email,
      value: emailAddress,
      action: t.contact.emailUs,
      href: `mailto:${emailAddress}`,
    },
  ];

  return (
    <section className="section-padding bg-soft relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <motion.div 
        ref={ref}
        className="container mx-auto container-padding"
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
      >
        {/* Header */}
        <motion.div className="section-header" variants={fadeInUp}>
          <h2 className="section-title">{t.contact.title}</h2>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6 max-w-4xl mx-auto mb-8">
          {contactMethods.map((method, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="bg-white/80 hover:bg-white transition-all duration-500 border-border/50 hover:border-primary/30 hover:shadow-lg group h-full">
                <CardContent className="p-4 md:p-6 text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-105 transition-transform">
                    <method.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1 text-sm md:text-base">
                    {method.title}
                  </h3>
                  <p className="text-muted-foreground text-xs md:text-sm mb-3">
                    {method.value}
                  </p>
                  <Button asChild variant="outline" size="sm" className="w-full border-primary/30 hover:bg-primary/5 h-8 text-xs md:h-10 md:text-sm">
                    <a
                      href={method.href}
                      target={method.external ? '_blank' : undefined}
                      rel={method.external ? 'noopener noreferrer' : undefined}
                    >
                      {method.action}
                      {method.external && <ExternalLink className="ml-2 w-3 h-3" />}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick start */}
        <motion.div
          className="mx-auto max-w-4xl mb-8 rounded-2xl border border-slate-200/70 bg-white/70 p-4 md:p-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)]"
          variants={fadeInUp}
        >
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              {language === 'nl' ? 'Snelle start' : 'Fast start'}
            </p>
            <h3 className="mt-1 text-lg md:text-xl font-bold text-slate-900">
              {language === 'nl' ? 'Binnen 48 uur helderheid' : 'Clarity within 48 hours'}
            </h3>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 md:gap-4 text-center text-xs md:text-sm text-slate-700">
            <div className="rounded-xl border border-slate-200/70 bg-white/80 px-2.5 py-3">
              {language === 'nl' ? 'Gratis intake' : 'Free intake'}
            </div>
            <div className="rounded-xl border border-slate-200/70 bg-white/80 px-2.5 py-3">
              {language === 'nl' ? 'Conceptvoorstel' : 'Concept proposal'}
            </div>
            <div className="rounded-xl border border-slate-200/70 bg-white/80 px-2.5 py-3">
              {language === 'nl' ? 'Snelle planning' : 'Fast planning'}
            </div>
          </div>
        </motion.div>

        {/* WhatsApp availability */}
        <motion.div 
          className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
          variants={fadeInUp}
        >
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-primary" />
            <span>{language === 'nl' ? '24/7 bereikbaar via WhatsApp' : 'Available 24/7 via WhatsApp'}</span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div className="text-center mt-8" variants={fadeInUp}>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg h-9 px-5 text-xs sm:h-12 sm:px-6 sm:text-sm">
            <Link to="/quote">
              {t.hero.cta}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ContactSection;

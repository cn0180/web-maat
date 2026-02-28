import { Link } from 'react-router-dom';
import { Phone, Mail, MessageCircle, MapPin, Clock, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation';

const ContactSection = () => {
  const { t } = useLanguage();
  const { ref, controls } = useScrollAnimation();

  const whatsappNumber = '31612345678';
  const phoneNumber = '+31 6 12345678';
  const emailAddress = 'info@webstudio.nl';

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
          <h2 className="section-title">Contact</h2>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto mb-10">
          {contactMethods.map((method, index) => (
            <motion.div key={index} variants={fadeInUp}>
              <Card className="bg-card hover:bg-card transition-all duration-500 border-border/50 hover:border-primary/30 hover:shadow-xl group h-full">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                    <method.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    {method.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {method.value}
                  </p>
                  <Button asChild variant="outline" size="sm" className="w-full border-primary/30 hover:bg-primary/5">
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

        {/* Additional Info */}
        <motion.div 
          className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground"
          variants={fadeInUp}
        >
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" />
            <span>Amsterdam, Nederland</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span>Ma - Vr: 9:00 - 18:00</span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div className="text-center mt-10" variants={fadeInUp}>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg h-12 px-6">
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

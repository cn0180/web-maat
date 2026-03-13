import { Link } from 'react-router-dom';
import { ArrowRight, Bot, CheckCircle2, Monitor, ShoppingCart } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useScrollAnimation, fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation';

interface ServiceCardCta {
  href: string;
  label: string;
  mobileLabel?: string;
  variant?: 'primary' | 'outline';
}

interface ServiceCardData {
  key: string;
  icon: LucideIcon;
  title: string;
  subtitle: string;
  subtitleShort?: string;
  image: string;
  bullets: string[];
  ctas: ServiceCardCta[];
}

const ServicesSection = () => {
  const { language } = useLanguage();
  const { ref, controls } = useScrollAnimation();

  const cards: ServiceCardData[] =
    language === 'nl'
      ? [
          {
            key: 'webdesign',
            icon: Monitor,
            title: 'Webdesign & ontwikkeling',
            subtitle: 'Websites die indruk maken én daadwerkelijk converteren',
            subtitleShort: 'Websites die vertrouwen opbouwen',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
            bullets: [],
            ctas: [
              { href: '/quote', label: 'Vraag offerte', mobileLabel: 'Offerte', variant: 'primary' },
            ],
          },
          {
            key: 'webshop',
            icon: ShoppingCart,
            title: 'E-commerce & Webshops',
            subtitle: 'Online verkopen zonder grenzen',
            subtitleShort: 'Snelle webshops die verkopen',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
            bullets: [],
            ctas: [{ href: '/services/webshop', label: 'Bekijk webshop oplossingen', mobileLabel: 'Webshop', variant: 'primary' }],
          },
          {
            key: 'ai',
            icon: Bot,
            title: 'AI Oplossing',
            subtitle: 'Onderscheid je met slimme AI-oplossingen',
            subtitleShort: 'AI die support automatiseert',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
            bullets: [],
            ctas: [{ href: '/services/ai-implementatie', label: 'Ontdek AI mogelijkheden', mobileLabel: 'AI opties', variant: 'primary' }],
          },
        ]
      : [
          {
            key: 'webdesign',
            icon: Monitor,
            title: 'Web Design & Development',
            subtitle: 'Websites that impress and convert',
            subtitleShort: 'Websites that build trust',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
            bullets: [
              'Custom design -> your brand is instantly recognizable',
              'Responsive layout -> perfect on desktop, tablet, and mobile',
              'Conversion focused -> CTAs and funnel aligned to audience',
              'Continuous optimization -> improvements based on real data',
            ],
            ctas: [
              { href: '/services/webdesign', label: 'Learn more', mobileLabel: 'Details', variant: 'outline' },
              { href: '/quote', label: 'Request quote', mobileLabel: 'Quote', variant: 'primary' },
            ],
          },
          {
            key: 'webshop',
            icon: ShoppingCart,
            title: 'E-commerce & Webshops',
            subtitle: 'Sell online without limits',
            subtitleShort: 'Fast webshops that sell',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80',
            bullets: [
              'Custom webshop design -> unique and brand-specific',
              'Secure payments -> trust for your customers',
              'Performance & speed -> fast load time and reliable hosting',
              'Analytics & conversion -> insight and optimization',
            ],
            ctas: [{ href: '/services/webshop', label: 'View webshop solutions', mobileLabel: 'Webshop', variant: 'primary' }],
          },
          {
            key: 'ai',
            icon: Bot,
            title: 'AI Implementation',
            subtitle: 'Stand out with smart AI solutions',
            subtitleShort: 'AI that automates support',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
            bullets: [
              'AI chatbot on your website -> instant customer answers',
              'AI customer service -> support automation',
              'Content generation -> faster and consistent creation',
              'Smart automation -> workflows tailored to your business',
            ],
            ctas: [{ href: '/services/ai-implementatie', label: 'Explore AI options', mobileLabel: 'AI options', variant: 'primary' }],
          },
        ];

  const renderServiceCard = (card: ServiceCardData, articleClassName?: string) => {
    const Icon = card.icon;

    return (
      <motion.article key={card.key} variants={fadeInUp} className={articleClassName}>
        <Card className="group overflow-hidden bg-white/90 border-border/60 hover:border-primary/35 transition-all duration-500 hover:shadow-xl h-full flex flex-col">
          <div className="relative h-28 sm:h-32 md:h-44 overflow-hidden">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/25 to-transparent" />
            <div className="absolute bottom-1.5 left-1.5 md:bottom-3 md:left-3 w-7 h-7 md:w-10 md:h-10 rounded-lg md:rounded-xl bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
              <Icon className="w-3.5 h-3.5 md:w-5 md:h-5" />
            </div>
          </div>

          <CardContent className="p-4 md:p-5 flex flex-col flex-1">
            <h3 className="font-display text-base sm:text-lg md:text-xl font-bold text-slate-900 mb-1.5 md:mb-2 leading-tight line-clamp-2">
              {card.title}
            </h3>
            <p className="text-xs sm:text-sm md:text-[15px] text-slate-700 mb-3 md:mb-4 leading-tight line-clamp-2">
              {card.subtitleShort ? (
                <>
                  <span className="sm:hidden">{card.subtitleShort}</span>
                  <span className="hidden sm:inline">{card.subtitle}</span>
                </>
              ) : (
                card.subtitle
              )}
            </p>

            {card.bullets.length > 0 && (
              <ul className="space-y-1 md:space-y-2.5 mb-2 md:mb-6">
                {card.bullets.map((bullet, bulletIndex) => (
                  <li
                    key={bullet}
                    className={`items-start gap-1.5 md:gap-2.5 text-[9px] sm:text-[10px] md:text-sm leading-tight md:leading-relaxed text-slate-800 ${bulletIndex > 0 ? 'hidden md:flex' : 'flex'}`}
                  >
                    <CheckCircle2 className="w-3 h-3 md:w-4 md:h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-auto grid gap-2">
              {card.ctas.map((cta, ctaIndex) => (
                <Button
                  key={`${card.key}-${cta.label}`}
                  asChild
                  className={
                    `${cta.variant === 'outline'
                      ? 'w-full h-9 md:h-11 border-primary/45 bg-white text-primary hover:bg-primary/8'
                      : 'w-full h-9 md:h-11 bg-primary hover:bg-primary/90 text-primary-foreground'} text-xs md:text-sm px-3 md:px-4 ${ctaIndex > 0 ? 'hidden md:flex' : ''}`
                  }
                  variant={cta.variant === 'outline' ? 'outline' : 'default'}
                >
                  <Link to={cta.href}>
                    <span className="truncate">
                      {cta.mobileLabel ? (
                        <>
                          <span className="sm:hidden">{cta.mobileLabel}</span>
                          <span className="hidden sm:inline">{cta.label}</span>
                        </>
                      ) : (
                        cta.label
                      )}
                    </span>
                    <ArrowRight className="ml-1 md:ml-2 w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                  </Link>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.article>
    );
  };

  return (
    <section className="relative overflow-hidden bg-[#e7eaef] pt-7 pb-10 md:pt-9 md:pb-12 lg:pt-10 lg:pb-14">
      <div className="glass-light absolute inset-0 pointer-events-none" />
      <div className="section-divider absolute top-0 left-0 right-0 z-[1]" />

      <motion.div
        ref={ref}
        className="container relative z-[2] mx-auto container-padding"
        variants={staggerContainer}
        initial="hidden"
        animate={controls}
      >
        <motion.div className="section-header mb-5 md:mb-7" variants={fadeInUp}>
          <h2 className="section-title !text-primary !font-extrabold">{language === 'nl' ? 'Diensten' : 'Services'}</h2>
          <p className="section-subtitle text-slate-700 max-w-3xl mx-auto">
            {language === 'nl'
              ? 'Van strategie tot ontwikkeling: wij creëren digitale oplossingen voor groei.'
              : 'From strategy to development, we create digital solutions for growth.'}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {cards.map((card) => renderServiceCard(card))}
        </div>

        <motion.div className="mt-5 md:mt-8 text-center" variants={fadeInUp}>
          <Button asChild className="h-9 md:h-12 px-5 md:px-8 text-xs md:text-base">
            <Link to="/services">
              {language === 'nl' ? (
                <>
                  <span className="sm:hidden">Alle diensten</span>
                  <span className="hidden sm:inline">Bekijk alle diensten</span>
                </>
              ) : (
                <>
                  <span className="sm:hidden">All services</span>
                  <span className="hidden sm:inline">View all services</span>
                </>
              )}
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ServicesSection;

import { useEffect, useRef } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTASection from '@/components/sections/CTASection';
import { useLanguage } from '@/contexts/LanguageContext';
import { Award, Palette, Headphones, TrendingUp, Users, Target, Star, Quote, ArrowRight, ArrowDown, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '@/hooks/useScrollAnimation';
import webmaatImage from '@/assets/Webmaat.png';

const AboutPage = () => {
  const { t, language } = useLanguage();
  const testimonialScrollRef = useRef<HTMLDivElement>(null);

  const values =
    language === 'nl'
      ? [
          {
            icon: Award,
            title: 'Expertise',
            description: 'Met meer dan 150 succesvolle projecten weten wij precies wat werkt.',
          },
          {
            icon: Palette,
            title: 'Maatwerk',
            description: 'Geen templates. Elk project is een uniek kunstwerk.',
          },
          {
            icon: Headphones,
            title: 'Persoonlijk',
            description: 'Direct contact met uw projectmanager.',
          },
          {
            icon: TrendingUp,
            title: 'Resultaat',
            description: 'Websites die imponeren én converteren.',
          },
          {
            icon: Users,
            title: 'Klantgericht',
            description: 'Uw succes staat centraal in alles wat we doen.',
          },
          {
            icon: Target,
            title: 'Doelgericht',
            description: 'Websites die uw bedrijfsdoelen bereiken.',
          },
        ]
      : [
          {
            icon: Award,
            title: t.about.experience.title,
            description: t.about.experience.description,
          },
          {
            icon: Palette,
            title: t.about.custom.title,
            description: t.about.custom.description,
          },
          {
            icon: Headphones,
            title: t.about.support.title,
            description: t.about.support.description,
          },
          {
            icon: TrendingUp,
            title: t.about.results.title,
            description: t.about.results.description,
          },
          {
            icon: Users,
            title: 'Customer focused',
            description: 'Your success is central to everything we do.',
          },
          {
            icon: Target,
            title: 'Goal driven',
            description: 'Websites that achieve your business goals.',
          },
        ];

  const stats =
    language === 'nl'
      ? [
          { value: '150+', label: 'Projecten Afgerond' },
          { value: '98%', label: 'Tevreden Klanten' },
          { value: '5+', label: 'Jaar Ervaring' },
          { value: '24u', label: 'Response Tijd' },
        ]
      : [
          { value: '150+', label: 'Projects Delivered' },
          { value: '98%', label: 'Satisfied Clients' },
          { value: '5+', label: 'Years Experience' },
          { value: '24h', label: 'Response Time' },
        ];

  const storyCopy =
    language === 'nl'
      ? {
          eyebrow: 'Ons verhaal',
          title: 'Van idee naar resultaat',
          body:
            'Van eerste strategie tot livegang: we bouwen niet alleen een mooie site, maar een digitale basis die past bij uw bedrijf en klaar is voor groei.',
        }
      : {
          eyebrow: 'Our story',
          title: 'From idea to results',
          body:
            'From first strategy to launch: we build not just a beautiful site, but a digital foundation that fits your business and is ready for growth.',
        };

  const storySteps =
    language === 'nl'
      ? [
          {
            title: 'Analyse en strategie',
            description:
              'Inzicht in uw bedrijf, doelgroep en doelstellingen vormt de basis van het ontwerp.',
          },
          {
            title: 'Demo en feedback',
            description:
              'Voor de livegang ontvangt u een demo om de website te beoordelen, testen en feedback te geven.',
          },
          {
            title: 'Structuur en design',
            description:
              'Een unieke website met duidelijke structuur en professionele uitstraling, volledig afgestemd op uw organisatie.',
          },
          {
            title: 'Resultaatgericht',
            description:
              'Ontwikkeld met focus op vertrouwen, conversie en duurzame groei.',
          },
        ]
      : [
          {
            title: 'Analysis & strategy',
            description:
              'Insight into your business, audience and goals forms the basis of the design.',
          },
          {
            title: 'Demo & feedback',
            description:
              'Before launch you receive a demo to review, test and provide feedback.',
          },
          {
            title: 'Structure & design',
            description:
              'A unique website with clear structure and a professional look, fully aligned with your organization.',
          },
          {
            title: 'Result-driven',
            description:
              'Built with a focus on trust, conversion and sustainable growth.',
          },
        ];

  const testimonials =
    language === 'nl'
      ? [
          {
            name: 'Sarah de Jong',
            company: 'TechFlow Solutions',
            role: 'CEO',
            text: 'Fantastische samenwerking en duidelijke communicatie. We kregen precies wat we nodig hadden.',
            rating: 5,
            websiteUrl: 'https://rijscholenadvies.nl',
          },
          {
            name: 'Mark van der Berg',
            company: 'ModaStyle Boutique',
            role: 'Eigenaar',
            text: 'De webshop is professioneel, snel en gebruiksvriendelijk. Precies wat we zochten.',
            rating: 5,
            websiteUrl: 'https://promotioncars.nl',
          },
          {
            name: 'Lisa Bakker',
            company: 'GreenLeaf Catering',
            role: 'Marketing Manager',
            text: 'Van eerste contact tot oplevering verliep alles soepel. De website past perfect bij ons merk.',
            rating: 5,
            websiteUrl: 'https://vanderbergen.nl',
          },
        ]
      : [
          {
            name: 'Sarah de Jong',
            company: 'TechFlow Solutions',
            role: 'CEO',
            text: 'Fantastic collaboration and clear communication. We got exactly what we needed.',
            rating: 5,
            websiteUrl: 'https://rijscholenadvies.nl',
          },
          {
            name: 'Mark van der Berg',
            company: 'ModaStyle Boutique',
            role: 'Owner',
            text: 'The webshop is professional, fast and easy to use. Exactly what we wanted.',
            rating: 5,
            websiteUrl: 'https://promotioncars.nl',
          },
          {
            name: 'Lisa Bakker',
            company: 'GreenLeaf Catering',
            role: 'Marketing Manager',
            text: 'From first contact to delivery everything ran smoothly. The website fits our brand perfectly.',
            rating: 5,
            websiteUrl: 'https://vanderbergen.nl',
          },
        ];

  const getHostnameLabel = (url: string) => {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
    }
  };

  useEffect(() => {
    const scrollContainer = testimonialScrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    const scrollSpeed = 0.45;

    const getLoopPoint = () => scrollContainer.scrollWidth / 2;

    const animate = () => {
      const loopPoint = getLoopPoint();
      if (loopPoint <= 0) {
        animationId = requestAnimationFrame(animate);
        return;
      }

      scrollContainer.scrollLeft += scrollSpeed;

      if (scrollContainer.scrollLeft >= loopPoint) {
        scrollContainer.scrollLeft -= loopPoint;
      }

      animationId = requestAnimationFrame(animate);
    };

    const timeoutId = window.setTimeout(() => {
      animationId = requestAnimationFrame(animate);
    }, 900);

    const stop = () => cancelAnimationFrame(animationId);
    const resume = () => {
      animationId = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener('mouseenter', stop);
    scrollContainer.addEventListener('mouseleave', resume);

    return () => {
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', stop);
      scrollContainer.removeEventListener('mouseleave', resume);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero with Image */}
        <section className="py-12 relative isolate overflow-hidden bg-slate-900">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80" 
              alt="Team at work"
              className="w-full h-full object-cover object-center grayscale-[4%] brightness-[0.8] saturate-[1.08] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-slate-900/20" style={{ backgroundColor: 'rgba(15, 23, 42, 0.2)' }} />
            <div
              className="absolute inset-0 bg-gradient-to-r from-slate-950/35 via-slate-900/24 to-slate-900/12"
              style={{
                background:
                  'linear-gradient(90deg, rgba(2,6,23,0.35) 0%, rgba(15,23,42,0.24) 55%, rgba(15,23,42,0.12) 100%)',
              }}
            />
          </div>
          <div className="container mx-auto container-padding relative">
            <div className="max-w-3xl">
              <h1 className="font-display text-3xl md:text-5xl font-extrabold text-blue-50 mb-3 tracking-tight drop-shadow-[0_10px_28px_rgba(2,6,23,0.52)]">{t.pages.about.hero}</h1>
              <p className="text-base md:text-xl text-white max-w-2xl drop-shadow-[0_6px_18px_rgba(2,6,23,0.42)]">{t.pages.about.heroSubtitle}</p>
            </div>
          </div>
        </section>
        <div className="container mx-auto container-padding">
          <div className="section-divider-strong" />
        </div>

        {/* Story Section with Image */}
        <section className="py-12 md:py-14 lg:py-16">
          <motion.div 
            className="container mx-auto container-padding"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={slideInLeft}>
                <span className="text-primary text-sm font-medium tracking-wider uppercase mb-3 block">
                  {storyCopy.eyebrow}
                </span>
                <h2 className="section-title text-left mb-5">{storyCopy.title}</h2>
                <p className="text-muted-foreground max-w-xl">
                  {storyCopy.body}
                </p>
              </motion.div>

              <motion.div className="relative" variants={slideInRight}>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src={webmaatImage}
                    alt="Web-Maat"
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-6 border border-primary/10 shadow-xl">
                  <div className="grid grid-cols-2 gap-4">
                    {stats.slice(0, 2).map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="text-2xl font-display font-bold text-primary">
                          {stat.value}
                        </div>
                        <div className="text-muted-foreground text-xs">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]" variants={fadeInUp}>
              {storySteps.map((step, index) => (
                <div key={step.title} className="contents">
                  <div className="rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_12px_34px_rgba(15,23,42,0.08)]">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary font-bold">
                      0{index + 1}
                    </div>
                    <h3 className="font-display text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{step.description}</p>
                  </div>
                  {index < storySteps.length - 1 && (
                    <div className="hidden lg:flex items-center justify-center text-primary/60">
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>
        <div className="container mx-auto container-padding">
          <div className="section-divider-strong" />
        </div>

        {/* Values */}
        <section className="py-12 md:py-14 lg:py-16 bg-soft">
          <motion.div 
            className="container mx-auto container-padding"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="section-header" variants={fadeInUp}>
              <h2 className="section-title">{language === 'nl' ? 'Onze Waarden' : 'Our values'}</h2>
              <p className="section-subtitle">
                {language === 'nl' ? 'Wat ons drijft bij elk project' : 'What drives us in every project'}
              </p>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <div className="grid gap-6 md:grid-cols-3">
                {values.map((value, index) => (
                  <div key={index} className="relative flex gap-4 pr-6 md:pr-8">
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-primary/20 bg-white/80 text-primary shadow-sm">
                      <value.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-slate-900 mb-1">{value.title}</h3>
                      <p className="text-sm leading-relaxed text-slate-600">{value.description}</p>
                    </div>

                    {index < values.length - 1 && (
                      <>
                        <ArrowRight className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/40" />
                        <ArrowDown className="md:hidden absolute right-1 top-full mt-3 h-5 w-5 text-primary/40" />
                      </>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>
        <div className="container mx-auto container-padding">
          <div className="section-divider-strong" />
        </div>

        {/* Testimonials Preview */}
        <section className="section-padding">
          <motion.div 
            className="container mx-auto container-padding"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="section-header" variants={fadeInUp}>
              <h2 className="section-title">{t.testimonials.title}</h2>
              <p className="section-subtitle">{t.testimonials.subtitle}</p>
            </motion.div>

            <motion.div
              ref={testimonialScrollRef}
              className="flex gap-5 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4"
              variants={fadeInUp}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.name} className="min-w-[290px] md:min-w-[380px] lg:min-w-[430px] flex-shrink-0">
                  <Card className="bg-card transition-all duration-500 border-border/50 hover:border-primary/30 hover:shadow-xl h-full">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Quote className="w-5 h-5 text-primary" />
                      </div>

                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>

                      <div className="space-y-2 text-foreground leading-relaxed mb-5 text-sm md:text-base">
                        {testimonial.text.split(/(?<=\.)\s+/).map((line) => (
                          <p key={line}>"{line}"</p>
                        ))}
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
                </div>
              ))}
            </motion.div>
          </motion.div>
        </section>
        <div className="container mx-auto container-padding">
          <div className="section-divider-strong" />
        </div>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;

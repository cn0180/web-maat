import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTASection from '@/components/sections/CTASection';
import { useLanguage } from '@/contexts/LanguageContext';
import { Award, Palette, Headphones, TrendingUp, Users, Target, Star, Quote, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, slideInLeft, slideInRight } from '@/hooks/useScrollAnimation';
import webmaatImage from '@/assets/Webmaat.png';

const AboutPage = () => {
  const { t } = useLanguage();

  const values = [
    { 
      icon: Award, 
      title: t.about.experience.title, 
      description: t.about.experience.description 
    },
    { 
      icon: Palette, 
      title: t.about.custom.title, 
      description: t.about.custom.description 
    },
    { 
      icon: Headphones, 
      title: t.about.support.title, 
      description: t.about.support.description 
    },
    { 
      icon: TrendingUp, 
      title: t.about.results.title, 
      description: t.about.results.description 
    },
    { 
      icon: Users, 
      title: 'Klantgericht', 
      description: 'Uw succes staat centraal in alles wat we doen.' 
    },
    { 
      icon: Target, 
      title: 'Doelgericht', 
      description: 'Websites die uw bedrijfsdoelen bereiken.' 
    },
  ];

  const stats = [
    { value: '150+', label: 'Projecten Afgerond' },
    { value: '98%', label: 'Tevreden Klanten' },
    { value: '5+', label: 'Jaar Ervaring' },
    { value: '24u', label: 'Response Tijd' },
  ];

  const testimonials = [
    {
      name: 'Sarah de Jong',
      company: 'TechFlow Solutions',
      role: 'CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
      text: 'Fantastische samenwerking! Het team begreep precies wat we nodig hadden en leverde een website die onze verwachtingen overtrof.',
      rating: 5,
    },
    {
      name: 'Mark van der Berg',
      company: 'ModaStyle Boutique',
      role: 'Eigenaar',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
      text: 'De webshop is precies wat we zochten. Professioneel, snel en gebruiksvriendelijk. De klantenservice is ook top.',
      rating: 5,
    },
    {
      name: 'Lisa Bakker',
      company: 'GreenLeaf Catering',
      role: 'Marketing Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
      text: 'Van eerste contact tot oplevering, alles verliep soepel. De website past perfect bij ons merk.',
      rating: 5,
    },
  ];

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
            <div className="max-w-2xl">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-white mb-3">{t.pages.about.hero}</h1>
              <p className="text-slate-200">{t.pages.about.heroSubtitle}</p>
            </div>
          </div>
        </section>
        <div className="container mx-auto container-padding">
          <div className="section-divider-strong" />
        </div>

        {/* Story Section with Image */}
        <section className="section-padding">
          <motion.div 
            className="container mx-auto container-padding"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={slideInLeft}>
                <span className="text-primary text-sm font-medium tracking-wider uppercase mb-3 block">
                  {t.about.story}
                </span>
                <h2 className="section-title text-left mb-5">Van idee naar resultaat</h2>
                <div className="space-y-5">
                  <div>
                    <h3 className="font-display text-base md:text-lg font-semibold text-foreground mb-1.5">
                      Onze aanpak
                    </h3>
                    <p className="text-muted-foreground">
                      We starten strategisch: doelgroep, aanbod en conversiedoelen bepalen het ontwerp.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-display text-base md:text-lg font-semibold text-foreground mb-1.5">
                      Geen standaard templates
                    </h3>
                    <p className="text-muted-foreground">
                      Elk project wordt op maat gebouwd, met unieke uitstraling en duidelijke structuur.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-display text-base md:text-lg font-semibold text-foreground mb-1.5">
                      Focus op groei
                    </h3>
                    <p className="text-muted-foreground">
                      Uw website moet vertrouwen opbouwen, leads opleveren en met uw bedrijf meegroeien.
                    </p>
                  </div>
                </div>
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
          </motion.div>
        </section>
        <div className="container mx-auto container-padding">
          <div className="section-divider-strong" />
        </div>

        {/* Values */}
        <section className="section-padding bg-soft">
          <motion.div 
            className="container mx-auto container-padding"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="section-header" variants={fadeInUp}>
              <h2 className="section-title">Onze Waarden</h2>
              <p className="section-subtitle">Wat ons drijft bij elk project</p>
            </motion.div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((value, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="bg-card border-border/50 hover:border-primary/30 transition-all hover:shadow-lg h-full">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                        <value.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-display font-semibold text-foreground mb-2">{value.title}</h3>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
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

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="bg-card hover:bg-card transition-all duration-500 border-border/50 hover:border-primary/30 hover:shadow-xl h-full">
                    <CardContent className="p-6">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <Quote className="w-5 h-5 text-primary" />
                      </div>

                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>

                      <p className="text-foreground leading-relaxed mb-6 text-sm">
                        "{testimonial.text}"
                      </p>

                      <div className="flex items-center gap-3">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
                        />
                        <div>
                          <p className="font-medium text-sm text-foreground">
                            {testimonial.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div className="text-center mt-10" variants={fadeInUp}>
              <Button asChild size="lg" variant="outline" className="h-12 px-6 border-primary/30 hover:bg-primary/5">
                <Link to="/testimonials">
                  {t.testimonials.readMore}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
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

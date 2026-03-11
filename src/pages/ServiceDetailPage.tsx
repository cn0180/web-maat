import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTASection from '@/components/sections/CTASection';
import { getLocalizedService, getServiceBySlug, services } from '@/data/services';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation';
import NotFound from './NotFound';
import { useLanguage } from '@/contexts/LanguageContext';

const ServiceDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;
  const { language } = useLanguage();

  if (!service) return <NotFound />;

  const currentIndex = services.findIndex(s => s.slug === slug);
  const prevService = currentIndex > 0 ? services[currentIndex - 1] : null;
  const nextService = currentIndex < services.length - 1 ? services[currentIndex + 1] : null;

  const Icon = service.icon;
  const serviceCopy = getLocalizedService(service, language);
  const prevServiceCopy = prevService ? getLocalizedService(prevService, language) : null;
  const nextServiceCopy = nextService ? getLocalizedService(nextService, language) : null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0">
            <img src={service.image} alt={serviceCopy.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
          </div>
          <div className="container mx-auto container-padding relative">
            <Link to="/services" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6">
              <ArrowLeft className="w-4 h-4" />
              {language === 'nl' ? 'Terug naar diensten' : 'Back to services'}
            </Link>
            <div className="max-w-2xl">
              <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center mb-4 shadow-lg">
                <Icon className="w-7 h-7 text-white" />
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{serviceCopy.title}</h1>
              <p className="text-muted-foreground text-lg mb-4">{serviceCopy.subtitle}</p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="section-padding">
          <motion.div
            className="container mx-auto container-padding"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <motion.div className="lg:col-span-2 space-y-8" variants={fadeInUp}>
                <div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                    {language === 'nl' ? 'Over deze dienst' : 'About this service'}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">{serviceCopy.description}</p>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">
                    {language === 'nl' ? 'Wat wij doen' : 'What we do'}
                  </h3>
                  <div className="space-y-3">
                    {serviceCopy.details.map((detail, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <p className="text-muted-foreground">{detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Sidebar */}
              <motion.div variants={fadeInUp}>
                <Card className="bg-card border-border/50 sticky top-24">
                  <CardContent className="p-6">
                    <h3 className="font-display text-lg font-bold text-foreground mb-4">
                      {language === 'nl' ? 'Wat u krijgt' : 'What you get'}
                    </h3>
                    <div className="space-y-3 mb-6">
                      {serviceCopy.features.map((feature, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Link to="/quote">{language === 'nl' ? 'Vraag Offerte Aan' : 'Request Quote'}</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-16 pt-8 border-t border-border">
              {prevService ? (
                <Link to={`/services/${prevService.slug}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm">{prevServiceCopy?.title ?? prevService.title}</span>
                </Link>
              ) : <div />}
              {nextService && (
                <Link to={`/services/${nextService.slug}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                  <span className="text-sm">{nextServiceCopy?.title ?? nextService.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </motion.div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetailPage;

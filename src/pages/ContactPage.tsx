import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { Phone, Mail, MessageCircle, ArrowRight, ExternalLink, Send } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation';
import { useToast } from '@/hooks/use-toast';
import { submitContactSubmission } from '@/lib/form-submissions';

const ContactPage = () => {
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    naam: '',
    email: '',
    bericht: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Pre-fill message from chat widget
  useEffect(() => {
    const message = searchParams.get('message');
    if (message) {
      setFormData(prev => ({ ...prev, bericht: message }));
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContactSubmission({
        name: formData.naam,
        email: formData.email,
        message: formData.bericht,
        language,
      });

      setIsSubmitted(true);
      toast({
        title: language === 'nl' ? 'Bericht verzonden' : 'Message sent',
        description:
          language === 'nl'
            ? 'Uw bericht is succesvol opgeslagen en doorgestuurd.'
            : 'Your message was saved and forwarded successfully.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: language === 'nl' ? 'Verzenden mislukt' : 'Sending failed',
        description:
          error instanceof Error
            ? error.message
            : language === 'nl'
              ? 'Er ging iets mis. Probeer opnieuw.'
              : 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappNumber = '31612345678';
  const phoneNumber = '+31 6 12345678';
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

  const copy =
    language === 'nl'
      ? {
          contactIntroTitle: 'Neem contact op',
          contactIntroBody:
            'Heeft u vragen of wilt u een project bespreken? Wij staan klaar om u te helpen. Kies hieronder uw favoriete contactmethode.',
          whatsappAvailability: '24/7 bereikbaar via WhatsApp voor vragen en updates.',
          formTitle: 'Stuur ons een bericht',
          submittedTitle: 'Bericht verzonden!',
          submittedBody: 'Bedankt voor uw bericht. Wij nemen zo snel mogelijk contact met u op.',
          nameLabel: 'Naam',
          namePlaceholder: 'Uw naam',
          emailLabel: 'E-mailadres',
          emailPlaceholder: 'uw@email.nl',
          messageLabel: 'Bericht',
          messagePlaceholder: 'Uw vraag of bericht...',
          submitLabel: 'Verstuur bericht',
          submittingLabel: 'Versturen...',
          quotePrompt: 'Liever direct een offerte aanvragen?',
          quoteLink: 'Ga naar het offerteformulier',
        }
      : {
          contactIntroTitle: 'Get in touch',
          contactIntroBody:
            'Have questions or want to discuss a project? We are ready to help. Choose your preferred contact method below.',
          whatsappAvailability: 'Available 24/7 via WhatsApp for questions and updates.',
          formTitle: 'Send us a message',
          submittedTitle: 'Message sent!',
          submittedBody: 'Thanks for your message. We will get back to you as soon as possible.',
          nameLabel: 'Name',
          namePlaceholder: 'Your name',
          emailLabel: 'Email address',
          emailPlaceholder: 'you@email.com',
          messageLabel: 'Message',
          messagePlaceholder: 'Your question or message...',
          submitLabel: 'Send message',
          submittingLabel: 'Sending...',
          quotePrompt: 'Prefer to request a quote directly?',
          quoteLink: 'Go to the quote form',
        };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero with Image */}
        <section className="py-12 relative isolate overflow-hidden bg-slate-900">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80" 
              alt="Contact us"
              className="w-full h-full object-cover object-center grayscale-[4%] brightness-[0.8] saturate-[1.08] contrast-[1.05]"
            />
            <div className="absolute inset-0 bg-slate-900/20" style={{ backgroundColor: 'rgba(15, 23, 42, 0.2)' }} />
            <div
              className="absolute inset-0 bg-gradient-to-r from-slate-950/72 via-slate-900/56 to-slate-900/40"
              style={{
                background:
                  'linear-gradient(90deg, rgba(2,6,23,0.78) 0%, rgba(15,23,42,0.60) 55%, rgba(15,23,42,0.42) 100%)',
              }}
            />
          </div>
          <div className="container mx-auto container-padding relative">
            <div className="max-w-3xl">
              <h1 className="font-display text-3xl md:text-5xl font-extrabold text-blue-50 mb-3 tracking-tight drop-shadow-[0_10px_28px_rgba(2,6,23,0.52)]">{t.pages.contact.hero}</h1>
              <p className="text-base md:text-xl text-white max-w-2xl drop-shadow-[0_6px_18px_rgba(2,6,23,0.42)]">{t.pages.contact.heroSubtitle}</p>
            </div>
          </div>
        </section>
        <div className="container mx-auto container-padding">
          <div className="section-divider-strong" />
        </div>

        {/* Contact Content */}
        <section className="section-padding">
          <motion.div 
            className="container mx-auto container-padding"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Methods */}
              <motion.div variants={fadeInUp}>
                <h2 className="section-title text-left mb-6">{copy.contactIntroTitle}</h2>
                <p className="text-muted-foreground mb-8">
                  {copy.contactIntroBody}
                </p>

                <div className="space-y-4">
                  {contactMethods.map((method, index) => (
                    <Card key={index} className="bg-card border-border/50 hover:border-primary/30 transition-all hover:shadow-lg">
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                            <method.icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-display font-semibold text-foreground">{method.title}</h3>
                            <p className="text-muted-foreground text-sm">{method.value}</p>
                          </div>
                          <Button asChild variant="outline" size="sm" className="border-primary/30 hover:bg-primary/5">
                            <a
                              href={method.href}
                              target={method.external ? '_blank' : undefined}
                              rel={method.external ? 'noopener noreferrer' : undefined}
                            >
                              {method.action}
                              {method.external && <ExternalLink className="ml-2 w-3 h-3" />}
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* WhatsApp availability */}
                <div className="mt-8 p-6 bg-soft rounded-xl">
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <span className="text-muted-foreground">
                      {copy.whatsappAvailability}
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div variants={fadeInUp}>
                <Card className="border-border/50 shadow-lg">
                  <CardContent className="p-6 md:p-8">
                    <h2 className="font-display text-xl font-bold text-foreground mb-6">{copy.formTitle}</h2>
                    
                    {isSubmitted ? (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                          <Send className="w-8 h-8 text-primary" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-2">{copy.submittedTitle}</h3>
                        <p className="text-muted-foreground text-sm">
                          {copy.submittedBody}
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="naam">{copy.nameLabel} *</Label>
                          <Input
                            id="naam"
                            required
                            value={formData.naam}
                            onChange={(e) => setFormData(prev => ({ ...prev, naam: e.target.value }))}
                            placeholder={copy.namePlaceholder}
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">{copy.emailLabel} *</Label>
                          <Input
                            id="email"
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                            placeholder={copy.emailPlaceholder}
                            className="h-12"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="bericht">{copy.messageLabel} *</Label>
                          <Textarea
                            id="bericht"
                            required
                            value={formData.bericht}
                            onChange={(e) => setFormData(prev => ({ ...prev, bericht: e.target.value }))}
                            placeholder={copy.messagePlaceholder}
                            rows={5}
                            className="resize-none"
                          />
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? copy.submittingLabel : copy.submitLabel}
                          <Send className="ml-2 w-4 h-4" />
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">
                    {copy.quotePrompt}{' '}
                    <Link to="/quote" className="text-primary hover:underline font-medium">
                      {copy.quoteLink}
                    </Link>
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>
        <div className="container mx-auto container-padding">
          <div className="section-divider-strong" />
        </div>

        {/* Map section removed per request */}
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;

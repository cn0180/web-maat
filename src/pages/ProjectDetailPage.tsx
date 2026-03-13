import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTASection from '@/components/sections/CTASection';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProjectById, getNextProject, getPrevProject } from '@/data/projects';
import { usePageSeo } from '@/hooks/usePageSeo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { submitContactSubmission } from '@/lib/form-submissions';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Target,
  Sparkles,
  BarChart3,
  CheckCircle2,
} from 'lucide-react';

type BundleKey = 'starter' | 'growth' | 'custom';

const splitProjectCopy = (text: string) => {
  const parts =
    text.match(/[^.!?]+[.!?]?/g)?.map((part) => part.trim()).filter(Boolean) ?? [text];

  return {
    lead: parts[0] ?? text,
    supporting: parts.slice(1, 3),
  };
};

const bundleCopy = {
  nl: {
    label: 'Gekozen pakket',
    hint: 'Samengesteld op basis van dit project.',
    cta: 'Offerte aanvragen',
    starter: {
      name: 'Starter',
      price: '€395',
      description: 'Ideaal voor portfolio’s en compacte websites die snel live moeten.',
      features: ['Beproefde structuur', 'Basis SEO inbegrepen', 'Snel online'],
    },
    growth: {
      name: 'Groei',
      price: '€1150',
      description: 'Voor websites met meer pagina’s, content en een duidelijke groeifocus.',
      features: ['Strategisch design', 'Conversiegerichte opbouw', 'SEO basis'],
    },
    custom: {
      name: 'Maatwerk',
      price: '€2450',
      description: 'Voor platforms, webapps of projecten met complexe flows en integraties.',
      features: ['Uniek design + ontwikkeling', 'Integraties op maat', 'Schaalbaar voor groei'],
    },
  },
  en: {
    label: 'Selected package',
    hint: 'Tailored to this project.',
    cta: 'Request quote',
    starter: {
      name: 'Starter',
      price: '€395',
      description: 'Ideal for portfolios and compact websites that need to launch quickly.',
      features: ['Proven structure', 'Basic SEO included', 'Go live fast'],
    },
    growth: {
      name: 'Growth',
      price: '€1150',
      description: 'For websites with more pages, content and a clear growth focus.',
      features: ['Strategic design', 'Conversion-focused structure', 'SEO foundation'],
    },
    custom: {
      name: 'Custom',
      price: '€2450',
      description: 'For platforms, web apps or projects with complex flows and integrations.',
      features: ['Unique design + build', 'Custom integrations', 'Scalable for growth'],
    },
  },
} as const;

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const { toast } = useToast();
  const project = getProjectById(id || '');
  const nextProject = getNextProject(id || '');
  const prevProject = getPrevProject(id || '');
  const heroImage = project?.screenshot || project?.gallery[0] || project?.image;
  const [similarForm, setSimilarForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSimilarSubmitting, setIsSimilarSubmitting] = useState(false);
  const [isSimilarSubmitted, setIsSimilarSubmitted] = useState(false);

  const seoTitle = project
    ? project.seo?.title[language] ??
      `${project.title} | ${project.category[language]} case study | Web-Maat`
    : 'Project niet gevonden | Web-Maat';
  const seoDescription = project
    ? project.seo?.description[language] ?? project.description[language]
    : 'Dit project kon niet worden gevonden.';
  const seoUrl = typeof window !== 'undefined' ? window.location.href : undefined;
  const seoJsonLd = project
    ? {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: seoTitle,
        description: seoDescription,
        url: seoUrl,
        mainEntity: {
          '@type': 'CreativeWork',
          name: project.title,
          description: project.description[language],
          url: project.websiteUrl,
          image: heroImage,
          keywords: project.tags.join(', '),
        },
      }
    : undefined;

  const similarCopy =
    language === 'nl'
      ? {
          label: 'Vergelijkbare website',
          title: 'Een vergelijkbare website laten maken?',
          subtitle: 'Vraag een offerte aan en ontvang binnen 24 uur een reactie.',
          nameLabel: 'Naam',
          namePlaceholder: 'Uw naam',
          phoneLabel: 'Telefoon',
          phonePlaceholder: '+31645457394',
          emailLabel: 'E-mail',
          emailPlaceholder: 'uw@email.nl',
          messageLabel: 'Bericht',
          messagePlaceholder: 'Vertel kort wat u nodig heeft...',
          submitLabel: 'Verstuur aanvraag',
          submittingLabel: 'Versturen...',
          successTitle: 'Aanvraag ontvangen',
          successBody: 'We nemen binnen 24 uur contact met u op.',
          viewSite: 'Bekijk deze website',
        }
      : {
          label: 'Similar website',
          title: 'Need a similar website?',
          subtitle: 'Request a quote and receive a response within 24 hours.',
          nameLabel: 'Name',
          namePlaceholder: 'Your name',
          phoneLabel: 'Phone',
          phonePlaceholder: '+31645457394',
          emailLabel: 'Email',
          emailPlaceholder: 'you@email.com',
          messageLabel: 'Message',
          messagePlaceholder: 'Tell us briefly what you need...',
          submitLabel: 'Send request',
          submittingLabel: 'Sending...',
          successTitle: 'Request received',
          successBody: 'We will contact you within 24 hours.',
          viewSite: 'View this website',
        };

  const handleSimilarSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!project) return;
    setIsSimilarSubmitting(true);

    const messageLines = [
      `Project: ${project.title}`,
      similarForm.phone ? `Telefoon: ${similarForm.phone}` : null,
      similarForm.message.trim(),
    ].filter(Boolean);

    try {
      await submitContactSubmission({
        name: similarForm.name.trim(),
        email: similarForm.email.trim(),
        message: messageLines.join('\n'),
        language,
        source: `project-detail:${project.id}`,
      });

      setIsSimilarSubmitted(true);
      toast({
        title: language === 'nl' ? 'Aanvraag verzonden' : 'Request sent',
        description:
          language === 'nl'
            ? 'Uw aanvraag is opgeslagen en doorgestuurd.'
            : 'Your request was saved and forwarded.',
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
      setIsSimilarSubmitting(false);
    }
  };

  const isSimilarValid = Boolean(
    similarForm.name.trim() && similarForm.email.trim() && similarForm.message.trim()
  );

  usePageSeo({
    title: seoTitle,
    description: seoDescription,
    image: heroImage,
    url: seoUrl,
    type: 'article',
    jsonLd: seoJsonLd,
  });

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Project niet gevonden</p>
      </div>
    );
  }

  const categoryMatch = `${project.category.nl} ${project.category.en} ${project.tags.join(' ')}`.toLowerCase();
  const recommendedBundleKey: BundleKey = (() => {
    if (categoryMatch.includes('platform') || categoryMatch.includes('ai')) return 'custom';
    if (categoryMatch.includes('webshop') || categoryMatch.includes('e-commerce') || categoryMatch.includes('ecommerce')) {
      return 'growth';
    }
    if (categoryMatch.includes('portfolio') || categoryMatch.includes('landing')) return 'starter';
    return 'growth';
  })();
  const bundleLocale = bundleCopy[language];
  const selectedBundleKey = project.package?.bundle ?? recommendedBundleKey;
  const bundle = bundleLocale[selectedBundleKey];
  const bundleFeatures = project.package?.features?.[language] ?? bundle.features;
  const storySections = [
    {
      id: 'challenge',
      title: t.portfolio.challenge,
      eyebrow: language === 'nl' ? 'Context' : 'Context',
      icon: Target,
      iconClassName: 'border-amber-200 bg-amber-50 text-amber-700',
      body: project.challenge[language],
    },
    {
      id: 'solution',
      title: t.portfolio.solution,
      eyebrow: language === 'nl' ? 'Aanpak' : 'Approach',
      icon: Sparkles,
      iconClassName: 'border-sky-200 bg-sky-50 text-sky-700',
      body: project.solution[language],
    },
    {
      id: 'results',
      title: t.portfolio.results,
      eyebrow: language === 'nl' ? 'Impact' : 'Impact',
      icon: BarChart3,
      iconClassName: 'border-emerald-200 bg-emerald-50 text-emerald-700',
      body: project.results[language],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero with Image Background */}
        <section className="py-10 relative overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src={heroImage}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(event) => {
                event.currentTarget.src = project.image;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/70" />
          </div>
          <div className="container mx-auto container-padding relative">
            <Link 
              to="/portfolio" 
              className="inline-flex items-center gap-2 text-primary hover:underline mb-4 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.portfolio.backToPortfolio}
            </Link>
            <h1 className="font-sans text-2xl md:text-3xl font-bold text-foreground mb-1">
              {project.title}
            </h1>
            <p className="text-muted-foreground">{project.category[language]}</p>
          </div>
        </section>

        <div className="section-divider" />

        <section className="py-8">
          <div className="container mx-auto container-padding">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
              <div className="relative">
                <div className="relative mx-auto max-w-[560px]">
                  <div className="rounded-[30px] bg-slate-950 p-3 shadow-[0_26px_80px_rgba(15,23,42,0.22)]">
                    <div className="rounded-[24px] bg-slate-900 p-2">
                      <div className="aspect-[16/10] overflow-hidden rounded-[20px] bg-slate-800">
                        <img
                          src={project.gallery[0] ?? project.image}
                          alt={`${project.title} preview`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-8 left-0 w-[120px] sm:w-[140px] rounded-[28px] bg-slate-950 p-2 shadow-[0_24px_60px_rgba(15,23,42,0.28)]">
                    <div className="rounded-[22px] bg-slate-900 p-1.5">
                      <div className="aspect-[9/19] overflow-hidden rounded-[18px] bg-slate-800">
                        <img
                          src={project.mobileImage ?? project.image}
                          alt={`${project.title} mobile preview`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {project.websiteUrl && (
                  <div className="mt-10 flex justify-center">
                    <Button asChild variant="outline" className="rounded-full border-primary/30 text-primary">
                      <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
                        {similarCopy.viewSite}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                )}
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                  {similarCopy.label}
                </p>
                <h3 className="mt-2 font-display text-2xl md:text-3xl font-bold text-slate-900">
                  {similarCopy.title}
                </h3>
                <p className="mt-2 text-sm md:text-base text-slate-600">
                  {similarCopy.subtitle}
                </p>

                <div className="mt-6">
                  {isSimilarSubmitted ? (
                    <div className="text-sm text-slate-600">
                      <p className="font-semibold text-slate-900">{similarCopy.successTitle}</p>
                      <p className="mt-2">{similarCopy.successBody}</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSimilarSubmit} className="space-y-4">
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="similar-name">{similarCopy.nameLabel}</Label>
                          <Input
                            id="similar-name"
                            value={similarForm.name}
                            onChange={(event) =>
                              setSimilarForm((prev) => ({ ...prev, name: event.target.value }))
                            }
                            placeholder={similarCopy.namePlaceholder}
                            className="h-11"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="similar-phone">{similarCopy.phoneLabel}</Label>
                          <Input
                            id="similar-phone"
                            value={similarForm.phone}
                            onChange={(event) =>
                              setSimilarForm((prev) => ({ ...prev, phone: event.target.value }))
                            }
                            placeholder={similarCopy.phonePlaceholder}
                            className="h-11"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="similar-email">{similarCopy.emailLabel}</Label>
                        <Input
                          id="similar-email"
                          type="email"
                          value={similarForm.email}
                          onChange={(event) =>
                            setSimilarForm((prev) => ({ ...prev, email: event.target.value }))
                          }
                          placeholder={similarCopy.emailPlaceholder}
                          className="h-11"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="similar-message">{similarCopy.messageLabel}</Label>
                        <Textarea
                          id="similar-message"
                          value={similarForm.message}
                          onChange={(event) =>
                            setSimilarForm((prev) => ({ ...prev, message: event.target.value }))
                          }
                          placeholder={similarCopy.messagePlaceholder}
                          rows={4}
                          className="resize-none"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={!isSimilarValid || isSimilarSubmitting}
                        className="h-11 w-full rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        {isSimilarSubmitting ? similarCopy.submittingLabel : similarCopy.submitLabel}
                      </Button>
                    </form>
                  )}
                </div>

                <div className="mt-6 border-t border-slate-200 pt-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                    {bundleLocale.label}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-3">
                    <span className="text-sm font-semibold text-slate-900">{bundle.name}</span>
                    <span className="text-sm font-semibold text-primary">{bundle.price}</span>
                    <span className="text-sm text-slate-600">{bundle.description}</span>
                  </div>
                  <ul className="mt-3 grid gap-2 text-sm text-slate-600">
                    {bundleFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-10 space-y-6">
              {project.kpis && project.kpis.length > 0 && (
                <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.06)] md:p-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                        {language === 'nl' ? 'Snel overzicht' : 'Quick snapshot'}
                      </p>
                      <h3 className="mt-1 font-sans text-xl font-bold text-slate-900">
                        {language === 'nl' ? 'Resultaten in cijfers' : 'Results in numbers'}
                      </h3>
                    </div>

                    <div className="hidden h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:flex">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {project.kpis.map((kpi) => (
                      <div
                        key={`${project.id}-${kpi.value}`}
                        className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-4 text-left shadow-sm"
                      >
                        <p className="font-display text-3xl font-bold leading-tight text-primary">
                          {kpi.value}
                        </p>
                        <p className="mt-1 text-sm leading-snug text-slate-600">
                          {kpi.label[language]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_16px_40px_rgba(15,23,42,0.06)]">
                <div className="border-b border-slate-200 bg-slate-50/80 px-5 py-4 md:px-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                    {language === 'nl' ? 'Van briefing naar resultaat' : 'From brief to result'}
                  </p>
                  <h3 className="mt-1 font-sans text-xl font-bold text-slate-900">
                    {language === 'nl' ? 'Compact projectverhaal' : 'Compact project story'}
                  </h3>
                </div>

                <div className="divide-y divide-slate-200">
                  {storySections.map((section) => {
                    const Icon = section.icon;
                    const copy = splitProjectCopy(section.body);

                    return (
                      <article key={section.id} className="p-5 md:p-6">
                        <div className="flex items-start gap-4">
                          <div
                            className={`mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border ${section.iconClassName}`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>

                          <div className="min-w-0">
                            <div className="flex flex-wrap items-center gap-2">
                              <h4 className="font-sans text-lg font-bold text-slate-900">
                                {section.title}
                              </h4>
                              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                                {section.eyebrow}
                              </span>
                            </div>

                            <p className="mt-3 text-[15px] leading-7 text-slate-700">
                              {copy.lead}
                            </p>

                            {copy.supporting.length > 0 && (
                              <div className="mt-3 space-y-2">
                                {copy.supporting.map((item) => (
                                  <div
                                    key={`${section.id}-${item}`}
                                    className="flex items-start gap-2 text-sm leading-6 text-slate-600"
                                  >
                                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                                    <span>{item}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-8 mt-8 border-t border-border/50">
              {prevProject ? (
                <Link 
                  to={`/portfolio/${prevProject.id}`} 
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t.portfolio.prevProject}
                </Link>
              ) : (
                <span />
              )}
              {nextProject ? (
                <Link 
                  to={`/portfolio/${nextProject.id}`} 
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                >
                  {t.portfolio.nextProject}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              ) : (
                <span />
              )}
            </div>
          </div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;

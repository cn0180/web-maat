import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTASection from '@/components/sections/CTASection';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProjectById, getNextProject, getPrevProject } from '@/data/projects';
import { usePageSeo } from '@/hooks/usePageSeo';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Laptop,
  Smartphone,
  Tablet,
  Target,
  Sparkles,
  BarChart3,
  Globe,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type PreviewDevice = 'desktop' | 'tablet' | 'mobile';
type BundleKey = 'starter' | 'growth' | 'custom';

const splitProjectCopy = (text: string) => {
  const parts =
    text.match(/[^.!?]+[.!?]?/g)?.map((part) => part.trim()).filter(Boolean) ?? [text];

  return {
    lead: parts[0] ?? text,
    supporting: parts.slice(1, 3),
  };
};

const getHostnameLabel = (url?: string) => {
  if (!url) return '';

  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
  }
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
  const project = getProjectById(id || '');
  const nextProject = getNextProject(id || '');
  const prevProject = getPrevProject(id || '');
  const heroImage = project?.screenshot || project?.gallery[0] || project?.image;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>('desktop');

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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
  };

  const previewModes = [
    { id: 'desktop' as const, label: language === 'nl' ? 'Laptop' : 'Laptop', icon: Laptop },
    { id: 'tablet' as const, label: language === 'nl' ? 'Tablet' : 'Tablet', icon: Tablet },
    { id: 'mobile' as const, label: language === 'nl' ? 'Telefoon' : 'Phone', icon: Smartphone },
  ];

  const frameClass =
    previewDevice === 'desktop'
      ? 'max-w-full rounded-xl p-2'
      : previewDevice === 'tablet'
        ? 'max-w-[520px] rounded-[1.6rem] p-2.5'
        : 'max-w-[320px] rounded-[2rem] p-2.5';
  const viewportClass =
    previewDevice === 'desktop'
      ? 'aspect-[4/3] rounded-lg'
      : previewDevice === 'tablet'
        ? 'aspect-[4/3] rounded-[1.3rem]'
        : 'aspect-[9/19] rounded-[1.6rem]';
  const websiteHost = getHostnameLabel(project.websiteUrl);
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
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Image Gallery */}
              <div className="relative">
                <div className="mb-3 flex flex-wrap gap-2">
                  {previewModes.map((mode) => {
                    const Icon = mode.icon;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setPreviewDevice(mode.id)}
                        className={`inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                          previewDevice === mode.id
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border bg-background text-foreground hover:border-primary/30 hover:bg-primary/5'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {mode.label}
                      </button>
                    );
                  })}
                </div>

                <div className={`mx-auto border border-slate-700 bg-slate-950 shadow-xl ${frameClass}`}>
                  <div className="mb-2 flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-xs text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="ml-2 truncate">{project.websiteUrl || project.title}</span>
                  </div>

                  <div className={`relative overflow-hidden border border-slate-700 bg-slate-800 ${viewportClass}`}>
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={project.gallery[currentImageIndex]}
                        alt={`${project.title} - ${currentImageIndex + 1}`}
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onError={(event) => {
                          event.currentTarget.src = project.image;
                        }}
                      />
                    </AnimatePresence>

                    {/* Gallery Navigation */}
                    {project.gallery.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-background transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>

                        {/* Image Indicators */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                          {project.gallery.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                index === currentImageIndex
                                  ? 'bg-white w-6'
                                  : 'bg-white/50 hover:bg-white/75'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Thumbnail Strip */}
                {project.gallery.length > 1 && (
                  <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                    {project.gallery.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                          index === currentImageIndex 
                            ? 'border-primary' 
                            : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                <div className="mt-6 rounded-[26px] border border-slate-200 bg-white p-5 shadow-[0_16px_40px_rgba(15,23,42,0.08)]">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                        {bundleLocale.label}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{bundleLocale.hint}</p>
                    </div>
                    <div className="rounded-2xl border border-primary/15 bg-primary/5 px-3 py-2 text-right">
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                        {bundle.name}
                      </p>
                      <p className="mt-1 font-display text-xl font-bold text-slate-900">
                        {bundle.price}
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    {bundle.description}
                  </p>

                  <ul className="mt-4 space-y-2 text-sm text-slate-700">
                    {bundleFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild className="mt-5 h-11 w-full rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90">
                    <Link to="/quote">{bundleLocale.cta}</Link>
                  </Button>
                </div>
              </div>

              {/* Project Details - Always visible */}
              <div className="space-y-6">
                <div>
                  <div className="rounded-[28px] border border-primary/12 bg-[radial-gradient(circle_at_top_right,_rgba(37,99,235,0.12),_transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(248,250,252,0.98)_100%)] p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)] md:p-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="max-w-2xl">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
                          {language === 'nl' ? 'Projectoverzicht' : 'Project overview'}
                        </p>
                        <p className="mt-3 text-[15px] leading-relaxed text-slate-700 md:text-lg">
                          {project.description[language]}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/70 bg-white/90 px-4 py-3 shadow-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                          {language === 'nl' ? 'Type project' : 'Project type'}
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-900">
                          {project.category[language]}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={`${project.id}-${tag}`}
                          className="inline-flex items-center rounded-full border border-primary/10 bg-white/75 px-3 py-1.5 text-xs font-semibold text-primary shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.websiteUrl && (
                      <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                        <Button
                          asChild
                          size="lg"
                          className="h-14 w-full justify-center rounded-2xl bg-primary text-base font-semibold text-primary-foreground shadow-[0_16px_35px_rgba(37,99,235,0.28)] hover:bg-primary/90"
                        >
                          <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
                            {language === 'nl' ? 'Bezoek live website' : 'Visit live website'}
                            <ExternalLink className="ml-2 h-5 w-5" />
                          </a>
                        </Button>

                        <a
                          href={project.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-primary/25 hover:text-primary"
                        >
                          <Globe className="h-4 w-4" />
                          {websiteHost}
                        </a>
                      </div>
                    )}
                  </div>
                </div>

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

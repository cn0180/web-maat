import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTASection from '@/components/sections/CTASection';
import { useLanguage } from '@/contexts/LanguageContext';
import { getProjectById, getNextProject, getPrevProject } from '@/data/projects';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ExternalLink, ChevronLeft, ChevronRight, Laptop, Smartphone, Tablet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type PreviewDevice = 'desktop' | 'tablet' | 'mobile';

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { t, language } = useLanguage();
  const project = getProjectById(id || '');
  const nextProject = getNextProject(id || '');
  const prevProject = getPrevProject(id || '');
  const heroImage = project?.screenshot || project?.gallery[0] || project?.image;
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previewDevice, setPreviewDevice] = useState<PreviewDevice>('desktop');

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
              </div>

              {/* Project Details - Always visible */}
              <div className="space-y-6">
                {/* Description */}
                <div>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description[language]}
                  </p>
                </div>

                {/* Challenge, Solution, Results */}
                <div className="space-y-4">
                  {project.kpis && project.kpis.length > 0 && (
                    <div className="bg-soft rounded-xl p-5">
                      <h3 className="font-sans text-base font-bold text-foreground mb-3">
                        {language === 'nl' ? 'Resultaten in cijfers' : 'Results in numbers'}
                      </h3>
                      <div className="grid grid-cols-3 gap-2">
                        {project.kpis.map((kpi) => (
                          <div key={`${project.id}-${kpi.value}`} className="rounded-lg border border-primary/10 bg-background/90 px-3 py-2 text-center">
                            <p className="font-display font-bold text-primary text-lg leading-tight">{kpi.value}</p>
                            <p className="text-xs text-muted-foreground leading-tight">{kpi.label[language]}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className="bg-soft rounded-xl p-5">
                    <h3 className="font-sans text-base font-bold text-foreground mb-2">
                      {t.portfolio.challenge}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.challenge[language]}
                    </p>
                  </div>
                  <div className="bg-soft rounded-xl p-5">
                    <h3 className="font-sans text-base font-bold text-foreground mb-2">
                      {t.portfolio.solution}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.solution[language]}
                    </p>
                  </div>
                  <div className="bg-soft rounded-xl p-5">
                    <h3 className="font-sans text-base font-bold text-foreground mb-2">
                      {t.portfolio.results}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.results[language]}
                    </p>
                  </div>
                </div>

                {/* Website Link */}
                {project.websiteUrl && (
                  <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer">
                      {t.portfolio.visitWebsite}
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                )}
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

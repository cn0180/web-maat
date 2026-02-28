import { Link } from 'react-router-dom';
import { ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import ctaBg from '@/assets/waarom.png';
import fallbackBg from '@/assets/Webmaat.png';

interface CTASectionProps {
  variant?: 'dark' | 'soft';
}

const CTASection = ({ variant = 'dark' }: CTASectionProps) => {
  const { language } = useLanguage();
  const isSoft = variant === 'soft';

  return (
    <section
      className={`relative overflow-hidden py-10 md:py-16 ${isSoft ? 'bg-soft' : 'isolate bg-slate-900'}`}
      style={isSoft ? undefined : { backgroundColor: '#0f172a' }}
    >
      {!isSoft && (
        <div className="absolute inset-0 z-0">
          <img
            src={ctaBg}
            alt="CTA achtergrond"
            className="w-full h-full object-cover object-center grayscale-[4%] brightness-[0.8] saturate-[1.08] contrast-[1.05]"
            onError={(event) => {
              const target = event.currentTarget;
              target.onerror = null;
              target.src = fallbackBg;
            }}
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
      )}

      <div className="container relative z-10 mx-auto container-padding">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
          <div className="max-w-xl">
            <h2 className={`font-display text-xl md:text-3xl font-bold mb-1.5 md:mb-2 ${isSoft ? 'text-foreground' : 'text-white'}`}>
              {language === 'nl' ? 'Klaar om te beginnen?' : 'Ready to get started?'}
            </h2>
            <p className={`text-sm md:text-base ${isSoft ? 'text-muted-foreground' : 'text-white/85'}`}>
              {language === 'nl' 
                ? 'Ontvang binnen 24 uur een persoonlijke offerte voor uw project.' 
                : 'Receive a personal quote for your project within 24 hours.'}
            </p>
          </div>
          <div className="grid w-full grid-cols-2 gap-3 md:w-auto">
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-11 px-4 md:h-12 md:px-6">
              <Link to="/quote">
                {language === 'nl' ? 'Vraag Offerte Aan' : 'Request Quote'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className={`w-full h-11 px-4 md:h-12 md:px-6 ${
                isSoft
                  ? 'border-primary/50 text-primary bg-primary/10 hover:bg-primary/15 hover:text-primary'
                  : 'border-primary/60 text-white bg-primary/25 hover:bg-primary/35 hover:text-white'
              }`}
            >
              <Link to="/contact">
                <MessageSquare className="mr-2 w-4 h-4" />
                {language === 'nl' ? 'Contact' : 'Contact Us'}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

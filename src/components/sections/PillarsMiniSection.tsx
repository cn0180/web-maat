import { useLanguage } from '@/contexts/LanguageContext';

const PillarsMiniSection = () => {
  const { language } = useLanguage();

  const pillars = [
    language === 'nl' ? 'Expertise' : 'Expertise',
    language === 'nl' ? 'Maatwerk' : 'Tailored',
    language === 'nl' ? 'Persoonlijk' : 'Personal',
    language === 'nl' ? 'Resultaat' : 'Results',
  ];

  return (
    <section className="py-6 md:py-8 bg-background">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {pillars.map((pillar) => (
            <div
              key={pillar}
              className="rounded-lg border border-primary/45 bg-background px-4 py-2.5 md:px-6 md:py-3 text-center shadow-sm"
            >
              <span className="text-sm md:text-base font-semibold text-foreground">{pillar}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PillarsMiniSection;

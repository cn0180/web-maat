import { useState } from 'react';
import { Send, Upload, X, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

const QuoteSection = () => {
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedBudget, setSelectedBudget] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);

  const websiteTypes = [
    { value: 'business', label: t.quote.form.websiteTypes.business },
    { value: 'webshop', label: t.quote.form.websiteTypes.webshop },
    { value: 'portfolio', label: t.quote.form.websiteTypes.portfolio },
    { value: 'landing', label: t.quote.form.websiteTypes.landing },
    { value: 'other', label: t.quote.form.websiteTypes.other },
  ];

  const styles = [
    { value: 'minimal', label: t.quote.form.styles.minimal },
    { value: 'colorful', label: t.quote.form.styles.colorful },
    { value: 'modern', label: t.quote.form.styles.modern },
    { value: 'classic', label: t.quote.form.styles.classic },
    { value: 'custom', label: t.quote.form.styles.custom },
  ];

  const budgets = [
    { value: 'starter', label: t.quote.form.budgets.starter },
    { value: 'medium', label: t.quote.form.budgets.medium },
    { value: 'premium', label: t.quote.form.budgets.premium },
    { value: 'enterprise', label: t.quote.form.budgets.enterprise },
    { value: 'unknown', label: t.quote.form.budgets.unknown },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles].slice(0, 5));
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <section className="section-padding">
        <div className="container mx-auto container-padding">
          <Card className="max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border-primary/20">
            <CardContent className="p-12 md:p-16 text-center">
              <div className="w-20 h-20 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
                {t.quote.form.success}
              </h3>
              <Button onClick={() => setIsSubmitted(false)} variant="outline" className="mt-6 border-primary/30">
                Nieuwe aanvraag
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container mx-auto container-padding">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Gratis & Vrijblijvend</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {t.quote.title}
          </h2>
          <p className="text-lg text-muted-foreground">
            {t.quote.subtitle}
          </p>
        </div>

        {/* Form */}
        <Card className="max-w-4xl mx-auto bg-card/50 backdrop-blur-sm border-border/50">
          <CardContent className="p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Contact Info */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground">{t.quote.form.name} *</Label>
                  <Input id="name" required placeholder="Jan Jansen" className="h-12 bg-background/50 border-border/50 focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-foreground">{t.quote.form.company}</Label>
                  <Input id="company" placeholder="Bedrijfsnaam B.V." className="h-12 bg-background/50 border-border/50 focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">{t.quote.form.email} *</Label>
                  <Input id="email" type="email" required placeholder="jan@bedrijf.nl" className="h-12 bg-background/50 border-border/50 focus:border-primary" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-foreground">{t.quote.form.phone}</Label>
                  <Input id="phone" type="tel" placeholder="+31 6 12345678" className="h-12 bg-background/50 border-border/50 focus:border-primary" />
                </div>
              </div>

              {/* Website Type */}
              <div className="space-y-4">
                <Label className="text-foreground">{t.quote.form.websiteType} *</Label>
                <div className="flex flex-wrap gap-3">
                  {websiteTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setSelectedType(type.value)}
                      className={cn(
                        'px-5 py-3 rounded-xl border text-sm font-medium transition-all',
                        selectedType === type.value
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border/50 bg-background/50 hover:border-primary/50 text-foreground'
                      )}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Style Preference */}
              <div className="space-y-4">
                <Label className="text-foreground">{t.quote.form.style} *</Label>
                <div className="flex flex-wrap gap-3">
                  {styles.map((style) => (
                    <button
                      key={style.value}
                      type="button"
                      onClick={() => setSelectedStyle(style.value)}
                      className={cn(
                        'px-5 py-3 rounded-xl border text-sm font-medium transition-all',
                        selectedStyle === style.value
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border/50 bg-background/50 hover:border-primary/50 text-foreground'
                      )}
                    >
                      {style.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div className="space-y-4">
                <Label className="text-foreground">{t.quote.form.budget}</Label>
                <div className="flex flex-wrap gap-3">
                  {budgets.map((budget) => (
                    <button
                      key={budget.value}
                      type="button"
                      onClick={() => setSelectedBudget(budget.value)}
                      className={cn(
                        'px-5 py-3 rounded-xl border text-sm font-medium transition-all',
                        selectedBudget === budget.value
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border/50 bg-background/50 hover:border-primary/50 text-foreground'
                      )}
                    >
                      {budget.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Deadline */}
              <div className="space-y-2">
                <Label htmlFor="deadline" className="text-foreground">{t.quote.form.deadline}</Label>
                <Input id="deadline" type="date" className="h-12 bg-background/50 border-border/50 focus:border-primary max-w-xs" />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description" className="text-foreground">{t.quote.form.description}</Label>
                <Textarea
                  id="description"
                  rows={5}
                  placeholder={t.quote.form.descriptionPlaceholder}
                  className="bg-background/50 border-border/50 focus:border-primary resize-none"
                />
              </div>

              {/* File Upload */}
              <div className="space-y-4">
                <Label className="text-foreground">{t.quote.form.files}</Label>
                <p className="text-sm text-muted-foreground">{t.quote.form.filesDescription}</p>
                
                <div className="border-2 border-dashed border-border/50 rounded-xl p-8 text-center hover:border-primary/50 transition-colors bg-background/30">
                  <input
                    type="file"
                    id="files"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="files" className="cursor-pointer">
                    <Upload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <span className="text-muted-foreground">
                      Klik om bestanden te selecteren (max 5)
                    </span>
                  </label>
                </div>

                {files.length > 0 && (
                  <div className="space-y-2">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-background/50 rounded-lg px-4 py-3 border border-border/50"
                      >
                        <span className="text-sm truncate text-foreground">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeFile(index)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit */}
              <Button type="submit" size="lg" className="w-full bg-gradient-gold hover:opacity-90 text-white shadow-lg h-14 text-base" disabled={isSubmitting}>
                {isSubmitting ? (
                  t.quote.form.submitting
                ) : (
                  <>
                    {t.quote.form.submit}
                    <Send className="ml-2 w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default QuoteSection;
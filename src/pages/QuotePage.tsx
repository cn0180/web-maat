import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, Upload, X, CheckCircle, ArrowLeft, ArrowRight, Mail, Phone, User, MapPin, Globe, Calendar, FileText, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { submitQuoteSubmission } from '@/lib/form-submissions';

const QuotePage = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [files, setFiles] = useState<File[]>([]);
  const [skipAutoAdvance, setSkipAutoAdvance] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    typeAanvraag: '',
    aanvraagVoor: '',
    naam: '',
    email: '',
    telefoon: '',
    plaats: '',
    websiteOfWebshop: '',
    webdesignerVoor: [] as string[],
    websiteFuncties: [] as string[],
    webshopFuncties: [] as string[],
    hulpMetInhoud: '',
    domeinnaamEnHosting: '',
    onderhoudNaOplevering: '',
    aantalPaginas: '',
    gewensteUrl: '',
    opleverdatum: '',
    projectOmschrijving: '',
  });

  const totalSteps = 7;

  const copy =
    language === 'nl'
      ? {
          typeAanvraagOptions: [
            { value: 'nieuwe-website', label: 'Nieuwe website' },
            { value: 'website-redesign', label: 'Website redesign' },
            { value: 'nieuwe-webshop', label: 'Nieuwe webshop' },
            { value: 'webshop-redesign', label: 'Webshop redesign' },
            { value: 'onderhoud', label: 'Onderhoud & updates' },
            { value: 'seo-optimalisatie', label: 'SEO optimalisatie' },
            { value: 'anders', label: 'Anders' },
          ],
          aanvraagVoorOptions: [
            { value: 'particulier', label: 'Particulier' },
            { value: 'zzp', label: 'ZZP\'er / Freelancer' },
            { value: 'mkb', label: 'MKB / Bedrijf' },
            { value: 'stichting', label: 'Stichting / Vereniging' },
            { value: 'overheid', label: 'Overheid / Gemeente' },
          ],
          websiteOfWebshopOptions: [
            { value: 'website', label: 'Website', description: 'Informatieve of zakelijke website' },
            { value: 'webshop', label: 'Webshop', description: 'Online verkopen van producten' },
            { value: 'beide', label: 'Website én webshop', description: 'Combinatie van beide' },
          ],
          webdesignerVoorOptions: [
            { value: 'volledig-ontwerp', label: 'Volledig nieuw ontwerp & ontwikkeling' },
            { value: 'redesign', label: 'Bestaande website vernieuwen' },
            { value: 'technische-aanpassingen', label: 'Technische aanpassingen' },
            { value: 'content-creatie', label: 'Content & copywriting' },
            { value: 'seo-marketing', label: 'SEO & online marketing' },
            { value: 'hosting-beheer', label: 'Hosting & domeinbeheer' },
          ],
          websiteFunctiesOptions: [
            { value: 'contactformulier', label: 'Contactformulier' },
            { value: 'blog', label: 'Blog / Nieuws' },
            { value: 'portfolio', label: 'Portfolio / Gallerij' },
            { value: 'reserveringen', label: 'Reserveringen' },
            { value: 'reviews', label: 'Klantreviews' },
            { value: 'social-media', label: 'Social media' },
            { value: 'nieuwsbrief', label: 'Nieuwsbrief' },
            { value: 'meertalig', label: 'Meertalig' },
          ],
          webshopFunctiesOptions: [
            { value: 'ideal', label: 'iDEAL betaling' },
            { value: 'creditcard', label: 'Creditcard' },
            { value: 'afterpay', label: 'Afterpay / Klarna' },
            { value: 'voorraad', label: 'Voorraadbeheer' },
            { value: 'kortingscodes', label: 'Kortingscodes' },
            { value: 'klantaccounts', label: 'Klantaccounts' },
            { value: 'track-trace', label: 'Track & Trace' },
            { value: 'filters', label: 'Productfilters' },
            { value: 'anders', label: 'Anders' },
          ],
          hulpMetInhoudOptions: [
            { value: 'ja-volledig', label: 'Ja, volledig (teksten + afbeeldingen)' },
            { value: 'ja-teksten', label: 'Ja, alleen teksten' },
            { value: 'ja-afbeeldingen', label: 'Ja, alleen afbeeldingen' },
            { value: 'nee', label: 'Nee, ik lever alles zelf aan' },
          ],
          domeinnaamEnHostingOptions: [
            { value: 'ja-beide', label: 'Ja, beide geregeld' },
            { value: 'alleen-domein', label: 'Alleen domeinnaam' },
            { value: 'alleen-hosting', label: 'Alleen hosting' },
            { value: 'nee', label: 'Nee, nog niet' },
            { value: 'hulp-nodig', label: 'Ik heb hulp nodig hierbij' },
          ],
          onderhoudOptions: [
            { value: 'ja', label: 'Ja, graag' },
            { value: 'nee', label: 'Nee, niet nodig' },
            { value: 'misschien', label: 'Afhankelijk van kosten' },
          ],
          aantalPaginasOptions: [
            { value: '1-5', label: '1 - 5 pagina\'s' },
            { value: '5-10', label: '5 - 10 pagina\'s' },
            { value: '10-20', label: '10 - 20 pagina\'s' },
            { value: '20-plus', label: 'Meer dan 20 pagina\'s' },
            { value: 'weet-niet', label: 'Weet ik nog niet' },
          ],
          opleverdatumOptions: [
            { value: 'zo-snel-mogelijk', label: 'Zo snel mogelijk' },
            { value: 'binnen-2-weken', label: 'Binnen 2 weken' },
            { value: 'binnen-maand', label: 'Binnen 1 maand' },
            { value: 'binnen-3-maanden', label: 'Binnen 3 maanden' },
            { value: 'binnen-6-maanden', label: 'Binnen 6 maanden' },
            { value: 'geen-deadline', label: 'Geen specifieke deadline' },
          ],
          stepTitles: [
            'Type project',
            'Contactgegevens',
            'Type website',
            'Diensten',
            'Functies',
            'Extra info',
            'Afronden',
          ],
          steps: {
            step0: {
              title: 'Wat voor type project betreft uw aanvraag?',
              subtitle: 'Selecteer de optie die het beste bij uw situatie past',
              customerLabel: 'Voor wie is deze aanvraag?',
              customerPlaceholder: 'Selecteer type klant',
            },
            step1: {
              title: 'Uw contactgegevens',
              subtitle: 'Zodat wij contact met u kunnen opnemen',
              nameLabel: 'Naam',
              namePlaceholder: 'Uw volledige naam',
              emailLabel: 'E-mailadres',
              emailPlaceholder: 'uw@email.nl',
              phoneLabel: 'Telefoonnummer',
              phonePlaceholder: '+31645457394',
              cityLabel: 'Plaats',
              cityPlaceholder: 'Uw woonplaats',
            },
            step2: {
              title: 'Wat voor type project heeft u in gedachten?',
              subtitle: 'Kies de optie die het beste aansluit bij uw wensen',
            },
            step3: {
              title: 'Waar kunnen wij u mee helpen?',
              subtitle: 'Selecteer alle opties die van toepassing zijn',
            },
            step4: {
              title: 'Gewenste functionaliteiten',
              subtitle: 'Welke functies wilt u op uw',
              websiteLabel: 'Website functies',
              webshopLabel: 'Webshop functies',
            },
            step5: {
              title: 'Extra informatie',
              subtitle: 'Enkele aanvullende vragen om uw project beter te begrijpen',
              contentLabel: 'Hulp met inhoud (teksten & afbeeldingen)?',
              domainLabel: 'Heeft u al domeinnaam en hosting?',
              maintenanceLabel: 'Onderhoud na oplevering gewenst?',
              pagesLabel: 'Aantal pagina\'s',
              selectPlaceholder: 'Selecteer een optie',
            },
            step6: {
              title: 'Laatste details',
              subtitle: 'Nog een paar vragen om uw aanvraag compleet te maken',
              urlLabel: 'Gewenste website URL',
              urlPlaceholder: 'bijv. www.mijnbedrijf.nl',
              deadlineLabel: 'Gewenste opleverdatum',
              deadlinePlaceholder: 'Selecteer een termijn',
              descriptionLabel: 'Projectomschrijving (optioneel)',
              descriptionPlaceholder: 'Beschrijf uw project, wensen of stel vragen...',
              uploadLabel: 'Documenten uploaden (optioneel)',
              uploadHelper: 'Klik om bestanden te selecteren (max 5)',
            },
          },
          header: {
            title: 'Offerte aanvragen',
            subtitle: 'Vul het formulier in en ontvang binnen 24 uur een vrijblijvende offerte',
            prompt: 'Niet zeker welk pakket past bij uw bedrijf?',
            link: 'Plan een gratis adviesgesprek',
          },
          progress: {
            step: 'Stap',
            of: 'van',
          },
          buttons: {
            prev: 'Vorige',
            next: 'Volgende',
            submitting: 'Versturen...',
            submit: 'Verstuur aanvraag',
          },
          trust: ['Vrijblijvend', 'Reactie binnen 24 uur', 'Persoonlijk advies'],
          success: {
            title: 'Bedankt! Uw aanvraag is succesvol verzonden',
            body:
              'Bedankt voor uw aanvraag. Wij nemen binnen 24 uur persoonlijk contact met u op om uw project te bespreken.',
            backHome: 'Terug naar homepage',
            newRequest: 'Nieuwe aanvraag indienen',
            imageAlt: 'Team aan het werk',
          },
        }
      : {
          typeAanvraagOptions: [
            { value: 'nieuwe-website', label: 'New website' },
            { value: 'website-redesign', label: 'Website redesign' },
            { value: 'nieuwe-webshop', label: 'New webshop' },
            { value: 'webshop-redesign', label: 'Webshop redesign' },
            { value: 'onderhoud', label: 'Maintenance & updates' },
            { value: 'seo-optimalisatie', label: 'SEO optimization' },
            { value: 'anders', label: 'Other' },
          ],
          aanvraagVoorOptions: [
            { value: 'particulier', label: 'Individual' },
            { value: 'zzp', label: 'Freelancer / self-employed' },
            { value: 'mkb', label: 'SME / Business' },
            { value: 'stichting', label: 'Foundation / Association' },
            { value: 'overheid', label: 'Government / Municipality' },
          ],
          websiteOfWebshopOptions: [
            { value: 'website', label: 'Website', description: 'Informational or business website' },
            { value: 'webshop', label: 'Webshop', description: 'Sell products online' },
            { value: 'beide', label: 'Website and webshop', description: 'Combination of both' },
          ],
          webdesignerVoorOptions: [
            { value: 'volledig-ontwerp', label: 'Full new design & development' },
            { value: 'redesign', label: 'Redesign existing website' },
            { value: 'technische-aanpassingen', label: 'Technical adjustments' },
            { value: 'content-creatie', label: 'Content & copywriting' },
            { value: 'seo-marketing', label: 'SEO & online marketing' },
            { value: 'hosting-beheer', label: 'Hosting & domain management' },
          ],
          websiteFunctiesOptions: [
            { value: 'contactformulier', label: 'Contact form' },
            { value: 'blog', label: 'Blog / News' },
            { value: 'portfolio', label: 'Portfolio / Gallery' },
            { value: 'reserveringen', label: 'Bookings' },
            { value: 'reviews', label: 'Customer reviews' },
            { value: 'social-media', label: 'Social media' },
            { value: 'nieuwsbrief', label: 'Newsletter' },
            { value: 'meertalig', label: 'Multilingual' },
          ],
          webshopFunctiesOptions: [
            { value: 'ideal', label: 'iDEAL payment' },
            { value: 'creditcard', label: 'Credit card' },
            { value: 'afterpay', label: 'Afterpay / Klarna' },
            { value: 'voorraad', label: 'Inventory management' },
            { value: 'kortingscodes', label: 'Discount codes' },
            { value: 'klantaccounts', label: 'Customer accounts' },
            { value: 'track-trace', label: 'Track & Trace' },
            { value: 'filters', label: 'Product filters' },
            { value: 'anders', label: 'Other' },
          ],
          hulpMetInhoudOptions: [
            { value: 'ja-volledig', label: 'Yes, fully (text + images)' },
            { value: 'ja-teksten', label: 'Yes, text only' },
            { value: 'ja-afbeeldingen', label: 'Yes, images only' },
            { value: 'nee', label: 'No, I will provide everything' },
          ],
          domeinnaamEnHostingOptions: [
            { value: 'ja-beide', label: 'Yes, both arranged' },
            { value: 'alleen-domein', label: 'Domain only' },
            { value: 'alleen-hosting', label: 'Hosting only' },
            { value: 'nee', label: 'No, not yet' },
            { value: 'hulp-nodig', label: 'I need help with this' },
          ],
          onderhoudOptions: [
            { value: 'ja', label: 'Yes, please' },
            { value: 'nee', label: 'No, not needed' },
            { value: 'misschien', label: 'Depends on costs' },
          ],
          aantalPaginasOptions: [
            { value: '1-5', label: '1 - 5 pages' },
            { value: '5-10', label: '5 - 10 pages' },
            { value: '10-20', label: '10 - 20 pages' },
            { value: '20-plus', label: 'More than 20 pages' },
            { value: 'weet-niet', label: 'Not sure yet' },
          ],
          opleverdatumOptions: [
            { value: 'zo-snel-mogelijk', label: 'As soon as possible' },
            { value: 'binnen-2-weken', label: 'Within 2 weeks' },
            { value: 'binnen-maand', label: 'Within 1 month' },
            { value: 'binnen-3-maanden', label: 'Within 3 months' },
            { value: 'binnen-6-maanden', label: 'Within 6 months' },
            { value: 'geen-deadline', label: 'No specific deadline' },
          ],
          stepTitles: [
            'Project type',
            'Contact details',
            'Website type',
            'Services',
            'Features',
            'Extra info',
            'Finish',
          ],
          steps: {
            step0: {
              title: 'What type of project is your request about?',
              subtitle: 'Select the option that best fits your situation',
              customerLabel: 'Who is this request for?',
              customerPlaceholder: 'Select client type',
            },
            step1: {
              title: 'Your contact details',
              subtitle: 'So we can get in touch with you',
              nameLabel: 'Name',
              namePlaceholder: 'Your full name',
              emailLabel: 'Email address',
              emailPlaceholder: 'you@email.com',
              phoneLabel: 'Phone number',
              phonePlaceholder: '+31645457394',
              cityLabel: 'City',
              cityPlaceholder: 'Your city',
            },
            step2: {
              title: 'What type of project do you have in mind?',
              subtitle: 'Choose the option that best matches your needs',
            },
            step3: {
              title: 'How can we help you?',
              subtitle: 'Select all options that apply',
            },
            step4: {
              title: 'Desired features',
              subtitle: 'Which features do you want on your',
              websiteLabel: 'Website features',
              webshopLabel: 'Webshop features',
            },
            step5: {
              title: 'Extra information',
              subtitle: 'A few additional questions to better understand your project',
              contentLabel: 'Help with content (text & images)?',
              domainLabel: 'Do you already have a domain and hosting?',
              maintenanceLabel: 'Maintenance after delivery?',
              pagesLabel: 'Number of pages',
              selectPlaceholder: 'Select an option',
            },
            step6: {
              title: 'Final details',
              subtitle: 'A few more questions to complete your request',
              urlLabel: 'Desired website URL',
              urlPlaceholder: 'e.g. www.yourcompany.com',
              deadlineLabel: 'Desired delivery date',
              deadlinePlaceholder: 'Select a timeframe',
              descriptionLabel: 'Project description (optional)',
              descriptionPlaceholder: 'Describe your project, wishes or questions...',
              uploadLabel: 'Upload documents (optional)',
              uploadHelper: 'Click to select files (max 5)',
            },
          },
          header: {
            title: 'Request a quote',
            subtitle: 'Fill in the form and receive a no-obligation quote within 24 hours',
            prompt: 'Not sure which package fits your business?',
            link: 'Plan a free strategy call',
          },
          progress: {
            step: 'Step',
            of: 'of',
          },
          buttons: {
            prev: 'Previous',
            next: 'Next',
            submitting: 'Sending...',
            submit: 'Send request',
          },
          trust: ['No obligation', 'Response within 24 hours', 'Personal advice'],
          success: {
            title: 'Thank you! Your request has been sent',
            body:
              'Thanks for your request. We will contact you personally within 24 hours to discuss your project.',
            backHome: 'Back to homepage',
            newRequest: 'Submit a new request',
            imageAlt: 'Team at work',
          },
        };

  const {
    typeAanvraagOptions,
    aanvraagVoorOptions,
    websiteOfWebshopOptions,
    webdesignerVoorOptions,
    websiteFunctiesOptions,
    webshopFunctiesOptions,
    hulpMetInhoudOptions,
    domeinnaamEnHostingOptions,
    onderhoudOptions,
    aantalPaginasOptions,
    opleverdatumOptions,
    stepTitles,
  } = copy;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles].slice(0, 5));
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleCheckboxChange = (field: 'webdesignerVoor' | 'websiteFuncties' | 'webshopFuncties', value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(v => v !== value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.naam || !formData.email || !formData.telefoon || !formData.opleverdatum) {
      toast({
        variant: 'destructive',
        title: language === 'nl' ? 'Formulier niet compleet' : 'Form incomplete',
        description:
          language === 'nl'
            ? 'Vul naam, e-mail, telefoon en opleverdatum in.'
            : 'Please complete name, email, phone and preferred deadline.',
      });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const result = await submitQuoteSubmission({
        name: formData.naam,
        email: formData.email,
        phone: formData.telefoon,
        city: formData.plaats,
        projectType: formData.typeAanvraag,
        requestFor: formData.aanvraagVoor,
        websiteType: formData.websiteOfWebshop,
        services: formData.webdesignerVoor,
        websiteFeatures: formData.websiteFuncties,
        webshopFeatures: formData.webshopFuncties,
        contentSupport: formData.hulpMetInhoud,
        domainAndHosting: formData.domeinnaamEnHosting,
        maintenanceAfterDelivery: formData.onderhoudNaOplevering,
        pageCount: formData.aantalPaginas,
        desiredUrl: formData.gewensteUrl,
        deadline: formData.opleverdatum,
        projectDescription: formData.projectOmschrijving,
        uploadedFiles: files.map((file) => ({
          name: file.name,
          size: file.size,
          type: file.type || 'application/octet-stream',
        })),
        language,
      });

      setIsSubmitted(true);
      toast({
        title: language === 'nl' ? 'Aanvraag verzonden' : 'Request submitted',
        description:
          language === 'nl'
            ? 'Uw offerteaanvraag is succesvol opgeslagen.'
            : 'Your quote request was stored successfully.',
      });

      if (!result.stored || !result.emailed) {
        const details = [
          result.storageError ? `Opslaan: ${result.storageError}` : null,
          result.emailError ? `E-mail: ${result.emailError}` : null,
        ]
          .filter(Boolean)
          .join(' • ');
        toast({
          variant: 'destructive',
          title: language === 'nl' ? 'Let op: verzending niet volledig' : 'Attention: delivery incomplete',
          description:
            language === 'nl'
              ? `We konden uw aanvraag niet volledig verwerken. ${details || ''} Mail ons op info@web-maat.nl.`
              : `We could not fully process your request. ${details || ''} Email us at info@web-maat.nl.`,
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: language === 'nl' ? 'Verzenden mislukt' : 'Submission failed',
        description:
          error instanceof Error
            ? error.message
            : language === 'nl'
              ? 'Er ging iets mis bij het versturen. Probeer opnieuw.'
              : 'Something went wrong while submitting. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 0:
        return Boolean(formData.typeAanvraag && formData.aanvraagVoor);
      case 1:
        return Boolean(formData.naam && formData.email && formData.telefoon);
      case 2:
        return Boolean(formData.websiteOfWebshop);
      case 3:
        return formData.webdesignerVoor.length > 0;
      case 4:
        if (formData.websiteOfWebshop === 'webshop') {
          return formData.webshopFuncties.length > 0;
        }
        if (formData.websiteOfWebshop === 'website') {
          return formData.websiteFuncties.length > 0;
        }
        if (formData.websiteOfWebshop === 'beide') {
          return formData.websiteFuncties.length > 0 && formData.webshopFuncties.length > 0;
        }
        return formData.websiteFuncties.length > 0 || formData.webshopFuncties.length > 0;
      case 5:
        return Boolean(
          formData.hulpMetInhoud &&
            formData.domeinnaamEnHosting &&
            formData.onderhoudNaOplevering &&
            formData.aantalPaginas
        );
      case 6:
        return Boolean(formData.opleverdatum);
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (!isStepComplete()) return;
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentStep > 0) {
      setSkipAutoAdvance(true);
      setCurrentStep(prev => prev - 1);
    }
  };

  // Auto-advance for single-select steps
  const handleSingleSelect = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSkipAutoAdvance(false);
  };

  // Auto-advance effect for single-select fields
  useEffect(() => {
    if (skipAutoAdvance) return;
    
    // Step 0: Type aanvraag - auto advance when both fields are filled
    if (currentStep === 0 && formData.typeAanvraag && formData.aanvraagVoor) {
      const timer = setTimeout(() => nextStep(), 400);
      return () => clearTimeout(timer);
    }
  }, [formData.typeAanvraag, formData.aanvraagVoor, formData.websiteOfWebshop, currentStep, skipAutoAdvance]);

  const resetForm = () => {
    setIsSubmitted(false);
    setCurrentStep(0);
    setFormData({
      typeAanvraag: '',
      aanvraagVoor: '',
      naam: '',
      email: '',
      telefoon: '',
      plaats: '',
      websiteOfWebshop: '',
      webdesignerVoor: [],
      websiteFuncties: [],
      webshopFuncties: [],
      hulpMetInhoud: '',
      domeinnaamEnHosting: '',
      onderhoudNaOplevering: '',
      aantalPaginas: '',
      gewensteUrl: '',
      opleverdatum: '',
      projectOmschrijving: '',
    });
    setFiles([]);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col">
          {/* Hero Section */}
          <section className="relative py-20 md:py-28 overflow-hidden flex-1 flex items-center">
            <div className="absolute inset-0">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80" 
                alt={copy.success.imageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
            </div>
            <div className="container mx-auto container-padding relative">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h1 className="font-sans text-2xl md:text-3xl font-bold text-foreground mb-3">
                  {copy.success.title}
                </h1>
                <p className="text-muted-foreground mb-8">
                  {copy.success.body}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link to="/">
                      <Home className="w-4 h-4 mr-2" />
                      {copy.success.backHome}
                    </Link>
                  </Button>
                  <Button onClick={resetForm} variant="outline" size="lg">
                    <FileText className="w-4 h-4 mr-2" />
                    {copy.success.newRequest}
                  </Button>
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const renderStep = () => {
    const stepVariants = {
      initial: { opacity: 0, x: 20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -20 }
    };

    switch (currentStep) {
      case 0:
        return (
          <motion.div key="step-0" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-foreground">{copy.steps.step0.title}</h2>
              <p className="text-sm text-muted-foreground">{copy.steps.step0.subtitle}</p>
            </div>
            
            <div className="grid gap-2">
              {typeAanvraagOptions.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSingleSelect('typeAanvraag', opt.value)}
                  className={cn(
                    'w-full p-3 rounded-lg border text-left transition-all flex items-center gap-3 text-sm',
                    formData.typeAanvraag === opt.value
                      ? 'border-primary bg-primary/5 ring-1 ring-primary'
                      : 'border-border bg-background hover:border-primary/50'
                  )}
                >
                  <div className={cn(
                    'w-4 h-4 rounded-full border-2 flex-shrink-0',
                    formData.typeAanvraag === opt.value
                      ? 'border-primary bg-primary'
                      : 'border-muted-foreground'
                  )}>
                    {formData.typeAanvraag === opt.value && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>
                    )}
                  </div>
                  <span className="text-foreground">{opt.label}</span>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-border">
              <Label className="text-sm text-muted-foreground mb-2 block">{copy.steps.step0.customerLabel}</Label>
              <Select value={formData.aanvraagVoor} onValueChange={(v) => handleSingleSelect('aanvraagVoor', v)}>
                <SelectTrigger className="h-10 bg-background">
                  <SelectValue placeholder={copy.steps.step0.customerPlaceholder} />
                </SelectTrigger>
                <SelectContent className="bg-card border-border z-50">
                  {aanvraagVoorOptions.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        );

      case 1:
        return (
          <motion.div key="step-1" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-foreground">{copy.steps.step1.title}</h2>
              <p className="text-sm text-muted-foreground">{copy.steps.step1.subtitle}</p>
            </div>
            
            <div className="grid gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="naam" className="flex items-center gap-2 text-sm font-medium">
                  <User className="w-4 h-4 text-muted-foreground" /> {copy.steps.step1.nameLabel} *
                </Label>
                <Input 
                  id="naam" 
                  required 
                  value={formData.naam}
                  onChange={(e) => setFormData(prev => ({ ...prev, naam: e.target.value }))}
                  placeholder={copy.steps.step1.namePlaceholder} 
                  className="h-10" 
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                  <Mail className="w-4 h-4 text-muted-foreground" /> {copy.steps.step1.emailLabel} *
                </Label>
                <Input 
                  id="email" 
                  type="email"
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  placeholder={copy.steps.step1.emailPlaceholder} 
                  className="h-10" 
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="telefoon" className="flex items-center gap-2 text-sm font-medium">
                  <Phone className="w-4 h-4 text-muted-foreground" /> {copy.steps.step1.phoneLabel} *
                </Label>
                <Input 
                  id="telefoon" 
                  type="tel"
                  required 
                  value={formData.telefoon}
                  onChange={(e) => setFormData(prev => ({ ...prev, telefoon: e.target.value }))}
                  placeholder={copy.steps.step1.phonePlaceholder} 
                  className="h-10" 
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="plaats" className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="w-4 h-4 text-muted-foreground" /> {copy.steps.step1.cityLabel}
                </Label>
                <Input 
                  id="plaats" 
                  value={formData.plaats}
                  onChange={(e) => setFormData(prev => ({ ...prev, plaats: e.target.value }))}
                  placeholder={copy.steps.step1.cityPlaceholder} 
                  className="h-10" 
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div key="step-2" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-foreground">{copy.steps.step2.title}</h2>
              <p className="text-sm text-muted-foreground">{copy.steps.step2.subtitle}</p>
            </div>
            
            <div className="grid gap-2">
              {websiteOfWebshopOptions.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => handleSingleSelect('websiteOfWebshop', opt.value)}
                  className={cn(
                    'w-full p-4 rounded-lg border text-left transition-all',
                    formData.websiteOfWebshop === opt.value
                      ? 'border-primary bg-primary/5 ring-1 ring-primary'
                      : 'border-border bg-background hover:border-primary/50'
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      'w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5',
                      formData.websiteOfWebshop === opt.value
                        ? 'border-primary bg-primary'
                        : 'border-muted-foreground'
                    )}>
                      {formData.websiteOfWebshop === opt.value && (
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                    <div>
                      <span className="font-semibold text-foreground block text-sm">{opt.label}</span>
                      <span className="text-xs text-muted-foreground">{opt.description}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div key="step-3" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-foreground">{copy.steps.step3.title}</h2>
              <p className="text-sm text-muted-foreground">{copy.steps.step3.subtitle}</p>
            </div>
            
            <div className="grid gap-2">
              {webdesignerVoorOptions.map(opt => (
                <label
                  key={opt.value}
                  className={cn(
                    'flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all text-sm',
                    formData.webdesignerVoor.includes(opt.value)
                      ? 'border-primary bg-primary/5'
                      : 'border-border bg-background hover:border-primary/50'
                  )}
                >
                  <Checkbox 
                    checked={formData.webdesignerVoor.includes(opt.value)}
                    onCheckedChange={(checked) => handleCheckboxChange('webdesignerVoor', opt.value, checked as boolean)}
                  />
                  <span className="text-foreground">{opt.label}</span>
                </label>
              ))}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div key="step-4" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-foreground">{copy.steps.step4.title}</h2>
              <p className="text-sm text-muted-foreground">
                {copy.steps.step4.subtitle} {formData.websiteOfWebshop === 'webshop' ? 'webshop' : 'website'}?
              </p>
            </div>
            
            {(formData.websiteOfWebshop === 'website' || formData.websiteOfWebshop === 'beide' || !formData.websiteOfWebshop) && (
              <div className="space-y-2">
                <Label className="text-xs font-semibold text-muted-foreground">{copy.steps.step4.websiteLabel}</Label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {websiteFunctiesOptions.map(opt => (
                    <label
                      key={opt.value}
                      className={cn(
                        'flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all text-sm',
                        formData.websiteFuncties.includes(opt.value)
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-background hover:border-primary/50'
                      )}
                    >
                      <Checkbox 
                        checked={formData.websiteFuncties.includes(opt.value)}
                        onCheckedChange={(checked) => handleCheckboxChange('websiteFuncties', opt.value, checked as boolean)}
                      />
                      <span className="text-foreground text-sm">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {(formData.websiteOfWebshop === 'webshop' || formData.websiteOfWebshop === 'beide') && (
              <div className="space-y-2 pt-3 border-t border-border">
                <Label className="text-xs font-semibold text-muted-foreground">{copy.steps.step4.webshopLabel}</Label>
                <div className="grid sm:grid-cols-2 gap-2">
                  {webshopFunctiesOptions.map(opt => (
                    <label
                      key={opt.value}
                      className={cn(
                        'flex items-center gap-2 p-2.5 rounded-lg border cursor-pointer transition-all text-sm',
                        formData.webshopFuncties.includes(opt.value)
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-background hover:border-primary/50'
                      )}
                    >
                      <Checkbox 
                        checked={formData.webshopFuncties.includes(opt.value)}
                        onCheckedChange={(checked) => handleCheckboxChange('webshopFuncties', opt.value, checked as boolean)}
                      />
                      <span className="text-foreground text-sm">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        );

      case 5:
        return (
          <motion.div key="step-5" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-foreground">{copy.steps.step5.title}</h2>
              <p className="text-sm text-muted-foreground">{copy.steps.step5.subtitle}</p>
            </div>
            
            <div className="grid gap-3">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium">{copy.steps.step5.contentLabel}</Label>
                <Select value={formData.hulpMetInhoud} onValueChange={(v) => setFormData(prev => ({ ...prev, hulpMetInhoud: v }))}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder={copy.steps.step5.selectPlaceholder} />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border z-50">
                    {hulpMetInhoudOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium">{copy.steps.step5.domainLabel}</Label>
                <Select value={formData.domeinnaamEnHosting} onValueChange={(v) => setFormData(prev => ({ ...prev, domeinnaamEnHosting: v }))}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder={copy.steps.step5.selectPlaceholder} />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border z-50">
                    {domeinnaamEnHostingOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium">{copy.steps.step5.maintenanceLabel}</Label>
                <Select value={formData.onderhoudNaOplevering} onValueChange={(v) => setFormData(prev => ({ ...prev, onderhoudNaOplevering: v }))}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder={copy.steps.step5.selectPlaceholder} />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border z-50">
                    {onderhoudOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium">{copy.steps.step5.pagesLabel}</Label>
                <Select value={formData.aantalPaginas} onValueChange={(v) => setFormData(prev => ({ ...prev, aantalPaginas: v }))}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder={copy.steps.step5.selectPlaceholder} />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border z-50">
                    {aantalPaginasOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </motion.div>
        );

      case 6:
        return (
          <motion.div key="step-6" variants={stepVariants} initial="initial" animate="animate" exit="exit" className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-foreground">{copy.steps.step6.title}</h2>
              <p className="text-sm text-muted-foreground">{copy.steps.step6.subtitle}</p>
            </div>
            
            <div className="grid gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="url" className="flex items-center gap-2 text-sm font-medium">
                  <Globe className="w-4 h-4 text-muted-foreground" /> {copy.steps.step6.urlLabel}
                </Label>
                <Input 
                  id="url" 
                  value={formData.gewensteUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, gewensteUrl: e.target.value }))}
                  placeholder={copy.steps.step6.urlPlaceholder} 
                  className="h-10" 
                />
              </div>

              <div className="space-y-1.5">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="w-4 h-4 text-muted-foreground" /> {copy.steps.step6.deadlineLabel} *
                </Label>
                <Select value={formData.opleverdatum} onValueChange={(v) => setFormData(prev => ({ ...prev, opleverdatum: v }))}>
                  <SelectTrigger className="h-10">
                    <SelectValue placeholder={copy.steps.step6.deadlinePlaceholder} />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border z-50">
                    {opleverdatumOptions.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="omschrijving" className="text-sm font-medium">{copy.steps.step6.descriptionLabel}</Label>
                <Textarea
                  id="omschrijving"
                  value={formData.projectOmschrijving}
                  onChange={(e) => setFormData(prev => ({ ...prev, projectOmschrijving: e.target.value }))}
                  placeholder={copy.steps.step6.descriptionPlaceholder}
                  rows={3}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">{copy.steps.step6.uploadLabel}</Label>
                
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                  <input
                    type="file"
                    id="files"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="files" className="cursor-pointer">
                    <Upload className="w-6 h-6 text-muted-foreground mx-auto mb-1" />
                    <span className="text-xs text-muted-foreground">
                      {copy.steps.step6.uploadHelper}
                    </span>
                  </label>
                </div>

                {files.length > 0 && (
                  <div className="space-y-1">
                    {files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-muted/50 rounded-lg px-3 py-2"
                      >
                        <span className="text-xs truncate text-foreground">{file.name}</span>
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
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-16 flex flex-col">
        {/* Full-screen Quote Form */}
        <section className="flex-1 flex flex-col bg-gradient-to-b from-muted/30 to-background">
          {/* Header */}
          <div className="py-6 border-b border-border bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto container-padding">
              <h1 className="font-sans text-2xl md:text-3xl font-bold text-foreground text-center mb-1">
                {copy.header.title}
              </h1>
              <p className="text-sm text-muted-foreground text-center">
                {copy.header.subtitle}
              </p>
            </div>
          </div>

          {/* Progress */}
          <div className="py-3 bg-muted/50 border-b border-border sticky top-14 z-10 backdrop-blur-sm">
            <div className="container mx-auto container-padding max-w-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-foreground">
                  {copy.progress.step} {currentStep + 1} {copy.progress.of} {totalSteps}
                </span>
                <span className="text-sm text-muted-foreground">{stepTitles[currentStep]}</span>
              </div>
              <div className="w-full bg-border rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Form - Centered and prominent */}
          <div className="flex-1 flex items-center justify-center py-8">
            <div className="container mx-auto container-padding">
              <div className="max-w-xl mx-auto">
                <form onSubmit={handleSubmit}>
                  <Card className="border-primary/20 shadow-xl bg-card">
                    <CardContent className="p-6 md:p-8">
                      <AnimatePresence mode="wait">
                        {renderStep()}
                      </AnimatePresence>

                      {/* Navigation */}
                      <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={prevStep}
                          disabled={currentStep === 0}
                          className="gap-2 h-11 px-6"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          {copy.buttons.prev}
                        </Button>

                        {currentStep < totalSteps - 1 ? (
                          <Button
                            type="button"
                            onClick={nextStep}
                            disabled={!isStepComplete()}
                            className="bg-primary hover:bg-primary/90 gap-2 h-11 px-6 text-base"
                          >
                            {copy.buttons.next}
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        ) : (
                          <Button
                            type="submit"
                            disabled={isSubmitting || !isStepComplete()}
                            className="bg-primary hover:bg-primary/90 gap-2 h-11 px-6 text-base"
                          >
                            {isSubmitting ? (
                              <>{copy.buttons.submitting}</>
                            ) : (
                              <>
                                {copy.buttons.submit}
                                <Send className="w-4 h-4" />
                              </>
                            )}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </form>

                {/* Trust indicators */}
                <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>{copy.trust[0]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>{copy.trust[1]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>{copy.trust[2]}</span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground text-center">
                  {copy.header.prompt}{' '}
                  <Link to="/contact" className="text-primary hover:underline font-medium">
                    {copy.header.link}
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default QuotePage;

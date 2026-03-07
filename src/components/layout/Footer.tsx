import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Mail, Phone, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import logo from '@/assets/logo.png';

type LegalTab = 'privacy' | 'terms';

type LegalSection = {
  title: string;
  body: string;
  points?: string[];
};

type LegalDocument = {
  intro: string;
  sections: LegalSection[];
};

const legalDocuments: Record<'nl' | 'en', Record<LegalTab, LegalDocument>> = {
  nl: {
    privacy: {
      intro:
        'Wij gaan zorgvuldig om met persoonsgegevens. In dit privacybeleid leggen wij uit welke gegevens wij verwerken, waarom wij dat doen en welke rechten u heeft.',
      sections: [
        {
          title: '1. Welke gegevens wij verzamelen',
          body: 'Wij verzamelen alleen gegevens die nodig zijn om onze diensten uit te voeren en contact met u te onderhouden.',
          points: [
            'Naam, e-mailadres en telefoonnummer',
            'Bedrijfsgegevens en projectinformatie',
            'Technische gegevens zoals IP-adres en browsergegevens',
            'Berichten die u met ons deelt via formulieren of WhatsApp',
          ],
        },
        {
          title: '2. Waarom wij uw gegevens gebruiken',
          body: 'Wij gebruiken uw gegevens uitsluitend voor duidelijke en legitieme doeleinden.',
          points: [
            'Opstellen van offertes en uitvoeren van opdrachten',
            'Communicatie over lopende projecten en support',
            'Verbetering van websiteprestaties en gebruikservaring',
            'Naleven van wettelijke verplichtingen',
          ],
        },
        {
          title: '3. Bewaartermijnen',
          body:
            'Wij bewaren persoonsgegevens niet langer dan nodig. Gegevens die gekoppeld zijn aan facturatie bewaren wij conform fiscale bewaartermijnen.',
        },
        {
          title: '4. Delen met derden',
          body:
            'Wij delen gegevens alleen met partijen die nodig zijn voor onze dienstverlening, zoals hosting- en e-mailproviders. Met deze partijen maken wij passende afspraken.',
        },
        {
          title: '5. Uw rechten',
          body: 'U heeft altijd controle over uw persoonsgegevens.',
          points: [
            'Inzage in uw gegevens',
            'Correctie of verwijdering van gegevens',
            'Bezwaar maken tegen verwerking',
            'Intrekken van toestemming (waar van toepassing)',
          ],
        },
        {
          title: '6. Beveiliging',
          body:
            'Wij nemen passende technische en organisatorische maatregelen om persoonsgegevens te beschermen tegen verlies, misbruik en ongeoorloofde toegang.',
        },
        {
          title: '7. Contact',
          body:
            'Vragen over privacy of een verzoek rondom uw gegevens? Neem contact met ons op via info@webstudio.nl. Wij reageren zo snel mogelijk.',
        },
      ],
    },
    terms: {
      intro:
        'Deze algemene voorwaarden zijn van toepassing op alle offertes, opdrachten en diensten van Web-Maat Creations, tenzij schriftelijk anders overeengekomen.',
      sections: [
        {
          title: '1. Toepasselijkheid',
          body:
            'Door een offerte goed te keuren, gaat u akkoord met deze voorwaarden. Eventuele inkoopvoorwaarden van de opdrachtgever zijn alleen geldig als wij die schriftelijk accepteren.',
        },
        {
          title: '2. Offertes en akkoord',
          body:
            'Offertes zijn vrijblijvend en 14 dagen geldig, tenzij anders vermeld. Een opdracht is definitief na schriftelijke of digitale bevestiging.',
        },
        {
          title: '3. Uitvoering en oplevering',
          body:
            'Wij voeren werkzaamheden uit op basis van afgesproken scope en planning. Opleverdata zijn streefdata, tenzij expliciet als harde deadline bevestigd.',
        },
        {
          title: '4. Betaling',
          body:
            'Facturen dienen binnen 14 dagen te worden voldaan, tenzij anders overeengekomen. Bij te late betaling kunnen wij werkzaamheden tijdelijk opschorten.',
        },
        {
          title: '5. Wijzigingen en meerwerk',
          body:
            'Aanpassingen buiten de afgesproken scope gelden als meerwerk. Meerwerk wordt vooraf afgestemd en apart gefactureerd.',
        },
        {
          title: '6. Aansprakelijkheid',
          body:
            'Onze aansprakelijkheid is beperkt tot het factuurbedrag van het betreffende onderdeel van de opdracht, behalve in gevallen van opzet of grove nalatigheid.',
        },
        {
          title: '7. Onderhoud en support',
          body:
            'Onderhoud, updates en support vallen alleen onder de overeenkomst als dit expliciet in de offerte of SLA is opgenomen.',
        },
        {
          title: '8. Beëindiging',
          body:
            'Beide partijen kunnen de samenwerking schriftelijk beëindigen. Reeds uitgevoerde werkzaamheden en gemaakte kosten blijven verschuldigd.',
        },
        {
          title: '9. Toepasselijk recht',
          body:
            'Op alle overeenkomsten is Nederlands recht van toepassing. Geschillen worden voorgelegd aan de bevoegde rechter in Nederland.',
        },
      ],
    },
  },
  en: {
    privacy: {
      intro:
        'We handle personal data with care. This privacy policy explains what data we process, why we process it, and which rights you have.',
      sections: [
        {
          title: '1. Data we collect',
          body: 'We only collect data required to provide our services and maintain communication.',
          points: [
            'Name, email address, and phone number',
            'Company details and project information',
            'Technical data such as IP address and browser metadata',
            'Messages shared via forms or WhatsApp',
          ],
        },
        {
          title: '2. Why we use your data',
          body: 'We process your data for clear and legitimate purposes only.',
          points: [
            'Preparing quotes and delivering projects',
            'Project communication and support',
            'Improving website performance and user experience',
            'Complying with legal obligations',
          ],
        },
        {
          title: '3. Retention periods',
          body:
            'We do not keep personal data longer than necessary. Data related to invoicing is retained according to legal retention requirements.',
        },
        {
          title: '4. Sharing with third parties',
          body:
            'We only share data with providers needed for our services, such as hosting and email partners. We maintain proper data processing agreements where required.',
        },
        {
          title: '5. Your rights',
          body: 'You remain in control of your personal data.',
          points: [
            'Right of access',
            'Right to correction or deletion',
            'Right to object to processing',
            'Right to withdraw consent (where applicable)',
          ],
        },
        {
          title: '6. Security',
          body:
            'We apply appropriate technical and organizational measures to protect data against loss, misuse, and unauthorized access.',
        },
        {
          title: '7. Contact',
          body:
            'Questions about privacy or data requests? Contact us at info@webstudio.nl and we will respond as quickly as possible.',
        },
      ],
    },
    terms: {
      intro:
        'These terms and conditions apply to all quotes, assignments, and services provided by Web-Maat Creations unless agreed otherwise in writing.',
      sections: [
        {
          title: '1. Applicability',
          body:
            'By approving a quote, you accept these terms. Any purchasing terms from the client apply only if accepted by us in writing.',
        },
        {
          title: '2. Quotes and acceptance',
          body:
            'Quotes are non-binding and valid for 14 days unless stated otherwise. An assignment becomes final after written or digital confirmation.',
        },
        {
          title: '3. Execution and delivery',
          body:
            'Work is performed according to agreed scope and planning. Delivery dates are target dates unless explicitly confirmed as fixed deadlines.',
        },
        {
          title: '4. Payment',
          body:
            'Invoices are payable within 14 days unless agreed otherwise. In case of late payment, we may temporarily suspend work.',
        },
        {
          title: '5. Changes and additional work',
          body:
            'Requests outside the agreed scope are treated as additional work. Additional work is aligned in advance and billed separately.',
        },
        {
          title: '6. Liability',
          body:
            'Our liability is limited to the invoice value of the relevant part of the assignment, except in cases of intent or gross negligence.',
        },
        {
          title: '7. Maintenance and support',
          body:
            'Maintenance, updates, and support are included only if explicitly stated in the quote or SLA.',
        },
        {
          title: '8. Termination',
          body:
            'Both parties may terminate cooperation in writing. Work already performed and costs incurred remain payable.',
        },
        {
          title: '9. Governing law',
          body:
            'All agreements are governed by Dutch law. Disputes are submitted to the competent court in the Netherlands.',
        },
      ],
    },
  },
};

const Footer = () => {
  const { t, language } = useLanguage();
  const [isLegalDialogOpen, setIsLegalDialogOpen] = useState(false);
  const [activeLegalTab, setActiveLegalTab] = useState<LegalTab>('privacy');

  const openLegalDialog = (tab: LegalTab) => {
    setActiveLegalTab(tab);
    setIsLegalDialogOpen(true);
  };

  const legalContent = legalDocuments[language];

  return (
    <footer className="bg-foreground text-background py-6">
      <div className="container mx-auto container-padding">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Quick Links */}
          <nav className="flex flex-wrap items-center gap-4 text-xs">
            <Link to="/" className="shrink-0">
              <img
                src={logo}
                alt="Web-Maat Creations"
                className="w-8 h-8 rounded-full object-cover"
              />
            </Link>
            <Link to="/" className="text-background/70 hover:text-primary transition-colors">{t.nav.home}</Link>
            <Link to="/services" className="text-background/70 hover:text-primary transition-colors">{t.nav.services}</Link>
            <Link to="/portfolio" className="text-background/70 hover:text-primary transition-colors">{t.nav.portfolio}</Link>
            <Link to="/about" className="text-background/70 hover:text-primary transition-colors">{t.nav.about}</Link>
            <Link to="/quote" className="text-background/70 hover:text-primary transition-colors">{t.nav.quote}</Link>
          </nav>

          {/* Contact */}
          <div className="flex items-center gap-3 text-xs">
            <a href="tel:+31612345678" className="flex items-center gap-1.5 text-background/70 hover:text-primary transition-colors">
              <Phone className="w-3 h-3" />
              <span>+31 6 12345678</span>
            </a>
            <a href="mailto:info@webstudio.nl" className="flex items-center gap-1.5 text-background/70 hover:text-primary transition-colors">
              <Mail className="w-3 h-3" />
              <span>info@webstudio.nl</span>
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-4 pt-4 border-t border-background/10 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-background/50">
          <p>© 2026 Web-Maat Creations. Alle rechten voorbehouden.</p>
          <div className="flex flex-nowrap gap-3 whitespace-nowrap">
            <button
              type="button"
              onClick={() => openLegalDialog('privacy')}
              className="hover:text-primary transition-colors"
            >
              {t.footer.privacy}
            </button>
            <button
              type="button"
              onClick={() => openLegalDialog('terms')}
              className="hover:text-primary transition-colors"
            >
              {t.footer.terms}
            </button>
          </div>
        </div>
      </div>

      <Dialog open={isLegalDialogOpen} onOpenChange={setIsLegalDialogOpen}>
        <DialogContent className="w-[95vw] max-w-4xl border border-slate-700 bg-slate-950 p-0 text-slate-100">
          <div className="border-b border-slate-800 bg-slate-900/80 px-5 py-4 md:px-6">
            <DialogHeader className="text-left">
              <DialogTitle className="text-lg font-bold text-white md:text-xl">
                {language === 'nl' ? 'Juridische informatie' : 'Legal information'}
              </DialogTitle>
              <DialogDescription className="text-slate-300">
                {language === 'nl'
                  ? 'Lees ons privacybeleid en de algemene voorwaarden in een overzichtelijke popup.'
                  : 'Read our privacy policy and terms in a structured popup.'}
              </DialogDescription>
            </DialogHeader>
          </div>

          <Tabs
            value={activeLegalTab}
            onValueChange={(value) => setActiveLegalTab(value as LegalTab)}
            className="px-5 pb-5 pt-4 md:px-6 md:pb-6"
          >
            <TabsList className="grid w-full grid-cols-2 bg-slate-900 p-1">
              <TabsTrigger
                value="privacy"
                className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <ShieldCheck className="h-4 w-4" />
                {t.footer.privacy}
              </TabsTrigger>
              <TabsTrigger
                value="terms"
                className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                <FileText className="h-4 w-4" />
                {t.footer.terms}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="privacy" className="mt-4">
              <ScrollArea className="h-[58vh] pr-3">
                <div className="space-y-4 pb-2">
                  <p className="text-sm leading-relaxed text-slate-300">{legalContent.privacy.intro}</p>
                  {legalContent.privacy.sections.map((section) => (
                    <article key={section.title} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                      <h4 className="text-sm font-semibold text-white md:text-base">{section.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">{section.body}</p>
                      {section.points && (
                        <ul className="mt-3 space-y-1 text-sm text-slate-200">
                          {section.points.map((point) => (
                            <li key={point} className="flex gap-2">
                              <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="terms" className="mt-4">
              <ScrollArea className="h-[58vh] pr-3">
                <div className="space-y-4 pb-2">
                  <p className="text-sm leading-relaxed text-slate-300">{legalContent.terms.intro}</p>
                  {legalContent.terms.sections.map((section) => (
                    <article key={section.title} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                      <h4 className="text-sm font-semibold text-white md:text-base">{section.title}</h4>
                      <p className="mt-2 text-sm leading-relaxed text-slate-300">{section.body}</p>
                      {section.points && (
                        <ul className="mt-3 space-y-1 text-sm text-slate-200">
                          {section.points.map((point) => (
                            <li key={point} className="flex gap-2">
                              <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;

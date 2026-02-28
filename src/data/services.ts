import { Globe, ShoppingCart, Search, Wrench, Server, Share2, BarChart, Target, Mail, Palette, Bot, Monitor, Smartphone, Zap, Package } from 'lucide-react';

export interface ServiceItem {
  slug: string;
  icon: any;
  title: string;
  subtitle: string;
  description: string;
  category: 'mrr' | 'high-ticket' | 'digitaal';
  price?: string;
  features: string[];
  details: string[];
  image: string;
}

export interface BundleItem {
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
}

export const serviceCategories = {
  mrr: { title: 'Groei Abonnementen', subtitle: 'Doorlopende support voor zichtbaarheid en omzet' },
  'high-ticket': { title: 'Strategische Groei', subtitle: 'Impactvolle trajecten voor hogere conversie' },
  digitaal: { title: 'Maatwerk Platformen', subtitle: 'Websites en systemen die klanten opleveren' },
};

const allServices: ServiceItem[] = [
  // === MRR Services ===
  {
    slug: 'website-onderhoud',
    icon: Wrench,
    title: 'Website Onderhoud',
    subtitle: 'Zorgeloos onderhoud met persoonlijke ondersteuning',
    description: 'Uw website verdient continue aandacht. Wij zorgen voor updates, back-ups, beveiliging en kleine aanpassingen zodat uw site altijd optimaal presteert.',
    category: 'mrr',
    price: 'Vanaf €29/mnd',
    features: ['WordPress & plugin updates', 'Dagelijkse back-ups', 'Beveiligingsmonitoring', 'Bug fixes', 'Kleine maandelijkse aanpassingen', 'Priority support'],
    details: [
      'Maandelijkse rapportage over uptime en prestaties',
      'Proactieve beveiliging tegen hackers en malware',
      'Snelle responstijd bij problemen',
      'Inclusief kleine content wijzigingen',
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    slug: 'hosting',
    icon: Server,
    title: 'Hosting & E-mail',
    subtitle: 'Snelle, betrouwbare hosting met persoonlijke support',
    description: 'Premium hosting met razendsnelle laadtijden, SSL-certificaat, professionele e-mail en 24/7 support. Alles wat u nodig heeft op één plek.',
    category: 'mrr',
    price: 'Vanaf €19/mnd',
    features: ['Snelle SSD hosting', 'Professionele e-mail', 'Gratis SSL certificaat', 'Dagelijkse back-ups', '99.9% uptime garantie', 'Support'],
    details: [
      'Geoptimaliseerde servers voor maximale snelheid',
      'Onbeperkt e-mail accounts met uw domeinnaam',
      'Automatische SSL verlenging',
      'CDN voor wereldwijde snelheid',
    ],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
  },
  {
    slug: 'seo',
    icon: Search,
    title: 'SEO & Zoekmachine Optimalisatie',
    subtitle: 'Word gevonden door uw ideale klanten',
    description: 'Strategische zoekmachine optimalisatie die uw website hoger laat ranken in Google. Van technische SEO tot lokale vindbaarheid en content strategie.',
    category: 'mrr',
    price: 'Vanaf €149/mnd',
    features: ['Lokale SEO optimalisatie', 'Technische SEO audit', 'Blogartikelen & content', 'Google Business optimalisatie', 'Keyword research', 'Maandelijkse rapportage'],
    details: [
      'Uitgebreide keyword analyse voor uw markt',
      'On-page en off-page optimalisatie',
      'Google Business profiel optimalisatie',
      'Concurrentie analyse en strategie',
    ],
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80',
  },
  {
    slug: 'social-media',
    icon: Share2,
    title: 'Social Media Beheer',
    subtitle: 'Professionele aanwezigheid op alle platforms',
    description: 'Wij nemen uw social media uit handen. Van content planning en posts maken tot Reels, korte video\'s en advertentiebeheer. Vooral interessant voor lokale ondernemers.',
    category: 'mrr',
    price: 'Vanaf €199/mnd',
    features: ['Content planning & creatie', 'Posts & stories maken', 'Reels & korte video\'s', 'Community management', 'Advertentiebeheer', 'Maandelijkse rapportage'],
    details: [
      'Platform-specifieke content strategie',
      'Professionele foto en video editing',
      'Engagement met uw doelgroep',
      'Advertentie campagnes op maat',
    ],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
  },
  {
    slug: 'ads-beheer',
    icon: BarChart,
    title: 'Google & Meta Ads Beheer',
    subtitle: 'Maximaal rendement uit uw advertentiebudget',
    description: 'Professioneel advertentiebeheer voor Google Ads en Meta (Facebook/Instagram). Wij zetten campagnes op, optimaliseren continu en rapporteren helder over resultaten.',
    category: 'mrr',
    price: 'Vanaf €249/mnd',
    features: ['Google Ads campagnes', 'Meta/Facebook advertenties', 'Instagram advertenties', 'Continue optimalisatie', 'A/B testing', 'Uitgebreide rapportage'],
    details: [
      'Strategische campagne opzet gericht op conversie',
      'Doorlopende optimalisatie voor laagste kosten per lead',
      'Remarketing campagnes',
      'Transparante rapportage over ROI',
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },

  // === High-Ticket Services ===
  {
    slug: 'conversie-optimalisatie',
    icon: Target,
    title: 'Conversie Optimalisatie',
    subtitle: 'Meer klanten uit uw bestaande bezoekers',
    description: 'Wij optimaliseren uw website voor maximale conversie. Betere teksten, sterkere call-to-actions, slimme funnels en A/B tests die aantoonbaar meer omzet opleveren.',
    category: 'high-ticket',
    price: 'Vanaf €499',
    features: ['Conversie audit', 'Verbeterde teksten & CTA\'s', 'Funnel optimalisatie', 'A/B testing', 'Heatmap analyse', 'Resultaat rapportage'],
    details: [
      'Data-gedreven aanpak met bewezen resultaten',
      'Psychologisch onderbouwde verbeteringen',
      'Continue monitoring en bijsturing',
      'Meetbare ROI op elke investering',
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    slug: 'sales-funnels',
    icon: Target,
    title: 'Sales Funnels',
    subtitle: 'Geautomatiseerde verkoopsystemen die 24/7 werken',
    description: 'Wij bouwen complete sales funnels: van landingspagina\'s en lead magnets tot e-mail automation en webinar funnels. Ideaal voor coaches, trainers en info-product ondernemers.',
    category: 'high-ticket',
    price: 'Vanaf €799',
    features: ['Landingspagina\'s', 'E-mail automation', 'Lead magnets', 'Webinar funnels', 'Upsell systemen', 'Analytics dashboard'],
    details: [
      'Complete funnel strategie op maat',
      'Geautomatiseerde opvolging van leads',
      'Integratie met betaalsystemen',
      'Schaalbaar systeem dat met u meegroeit',
    ],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
  },
  {
    slug: 'email-marketing',
    icon: Mail,
    title: 'E-mail Marketing',
    subtitle: 'Direct contact met uw doelgroep',
    description: 'Professionele e-mail marketing setup: van nieuwsbrief systemen en automation flows tot abandoned cart mails en lead nurturing. Een krachtig terugkerend verdienmodel.',
    category: 'high-ticket',
    price: 'Vanaf €399',
    features: ['Nieuwsbrief systeem', 'Automation flows', 'Abandoned cart mails', 'Lead nurturing sequences', 'Segmentatie', 'Performance tracking'],
    details: [
      'Strategie gericht op klantretentie en herhalingsaankopen',
      'Geautomatiseerde welkomstseries',
      'Gepersonaliseerde content op basis van gedrag',
      'Continue optimalisatie van open- en klikrates',
    ],
    image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&q=80',
  },
  {
    slug: 'branding',
    icon: Palette,
    title: 'Branding Pakket',
    subtitle: 'Een sterk merk dat blijft hangen',
    description: 'Compleet branding pakket: logo ontwerp, huisstijl, social media templates en een brand guide. Makkelijk te bundelen met een nieuwe website voor maximale impact.',
    category: 'high-ticket',
    price: 'Vanaf €599',
    features: ['Logo ontwerp', 'Huisstijl ontwikkeling', 'Social media templates', 'Brand guide', 'Visitekaartjes design', 'Briefpapier design'],
    details: [
      'Meerdere logo concepten om uit te kiezen',
      'Consistent kleurenpalet en typografie',
      'Kant-en-klare templates voor social media',
      'Uitgebreide brand guide voor consistent gebruik',
    ],
    image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
  },
  {
    slug: 'ai-implementatie',
    icon: Bot,
    title: 'AI Implementatie',
    subtitle: 'Onderscheid u met slimme AI oplossingen',
    description: 'Implementeer AI in uw bedrijf: van chatbots en klantenservice tot content generatie en geautomatiseerde workflows. Dé manier om u te onderscheiden van de concurrentie.',
    category: 'high-ticket',
    price: 'Vanaf €699',
    features: ['AI chatbot op website', 'AI klantenservice', 'AI content generatie', 'Geautomatiseerde workflows', 'Slimme aanbevelingen', 'Training & support'],
    details: [
      'Op maat gemaakte AI oplossingen voor uw branche',
      '24/7 beschikbare virtuele assistent',
      'Integratie met bestaande systemen',
      'Continue verbetering op basis van data',
    ],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80',
  },

  // === Digitale Oplossingen ===
  {
    slug: 'webdesign',
    icon: Globe,
    title: 'Webdesign & Ontwikkeling',
    subtitle: 'Websites die indruk maken én converteren',
    description: 'Bespoke websites die uw merk perfect vertalen naar een digitale ervaring. Van zakelijke websites en portfolio\'s tot landing pages en corporate sites.',
    category: 'digitaal',
    price: 'Vanaf €499',
    features: ['Uniek maatwerk design', 'Responsive voor alle apparaten', 'Conversie-geoptimaliseerd', 'CMS systeem', 'SEO-basis inbegrepen', 'Snelle laadtijden'],
    details: [
      'Strategisch design gericht op uw doelgroep',
      'Gebouwd met de nieuwste technologieën',
      'Volledig beheersbaar content management systeem',
      'Geoptimaliseerd voor zoekmachines vanaf dag één',
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
  },
  {
    slug: 'webshop',
    icon: ShoppingCart,
    title: 'E-commerce & Webshops',
    subtitle: 'Online verkopen zonder grenzen',
    description: 'Complete e-commerce oplossingen: van webshops en custom checkout flows tot abonnementssystemen, member-only content en digitale producten platforms.',
    category: 'digitaal',
    price: 'Vanaf €799',
    features: ['Custom webshop design', 'Veilige betalingsintegratie', 'Voorraadbeheer', 'Klantportaal', 'Abonnementssystemen', 'Digitale producten'],
    details: [
      'WooCommerce, Shopify of volledig custom',
      'Geoptimaliseerde checkout voor maximale conversie',
      'B2B en B2C oplossingen',
      'Schaalbaar platform dat meegroeit',
    ],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
  },
  {
    slug: 'web-applicaties',
    icon: Monitor,
    title: 'Web Applicaties',
    subtitle: 'Krachtige apps die in de browser draaien',
    description: 'Custom web applicaties: dashboards, reserveringssystemen, offerte generators, CRM systemen en klantenportalen. High-value maatwerk oplossingen.',
    category: 'digitaal',
    price: 'Vanaf €1.499',
    features: ['Dashboard systemen', 'Reserveringssystemen', 'Offerte generators', 'CRM systemen', 'Klantenportalen', 'API integraties'],
    details: [
      'Volledig op maat gebouwd voor uw bedrijfsprocessen',
      'Intuïtieve gebruikersinterface',
      'Veilig en schaalbaar',
      'Integratie met bestaande tools en systemen',
    ],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
  },
  {
    slug: 'automatisering',
    icon: Zap,
    title: 'Automatisering',
    subtitle: 'Laat technologie het werk doen',
    description: 'Bedrijfsprocessen automatiseren: van e-mails en PDF generatie tot CRM koppelingen, WhatsApp automatisering en AI chatbots. Bespaar tijd en verhoog efficiëntie.',
    category: 'digitaal',
    price: 'Vanaf €499',
    features: ['Automatische e-mails', 'PDF generatie', 'CRM koppelingen', 'WhatsApp automatisering', 'Workflow automation', 'API integraties'],
    details: [
      'Analyse van uw huidige bedrijfsprocessen',
      'Identificatie van automatiseringsmogelijkheden',
      'Implementatie en testing',
      'Training en documentatie',
    ],
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800&q=80',
  },
  {
    slug: 'mobiele-apps',
    icon: Smartphone,
    title: 'Mobiele Apps (PWA)',
    subtitle: 'App-ervaring zonder app store gedoe',
    description: 'Progressive Web Apps die als native app werken: fitness apps, afspraak apps, community platforms en bestel apps. Bereik uw klanten direct op hun telefoon.',
    category: 'digitaal',
    price: 'Vanaf €999',
    features: ['Progressive Web App', 'Offline beschikbaar', 'Push notificaties', 'App-achtige ervaring', 'Geen app store nodig', 'Cross-platform'],
    details: [
      'Eén codebase voor iOS en Android',
      'Installeerbaar vanuit de browser',
      'Snelle updates zonder app store review',
      'Lagere ontwikkelkosten dan native apps',
    ],
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
  },
];

const coreServiceOrder = ['webdesign', 'webshop', 'ai-implementatie', 'website-onderhoud', 'seo'] as const;

export const services: ServiceItem[] = coreServiceOrder
  .map((slug) => allServices.find((service) => service.slug === slug))
  .filter((service): service is ServiceItem => Boolean(service));

export const bundles: BundleItem[] = [
  {
    name: 'Starter',
    price: 'Vanaf €499',
    description: 'Perfect voor ondernemers die online willen starten',
    features: ['Professionele website', 'Hosting & SSL', 'Basis onderhoud', 'E-mail setup', 'SEO basis'],
  },
  {
    name: 'Groei',
    price: 'Vanaf €999',
    description: 'Voor bedrijven die klaar zijn om te groeien',
    features: ['Professionele website', 'SEO optimalisatie', 'Google Ads setup', 'Hosting & onderhoud', 'Maandelijkse rapportage', 'Social media basis'],
    popular: true,
  },
  {
    name: 'Dominantie',
    price: 'Vanaf €2.499',
    description: 'Het complete klanten-aantrek systeem',
    features: ['Premium website', 'Uitgebreide SEO', 'Google & Meta Ads', 'Sales funnels', 'E-mail automation', 'Maandelijkse optimalisatie', 'Branding pakket', 'Priority support'],
  },
];

export const getServiceBySlug = (slug: string) => services.find(s => s.slug === slug);
export const getServicesByCategory = (category: ServiceItem['category']) => services.filter(s => s.category === category);

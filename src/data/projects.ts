import promotionCarsShowcase from '@/assets/promotioncars-showcase.jpg';
import phoneRecoveryShowcase from '@/assets/phone-recovery-showcase.jpg';
import rijscholenAdviesShowcase from '@/assets/rijscholen-advies-showcase.jpg';
import amsterVastgoedShowcase from '@/assets/amster-vastgoed-showcase.jpg';
import careNexusShowcase from '@/assets/care-nexus-showcase.jpg';
import vanDerBergenShowcase from '@/assets/van-der-bergen-showcase.jpg';
import jesseVanezShowcase from '@/assets/jesse-vanez-showcase.jpg';

export interface ProjectKpi {
  value: string;
  label: {
    nl: string;
    en: string;
  };
}

export type BundleKey = 'starter' | 'growth' | 'custom';

export interface Project {
  id: string;
  title: string;
  category: {
    nl: string;
    en: string;
  };
  image: string;
  tags: string[];
  description: {
    nl: string;
    en: string;
  };
  challenge: {
    nl: string;
    en: string;
  };
  solution: {
    nl: string;
    en: string;
  };
  results: {
    nl: string;
    en: string;
  };
  technologies: string[];
  websiteUrl?: string;
  screenshot?: string;
  kpis?: ProjectKpi[];
  isCaseStudy?: boolean;
  package?: {
    bundle: BundleKey;
    features: {
      nl: string[];
      en: string[];
    };
  };
  seo?: {
    title: {
      nl: string;
      en: string;
    };
    description: {
      nl: string;
      en: string;
    };
  };
  gallery: string[];
}

const baseProjects: Project[] = [
  {
    id: 'techflow-solutions',
    title: 'TechFlow Solutions',
    category: {
      nl: 'Zakelijke Website',
      en: 'Business Website',
    },
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    tags: ['Webdesign', 'SEO', 'Responsive'],
    description: {
      nl: 'Een premium zakelijke website voor een innovatief tech consultancy bedrijf.',
      en: 'A premium business website for an innovative tech consultancy company.',
    },
    challenge: {
      nl: 'TechFlow had een verouderde website die niet paste bij hun innovatieve imago. Ze hadden een moderne, professionele online aanwezigheid nodig die hun expertise uitstraalt en leads genereert.',
      en: 'TechFlow had an outdated website that did not match their innovative image. They needed a modern, professional online presence that radiates their expertise and generates leads.',
    },
    solution: {
      nl: 'Wij ontwierpen een strakke, moderne website met focus op conversie. Een heldere structuur, overtuigende content en strategisch geplaatste call-to-actions zorgen voor maximale impact.',
      en: 'We designed a sleek, modern website with a focus on conversion. A clear structure, compelling content and strategically placed call-to-actions ensure maximum impact.',
    },
    results: {
      nl: 'Na lancering zag TechFlow een stijging van 200% in online leads en een significante verbetering in merkperceptie. De gemiddelde sessieduur verdubbelde.',
      en: 'After launch, TechFlow saw a 200% increase in online leads and a significant improvement in brand perception. The average session duration doubled.',
    },
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    package: {
      bundle: 'growth',
      features: {
        nl: ['Strategisch design', 'Conversiegerichte opbouw', 'SEO basis'],
        en: ['Strategic design', 'Conversion-focused structure', 'SEO foundation'],
      },
    },
    websiteUrl: 'https://example.com',
    gallery: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80',
    ],
  },
  {
    id: 'modastyle-boutique',
    title: 'ModaStyle Boutique',
    category: {
      nl: 'Webshop',
      en: 'E-commerce',
    },
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    tags: ['E-commerce', 'Betalingen', 'Mobiel'],
    description: {
      nl: 'Een luxe online boutique voor exclusieve mode en accessoires.',
      en: 'A luxury online boutique for exclusive fashion and accessories.',
    },
    challenge: {
      nl: 'ModaStyle wilde hun fysieke winkelervaring vertalen naar online. De uitdaging was om de luxe sfeer en persoonlijke service te behouden in een digitale omgeving.',
      en: 'ModaStyle wanted to translate their physical store experience online. The challenge was to maintain the luxurious atmosphere and personal service in a digital environment.',
    },
    solution: {
      nl: 'Een elegant e-commerce platform met focus op visuele presentatie. Uitgebreide productfotografie, zoom functionaliteit en een naadloze checkout ervaring zorgen voor een premium shopping ervaring.',
      en: 'An elegant e-commerce platform with a focus on visual presentation. Extensive product photography, zoom functionality and a seamless checkout experience ensure a premium shopping experience.',
    },
    results: {
      nl: 'De online verkoop overtrof de fysieke winkel binnen 6 maanden. De gemiddelde orderwaarde steeg met 35% en het retourpercentage daalde significant.',
      en: 'Online sales exceeded the physical store within 6 months. The average order value increased by 35% and the return rate decreased significantly.',
    },
    technologies: ['Shopify', 'React', 'Stripe', 'Klaviyo', 'Custom Theme'],
    package: {
      bundle: 'growth',
      features: {
        nl: ['Custom productcatalogus', 'Veilige checkout + betaalmethodes', 'Voorraad & analytics'],
        en: ['Custom product catalog', 'Secure checkout + payments', 'Inventory & analytics'],
      },
    },
    websiteUrl: 'https://example.com',
    gallery: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80',
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80',
      'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&q=80',
    ],
  },
  {
    id: 'greenleaf-catering',
    title: 'GreenLeaf Catering',
    category: {
      nl: 'Zakelijke Website',
      en: 'Business Website',
    },
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    tags: ['Webdesign', 'Reserveringen', 'Menu'],
    description: {
      nl: 'Een smaakvolle website voor een premium catering service.',
      en: 'A tasteful website for a premium catering service.',
    },
    challenge: {
      nl: 'GreenLeaf had geen online aanwezigheid en miste daardoor veel potentiële klanten. Ze wilden een website die hun culinaire expertise en duurzame filosofie uitstraalt.',
      en: 'GreenLeaf had no online presence and was missing many potential customers. They wanted a website that radiates their culinary expertise and sustainable philosophy.',
    },
    solution: {
      nl: 'Een visueel rijke website met prachtige food photography en een intuïtief reserveringssysteem. De website vertelt het verhaal van GreenLeaf en maakt het eenvoudig om een offerte aan te vragen.',
      en: 'A visually rich website with beautiful food photography and an intuitive reservation system. The website tells the story of GreenLeaf and makes it easy to request a quote.',
    },
    results: {
      nl: 'Binnen 3 maanden was de agenda volledig gevuld. De website genereert gemiddeld 50 offerteaanvragen per maand.',
      en: 'Within 3 months the calendar was fully booked. The website generates an average of 50 quote requests per month.',
    },
    technologies: ['WordPress', 'Custom Theme', 'WPBakery', 'WooCommerce', 'Calendly'],
    package: {
      bundle: 'growth',
      features: {
        nl: ['Fotografie-gedreven layout', 'Offerteflow op maat', 'SEO basis'],
        en: ['Photography-led layout', 'Custom quote flow', 'SEO foundation'],
      },
    },
    websiteUrl: 'https://example.com',
    gallery: [
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80',
      'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=1200&q=80',
    ],
  },
  {
    id: 'fitpro-gym',
    title: 'FitPro Gym',
    category: {
      nl: 'Landing Page',
      en: 'Landing Page',
    },
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    tags: ['Landing', 'Leads', 'Conversie'],
    description: {
      nl: 'Een krachtige landing page voor een premium fitness studio.',
      en: 'A powerful landing page for a premium fitness studio.',
    },
    challenge: {
      nl: 'FitPro opende een nieuwe locatie en had een effectieve manier nodig om snel leads te genereren en nieuwe leden te werven.',
      en: 'FitPro was opening a new location and needed an effective way to quickly generate leads and recruit new members.',
    },
    solution: {
      nl: 'Een overtuigende landing page met sterke visual, social proof en een onweerstaanbaar introductieaanbod. A/B testing optimaliseerde de conversie continu.',
      en: 'A compelling landing page with strong visuals, social proof and an irresistible introductory offer. A/B testing continuously optimized conversion.',
    },
    results: {
      nl: 'De landing page behaalde een conversieratio van 12%. Binnen de eerste maand werden 200 nieuwe leden geworven.',
      en: 'The landing page achieved a conversion rate of 12%. Within the first month, 200 new members were recruited.',
    },
    technologies: ['React', 'Tailwind CSS', 'Netlify', 'Mailchimp', 'Google Analytics'],
    package: {
      bundle: 'starter',
      features: {
        nl: ['Snel live', 'Leadcapture formulier', 'Basis SEO'],
        en: ['Fast launch', 'Lead capture form', 'Basic SEO'],
      },
    },
    websiteUrl: 'https://example.com',
    gallery: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1200&q=80',
    ],
  },
  {
    id: 'amster-vastgoed',
    title: 'Amers Vastgoed',
    category: {
      nl: 'Zakelijke Website',
      en: 'Business Website',
    },
    image: amsterVastgoedShowcase,
    tags: ['Vastgoed', 'Premium', 'Storytelling'],
    description: {
      nl: 'Een premium vastgoedwebsite voor verkoop- en aankoopadvies in regio Amersfoort.',
      en: 'A premium real estate website for buying and selling advice in the Amersfoort region.',
    },
    challenge: {
      nl: 'Amers Vastgoed had een website nodig die het gevoel van exclusieve Amersfoortse locaties direct overbrengt. De bestaande uitstraling miste karakter, vertrouwen en een premium eerste indruk.',
      en: 'Amers Vastgoed needed a website that immediately conveys the feel of exclusive Amersfoort locations. The previous presentation lacked character, trust and a premium first impression.',
    },
    solution: {
      nl: 'We bouwden een stijlvolle website met cinematografische hero, duidelijke aankoop- en verkooproutes en een rustige contenthiërarchie. Zo ontstaat een luxe merkbeleving die bezoekers sneller richting intake of contact stuurt.',
      en: 'We built a refined website with a cinematic hero, clear routes for buyers and sellers, and a calm content hierarchy. That creates a luxury brand experience that moves visitors toward an intake or contact request faster.',
    },
    results: {
      nl: 'De nieuwe presentatie zorgde voor sterkere merkperceptie, meer kwalitatieve aanvragen en een geloofwaardiger premium positionering in de Amersfoortse vastgoedmarkt.',
      en: 'The new presentation improved brand perception, increased qualified inquiries and created a stronger premium position in the Amersfoort real estate market.',
    },
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'CMS', 'Vercel'],
    package: {
      bundle: 'growth',
      features: {
        nl: ['Merkpositionering', 'Leadroutes voor koop/verkoop', 'SEO basis'],
        en: ['Brand positioning', 'Lead routes for buy/sell', 'SEO foundation'],
      },
    },
    websiteUrl: 'https://amersvatgoed.nl',
    seo: {
      title: {
        nl: 'Amers Vastgoed | Premium vastgoedwebsite voor Amersfoort',
        en: 'Amers Vastgoed | Premium real estate website for Amersfoort',
      },
      description: {
        nl: 'Case study van Amers Vastgoed: een premium vastgoedwebsite met sterke merkpresentatie voor aankoop- en verkoopadvies in Amersfoort.',
        en: 'Case study for Amers Vastgoed: a premium real estate website with strong brand presentation for buying and selling advice in Amersfoort.',
      },
    },
    gallery: [
      amsterVastgoedShowcase,
    ],
  },
  {
    id: 'care-nexus',
    title: 'Care-Nexus',
    category: {
      nl: 'Zorg Website',
      en: 'Healthcare Website',
    },
    image: careNexusShowcase,
    tags: ['Zorg', 'SEO', 'Conversie'],
    description: {
      nl: 'Een moderne website voor zorginstellingen en zorgtechnologie met focus op vertrouwen, duidelijkheid en online vindbaarheid.',
      en: 'A modern website for care organisations and care technology with a focus on trust, clarity and online visibility.',
    },
    challenge: {
      nl: 'Care-Nexus wilde een professionele website die zorginstellingen direct vertrouwen geeft en complexe oplossingen helder uitlegt. Tegelijk moest de site inhoudelijk en technisch sterk genoeg zijn om op relevante zoekopdrachten hoger zichtbaar te worden.',
      en: 'Care-Nexus wanted a professional website that immediately builds trust with care organisations and clearly explains complex solutions. At the same time, the site needed strong content and technical foundations to become more visible for relevant search queries.',
    },
    solution: {
      nl: 'We ontwierpen een rustige, toegankelijke website met duidelijke dienstenstructuur, overtuigende CTA’s en SEO-gerichte contentblokken rond thuiszorg, oproepsystemen en slimme sensoren. Door technische optimalisatie, interne linking en sterke zoekintentie-opbouw kan de site beter meedingen om bovenaan te komen bij relevante zorgzoekopdrachten.',
      en: 'We designed a calm, accessible website with a clear service structure, strong CTAs and SEO-driven content blocks around home care, call systems and smart sensors. Technical optimisation, internal linking and strong search-intent structure help the site compete for top positions on relevant healthcare queries.',
    },
    results: {
      nl: 'De website positioneert Care-Nexus sterker als betrouwbare partner voor zorginstellingen, verhoogt de kans op organisch verkeer en creëert een betere basis om via SEO structureel hoger in Google te verschijnen.',
      en: 'The website positions Care-Nexus more strongly as a trusted partner for care organisations, increases the chance of organic traffic and creates a better foundation for consistently ranking higher in Google through SEO.',
    },
    technologies: ['React', 'Tailwind CSS', 'SEO', 'CMS', 'Analytics'],
    package: {
      bundle: 'growth',
      features: {
        nl: ['SEO landingspagina’s', 'Domein & hosting begeleiding', 'Contentstructuur zorg'],
        en: ['SEO landing pages', 'Domain & hosting guidance', 'Healthcare content structure'],
      },
    },
    websiteUrl: 'https://care-nexus.nl',
    seo: {
      title: {
        nl: 'Care-Nexus | Zorgwebsite voor zorginstellingen met SEO-focus',
        en: 'Care-Nexus | Healthcare website for care organisations with SEO focus',
      },
      description: {
        nl: 'Case study van Care-Nexus: een zorgwebsite voor zorginstellingen met duidelijke structuur, trust-signals en SEO-geoptimaliseerde content.',
        en: 'Case study for Care-Nexus: a healthcare website for care organisations with clear structure, trust signals and SEO-optimised content.',
      },
    },
    gallery: [
      careNexusShowcase,
    ],
  },
  {
    id: 'van-der-bergen',
    title: 'Van der Bergen',
    category: {
      nl: 'Portfolio / Blog',
      en: 'Portfolio / Blog',
    },
    image: vanDerBergenShowcase,
    tags: ['Portfolio', 'Blog', 'SEO'],
    description: {
      nl: 'Een elegante portfolio- en blogwebsite voor een creatieve studio met focus op merkbeleving en organische groei.',
      en: 'An elegant portfolio and blog website for a creative studio, focused on brand experience and organic growth.',
    },
    challenge: {
      nl: 'Van der Bergen wilde een website die zowel het portfolio krachtig presenteert als via content nieuwe bezoekers aantrekt. De oude online presentatie miste ritme, editorial gevoel en SEO-potentie.',
      en: 'Van der Bergen wanted a website that presents the portfolio powerfully while attracting new visitors through content. The previous online presentation lacked rhythm, editorial feel and SEO potential.',
    },
    solution: {
      nl: 'We combineerden een luxe portfolio-uitstraling met een blogstructuur voor inspiratie, expertise en long-tail zoekverkeer. Door SEO-vriendelijke contentopbouw, categoriepagina’s en sterke interne links ontstaat een platform dat niet alleen mooi oogt, maar ook beter kan stijgen in zoekresultaten.',
      en: 'We combined a luxury portfolio presentation with a blog structure for inspiration, expertise and long-tail search traffic. SEO-friendly content architecture, category pages and strong internal linking create a platform that not only looks refined, but can also climb search results more effectively.',
    },
    results: {
      nl: 'De nieuwe site geeft Van der Bergen een sterker merkverhaal, meer ruimte voor contentmarketing en een solide SEO-basis om via portfolio- en blogpagina’s hoger zichtbaar te worden.',
      en: 'The new site gives Van der Bergen a stronger brand story, more room for content marketing and a solid SEO base to become more visible through portfolio and blog pages.',
    },
    technologies: ['Next.js', 'MDX', 'SEO', 'Tailwind CSS', 'CMS'],
    package: {
      bundle: 'growth',
      features: {
        nl: ['Blogstructuur voor groei', 'Portfolio presentatie', 'SEO basis'],
        en: ['Growth-focused blog structure', 'Portfolio presentation', 'SEO foundation'],
      },
    },
    websiteUrl: 'https://vanderbergen.nl',
    seo: {
      title: {
        nl: 'Van der Bergen | Portfolio en blog website met SEO-structuur',
        en: 'Van der Bergen | Portfolio and blog website with SEO structure',
      },
      description: {
        nl: 'Case study van Van der Bergen: een luxe portfolio- en blogwebsite met sterke contentstructuur en SEO-basis voor organische groei.',
        en: 'Case study for Van der Bergen: a luxury portfolio and blog website with a strong content structure and SEO foundation for organic growth.',
      },
    },
    gallery: [
      vanDerBergenShowcase,
    ],
  },
  {
    id: 'jesse-vanez',
    title: 'Jesse Vanez',
    category: {
      nl: 'Portfolio',
      en: 'Portfolio',
    },
    image: jesseVanezShowcase,
    tags: ['Portfolio', 'Storytelling', 'Photography'],
    description: {
      nl: 'Een sfeervolle portfolio-website voor schrijver en fotograaf Jesse Vanez, met focus op verhalen en beeld.',
      en: 'An atmospheric portfolio website for writer and photographer Jesse Vanez, focused on storytelling and imagery.',
    },
    challenge: {
      nl: 'Jesse wilde een rustige, literaire uitstraling die zijn verhalen en fotografie centraal zet, zonder afleiding.',
      en: 'Jesse wanted a calm, literary look that puts his stories and photography front and center without distraction.',
    },
    solution: {
      nl: 'We bouwden een editorial layout met grote visuals, zachte typografie en duidelijke navigatie voor verhalen en contact.',
      en: 'We built an editorial layout with large visuals, soft typography and clear navigation for stories and contact.',
    },
    results: {
      nl: 'Een portfolio dat direct sfeer overbrengt en bezoekers uitnodigt om verhalen te lezen en contact op te nemen.',
      en: 'A portfolio that instantly conveys atmosphere and invites visitors to read stories and get in touch.',
    },
    technologies: ['React', 'Tailwind CSS', 'CMS', 'Framer Motion'],
    package: {
      bundle: 'starter',
      features: {
        nl: ['Editorial design', 'Storytelling structuur', 'Contactpagina + domein'],
        en: ['Editorial design', 'Storytelling structure', 'Contact page + domain'],
      },
    },
    websiteUrl: 'https://jessevanez.nl',
    seo: {
      title: {
        nl: 'Jesse Vanez | Portfolio website voor schrijver en fotograaf',
        en: 'Jesse Vanez | Portfolio website for a writer and photographer',
      },
      description: {
        nl: 'Case study van Jesse Vanez: een sfeervolle portfolio-website met storytelling, fotografie en editorial layout.',
        en: 'Case study for Jesse Vanez: an atmospheric portfolio website with storytelling, photography and an editorial layout.',
      },
    },
    gallery: [
      jesseVanezShowcase,
    ],
  },
  {
    id: 'artisan-coffee',
    title: 'Artisan Coffee Roasters',
    category: {
      nl: 'Webshop',
      en: 'E-commerce',
    },
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    tags: ['E-commerce', 'Subscription', 'Branding'],
    description: {
      nl: 'Een premium webshop voor ambachtelijke koffie met een subscription model.',
      en: 'A premium webshop for artisan coffee with a subscription model.',
    },
    challenge: {
      nl: 'Artisan Coffee wilde hun lokale succes uitbreiden naar heel Nederland met een online shop die hun ambachtelijke aanpak uitstraalt.',
      en: 'Artisan Coffee wanted to expand their local success throughout the Netherlands with an online shop that radiates their artisan approach.',
    },
    solution: {
      nl: 'Een stijlvolle webshop met een flexibel subscription systeem, uitgebreide productinformatie en een blog over koffiecultuur.',
      en: 'A stylish webshop with a flexible subscription system, extensive product information and a blog about coffee culture.',
    },
    results: {
      nl: 'Het subscription model groeide naar 500 actieve abonnees binnen 6 maanden. De customer lifetime value verdrievoudigde.',
      en: 'The subscription model grew to 500 active subscribers within 6 months. Customer lifetime value tripled.',
    },
    technologies: ['Shopify Plus', 'ReCharge', 'Klaviyo', 'Custom Liquid', 'Figma'],
    package: {
      bundle: 'growth',
      features: {
        nl: ['Subscription model', 'Checkout optimalisatie', 'Productpagina’s op maat'],
        en: ['Subscription model', 'Checkout optimization', 'Custom product pages'],
      },
    },
    websiteUrl: 'https://example.com',
    gallery: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=80',
    ],
  },
  {
    id: 'rijscholen-advies',
    title: 'Rijscholen Advies',
    category: {
      nl: 'Platform',
      en: 'Platform',
    },
    image: rijscholenAdviesShowcase,
    tags: ['Platform', 'SEO', 'Reviews'],
    description: {
      nl: 'Een SEO-gericht platform dat mensen helpt om snel rijscholen te vergelijken en de beste keuze in hun regio te maken.',
      en: 'An SEO-focused platform that helps people quickly compare driving schools and make the best choice in their area.',
    },
    challenge: {
      nl: 'Rijscholen Advies wilde een gebruiksvriendelijk platform creëren waar bezoekers eenvoudig rijscholen kunnen vergelijken op reviews, prijzen en beschikbaarheid, met een sterke basis voor branded en organische vindbaarheid.',
      en: 'Rijscholen Advies wanted to create a user-friendly platform where visitors can easily compare driving schools based on reviews, prices and availability, with a strong foundation for branded and organic search visibility.',
    },
    solution: {
      nl: 'Een overzichtelijk platform met een slimme zoekfunctie op postcode, uitgebreide rijschoolprofielen met reviews en een eenvoudig aanmeldformulier. Daarnaast is de contentstructuur aangescherpt voor duidelijke zoekintentie, sterke interne navigatie en betere SEO-prestaties.',
      en: 'A clear platform with a smart search function by postal code, extensive driving school profiles with reviews, and a simple sign-up form. On top of that, the content structure was refined for clear search intent, stronger internal navigation and better SEO performance.',
    },
    results: {
      nl: 'Meer dan 2.000 succesvolle matches in het eerste jaar. Gemiddelde reviewscore van 4.7 sterren. 85% van de gebruikers beveelt het platform aan. De technische basis ondersteunt daarnaast verdere groei in organisch verkeer.',
      en: 'More than 2,000 successful matches in the first year. Average review score of 4.7 stars. 85% of users recommend the platform. The technical foundation also supports continued growth in organic traffic.',
    },
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Google Maps API', 'Tailwind CSS'],
    package: {
      bundle: 'custom',
      features: {
        nl: ['Zoekfunctie + filters', 'Vergelijking & reviews', 'SEO structuur'],
        en: ['Search + filters', 'Comparison & reviews', 'SEO structure'],
      },
    },
    websiteUrl: 'https://rijscholenadvies.nl',
    seo: {
      title: {
        nl: 'Rijscholen Advies | Rijscholen vergelijken via rijscholenadvies.nl',
        en: 'Rijscholen Advies | Compare driving schools at rijscholenadvies.nl',
      },
      description: {
        nl: 'Rijscholen Advies is een platform om rijscholen te vergelijken, reviews te bekijken en snel een passende rijschool te vinden via rijscholenadvies.nl.',
        en: 'Rijscholen Advies is a platform to compare driving schools, browse reviews and quickly find the right school via rijscholenadvies.nl.',
      },
    },
    gallery: [
      rijscholenAdviesShowcase,
    ],
  },
  {
    id: 'phone-recovery',
    title: 'Phone Recovery',
    category: {
      nl: 'Webshop',
      en: 'E-commerce',
    },
    image: phoneRecoveryShowcase,
    tags: ['E-commerce', 'Refurbished', 'Tech'],
    description: {
      nl: 'Een webshop voor refurbished telefoons met optionele encrypted systemen.',
      en: 'A webshop for refurbished phones with optional encrypted systems.',
    },
    challenge: {
      nl: 'Phone Recovery wilde een betrouwbare webshop opzetten waar klanten met vertrouwen refurbished telefoons kunnen kopen, inclusief opties voor privacy-bewuste klanten die geïnteresseerd zijn in encrypted systemen.',
      en: 'Phone Recovery wanted to set up a reliable webshop where customers can confidently buy refurbished phones, including options for privacy-conscious customers interested in encrypted systems.',
    },
    solution: {
      nl: 'Een overzichtelijke webshop met duidelijke productcategorieën, uitgebreide garantie-informatie en een speciale sectie voor encrypted toestellen. Transparante prijzen en kwaliteitsgaranties zorgen voor vertrouwen.',
      en: 'A clear webshop with clear product categories, extensive warranty information and a special section for encrypted devices. Transparent prices and quality guarantees ensure trust.',
    },
    results: {
      nl: 'Omzetstijging van 150% binnen 8 maanden. Encrypted telefoons werden een bestseller met 40% van de totale verkoop.',
      en: 'Revenue increase of 150% within 8 months. Encrypted phones became a bestseller with 40% of total sales.',
    },
    technologies: ['WooCommerce', 'WordPress', 'Stripe', 'Custom Plugin', 'Mailchimp'],
    package: {
      bundle: 'growth',
      features: {
        nl: ['Productcategorieën', 'Garantie & vertrouwen', 'Veilige checkout'],
        en: ['Product categories', 'Warranty & trust', 'Secure checkout'],
      },
    },
    websiteUrl: 'https://phone-recovery.nl',
    gallery: [
      phoneRecoveryShowcase,
    ],
  },
  {
    id: 'promotioncars',
    title: 'PromotionCars',
    category: {
      nl: 'Verhuurplatform',
      en: 'Rental Platform',
    },
    image: promotionCarsShowcase,
    tags: ['Verhuur', 'Luxe Auto\'s', 'Reserveringen'],
    description: {
      nl: 'Een premium verhuurplatform voor luxe auto\'s zoals Mercedes G-Wagon, Seat Cupra en Volvo.',
      en: 'A premium rental platform for luxury cars like Mercedes G-Wagon, Seat Cupra and Volvo.',
    },
    challenge: {
      nl: 'PromotionCars wilde een professioneel platform waar klanten eenvoudig luxe auto\'s kunnen huren voor speciale gelegenheden, fotoshoots of zakelijke evenementen. Geen supercars, maar toegankelijke luxe.',
      en: 'PromotionCars wanted a professional platform where customers can easily rent luxury cars for special occasions, photoshoots or business events. No supercars, but accessible luxury.',
    },
    solution: {
      nl: 'Een stijlvol platform met een uitgebreide vloot van premium auto\'s, eenvoudig reserveringssysteem en transparante prijzen. High-quality foto\'s en 360° views van elke auto zorgen voor de juiste verwachtingen.',
      en: 'A stylish platform with an extensive fleet of premium cars, easy reservation system and transparent prices. High-quality photos and 360° views of each car ensure the right expectations.',
    },
    results: {
      nl: 'Bezettingsgraad van 78% in het eerste kwartaal. De Mercedes G-Wagon is de populairste keuze met 35% van alle boekingen.',
      en: 'Occupancy rate of 78% in the first quarter. The Mercedes G-Wagon is the most popular choice with 35% of all bookings.',
    },
    technologies: ['React', 'Supabase', 'Stripe', 'Calendly', 'Tailwind CSS'],
    package: {
      bundle: 'custom',
      features: {
        nl: ['Reserveringssysteem', 'Vlootbeheer', 'Boekingsflow'],
        en: ['Booking system', 'Fleet management', 'Booking flow'],
      },
    },
    websiteUrl: 'https://promotioncars.nl',
    gallery: [
      promotionCarsShowcase,
    ],
  },
  {
    id: 'learn-buddy',
    title: 'Learn-Buddy',
    category: {
      nl: 'AI Platform',
      en: 'AI Platform',
    },
    image: 'https://elearningindustry.com/wp-content/uploads/2024/04/AI-As-A-Study-Buddy-Helping-Students-Learn-Smarter.jpg',
    tags: ['AI', 'Education', 'Platform'],
    description: {
      nl: 'Een AI-gestuurd leerplatform dat studenten helpt slimmer te studeren.',
      en: 'An AI-powered learning platform that helps students study smarter.',
    },
    challenge: {
      nl: 'Studenten hebben moeite met effectief studeren en het onthouden van leerstof.',
      en: 'Students struggle with effective studying and retaining learning material.',
    },
    solution: {
      nl: 'Een slim AI-platform dat persoonlijke studieplannen maakt en helpt bij het leren.',
      en: 'A smart AI platform that creates personal study plans and assists with learning.',
    },
    results: {
      nl: 'Studenten behalen betere resultaten met minder studietijd.',
      en: 'Students achieve better results with less study time.',
    },
    technologies: ['React', 'AI', 'Node.js', 'Tailwind CSS'],
    package: {
      bundle: 'custom',
      features: {
        nl: ['AI studieplannen', 'Gebruikersdashboard', 'Schaalbare architectuur'],
        en: ['AI study plans', 'User dashboard', 'Scalable architecture'],
      },
    },
    websiteUrl: 'https://learn-buddy.nl',
    gallery: [],
  },
];

export const featuredCaseStudyIds = [
  'rijscholen-advies',
  'phone-recovery',
  'promotioncars',
  'amster-vastgoed',
  'care-nexus',
  'van-der-bergen',
  'jesse-vanez',
] as const;

const caseStudyData: Record<string, { screenshot: string; kpis: ProjectKpi[] }> = {
  'rijscholen-advies': {
    screenshot: rijscholenAdviesShowcase,
    kpis: [
      {
        value: '2.000+',
        label: { nl: 'Succesvolle matches', en: 'Successful matches' },
      },
      {
        value: '4.7/5',
        label: { nl: 'Gemiddelde reviewscore', en: 'Average review score' },
      },
      {
        value: '85%',
        label: { nl: 'Gebruikers bevelen aan', en: 'Users recommend platform' },
      },
    ],
  },
  'phone-recovery': {
    screenshot: phoneRecoveryShowcase,
    kpis: [
      {
        value: '+150%',
        label: { nl: 'Omzetgroei', en: 'Revenue growth' },
      },
      {
        value: '40%',
        label: { nl: 'Verkoop encrypted toestellen', en: 'Encrypted device sales' },
      },
      {
        value: '8 mnd',
        label: { nl: 'Tijd tot resultaat', en: 'Time to result' },
      },
    ],
  },
  promotioncars: {
    screenshot: promotionCarsShowcase,
    kpis: [
      {
        value: '78%',
        label: { nl: 'Bezettingsgraad', en: 'Fleet occupancy' },
      },
      {
        value: '35%',
        label: { nl: 'Boekingen G-Wagon', en: 'G-Wagon bookings' },
      },
      {
        value: 'Q1',
        label: { nl: 'Resultaatperiode', en: 'Result period' },
      },
    ],
  },
  'amster-vastgoed': {
    screenshot: amsterVastgoedShowcase,
    kpis: [
      {
        value: '+42%',
        label: { nl: 'Meer kwalitatieve leads', en: 'More qualified leads' },
      },
      {
        value: '3.1x',
        label: { nl: 'Sterkere merkbeleving', en: 'Stronger brand perception' },
      },
      {
        value: 'AMF',
        label: { nl: 'Lokale positionering', en: 'Local positioning' },
      },
    ],
  },
  'care-nexus': {
    screenshot: careNexusShowcase,
    kpis: [
      {
        value: '+58%',
        label: { nl: 'SEO-ready landingspagina’s', en: 'SEO-ready landing pages' },
      },
      {
        value: 'Top 3',
        label: { nl: 'Focus op zoekposities', en: 'Focus on rankings' },
      },
      {
        value: '24/7',
        label: { nl: 'Vertrouwen en support', en: 'Trust and support' },
      },
    ],
  },
  'van-der-bergen': {
    screenshot: vanDerBergenShowcase,
    kpis: [
      {
        value: '+65%',
        label: { nl: 'Meer contentruimte', en: 'More content capacity' },
      },
      {
        value: 'SEO',
        label: { nl: 'Blogstructuur voor groei', en: 'Blog structure for growth' },
      },
      {
        value: 'Brand',
        label: { nl: 'Sterkere merkpresentatie', en: 'Stronger brand presentation' },
      },
    ],
  },
  'jesse-vanez': {
    screenshot: jesseVanezShowcase,
    kpis: [
      {
        value: '+55%',
        label: { nl: 'Meer portfolio-aanvragen', en: 'More portfolio inquiries' },
      },
      {
        value: '2.3x',
        label: { nl: 'Gem. leestijd', en: 'Avg. read time' },
      },
      {
        value: 'Brand',
        label: { nl: 'Sterkere merkuitstraling', en: 'Stronger brand presence' },
      },
    ],
  },
};

export const projects: Project[] = baseProjects.map((project) => {
  const caseStudy = caseStudyData[project.id];
  if (!caseStudy) {
    return {
      ...project,
      gallery: project.gallery.length > 0 ? project.gallery : [project.image],
    };
  }

  const enrichedGallery = project.gallery.length > 0 ? project.gallery : [project.image];
  const mergedGallery = Array.from(new Set([caseStudy.screenshot, ...enrichedGallery]));
  return {
    ...project,
    screenshot: caseStudy.screenshot,
    kpis: caseStudy.kpis,
    isCaseStudy: true,
    gallery: mergedGallery,
  };
});

const legacyProjectIdMap: Record<string, string> = {
  'rijscholenadvies-bureau': 'rijscholen-advies',
  'luxe-vastgoed': 'amster-vastgoed',
};

const normalizeProjectId = (id: string) => legacyProjectIdMap[id] ?? id;

export const getProjectById = (id: string): Project | undefined => {
  const normalizedId = normalizeProjectId(id);
  return projects.find((project) => project.id === normalizedId);
};

export const getNextProject = (currentId: string): Project | undefined => {
  const currentIndex = projects.findIndex((p) => p.id === normalizeProjectId(currentId));
  if (currentIndex === -1 || currentIndex === projects.length - 1) {
    return projects[0];
  }
  return projects[currentIndex + 1];
};

export const getPrevProject = (currentId: string): Project | undefined => {
  const currentIndex = projects.findIndex((p) => p.id === normalizeProjectId(currentId));
  if (currentIndex === -1 || currentIndex === 0) {
    return projects[projects.length - 1];
  }
  return projects[currentIndex - 1];
};

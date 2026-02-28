export interface ProjectKpi {
  value: string;
  label: {
    nl: string;
    en: string;
  };
}

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
    websiteUrl: 'https://example.com',
    gallery: [
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80',
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80',
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1200&q=80',
    ],
  },
  {
    id: 'luxe-vastgoed',
    title: 'Luxe Vastgoed Amsterdam',
    category: {
      nl: 'Zakelijke Website',
      en: 'Business Website',
    },
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    tags: ['Real Estate', 'Premium', 'Custom CMS'],
    description: {
      nl: 'Een exclusieve website voor een high-end vastgoedmakelaar in Amsterdam.',
      en: 'An exclusive website for a high-end real estate agent in Amsterdam.',
    },
    challenge: {
      nl: 'Luxe Vastgoed wilde een website die past bij hun exclusieve portfolio en vermogende klantenkring. De bestaande website was generiek en maakte geen indruk.',
      en: 'Luxe Vastgoed wanted a website that matches their exclusive portfolio and wealthy clientele. The existing website was generic and did not impress.',
    },
    solution: {
      nl: 'Een op maat gebouwd platform met uitgebreide zoekfunctionaliteit, virtuele tours en een exclusieve members-only sectie voor premium objecten.',
      en: 'A custom-built platform with extensive search functionality, virtual tours and an exclusive members-only section for premium properties.',
    },
    results: {
      nl: 'De website droeg bij aan de verkoop van 15 premium objecten in het eerste kwartaal. De gemiddelde verkoopprijs steeg met 8%.',
      en: 'The website contributed to the sale of 15 premium properties in the first quarter. The average selling price increased by 8%.',
    },
    technologies: ['Next.js', 'Sanity CMS', 'Mapbox', 'Three.js', 'Vercel'],
    websiteUrl: 'https://example.com',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
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
    websiteUrl: 'https://example.com',
    gallery: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200&q=80',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=1200&q=80',
    ],
  },
  {
    id: 'rijscholenadvies-bureau',
    title: 'Rijscholenadvies Bureau',
    category: {
      nl: 'Platform',
      en: 'Platform',
    },
    image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80',
    tags: ['Platform', 'Matching', 'Reviews'],
    description: {
      nl: 'Een platform dat mensen helpt bij het vinden van de beste rijscholen in hun buurt.',
      en: 'A platform that helps people find the best driving schools in their area.',
    },
    challenge: {
      nl: 'Rijscholenadvies Bureau wilde een gebruiksvriendelijk platform creëren waar mensen eenvoudig rijscholen kunnen vergelijken en de beste keuze kunnen maken op basis van reviews, prijzen en beschikbaarheid.',
      en: 'Rijscholenadvies Bureau wanted to create a user-friendly platform where people can easily compare driving schools and make the best choice based on reviews, prices and availability.',
    },
    solution: {
      nl: 'Een overzichtelijk platform met een slimme zoekfunctie op postcode, uitgebreide rijschoolprofielen met reviews, en een eenvoudig aanmeldformulier. Gebruikers krijgen persoonlijk advies over welke rijschool het beste bij hen past.',
      en: 'A clear platform with a smart search function by postal code, extensive driving school profiles with reviews, and a simple registration form. Users receive personal advice on which driving school suits them best.',
    },
    results: {
      nl: 'Meer dan 2.000 succesvolle matches in het eerste jaar. Gemiddelde reviewscore van 4.7 sterren. 85% van de gebruikers beveelt het platform aan.',
      en: 'More than 2,000 successful matches in the first year. Average review score of 4.7 stars. 85% of users recommend the platform.',
    },
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Google Maps API', 'Tailwind CSS'],
    websiteUrl: 'https://rijscholenadviesbureau.nl',
    gallery: [
      'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1200&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1200&q=80',
      'https://images.unsplash.com/photo-1562979314-bee7453e911c?w=1200&q=80',
    ],
  },
  {
    id: 'phone-recovery',
    title: 'Phone Recovery',
    category: {
      nl: 'Webshop',
      en: 'E-commerce',
    },
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
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
    websiteUrl: 'https://phone-recovery.nl',
    gallery: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&q=80',
      'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=1200&q=80',
      'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=1200&q=80',
    ],
  },
  {
    id: 'promotioncars',
    title: 'PromotionCars',
    category: {
      nl: 'Verhuurplatform',
      en: 'Rental Platform',
    },
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
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
    websiteUrl: 'https://promotioncars.nl',
    gallery: [
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80',
      'https://images.unsplash.com/photo-1606016159991-dfe4f2746ad5?w=1200&q=80',
      'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1200&q=80',
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
    websiteUrl: 'https://learn-buddy.nl',
    gallery: [],
  },
];

export const featuredCaseStudyIds = [
  'rijscholenadvies-bureau',
  'phone-recovery',
  'promotioncars',
  'luxe-vastgoed',
] as const;

const buildLiveScreenshot = (url: string) =>
  `https://image.thum.io/get/width/1600/noanimate/${url}`;

const caseStudyData: Record<string, { screenshot: string; kpis: ProjectKpi[] }> = {
  'rijscholenadvies-bureau': {
    screenshot: buildLiveScreenshot('https://rijscholenadviesbureau.nl'),
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
    screenshot: buildLiveScreenshot('https://phone-recovery.nl'),
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
    screenshot: buildLiveScreenshot('https://promotioncars.nl'),
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
  'luxe-vastgoed': {
    screenshot: buildLiveScreenshot('https://luxevastgoedamsterdam.nl'),
    kpis: [
      {
        value: '15',
        label: { nl: 'Premium objecten verkocht', en: 'Premium properties sold' },
      },
      {
        value: '+8%',
        label: { nl: 'Gem. verkoopprijs', en: 'Avg. sale price' },
      },
      {
        value: 'Q1',
        label: { nl: 'Resultaatperiode', en: 'Result period' },
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
  return {
    ...project,
    screenshot: caseStudy.screenshot,
    kpis: caseStudy.kpis,
    isCaseStudy: true,
    gallery: [caseStudy.screenshot, ...enrichedGallery],
  };
});

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((project) => project.id === id);
};

export const getNextProject = (currentId: string): Project | undefined => {
  const currentIndex = projects.findIndex((p) => p.id === currentId);
  if (currentIndex === -1 || currentIndex === projects.length - 1) {
    return projects[0];
  }
  return projects[currentIndex + 1];
};

export const getPrevProject = (currentId: string): Project | undefined => {
  const currentIndex = projects.findIndex((p) => p.id === currentId);
  if (currentIndex === -1 || currentIndex === 0) {
    return projects[projects.length - 1];
  }
  return projects[currentIndex - 1];
};

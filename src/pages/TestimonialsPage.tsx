import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CTASection from '@/components/sections/CTASection';
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/hooks/useScrollAnimation';

const TestimonialsPage = () => {
  const { t, language } = useLanguage();

  const testimonials =
    language === 'nl'
      ? [
          {
            name: 'Sarah de Jong',
            company: 'TechFlow Solutions',
            role: 'CEO',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
            text: 'Fantastische samenwerking! Het team begreep precies wat we nodig hadden en leverde een website die onze verwachtingen overtrof. De communicatie was helder en het resultaat is prachtig.',
            rating: 5,
            projectImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
          },
          {
            name: 'Mark van der Berg',
            company: 'ModaStyle Boutique',
            role: 'Eigenaar',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
            text: 'De webshop is precies wat we zochten. Professioneel, snel en gebruiksvriendelijk. De klantenservice is ook top. Onze online verkopen zijn met 60% gestegen!',
            rating: 5,
            projectImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
          },
          {
            name: 'Lisa Bakker',
            company: 'GreenLeaf Catering',
            role: 'Marketing Manager',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
            text: 'Van eerste contact tot oplevering, alles verliep soepel. De website past perfect bij ons merk en onze klanten zijn enthousiast.',
            rating: 5,
            projectImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
          },
          {
            name: 'Peter Janssen',
            company: 'Janssen Advocaten',
            role: 'Partner',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
            text: 'Een professionele en betrouwbare partner. De nieuwe website straalt kwaliteit uit, precies wat we wilden voor ons advocatenkantoor.',
            rating: 5,
            projectImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
          },
          {
            name: 'Emma Visser',
            company: 'Fit & Gezond Studio',
            role: 'Eigenaar',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
            text: 'Dankzij de nieuwe website zijn onze boekingen met 40% gestegen. Ongelooflijk resultaat! Het team denkt echt mee en geeft waardevolle adviezen.',
            rating: 5,
            projectImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
          },
          {
            name: 'Robert Klein',
            company: 'Klein Architecten',
            role: 'Directeur',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
            text: 'Onze portfolio website is een waar meesterwerk geworden. De aandacht voor detail en het begrip voor onze branche was indrukwekkend.',
            rating: 5,
            projectImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80',
          },
        ]
      : [
          {
            name: 'Sarah de Jong',
            company: 'TechFlow Solutions',
            role: 'CEO',
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
            text: 'Fantastic collaboration. The team understood exactly what we needed and delivered a website that exceeded our expectations.',
            rating: 5,
            projectImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&q=80',
          },
          {
            name: 'Mark van der Berg',
            company: 'ModaStyle Boutique',
            role: 'Owner',
            image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
            text: 'The webshop is exactly what we wanted. Professional, fast and easy to use. Customer service is great too.',
            rating: 5,
            projectImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80',
          },
          {
            name: 'Lisa Bakker',
            company: 'GreenLeaf Catering',
            role: 'Marketing Manager',
            image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
            text: 'From first contact to delivery everything ran smoothly. The website fits our brand perfectly.',
            rating: 5,
            projectImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
          },
          {
            name: 'Peter Janssen',
            company: 'Janssen Advocaten',
            role: 'Partner',
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
            text: 'A professional and reliable partner. The new website communicates quality, exactly what we wanted.',
            rating: 5,
            projectImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80',
          },
          {
            name: 'Emma Visser',
            company: 'Fit & Healthy Studio',
            role: 'Owner',
            image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
            text: 'Thanks to the new website our bookings increased by 40%. Incredible result and great advice.',
            rating: 5,
            projectImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
          },
          {
            name: 'Robert Klein',
            company: 'Klein Architects',
            role: 'Director',
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
            text: 'Our portfolio website became a masterpiece. The attention to detail and understanding of our industry was impressive.',
            rating: 5,
            projectImage: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600&q=80',
          },
        ];

  const stats =
    language === 'nl'
      ? [
          { value: '150+', label: 'Projecten Afgerond' },
          { value: '98%', label: 'Tevreden Klanten' },
          { value: '5★', label: 'Gemiddelde Beoordeling' },
        ]
      : [
          { value: '150+', label: 'Projects Delivered' },
          { value: '98%', label: 'Satisfied Clients' },
          { value: '5★', label: 'Average Rating' },
        ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero with Image */}
        <section className="py-12 relative overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80" 
              alt="Happy clients"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/60" />
          </div>
          <div className="container mx-auto container-padding relative">
            <div className="max-w-2xl">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">{t.pages.testimonials.hero}</h1>
              <p className="text-muted-foreground mb-6">{t.pages.testimonials.heroSubtitle}</p>
              
              {/* Stats */}
              <div className="flex gap-6">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <div className="text-xl font-display font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        <div className="container mx-auto container-padding">
          <div className="section-divider-strong" />
        </div>

        {/* Testimonials Grid */}
        <section className="section-padding">
          <motion.div 
            className="container mx-auto container-padding"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="bg-card hover:bg-card transition-all duration-500 border-border/50 hover:border-primary/30 hover:shadow-xl h-full overflow-hidden">
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={testimonial.projectImage} 
                        alt={`Project for ${testimonial.company}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                        />
                        <div>
                          <p className="font-medium text-foreground">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}, {testimonial.company}</p>
                        </div>
                      </div>

                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                        ))}
                      </div>

                      <div className="flex gap-2 mb-4">
                        <Quote className="w-8 h-8 text-primary/30 flex-shrink-0" />
                        <p className="text-foreground leading-relaxed">
                          {testimonial.text}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default TestimonialsPage;

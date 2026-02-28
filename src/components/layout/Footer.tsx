import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/logo.png';

const Footer = () => {
  const { t } = useLanguage();

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
            <Link to="/privacy" className="hover:text-primary transition-colors">{t.footer.privacy}</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">{t.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

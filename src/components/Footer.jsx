import { useLanguage } from '../LanguageContext';
import { getCountryConfig, getDynamicContacts } from '../countryConfig';

const Footer = () => {
  const { t } = useLanguage();
  const dynamicContacts = getDynamicContacts();

  return (
    <footer className="bg-gray-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4 text-primary-400">HEATHOME</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Especialistas en calefacción eléctrica por piso radiante. Desarrollamos e implementamos productos de alta calidad para la comodidad del hogar.
            </p>
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-3 text-primary-400">INSTAGRAM:</h4>
              <a 
                href={dynamicContacts.instagram || "https://www.instagram.com/heat.home.sudamerica/"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-primary-400 transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <span>@heat.home.sudamerica</span>
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-400">Contacto</h4>
            <div className="space-y-3">
              <div>
                <h5 className="font-semibold text-white mb-2">Teléfonos:</h5>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">ARG:</span>
                    <a href={`tel:${dynamicContacts.phones?.argentina || '+5491155770238'}`} className="text-gray-300 hover:text-primary-400 transition-colors">
                      {dynamicContacts.phones?.argentina || '+549 11 5577 0238'}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">BR:</span>
                    <a href={`tel:${dynamicContacts.phones?.brasil || '+555399054981'}`} className="text-gray-300 hover:text-primary-400 transition-colors">
                      {dynamicContacts.phones?.brasil || '+55 53 99905 4981'}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">UY:</span>
                    <a href={`tel:${dynamicContacts.phones?.uruguay || '+59897959399'}`} className="text-gray-300 hover:text-primary-400 transition-colors">
                      {dynamicContacts.phones?.uruguay || '+598 97 959 399'}
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href={`mailto:${dynamicContacts.email || 'info@heathome.net'}`} className="text-gray-300 hover:text-primary-400 transition-colors">
                  {dynamicContacts.email || 'info@heathome.net'}
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-primary-400">{t('footer.quickLinks')}</h4>
            <div className="space-y-2">
              <a href="#about" className="block text-gray-300 hover:text-primary-400 transition-colors">
                {t('footer.about')}
              </a>
              <a href="#process" className="block text-gray-300 hover:text-primary-400 transition-colors">
                {t('footer.process')}
              </a>
              <a href="#features" className="block text-gray-300 hover:text-primary-400 transition-colors">
                {t('footer.features')}
              </a>
              <a href="#testimonials" className="block text-gray-300 hover:text-primary-400 transition-colors">
                {t('footer.testimonials')}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 HEATHOME. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

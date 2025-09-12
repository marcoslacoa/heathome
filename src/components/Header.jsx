import { useState } from 'react';
import { useLanguage } from '../LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const { t } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/images/logo.png" 
              alt="Heathome Logo" 
              className="h-12 md:h-16 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-primary-500 transition-colors"
            >
              {t('nav.about')}
            </button>
            <button
              onClick={() => scrollToSection('process')}
              className="text-gray-700 hover:text-primary-500 transition-colors"
            >
              {t('nav.process')}
            </button>
            <button
              onClick={() => scrollToSection('products')}
              className="text-gray-700 hover:text-primary-500 transition-colors"
            >
              {t('nav.products')}
            </button>
            <button
              onClick={() => scrollToSection('testimonials')}
              className="text-gray-700 hover:text-primary-500 transition-colors"
            >
              {t('nav.contact')}
            </button>
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-primary-500 transition-colors text-left"
              >
                {t('nav.about')}
              </button>
              <button
                onClick={() => scrollToSection('process')}
                className="text-gray-700 hover:text-primary-500 transition-colors text-left"
              >
                {t('nav.process')}
              </button>
              <button
                onClick={() => scrollToSection('products')}
                className="text-gray-700 hover:text-primary-500 transition-colors text-left"
              >
                {t('nav.products')}
              </button>
              <button
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-700 hover:text-primary-500 transition-colors text-left"
              >
                {t('nav.contact')}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;

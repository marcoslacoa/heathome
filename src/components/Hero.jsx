import { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { getCountryConfig } from '../countryConfig';

const Hero = () => {
  const { t, country } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const countryData = getCountryConfig(country);

  const slides = [
    '/images/heathome-portada.jpg',
    '/images/heathome-portada2.jpg',
    '/images/heathome-portada3.jpg'
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const goToShop = () => {
    window.open(countryData.storeUrl, '_blank');
  };

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-screen overflow-hidden" style={{ height: '80vh' }}>
      {/* Slider Container */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide}
              alt={`Heathome portada ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-shadow-lg">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-medium">
              {t('hero.subtitle')}
            </p>
            <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto opacity-90">
              {t('hero.description')}
            </p>
            
            {/* Action buttons */}
            <div className="flex justify-center items-center">
              <button
                onClick={goToShop}
                className="bg-primary-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-primary-600 transition-all transform hover:scale-105 shadow-lg"
              >
                {t('hero.cta')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-white scale-110'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;

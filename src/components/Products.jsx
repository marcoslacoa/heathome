import { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';

const Products = () => {
  const { language } = useLanguage();
  const [modalImage, setModalImage] = useState(null);

  const openModal = (imageSrc, imageAlt) => {
    setModalImage({ src: imageSrc, alt: imageAlt });
  };

  const closeModal = () => {
    setModalImage(null);
  };

  // Manejar tecla ESC para cerrar modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    if (modalImage) {
      document.addEventListener('keydown', handleEscape);
      // Prevenir scroll del body cuando el modal está abierto
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [modalImage]);

  const products = [
    {
      id: 1,
      name: {
        es: 'Termostato Inteligente',
        en: 'Smart Thermostat'
      },
      description: {
        es: 'Control preciso de temperatura con programación avanzada y conectividad Wi-Fi para el máximo confort.',
        en: 'Precise temperature control with advanced programming and Wi-Fi connectivity for maximum comfort.'
      },
      image: '/images/termostato.png',
      features: {
        es: ['Programación semanal', 'Control remoto', 'Ahorro energético', 'Pantalla táctil'],
        en: ['Weekly programming', 'Remote control', 'Energy saving', 'Touch screen']
      }
    },
    {
      id: 2,
      name: {
        es: 'Cable Calefactor + Instalación',
        en: 'Heating Cable + Installation'
      },
      description: {
        es: 'Sistema completo de calefacción por suelo radiante con cable calefactor de alta calidad e instalación profesional incluida.',
        en: 'Complete underfloor heating system with high-quality heating cable and professional installation included.'
      },
      image: '/images/cable.png',
      installationImage: '/images/Instalacion.jpg',
      features: {
        es: ['Instalación profesional', 'Garantía extendida', 'Cable de alta calidad', 'Distribución uniforme'],
        en: ['Professional installation', 'Extended warranty', 'High quality cable', 'Uniform distribution']
      }
    }
  ];

  return (
    <section id="products" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'es' ? '¿Qué Vendemos?' : 'What Do We Sell?'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'es' 
              ? 'Descubre nuestros productos de calefacción de alta calidad, diseñados para brindarte el máximo confort en tu hogar.'
              : 'Discover our high-quality heating products, designed to provide you with maximum comfort in your home.'
            }
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              {/* Product Image */}
              <div className="relative h-80 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-8">
                <img 
                  src={product.image} 
                  alt={product.name[language]}
                  className="max-h-full max-w-full object-contain"
                />
                {product.installationImage && (
                  <button
                    onClick={() => openModal(product.installationImage, 'Proceso de Instalación')}
                    className="absolute top-4 right-4 w-24 h-24 rounded-lg overflow-hidden shadow-lg border-2 border-white hover:border-primary-300 transition-all duration-300 hover:scale-105 cursor-pointer group"
                  >
                    <img 
                      src={product.installationImage} 
                      alt="Instalación"
                      className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </button>
                )}
              </div>

              {/* Product Info */}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {product.name[language]}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {product.description[language]}
                </p>

                {/* Features */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    {language === 'es' ? 'Características:' : 'Features:'}
                  </h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {product.features[language].map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 text-primary-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button */}
                <div className="flex justify-center">
                  <a 
                    href="https://al2839543.mercadoshops.com.ar/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 inline-flex items-center"
                  >
                    {language === 'es' ? 'Ver en Tienda' : 'View in Store'}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {language === 'es' ? '¿Necesitas más información?' : 'Need more information?'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'es' 
                ? 'Nuestros expertos están listos para ayudarte a elegir la mejor solución de calefacción para tu hogar.'
                : 'Our experts are ready to help you choose the best heating solution for your home.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#contact" 
                className="bg-secondary-500 hover:bg-secondary-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 inline-flex items-center justify-center"
              >
                {language === 'es' ? 'Contactanos' : 'Contact Us'}
              </a>
              <a 
                href="https://al2839543.mercadoshops.com.ar/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 inline-flex items-center justify-center"
              >
                {language === 'es' ? 'Ir a Tienda' : 'Go to Store'}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para imagen ampliada */}
      {modalImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-4xl max-h-full">
            {/* Botón de cerrar */}
            <button
              onClick={closeModal}
              className="absolute -top-12 right-0 text-white hover:text-primary-300 transition-colors duration-300"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Imagen ampliada */}
            <img
              src={modalImage.src}
              alt={modalImage.alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Título de la imagen */}
            <div className="absolute -bottom-12 left-0 right-0 text-center">
              <p className="text-white text-lg font-medium">
                {language === 'es' ? 'Proceso de Instalación' : 'Installation Process'}
              </p>
            </div>
          </div>
          
          {/* Instrucciones */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <p className="text-white text-sm opacity-75">
              {language === 'es' ? 'Haz clic fuera de la imagen para cerrar' : 'Click outside the image to close'}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;

import { useState, useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import { getCountryConfig } from '../countryConfig';

const Products = () => {
  const { language, country } = useLanguage();
  const [modalImage, setModalImage] = useState(null);
  const countryData = getCountryConfig(country);

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
        es: 'Cable 360 Watts para Piso Radiante Eléctrico',
        pt: 'Cabo 360 Watts para Piso Radiante Elétrico'
      },
      description: {
        es: 'Cable calefactor de 360 watts ideal para calefaccionar 3.5 metros cuadrados. Perfecto para baños y espacios pequeños con distribución uniforme del calor.',
        pt: 'Cabo aquecedor de 360 watts ideal para aquecer 3.5 metros quadrados. Perfeito para banheiros e espaços pequenos com distribuição uniforme de calor.'
      },
      coverage: {
        es: '3.5 metros cuadrados',
        pt: '3.5 metros quadrados'
      },
      image: '/images/cable.png',
      features: {
        es: ['360 Watts de potencia', '3.5 m² de cobertura', 'Fácil instalación', 'Distribución uniforme del calor', 'Alta eficiencia energética'],
        pt: ['360 Watts de potência', '3.5 m² de cobertura', 'Fácil instalação', 'Distribuição uniforme de calor', 'Alta eficiência energética']
      }
    },
    {
      id: 2,
      name: {
        es: 'Kit Calefacción Piso Radiante Eléctrico - 3.5M2 Termo WIFI',
        pt: 'Kit Aquecimento Piso Radiante Elétrico - 3.5M2 Termo WIFI'
      },
      description: {
        es: 'Kit completo de calefacción por suelo radiante de 3.5M2 con termostato WIFI para control inteligente desde tu móvil. Incluye cable, termostato y accesorios de instalación.',
        pt: 'Kit completo de aquecimento por piso radiante de 3.5M2 com termostato WIFI para controle inteligente do seu celular. Inclui cabo, termostato e acessórios de instalação.'
      },
      coverage: {
        es: '3.5 metros cuadrados',
        pt: '3.5 metros quadrados'
      },
      image: '/images/kit-termowifi.jpg',
      features: {
        es: ['Control WIFI', '3.5 m² de cobertura', 'Kit completo', 'App móvil incluida', 'Programación avanzada'],
        pt: ['Controle WIFI', '3.5 m² de cobertura', 'Kit completo', 'App móvel incluído', 'Programação avançada']
      }
    },
    {
      id: 3,
      name: {
        es: 'Kit Calefacción Piso Radiante Eléctrico - 13M2 Termo Digital',
        pt: 'Kit Aquecimento Piso Radiante Elétrico - 13M2 Termo Digital'
      },
      description: {
        es: 'Kit completo de calefacción por suelo radiante de 13M2 con termostato digital programable para espacios amplios. Solución ideal para habitaciones grandes.',
        pt: 'Kit completo de aquecimento por piso radiante de 13M2 com termostato digital programável para espaços amplos. Solução ideal para cômodos grandes.'
      },
      coverage: {
        es: '13 metros cuadrados',
        pt: '13 metros quadrados'
      },
      image: '/images/kit-termodigital.jpg',
      features: {
        es: ['Termostato digital', '13 m² de cobertura', 'Kit completo', 'Programación avanzada', 'Para espacios amplios'],
        pt: ['Termostato digital', '13 m² de cobertura', 'Kit completo', 'Programação avançada', 'Para espaços amplos']
      }
    }
  ];

  return (
    <section id="products" className="pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'es' ? 'Nuestros productos' : 'Nossos produtos'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === 'es' 
              ? 'Descubre nuestros productos de calefacción de alta calidad, diseñados para brindarte el máximo confort en tu hogar.'
              : 'Descubra nossos produtos de aquecimento de alta qualidade, projetados para proporcionar o máximo conforto em sua casa.'
            }
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              {/* Product Image */}
              <div className="relative h-64 bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-6">
                <img 
                  src={product.image} 
                  alt={product.name[language]}
                  className="max-h-full max-w-full object-contain"
                />
                {/* Coverage Badge */}
                <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.coverage[language]}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {product.name[language]}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                  {product.description[language]}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    {language === 'es' ? 'Características:' : 'Características:'}
                  </h4>
                  <ul className="grid grid-cols-2 gap-2">
                    {product.features[language].map((feature, index) => (
                      <li key={index} className="flex items-center text-xs text-gray-600">
                        <svg className="w-3 h-3 text-primary-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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
                    href={countryData.storeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 inline-flex items-center text-sm"
                  >
                    {language === 'es' ? 'Ver en Tienda' : 'Ver na Loja'}
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
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
                {language === 'es' ? 'Proceso de Instalación' : 'Processo de Instalação'}
              </p>
            </div>
          </div>
          
          {/* Instrucciones */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <p className="text-white text-sm opacity-75">
              {language === 'es' ? 'Haz clic fuera de la imagen para cerrar' : 'Clique fora da imagem para fechar'}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;

import { useLanguage } from '../LanguageContext';
import { useState, useEffect, useRef } from 'react';

const About = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    experience: 0,
    homes: 0,
    support: 24,
    satisfaction: 0
  });
  const sectionRef = useRef(null);

  // Observer para detectar cuando la sección entra en el viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  // Efecto de animación de contadores
  useEffect(() => {
    if (!isVisible) return;

    const targetValues = {
      experience: 10,
      homes: 1000,
      satisfaction: 100
    };

    const duration = 2000; // 2 segundos
    const steps = 60; // 60 pasos para animación suave
    const stepDuration = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      // Función de easing para efecto más natural
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCounts({
        experience: Math.floor(targetValues.experience * easeOutQuart),
        homes: Math.floor(targetValues.homes * easeOutQuart),
        support: 24, // Este valor es fijo
        satisfaction: Math.floor(targetValues.satisfaction * easeOutQuart)
      });

      if (currentStep >= steps) {
        setCounts({
          experience: targetValues.experience,
          homes: targetValues.homes,
          support: 24,
          satisfaction: targetValues.satisfaction
        });
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <section id="about" className="py-20 bg-gray-50" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            {t('about.title')}
          </h2>
        </div>

        {/* Statistics */}
        <div className="mb-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center animate-fade-in-up">
            <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2 transition-all duration-300">
              {counts.experience}+
            </div>
            <div className="text-gray-600">{t('about.stats.experience')}</div>
          </div>
          <div className="text-center animate-fade-in-up">
            <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2 transition-all duration-300">
              {counts.homes}+
            </div>
            <div className="text-gray-600">{t('about.stats.homes')}</div>
          </div>
          <div className="text-center animate-fade-in-up">
            <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2 transition-all duration-300">
              {counts.support}/7
            </div>
            <div className="text-gray-600">{t('about.stats.support')}</div>
          </div>
          <div className="text-center animate-fade-in-up">
            <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2 transition-all duration-300">
              {counts.satisfaction}%
            </div>
            <div className="text-gray-600">{t('about.stats.satisfaction')}</div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* ¿Quiénes somos? */}
          <div className="animate-fade-in-up">
            <div className="bg-white rounded-2xl shadow-custom h-full overflow-hidden">
              <div className="w-full h-48 overflow-hidden">
                <img 
                  src="/images/about/1.jpg" 
                  alt="¿Quiénes somos?" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {t('about.whoWeAre')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('about.whoWeAreDesc')}
                </p>
              </div>
            </div>
          </div>

          {/* ¿Qué hacemos? */}
          <div className="animate-fade-in-up">
            <div className="bg-white rounded-2xl shadow-custom h-full overflow-hidden">
              <div className="w-full h-48 overflow-hidden">
                <img 
                  src="/images/about/2.jpg" 
                  alt="¿Qué hacemos?" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {t('about.whatWeDo')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('about.whatWeDoDesc')}
                </p>
              </div>
            </div>
          </div>

          {/* ¿Qué fabricamos? */}
          <div className="animate-fade-in-up">
            <div className="bg-white rounded-2xl shadow-custom h-full overflow-hidden">
              <div className="w-full h-48 overflow-hidden">
                <img 
                  src="/images/about/3.jpg" 
                  alt="¿Qué fabricamos?" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  {t('about.whatWeMake')}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {t('about.whatWeMakeDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import { useLanguage } from '../LanguageContext';

const About = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            {t('about.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* What we do */}
          <div className="animate-fade-in-up">
            <div className="bg-white p-8 rounded-2xl shadow-custom">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                {t('about.whatWeDo')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('about.whatWeDoDesc')}
              </p>
            </div>
          </div>

          {/* What we manufacture */}
          <div className="animate-fade-in-up">
            <div className="bg-white p-8 rounded-2xl shadow-custom">
              <div className="w-16 h-16 gradient-bg-secondary rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                {t('about.whatWeMake')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('about.whatWeMakeDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center animate-fade-in-up">
            <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">10+</div>
            <div className="text-gray-600">Años de experiencia</div>
          </div>
          <div className="text-center animate-fade-in-up">
            <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">1000+</div>
            <div className="text-gray-600">Hogares calefaccionados</div>
          </div>
          <div className="text-center animate-fade-in-up">
            <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">24/7</div>
            <div className="text-gray-600">Soporte técnico</div>
          </div>
          <div className="text-center animate-fade-in-up">
            <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">100%</div>
            <div className="text-gray-600">Satisfacción garantizada</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

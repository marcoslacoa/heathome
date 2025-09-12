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
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* ¿Quiénes somos? */}
          <div className="animate-fade-in-up">
            <div className="bg-white p-8 rounded-2xl shadow-custom h-full">
              <div className="w-16 h-16 gradient-bg rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                {t('about.whoWeAre')}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t('about.whoWeAreDesc')}
              </p>
            </div>
          </div>

          {/* ¿Qué hacemos? */}
          <div className="animate-fade-in-up">
            <div className="bg-white p-8 rounded-2xl shadow-custom h-full">
              <div className="w-16 h-16 gradient-bg-secondary rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
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

          {/* ¿Qué fabricamos? */}
          <div className="animate-fade-in-up">
            <div className="bg-white p-8 rounded-2xl shadow-custom h-full">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
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
            <div className="text-gray-600">{t('about.stats.experience')}</div>
          </div>
          <div className="text-center animate-fade-in-up">
            <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">1000+</div>
            <div className="text-gray-600">{t('about.stats.homes')}</div>
          </div>
          <div className="text-center animate-fade-in-up">
            <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">24/7</div>
            <div className="text-gray-600">{t('about.stats.support')}</div>
          </div>
          <div className="text-center animate-fade-in-up">
            <div className="text-3xl md:text-4xl font-bold text-primary-500 mb-2">100%</div>
            <div className="text-gray-600">{t('about.stats.satisfaction')}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

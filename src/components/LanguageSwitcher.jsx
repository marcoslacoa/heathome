import { useLanguage } from '../LanguageContext';
import spainFlag from '../assets/flags/spain.svg';
import ukFlag from '../assets/flags/uk.svg';

const LanguageSwitcher = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => changeLanguage('es')}
        className={`w-8 h-6 rounded overflow-hidden border-2 transition-all ${
          language === 'es' ? 'border-primary-500 scale-110' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <img src={spainFlag} alt="Español" className="w-full h-full object-cover" />
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`w-8 h-6 rounded overflow-hidden border-2 transition-all ${
          language === 'en' ? 'border-primary-500 scale-110' : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <img src={ukFlag} alt="English" className="w-full h-full object-cover" />
      </button>
    </div>
  );
};

export default LanguageSwitcher;

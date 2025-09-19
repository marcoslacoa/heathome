import { useLanguage } from '../LanguageContext';
import uruguayFlag from '../assets/flags/uruguay.svg';
import argentinaFlag from '../assets/flags/argentina.svg';
import brazilFlag from '../assets/flags/brazil.svg';

const LanguageSwitcher = () => {
  const { country, changeCountry } = useLanguage();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => changeCountry('uruguay')}
        className={`w-8 h-6 rounded overflow-hidden border-2 transition-all ${
          country === 'uruguay' ? 'border-primary-500 scale-110' : 'border-gray-300 hover:border-gray-400'
        }`}
        title="Uruguay"
      >
        <img src={uruguayFlag} alt="Uruguay" className="w-full h-full object-cover" />
      </button>
      <button
        onClick={() => changeCountry('argentina')}
        className={`w-8 h-6 rounded overflow-hidden border-2 transition-all ${
          country === 'argentina' ? 'border-primary-500 scale-110' : 'border-gray-300 hover:border-gray-400'
        }`}
        title="Argentina"
      >
        <img src={argentinaFlag} alt="Argentina" className="w-full h-full object-cover" />
      </button>
      <button
        onClick={() => changeCountry('brasil')}
        className={`w-8 h-6 rounded overflow-hidden border-2 transition-all ${
          country === 'brasil' ? 'border-primary-500 scale-110' : 'border-gray-300 hover:border-gray-400'
        }`}
        title="Brasil"
      >
        <img src={brazilFlag} alt="Brasil" className="w-full h-full object-cover" />
      </button>
    </div>
  );
};

export default LanguageSwitcher;

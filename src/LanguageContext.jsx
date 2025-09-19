import { createContext, useContext, useState } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [country, setCountry] = useState('uruguay'); // uruguay, argentina, brasil
  
  // Mapear país a idioma
  const getLanguage = (countryCode) => {
    const languageMap = {
      'uruguay': 'es',
      'argentina': 'es', 
      'brasil': 'pt'
    };
    return languageMap[countryCode] || 'es';
  };

  const language = getLanguage(country);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const changeCountry = (countryCode) => {
    setCountry(countryCode);
  };

  return (
    <LanguageContext.Provider value={{ 
      country, 
      language, 
      changeCountry, 
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

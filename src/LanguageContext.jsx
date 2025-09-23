import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [country, setCountry] = useState('argentina'); // argentina, brasil, uruguay
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  
  // Mapear país a idioma
  const getLanguage = (countryCode) => {
    const languageMap = {
      'argentina': 'es',
      'brasil': 'pt', 
      'uruguay': 'es'
    };
    return languageMap[countryCode] || 'es';
  };

  const language = getLanguage(country);

  // Verificar si es la primera visita al cargar la aplicación
  useEffect(() => {
    const savedCountry = localStorage.getItem('heathome-country');
    const hasVisited = localStorage.getItem('heathome-visited');
    
    if (hasVisited && savedCountry) {
      setCountry(savedCountry);
      setIsFirstVisit(false);
    } else {
      setIsFirstVisit(true);
    }
    
    setIsLoading(false);
  }, []);

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
    localStorage.setItem('heathome-country', countryCode);
    localStorage.setItem('heathome-visited', 'true');
  };

  const handleFirstVisitComplete = (selectedCountry) => {
    setCountry(selectedCountry);
    setIsFirstVisit(false);
    localStorage.setItem('heathome-country', selectedCountry);
    localStorage.setItem('heathome-visited', 'true');
  };

  return (
    <LanguageContext.Provider value={{ 
      country, 
      language, 
      changeCountry,
      isFirstVisit,
      isLoading,
      handleFirstVisitComplete,
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

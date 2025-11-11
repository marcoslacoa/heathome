import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';
import { initializeDynamicConfig } from './countryConfig';
import { getCountryFromIP } from './services/geolocation';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [country, setCountry] = useState(() => {
    // Cargar país guardado, argentina por defecto
    const savedCountry = localStorage.getItem('heathome-country');
    return savedCountry && ['argentina', 'brasil', 'uruguay'].includes(savedCountry)
      ? savedCountry
      : 'argentina';
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);

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

  // Inicializar configuración dinámica y detectar país automáticamente
  useEffect(() => {
    const initializeApp = async () => {
      // Inicializar configuración dinámica de tiendas
      await initializeDynamicConfig();

      const savedCountry = localStorage.getItem('heathome-country');

      // Solo detectar si no hay país guardado
      if (!savedCountry) {
        // Timeout de seguridad: si tarda más de 10 segundos, continuar de todos modos
        const maxTimeout = setTimeout(() => {
          console.warn('[LanguageContext] ⚠️ Timeout de detección alcanzado, cargando página con país por defecto');
          setCountry('argentina');
          localStorage.setItem('heathome-country', 'argentina');
          setIsDetectingLocation(false);
          setIsLoading(false);
        }, 10000); // 10 segundos máximo

        try {
          setIsDetectingLocation(true);

          const detectedCountry = await getCountryFromIP();

          // Limpiar el timeout de seguridad si llegamos aquí
          clearTimeout(maxTimeout);

          if (detectedCountry && ['argentina', 'brasil', 'uruguay'].includes(detectedCountry)) {
            setCountry(detectedCountry);
            localStorage.setItem('heathome-country', detectedCountry);
            console.log('[LanguageContext] ✅ País detectado automáticamente:', detectedCountry);
          } else {
            // Si el país detectado no está en nuestra lista, usar argentina por defecto
            console.warn('[LanguageContext] País detectado no está en la lista, usando Argentina por defecto');
            setCountry('argentina');
            localStorage.setItem('heathome-country', 'argentina');
          }

        } catch (error) {
          console.error('[LanguageContext] ❌ Error detectando país por IP:', error);
          clearTimeout(maxTimeout);

          setCountry('argentina');
          localStorage.setItem('heathome-country', 'argentina');
        } finally {
          setIsDetectingLocation(false);
          setIsLoading(false);
        }
      } else {
        // Si hay país guardado, solo cargar
        setIsLoading(false);
      }
    };

    initializeApp();
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
  };

  return (
    <LanguageContext.Provider value={{
      country,
      language,
      changeCountry,
      isLoading,
      isDetectingLocation,
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

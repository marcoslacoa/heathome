# Sistema Completo de Multi-Idioma con Geolocalización Automática

Guía completa para implementar un sistema robusto de detección automática de idioma basado en geolocalización IP, con fallbacks, timeouts y manejo de errores.

---

## 📋 Tabla de Contenidos

1. [Descripción General](#descripción-general)
2. [Arquitectura del Sistema](#arquitectura-del-sistema)
3. [Componentes del Sistema](#componentes-del-sistema)
4. [Instalación Paso a Paso](#instalación-paso-a-paso)
5. [Configuración de Idiomas](#configuración-de-idiomas)
6. [Sistema de Geolocalización](#sistema-de-geolocalización)
7. [Contexto de Idioma (React Context)](#contexto-de-idioma-react-context)
8. [Traducciones](#traducciones)
9. [Hooks Personalizados](#hooks-personalizados)
10. [Manejo de Errores y Timeouts](#manejo-de-errores-y-timeouts)
11. [Testing y Debugging](#testing-y-debugging)
12. [Optimizaciones](#optimizaciones)
13. [Problemas Comunes](#problemas-comunes)
14. [Migración desde Otro Proyecto](#migración-desde-otro-proyecto)

---

## Descripción General

Este sistema permite:

✅ **Detección automática de idioma** basada en la IP del usuario
✅ **Triple fallback** entre servicios de geolocalización
✅ **Timeout de seguridad** para evitar pantallas en blanco
✅ **Persistencia** del idioma seleccionado en localStorage
✅ **Cambio manual** de idioma por el usuario
✅ **100% gratuito** con límites generosos
✅ **Logs detallados** para debugging
✅ **Compatible con SSR** (Server-Side Rendering)

### Flujo de Detección

```
Usuario carga página
    ↓
¿Hay idioma guardado en localStorage?
    ↓ No
Iniciar detección de geolocalización (max 10s)
    ↓
Probar servicio 1 (ipapi.co) - timeout 5s
    ↓ Falla
Probar servicio 2 (ipinfo.io) - timeout 5s
    ↓ Falla
Probar servicio 3 (ip-api.com) - timeout 5s
    ↓ Falla
Usar idioma por defecto (español)
    ↓
Guardar en localStorage
    ↓
Cargar página
```

---

## Arquitectura del Sistema

```
src/
├── services/
│   ├── geolocation.js           # Lógica de detección de IP
│   └── geolocation-mock.js      # Mock para testing (opcional)
│
├── contexts/
│   └── LanguageContext.jsx      # Context API de React
│
├── hooks/
│   └── useGeolocation.js        # Hooks personalizados
│
└── App.jsx                      # Wrapper con LanguageProvider
```

---

## Componentes del Sistema

### 1. Servicio de Geolocalización (`geolocation.js`)

Responsable de detectar la ubicación del usuario mediante su IP.

**Características:**
- 3 servicios gratuitos con fallback automático
- Timeout individual de 5 segundos por servicio
- Mapeo de países a idiomas
- Logs detallados

**Servicios utilizados:**

| Servicio | Límite Gratis | HTTPS | Prioridad |
|----------|---------------|-------|-----------|
| ipapi.co | 30,000/mes | ✅ | 1º |
| ipinfo.io | 50,000/mes | ✅ | 2º |
| ip-api.com | Ilimitado (1000/min) | ✅ | 3º |

### 2. Context de Idioma (`LanguageContext.jsx`)

Maneja el estado global del idioma en toda la aplicación.

**Responsabilidades:**
- Detectar idioma automáticamente al cargar
- Guardar/cargar idioma de localStorage
- Proveer funciones de traducción (`t()`)
- Manejar cambios manuales de idioma
- Timeout de seguridad de 10 segundos

### 3. Hooks Personalizados (`useGeolocation.js`)

Facilita el uso de geolocalización en componentes React.

**Hooks disponibles:**
- `useGeolocation()` - Ubicación completa
- `useLanguageFromIP()` - Solo idioma

---

## Instalación Paso a Paso

### Paso 1: Crear el servicio de geolocalización

Crea `src/services/geolocation.js`:

```javascript
// src/services/geolocation.js

// Timeout para requests (5 segundos)
const REQUEST_TIMEOUT = 5000;

/**
 * Función auxiliar para hacer fetch con timeout
 */
const fetchWithTimeout = async (url, timeout = REQUEST_TIMEOUT) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === 'AbortError') {
      throw new Error(`Request timeout after ${timeout}ms`);
    }
    throw error;
  }
};

// Mapeo de códigos de país a idiomas
const COUNTRY_TO_LANGUAGE = {
  // Español
  'ES': 'es', 'AR': 'es', 'CO': 'es', 'MX': 'es',
  'PE': 'es', 'CL': 'es', 'UY': 'es', 'PY': 'es',
  'BO': 'es', 'VE': 'es', 'EC': 'es',

  // Português
  'BR': 'pt', 'PT': 'pt',

  // English
  'US': 'en', 'GB': 'en', 'CA': 'en', 'AU': 'en',
  'IE': 'en', 'NZ': 'en', 'ZA': 'en',
};

/**
 * Opción 1: ipapi.co (30,000 requests gratis/mes)
 */
export const getLocationIPAPI = async () => {
  const serviceName = 'ipapi.co';
  try {
    console.log(`[Geolocation] Intentando con ${serviceName}...`);
    const response = await fetchWithTimeout('https://ipapi.co/json/');

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    if (!data.country_code) {
      throw new Error('Respuesta sin código de país');
    }

    console.log(`[Geolocation] ✅ ${serviceName} exitoso:`, {
      country: data.country_code,
      countryName: data.country_name,
      ip: data.ip
    });

    return {
      country: data.country_code,
      countryName: data.country_name,
      city: data.city,
      region: data.region,
      ip: data.ip,
      language: COUNTRY_TO_LANGUAGE[data.country_code] || 'en'
    };
  } catch (error) {
    console.error(`[Geolocation] ❌ Error en ${serviceName}:`, error.message);
    return null;
  }
};

/**
 * Opción 2: ipinfo.io (50,000 requests gratis/mes)
 */
export const getLocationIPInfo = async () => {
  const serviceName = 'ipinfo.io';
  try {
    console.log(`[Geolocation] Intentando con ${serviceName}...`);
    const response = await fetchWithTimeout('https://ipinfo.io/json');

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    if (!data.country) {
      throw new Error('Respuesta sin código de país');
    }

    console.log(`[Geolocation] ✅ ${serviceName} exitoso:`, {
      country: data.country,
      city: data.city,
      ip: data.ip
    });

    return {
      country: data.country,
      countryName: data.country,
      city: data.city,
      region: data.region,
      ip: data.ip,
      language: COUNTRY_TO_LANGUAGE[data.country] || 'en'
    };
  } catch (error) {
    console.error(`[Geolocation] ❌ Error en ${serviceName}:`, error.message);
    return null;
  }
};

/**
 * Opción 3: ip-api.com (gratuita, ilimitada)
 */
export const getLocationIPAPIcom = async () => {
  const serviceName = 'ip-api.com';
  try {
    console.log(`[Geolocation] Intentando con ${serviceName}...`);
    const response = await fetchWithTimeout('https://ip-api.com/json/');

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const data = await response.json();

    if (data.status === 'fail') {
      throw new Error(data.message || 'API returned fail status');
    }

    if (!data.countryCode) {
      throw new Error('Respuesta sin código de país');
    }

    console.log(`[Geolocation] ✅ ${serviceName} exitoso:`, {
      country: data.countryCode,
      countryName: data.country,
      ip: data.query
    });

    return {
      country: data.countryCode,
      countryName: data.country,
      city: data.city,
      region: data.regionName,
      ip: data.query,
      language: COUNTRY_TO_LANGUAGE[data.countryCode] || 'en'
    };
  } catch (error) {
    console.error(`[Geolocation] ❌ Error en ${serviceName}:`, error.message);
    return null;
  }
};

/**
 * Función principal con fallback entre diferentes servicios
 */
export const getUserLocation = async () => {
  console.log('[Geolocation] Iniciando detección de ubicación...');

  const services = [
    { name: 'ipapi.co', fn: getLocationIPAPI },
    { name: 'ipinfo.io', fn: getLocationIPInfo },
    { name: 'ip-api.com', fn: getLocationIPAPIcom }
  ];

  for (let i = 0; i < services.length; i++) {
    const service = services[i];
    try {
      const result = await service.fn();
      if (result) {
        console.log(`[Geolocation] ✅ Ubicación detectada exitosamente con ${service.name}:`, {
          country: result.country,
          countryName: result.countryName,
          language: result.language,
          ip: result.ip
        });
        return result;
      }
    } catch (error) {
      console.warn(`[Geolocation] ⚠️ Servicio ${service.name} falló, probando siguiente...`, error.message);
    }
  }

  console.error('[Geolocation] ❌ TODOS LOS SERVICIOS FALLARON - No se pudo obtener la ubicación del usuario');
  console.warn('[Geolocation] Usando valores por defecto (español)');

  return {
    country: 'Unknown',
    countryName: 'Unknown',
    city: 'Unknown',
    region: 'Unknown',
    ip: 'Unknown',
    language: 'es' // idioma por defecto
  };
};

/**
 * Función para obtener solo el idioma basado en la IP
 */
export const getLanguageFromIP = async () => {
  console.log('[Geolocation] Detectando idioma desde IP...');
  const location = await getUserLocation();
  console.log(`[Geolocation] Idioma detectado: ${location.language}`);
  return location.language;
};
```

### Paso 2: Crear el Context de Idioma

Crea `src/contexts/LanguageContext.jsx`:

```javascript
// src/contexts/LanguageContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { getLanguageFromIP } from '../services/geolocation';

// Definir traducciones (ejemplo mínimo)
const translations = {
  es: {
    welcome: 'Bienvenido',
    // ... más traducciones
  },
  en: {
    welcome: 'Welcome',
    // ... más traducciones
  },
  pt: {
    welcome: 'Bem-vindo',
    // ... más traducciones
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Cargar idioma guardado, español por defecto
    const savedLanguage = localStorage.getItem('app-language');
    return savedLanguage && ['es', 'en', 'pt'].includes(savedLanguage) ? savedLanguage : 'es';
  });

  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const [showLocationLoader, setShowLocationLoader] = useState(false);

  // Detectar idioma por IP al cargar la aplicación
  useEffect(() => {
    const detectOnLoad = async () => {
      const savedLanguage = localStorage.getItem('app-language');

      // Solo detectar si no hay idioma guardado
      if (!savedLanguage) {
        // Timeout de seguridad: si tarda más de 10 segundos, continuar de todos modos
        const maxTimeout = setTimeout(() => {
          console.warn('[LanguageContext] ⚠️ Timeout de detección alcanzado, cargando página con idioma por defecto');
          setLanguage('es');
          localStorage.setItem('app-language', 'es');
          setIsDetectingLocation(false);
          setShowLocationLoader(false);
        }, 10000); // 10 segundos máximo

        try {
          setShowLocationLoader(true);
          setIsDetectingLocation(true);

          const detectedLanguage = await getLanguageFromIP();

          // Limpiar el timeout de seguridad si llegamos aquí
          clearTimeout(maxTimeout);

          if (detectedLanguage && ['es', 'en', 'pt'].includes(detectedLanguage)) {
            setLanguage(detectedLanguage);
            localStorage.setItem('app-language', detectedLanguage);
          }

        } catch (error) {
          console.error('[LanguageContext] ❌ Error detectando idioma por IP:', error);
          clearTimeout(maxTimeout);

          setLanguage('es');
          localStorage.setItem('app-language', 'es');
        } finally {
          setIsDetectingLocation(false);
          setShowLocationLoader(false);
        }
      }
    };

    detectOnLoad();
  }, []);

  // Guardar idioma en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('app-language', language);
  }, [language]);

  // Función para obtener traducciones
  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  const value = {
    language,
    setLanguage,
    t,
    translations: translations[language],
    isDetectingLocation,
    showLocationLoader
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export { LanguageContext };
```

### Paso 3: Crear hooks personalizados (opcional)

Crea `src/hooks/useGeolocation.js`:

```javascript
// src/hooks/useGeolocation.js
import { useState, useEffect } from 'react';
import { getUserLocation, getLanguageFromIP } from '../services/geolocation';

/**
 * Hook para obtener la ubicación completa del usuario
 */
export const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        setLoading(true);
        setError(null);

        const userLocation = await getUserLocation();
        setLocation(userLocation);
      } catch (err) {
        setError(err.message);
        console.error('Error en useGeolocation:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, []);

  return { location, loading, error };
};

/**
 * Hook para obtener solo el idioma detectado
 */
export const useLanguageFromIP = () => {
  const [detectedLanguage, setDetectedLanguage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLanguage = async () => {
      try {
        setLoading(true);
        setError(null);

        const language = await getLanguageFromIP();
        setDetectedLanguage(language);
      } catch (err) {
        setError(err.message);
        setDetectedLanguage('es'); // fallback
        console.error('Error detectando idioma:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLanguage();
  }, []);

  return { detectedLanguage, loading, error };
};
```

### Paso 4: Integrar en App.jsx

```javascript
// src/App.jsx
import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import MainPage from './pages/MainPage';

function App() {
  return (
    <LanguageProvider>
      <MainPage />
    </LanguageProvider>
  );
}

export default App;
```

### Paso 5: Usar en componentes

```javascript
// src/components/Welcome.jsx
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

function Welcome() {
  const { t, language, setLanguage } = useLanguage();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>Idioma actual: {language}</p>

      <button onClick={() => setLanguage('es')}>Español</button>
      <button onClick={() => setLanguage('en')}>English</button>
      <button onClick={() => setLanguage('pt')}>Português</button>
    </div>
  );
}

export default Welcome;
```

---

## Configuración de Idiomas

### Agregar un nuevo idioma

1. **Actualizar el mapeo de países**:

```javascript
// En geolocation.js
const COUNTRY_TO_LANGUAGE = {
  // ... otros
  'FR': 'fr', // Francia → Francés
  'DE': 'de', // Alemania → Alemán
  'IT': 'it', // Italia → Italiano
};
```

2. **Agregar traducciones**:

```javascript
// En LanguageContext.jsx
const translations = {
  // ... otros idiomas
  fr: {
    welcome: 'Bienvenue',
    // ... más traducciones
  },
  de: {
    welcome: 'Willkommen',
    // ... más traducciones
  }
};
```

3. **Actualizar validaciones**:

```javascript
// Busca todas las ocurrencias de ['es', 'en', 'pt'] y agrega los nuevos idiomas
['es', 'en', 'pt', 'fr', 'de']
```

### Cambiar idioma por defecto

```javascript
// En geolocation.js
return {
  // ...
  language: 'en' // Cambiar a inglés por defecto
};

// En LanguageContext.jsx
const savedLanguage = localStorage.getItem('app-language');
return savedLanguage || 'en'; // Cambiar a inglés por defecto
```

---

## Sistema de Geolocalización

### Cómo funciona el fallback

```javascript
Servicio 1 (ipapi.co)
    ↓ timeout 5s o error
Servicio 2 (ipinfo.io)
    ↓ timeout 5s o error
Servicio 3 (ip-api.com)
    ↓ timeout 5s o error
Valores por defecto
```

### Ajustar timeouts

```javascript
// Timeout individual por servicio (en geolocation.js)
const REQUEST_TIMEOUT = 5000; // 5 segundos

// Timeout global de seguridad (en LanguageContext.jsx)
setTimeout(() => {
  // ...cargar con idioma por defecto
}, 10000); // 10 segundos
```

### Agregar más servicios

```javascript
// En geolocation.js
export const getLocationNuevoServicio = async () => {
  const serviceName = 'nuevo-servicio.com';
  try {
    const response = await fetchWithTimeout('https://nuevo-servicio.com/api');
    const data = await response.json();

    return {
      country: data.country_code,
      countryName: data.country_name,
      city: data.city,
      region: data.region,
      ip: data.ip,
      language: COUNTRY_TO_LANGUAGE[data.country_code] || 'en'
    };
  } catch (error) {
    console.error(`[Geolocation] ❌ Error en ${serviceName}:`, error.message);
    return null;
  }
};

// Agregar al array de servicios
const services = [
  { name: 'ipapi.co', fn: getLocationIPAPI },
  { name: 'ipinfo.io', fn: getLocationIPInfo },
  { name: 'ip-api.com', fn: getLocationIPAPIcom },
  { name: 'nuevo-servicio.com', fn: getLocationNuevoServicio } // Nuevo
];
```

---

## Traducciones

### Estructura recomendada

```javascript
const translations = {
  es: {
    // Por componente
    navbar: {
      home: 'Inicio',
      about: 'Acerca de',
      contact: 'Contacto'
    },
    footer: {
      rights: 'Todos los derechos reservados'
    },
    // Por funcionalidad
    auth: {
      login: 'Iniciar sesión',
      logout: 'Cerrar sesión',
      register: 'Registrarse'
    }
  },
  en: {
    navbar: {
      home: 'Home',
      about: 'About',
      contact: 'Contact'
    },
    footer: {
      rights: 'All rights reserved'
    },
    auth: {
      login: 'Login',
      logout: 'Logout',
      register: 'Sign up'
    }
  }
};
```

### Usar traducciones en componentes

```javascript
import { useLanguage } from '../contexts/LanguageContext';

function Navbar() {
  const { t } = useLanguage();

  return (
    <nav>
      <a href="/">{t('navbar.home')}</a>
      <a href="/about">{t('navbar.about')}</a>
      <a href="/contact">{t('navbar.contact')}</a>
    </nav>
  );
}
```

### Traducciones con variables

```javascript
// En translations
const translations = {
  es: {
    greeting: 'Hola {name}, bienvenido'
  },
  en: {
    greeting: 'Hello {name}, welcome'
  }
};

// Función mejorada de traducción
const t = (key, vars = {}) => {
  const keys = key.split('.');
  let value = translations[language];

  for (const k of keys) {
    value = value?.[k];
  }

  if (!value) return key;

  // Reemplazar variables
  return Object.keys(vars).reduce((text, varKey) => {
    return text.replace(`{${varKey}}`, vars[varKey]);
  }, value);
};

// Uso
<h1>{t('greeting', { name: 'Juan' })}</h1>
// Resultado: "Hola Juan, bienvenido"
```

### Traducciones con plurales

```javascript
// En translations
const translations = {
  es: {
    items: {
      zero: 'No hay artículos',
      one: '1 artículo',
      many: '{count} artículos'
    }
  }
};

// Función para plurales
const tPlural = (key, count) => {
  const pluralKey = count === 0 ? 'zero' : count === 1 ? 'one' : 'many';
  return t(`${key}.${pluralKey}`, { count });
};

// Uso
<p>{tPlural('items', 0)}</p> // "No hay artículos"
<p>{tPlural('items', 1)}</p> // "1 artículo"
<p>{tPlural('items', 5)}</p> // "5 artículos"
```

---

## Manejo de Errores y Timeouts

### Errores comunes y soluciones

#### 1. Pantalla en blanco al cargar

**Causa**: La detección de geolocalización cuelga el render.

**Solución**: Timeout de seguridad de 10 segundos en LanguageContext.

```javascript
const maxTimeout = setTimeout(() => {
  console.warn('Timeout alcanzado, cargando con idioma por defecto');
  setLanguage('es');
  setShowLocationLoader(false);
}, 10000);
```

#### 2. Error: "Rate limit exceeded"

**Causa**: Se superó el límite de requests del servicio.

**Solución**: El sistema automáticamente cambia al siguiente servicio. Si persiste, considera cachear:

```javascript
// Guardar resultado en localStorage con timestamp
const location = await getUserLocation();
localStorage.setItem('cached-location', JSON.stringify({
  data: location,
  timestamp: Date.now()
}));

// Leer del cache si es reciente (24 horas)
const cached = JSON.parse(localStorage.getItem('cached-location') || '{}');
const isValid = Date.now() - cached.timestamp < 24 * 60 * 60 * 1000;

if (cached.data && isValid) {
  return cached.data;
}
```

#### 3. Error: "Request timeout"

**Causa**: El servicio tarda más de 5 segundos.

**Solución**: El sistema automáticamente prueba el siguiente servicio. Si necesitas más tiempo:

```javascript
// En geolocation.js
const REQUEST_TIMEOUT = 8000; // 8 segundos en lugar de 5
```

#### 4. Todos los servicios fallan

**Causa**: Usuario sin conexión o servicios caídos.

**Solución**: El sistema devuelve valores por defecto (idioma español).

---

## Testing y Debugging

### Ver logs en consola

Todos los logs tienen el prefijo `[Geolocation]` o `[LanguageContext]`:

```javascript
// Filtrar solo logs de geolocalización
console.log = (function(oldLog) {
  return function(...args) {
    if (args[0].includes('[Geolocation]') || args[0].includes('[LanguageContext]')) {
      oldLog.apply(console, args);
    }
  };
})(console.log);
```

### Simular diferentes países

Ver archivo [TEST_GEOLOCATION.md](TEST_GEOLOCATION.md) para guía completa de testing.

**Método rápido (DevTools Console)**:

```javascript
// Simular Brasil
const originalFetch = window.fetch;
window.fetch = function(url, options) {
  if (url.includes('ipapi.co') || url.includes('ipinfo.io') || url.includes('ip-api.com')) {
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        country_code: 'BR',
        country: 'BR',
        countryCode: 'BR',
        country_name: 'Brasil',
        city: 'São Paulo',
        region: 'São Paulo',
        ip: '177.12.34.56'
      })
    });
  }
  return originalFetch.apply(this, arguments);
};

localStorage.clear();
location.reload();
```

### Simular errores

```javascript
// Simular timeout (offline)
// En DevTools > Network > Throttling > Offline

// Simular latencia
// En DevTools > Network > Throttling > Slow 3G
```

---

## Optimizaciones

### 1. Cache en localStorage

```javascript
// Cachear ubicación por 24 horas
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas

export const getUserLocation = async () => {
  // Intentar leer del cache
  const cached = localStorage.getItem('geo-cache');
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      console.log('[Geolocation] Usando cache');
      return data;
    }
  }

  // Si no hay cache o expiró, detectar
  const location = await detectLocation();

  // Guardar en cache
  localStorage.setItem('geo-cache', JSON.stringify({
    data: location,
    timestamp: Date.now()
  }));

  return location;
};
```

### 2. Lazy loading de traducciones

```javascript
// Cargar traducciones dinámicamente
const loadTranslations = async (lang) => {
  const module = await import(`./translations/${lang}.json`);
  return module.default;
};

// En LanguageContext
useEffect(() => {
  loadTranslations(language).then(setTranslations);
}, [language]);
```

### 3. Detectar solo en primera visita

```javascript
// Solo detectar la primera vez
if (!localStorage.getItem('first-visit-done')) {
  await detectLanguageFromIP();
  localStorage.setItem('first-visit-done', 'true');
}
```

---

## Problemas Comunes

### Problema: El idioma no persiste al recargar

**Solución**: Asegúrate de guardar en localStorage:

```javascript
useEffect(() => {
  localStorage.setItem('app-language', language);
}, [language]);
```

### Problema: Loader no desaparece

**Solución**: Asegúrate de llamar al `finally`:

```javascript
try {
  // detección
} finally {
  setShowLocationLoader(false); // Siempre ejecutar
}
```

### Problema: CORS error

**Causa**: Los servicios de geolocalización no permiten CORS desde ciertos orígenes.

**Solución**: Esto no debería pasar con los servicios recomendados. Si pasa, usa un proxy:

```javascript
// Opción 1: cors-anywhere (solo desarrollo)
const response = await fetch(`https://cors-anywhere.herokuapp.com/${url}`);

// Opción 2: Tu propio backend
const response = await fetch('/api/geo-proxy');
```

---

## Migración desde Otro Proyecto

### Checklist de migración

- [ ] Copiar `src/services/geolocation.js`
- [ ] Copiar `src/contexts/LanguageContext.jsx`
- [ ] Copiar `src/hooks/useGeolocation.js` (opcional)
- [ ] Ajustar mapeo de países según tus idiomas
- [ ] Agregar traducciones en LanguageContext
- [ ] Envolver App con `<LanguageProvider>`
- [ ] Reemplazar textos hardcodeados con `t()`
- [ ] Ajustar localStorage keys si hay conflictos
- [ ] Testear con diferentes países

### Ajustes por framework

#### Next.js

```javascript
// pages/_app.js
import { LanguageProvider } from '../contexts/LanguageContext';

function MyApp({ Component, pageProps }) {
  return (
    <LanguageProvider>
      <Component {...pageProps} />
    </LanguageProvider>
  );
}
```

#### Gatsby

```javascript
// gatsby-browser.js
import { LanguageProvider } from './src/contexts/LanguageContext';

export const wrapRootElement = ({ element }) => (
  <LanguageProvider>{element}</LanguageProvider>
);
```

#### Vue.js

Adaptar el Context a un store de Vuex o Pinia.

---

## Resumen de Archivos

```
ARCHIVOS NECESARIOS:
✅ src/services/geolocation.js          (Obligatorio)
✅ src/contexts/LanguageContext.jsx     (Obligatorio)
✅ src/hooks/useGeolocation.js          (Opcional)

ARCHIVOS OPCIONALES:
📄 src/services/geolocation-mock.js    (Solo testing)
📄 TEST_GEOLOCATION.md                  (Documentación)
📄 GEOLOCATION_SYSTEM.md                (Documentación)
```

---

## Licencia

Este código es libre para usar en cualquier proyecto comercial o personal.

---

**Última actualización**: Noviembre 2024
**Mantenedor**: Sistema Multi-Idioma Eurocable
**Soporte**: Revisa los logs en consola para debugging

---

## Contacto y Soporte

Si encuentras problemas:

1. Revisa los logs en consola (F12)
2. Verifica la pestaña Network para requests fallidas
3. Consulta la sección de Problemas Comunes
4. Revisa [TEST_GEOLOCATION.md](TEST_GEOLOCATION.md) para testing

**Happy coding! 🚀**

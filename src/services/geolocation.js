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

// Mapeo de códigos de país ISO a países de heathome
const COUNTRY_CODE_TO_HEATHOME = {
  // Argentina
  'AR': 'argentina',

  // Brasil
  'BR': 'brasil',

  // Uruguay
  'UY': 'uruguay',
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
      countryCode: data.country_code,
      countryName: data.country_name,
      city: data.city,
      region: data.region,
      ip: data.ip,
      heathomeCountry: COUNTRY_CODE_TO_HEATHOME[data.country_code] || null
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
      countryCode: data.country,
      countryName: data.country,
      city: data.city,
      region: data.region,
      ip: data.ip,
      heathomeCountry: COUNTRY_CODE_TO_HEATHOME[data.country] || null
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
      countryCode: data.countryCode,
      countryName: data.country,
      city: data.city,
      region: data.regionName,
      ip: data.query,
      heathomeCountry: COUNTRY_CODE_TO_HEATHOME[data.countryCode] || null
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
          countryCode: result.countryCode,
          countryName: result.countryName,
          heathomeCountry: result.heathomeCountry,
          ip: result.ip
        });
        return result;
      }
    } catch (error) {
      console.warn(`[Geolocation] ⚠️ Servicio ${service.name} falló, probando siguiente...`, error.message);
    }
  }

  console.error('[Geolocation] ❌ TODOS LOS SERVICIOS FALLARON - No se pudo obtener la ubicación del usuario');
  console.warn('[Geolocation] Usando valores por defecto (Argentina)');

  return {
    countryCode: 'Unknown',
    countryName: 'Unknown',
    city: 'Unknown',
    region: 'Unknown',
    ip: 'Unknown',
    heathomeCountry: 'argentina' // país por defecto
  };
};

/**
 * Función para obtener solo el país de heathome basado en la IP
 */
export const getCountryFromIP = async () => {
  console.log('[Geolocation] Detectando país desde IP...');
  const location = await getUserLocation();
  console.log(`[Geolocation] País detectado: ${location.heathomeCountry}`);
  return location.heathomeCountry;
};

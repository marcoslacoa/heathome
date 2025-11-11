# Sistema de Geolocalización por IP

Documentación completa del sistema de detección de ubicación por IP con fallback automático entre múltiples servicios.

## Descripción

Sistema robusto que detecta la ubicación del usuario basándose en su IP, con las siguientes características:

- ✅ **Triple fallback**: Si un servicio falla, prueba automáticamente con el siguiente
- ✅ **Timeout de 5 segundos**: Evita requests colgadas
- ✅ **100% HTTPS**: Sin problemas de mixed content
- ✅ **Logs detallados**: Fácil diagnóstico de errores
- ✅ **Totalmente gratuito**: Todos los servicios tienen planes free generosos

## Servicios Utilizados

### 1. ipapi.co (Primario)
- **Límite**: 30,000 requests/mes gratis
- **HTTPS**: ✅ Sí
- **Documentación**: https://ipapi.co/

### 2. ipinfo.io (Secundario)
- **Límite**: 50,000 requests/mes gratis
- **HTTPS**: ✅ Sí
- **Documentación**: https://ipinfo.io/

### 3. ip-api.com (Terciario)
- **Límite**: Ilimitado (1000 requests/minuto)
- **HTTPS**: ✅ Sí
- **Documentación**: https://ip-api.com/

## Estructura de Archivos

```
src/
├── services/
│   └── geolocation.js          # Servicio principal
├── hooks/
│   └── useGeolocation.js       # React hooks
└── contexts/
    └── LanguageContext.jsx     # Integración con idiomas
```

## Instalación en un Nuevo Proyecto

### 1. Copiar el archivo principal

Copia `src/services/geolocation.js` a tu proyecto.

### 2. Configurar mapeo de idiomas

Edita el objeto `COUNTRY_TO_LANGUAGE` según tus necesidades:

```javascript
const COUNTRY_TO_LANGUAGE = {
  'ES': 'es',  // España
  'AR': 'es',  // Argentina
  'BR': 'pr',  // Brasil - Português
  'US': 'en',  // Estados Unidos
  // Agrega los países que necesites
};
```

### 3. Ajustar timeout (opcional)

Si necesitas un timeout diferente, modifica la constante:

```javascript
const REQUEST_TIMEOUT = 5000; // 5 segundos (5000ms)
```

## Uso Básico

### Opción 1: Obtener ubicación completa

```javascript
import { getUserLocation } from './services/geolocation';

const detectarUbicacion = async () => {
  const location = await getUserLocation();

  console.log('País:', location.country);        // 'AR'
  console.log('Nombre:', location.countryName); // 'Argentina'
  console.log('Ciudad:', location.city);        // 'Buenos Aires'
  console.log('IP:', location.ip);              // '190.123.45.67'
  console.log('Idioma:', location.language);    // 'es'
};
```

### Opción 2: Solo obtener el idioma

```javascript
import { getLanguageFromIP } from './services/geolocation';

const detectarIdioma = async () => {
  const idioma = await getLanguageFromIP();
  console.log('Idioma detectado:', idioma); // 'es', 'en', 'pr'
};
```

## Integración con React

### Hook personalizado (ya incluido)

```javascript
import { useGeolocation } from './hooks/useGeolocation';

function MiComponente() {
  const { location, loading, error } = useGeolocation();

  if (loading) return <div>Detectando ubicación...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Tu ubicación</h2>
      <p>País: {location.country}</p>
      <p>Ciudad: {location.city}</p>
      <p>Idioma: {location.language}</p>
    </div>
  );
}
```

### Solo idioma

```javascript
import { useLanguageFromIP } from './hooks/useGeolocation';

function MiComponente() {
  const { detectedLanguage, loading } = useLanguageFromIP();

  if (loading) return <div>Detectando idioma...</div>;

  return <div>Idioma: {detectedLanguage}</div>;
}
```

## Sistema de Logs

### Logs de éxito

```
[Geolocation] Iniciando detección de ubicación...
[Geolocation] Intentando con ipapi.co...
[Geolocation] ✅ ipapi.co exitoso: {country: 'AR', countryName: 'Argentina', ip: '190.123.45.67'}
[Geolocation] ✅ Ubicación detectada exitosamente con ipapi.co
[Geolocation] Idioma detectado: es
```

### Logs de fallback

```
[Geolocation] Iniciando detección de ubicación...
[Geolocation] Intentando con ipapi.co...
[Geolocation] ❌ Error en ipapi.co: Request timeout after 5000ms
[Geolocation] ⚠️ Servicio ipapi.co falló, probando siguiente...
[Geolocation] Intentando con ipinfo.io...
[Geolocation] ✅ ipinfo.io exitoso: {country: 'AR', city: 'Buenos Aires', ip: '190.123.45.67'}
```

### Logs de error total

```
[Geolocation] Iniciando detección de ubicación...
[Geolocation] Intentando con ipapi.co...
[Geolocation] ❌ Error en ipapi.co: HTTP 429: Rate limit exceeded
[Geolocation] Intentando con ipinfo.io...
[Geolocation] ❌ Error en ipinfo.io: Request timeout after 5000ms
[Geolocation] Intentando con ip-api.com...
[Geolocation] ❌ Error en ip-api.com: Network error
[Geolocation] ❌ TODOS LOS SERVICIOS FALLARON - No se pudo obtener la ubicación del usuario
[Geolocation] Usando valores por defecto (español)
```

## Debugging

### Ver logs en consola

1. Abre las DevTools del navegador (F12)
2. Ve a la pestaña Console
3. Filtra por `[Geolocation]` para ver solo los logs del sistema

### Problemas comunes

#### Error: "Request timeout"
- **Causa**: El servicio tarda más de 5 segundos en responder
- **Solución**: El sistema automáticamente prueba con el siguiente servicio

#### Error: "HTTP 429: Rate limit exceeded"
- **Causa**: Se superó el límite de requests del servicio
- **Solución**: El sistema cambia automáticamente al siguiente servicio
- **Prevención**: Considera cachear los resultados en localStorage

#### Error: "Respuesta sin código de país"
- **Causa**: El servicio devolvió una respuesta incompleta
- **Solución**: El sistema prueba con el siguiente servicio

#### Todos los servicios fallan
- **Causa**: Usuario sin conexión o servicios caídos simultáneamente
- **Solución**: El sistema devuelve valores por defecto (idioma español)

## Optimizaciones Opcionales

### 1. Cachear resultado en localStorage

```javascript
// Guardar resultado
const location = await getUserLocation();
localStorage.setItem('user-location', JSON.stringify(location));
localStorage.setItem('location-timestamp', Date.now());

// Leer del cache (válido por 24 horas)
const cached = localStorage.getItem('user-location');
const timestamp = localStorage.getItem('location-timestamp');
const isValid = Date.now() - timestamp < 24 * 60 * 60 * 1000;

if (cached && isValid) {
  return JSON.parse(cached);
}
```

### 2. Detectar solo una vez por sesión

```javascript
// En sessionStorage (se borra al cerrar el navegador)
if (!sessionStorage.getItem('location-detected')) {
  const location = await getUserLocation();
  sessionStorage.setItem('location-detected', 'true');
  sessionStorage.setItem('user-location', JSON.stringify(location));
}
```

### 3. Reducir timeout para conexiones rápidas

```javascript
// En geolocation.js
const REQUEST_TIMEOUT = 3000; // 3 segundos en lugar de 5
```

## Respuesta de la API

### Estructura completa

```typescript
interface Location {
  country: string;      // 'AR' - Código de país ISO
  countryName: string;  // 'Argentina' - Nombre del país
  city: string;         // 'Buenos Aires' - Ciudad
  region: string;       // 'Buenos Aires' - Región/Provincia
  ip: string;          // '190.123.45.67' - Dirección IP
  language: string;     // 'es' - Idioma detectado
}
```

### Valores por defecto (cuando falla)

```javascript
{
  country: 'Unknown',
  countryName: 'Unknown',
  city: 'Unknown',
  region: 'Unknown',
  ip: 'Unknown',
  language: 'es'  // Español por defecto
}
```

## Testing

### Probar con VPN

1. Activa una VPN con ubicación específica
2. Recarga la página
3. Verifica en consola qué país detectó
4. Comprueba que el idioma sea correcto

### Simular timeout

```javascript
// En geolocation.js, cambia temporalmente:
const REQUEST_TIMEOUT = 1; // 1ms - forzar timeout

// Todos los servicios fallarán por timeout
// Verás los logs de fallback en acción
```

### Simular error de red

```javascript
// En las DevTools:
// 1. Ve a Network tab
// 2. Selecciona "Offline" en el throttling
// 3. Recarga la página
// 4. Deberías ver el fallback a valores por defecto
```

## Consideraciones de Privacidad

- ✅ Los servicios solo usan la IP pública (no almacenan datos personales)
- ✅ GDPR compliant (no requiere consentimiento de cookies)
- ✅ No se envía información del usuario a los servicios
- ✅ Solo detección pasiva de geolocalización

## Límites y Costos

### ¿Necesito API key?

No, ninguno de los servicios requiere API key en su plan gratuito.

### ¿Cuántas visitas soporta?

Con los 3 servicios combinados:
- **Mínimo garantizado**: 30,000 visitas/mes (ipapi.co)
- **Con fallback**: 50,000+ visitas/mes (ipinfo.io tiene más límite)
- **Backup ilimitado**: ip-api.com como última opción

### ¿Qué pasa si supero los límites?

El sistema automáticamente usa el siguiente servicio disponible. Si los 3 superan el límite (muy improbable), usa valores por defecto.

## Migración desde Versión Anterior

Si ya tenías un sistema de geolocalización, aquí están los cambios:

### Antes (sin timeout)
```javascript
const response = await fetch('https://ipapi.co/json/');
```

### Ahora (con timeout)
```javascript
const response = await fetchWithTimeout('https://ipapi.co/json/');
```

### Antes (HTTP)
```javascript
await fetch('http://ip-api.com/json/');
```

### Ahora (HTTPS)
```javascript
await fetchWithTimeout('https://ip-api.com/json/');
```

## Soporte

### Navegadores compatibles

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Todos los navegadores móviles modernos

### Requisitos

- JavaScript ES6+ (async/await)
- Fetch API
- AbortController (para timeout)

## Changelog

### Versión 2.0 (Actual)
- ✅ Agregado timeout de 5 segundos
- ✅ Cambiado ip-api.com de HTTP a HTTPS
- ✅ Logs detallados de diagnóstico
- ✅ Mejor manejo de errores
- ✅ Validación de respuestas

### Versión 1.0 (Anterior)
- Detección básica con 3 servicios
- Sin timeout
- Logs básicos

## Licencia

Este código es libre para usar en cualquier proyecto.

---

**Última actualización**: Noviembre 2024
**Autor**: Sistema de geolocalización Eurocable
**Contacto**: Para dudas o mejoras, consulta con el equipo de desarrollo

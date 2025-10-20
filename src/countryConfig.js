// Configuración estática base de los países
const baseCountryConfig = {
  argentina: {
    currency: 'ARS',
    currencySymbol: '$',
    storeUrl: 'https://listado.mercadolibre.com.ar/tienda/heat-home/', // URL por defecto
    whatsappNumber: '+5491155770238',
    address: 'Buenos Aires, Argentina', 
    deliveryText: 'Envíos a toda Argentina'
  },
  brasil: {
    currency: 'BRL',
    currencySymbol: 'R$',
    storeUrl: 'https://al2839543.mercadoshops.br/', // URL por defecto
    whatsappNumber: '+555399054981',
    address: 'São Paulo, Brasil',
    deliveryText: 'Entregas em todo Brasil'
  },
  uruguay: {
    currency: 'UYU',
    currencySymbol: '$U',
    storeUrl: 'https://listado.mercadolibre.com.uy/pagina/heathome/', // URL por defecto
    whatsappNumber: '+59897959399',
    address: 'Montevideo, Uruguay',
    deliveryText: 'Envíos a todo Uruguay'
  }
};

// Mapeo de países locales a códigos de la API
const countryCodeMap = {
  argentina: 'ARG',
  brasil: 'BR',
  uruguay: 'UY'
};

// Variable para almacenar la configuración actualizada
let dynamicCountryConfig = { ...baseCountryConfig };

// Variable para almacenar los contactos dinámicos
let dynamicContacts = {};

// Función para obtener los contactos dinámicos del endpoint
export const fetchDynamicContacts = async () => {
  try {
    const response = await fetch('https://marcoslacoa.com/api/obras/proyectos/60f9d436-7550-48cf-b641-a161085b2a4b/contactos/');
    const contacts = await response.json();
    
    // Obtener el primer contacto (índice 0)
    if (contacts.length > 0) {
      const contact = contacts[0];
      dynamicContacts = {
        phones: {
          argentina: contact.telefono_1 || '+549 11 5577 0238',
          brasil: contact.telefono_2 || '+55 53 99905 4981',
          uruguay: contact.telefono_3 || '+598 97 959 399'
        },
        whatsapp: {
          argentina: contact.whatsapp_1 || '5491155770238',
          brasil: contact.whatsapp_2 || '555399054981',
          uruguay: contact.whatsapp_3 || '59897959399'
        },
        email: contact.email_1 || 'info@heathome.net',
        instagram: contact.instagram || 'https://www.instagram.com/heat.home.sudamerica/'
      };

      // Actualizar también los números de WhatsApp en la configuración de países
      // Asegurar que los números tengan el formato correcto (sin + si ya lo incluye el endpoint)
      const whatsapp1 = contact.whatsapp_1 || '5491155770238';
      const whatsapp2 = contact.whatsapp_2 || '555399054981';
      const whatsapp3 = contact.whatsapp_3 || '59897959399';
      
      dynamicCountryConfig.argentina.whatsappNumber = whatsapp1.startsWith('+') ? whatsapp1 : `+${whatsapp1}`;
      dynamicCountryConfig.brasil.whatsappNumber = whatsapp2.startsWith('+') ? whatsapp2 : `+${whatsapp2}`;
      dynamicCountryConfig.uruguay.whatsappNumber = whatsapp3.startsWith('+') ? whatsapp3 : `+${whatsapp3}`;
    }
    
    return dynamicContacts;
  } catch (error) {
    console.error('Error fetching dynamic contacts:', error);
    // En caso de error, usar valores por defecto
    return {
      phones: {
        argentina: '+549 11 5577 0238',
        brasil: '+55 53 99905 4981',
        uruguay: '+598 97 959 399'
      },
      whatsapp: {
        argentina: '5491155770238',
        brasil: '555399054981',
        uruguay: '59897959399'
      },
      email: 'info@heathome.net',
      instagram: 'https://www.instagram.com/heat.home.sudamerica/'
    };
  }
};

// Función para obtener las tiendas dinámicas del endpoint
export const fetchDynamicStores = async () => {
  try {
    const response = await fetch('https://marcoslacoa.com/api/obras/proyectos/60f9d436-7550-48cf-b641-a161085b2a4b/obras/');
    const stores = await response.json();
    
    // Actualizar las URLs de las tiendas
    Object.keys(baseCountryConfig).forEach(country => {
      const countryCode = countryCodeMap[country];
      const storeData = stores.find(store => store.nombre === countryCode);
      
      if (storeData && storeData.descripcion) {
        dynamicCountryConfig[country] = {
          ...baseCountryConfig[country],
          storeUrl: storeData.descripcion
        };
      }
    });
    
    return dynamicCountryConfig;
  } catch (error) {
    console.error('Error fetching dynamic stores:', error);
    // En caso de error, usar la configuración base
    return baseCountryConfig;
  }
};

// Función para inicializar la configuración dinámica
export const initializeDynamicConfig = async () => {
  dynamicCountryConfig = await fetchDynamicStores();
  await fetchDynamicContacts();
  return dynamicCountryConfig;
};

// Exportar la configuración (inicialmente la base, luego se actualiza)
export const countryConfig = dynamicCountryConfig;

export const getCountryConfig = (country) => {
  return dynamicCountryConfig[country] || dynamicCountryConfig.argentina;
};

// Función para obtener los contactos dinámicos
export const getDynamicContacts = () => {
  return dynamicContacts;
};

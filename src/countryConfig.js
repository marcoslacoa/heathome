export const countryConfig = {
  uruguay: {
    currency: 'UYU',
    currencySymbol: '$U',
    storeUrl: 'https://www.mercadolibre.com.uy/pagina/heathome',
    whatsappNumber: '+59899999999', // Reemplazar con número real de Uruguay
    address: 'Montevideo, Uruguay',
    deliveryText: 'Envíos a todo Uruguay'
  },
  argentina: {
    currency: 'ARS',
    currencySymbol: '$',
    storeUrl: 'https://al2839543.mercadoshops.com.ar/',
    whatsappNumber: '+5491199999999', // Reemplazar con número real de Argentina
    address: 'Buenos Aires, Argentina', 
    deliveryText: 'Envíos a toda Argentina'
  },
  brasil: {
    currency: 'BRL',
    currencySymbol: 'R$',
    storeUrl: 'https://al2839543.mercadoshops.br/',
    whatsappNumber: '+5511999999999', // Reemplazar con número real de Brasil
    address: 'São Paulo, Brasil',
    deliveryText: 'Entregas em todo Brasil'
  }
};

export const getCountryConfig = (country) => {
  return countryConfig[country] || countryConfig.uruguay;
};

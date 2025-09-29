export const countryConfig = {
  argentina: {
    currency: 'ARS',
    currencySymbol: '$',
    storeUrl: 'https://listado.mercadolibre.com.ar/tienda/heat-home/', // https://al2839543.mercadoshops.com.ar/ 
    whatsappNumber: '+5491155770238',
    address: 'Buenos Aires, Argentina', 
    deliveryText: 'Envíos a toda Argentina'
  },
  brasil: {
    currency: 'BRL',
    currencySymbol: 'R$',
    storeUrl: 'https://al2839543.mercadoshops.br/',
    whatsappNumber: '+555399054981',
    address: 'São Paulo, Brasil',
    deliveryText: 'Entregas em todo Brasil'
  },
  uruguay: {
    currency: 'UYU',
    currencySymbol: '$U',
    storeUrl: 'https://listado.mercadolibre.com.uy/pagina/heathome/', // https://www.mercadolibre.com.uy/pagina/heathome
    whatsappNumber: '+59897959399',
    address: 'Montevideo, Uruguay',
    deliveryText: 'Envíos a todo Uruguay'
  }
};

export const getCountryConfig = (country) => {
  return countryConfig[country] || countryConfig.argentina;
};

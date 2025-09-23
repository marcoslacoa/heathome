// src/components/LanguageWelcome.jsx
import React, { useState, useEffect } from 'react';
import './LanguageWelcome.css';
import argentinaFlag from '../assets/flags/arg.png';
import brazilFlag from '../assets/flags/bra.png';
import uruguayFlag from '../assets/flags/uru.png';

const LanguageWelcome = ({ onCountrySelect }) => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  
  const welcomeMessages = [
    'Bienvenido',
    'Bem-vindo',
    'Bienvenido'
  ];

  const countries = [
    { 
      code: 'argentina', 
      name: 'Argentina', 
      flag: argentinaFlag,
      language: 'es'
    },
    { 
      code: 'brasil', 
      name: 'Brasil', 
      flag: brazilFlag,
      language: 'pt'
    },
    { 
      code: 'uruguay', 
      name: 'Uruguay', 
      flag: uruguayFlag,
      language: 'es'
    }
  ];

  // Efecto para cambiar el mensaje cada 2 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => 
        (prevIndex + 1) % welcomeMessages.length
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [welcomeMessages.length]);

  const handleCountrySelect = (countryCode) => {
    localStorage.setItem('heathome-country', countryCode);
    localStorage.setItem('heathome-visited', 'true');
    onCountrySelect(countryCode);
  };

  return (
    <div className="language-welcome-overlay">
      <div className="language-welcome-content">
        <h1 className="language-welcome-title">
          {welcomeMessages[currentMessageIndex]}
        </h1>
        <br />
        <p className="language-welcome-subtitle">
          Seleccione su país / Selecione seu país
        </p>
        
        <div className="language-welcome-options">
          {countries.map((country) => (
            <button
              key={country.code}
              className="language-welcome-option"
              onClick={() => handleCountrySelect(country.code)}
            >
              <div className="language-welcome-flag">
                <img 
                  src={country.flag} 
                  alt={country.name} 
                  className="language-welcome-flag-img"
                />
              </div>
              <span className="language-welcome-name">{country.name}</span>
            </button>
          ))}
        </div>
        
        <div className="heathome-brand">
          <img src="/images/logo.png" alt="HEATHOME" className="heathome-logo" />
        </div>
      </div>
    </div>
  );
};

export default LanguageWelcome;

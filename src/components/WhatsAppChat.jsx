import React, { useState } from 'react';
import './WhatsAppChat.css';

const WhatsAppChat = () => {
  const [open, setOpen] = useState(false);

  const toggleChat = () => {
    setOpen(!open);
  };

  return (
    <div className="whatsapp-chat">
      {open && (
        <div className="whatsapp-chat-popup">
          <header className="whatsapp-chat-header">
            <h2 className="whatsapp-chat-title">Empieza una conversación</h2>
            <p className="whatsapp-chat-subtitle">
              Clickea en la burbuja para conversar por Whatsapp.
            </p>
          </header>
          <section className="whatsapp-chat-body">
            <p className="whatsapp-chat-info">
              El equipo generalmente responde en algunos minutos.
            </p>
            <ul className="whatsapp-chat-list">
              {/* Contacto: Ventas 1 */}
              <li className="whatsapp-chat-item">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://wa.me/9897982020?text=Hola,%20necesito%20contactarme%20con%20ventas"
                  className="whatsapp-chat-link"
                >
                  <div className="whatsapp-chat-avatar">
                    <img
                      src="/images/ana.jpeg"
                      alt="Avatar Ventas 1"
                      className="whatsapp-chat-avatar-img"
                    />
                  </div>
                  <div className="whatsapp-chat-text">
                    <div className="whatsapp-chat-text-label">Ventas</div>
                  </div>
                  <div className="whatsapp-chat-item-logo">
                    <img
                      src="/images/logo.png"
                      alt="Logo HEATHOME"
                      className="whatsapp-chat-item-logo-img"
                    />
                  </div>
                </a>
              </li>
              {/* Contacto: Ventas 2 */}
              <li className="whatsapp-chat-item">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://wa.me/59896355111?text=Hola,%20necesito%20contactarme%20con%20ventas"
                  className="whatsapp-chat-link"
                >
                  <div className="whatsapp-chat-avatar">
                    <img
                      src="/images/julio.jpeg"
                      alt="Avatar Ventas 2"
                      className="whatsapp-chat-avatar-img"
                    />
                  </div>
                  <div className="whatsapp-chat-text">
                    <div className="whatsapp-chat-text-label">Atención al cliente</div>
                  </div>
                  <div className="whatsapp-chat-item-logo">
                    <img
                      src="/images/logo.png"
                      alt="Logo HEATHOME"
                      className="whatsapp-chat-item-logo-img"
                    />
                  </div>
                </a>
              </li>
              {/* Contacto: Service */}
              <li className="whatsapp-chat-item">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://wa.me/59897959399?text=Hola,%20necesito%20contactarme%20con%20el%20área%20de%20service"
                  className="whatsapp-chat-link"
                >
                  <div className="whatsapp-chat-avatar">
                    <img
                      src="/images/macarena.jpeg"
                      alt="Avatar Service"
                      className="whatsapp-chat-avatar-img"
                    />
                  </div>
                  <div className="whatsapp-chat-text">
                    <div className="whatsapp-chat-text-label">Mantenimiento</div>
                  </div>
                  <div className="whatsapp-chat-item-logo">
                    <img
                      src="/images/logo.png"
                      alt="Logo HEATHOME"
                      className="whatsapp-chat-item-logo-img"
                    />
                  </div>
                </a>
              </li>
            </ul>
          </section>
        </div>
      )}
      {/* Botón flotante */}
      <button onClick={toggleChat} className="whatsapp-chat-button">
        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.479 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-2.462-.96-4.779-2.705-6.526-1.746-1.746-4.065-2.711-6.526-2.713-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.092-.634zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413z"/>
        </svg>
      </button>
    </div>
  );
};

export default WhatsAppChat;

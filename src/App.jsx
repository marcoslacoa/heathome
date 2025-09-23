import { LanguageProvider, useLanguage } from './LanguageContext'
import LanguageWelcome from './components/LanguageWelcome'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppChat from './components/WhatsAppChat';
import './App.css'

function AppContent() {
  const { isFirstVisit, isLoading, handleFirstVisitComplete } = useLanguage();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (isFirstVisit) {
    return <LanguageWelcome onCountrySelect={handleFirstVisitComplete} />;
  }

  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Products />
      <Process />
      <Testimonials />
      <Contact />
      <Footer />
      <WhatsAppChat />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}

export default App

import { LanguageProvider } from './LanguageContext'
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

function App() {
  return (
    <LanguageProvider>
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
    </LanguageProvider>
  )
}

export default App

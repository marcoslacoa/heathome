import { LanguageProvider } from './LanguageContext'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Products from './components/Products'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'
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
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App

import './App.css'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Products from './components/Products'
import Contact from './components/Contact'
import Footer from './components/Footer'
import SEOMarketingModal from './components/SEOMarketingModal'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <About />
      <Services />
      <Products />
      <Contact />
      <Footer />
      <SEOMarketingModal />
    </div>
  )
}

export default App

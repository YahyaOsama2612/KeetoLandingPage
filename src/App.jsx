import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Clients from './components/Clients'
import Features from './components/Features'
import About from './components/About'
import Pricing from './components/Pricing'
import Journey from './components/Journey'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
       {/*  <Clients /> */}
        <Features />
        <About />
        <Pricing />
        <Journey />
        <Services />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App

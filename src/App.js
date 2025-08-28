import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Products from './components/Products/Products';
import Gallery from './components/Gallery/Gallery';
import Benefits from './components/Benefits/Benefits';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <About />
      <Products />
      <Gallery />
      <Benefits />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
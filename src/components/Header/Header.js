import React, { useState, useEffect } from 'react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header id="header" className={isScrolled ? 'scrolled' : ''}>
      <div className="container">
        <nav>
          <div className="logo">Семейное производство</div>
          <div 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <i className="fas fa-bars"></i>
          </div>
          <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
            <a href="#about" onClick={() => scrollToSection('about')}>
              <i className="fas fa-info-circle"></i> О нас
            </a>
            <a href="#products" onClick={() => scrollToSection('products')}>
              <i className="fas fa-utensils"></i> Продукция
            </a>
            <a href="#benefits" onClick={() => scrollToSection('benefits')}>
              <i className="fas fa-star"></i> Преимущества
            </a>
            <a href="#gallery" onClick={() => scrollToSection('gallery')}>
              <i className="fas fa-book"></i> Галерея
            </a>
            <a href="#contact" onClick={() => scrollToSection('contact')}>
              <i className="fas fa-phone-alt"></i> Контакты
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
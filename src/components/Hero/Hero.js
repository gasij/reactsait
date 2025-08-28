import React from 'react';
import './Hero.css';

const Hero = () => {
  const scrollToProducts = () => {
    const section = document.getElementById('products');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Вкус детства в каждом <span className="accent-text">варенике</span>
        </h1>
        <p className="hero-subtitle">
          Натуральные продукты ручной работы с любовью и заботой о вашем здоровье
        </p>
        <button className="btn hero-btn" onClick={scrollToProducts}>
          Выбрать продукцию
        </button>
      </div>
      <div className="hero-image">
        <img src="/img/hero-varenik.webp" alt="Вареники ручной работы" />
      </div>
    </section>
  );
};

export default Hero;
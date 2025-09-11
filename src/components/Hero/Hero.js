import React from 'react';
import './Hero.css';

const Hero = () => {
  const heroStyle = {
    background: `linear-gradient(rgba(45, 36, 36, 0.7), rgba(26, 18, 11, 0.8)), url(${process.env.PUBLIC_URL}/img/main.webp) no-repeat center/cover`,
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    padding: '120px 0 60px'
  };

  return (
    <section id="hero" className="hero" style={heroStyle}>
      <div className="hero-content">
        <h1 className="hero-title">
          Вкус детства в каждом <span className="accent-text">продукте</span>
        </h1>
        <p className="hero-subtitle">
          Натуральные продукты ручной работы с любовью и заботой о вашем здоровье
        </p>
      </div>
    </section>
  );
};

export default Hero;
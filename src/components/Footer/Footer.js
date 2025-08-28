import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Вареники от бабушки</h3>
            <p>Натуральные продукты ручной работы с любовью и заботой о вашем здоровье</p>
           <div className="social-links">
                <a href="https://instagram.com/ваш_аккаунт" className="social-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                </a>
                <a href="https://vk.com/ваш_аккаунт" className="social-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-vk"></i>
                </a>
                <a href="https://t.me/ваш_аккаунт" className="social-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-telegram"></i>
                </a>
                <a href="https://wa.me/79991234567" className="social-link" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-whatsapp"></i>
                </a>
                </div>
            </div>
          
          <div className="footer-section">
            <h4>Навигация</h4>
            <ul className="footer-links">
              <li><button onClick={() => scrollToSection('hero')}>Главная</button></li>
              <li><button onClick={() => scrollToSection('about')}>О нас</button></li>
              <li><button onClick={() => scrollToSection('products')}>Продукция</button></li>
              <li><button onClick={() => scrollToSection('testimonials')}>Отзывы</button></li>
              <li><button onClick={() => scrollToSection('contact')}>Контакты</button></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Продукция</h4>
            <ul className="footer-links">
              <li><button onClick={() => scrollToSection('products')}>Сладкие вареники</button></li>
              <li><button onClick={() => scrollToSection('products')}>Соленые вареники</button></li>
              <li><button onClick={() => scrollToSection('products')}>Пельмени</button></li>
              <li><button onClick={() => scrollToSection('products')}>Домашние блинчики</button></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Контакты</h4>
            <div className="footer-contact">
              <p><i className="fas fa-phone"></i> +7 (999) 123-45-67</p>
              <p><i className="fas fa-envelope"></i> info@vareniki.ru</p>
              <p><i className="fas fa-map-marker-alt"></i> г. Москва, ул. Вкусная, д. 15</p>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Вареники от бабушки. Все права защищены.</p>
          <button className="back-to-top" onClick={scrollToTop}>
            <i className="fas fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
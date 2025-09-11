import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Семейное производство</h3>
            <p>Вкус детства в каждом варенике. Натуральные продукты ручной работы с любовью и заботой.</p>
          </div>

          <div className="footer-section">
            <h3>Контакты</h3>
            <div className="footer-contact">
              <p><i className="fas fa-phone"></i> +7 (999) 123-45-67</p>
              <p><i className="fas fa-envelope"></i> info@vareniki-family.ru</p>
              <p><i className="fas fa-map-marker-alt"></i> г. Москва, ул. Вареничная, д. 15</p>
            </div>
          </div>

          <div className="footer-section">
            <h3>Режим работы</h3>
            <div className="footer-hours">
              <p>Пн-Пт: 9:00 - 18:00</p>
              <p>Сб-Вс: 10:00 - 16:00</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; {currentYear} Семейное производство. Все права защищены.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">О нашем производстве</h2>
        <div className="about-content">
          <div className="about-text">
            <p>
              Мы - семейное производство, которое уже более 15 лет создает 
              вкуснейшие вареники и другие продукты ручной работы. Наша философия - 
              это качество, традиции и любовь к своему делу.
            </p>
            <p>
              Все наши продукты изготавливаются только из натуральных ингредиентов 
              высшего качества. Мы не используем консерванты, усилители вкуса 
              или другие искусственные добавки.
            </p>
            <div className="about-features">
              <div className="feature">
                <i className="fas fa-heart"></i>
                <span>С любовью к делу</span>
              </div>
              <div className="feature">
                <i className="fas fa-seedling"></i>
                <span>Натуральные ингредиенты</span>
              </div>
              <div className="feature">
                <i className="fas fa-award"></i>
                <span>Высшее качество</span>
              </div>
              <div className="feature">
                <i className="fas fa-history"></i>
                <span>Семейные традиции</span>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img src="/img/about-family.webp" alt="Семейное производство" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
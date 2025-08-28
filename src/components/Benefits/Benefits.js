import React from 'react';
import './Benefits.css';

const Benefits = () => {
  const benefits = [
    {
      id: 1,
      icon: 'fas fa-leaf',
      title: '100% Натурально',
      description: 'Используем только свежие натуральные ингредиенты без консервантов и химических добавок'
    },
    {
      id: 2,
      icon: 'fas fa-hand-rock',
      title: 'Ручная работа',
      description: 'Каждый вареник лепится вручную с любовью и вниманием к деталям'
    },
    {
      id: 3,
      icon: 'fas fa-heart',
      title: 'С любовью',
      description: 'Готовим с душой, как для своей семьи, сохраняя традиционные рецепты'
    },
    {
      id: 4,
      icon: 'fas fa-shipping-fast',
      title: 'Быстрая доставка',
      description: 'Доставляем свежую продукцию в день приготовления по всему городу'
    },
    {
      id: 5,
      icon: 'fas fa-award',
      title: 'Гарантия качества',
      description: 'Строгий контроль качества на каждом этапе производства'
    },
    {
      id: 6,
      icon: 'fas fa-utensils',
      title: 'Разнообразие вкусов',
      description: 'Большой выбор начинок на любой вкус - от классических до эксклюзивных'
    }
  ];

  return (
    <section id="benefits" className="benefits">
      <div className="container">
        <h2 className="section-title">Почему выбирают нас</h2>
        <div className="benefits-grid">
          {benefits.map(benefit => (
            <div key={benefit.id} className="benefit-card">
              <div className="benefit-icon">
                <i className={benefit.icon}></i>
              </div>
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
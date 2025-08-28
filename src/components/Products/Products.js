import React, { useState } from 'react';
import { productsData } from '../../data/productsData';
import './Products.css';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Все продукты' },
    { id: 'sweet', name: 'Сладкие' },
    { id: 'savory', name: 'Соленые' },
    { id: 'other', name: 'Другое' }
  ];

  const filteredProducts = productsData.filter(product => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'sweet') return product.id <= 7;
    if (selectedCategory === 'savory') return product.id >= 8 && product.id <= 10;
    if (selectedCategory === 'other') return product.id === 11;
    return true;
  });

  return (
    <section id="products" className="products">
      <div className="container">
        <h2 className="section-title">Наша продукция</h2>
        
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-overlay">
                  <button className="btn product-btn">Подробнее</button>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-price">{product.price}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
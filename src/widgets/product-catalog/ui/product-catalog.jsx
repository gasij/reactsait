'use client';

import React from 'react';
import { categories, filterProducts, products } from '@/entities/product';
import { useProductFilter } from '@/features/filter-products';
import { MenuBook } from './menu-book';
import { lastSpread } from './book-pages';

export function ProductCatalog() {
  const { category, chooseCategory } = useProductFilter();
  const dishes = filterProducts(category);
  const pages = dishes.map(product => products.indexOf(product) + 1);
  const order = category === 'all' ? [0, ...pages, lastSpread] : pages;

  return (
    <section className="catalog section" id="products" aria-labelledby="catalog-title">
      <div className="container">
        <div className="section-heading">
          <div><p className="eyebrow">Меню / {products.length} домашних блюд</p><h2 id="catalog-title">Выбирайте<br /><em>любимые.</em></h2></div>
          <p>Ягодная классика, необычные сочетания<br className="desktop-br" /> и любимые домашние блюда.</p>
        </div>
        <div className="catalog-toolbar">
          <div className="filters" role="group" aria-label="Категории продукции">
            {categories.map(item => (
              <button key={item.id} aria-pressed={category === item.id}
                className={category === item.id ? 'filter is-active' : 'filter'} onClick={() => chooseCategory(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
          <span className="result-count">{order.length > 1 ? 'Листайте вниз ↓' : 'Одно блюдо'}</span>
        </div>
        <MenuBook key={category} order={order} />
      </div>
    </section>
  );
}

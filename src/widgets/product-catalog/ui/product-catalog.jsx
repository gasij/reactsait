'use client';
import React from 'react';
import { ProductCard, categories, filterProducts } from '@/entities/product';
import { useProductFilter } from '@/features/filter-products';
import { useProductDetails } from '@/features/view-product';
export function ProductCatalog() {
 const { category, expanded, chooseCategory, setExpanded } = useProductFilter();
 const { showProduct } = useProductDetails();
 const filtered = filterProducts(category);
 const shown = expanded ? filtered : filtered.slice(0, 6);
 return <section className="catalog section" id="products" aria-labelledby="catalog-title"><div className="container">
        <div className="section-heading"><div><p className="eyebrow">Меню / 11 домашних блюд</p><h2 id="catalog-title">Выбирайте<br /><em>любимые.</em></h2></div><p>Ягодная классика, необычные сочетания<br className="desktop-br" /> и любимые домашние блюда.</p></div>
        <div className="catalog-toolbar"><div className="filters" role="group" aria-label="Категории продукции">{categories.map(c => <button key={c.id} aria-pressed={category === c.id} className={category === c.id ? 'filter is-active' : 'filter'} onClick={() => {
                chooseCategory(c.id);
              }}>{c.label}</button>)}</div><span className="result-count" aria-live="polite">{filtered.length} позиций</span></div>
        <div className="products-grid">{shown.map(product => <ProductCard key={product.id} product={product} onView={showProduct} />)}</div>
        {!expanded && filtered.length > 6 && <div className="catalog-more"><button className="btn btn--secondary" onClick={() => setExpanded(true)}>Показать всё меню <span aria-hidden="true">+</span></button><span>Ещё {filtered.length - 6} вкусов и домашних блюд</span></div>}
      </div></section>; }

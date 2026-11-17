import Image from 'next/image';
import React from 'react';
export function ProductCard({ product: p, onView }) { return <article className="product-card card" >
          <button className="product-photo" onClick={() => onView(p)} aria-label={`Посмотреть ${p.name}`}><Image src={p.image} alt={p.name} width="800" height="533" loading="lazy" />{p.id === 1 && <span className="product-tag">Ягодная классика</span>}<span className="product-open" aria-hidden="true">↗</span></button>
          <div className="product-info"><div className="product-index">{String(p.id).padStart(2, '0')} / {p.category === 'other' ? 'Домашние блюда' : 'Ручная лепка'}</div><h3><button onClick={() => onView(p)}>{p.name}</button></h3><p>{p.summary}</p><div className="product-price"><span>{p.price}</span><button onClick={() => onView(p)} aria-label={`Подробнее о продукте ${p.name}`}>О продукте <span aria-hidden="true">↗</span></button></div></div>
        </article>; }

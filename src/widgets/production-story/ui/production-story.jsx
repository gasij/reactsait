import Image from 'next/image';
import React from 'react';
export function ProductionStory() { return <section className="about section" id="about" aria-labelledby="about-title"><div className="container">
        <div className="about-heading"><div className="years"><strong>10</strong><p>лет семейной истории</p></div><div className="about-copy"><p className="eyebrow">Тесто. Начинка. Наши руки.</p><h2 id="about-title">За каждым вкусом —<br /><em>наша семья.</em></h2><p>Мы — Алексей и Мария, создатели семейного производства. Начинали с «Царь-Вишни» и «Царь-Клубники». Уже 10 лет выбираем ингредиенты и создаём рецепты, как для своей семьи.</p></div></div>
        <figure className="production-photo"><Image src="/brand/cooking-green.webp" alt="Ручная лепка вареников с сулугуни на фирменной вышитой скатерти" width="1800" height="1005" loading="lazy" /></figure>
        <div className="production-foot"><span>Ручная лепка</span><span>Натуральные ингредиенты</span><span>Семейные рецепты</span></div>
      </div></section>; }

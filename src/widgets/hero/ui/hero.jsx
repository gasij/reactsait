import React from 'react';
import { Arrow, FolkFlower } from '@/shared/ui';
import { ProductShowcase } from './product-showcase';
export function Hero() {
  return <section id="home" className="hero hero--product-first" aria-labelledby="hero-title"><div className="container hero-grid">
    <div className="hero-copy"><p className="eyebrow hero-topline">Дивновкусье · от Семейного производства</p><h1 id="hero-title"><span className="hero-word">Вареники</span><br /><em>для своих.</em></h1><p className="hero-lead">Тонкое тесто, сочные ягоды и знакомый домашний вкус. От вишнёвой классики до манго со сливочным сыром.</p><div className="hero-actions"><a className="btn btn--primary" href="#products">Открыть книжку-меню <Arrow /></a><a className="hero-story-link" href="#about">История нашей семьи ↗</a></div><div className="hero-proof"><FolkFlower className="brand-mark" /><p>10 лет лепим вручную<br />для домашних обедов.</p></div></div>
    <div className="hero-visual"><ProductShowcase /></div>
  </div><div className="hero-baseline"><div className="container"><span>Тонкое тесто</span><span aria-hidden="true">✳</span><span>Сочная начинка</span><span aria-hidden="true">✳</span><span>Ручная работа</span><a href="#collection">Выбрать начинку ↓</a></div></div></section>;
}

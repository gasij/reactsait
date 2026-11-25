import React from 'react';
import Image from 'next/image';
import { ProductShowcase } from './product-showcase';
import s from './cover.module.css';

export function Hero() {
  return (
    <section id="home" className={s.cover} aria-labelledby="hero-title">
      <Image className={s.scene} src="/brand/editorial/invitation.webp" alt="Вареники с вишней и с сулугуни в фирменных упаковках на вышитой скатерти" width={1920} height={1080} sizes="100vw" preload />
      <div className={s.bookmark}><span aria-hidden="true">✦</span>Новый<br />бренд</div>
      <div className={s.copy}>
        <span className={s.logo} role="img" aria-label="Дивновкусье от семейного производства" />
        <h1 id="hero-title" className="hero-word">Загляните в гости<br />за вкусом</h1>
        <a className={s.menu} href="#products">Открыть книжку-меню <span aria-hidden="true">↓</span></a>
      </div>
      <ProductShowcase />
    </section>
  );
}

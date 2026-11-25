'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import s from './presentation-gallery.module.css';

const slides = [
  { file: 'invitation', title: 'Дивновкусье', alt: 'Упаковки вареников на вышитой скатерти. «Загляните в гости за вкусом».' },
  { file: 'philosophy', title: 'Наша философия', alt: 'Семейное производство. Три принципа: тщательно выбирать сырьё, готовить начинки из ягод, фруктов, творога, сыра и мяса, развивать домашние рецепты.' },
  { file: 'family-table', title: 'Русская сказка', alt: 'Вареники на керамическом блюде среди вишни и цветущих ветвей. «Когда каждый продукт создаётся как для своей семьи».' },
];

export function PresentationGallery() {
  const [index, select] = useState(0);
  const slide = slides[index];
  const src = '/brand/slides/' + slide.file + '.webp';
  return (
    <section id="presentation" className={s.gallery} aria-label="Слайды из презентации Дивновкусья">
      <div className={s.controls} role="group" aria-label="Выбрать слайд">
        {slides.map((item, i) => (
          <button key={item.file} type="button" aria-pressed={index === i} onClick={() => select(i)}>{item.title}</button>
        ))}
      </div>
      <figure aria-live="polite">
        <Image src={src} width={1920} height={1080} sizes="(max-width: 800px) 100vw, 85vw" alt={slide.alt} />
        <figcaption><a href={src} aria-label={'Открыть слайд «' + slide.title + '» в полном размере'}>Открыть в полном размере ↗</a></figcaption>
      </figure>
    </section>
  );
}

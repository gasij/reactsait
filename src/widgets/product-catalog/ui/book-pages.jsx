import React from 'react';
import Image from 'next/image';
import { categories, products } from '@/entities/product';
import { Arrow, BrandLogo, FolkFlower } from '@/shared/ui';
import s from './menu-book.module.css';

export const lastSpread = products.length + 1;
export const folio = number => String(number).padStart(2, '0');
const chapters = categories.filter(category => category.id !== 'all').map(category => ({
  ...category,
  entries: products
    .map((product, index) => ({ product, spread: index + 1 }))
    .filter(({ product }) => product.category === category.id),
})).filter(chapter => chapter.entries.length);

function TitleRule() {
  return <span className={s.titleRule} aria-hidden="true"><FolkFlower /></span>;
}

function Cover({ onTurn }) {
  return (
    <div className={s.cover}>
      <div className={s.coverFrame}>
        <TitleRule />
        <h2>Домашнее<br />меню</h2>
        <p className={s.subtitle}>Вареники ручной лепки и домашние блюда</p>
        <div className={s.coverArt}>
          <Image src="/brand/cooking-cherry.webp" alt="За лепкой вареников с вишней" fill sizes="(max-width: 720px) 90vw, 450px" loading="eager" />
        </div>
        <button className={s.coverLink} onClick={() => onTurn(1)}>Листать меню <Arrow /></button>
      </div>
    </div>
  );
}

function Contents({ onTurn }) {
  return (
    <div className={s.contents}>
      <h2>Оглавление</h2>
      <div className={s.chapters}>
        {chapters.map(chapter => (
          <div className={s.chapter} key={chapter.id}>
            <h3>{chapter.label}</h3>
            <ul>
              {chapter.entries.map(({ product, spread }) => (
                <li key={product.id}>
                  <button onClick={() => onTurn(spread)}>
                    <span>{product.name}</span><i aria-hidden="true" /><span className={s.pageNumber}>{folio(spread * 2)}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button className={s.letterLink} onClick={() => onTurn(lastSpread)}>
        От нашей семьи <span>{folio(lastSpread * 2)}</span>
      </button>
    </div>
  );
}

function ProductPhoto({ product, page }) {
  return (
    <figure className={s.photoPage}>
      <div className={s.runningHead}><span>Дивновкусье</span><span>{folio(page)}</span></div>
      <div className={s.plate}>
        <Image src={product.image} alt={product.name} fill sizes="(max-width: 720px) 94vw, 540px" loading="eager" />
      </div>
      <figcaption>{product.summary}</figcaption>
    </figure>
  );
}

function ProductText({ product, page }) {
  return (
    <div className={s.recipe}>
      <div className={s.runningHead}><span>{categories.find(category => category.id === product.category)?.label}</span><span>{folio(page)}</span></div>
      <div className={s.recipeBody}>
        <TitleRule />
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <div className={s.price}>{product.price}</div>
      </div>
    </div>
  );
}

function FamilyLetter() {
  return (
    <div className={s.letter}>
      <div className={s.runningHead}><span>Дивновкусье</span><span>{folio(lastSpread * 2)}</span></div>
      <div className={s.letterBody}>
        <h2>От нашей семьи</h2>
        <p>Мы начинали с двух вкусов — «Царь-Вишни» и «Царь-Клубники». Уже десять лет выбираем ингредиенты и лепим вареники, как для своей семьи.</p>
        <p className={s.signature}>Алексей и Мария</p>
      </div>
      <TitleRule />
    </div>
  );
}

function BackCover() {
  return (
    <div className={s.backCover}>
      <div className={s.coverFrame}>
        <BrandLogo light />
        <TitleRule />
        <a href="#about" className={s.coverLink}>К истории семьи <Arrow /></a>
      </div>
    </div>
  );
}

export function BookSpread({ index, onTurn, inactive }) {
  const product = products[index - 1];
  let left;
  let right;
  if (index === 0) {
    left = <Cover onTurn={onTurn} />;
    right = <Contents onTurn={onTurn} />;
  } else if (product) {
    left = <ProductPhoto product={product} page={index * 2} />;
    right = <ProductText product={product} page={index * 2 + 1} />;
  } else {
    left = <FamilyLetter />;
    right = <BackCover />;
  }
  return (
    <article className={s.book} data-cover={index === 0 || undefined}
      aria-label={product?.name ?? (index === 0 ? 'Обложка' : 'От нашей семьи')}
      inert={inactive || undefined} aria-hidden={inactive || undefined}>
      <div className={s.left}>{left}</div>
      <div className={s.right}>{right}</div>
    </article>
  );
}

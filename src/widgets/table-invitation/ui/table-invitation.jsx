import React from 'react';
import { Arrow } from '@/shared/ui';
import s from './table-invitation.module.css';

export function TableInvitation() {
  return (
    <section className={s.table} aria-labelledby="closing-title">
      <p>Дивновкусье · Русская сказка</p>
      <span aria-hidden="true">✦</span>
      <h2 id="closing-title">Когда каждый продукт создаётся как для своей семьи.</h2>
      <a className={s.link} href="#products">Выбрать вареники <Arrow /></a>
    </section>
  );
}

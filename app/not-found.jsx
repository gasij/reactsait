import React from 'react';
import Link from 'next/link';
export default function NotFound() {
  return <main className="container section"><p className="eyebrow">404</p><h1>Страница не найдена</h1><p>Вернитесь к нашим вареникам и домашним блюдам.</p><Link className="btn btn--primary" href="/">Вернуться на главную</Link></main>;
}

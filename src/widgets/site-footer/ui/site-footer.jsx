'use client';
import React from 'react';
import { BrandLogo } from '@/shared/ui';
import { useMotion } from '@/shared/lib/motion';
export function SiteFooter() { const { motionPaused, toggleMotion } = useMotion(); return <footer className="site-footer"><div className="container footer-top"><a className="brand" href="#home"><BrandLogo light /></a><p>Вареники и домашние блюда<br />ручной работы.</p><a href="#home">Вернуться наверх ↑</a></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Дивновкусье</span><button className="motion-toggle" aria-pressed={motionPaused} onClick={() => toggleMotion()}>{motionPaused ? 'Включить анимацию' : 'Без анимации'}</button></div></footer>; }

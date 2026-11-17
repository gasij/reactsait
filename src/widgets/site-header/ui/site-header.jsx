'use client';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Arrow, BrandLogo } from '@/shared/ui';
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef();
  useEffect(() => {
    if (!menuOpen) return;
    const main = document.getElementById('main');
    const oldOverflow = document.body.style.overflow;
    const oldInert = main?.inert;
    document.body.style.overflow = 'hidden';
    if (main) main.inert = true;
    const onKey = event => {
      if (event.key === 'Escape') { setMenuOpen(false); menuButton.current?.focus(); }
      if (event.key === 'Tab') {
        const first = document.querySelector('#navigation a');
        const last = menuButton.current;
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = oldOverflow; if (main) main.inert = oldInert; document.removeEventListener('keydown', onKey); };
  }, [menuOpen]);
  // A mobile menu must not lock scrolling after a desktop resize.
  useEffect(() => {
    const closeOnDesktop = () => { if (window.innerWidth > 800) setMenuOpen(false); };
    window.addEventListener('resize', closeOnDesktop);
    return () => window.removeEventListener('resize', closeOnDesktop);
  }, []);
  return <header className="site-header"><div className="container header-inner">
    <Link className="brand" href="/#home" onClick={() => setMenuOpen(false)} aria-label="Дивновкусье — на главную"><BrandLogo /></Link>
    <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} id="navigation" aria-label="Основная навигация"><a href="#collection" onClick={() => setMenuOpen(false)}>Начинки</a><a href="#products" onClick={() => setMenuOpen(false)}>Каталог</a><a href="#about" onClick={() => setMenuOpen(false)}>Наша история</a></nav>
    <a className="header-action" href="#products">Выбрать вареники <Arrow /></a>
    <button className="menu-button" ref={menuButton} aria-expanded={menuOpen} aria-controls="navigation" aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'} onClick={() => setMenuOpen(o => !o)}>{menuOpen ? 'Закрыть ×' : 'Меню ☰'}</button>
  </div></header>;
}

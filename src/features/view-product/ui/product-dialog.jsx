'use client';
import Image from 'next/image';
import React, { useRef, useEffect } from 'react';
import { Arrow } from '@/shared/ui';
export function ProductDialog({
  product,
  onClose
}) {
  const dialog = useRef();
  useEffect(() => {
    const trigger = document.activeElement;
    dialog.current.showModal();
    const before = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = before;
      trigger?.focus();
    };
  }, []);
  return <dialog className="product-dialog" ref={dialog} onCancel={onClose} onClick={e => {
    if (e.target === e.currentTarget) onClose();
  }} aria-labelledby="product-title">
    <button className="dialog-close" onClick={onClose} aria-label="Закрыть описание">×</button>
    <Image src={product.image} alt={product.name} width="800" height="533" />
    <div className="dialog-copy"><p className="eyebrow">Дивновкусье · ручная лепка</p><h2 id="product-title">{product.name}</h2><p>{product.description}</p><p className="dialog-price">{product.price}</p><p className="dialog-hint">Стоимость из текущего каталога. Наличие и условия заказа уточняются у производителя.</p><button className="btn btn--primary" onClick={onClose}>Вернуться в меню <Arrow /></button></div>
  </dialog>;
}

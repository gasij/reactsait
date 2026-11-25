'use client';
import React from 'react';
import { products } from '@/entities/product';
import { useProductDetails } from '@/features/view-product';
import s from './cover.module.css';

export function ProductShowcase() {
  const { showProduct } = useProductDetails();
  return <button type="button" className={s.details} aria-label="Открыть описание Царь-Вишня" onClick={() => showProduct(products[0])}>Царь-Вишня ↗</button>;
}

'use client';
import React from 'react';
import Image from 'next/image';
import { products } from '@/entities/product';
import { useProductDetails } from '@/features/view-product';
export function ProductShowcase() {
  const { showProduct } = useProductDetails();
  const product = products[0];
  return <div className="product-showcase">
    <Image className="hero-bird" src="/brand/bird-cherry.webp" alt="" aria-hidden="true" width={640} height={1209} /><div className="showcase-stage"><button className="showcase-photo" aria-label="Открыть описание Царь-Вишня" onClick={() => showProduct(product)}><Image src="/brand/craft-cherry.webp" alt="Ручная лепка вареников с вишней на вышитой скатерти Дивновкусье" width={1800} height={1005} preload sizes="(max-width: 800px) 100vw, 55vw" /></button></div>
    <div className="showcase-foot"><span>Царь-Вишня</span><button onClick={() => showProduct(product)}>О продукте ↗</button></div>
  </div>;
}

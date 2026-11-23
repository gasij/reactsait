'use client';
import Image from 'next/image';
import React from 'react';
import { useProductFilter } from '@/features/filter-products';
import { Arrow } from '@/shared/ui';
import { photo } from '@/shared/lib/assets';
export function FlavorCollections() { const { chooseCategory } = useProductFilter(); return <section id="collection" className="collection section" aria-labelledby="collection-title"><div className="container">
        <div className="section-heading"><div><p className="eyebrow">Два настроения одного стола</p><h2 id="collection-title">Сладкое.<br /><em>И сытное.</em></h2></div><p>Для тех, кто начинает с ягод.<br />И тех, кто сразу за обед.</p></div>
        <div className="collection-grid"><a className="collection-feature m-zoom" href="#products" onClick={() => {
              chooseCategory('sweet');
            }}><Image src={photo('cherniaka')} alt="Вареники с черникой ручной лепки" width="1600" height="1066" loading="lazy" /><div className="collection-label"><h3>На сладкой стороне</h3><Arrow /></div></a><a className="collection-feature m-zoom" href="#products" onClick={() => {
              chooseCategory('other');
            }}><Image src={photo('golub')} alt="Домашние голубцы с мясом и рисом" width="1600" height="1066" loading="lazy" /><div className="collection-label"><h3>Обед — это серьёзно</h3><Arrow /></div></a></div>
      </div></section>; }

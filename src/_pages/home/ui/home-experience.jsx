'use client';
import React, { useRef } from 'react';
import { ProductFilterProvider, useProductFilter } from '@/features/filter-products';
import { ProductDetailsProvider } from '@/features/view-product';
import { useMotion } from '@/shared/lib/motion';
import useStoryMotion from '../lib/use-story-motion';
function HomeMotion({ children }) {
  const root = useRef();
  const { category, expanded } = useProductFilter();
  const { motionPaused } = useMotion();
  useStoryMotion(root, `${category}-${expanded}`, motionPaused);
  return <div className="site-shell" ref={root}>{children}</div>;
}
export function HomeExperience({ children }) {
  return <ProductFilterProvider><ProductDetailsProvider><HomeMotion>{children}</HomeMotion></ProductDetailsProvider></ProductFilterProvider>;
}

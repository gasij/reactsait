'use client';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { categories } from '@/entities/product';
const FilterContext = createContext(null);
export function ProductFilterProvider({ children }) {
  const [category, setCategory] = useState('all');
  const value = useMemo(() => ({ category,
    chooseCategory(next) {
      if (!categories.some(item => item.id === next)) return;
      setCategory(next);
    }
  }), [category]);
  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>;
}
export function useProductFilter() {
  const value = useContext(FilterContext);
  if (!value) throw new Error('useProductFilter requires ProductFilterProvider');
  return value;
}

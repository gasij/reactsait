'use client';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { ProductDialog } from '../ui/product-dialog';
const DetailsContext = createContext(null);
export function ProductDetailsProvider({ children }) {
  const [selected, setSelected] = useState(null);
  const value = useMemo(() => ({ showProduct: setSelected }), []);
  return <DetailsContext.Provider value={value}>{children}{selected && <ProductDialog key={selected.id} product={selected} onClose={() => setSelected(null)} />}</DetailsContext.Provider>;
}
export function useProductDetails() {
  const value = useContext(DetailsContext);
  if (!value) throw new Error('useProductDetails requires ProductDetailsProvider');
  return value;
}

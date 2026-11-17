import React from 'react';
import Image from 'next/image';
export function BrandLogo({ light = false }) {
  return <Image className="brand-logo" src={light ? '/brand/logo-cream.webp' : '/brand/logo-dark.webp'} alt="Дивновкусье — от Семейного производства" width={1100} height={465} sizes="(max-width: 540px) 155px, 190px" />;
}

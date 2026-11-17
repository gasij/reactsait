import React from 'react';
import localFont from 'next/font/local';
const displayFont = localFont({ src: [
  { path: '../src/shared/assets/fonts/Minipax-Regular.ttf', weight: '400', style: 'normal' },
  { path: '../src/shared/assets/fonts/Minipax-SemiBold.ttf', weight: '600', style: 'normal' },
], variable: '--font-minipax', display: 'swap' });
const textFont = localFont({ src: '../src/shared/assets/fonts/Montserrat-Regular.ttf', weight: '400', variable: '--font-montserrat', display: 'swap' });
import { Providers } from '@/_app/providers';
import '@/_app/styles/globals.css';
import '@/_app/styles/site.css';
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata = {
  metadataBase: siteUrl ? new URL(siteUrl) : undefined,
  title: 'Дивновкусье — вареники от Семейного производства',
  description: 'Вареники ручной лепки и домашние блюда. Вишня, клубника, черника, манго с сыром и другие начинки.',
  icons: { icon: '/brand/logo-icon.png' },
  manifest: '/manifest.json',
  openGraph: { title: 'Дивновкусье — от Семейного производства', description: 'Вареники ручной лепки и домашние блюда.', type: 'website', locale: 'ru_RU', images: siteUrl ? [{ url: '/brand/cooking-cherry.webp', width: 1800, height: 1005 }] : [] },
};
export const viewport = { themeColor: '#ece5dd' };
export default function RootLayout({ children }) {
  return <html className={`${displayFont.variable} ${textFont.variable}`} lang="ru" data-type="product" data-motion=""><head><link rel="stylesheet" href="/assets/motion/motion.css" /></head><body><Providers>{children}</Providers></body></html>;
}

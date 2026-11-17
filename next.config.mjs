import { fileURLToPath } from 'node:url';
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  transpilePackages: ['three'],
  turbopack: { root: fileURLToPath(new URL('.', import.meta.url)) },
  images: { unoptimized: true },
  trailingSlash: true,
};
export default nextConfig;

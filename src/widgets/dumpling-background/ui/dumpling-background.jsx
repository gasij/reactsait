'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useMotion } from '@/shared/lib/motion';
const Scene = dynamic(() => import('./dumpling-scene'), { ssr: false, loading: () => null });
export function DumplingBackground() {
  const { motionPaused } = useMotion();
  return <div className="site-background" aria-hidden="true"><Scene motionPaused={motionPaused} /></div>;
}

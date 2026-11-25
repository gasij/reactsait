'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import { useMotion } from '@/shared/lib/motion';
import Grainient from './grainient';

const Scene = dynamic(() => import('./dumpling-scene'), { ssr: false, loading: () => null });
export function DumplingBackground() {
  const { motionPaused } = useMotion();
  return <div className="site-background" aria-hidden="true"><Grainient softness={0.45} paused={motionPaused} /><Scene motionPaused={motionPaused} /></div>;
}

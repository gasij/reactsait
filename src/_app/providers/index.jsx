'use client';
import React from 'react';
import { MotionProvider } from '@/shared/lib/motion';
export function Providers({ children }) { return <MotionProvider>{children}</MotionProvider>; }

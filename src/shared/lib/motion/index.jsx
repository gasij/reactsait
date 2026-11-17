'use client';
import React, { createContext, useContext, useMemo, useState } from 'react';
const MotionContext = createContext(null);
export function MotionProvider({ children }) {
  const [motionPaused, setMotionPaused] = useState(false);
  const value = useMemo(() => ({ motionPaused, toggleMotion: () => setMotionPaused(p => !p) }), [motionPaused]);
  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}
export function useMotion() {
  const value = useContext(MotionContext);
  if (!value) throw new Error('useMotion requires MotionProvider');
  return value;
}

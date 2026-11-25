'use client';
import React, { Component, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Color, Object3D, MeshStandardMaterial, DynamicDrawUsage } from 'three';
import { createDumplingGeometry } from '../lib/dumpling-geometry';
import { getScrollPose, createFlightField } from '../lib/dumpling-flight';
import { useScenePlayback } from '../lib/use-scene-playback';

const doughColors = [
  new Color('#7564b2'), // blueberry violet
  new Color('#ed995e'), // apricot
  new Color('#faf8f4'), // milk white
  new Color('#da7d9b'), // pink
];

function FlyingDumplings({ playing, compact }) {
  const instances = useRef();
  const { size, invalidate } = useThree();
  const count = compact ? 12 : 24;
  const flights = useMemo(() => createFlightField(count, size.width / size.height), [count, size.width, size.height]);
  const geometry = useMemo(createDumplingGeometry, []);
  const material = useMemo(() => new MeshStandardMaterial({ vertexColors: true, roughness: 0.76, metalness: 0 }), []);
  const transform = useMemo(() => new Object3D(), []);
  const scroll = useRef({ current: 0, target: 0 });
  const pointer = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const place = useCallback((screens = scroll.current.current) => {
    if (!instances.current) return;
    flights.forEach((item, index) => {
      const pose = getScrollPose(item, screens);
      const depthResponse = Math.max(0.15, (item.z + 20) / 28);
      transform.position.set(pose.x + pointer.current.x * depthResponse * 0.85, pose.y - pointer.current.y * depthResponse * 0.5, pose.z);
      transform.rotation.set(...pose.rotation);
      transform.scale.setScalar(item.scale);
      transform.updateMatrix();
      instances.current.setMatrixAt(index, transform.matrix);
    });
    instances.current.instanceMatrix.needsUpdate = true;
  }, [flights, transform]);
  useLayoutEffect(() => {
    const mesh = instances.current;
    mesh.instanceMatrix.setUsage(DynamicDrawUsage);
    for (let i = 0; i < mesh.count; i++) mesh.setColorAt(i, doughColors[i % doughColors.length]);
    mesh.instanceColor.needsUpdate = true;
    place(); invalidate();
  }, [flights, place, invalidate]);
  useEffect(() => { invalidate(); }, [playing, invalidate]);
  useEffect(() => () => { geometry.dispose(); material.dispose(); }, [geometry, material]);
  useEffect(() => {
    if (!playing) return;
    const sync = () => { scroll.current.target = window.scrollY / Math.max(1, window.innerHeight); invalidate(); };
    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => { window.removeEventListener('scroll', sync); window.removeEventListener('resize', sync); };
  }, [playing, invalidate]);
  useEffect(() => {
    if (!playing || compact) return;
    const move = event => {
      if (event.pointerType !== 'mouse') return;
      pointer.current.targetX = event.clientX / Math.max(1, window.innerWidth) * 2 - 1;
      pointer.current.targetY = event.clientY / Math.max(1, window.innerHeight) * 2 - 1;
      invalidate();
    };
    const reset = () => { pointer.current.targetX = 0; pointer.current.targetY = 0; invalidate(); };
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', reset);
    return () => { window.removeEventListener('pointermove', move); document.documentElement.removeEventListener('pointerleave', reset); pointer.current.targetX = 0; pointer.current.targetY = 0; };
  }, [playing, compact, invalidate]);
  useFrame((_, delta) => {
    if (!playing) return;
    const state = scroll.current;
    const cursor = pointer.current;
    const difference = state.target - state.current;
    const xDifference = cursor.targetX - cursor.x;
    const yDifference = cursor.targetY - cursor.y;
    const settled = Math.abs(difference) < 0.0005 && Math.abs(xDifference) < 0.001 && Math.abs(yDifference) < 0.001;
    if (settled) { state.current = state.target; cursor.x = cursor.targetX; cursor.y = cursor.targetY; place(); return; }
    const ease = 1 - Math.exp(-Math.min(delta, 0.05) * 9);
    state.current += difference * ease;
    cursor.x += xDifference * ease;
    cursor.y += yDifference * ease;
    place(); invalidate();
  });
  return <>
    <fog attach="fog" args={['#ece4dd', 22, 48]} />
    <ambientLight intensity={0.65} />
    <hemisphereLight args={['#fff6df', '#8e7959', 1.3]} />
    <directionalLight position={[-6, 8, 5]} intensity={3.2} />
    <directionalLight position={[5, -3, 2]} intensity={1.1} color="#ffe8bc" />
    <instancedMesh key={count} ref={instances} args={[geometry, material, count]} frustumCulled={false} />

  </>;
}
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}
export default function DumplingScene({ motionPaused = false }) {
  const root = useRef();
  const playback = useScenePlayback(root, motionPaused);
  const [available, setAvailable] = useState(false);
  useEffect(() => {
    let gl;
    try { gl = document.createElement('canvas').getContext('webgl2'); setAvailable(Boolean(gl)); }
    catch { setAvailable(false); }
    gl?.getExtension('WEBGL_lose_context')?.loseContext();
  }, []);
  return <div className="dumpling-stage dumpling-flight" ref={root}>
    <div className="flight-canvas">
      {available && <SceneBoundary fallback={null}><Canvas frameloop="demand" dpr={[1, playback.compact ? 1 : 1.5]} camera={{ position: [0, 0, 18], fov: 35, near: 0.1, far: 65 }} gl={{ antialias: true, alpha: true }}>
        <FlyingDumplings playing={playback.playing} compact={playback.compact} />
      </Canvas></SceneBoundary>}
    </div>
  </div>;
}

// Predictable initial framing avoids React renders changing the flight paths.
export function createFlightField(count, aspect = 1) {
  let seed = 714;
  const random = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; };
  return Array.from({ length: count }, (_, index) => {
    const z = index === 0 ? 0.6 : index % 5 === 0 ? 5 + random() * 2 : -18 + random() * 19;
    const height = 2 * Math.tan(35 * Math.PI / 360) * (18 - z);
    const width = height * aspect;
    return {
      anchor: index === 0,
      x: index === 0 ? 0 : (random() - 0.5) * width * 1.15,
      y: index === 0 ? 0 : (random() - 0.5) * (height + 6),
      z, height, phase: random() * Math.PI * 2,
      scale: index === 0 ? 1.12 : 0.48 + random() * 0.45,
      rotation: index === 0 ? [-0.18, -0.35, -0.2] : [random() * Math.PI, random() * Math.PI, random() * Math.PI],
      speed: 0.35 + random() * 0.45,
      spin: Array.from({ length: 3 }, () => (random() < 0.5 ? -1 : 1) * (0.24 + random() * 0.3)),
      sway: 0.7 + random() * 0.85,
      bob: 0.35 + random() * 0.5,
      depthTravel: 0.85 + random() * 0.6,
      frequency: 0.8 + random() * 0.45,
    };
  });
}
export function getScrollPose(item, screens) {
  const offset = Number.isFinite(screens) ? screens : 0;
  const span = item.height + 6;
  const phase = item.phase + offset * item.frequency;
  const distance = offset * item.height * (0.42 + item.speed * 0.35);
  const lift = Math.sin(phase * 1.3) * item.bob;
  const y = ((item.y + span / 2 + distance + lift) % span + span) % span - span / 2;
  return {
    x: item.x + Math.sin(phase) * item.sway + Math.sin(phase * 0.55) * 0.25,
    y,
    z: item.z + Math.sin(phase * 0.7) * item.depthTravel,
    rotation: item.rotation.map((angle, axis) => angle + item.spin[axis] * offset * 3.2 + Math.sin(phase + axis * 1.2) * 0.18),
  };
}

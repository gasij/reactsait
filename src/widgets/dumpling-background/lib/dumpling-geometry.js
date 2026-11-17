import * as THREE from 'three';

// One merged mesh keeps a field of dumplings to a single instanced draw call.
export function createDumplingGeometry() {
  const positions = [], indices = [];
  const segments = 48, rings = 24;
  const stride = segments + 1, sideSize = (rings + 1) * stride;
  for (let side = 0; side < 2; side++) {
    for (let j = 0; j <= rings; j++) {
      const r = j / rings;
      for (let i = 0; i <= segments; i++) {
        const a = i / segments * Math.PI;
        const crimp = Math.pow(r, 12) * Math.sin(a * 22) * 0.035;
        const belly = 0.8 * Math.pow(Math.max(0, 1 - r * r), 0.55) * Math.pow(Math.max(0, r * Math.sin(a)), 0.42);
        const edge = 0.055 + 0.018 * Math.sin(a * 22) * Math.pow(r, 10);
        positions.push((1.9 * r + crimp) * Math.cos(a), (1.75 * r + crimp) * Math.sin(a) - 0.72, (side ? -1 : 1) * (belly + edge));
        if (j < rings && i < segments) {
          const k = side * sideSize + j * stride + i;
          if (side) indices.push(k, k + 1, k + stride, k + 1, k + stride + 1, k + stride);
          else indices.push(k, k + stride, k + 1, k + 1, k + stride, k + stride + 1);
        }
      }
    }
  }
  const bridge = (a, b, reverse = false) => {
    if (reverse) indices.push(a, a + sideSize, b, b, a + sideSize, b + sideSize);
    else indices.push(a, b, a + sideSize, b, b + sideSize, a + sideSize);
  };
  for (let i = 0; i < segments; i++) bridge(rings * stride + i, rings * stride + i + 1, true);
  for (let j = 0; j < rings; j++) { bridge(j * stride, (j + 1) * stride, true); bridge(j * stride + segments, (j + 1) * stride + segments); }

  function append(part) {
    const offset = positions.length / 3;
    positions.push(...part.getAttribute('position').array);
    for (const index of part.index.array) indices.push(index + offset);
    part.dispose();
  }
  const curve = new THREE.CatmullRomCurve3(Array.from({ length: 100 }, (_, i) => {
    const a = i / 99 * Math.PI;
    return new THREE.Vector3((1.9 + 0.04 * Math.sin(a * 22)) * Math.cos(a), (1.75 + 0.04 * Math.sin(a * 22)) * Math.sin(a) - 0.72, 0);
  }));
  append(new THREE.TubeGeometry(curve, 100, 0.083, 6));
  for (let i = 0; i < 23; i++) {
    const a = (i + 0.5) / 23 * Math.PI;
    const fold = new THREE.SphereGeometry(1, 8, 6);
    fold.scale(0.085, 0.21, 0.11);
    fold.rotateZ(a - Math.PI / 2);
    fold.translate(1.81 * Math.cos(a), 1.65 * Math.sin(a) - 0.72, 0.025);
    append(fold);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

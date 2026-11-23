import * as THREE from 'three';

const halfWidth = 1.9;
const archHeight = 1.77;
const foldY = -0.72;
const bellyY = -0.16;
const bellyDepth = 0.62;

// Cross-section from the crown of the filling to the die-cut edge.
// Each row gives the radius, the depth at a groove, and the height of its ridge.
const profile = [
  [0.16, 0.611, 0], [0.34, 0.575, 0], [0.50, 0.501, 0],
  [0.64, 0.394, 0], [0.74, 0.265, 0], [0.80, 0.153, 0],
  [0.835, 0.080, 0], [0.85, 0.061, 0.008],
  [0.875, 0.051, 0.062], [0.948, 0.046, 0.075],
  [0.987, 0.043, 0.050], [1, 0.027, 0.030],
];

function makeOutline() {
  const outline = [];
  const teeth = 18;
  // Broad flat lands separated by two sloping flanks and a narrow groove.
  const toothProfile = [[0, 0], [0.10, 0], [0.30, 1], [0.70, 1], [0.90, 0]];
  for (let tooth = 0; tooth < teeth; tooth++) {
    for (const [phase, ridge] of toothProfile) {
      const angle = Math.PI * (tooth + phase) / teeth;
      const cos = Math.cos(angle), sin = Math.sin(angle);
      const normalLength = Math.hypot(archHeight * cos, halfWidth * sin);
      outline.push({
        x: halfWidth * cos, y: foldY + archHeight * sin,
        nx: archHeight * cos / normalLength, ny: halfWidth * sin / normalLength,
        press: THREE.MathUtils.smoothstep(sin, 0.025, 0.28), ridge,
      });
    }
  }
  // The uncut fold curves in slightly between the two pinched tips.
  const foldSegments = 32;
  for (let i = 0; i < foldSegments; i++) {
    const x = 2 * i / foldSegments - 1;
    outline.push({ x: halfWidth * x, y: foldY + 0.15 * (1 - x * x), nx: 0, ny: 0, press: 0, ridge: 0 });
  }
  return outline;
}

export function createDumplingGeometry() {
  const outline = makeOutline();
  const count = outline.length;
  const positions = [], colors = [], indices = [];

  function buildFace(side) {
    const center = positions.length / 3;
    positions.push(0, bellyY, side * bellyDepth);
    colors.push(1, 1, 1);
    function triangle(a, b, c) {
      if (side > 0) indices.push(a, b, c);
      else indices.push(a, c, b);
    }

    let previousRing = center;
    for (const [radius, grooveDepth, ridgeHeight] of profile) {
      const ring = positions.length / 3;
      const lip = THREE.MathUtils.smoothstep(radius, 0.835, 1);
      const seal = THREE.MathUtils.smoothstep(radius, 0.80, 0.855);
      const foldedDepth = 0.021 + (bellyDepth - 0.021) * Math.sqrt(1 - radius * radius);
      for (const point of outline) {
        const relief = lip * point.press * (point.ridge - 0.5) * 0.085;
        const depth = THREE.MathUtils.lerp(foldedDepth, grooveDepth + ridgeHeight * point.ridge, point.press);
        positions.push(radius * point.x + relief * point.nx,
          bellyY + radius * (point.y - bellyY) + relief * point.ny, side * depth);
        // Local occlusion in the die grooves multiplies each dough's own color.
        const light = 1 - seal * point.press * (0.28 - 0.23 * point.ridge);
        colors.push(light, light, light);
      }
      for (let i = 0; i < count; i++) {
        const next = (i + 1) % count;
        if (previousRing === center) triangle(center, ring + i, ring + next);
        else {
          triangle(previousRing + i, ring + i, ring + next);
          triangle(previousRing + i, ring + next, previousRing + next);
        }
      }
      previousRing = ring;
    }
    return previousRing;
  }

  const front = buildFace(1);
  const back = buildFace(-1);
  // Give each cut facet its own normal so the rim keeps a crisp highlight.
  for (let i = 0; i < count; i++) {
    const next = (i + 1) % count;
    const wall = positions.length / 3;
    for (const vertex of [front + i, back + i, back + next, front + next]) {
      positions.push(positions[3 * vertex], positions[3 * vertex + 1], positions[3 * vertex + 2]);
      const light = colors[3 * vertex];
      colors.push(light, light, light);
    }
    indices.push(wall, wall + 1, wall + 2, wall, wall + 2, wall + 3);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

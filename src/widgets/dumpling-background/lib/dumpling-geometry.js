import * as THREE from 'three';

const halfWidth = 1.9;
const archHeight = 1.65;
const foldY = -0.49;
const bellyY = 0.02;
const bellyDepth = 0.74;

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
  const samplesPerTooth = 8;
  for (let tooth = 0; tooth < teeth; tooth++) {
    for (let sample = 0; sample < samplesPerTooth; sample++) {
      const phase = sample / samplesPerTooth;
      const ridge = (1 - Math.cos(2 * Math.PI * phase)) / 2;
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
  // A bowed fold gives the filling room below the two pinched tips.
  const foldSegments = 32;
  for (let i = 0; i < foldSegments; i++) {
    const x = 2 * i / foldSegments - 1;
    outline.push({ x: halfWidth * x, y: foldY - 0.56 * (1 - x * x), nx: 0, ny: 0, press: 0, ridge: 0 });
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
        const relief = lip * point.press * (point.ridge - 0.5) * 0.055;
        const pressedDepth = grooveDepth * (bellyDepth / 0.62) + ridgeHeight * point.ridge;
        const tip = THREE.MathUtils.smoothstep(Math.abs(radius * point.x) / halfWidth, 0.7, 1);
        const depth = THREE.MathUtils.lerp(foldedDepth, pressedDepth, point.press) * (1 - 0.72 * tip);
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
  // Share the outer ring so the pressed seam rounds into the dough on both faces.
  for (let i = 0; i < count; i++) {
    const next = (i + 1) % count;
    indices.push(front + i, back + i, back + next, front + i, back + next, front + next);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

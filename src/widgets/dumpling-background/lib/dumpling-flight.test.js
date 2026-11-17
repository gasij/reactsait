import { createFlightField, getScrollPose } from './dumpling-flight';
import { createDumplingGeometry } from './dumpling-geometry';

test('the field has a sharp central dumpling and foreground/background depth layers', () => {
  const field = createFlightField(28, 1.5);
  expect(field).toEqual(createFlightField(28, 1.5));
  expect(field[0].anchor).toBe(true);
  expect(field.some(item => item.z > 5)).toBe(true);
  expect(field.some(item => item.z < -10)).toBe(true);
  expect(field.every(item => item.scale > 0 && Number.isFinite(item.height))).toBe(true);
});

test('scroll controls position and rotation, and reversing scroll restores the exact pose', () => {
  const item = createFlightField(24)[1];
  const original = JSON.parse(JSON.stringify(item));
  const start = getScrollPose(item, 0);
  const scrolled = getScrollPose(item, 3);
  expect(scrolled.y).not.toBe(start.y);
  expect(scrolled.rotation).not.toEqual(start.rotation);
  expect(getScrollPose(item, 0)).toEqual(start);
  expect(item).toEqual(original);
  for (const offset of [-100, 100, 500]) {
    const pose = getScrollPose(item, offset);
    expect(Math.abs(pose.y)).toBeLessThanOrEqual((item.height + 6) / 2);
    expect([pose.x, pose.y, pose.z, ...pose.rotation].every(Number.isFinite)).toBe(true);
  }
});
test('the shared dumpling mesh has finite geometry, normals and valid indices', () => {
  const geometry = createDumplingGeometry();
  const positions = geometry.getAttribute('position');
  expect(positions.count).toBeLessThan(6000);
  expect(Array.from(positions.array).every(Number.isFinite)).toBe(true);
  expect(Array.from(geometry.getAttribute('normal').array).every(Number.isFinite)).toBe(true);
  expect(Math.max(...geometry.index.array)).toBeLessThan(positions.count);
  expect(geometry.boundingSphere.radius).toBeGreaterThan(1.8);
  geometry.dispose();
});

test('enhanced paths sway, travel in depth and tumble while staying safely in front of the camera', () => {
  const field = createFlightField(24, 1.5);
  const samples = Array.from({ length: 121 }, (_, index) => getScrollPose(field[1], index / 10));
  const range = axis => Math.max(...samples.map(pose => pose[axis])) - Math.min(...samples.map(pose => pose[axis]));
  expect(range('x')).toBeGreaterThan(1);
  expect(range('z')).toBeGreaterThan(1.5);
  expect(Math.abs(samples[40].rotation[0] - samples[0].rotation[0])).toBeGreaterThan(2.5);
  for (const item of field) {
    for (const offset of [0, 2, 5, 10, 50]) expect(getScrollPose(item, offset).z).toBeLessThan(9);
  }
});

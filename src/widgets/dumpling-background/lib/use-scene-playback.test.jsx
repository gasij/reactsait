import { act, renderHook } from '@testing-library/react';
import { useScenePlayback } from './use-scene-playback';

const originalMatchMedia = window.matchMedia;
const originalObserver = global.IntersectionObserver;
let onIntersection;
let onPreference;
let preference;
beforeEach(() => {
  preference = { matches: false, addEventListener: jest.fn((_, listener) => { onPreference = listener; }), removeEventListener: jest.fn() };
  window.matchMedia = jest.fn(query => query.includes('reduced-motion') ? preference : { matches: false, addEventListener() {}, removeEventListener() {} });
  global.IntersectionObserver = jest.fn(callback => { onIntersection = callback; return { observe: jest.fn(), disconnect: jest.fn() }; });
});
afterAll(() => { window.matchMedia = originalMatchMedia; global.IntersectionObserver = originalObserver; });

test('offscreen pause and global motion setting stop the scroll background', () => {
  const root = { current: document.createElement('div') };
  const { result, rerender } = renderHook(({ paused }) => useScenePlayback(root, paused), { initialProps: { paused: false } });
  expect(result.current.playing).toBe(true);
  act(() => onIntersection([{ isIntersecting: false }]));
  expect(result.current.playing).toBe(false);
  act(() => onIntersection([{ isIntersecting: true }]));
  expect(result.current.playing).toBe(true);
  rerender({ paused: true });
  expect(result.current.playing).toBe(false);
});

test('system reduced motion freezes the scene and cleans up its observer/listeners', () => {
  const root = { current: document.createElement('div') };
  const { result, unmount } = renderHook(() => useScenePlayback(root, false));
  act(() => { preference.matches = true; onPreference(); });
  expect(result.current.reduced).toBe(true);
  expect(result.current.playing).toBe(false);
  const observer = global.IntersectionObserver.mock.results[0].value;
  unmount();
  expect(observer.disconnect).toHaveBeenCalled();
  expect(preference.removeEventListener).toHaveBeenCalledWith('change', onPreference);
});

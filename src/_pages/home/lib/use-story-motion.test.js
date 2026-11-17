import React, { useRef } from 'react';
import { render } from '@testing-library/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import useStoryMotion from './use-story-motion';

function Page({ paused = false, catalog = 'all' }) {
  const root = useRef();
  useStoryMotion(root, catalog, paused);
  return <div ref={root}><div className="hero-letter">В</div><div className="hero-topline">Лепим</div><div className="hero-copy"><p>Вручную</p><a href="#products">Меню</a></div><div className="hero-visual" /><div className="hero-side" /><div className="section-heading">Меню</div><div className="products-grid"><div className="product-card">Вишня</div></div><div className="production-photo" /><div className="closing"><h2>К столу</h2><div className="closing-flower" /></div></div>;
}

const originalMatchMedia = window.matchMedia;
const originalScrollTo = window.scrollTo;
function preference(reduced) {
  window.matchMedia = jest.fn(query => ({ matches: query === '(prefers-reduced-motion: no-preference)' && !reduced, media: query, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} }));
  window.scrollTo = jest.fn();
  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({top: 2000, bottom: 2200, left: 0, right: 800, width: 800, height: 200});
}
afterEach(() => jest.restoreAllMocks());
afterAll(() => { window.matchMedia = originalMatchMedia; window.scrollTo = originalScrollTo; });

test('reduced-motion users see content without animation styles or scroll triggers', () => {
  preference(true);
  const { container, unmount } = render(<Page />);
  expect(container.querySelector('.hero-letter').style.opacity).toBe('');
  expect(ScrollTrigger.getAll()).toHaveLength(0);
  unmount();
});

test('disabling motion reverts hidden states and removes scroll triggers', () => {
  preference(false);
  const { container, rerender, unmount } = render(<Page />);
  expect(ScrollTrigger.getAll().length).toBeGreaterThan(0);
  rerender(<Page paused />);
  expect(ScrollTrigger.getAll()).toHaveLength(0);
  expect(container.querySelector('.hero-letter').style.opacity).toBe('');
  expect(container.querySelector('.product-card').style.opacity).toBe('');
  unmount();
});

test('StrictMode and catalog changes leave no triggers after unmount', () => {
  preference(false);
  const { rerender, unmount } = render(<React.StrictMode><Page /></React.StrictMode>);
  const before = ScrollTrigger.getAll().length;
  rerender(<React.StrictMode><Page catalog="sweet" /></React.StrictMode>);
  expect(ScrollTrigger.getAll()).toHaveLength(before);
  unmount();
  expect(ScrollTrigger.getAll()).toHaveLength(0);
});

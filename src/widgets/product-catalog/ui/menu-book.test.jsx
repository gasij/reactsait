import { act, fireEvent, render, screen } from '@testing-library/react';
import { MotionProvider } from '@/shared/lib/motion';
import { MenuBook } from './menu-book';

const originalHeight = window.innerHeight;
const originalY = window.scrollY;
const trackStart = 1200;

function scrollTo(y, elapsed = 700) {
  window.scrollY = y;
  fireEvent.scroll(window);
  act(() => jest.advanceTimersByTime(elapsed));
}

function renderBook(height) {
  window.innerHeight = height;
  window.scrollY = 0;
  jest.useFakeTimers();
  jest.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(function () {
    return this.tagName === 'ARTICLE' ? 500 : 50;
  });
  jest.spyOn(Element.prototype, 'getBoundingClientRect').mockImplementation(() => ({
    top: trackStart - window.scrollY,
  }));
  render(<MotionProvider><MenuBook order={[0, 1, 2]} /></MotionProvider>);
  return screen.getByRole('combobox', { name: 'Перейти к развороту' });
}

afterEach(() => {
  jest.restoreAllMocks();
  jest.useRealTimers();
  window.innerHeight = originalHeight;
  window.scrollY = originalY;
});

test('native scroll scrubs the fold in both directions and releases at the last spread', () => {
  const contents = renderBook(800);
  const scrollWindow = jest.spyOn(window, 'scrollTo');
  const stack = screen.getByRole('article', { name: 'Обложка' }).parentElement;
  const step = 520;
  scrollTo(trackStart + step * .6);
  const angle = parseFloat(stack.style.getPropertyValue('--turn-angle'));
  expect(angle).toBeCloseTo(-108);
  expect(stack.querySelector('[data-phase="out"]')).toHaveAttribute('aria-label', 'Обложка');
  expect(stack.querySelector('[data-phase="in"]')).toHaveAttribute('aria-label', 'Царь-Вишня');
  scrollTo(trackStart + step);
  expect(contents).toHaveValue('1');
  scrollTo(trackStart + step * 4);
  expect(contents).toHaveValue('2');
  scrollTo(trackStart + step * .6);
  expect(parseFloat(stack.style.getPropertyValue('--turn-angle'))).toBeCloseTo(angle);
  scrollTo(trackStart - 100);
  expect(contents).toHaveValue('0');
  expect(scrollWindow).not.toHaveBeenCalled();
});

test('on a short viewport scrolling reveals the bottom of a tall spread before it turns', () => {
  const contents = renderBook(400);
  scrollTo(trackStart + 100);
  expect(screen.getByRole('region', { name: 'Книжка-меню' }).style.getPropertyValue('--reading-offset')).toBe('-100px');
  expect(contents).toHaveValue('0');
  scrollTo(trackStart + 500);
  expect(contents).toHaveValue('1');
});

test('a contents selection scrolls to the corresponding position in the document', () => {
  const contents = renderBook(800);
  const scrollWindow = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  fireEvent.change(contents, { target: { value: '2' } });
  expect(scrollWindow).toHaveBeenCalledWith({ top: trackStart + 1040, behavior: 'instant' });
  scrollTo(trackStart + 1040);
  expect(screen.getByRole('article', { name: 'Царь-Клубника' })).toBeInTheDocument();
});

test('short wheel gestures finish in their direction, and scrolling outside the book is free', () => {
  renderBook(800);
  const move = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  scrollTo(trackStart);
  // Passive wheel listeners may see the compositor's updated scrollY first.
  window.scrollY = trackStart + 65;
  fireEvent.wheel(window, { deltaY: 65 });
  scrollTo(trackStart + 65);
  expect(move).toHaveBeenLastCalledWith({ top: trackStart + 520, behavior: 'smooth' });
  scrollTo(trackStart + 520);
  fireEvent.wheel(window, { deltaY: -50 });
  scrollTo(trackStart + 470);
  expect(move).toHaveBeenLastCalledWith({ top: trackStart, behavior: 'smooth' });
  move.mockClear();
  scrollTo(trackStart);
  fireEvent.wheel(window, { deltaY: -80 });
  scrollTo(trackStart - 80);
  expect(move).not.toHaveBeenCalled();
});

test('a held finger can pause mid-turn and completing the swipe settles the spread', () => {
  renderBook(800);
  const move = jest.spyOn(window, 'scrollTo').mockImplementation(() => {});
  scrollTo(trackStart);
  fireEvent.touchStart(window, { touches: [{}] });
  scrollTo(trackStart + 110);
  expect(move).not.toHaveBeenCalled();
  fireEvent.touchEnd(window, { touches: [] });
  act(() => jest.advanceTimersByTime(180));
  expect(move).toHaveBeenCalledWith({ top: trackStart + 520, behavior: 'smooth' });
});

test('a wheel gesture can read overflow on a small screen without turning the page', () => {
  renderBook(400);
  const move = jest.spyOn(window, 'scrollTo');
  scrollTo(trackStart);
  fireEvent.wheel(window, { deltaY: 90 });
  scrollTo(trackStart + 90);
  expect(move).not.toHaveBeenCalled();
});

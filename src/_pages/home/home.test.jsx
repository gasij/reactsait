import { fireEvent, render, screen, within } from '@testing-library/react';
import { HomePage as App } from './index';
import { MotionProvider } from '@/shared/lib/motion';
const Page = () => <MotionProvider><App /></MotionProvider>;
jest.mock('@/widgets/dumpling-background', () => ({ DumplingBackground: () => <div data-testid="scroll-background" aria-hidden="true" /> }));
beforeAll(() => {
  HTMLDialogElement.prototype.showModal = function () {
    this.setAttribute('open', '');
  };
});
test('the home catalog contains the book and filters its spreads', () => {
  render(<Page />);
  expect(screen.getByRole('link', { name: /Открыть книжку-меню/ })).toHaveAttribute('href', '#products');
  const catalog = within(screen.getByRole('region', { name: /Выбирайте/ }));
  const book = within(catalog.getByRole('region', { name: 'Книжка-меню' }));
  expect(book.getAllByRole('option')).toHaveLength(13);
  for (const [name, count] of [['Несладкие вареники', 1], ['Домашние блюда', 3], ['Сладкие вареники', 7], ['Всё меню', 13]]) {
    fireEvent.click(catalog.getByRole('button', { name }));
    expect(catalog.getAllByRole('option')).toHaveLength(count);
    expect(catalog.getByRole('button', { name })).toHaveAttribute('aria-pressed', 'true');
  }
});
test('product details show the selected product, price, and close correctly', async () => {
  render(<Page />);
  fireEvent.click(screen.getByRole('button', {
    name: 'Открыть описание Царь-Вишня'
  }));
  const dialog = screen.getByRole('dialog');
  expect(within(dialog).getByRole('heading', {
    name: 'Царь-Вишня'
  })).toBeInTheDocument();
  expect(within(dialog).getByText('от 450 ₽/кг')).toBeInTheDocument();
  fireEvent.click(within(dialog).getByRole('button', {
    name: 'Закрыть описание'
  }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});
test('mobile menu toggles its accessible state and closes with Escape', async () => {
  render(<Page />);
  fireEvent.click(screen.getByRole('button', {
    name: 'Открыть меню'
  }));
  expect(screen.getByRole('button', {
    name: 'Закрыть меню'
  })).toHaveAttribute('aria-expanded', 'true');
  fireEvent.keyDown(document, {
    key: 'Escape'
  });
  expect(screen.getByRole('button', {
    name: 'Открыть меню'
  })).toHaveAttribute('aria-expanded', 'false');
});
test('collection links open the complete matching catalog category', async () => {
  render(<Page />);
  fireEvent.click(screen.getByRole('link', {
    name: /На сладкой стороне/
  }));
  expect(screen.getAllByRole('article')).toHaveLength(7);
  expect(screen.getByRole('button', {
    name: 'Сладкие вареники'
  })).toHaveAttribute('aria-pressed', 'true');
  fireEvent.click(screen.getByRole('link', {
    name: /Обед — это серьёзно/
  }));
  expect(screen.getAllByRole('article')).toHaveLength(3);
  expect(screen.getByRole('button', {
    name: 'Домашние блюда'
  })).toHaveAttribute('aria-pressed', 'true');
});

test('visitor can disable and re-enable motion', async () => {
  render(<Page />);
  fireEvent.click(screen.getByRole('button', { name: 'Без анимации' }));
  expect(screen.getByRole('button', { name: 'Включить анимацию' })).toHaveAttribute('aria-pressed', 'true');
  fireEvent.click(screen.getByRole('button', { name: 'Включить анимацию' }));
  expect(screen.getByRole('button', { name: 'Без анимации' })).toHaveAttribute('aria-pressed', 'false');
});

 test('the decorative background is present without a 3D activation button', async () => {
  render(<Page />);
  expect(screen.getAllByTestId('scroll-background')).toHaveLength(1);
  expect(screen.queryByRole('button', { name: 'Посмотреть в 3D' })).not.toBeInTheDocument();
});

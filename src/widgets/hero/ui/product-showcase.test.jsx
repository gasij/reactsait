import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { ProductDetailsProvider } from '@/features/view-product';
import { Hero } from './hero';
beforeAll(() => { HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); }; });
test('the product photo stays visible and there is no separate 3D view', () => {
  render(<ProductDetailsProvider><Hero /></ProductDetailsProvider>);
  expect(screen.getByRole('img', { name: 'Вареники с вишней и с сулугуни в фирменных упаковках на вышитой скатерти' })).toBeInTheDocument();
  expect(screen.queryByRole('button', { name: 'Посмотреть в 3D' })).not.toBeInTheDocument();
});
test('the cover product button opens the matching product details', () => {
  render(<ProductDetailsProvider><Hero /></ProductDetailsProvider>);
  fireEvent.click(screen.getByRole('button', { name: 'Открыть описание Царь-Вишня' }));
  expect(screen.getByRole('dialog', { name: 'Царь-Вишня' })).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: 'Закрыть описание' }));
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
});

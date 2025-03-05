import Header from '@/components/Header';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { expect, test, vi } from 'vitest';

const pushMock = vi.fn();
let searchParamValue = '1';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => ({
    get: (key: string) => (key === 'search' ? searchParamValue : '1'),
  }),
}));

test('Search input with different value', async () => {
  searchParamValue = ''; // Имитируем начальное состояние (нет параметра "search")
  render(<Header />);

  const searchInput = screen.getByTestId('searchInput');
  const searchBtn = screen.getByTestId('searchButton');

  expect(searchInput).toBeInTheDocument();
  expect(searchInput).toHaveValue('');

  fireEvent.change(searchInput, { target: { value: 'ce' } });
  fireEvent.click(searchBtn);

  waitFor(() => {
    expect(pushMock).toHaveBeenCalledWith('?page=1&search=ce');
  });

  fireEvent.change(searchInput, { target: { value: '' } });
  fireEvent.click(searchBtn);

  waitFor(() => {
    expect(pushMock).toHaveBeenCalledWith('?page=1');
  });
});

test('Press Enter on Search input with different value', async () => {
  searchParamValue = '';
  render(<Header />);

  const searchInput = screen.getByTestId('searchInput');

  expect(searchInput).toBeInTheDocument();
  fireEvent.change(searchInput, { target: { value: 'ce' } });
  fireEvent.keyDown(searchInput, { key: 'Enter' });

  waitFor(() => {
    expect(pushMock).toHaveBeenCalledWith('?page=1&search=ce');
  });
});

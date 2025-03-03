import Header from '@/components/Header';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { NextRouter } from 'next/router';
import React from 'react';
import { expect, test, vi } from 'vitest';

vi.mock('next/router', async (importOriginal) => {
  const actual: NextRouter = (await importOriginal()) as NextRouter;
  return {
    ...actual,
    useRouter: () => ({
      query: { page: '1' },
    }),
  };
});

test('Search input with different value', async () => {
  mockRouter.setCurrentUrl('/?page=1');
  render(
    <RouterContext.Provider value={mockRouter}>
      <Header />
    </RouterContext.Provider>
  );

  const searchInput = screen.getByTestId('searchInput');
  const searchBtn = screen.getByTestId('searchButton');
  const value = searchInput.getAttribute('value');

  expect(searchInput).toBeInstanceOf(HTMLInputElement);
  expect(searchInput).toBeInTheDocument();
  expect(value).toBe('');
  expect(mockRouter.query).toEqual({ page: '1' });

  fireEvent.change(searchInput, { target: { value: 'ce' } });
  fireEvent.click(searchBtn);

  waitFor(() => {
    expect(mockRouter.query).toEqual({ page: '1', search: 'ce' });
  });
  fireEvent.change(searchInput, { target: { value: '' } });
  fireEvent.click(searchBtn);
  expect(mockRouter.query).toEqual({ page: '1' });
});

test('Press Enter on Search input with different value', async () => {
  mockRouter.setCurrentUrl('/?page=1');
  render(
    <RouterContext.Provider value={mockRouter}>
      <Header />
    </RouterContext.Provider>
  );

  const searchInput = screen.getByTestId('searchInput');

  expect(searchInput).toBeInstanceOf(HTMLInputElement);
  expect(searchInput).toBeInTheDocument();
  fireEvent.change(searchInput, { target: { value: 'ce' } });
  fireEvent.keyDown(searchInput, { key: 'Enter' });

  waitFor(() => {
    expect(mockRouter.query).toEqual({ page: '1', search: 'ce' });
  });
});

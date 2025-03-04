import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import mockRouter from 'next-router-mock';
import { expect, test, vi } from 'vitest';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import ThemeContextProvider from '@/context/ThemeContext';
import { ToastProvider } from '@/components/ToastContext';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { mockFakeMoreResponse } from '@/mock/mock';
import { NextRouter } from 'next/router';
import HomePage from '@/components/HomePage';

const mockData = {
  data: mockFakeMoreResponse,
};
vi.mock('next/router', async (importOriginal) => {
  const actual: NextRouter = (await importOriginal()) as NextRouter;
  return {
    ...actual,
    useRouter: () => ({
      query: { page: '1' },
      push: vi.fn(),
      replace: vi.fn(),
    }),
  };
});
test('Make sure the component updates URL query parameter when page changes', async () => {
  mockRouter.setCurrentUrl('/?page=1');
  render(
    <ThemeContextProvider>
      <ToastProvider>
        <Provider store={store}>
          <RouterContext.Provider value={mockRouter}>
            <HomePage cards={mockData.data} />
          </RouterContext.Provider>
        </Provider>
      </ToastProvider>
    </ThemeContextProvider>
  );
  const pagination = screen.getByTestId('paginator');
  const page2 = screen.getByText('2');
  fireEvent.click(page2);

  expect(pagination).toBeInTheDocument();

  waitFor(() => {
    expect(mockRouter.query).toEqual({ page: '2' });
  });
});

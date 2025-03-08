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
import HomePage from '@/app/components/HomePage';

const mockData = {
  data: mockFakeMoreResponse,
};
const pushMock = vi.fn();
const searchParamValue = '1';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
  useSearchParams: () => ({
    get: (key: string) => (key === 'search' ? searchParamValue : '1'),
  }),
}));
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

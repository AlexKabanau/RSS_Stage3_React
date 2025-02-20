import React, { StrictMode } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import { store } from '../../store/store';
import { vi } from 'vitest';
import { useGetCharactersQuery } from '../../api/redux.api'; // Импортируем отдельно
import { api } from '../../api/redux.api';
import ErrorBoundary from '../../components/ErrorBoundary';
import ThemeContextProvider from '../../context/ThemeContext';
import { ToastProvider } from '../../components/ToastContext';
import { mockFakeResponse } from '../../mock/mock';

vi.mock('../../api/redux.api', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof api;
  return {
    ...actual,
    useGetCharactersQuery: vi.fn(), // Мокаем только нужный хук
  };
});

describe('HomePage', () => {
  it('should show error state', async () => {
    // Настраиваем мок, чтобы он возвращал ошибку
    (useGetCharactersQuery as jest.Mock).mockReturnValue({
      data: null,
      error: new Error('Some error occurred'),
      isFetching: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <StrictMode>
          <ErrorBoundary>
            <ThemeContextProvider>
              <ToastProvider>
                <MemoryRouter initialEntries={['/']}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                  </Routes>
                </MemoryRouter>
              </ToastProvider>
            </ThemeContextProvider>
          </ErrorBoundary>
        </StrictMode>
      </Provider>
    );

    // Ожидаем, что сообщение об ошибке появится в документе
    await waitFor(() => {
      expect(
        screen.getByText(/Some error occurred\. Please try again\./i)
      ).toBeInTheDocument();
    });
  });

  it('should show data when query is successful', async () => {
    // Настраиваем мок, чтобы он возвращал данные
    (useGetCharactersQuery as jest.Mock).mockReturnValue({
      data: mockFakeResponse,
      error: null,
      isFetching: false,
      refetch: vi.fn(),
    });

    render(
      <Provider store={store}>
        <StrictMode>
          <ErrorBoundary>
            <ThemeContextProvider>
              <ToastProvider>
                <MemoryRouter initialEntries={['/']}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                  </Routes>
                </MemoryRouter>
              </ToastProvider>
            </ThemeContextProvider>
          </ErrorBoundary>
        </StrictMode>
      </Provider>
    );

    // Ожидаем, что данные появятся в документе
    await waitFor(() => {
      expect(screen.getByText('Louis Weasley')).toBeInTheDocument();
    });
  });
});

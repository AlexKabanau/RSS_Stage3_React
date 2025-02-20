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
import { mockFakeResponse, mockFakeResponseNoItems } from '../../mock/mock';

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
      expect(
        screen.getByText('Ginevra Molly Potter (née Weasley)')
      ).toBeInTheDocument();
    });
  });
  it('should show nodata when query is successful', async () => {
    // Настраиваем мок, чтобы он возвращал данные
    (useGetCharactersQuery as jest.Mock).mockReturnValue({
      data: mockFakeResponseNoItems,
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
      expect(screen.getByText('Items not found')).toBeInTheDocument();
    });
  });
  it('should show favorits count when there are favorits', async () => {
    // Добавляем избранные элементы в стор
    store.dispatch({
      type: 'favorits/setFavorites',
      payload: [
        {
          id: '13fdb092-fca1-464c-8e13-a40049f6c66b',
          type: 'character',
          attributes: {
            slug: '1996-gryffindor-quidditch-keeper-trials-spectators',
            alias_names: [],
            animagus: null,
            blood_status: null,
            boggart: null,
            born: null,
            died: null,
            eye_color: null,
            family_members: [],
            gender: null,
            hair_color: null,
            height: null,
            house: null,
            image: null,
            jobs: [],
            marital_status: null,
            name: '1996 Gryffindor Quidditch Keeper trials spectators',
            nationality: null,
            patronus: null,
            romances: [],
            skin_color: null,
            species: null,
            titles: [],
            wands: [],
            weight: null,
            wiki: 'https://harrypotter.fandom.com/wiki/1996_Gryffindor_Quidditch_Keeper_trials_spectators',
          },
          links: {
            self: '/v1/characters/13fdb092-fca1-464c-8e13-a40049f6c66b',
          },
        },
      ],
    });

    // Настраиваем мок, чтобы он возвращал успешные данные
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

    // Ожидаем, что количество избранных элементов появится в документе
    await waitFor(() => {
      expect(screen.getByText(/Favorits: 1/i)).toBeInTheDocument();
    });
  });
});

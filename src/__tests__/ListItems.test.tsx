import mockRouter from 'next-router-mock';
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { afterAll, beforeAll, describe, expect, test, vi } from 'vitest';
import { mockFakeResponse } from '@/mock/mock';
import { NextRouter } from 'next/router';
import ThemeContextProvider from '@/context/ThemeContext';
import { ToastProvider } from '@/components/ToastContext';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import ListItems from '@/components/ListItems';
import { setFavorites } from '@/store/reducers/favorites';
import HomePage from '@/components/HomePage';

describe('Tests for the CardList component', () => {
  beforeAll(() => {
    vi.mock('next/router', async (importOriginal) => {
      const actual: NextRouter = (await importOriginal()) as NextRouter;
      return {
        ...actual,
        useRouter: () => ({
          query: { page: '1' },
        }),
      };
    });
  });

  afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  test('Component renders the specified number of cards', () => {
    const mockData = {
      data: mockFakeResponse,
    };
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

    expect(screen.getAllByRole('item').length).toBe(2);
  });

  test('An appropriate message is displayed if no cards are present', async () => {
    mockRouter.setCurrentUrl('/?page=1');

    render(
      <ThemeContextProvider>
        <ToastProvider>
          <Provider store={store}>
            <RouterContext.Provider value={mockRouter}>
              <ListItems items={[]} />
            </RouterContext.Provider>
          </Provider>
        </ToastProvider>
      </ThemeContextProvider>
    );

    const errorMessage = "Could't find any characters";
    const isErrorTitle = screen.getByText(errorMessage);
    expect(isErrorTitle).toBeTruthy();
  });
  test('Favorite button toggles the favorite state', () => {
    const item = mockFakeResponse.data[1];
    const mockData = {
      data: mockFakeResponse,
    };
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

    const favorites = screen.getByTestId(
      'favorite-checkbox-49ce06a5-f08b-4475-8e79-72a2b0733c5d'
    );
    expect(favorites).toBeTruthy();
    fireEvent.click(favorites);

    waitFor(() => {
      expect(store.getState().favorites.favorites).toContainEqual(item);
    });

    fireEvent.click(favorites);
    waitFor(() => {
      expect(store.getState().favorites.favorites).not.toContainEqual(item);
    });
  });
  test('Unselect all button clears favorites', () => {
    store.dispatch(setFavorites(mockFakeResponse.data));
    const mockData = {
      data: mockFakeResponse,
    };
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

    const unselectButton = screen.getByTestId('TrashIcon');
    fireEvent.click(unselectButton);
    expect(
      screen.getByText('Successfully deleted all characters!')
    ).toBeInTheDocument();
    expect(store.getState().favorites.favorites).toHaveLength(0);
  });
});

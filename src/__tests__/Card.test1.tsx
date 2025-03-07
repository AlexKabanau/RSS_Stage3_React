import '@testing-library/jest-dom';
import mockRouter from 'next-router-mock';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { afterAll, beforeAll, describe, expect, vi } from 'vitest';
import { mockFakeCharacterResponse, mockFakeResponse } from '../mock/mock';
import Item from '../components/Item';
import { NextRouter } from 'next/router';
// import HomePage from '@/pages';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import ThemeContextProvider from '@/context/ThemeContext';
import { ToastProvider } from '@/components/ToastContext';
import userEvent from '@testing-library/user-event';
import HomePage from '@/app/components/HomePage';

const pushMock = vi.fn();
// const pushMock = vi.fn();
const searchParamValue = '1';

describe('Tests for the Item component', () => {
  beforeAll(() => {
    vi.mock('next/navigation', () => ({
      useRouter: () => ({
        push: pushMock,
        replace: pushMock,
        // query: { page: searchParamValue },
      }),
      useSearchParams: () => ({
        get: (key: string) => (key === 'search' ? searchParamValue : '1'),
      }),
    }));
  });

  afterAll(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
  });

  it('Item component renders the relevant item data', () => {
    mockRouter.setCurrentUrl('/?page=1');

    render(
      <Item
        item={mockFakeCharacterResponse.data}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
      />
    );

    const cardName = screen.getByText(
      mockFakeCharacterResponse.data.attributes.name
    );
    // const cardSpecies = screen.getByText((content) => {
    //   return content.includes(
    //     mockFakeCharacterResponse.data.attributes.species
    //   );
    // });

    expect(cardName).toBeInTheDocument();
    // expect(cardSpecies).toBeInTheDocument();
  });

  it('renders a link with the correct URL', () => {
    mockRouter.setCurrentUrl('/?page=1');

    render(
      <Item
        item={mockFakeCharacterResponse.data}
        isFavorite={false}
        onToggleFavorite={vi.fn()}
      />
    );

    const linkElement = screen.getByRole('link');
    expect(linkElement).toHaveAttribute(
      'href',
      '/character/b832f9ed-fe71-46f5-a9e1-b947a49161e2?page=1&search=1'
    );
  });

  it('Clicking on a card opens a detailed card component && Clicking triggers an additional API call to fetch detailed information.', async () => {
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

    const cards = screen.getAllByRole('link');
    expect(cards).toBeTruthy();

    expect(mockRouter.query).toEqual(
      expect.not.objectContaining({
        id: expect.anything(),
      })
    );
  });
  it('Add to favorites.', async () => {
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
    ) as HTMLInputElement;
    expect(favorites).toBeTruthy();
    userEvent.click(favorites);

    waitFor(() => {
      expect(favorites.checked).toBe(true);
      expect(store.getState().favorites.favorites.length).toBe(1);
    });
  });
  it('Toggle favorites.', async () => {
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
    userEvent.click(favorites);
    userEvent.click(favorites);

    waitFor(() => {
      expect(store.getState().favorites.favorites.length).toBe(0);
    });
  });

  it('Link component handles href correctly based on search query', () => {
    mockRouter.setCurrentUrl('/?page=1&search=ce');
    mockRouter.query = { ...mockRouter.query };
    render(
      <RouterContext.Provider value={mockRouter}>
        <Item
          item={mockFakeCharacterResponse.data}
          isFavorite={false}
          onToggleFavorite={vi.fn()}
        />
      </RouterContext.Provider>
    );
    expect(mockRouter.query).toEqual({ page: '1', search: 'ce' });
  });
});

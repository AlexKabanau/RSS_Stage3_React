import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import favoritsSlice from '../store/reducers/favorites';
// import ListItems from './ListItems';
import { vi } from 'vitest';
import ListItems from '@/components/ListItems';
import { mockFakeItemList } from '@/mock/mock';
import { MemoryRouter } from 'react-router-dom';
import { ToastProvider } from '@/components/ToastContext';

// Мокаем хук useToast
vi.mock('./useToast', () => ({
  useToast: () => ({
    addToast: vi.fn(),
  }),
}));

const createTestStore = () =>
  configureStore({
    reducer: {
      favorites: favoritsSlice,
    },
  });

describe('ListItems', () => {
  test('renders correctly with items', () => {
    render(
      <MemoryRouter>
        <Provider store={createTestStore()}>
          <ToastProvider>
            <ListItems items={mockFakeItemList} />
          </ToastProvider>
        </Provider>
      </MemoryRouter>
    );

    expect(
      screen.getByText("George Weasley's dance partner")
    ).toBeInTheDocument();
    expect(
      screen.getByText('Ginevra Molly Potter (née Weasley)')
    ).toBeInTheDocument();
  });

  test('renders message when no items are found', () => {
    render(
      <MemoryRouter>
        <Provider store={createTestStore()}>
          <ToastProvider>
            <ListItems items={[]} />
          </ToastProvider>
        </Provider>
      </MemoryRouter>
    );

    expect(screen.getByText(`Could't find any characters`)).toBeInTheDocument();
  });

  test('adds item to favorites and shows toast', async () => {
    // const { useToast } = await import('../components/useToast');
    // const addToast = useToast().addToast;

    render(
      <MemoryRouter>
        <Provider store={createTestStore()}>
          <ToastProvider>
            <ListItems items={mockFakeItemList} />
          </ToastProvider>
        </Provider>
      </MemoryRouter>
      // <Provider store={createTestStore()}>
      //   <ListItems items={mockFakeItemList} />
      // </Provider>
    );

    const favoriteButton = screen.getByTestId(
      `favorite-checkbox-643ae975-0c29-49a7-a87e-d052b798962d`
    );
    fireEvent.click(favoriteButton);
    expect(
      screen.getByText(/One character successfully added to favorites!/i)
    ).toBeInTheDocument();

    // expect(addToast).toHaveBeenCalled();
  });

  test('removes item from favorites and shows toast', () => {
    render(
      <MemoryRouter>
        <Provider store={createTestStore()}>
          <ToastProvider>
            <ListItems items={mockFakeItemList} />
          </ToastProvider>
        </Provider>
      </MemoryRouter>
      // <Provider store={createTestStore()}>
      //   <ListItems items={mockFakeItemList} />
      // </Provider>
    );

    const favoriteButton = screen.getByTestId(
      `favorite-checkbox-643ae975-0c29-49a7-a87e-d052b798962d`
    );
    fireEvent.click(favoriteButton);
    expect(
      screen.getByText(/One character successfully added to favorites!/i)
    ).toBeInTheDocument();
    fireEvent.click(favoriteButton);
    expect(
      screen.getByText(/One character successfully removed from favorites!/i)
    ).toBeInTheDocument();
  });
});

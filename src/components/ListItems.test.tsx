// src/components/ListItems.test.tsx

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import ListItems from './ListItems';
// import { ToastProvider } from './ToastContext';
import { setFavorites, clearFavorits } from '../store/slice/favoritsSlice';
import { ResponseType } from '../api/getItems'; // Импортируйте ResponseType
import { mockFakeItemList } from '../mock/mock';
import { MemoryRouter } from 'react-router-dom';
import { ToastProvider } from './ToastContext';
// import userEvent from '@testing-library/user-event';

describe('ListItems', () => {
  const mockItems: ResponseType[] = mockFakeItemList;

  const renderWithProviders = (children: React.ReactNode) => {
    return render(
      <MemoryRouter>
        <Provider store={store}>
          <ToastProvider>
            {children}
            {/* Оберните в MemoryRouter */}
          </ToastProvider>
        </Provider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    store.dispatch(clearFavorits()); // Сброс состояния перед каждым тестом

    // Mock для useDownloadCSV внутри блока beforeEach
    vi.mock('../hooks/downloadItemsCSV', () => ({
      useDownloadCSV: vi.fn(() => vi.fn()), // Используйте vi вместо jest
    }));
  });

  it('должен отображать элементы списка', () => {
    renderWithProviders(<ListItems items={mockItems} />);
    expect(
      screen.getByText(`George Weasley's dance partner`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Ginevra Molly Potter (née Weasley)`)
    ).toBeInTheDocument();
  });

  it('должен добавлять элемент в избранное', async () => {
    renderWithProviders(<ListItems items={mockItems} />);

    const checkbox = screen.getByTestId(
      'favorite-checkbox-643ae975-0c29-49a7-a87e-d052b798962d'
    );
    fireEvent.click(checkbox);

    expect(store.getState().favorits.favorits.length).toBe(1);
  });

  it('должен удалять элемент из избранного и показывать тост', () => {
    store.dispatch(setFavorites(['643ae975-0c29-49a7-a87e-d052b798962d'])); // Добавляем элемент в избранное

    renderWithProviders(<ListItems items={mockItems} />);

    const checkbox = screen.getByTestId(
      'favorite-checkbox-643ae975-0c29-49a7-a87e-d052b798962d'
    );

    fireEvent.click(checkbox);
    // fireEvent.click(checkbox);
    expect(store.getState().favorits.favorits.length).toBe(0);
  });
});

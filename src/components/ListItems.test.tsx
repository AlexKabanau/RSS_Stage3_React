import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import ListItems from './ListItems';
import { clearFavorits } from '../store/slice/favoritsSlice';
import { ResponseType } from '../api/getItems';
import { mockFakeItemList } from '../mock/mock';
import { MemoryRouter } from 'react-router-dom';
import { ToastProvider } from './ToastContext';

describe('ListItems', () => {
  const mockItems: ResponseType[] = mockFakeItemList;

  const renderWithProviders = (children: React.ReactNode) => {
    return render(
      <MemoryRouter>
        <Provider store={store}>
          <ToastProvider>{children}</ToastProvider>
        </Provider>
      </MemoryRouter>
    );
  };

  beforeEach(() => {
    store.dispatch(clearFavorits());

    vi.mock('../hooks/downloadItemsCSV', () => ({
      useDownloadCSV: vi.fn(() => vi.fn()),
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
});

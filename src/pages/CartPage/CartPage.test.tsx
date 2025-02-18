import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { MemoryRouter } from 'react-router-dom';
import CartPage from './index';
import { vi } from 'vitest';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { setCharacter } from '../../store/slice/characterSlice';

// Мокаем react-router
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

// Мокаем react-redux
vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useSelector: vi.fn(),
  };
});

// Мокаем characterSlice
vi.mock('../../store/slice/characterSlice', async () => {
  const actual = await vi.importActual('../../store/slice/characterSlice');
  return {
    ...actual,
    fetchItem: vi.fn(),
    setCharacter: vi.fn(),
  };
});

describe('CartPage', () => {
  const initialState = {
    character: {
      response: {
        data: {
          attributes: {
            name: 'Harry Potter',
            image: 'http://example.com/harry.jpg',
            species: 'Human',
            gender: 'Male',
            nationality: 'British',
            hair_color: 'Black',
            eye_color: 'Green',
            skin_color: 'Fair',
            wiki: 'http://example.com/wiki/harry',
          },
        },
      },
      status: 'success',
    },
  };

  const mockStore = createStore(() => initialState);

  beforeEach(() => {
    vi.clearAllMocks();
    // Замокируем useSelector
    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector(mockStore.getState())
    );
    // Замокируем useParams
    (useParams as jest.Mock).mockReturnValue({ id: '1' });
  });

  it('должен отображать загрузку при статусе "loading"', () => {
    // Обновляем состояние на "loading"
    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        character: {
          response: {},
          status: 'loading',
        },
      })
    );

    render(
      <Provider store={mockStore}>
        <MemoryRouter initialEntries={['/cart/1']}>
          <CartPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('loading')).toBeInTheDocument();
    expect(screen.getByText(/Loading.../)).toBeInTheDocument();
  });

  // it('должен отображать информацию о персонаже при успешной загрузке', () => {
  //   render(
  //     <Provider store={mockStore}>
  //       <MemoryRouter initialEntries={['/cart/1']}>
  //         <CartPage />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   expect(screen.getByRole('button', { name: /Close/i })).toBeInTheDocument();
  //   expect(screen.getByText('Harry Potter')).toBeInTheDocument();
  //   expect(screen.getByText(/Species: Human/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Gender: Male/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Nationality: British/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Hair color: Black/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Eye color: Green/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Skin color: Fair/i)).toBeInTheDocument();
  //   expect(screen.getByRole('link', { name: /Wiki/i })).toHaveAttribute(
  //     'href',
  //     'http://example.com/wiki/harry'
  //   );
  // });

  // it('должен вызывать setCharacter при нажатии на кнопку Close', () => {
  //   render(
  //     <Provider store={mockStore}>
  //       <MemoryRouter initialEntries={['/cart/1']}>
  //         <CartPage />
  //       </MemoryRouter>
  //     </Provider>
  //   );

  //   fireEvent.click(screen.getByRole('button', { name: /Close/i }));

  //   expect(vi.mocked(setCharacter).mock.calls.length).toBe(1);
  //   expect(setCharacter).toHaveBeenCalledWith('');
  // });
});

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { configureStore } from '@reduxjs/toolkit';
import userEvent from '@testing-library/user-event';
import CartPage from '.';
import characterReducer, { fetchItem } from '../../store/slice/characterSlice';
import { AppStoreType, RootStateType, store } from '../../store/store';
import searchParams from '../../store/slice/serchParamsSlice';
import queryParams from '../../store/slice/queryParamsSlice';
import favorits from '../../store/slice/favoritsSlice';
import character from '../../store/slice/characterSlice';
import characters from '../../store/slice/chractersSlice';
import HomePage from '../HomePage';
import ThemeContextProvider from '../../context/ThemeContext';
import { ToastProvider } from '../../components/ToastContext';
import { mockFakeCharacterResponse, mockFakeResponse } from '../../mock/mock';

const mockAxiosAPI = new MockAdapter(axios);

const renderWithProviders = (store: AppStoreType, route: string) => {
  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/" element={<HomePage />}>
            <Route path="character/:id" element={<CartPage />} />
          </Route>{' '}
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};

// let store: AppStoreType;
describe('CartPage tests', () => {
  // const preloadedState: RootStateType = {
  //   favorits: { favorits: ['1'] }, // массив строк (или что у вас в `favorits`)
  //   queryParams: {
  //     search: '',
  //     page: '1',
  //     limit: '',
  //     isLoading: false,
  //     error: '',
  //   },
  //   searchParams: {
  //     searchParams: '',
  //     isLoading: false,
  //     error: '',
  //   },
  //   characters: {
  //     response: {
  //       data: [], // здесь важно соответствие типу данных
  //       meta: {
  //         pagination: { current: 1, records: 0 },
  //         copyright: '',
  //         generated_at: '',
  //       },
  //       links: {
  //         self: '',
  //       },
  //     },
  //     status: 'success',
  //     // error: null,
  //   },
  //   character: {
  //     response: {
  //       data: {
  //         id: '',
  //         type: '',
  //         attributes: {
  //           slug: '',
  //           alias_names: [],
  //           animagus: null,
  //           blood_status: null,
  //           boggart: null,
  //           born: null,
  //           died: null,
  //           eye_color: null,
  //           family_members: [],
  //           gender: null,
  //           hair_color: null,
  //           height: null,
  //           house: null,
  //           image: null,
  //           jobs: [],
  //           marital_status: null,
  //           name: '',
  //           nationality: null,
  //           patronus: null,
  //           romances: [],
  //           skin_color: null,
  //           species: null,
  //           titles: [],
  //           wands: [],
  //           weight: null,
  //           wiki: null,
  //         },
  //         links: {
  //           self: '',
  //         },
  //       },
  //       meta: {
  //         pagination: {
  //           current: 1,
  //           records: 0,
  //         },
  //         copyright: 'some copyright',
  //         generated_at: '2025-02-18',
  //       },
  //       links: {
  //         self: '',
  //         current: '',
  //         first: '',
  //         last: '',
  //         next: '',
  //         prev: '',
  //       },
  //     },
  //     status: 'loading',
  //     error: null,
  //   },
  // };

  beforeEach(() => {
    mockAxiosAPI.reset();
    // store = configureStore({
    //   reducer: {
    //     searchParams: searchParams,
    //     queryParams: queryParams,
    //     // isLoading: isLoading,
    //     favorits: favorits,
    //     character: character,
    //     characters: characters,
    //   },
    //   preloadedState,
    // });
  });
  it('CartPage should be defined', () => {
    expect(CartPage).toBeDefined();
  });
  it('CartPage should render', () => {
    render(
      <Provider store={store}>
        <ThemeContextProvider>
          <ToastProvider>
            <MemoryRouter initialEntries={['/character/1']}>
              <CartPage />
            </MemoryRouter>
          </ToastProvider>
        </ThemeContextProvider>
      </Provider>
    );
    const cartPage = screen.getByTestId('cart-page');
    expect(cartPage).toBeInTheDocument();
  });

  it('should show loading state', () => {
    mockAxiosAPI
      .onGet('/characters/b832f9ed-fe71-46f5-a9e1-b947a49161e2')
      .reply(200, mockFakeCharacterResponse);
    render(
      <Provider store={store}>
        <ThemeContextProvider>
          <ToastProvider>
            <MemoryRouter
              initialEntries={[
                '/character/b832f9ed-fe71-46f5-a9e1-b947a49161e2',
              ]}
            >
              <CartPage />
            </MemoryRouter>
          </ToastProvider>
        </ThemeContextProvider>
      </Provider>
    );

    const loadingText = screen.getByText('Loading...');
    expect(loadingText).toBeInTheDocument();
  });

  // it('should show error state', async () => {
  //   mockAxiosAPI
  //     .onGet('/characters/b832f9ed-fe71-46f5-a9e1-b947a49161e2')
  //     .reply(500); // Мок ответа с ошибкой 500

  //   render(
  //     <Provider store={store}>
  //       <ThemeContextProvider>
  //         <ToastProvider>
  //           <MemoryRouter
  //             initialEntries={[
  //               '/characters/b832f9ed-fe71-46f5-a9e1-b947a49161e2',
  //             ]}
  //           >
  //             <CartPage />
  //           </MemoryRouter>
  //         </ToastProvider>
  //       </ThemeContextProvider>
  //     </Provider>
  //   );

  //   // Ждем, пока состояние изменится на 'error'
  //   await waitFor(() => {
  //     const errorText = screen.getByText(
  //       'Some error occurred. Please try again.'
  //     );
  //     expect(errorText).toBeInTheDocument();
  //   });
  // });

  // it('should render CartPage', () => {
  //   renderWithProviders(store, 'characters/1');
  //   expect(screen.getByTestId('cart-page')).toBeInTheDocument();
  // });

  // it('should show loading state', async () => {
  //   store.dispatch(fetchItem.pending('', { id: '1' }));
  //   renderWithProviders(store, '/cart/1');
  //   expect(screen.getByRole('loading')).toBeInTheDocument();
  // });

  // it('should show error state', async () => {
  //   store = configureStore({
  //     reducer: { character: characterReducer },
  //     preloadedState: {
  //       character: {
  //         response: {},
  //         status: 'error',
  //         error: 'Some error occurred',
  //       },
  //     } as RootStateType,
  //   });
  //   renderWithProviders(store, '/cart/1');

  //   await waitFor(() => {
  //     expect(
  //       screen.getByText('Some error occurred. Please try again.')
  //     ).toBeInTheDocument();
  //   });
  // });

  // it('should display character details', async () => {
  //   store = configureStore({
  //     reducer: { character: characterReducer },
  //     preloadedState: {
  //       character: {
  //         response: {
  //           data: {
  //             attributes: {
  //               name: 'Harry Potter',
  //               species: 'Human',
  //               gender: 'Male',
  //               nationality: 'British',
  //               hair_color: 'Black',
  //               eye_color: 'Green',
  //               skin_color: 'Fair',
  //               image: 'https://image.url',
  //               wiki: 'https://harrypotter.wiki',
  //             },
  //           },
  //         },
  //         status: 'success',
  //         error: null,
  //       },
  //     } as RootStateType,
  //   });

  //   renderWithProviders(store, '/cart/1');

  //   await waitFor(() => {
  //     expect(screen.getByText('Harry Potter')).toBeInTheDocument();
  //     expect(screen.getByText('Species: Human')).toBeInTheDocument();
  //     expect(screen.getByText('Gender: Male')).toBeInTheDocument();
  //     expect(screen.getByText('Nationality: British')).toBeInTheDocument();
  //     expect(screen.getByText('Hair color: Black')).toBeInTheDocument();
  //     expect(screen.getByText('Eye color: Green')).toBeInTheDocument();
  //     expect(screen.getByText('Skin color: Fair')).toBeInTheDocument();
  //     expect(screen.getByRole('img', { name: 'Character image' })).toHaveAttribute(
  //       'src',
  //       'https://image.url'
  //     );
  //     expect(screen.getByRole('link', { name: 'Wiki' })).toHaveAttribute(
  //       'href',
  //       'https://harrypotter.wiki'
  //     );
  //   });
  // });

  // it('should close character details on button click', async () => {
  //   store = configureStore({
  //     reducer: { character: characterReducer },
  //     preloadedState: {
  //       character: {
  //         response: {
  //           data: {
  //             attributes: {
  //               name: 'Harry Potter',
  //             },
  //           },
  //         },
  //         status: 'success',
  //         error: null,
  //       },
  //     } as RootStateType,
  //   });

  //   renderWithProviders(store, '/cart/1');

  //   const closeButton = screen.getByRole('button', { name: 'Close' });
  //   await userEvent.click(closeButton);

  //   await waitFor(() => {
  //     expect(store.getState().character.response).toEqual('');
  //   });
  // });
});

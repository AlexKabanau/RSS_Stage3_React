import React, { StrictMode } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import {
  BrowserRouter,
  MemoryRouter,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom';
// import { setupApiStore } from '../../utils/testUtils'; // Вспомогательная утилита для мокирования API
import { api } from '../../api/redux.api';
import CartPage from '.';
import characterReducer, {
  setCharacter,
} from '../../store/slice/characterSlice';
import ThemeContextProvider from '../../context/ThemeContext';
import { ToastProvider } from '../../components/ToastContext';
import { mockFakeCharacterResponse, mockInitialState } from '../../mock/mock';
import userEvent from '@testing-library/user-event';
import { setupApiStore } from '../../api/setupApiStore';
import { configureStore } from '@reduxjs/toolkit';
import searchParams from '../../store/slice/serchParamsSlice';
import queryParams from '../../store/slice/queryParamsSlice';
import favorits from '../../store/slice/favoritsSlice';
import { RootStateType } from '../../store/store';
import ErrorBoundary from '../../components/ErrorBoundary';
import HomePage from '../HomePage';
import NotFoundPager from '../NotFoundPager';
const store = setupApiStore();

describe('CartPage tests with RTK Query', () => {
  beforeEach(() => {
    store.dispatch(setCharacter(null));
    console.log('Initial store state:', store.getState());
  });

  // it('CartPage should be defined', () => {
  //   expect(CartPage).toBeDefined();
  // });

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
    expect(screen.getByTestId('cart-page')).toBeInTheDocument();
  });
  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    render(
      <Provider store={store}>
        <StrictMode>
          <ErrorBoundary>
            <ThemeContextProvider>
              <ToastProvider>
                <MemoryRouter
                  initialEntries={[
                    '/character/8b7e8ccb-f2ef-42b0-a4cd-fb3c2572e619',
                  ]}
                >
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="character/:id" element={<CartPage />} />
                    <Route path="*" element={<NotFoundPager />} />
                  </Routes>
                </MemoryRouter>
              </ToastProvider>
            </ThemeContextProvider>
          </ErrorBoundary>
        </StrictMode>
      </Provider>
    );

    // Check if the cart page is rendered
    expect(screen.getByTestId('cart-page')).toBeInTheDocument();

    // Additional assertions can be added here to verify detailed card data
  });

  it('should show loading state', async () => {
    render(
      <Provider store={store}>
        <StrictMode>
          <ErrorBoundary>
            <ThemeContextProvider>
              <ToastProvider>
                <MemoryRouter
                  initialEntries={[
                    '/character/8b7e8ccb-f2ef-42b0-a4cd-fb3c2572e619',
                  ]}
                >
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="character/:id" element={<CartPage />} />
                    <Route path="*" element={<NotFoundPager />} />
                  </Routes>
                </MemoryRouter>
              </ToastProvider>
            </ThemeContextProvider>
          </ErrorBoundary>
        </StrictMode>
      </Provider>
    );

    // Check if the cart page is rendered
    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    // Additional assertions can be added here to verify detailed card data
  });
  it('should show error state', async () => {
    render(
      <Provider store={store}>
        <StrictMode>
          <ErrorBoundary>
            <ThemeContextProvider>
              <ToastProvider>
                <MemoryRouter initialEntries={['/character/xxx']}>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="character/:id" element={<CartPage />} />
                  </Routes>
                </MemoryRouter>
              </ToastProvider>
            </ThemeContextProvider>
          </ErrorBoundary>
        </StrictMode>
      </Provider>
    );

    // Check if the cart page is rendered
    await waitFor(() => {
      expect(
        screen.getByText('Произошла ошибка. Пожалуйста, попробуйте снова.')
      ).toBeInTheDocument();
    });

    // Additional assertions can be added here to verify detailed card data
  });
  it('should display character details', async () => {
    render(
      <Provider store={store}>
        <StrictMode>
          <ErrorBoundary>
            <ThemeContextProvider>
              <ToastProvider>
                <MemoryRouter
                  initialEntries={[
                    '/character/1d9f49ca-44ec-4aed-bbe2-72713710d3c0',
                  ]}
                >
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="character/:id" element={<CartPage />} />
                  </Routes>
                </MemoryRouter>
              </ToastProvider>
            </ThemeContextProvider>
          </ErrorBoundary>
        </StrictMode>
      </Provider>
    );

    // Check if the cart page is rendered
    await waitFor(() => {
      expect(screen.getByText('2-Headed Baby')).toBeInTheDocument();
    });

    // Additional assertions can be added here to verify detailed card data
  });

  //

  // it('should display character details', async () => {
  //   store.dispatch(
  //     api.util.upsertQueryData('getCharacter', '1', {
  //       data: mockFakeCharacterResponse,
  //     })
  //   );

  //   render(
  //     <Provider store={store}>
  //       <ThemeContextProvider>
  //         <ToastProvider>
  //           <MemoryRouter initialEntries={['/character/1']}>
  //             <CartPage />
  //           </MemoryRouter>
  //         </ToastProvider>
  //       </ThemeContextProvider>
  //     </Provider>
  //   );

  //   await waitFor(() => {
  //     expect(
  //       screen.getByText(mockFakeCharacterResponse.data.attributes.name)
  //     ).toBeInTheDocument();
  //   });
  // });

  // it('should close character details on button click', async () => {
  //   store.dispatch(
  //     api.util.upsertQueryData('getCharacter', '1', {
  //       data: mockFakeCharacterResponse,
  //     })
  //   );

  //   render(
  //     <Provider store={store}>
  //       <ThemeContextProvider>
  //         <ToastProvider>
  //           <MemoryRouter initialEntries={['/character/1']}>
  //             <CartPage />
  //           </MemoryRouter>
  //         </ToastProvider>
  //       </ThemeContextProvider>
  //     </Provider>
  //   );

  //   const closeButton = screen.getByRole('button', { name: 'Закрыть' });
  //   await userEvent.click(closeButton);

  //   await waitFor(() => {
  //     expect(store.getState().character.response).toBeNull();
  //   });
  // });
});

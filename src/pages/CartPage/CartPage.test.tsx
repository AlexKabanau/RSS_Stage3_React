import { StrictMode } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CartPage from '.';
import { setCharacter } from '../../store/slice/characterSlice';
import ThemeContextProvider from '../../context/ThemeContext';
import { ToastProvider } from '../../components/ToastContext';
import { setupApiStore } from '../../api/setupApiStore';

import ErrorBoundary from '../../components/ErrorBoundary';
import HomePage from '../HomePage';
import NotFoundPager from '../NotFoundPager';
const store = setupApiStore();

describe('CartPage tests with RTK Query', () => {
  beforeEach(() => {
    store.dispatch(setCharacter(null));
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

    expect(screen.getByTestId('cart-page')).toBeInTheDocument();
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

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
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

    await waitFor(() => {
      expect(
        screen.getByText('Произошла ошибка. Пожалуйста, попробуйте снова.')
      ).toBeInTheDocument();
    });
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

    await waitFor(() => {
      expect(screen.getByText('2-Headed Baby')).toBeInTheDocument();
    });
  });
});

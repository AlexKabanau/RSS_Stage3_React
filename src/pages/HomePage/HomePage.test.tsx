import { StrictMode } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { Provider } from 'react-redux';
import ThemeContextProvider from '../../context/ThemeContext';
import { ToastProvider } from '../../components/ToastContext';
import { store } from '../../store/store';
import HomePage from '.';
import ErrorBoundary from '../../components/ErrorBoundary';

const mockAxiosAPI = new MockAdapter(axios);

describe('HomePage tests', () => {
  beforeEach(() => {
    mockAxiosAPI.reset();
  });

  it('HomePage should be defined', () => {
    expect(HomePage).toBeDefined();
  });

  it('HomePage should render', () => {
    render(
      <Provider store={store}>
        <ThemeContextProvider>
          <ToastProvider>
            <MemoryRouter initialEntries={['/']}>
              <HomePage />
            </MemoryRouter>
          </ToastProvider>
        </ThemeContextProvider>
      </Provider>
    );
    const mainPage = screen.getByRole('mainPage');
    expect(mainPage).toBeInTheDocument();
  });

  it('should show loading state', async () => {
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

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });
  });
});

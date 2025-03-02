import ErrorBoundary from '@/components/ErrorBoundary';
import { ToastProvider } from '@/components/ToastContext';
import ThemeContextProvider from '@/context/ThemeContext';
import { store } from '@/store/store';
import '@/styles/index.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <ThemeContextProvider>
        <ToastProvider>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </ToastProvider>
      </ThemeContextProvider>
    </ErrorBoundary>
  );
}

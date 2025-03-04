'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import ErrorBoundary from '@/components/ErrorBoundary';
import ThemeContextProvider from '@/context/ThemeContext';
import { ToastProvider } from '@/components/ToastContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ThemeContextProvider>
        <ToastProvider>
          <Provider store={store}>{children}</Provider>;
        </ToastProvider>
      </ThemeContextProvider>
    </ErrorBoundary>
  );
}

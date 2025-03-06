'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';
import ThemeContextProvider from '@/context/ThemeContext';
import { ToastProvider } from '@/components/ToastContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContextProvider>
      <ToastProvider>
        <Provider store={store}>{children}</Provider>
      </ToastProvider>
    </ThemeContextProvider>
  );
}

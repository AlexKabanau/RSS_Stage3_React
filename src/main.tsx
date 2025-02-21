import './index.css';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import ThemeContextProvider from './context/ThemeContext.tsx';

import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { store } from './store/store.ts';
import { ToastProvider } from './components/ToastContext.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={store}>
      <StrictMode>
        <ErrorBoundary>
          <ThemeContextProvider>
            <ToastProvider>
              <App />
            </ToastProvider>
          </ThemeContextProvider>
        </ErrorBoundary>
      </StrictMode>
    </Provider>
  );
} else {
  console.error('Root element not found');
}

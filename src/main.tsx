// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import ThemeContextProvider from './context/ThemeContext.tsx';

import React, { StrictMode } from 'react';
// import { useAppDispatch, useAppSelector } from './hooks/redux.ts';
// import ErrorBoundary from './components/ErrorBoundary.tsx';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { store } from './store/store.ts';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={store}>
      <StrictMode>
        <ErrorBoundary>
          <ThemeContextProvider>
            <App />
          </ThemeContextProvider>
        </ErrorBoundary>
      </StrictMode>
    </Provider>
  );
} else {
  console.error('Root element not found');
}

import './styles/index.css';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Router';
import { store } from './store/store';
import ErrorBoundary from './components/ErrorBoundary';
import ThemeContextProvider from './context/ThemeContext';
import { ToastProvider } from './components/ToastContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <React.StrictMode>
      <ErrorBoundary>
        <ThemeContextProvider>
          <ToastProvider>
            <App />
          </ToastProvider>
        </ThemeContextProvider>
      </ErrorBoundary>
    </React.StrictMode>
  </Provider>
);

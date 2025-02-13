import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import ThemeContextProvider from './context/ThemeContext.tsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </ErrorBoundary>
    </StrictMode>
  );
} else {
  console.error('Root element not found');
}

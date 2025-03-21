import './index.css';
import App from './App.tsx';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { store } from './redux/store.ts';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <Provider store={store}>
      <StrictMode>
        <App />
      </StrictMode>
    </Provider>
  );
} else {
  console.error('Root element not found');
}

import { ToastProvider } from '@/components/ToastContext';
import { store } from '@/store/store';
import '@/styles/index.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {/* <Router> */}
      <ToastProvider>
        <Component {...pageProps} />;
      </ToastProvider>
      {/* </Router> */}
    </Provider>
  );
}

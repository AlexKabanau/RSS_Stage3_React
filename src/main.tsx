// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App.tsx';
// import ErrorBoundary from './components/ErrorBoundary.tsx';
// import ThemeContextProvider from './context/ThemeContext.tsx';

import React, { StrictMode } from 'react';
import { useAppDispatch, useAppSelector } from './hooks/redux.ts';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import { setupStore } from './store/store.ts';
import { userSlice } from './store/slice/userSlice.ts';

const store = setupStore();
const { increment } = userSlice.actions;

const App: React.FC = () => {
  const { count } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  return (
    <React.StrictMode>
      <ErrorBoundary>
        <h1>{count}</h1>
        <button onClick={() => dispatch(increment(10))}></button>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

// ReactDOM.createRoot(document.getElementById('root')!).render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <App />
        </Provider>
        {/* <ThemeContextProvider> */}
        {/* </ThemeContextProvider> */}
      </ErrorBoundary>
    </StrictMode>
  );
} else {
  console.error('Root element not found');
}

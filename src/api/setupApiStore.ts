import { configureStore } from '@reduxjs/toolkit';
import { api } from '../store/api/characterApi';
// import characterReducer from '../store/slice/characterSlice';

export function setupApiStore() {
  const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      // character: characterReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });

  return store;
}

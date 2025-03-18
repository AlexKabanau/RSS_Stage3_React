import { configureStore } from '@reduxjs/toolkit';
// import favorits from './slice/favoritsSlice';
import filter from './slices/filterSlice';
import pizzas from './slices/pizzasSlice';

import { useDispatch } from 'react-redux';
import { countriesApi } from './redux.api';
// import { api } from '../api/redux.api';

export const store = configureStore({
  reducer: {
    filter: filter,
    pizzas: pizzas,
    // favorits: favorits,
    [countriesApi.reducerPath]: countriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countriesApi.middleware),
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppStoreType = typeof store;
export type AppDispatchType = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatchType>();

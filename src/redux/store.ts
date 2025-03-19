import { configureStore } from '@reduxjs/toolkit';
// import favorits from './slice/favoritsSlice';
import filter from './slices/filterSlice';
import countries from './slices/countriesSlice';
import visited from './slices/visitedSlice';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { countriesApi } from './redux.api';
// import { api } from '../api/redux.api';

export const store = configureStore({
  reducer: {
    filter: filter,
    countries: countries,
    visited: visited,
    [countriesApi.reducerPath]: countriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countriesApi.middleware),
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware().concat(countriesApi.middleware),
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppStoreType = typeof store;
export type AppDispatchType = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

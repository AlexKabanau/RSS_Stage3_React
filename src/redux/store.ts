import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filterSlice';
import visited from './slices/visitedSlice';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { countriesApi } from './redux.api';

export const store = configureStore({
  reducer: {
    filter: filter,
    visited: visited,
    [countriesApi.reducerPath]: countriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(countriesApi.middleware),
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppStoreType = typeof store;
export type AppDispatchType = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

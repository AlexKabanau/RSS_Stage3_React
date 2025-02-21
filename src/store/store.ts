import { configureStore } from '@reduxjs/toolkit';
import searchParams from './slice/serchParamsSlice';
import queryParams from './slice/queryParamsSlice';
import favorits from './slice/favoritsSlice';

import { useDispatch } from 'react-redux';
import { api } from '../api/redux.api';

export const store = configureStore({
  reducer: {
    searchParams: searchParams,
    queryParams: queryParams,
    favorits: favorits,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppStoreType = typeof store;
export type AppDispatchType = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatchType>();

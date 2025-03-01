import { configureStore } from '@reduxjs/toolkit';
import searchParams from './slice/serchParamsSlice';
import queryParams from './reducers/queryParams';
import isLoading from './reducers/isLoading';
import favorites from './reducers/favorites';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { reduxApi } from './api/characterApi';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
// import { api } from './api/characterApi';

export const store = configureStore({
  reducer: {
    // searchParams: searchParams,
    queryParams: queryParams,
    isLoading: isLoading,
    favorites: favorites,
    [reduxApi.reducerPath]: reduxApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(reduxApi.middleware),
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppStoreType = typeof store;
export type AppDispatchType = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

const makeStore: MakeStore<AppStoreType> = () => store;
export const wrapper = createWrapper<AppStoreType>(makeStore, { debug: true });

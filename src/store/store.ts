import { configureStore } from '@reduxjs/toolkit';
import favorites from './reducers/favorites';

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    favorites: favorites,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppStoreType = typeof store;
export type AppDispatchType = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<RootStateType> = useSelector;

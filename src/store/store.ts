import { configureStore } from '@reduxjs/toolkit';
import searchParams from './slice/serchParamsSlice';
// import { reduxApi } from '../api/redux.api';
import queryParams from './slice/queryParamsSlice';
import isLoading from './slice/isLoadingSlice';
import favorits from './slice/favoritsSlice';

import { useDispatch } from 'react-redux';
import character from './slice/characterSlice';
import characters from './slice/chractersSlice';

// const rootReducer = combineReducers({
//   searchParamsReducer,
//   [reduxApi.reducerPath]: reduxApi.reducer,
//   queryParamsReducer,
//   isLoadingReducer,
// });

export const store = configureStore({
  reducer: {
    searchParams: searchParams,
    queryParams: queryParams,
    isLoading: isLoading,
    favorits: favorits,
    character: character,
    characters: characters,
  },

  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(reduxApi.middleware),
});

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(reduxApi.middleware),
// });

// type RootReduserType = typeof rootReducer;
// export type AppStateType = ReturnType<RootReduserType>;

export type RootStateType = ReturnType<typeof store.getState>;
export type AppStoreType = typeof store;
export type AppDispatchType = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatchType>();

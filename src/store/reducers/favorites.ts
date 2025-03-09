import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseType } from '../../api/getItems';

type InintialStateType = {
  favorites: ResponseType[];
};
const initialState: InintialStateType = {
  favorites: [],
};
export const favoritsSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<ResponseType[]>) => {
      state.favorites = action.payload;
    },
    clearFavorits: (state) => {
      state.favorites.length = 0;
    },
  },
});

export const { setFavorites, clearFavorits } = favoritsSlice.actions;

export default favoritsSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResponseType } from '../../api/getItems';

type InintialStateType = {
  favorits: ResponseType[];
};
const initialState: InintialStateType = {
  favorits: [],
};
export const favoritsSlice = createSlice({
  name: 'favorits',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<ResponseType[]>) => {
      state.favorits = action.payload;
    },
    clearFavorits: (state) => {
      state.favorits.length = 0;
    },
  },
});

export const { setFavorites, clearFavorits } = favoritsSlice.actions;

export default favoritsSlice.reducer;

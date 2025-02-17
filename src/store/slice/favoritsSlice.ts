import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InintialStateType = {
  favorits: string[];
};
const initialState: InintialStateType = {
  favorits: [],
};
export const favoritsSlice = createSlice({
  name: 'favorits',
  initialState,
  reducers: {
    setFavorites: (state, action: PayloadAction<string[]>) => {
      state.favorits = action.payload;
    },
  },
});

export const { setFavorites } = favoritsSlice.actions;

export default favoritsSlice.reducer;

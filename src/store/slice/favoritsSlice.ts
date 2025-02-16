import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorist: {
    characters: [],
  },
};
export const favoritsSlice = createSlice({
  name: 'favorits',
  initialState,
  reducers: {
    setFavorits: (state, action) => {
      state.favorist = action.payload;
    },
  },
});

export const { setFavorits } = favoritsSlice.actions;

export default favoritsSlice.reducer;

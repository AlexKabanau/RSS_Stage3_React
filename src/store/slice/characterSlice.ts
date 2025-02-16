import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  characters: [],
};
export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setChracters: (state, action) => {
      state.characters = action.payload;
    },
  },
});

export const { setChracters } = characterSlice.actions;

export default characterSlice.reducer;

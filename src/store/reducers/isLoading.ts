import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  isCharacterLoading: false,
  isMainPageCharactersLoading: false,
};

export const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState,
  reducers: {
    setCharacterLoading(state, action: PayloadAction<boolean>) {
      state.isCharacterLoading = action.payload;
    },
    setMainPageCharactersLoading(state, action: PayloadAction<boolean>) {
      state.isMainPageCharactersLoading = action.payload;
    },
  },
});

export default isLoadingSlice.reducer;

export const { setCharacterLoading, setMainPageCharactersLoading } =
  isLoadingSlice.actions;

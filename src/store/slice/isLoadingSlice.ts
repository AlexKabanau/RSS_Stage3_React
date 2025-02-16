import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCharacterLoading: false,
  isDataLoading: false,
};

export const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState,
  reducers: {
    setIsCharacterLoading: (state, action: { payload: boolean }) => {
      state.isCharacterLoading = action.payload;
    },
    setIsDataLoading: (state, action: { payload: boolean }) => {
      state.isDataLoading = action.payload;
    },
  },
});

export const { setIsCharacterLoading, setIsDataLoading } =
  isLoadingSlice.actions;

export default isLoadingSlice.reducer;

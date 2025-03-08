import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SearchParamsType = {
  searchParams: string;
  isLoading: boolean;
  error: string;
};

const initialState: SearchParamsType = {
  searchParams:
    typeof window !== 'undefined'
      ? localStorage.getItem('inputValue') || ''
      : '',

  // searchParams: localStorage.getItem('inputValue') || '',
  isLoading: false,
  error: '',
};

export const searchParamsSlice = createSlice({
  name: 'searchParams',
  initialState,
  reducers: {
    setSearchParamsToState: (state, action: PayloadAction<string>) => {
      state.searchParams = action.payload;
    },
  },
});

export const { setSearchParamsToState } = searchParamsSlice.actions;
export default searchParamsSlice.reducer;

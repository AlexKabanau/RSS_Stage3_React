import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DEFAULT_PAGE, RESOURCES_PER_PAGE } from '../../constants/constants';

type queryParamsStateType = {
  search: string;
  limit: string;
  page: string;
  isLoading: boolean;
  error: string;
};

const initialState: queryParamsStateType = {
  limit: RESOURCES_PER_PAGE.toString(),
  page: DEFAULT_PAGE.toString(),
  isLoading: false,
  error: '',
  search:
    typeof window !== 'undefined'
      ? localStorage.getItem('inputValue') || ''
      : '',
};

export const queryParamsSlice = createSlice({
  name: 'queryParams',
  initialState,
  reducers: {
    setLimit(state, action: { payload: string }) {
      state.limit = action.payload;
    },
    setPage(state, action: { payload: string }) {
      state.page = action.payload;
    },
    setQueryParamsToState(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
});

export default queryParamsSlice.reducer;
export const { setLimit, setPage, setQueryParamsToState } =
  queryParamsSlice.actions;

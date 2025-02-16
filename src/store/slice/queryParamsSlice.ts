import { createSlice } from '@reduxjs/toolkit';
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
  search: '',
};

export const queryParamsSlice = createSlice({
  name: 'queryParams',
  initialState,
  reducers: {
    setLimit: (state, action: { payload: string }) => {
      state.limit = action.payload;
    },
    setPage: (state, action: { payload: string }) => {
      state.page = action.payload;
    },
    setQueryParamsToState: (
      state,
      action: { payload: { page: string; search: string } }
    ) => {
      state.page = action.payload.page;
      state.search = action.payload.search;
    },
  },
});

export default queryParamsSlice.reducer;
export const { setLimit, setPage, setQueryParamsToState } =
  queryParamsSlice.actions;

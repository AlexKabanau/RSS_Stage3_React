import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ResponseInfoType } from '../../api/getItems';
import axios from 'axios';
import { RESOURCES_PER_PAGE, URL } from '../../constants/constants';

export const fetchItems = createAsyncThunk<
  ResponseInfoType,
  { searchParams: string; page: number }
>(
  'characters/fetchCharacters',
  async (params: { searchParams: string; page: number }) => {
    const { searchParams, page } = params;
    const response = await axios.get<ResponseInfoType>(
      `${URL.baseUrl}${URL.props}${URL.ammount}${RESOURCES_PER_PAGE}${URL.currentPage}${page}${URL.search}${searchParams}`
    );
    return response.data;
  }
);

type initialStateType = {
  response: ResponseInfoType;
  status: 'loading' | 'success' | 'error';
};

const initialState: initialStateType = {
  response: {
    data: [],
    meta: {
      copyright: '',
      generated_at: '',
    },
    links: {
      self: '',
    },
  },
  status: 'loading',
};

export const chractersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setChracters: (state, action) => {
      state.response = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItems.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchItems.fulfilled, (state, action) => {
      state.status = 'success';
      state.response = action.payload;
    });
    builder.addCase(fetchItems.rejected, (state) => {
      state.status = 'error';
    });
  },
});

export default chractersSlice.reducer;

export const { setChracters } = chractersSlice.actions;

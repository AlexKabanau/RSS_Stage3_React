import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetCharacterType } from '../../api/getItems';
import axios from 'axios';
import { URL } from '../../constants/constants';
type initialStateType = {
  response: GetCharacterType;
  status: 'loading' | 'success' | 'error';
  error: string | null;
};

const initialState: initialStateType = {
  response: {
    data: {
      id: '',
      type: '',
      attributes: {
        slug: '',
        alias_names: [],
        animagus: null,
        blood_status: null,
        boggart: null,
        born: null,
        died: null,
        eye_color: null,
        family_members: [],
        gender: null,
        hair_color: null,
        height: null,
        house: null,
        image: null,
        jobs: [],
        marital_status: null,
        name: '',
        nationality: null,
        patronus: null,
        romances: [],
        skin_color: null,
        species: null,
        titles: [],
        wands: [],
        weight: null,
        wiki: null,
      },
      links: {
        self: '',
      },
    },
    meta: {
      pagination: undefined,
      copyright: '',
      generated_at: '',
    },
    links: {
      self: '',
      current: undefined,
      next: undefined,
      last: undefined,
      first: undefined,
      prev: undefined,
    },
  },
  status: 'loading',
  error: null, // Изначально нет ошибки
};
export const fetchItem = createAsyncThunk<GetCharacterType, { id: string }>(
  'character/fetchCharacter',
  async (params: { id: string }) => {
    const { id } = params;
    const response = await axios.get<GetCharacterType>(
      `${URL.baseUrl}${URL.props}/${id}`
    );
    return response.data;
  }
);

export const chracterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setChracter: (state, action) => {
      state.response = action.payload;
    },
    delChracter: (state) => {
      state.response = initialState.response;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItem.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchItem.fulfilled, (state, action) => {
      state.status = 'success';
      state.response = action.payload;
    });
    builder.addCase(fetchItem.rejected, (state, action) => {
      state.status = 'error';
      state.error = action.error.message || 'Unknown error';
    });
  },
});

export default chracterSlice.reducer;

export const { setChracter, delChracter } = chracterSlice.actions;

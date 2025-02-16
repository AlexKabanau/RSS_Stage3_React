import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetCharacterType } from '../../api/getItems';
import axios from 'axios';
import { URL } from '../../constants/constants';
type initialStateType = {
  response: GetCharacterType;
  status: 'loading' | 'success' | 'error';
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchItem.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchItem.fulfilled, (state, action) => {
      state.status = 'success';
      state.response = action.payload;
    });
    builder.addCase(fetchItem.rejected, (state) => {
      state.status = 'error';
    });
  },
});

export default chracterSlice.reducer;

export const { setChracter } = chracterSlice.actions;

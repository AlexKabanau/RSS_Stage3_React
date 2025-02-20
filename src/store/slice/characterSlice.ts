import { createSlice } from '@reduxjs/toolkit';
import { GetCharacterType } from '../../api/getItems';
type InitialStateType = {
  response: GetCharacterType;
  status: 'loading' | 'success' | 'error';
  error: string | null;
};

const initialState: InitialStateType = {
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
      pagination: { current: 1, records: 0 },
      copyright: 'some copyright',
      generated_at: '2025-02-18',
    },
    links: {
      self: '',
      current: '',
      first: '',
      last: '',
      next: '',
      prev: '',
    },
  },
  status: 'loading',
  error: null,
};

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setCharacter: (state, action) => {
      state.response = action.payload;
    },
    delCharacter: (state) => {
      state.response = initialState.response;
      state.status = 'success';
    },
  },
});

export default characterSlice.reducer;

export const { setCharacter, delCharacter } = characterSlice.actions;

import { createSlice } from '@reduxjs/toolkit';
import { GetCharacterType } from '../../api/getItems';
// import axios from 'axios';
// import { URL } from '../../constants/constants';
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
// export const fetchItem = createAsyncThunk<GetCharacterType, { id: string }>(
//   'character/fetchCharacter',
//   async (params: { id: string }) => {
//     const { id } = params;
//     const response = await axios.get<GetCharacterType>(
//       `${URL.baseUrl}${URL.props}/${id}`
//     );
//     return response.data;
//   }
// );

export const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setCharacter: (state, action) => {
      console.log('Обновление состояния персонажа:', action.payload);
      state.response = action.payload;
    },
    delCharacter: (state) => {
      state.response = initialState.response;
      state.status = 'success';
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(fetchItem.pending, (state) => {
  //     state.status = 'loading';
  //   });
  //   builder.addCase(fetchItem.fulfilled, (state, action) => {
  //     state.status = 'success';
  //     state.response = action.payload;
  //   });
  //   builder.addCase(fetchItem.rejected, (state) => {
  //     state.status = 'error';
  //   });
  // },
});

export default characterSlice.reducer;

export const { setCharacter, delCharacter } = characterSlice.actions;

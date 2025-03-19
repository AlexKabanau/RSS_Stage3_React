import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Name } from './countriesSlice';
import { RootStateType } from '../store';

type InitialStateType = {
  visited: Name[];
};

const initialState: InitialStateType = {
  visited: [],
};

export const visitedSlice = createSlice({
  name: 'visited',
  initialState,
  reducers: {
    setVisited: (state, action: PayloadAction<Name[]>) => {
      state.visited = action.payload;
    },
  },
});

export const { setVisited } = visitedSlice.actions;

export default visitedSlice.reducer;
export const selectVisited = (state: RootStateType) => state.visited;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserType = {
  id: number;
  name: string;
  email: string;
};

type UserStateType = {
  users: UserType[];
  isLoading: boolean;
  error: string;
  count: number;
};

const initialState: UserStateType = {
  users: [],
  isLoading: false,
  count: 0,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment(state, action: PayloadAction<number>) {
      state.count += action.payload;
    },
  },
});

export default userSlice.reducer;

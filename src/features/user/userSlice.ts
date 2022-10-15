import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../app/store';

interface UserDetailState {
  id: string;
  name: string;
  email: string;
  role: number;
  avatar: string | null;
  nameTitle: string;
  createdAt: number;
}

interface UserState {
  user: UserDetailState;
  token: string;
}

const initialState: UserState = {
  user: { id: '', name: '', email: '', role: 2, avatar: '', nameTitle: 'Mr.', createdAt: 0 },
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    createUser(state, action: PayloadAction<UserDetailState>) {
      state.user = action.payload;
    },
    updateUser(state, action: PayloadAction<UserDetailState>) {
      state.user = action.payload;
    },
    createToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { createUser, updateUser, createToken } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export const selectToken = (state: RootState) => state.user.token;

export default userSlice.reducer;

import { login } from '@/shared/lib/features/users/users-thunks';
import { GlobalError, User } from '@/shared/types/user.types';
import { createSlice } from '@reduxjs/toolkit';

interface UsersState {
  user: User | null;
  loginLoading: boolean;
  loginError: GlobalError | null;
}

const initialState: UsersState = {
  user: null,
  loginLoading: false,
  loginError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state, { payload: user }) => {
        state.loginLoading = false;
        state.user = user;
      })
      .addCase(login.rejected, (state, { payload: error }) => {
        state.loginError = error || null;
        state.loginLoading = false;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectLoginLoading: (state) => state.loginLoading,
    selectLoginError: (state) => state.loginError,
  },
});

export const { selectUser, selectLoginLoading, selectLoginError } = usersSlice.selectors;

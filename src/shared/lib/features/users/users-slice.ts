import { fetchOneUser, login, updateUserInfo } from '@/shared/lib/features/users/users-thunks';
import { GlobalError, User } from '@/shared/types/user.types';
import { createSlice } from '@reduxjs/toolkit';

interface UsersState {
  user: User | null;
  currentUser: User | null;
  usersUpdating: boolean;
  usersUpdatingError: GlobalError | null;
  usersFetching: boolean;
  loginLoading: boolean;
  loginError: GlobalError | null;
}

const initialState: UsersState = {
  user: null,
  usersFetching: false,
  usersUpdating: false,
  usersUpdatingError: null,
  currentUser: null,
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

    builder
      .addCase(fetchOneUser.pending, (state) => {
        state.currentUser = null;
        state.usersFetching = true;
      })
      .addCase(fetchOneUser.fulfilled, (state, { payload: user }) => {
        state.usersFetching = false;
        state.currentUser = user;
      })
      .addCase(fetchOneUser.rejected, (state) => {
        state.usersFetching = false;
      });

    builder
      .addCase(updateUserInfo.pending, (state) => {
        state.usersUpdating = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, { payload: user }) => {
        state.usersUpdating = false;
        state.user = user;
      })
      .addCase(updateUserInfo.rejected, (state, { payload }) => {
        state.usersUpdatingError = payload || null;
        state.usersUpdating = false;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectCurrentUser: (state) => state.currentUser,
    selectLoginLoading: (state) => state.loginLoading,
    selectLoginError: (state) => state.loginError,
    selectUpdating: (state) => state.usersUpdating,
  },
});

export const { selectUser, selectCurrentUser, selectLoginLoading, selectLoginError, selectUpdating } =
  usersSlice.selectors;

import { fetchOneUser, login, register, updateUserInfo } from '@/shared/lib/features/users/users-thunks';
import { GlobalError, User, ValidationError } from '@/shared/types/user.types';
import { createSlice } from '@reduxjs/toolkit';

interface UsersState {
  user: User | null;
  currentUser: User | null;
  usersUpdating: boolean;
  usersUpdatingError: GlobalError | null;
  usersFetching: boolean;
  loginLoading: boolean;
  registerLoading: boolean;
  loginError: GlobalError | null;
  registerError: ValidationError | null;
}

const initialState: UsersState = {
  user: null,
  usersFetching: false,
  usersUpdating: false,
  usersUpdatingError: null,
  currentUser: null,
  loginLoading: false,
  registerLoading: false,
  loginError: null,
  registerError: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
    },
  },
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
      .addCase(register.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(register.fulfilled, (state, { payload: user }) => {
        state.registerLoading = false;
        state.user = user;
      })
      .addCase(register.rejected, (state, { payload: error }) => {
        state.registerError = error || null;
        state.registerLoading = false;
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
    selectRegisterLoading: (state) => state.registerLoading,
    selectRegisterError: (state) => state.registerError,
    selectUpdating: (state) => state.usersUpdating,
  },
});

export const {
  selectUser,
  selectLoginLoading,
  selectLoginError,
  selectRegisterLoading,
  selectRegisterError,
  selectCurrentUser,
  selectUpdating,
} = usersSlice.selectors;
export const { unsetUser } = usersSlice.actions;

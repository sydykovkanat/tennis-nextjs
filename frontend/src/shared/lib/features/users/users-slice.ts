import { login, register } from '@/shared/lib/features/users/users-thunks';
import { fetchUsers } from '@/shared/lib/features/users/users-thunks';
import { GlobalError, User, ValidationError } from '@/shared/types/user.types';
import { createSlice } from '@reduxjs/toolkit';

interface UsersState {
  user: User | null;
  loginLoading: boolean;
  registerLoading: boolean;
  loginError: GlobalError | null;
  registerError: ValidationError | null;
  users: User[];
  usersFetching: boolean;
  userPermission: number;
}

const initialState: UsersState = {
  user: null,
  loginLoading: false,
  registerLoading: false,
  loginError: null,
  registerError: null,
  users: [],
  usersFetching: false,
  userPermission: 0,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
      state.userPermission = 0;
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
      .addCase(fetchUsers.pending, (state) => {
        state.usersFetching = true;
      })
      .addCase(fetchUsers.fulfilled, (state, { payload: users }) => {
        state.usersFetching = false;
        state.users = users.data;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.usersFetching = false;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectLoginLoading: (state) => state.loginLoading,
    selectLoginError: (state) => state.loginError,
    selectRegisterLoading: (state) => state.registerLoading,
    selectRegisterError: (state) => state.registerError,
    selectUsersList: (state) => state.users,
    selectUserPermission: (state) => state.userPermission,
  },
});

export const {
  selectUser,
  selectLoginLoading,
  selectLoginError,
  selectRegisterLoading,
  selectRegisterError,
  selectUsersList,
  selectUserPermission,
} = usersSlice.selectors;
export const { unsetUser } = usersSlice.actions;

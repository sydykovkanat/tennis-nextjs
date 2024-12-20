import {
  addUser,
  fetchOneUser,
  fetchUsers,
  forgotPassword,
  getPermissionForUser,
  login,
  register,
  updateCurrentUserInfo,
  updateUserInfo,
} from '@/shared/lib/features/users/users-thunks';
import { GlobalError, User, ValidationError } from '@/shared/types/user.types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UsersState {
  user: User | null;
  currentUser: User | null;
  usersUpdating: boolean;
  usersUpdatingError: GlobalError | null;
  loginLoading: boolean;
  registerLoading: boolean;
  loginError: GlobalError | null;
  registerError: ValidationError | null;
  users: User[];
  usersFetching: boolean;
  userPermission: number;
  usersPages: number;
  currentPage: number;
  forgotPasswordLoading: boolean;
  forgotPasswordError: GlobalError | null;
  resetPasswordLoading: boolean;
  resetPasswordError: GlobalError | null;
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
  users: [],
  userPermission: 0,
  usersPages: 0,
  currentPage: 1,
  forgotPasswordLoading: false,
  forgotPasswordError: null,
  resetPasswordError: null,
  resetPasswordLoading: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    unsetUser: (state) => {
      state.user = null;
      state.userPermission = 0;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
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
      .addCase(addUser.pending, (state) => {
        state.registerLoading = true;
        state.registerError = null;
      })
      .addCase(addUser.fulfilled, (state) => {
        state.registerLoading = false;
      })
      .addCase(addUser.rejected, (state, { payload: error }) => {
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
        state.usersPages = users.pages;
        state.currentPage = users.page;
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.usersFetching = false;
      });

    builder.addCase(getPermissionForUser.fulfilled, (state, { payload: permission }) => {
      state.userPermission = permission;
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

    builder
      .addCase(updateCurrentUserInfo.pending, (state) => {
        state.usersUpdating = true;
      })
      .addCase(updateCurrentUserInfo.fulfilled, (state, { payload: user }) => {
        state.usersUpdating = false;
        state.currentUser = user;
      })
      .addCase(updateCurrentUserInfo.rejected, (state, { payload }) => {
        state.usersUpdatingError = payload || null;
        state.usersUpdating = false;
      });

    builder
      .addCase(forgotPassword.pending, (state) => {
        state.forgotPasswordError = null;
        state.forgotPasswordLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.forgotPasswordLoading = false;
      })
      .addCase(forgotPassword.rejected, (state, { payload: error }) => {
        state.forgotPasswordError = error || null;
        state.forgotPasswordLoading = false;
      });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectCurrentUser: (state) => state.currentUser,
    selectLoginLoading: (state) => state.loginLoading,
    selectLoginError: (state) => state.loginError,
    selectRegisterLoading: (state) => state.registerLoading,
    selectRegisterError: (state) => state.registerError,
    selectUsersList: (state) => state.users,
    selectUserPermission: (state) => state.userPermission,
    selectUpdating: (state) => state.usersUpdating,
    selectUpdatingError: (state) => state.usersUpdatingError,
    selectUsersListPages: (state) => state.usersPages,
    selectCurrentPage: (state) => state.currentPage,
    selectForgotPasswordLoading: (state) => state.forgotPasswordLoading,
    selectForgotPasswordError: (state) => state.forgotPasswordError,
    selectResetPasswordLoading: (state) => state.resetPasswordLoading,
    selectResetPasswordError: (state) => state.resetPasswordError,
  },
});

export const {
  selectUser,
  selectCurrentUser,
  selectLoginLoading,
  selectLoginError,
  selectRegisterLoading,
  selectRegisterError,
  selectUsersList,
  selectUserPermission,
  selectUpdating,
  selectUpdatingError,
  selectUsersListPages,
  selectCurrentPage,
  selectForgotPasswordLoading,
  selectForgotPasswordError,
  selectResetPasswordLoading,
  selectResetPasswordError,
} = usersSlice.selectors;
export const { unsetUser, setCurrentPage } = usersSlice.actions;

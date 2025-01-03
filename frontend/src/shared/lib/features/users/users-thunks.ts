import { RootState, axiosApi } from '@/shared/lib';
import { unsetUser } from '@/shared/lib/features/users/users-slice';
import { LoginMutation, RegisterMutation } from '@/shared/types/auth.types';
import {
  GlobalError,
  RegisterMutationWithoutCoupleFields,
  User,
  UserMutation,
  UserPermissionLevel,
  UsersFilter,
  UsersResponse,
  ValidationError,
} from '@/shared/types/user.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

export const register = createAsyncThunk<User, RegisterMutation, { rejectValue: ValidationError }>(
  'users-list/register',
  async (registerMutation, { rejectWithValue }) => {
    try {
      const { data: user } = await axiosApi.post<User>('/users', registerMutation);

      return user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const login = createAsyncThunk<User, LoginMutation, { rejectValue: GlobalError }>(
  'users-list/login',
  async (loginMutation, { rejectWithValue }) => {
    try {
      const { data: user } = await axiosApi.post<User>('/users/sessions', loginMutation);

      return user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const logout = createAsyncThunk<void, void, { state: RootState }>(
  'users-list/logout',
  async (_arg, { getState, dispatch }) => {
    const token = getState().users.user?.token;
    await axiosApi.delete('/users/sessions', { headers: { Authorization: `Bearer ${token}` } });
    dispatch(unsetUser());
  },
);

export const fetchUsers = createAsyncThunk<UsersResponse, UsersFilter>('users/fetchUsers', async (filters) => {
  const { fullName, telephone, category, page, role } = filters;
  const filterUrl = [
    category && `category=${category}`,
    fullName && `fullName=${fullName}`,
    telephone && `telephone=${telephone}`,
    page && `page=${page}`,
    role && `role=${role}`,
  ]
    .filter(Boolean)
    .join('&');

  const url = `/users/get-users${filterUrl ? `?${filterUrl}` : ''}`;
  const { data: response } = await axiosApi.get<UsersResponse>(url);
  return response;
});

export const getPermissionForUser = createAsyncThunk<number, string, { state: RootState }>(
  'users/get-permission',
  async (id, { getState, dispatch }) => {
    const { data: response } = await axiosApi.get<UserPermissionLevel>(`/users/${id}/permission`);

    if (response.permissionLevel === 0) {
      const token = getState().users.user?.token;
      await axiosApi.delete('/users/sessions', { headers: { Authorization: `Bearer ${token}` } });
      dispatch(unsetUser());

      toast.error('Ваш аккаунт заблокирован.');
    }
    return response.permissionLevel;
  },
);

export const addUser = createAsyncThunk<void, UserMutation, { rejectValue: ValidationError }>(
  'users/add-user',
  async (registerMutation, { rejectWithValue }) => {
    try {
      await axiosApi.post<User>('/users/add-user', registerMutation);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const fetchOneUser = createAsyncThunk<User, string>('users/fetchOneUser', async (id) => {
  const { data: user } = await axiosApi.get<User>(`/users/${id}`);
  return user;
});

export const updateUserInfo = createAsyncThunk<User, RegisterMutationWithoutCoupleFields, { rejectValue: GlobalError }>(
  'users/updateUserInfo',
  async (userInfo) => {
    try {
      const { data: user } = await axiosApi.put<User>('/users/update-info', userInfo);
      return user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        if (error.response.data.error) {
          toast.error(error.response.data.error);
        }
      }
      throw error;
    }
  },
);

export const updateCurrentUserInfo = createAsyncThunk<User, UserMutation, { rejectValue: GlobalError }>(
  'users/updateCurrentUserInfo',
  async (userInfo) => {
    try {
      const { data: user } = await axiosApi.put<User>(`/users/${userInfo.id}/update-info`, userInfo);
      return user;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        if (error.response.data.error) {
          toast.error(error.response.data.error);
        }
      }

      throw error;
    }
  },
);

export const updateIsActive = createAsyncThunk<void, string>('users/toggle-active', async (id: string) => {
  await axiosApi.patch(`/users/${id}/toggleActive`);
});

export const forgotPassword = createAsyncThunk<void, string, { rejectValue: GlobalError }>(
  'users/forgotPassword',
  async (email, { rejectWithValue }) => {
    try {
      await axiosApi.post('/users/forgot-password', { email });
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const resetPassword = createAsyncThunk<void, { password: string; token: string }, { rejectValue: GlobalError }>(
  'users/resetPassword',
  async ({ password, token }, { rejectWithValue }) => {
    try {
      await axiosApi.post(`/users/reset-password/${token}`, { password });
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

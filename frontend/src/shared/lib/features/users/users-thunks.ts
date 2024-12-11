import { RootState, axiosApi } from '@/shared/lib';
import { unsetUser } from '@/shared/lib/features/users/users-slice';
import { LoginMutation, RegisterMutation } from '@/shared/types/auth.types';
import {
  GlobalError,
  User,
  UserMutation,
  UsersFilter,
  UsersResponse,
  ValidationError,
} from '@/shared/types/user.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

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

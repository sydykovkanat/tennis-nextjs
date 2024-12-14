import { RootState, axiosApi } from '@/shared/lib';
import { unsetUser } from '@/shared/lib/features/users/users-slice';
import { LoginMutation, RegisterMutation } from '@/shared/types/auth.types';
import { GlobalError, User, ValidationError,RegisterMutationWithoutCoupleFields } from '@/shared/types/user.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

export const register = createAsyncThunk<User, RegisterMutation, { rejectValue: ValidationError }>(
  'users/register',
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
  'users/login',
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
  'users/logout',
  async (_arg, { getState, dispatch }) => {
    const token = getState().users.user?.token;
    await axiosApi.delete('/users/sessions', { headers: { Authorization: `Bearer ${token}` } });
    dispatch(unsetUser());
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

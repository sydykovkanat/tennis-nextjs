import { axiosApi, toQueryParams } from '@/shared/lib';
import { AppDispatch } from '@/shared/lib/store';
import { Reward, RewardMutation, RewardResponse } from '@/shared/types/reward.types';
import { Filters } from '@/shared/types/root.types';
import { GlobalError, ValidationError } from '@/shared/types/user.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const createReward = createAsyncThunk<
  void,
  RewardMutation,
  { dispatch: AppDispatch; rejectValue: GlobalError | ValidationError }
>('rewards/createReward', async (rewardMutation, { rejectWithValue, dispatch }) => {
  try {
    const response = await axiosApi.post('/rewards', rewardMutation);
    if (rewardMutation.user) {
      const filter: Filters = { query: { userId: rewardMutation.user } };
      await dispatch(fetchRewards(filter));
    }

    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && (e.response.status === 400 || e.response.status === 422)) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const fetchRewards = createAsyncThunk<RewardResponse, Filters | undefined, { rejectValue: GlobalError }>(
  'rewards/fetchRewards',
  async (data, { rejectWithValue }) => {
    let query = '';
    try {
      if (data?.query) {
        query = toQueryParams(data.query);
      }
      const { data: rewards } = await axiosApi.get<RewardResponse>(`/rewards${query}`);
      return rewards;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 404) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const fetchOneReward = createAsyncThunk<Reward, string>('rewards/fetchOneReward', async (id) => {
  const { data: oneReward } = await axiosApi.get<Reward>(`/rewards/${id}`);
  return oneReward;
});

export const updateReward = createAsyncThunk<
  Reward | null,
  { rewardId: string; userId: string; rewardMutation: RewardMutation },
  { dispatch: AppDispatch; rejectValue: GlobalError | ValidationError }
>('rewards/updateReward', async ({ rewardId, userId, rewardMutation }, { dispatch, rejectWithValue }) => {
  try {
    const { data: response } = await axiosApi.put<Reward>(`/rewards/${rewardId}`, rewardMutation);

    if (userId) {
      const filter: Filters = { query: { userId } };
      await dispatch(fetchRewards(filter));
    }
    return response;
  } catch (e) {
    if (isAxiosError(e) && e.response && (e.response.status === 400 || e.response.status === 422)) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const removeReward = createAsyncThunk<void, { rewardId: string; userId: string }, { dispatch: AppDispatch }>(
  'rewards/remove',
  async ({ rewardId, userId }, thunkAPI) => {
    try {
      await axiosApi.delete(`/rewards/${rewardId}`);

      if (userId) {
        const filter: Filters = { query: { userId } };
        await thunkAPI.dispatch(fetchRewards(filter));
      }
    } catch (e) {
      throw e;
    }
  },
);

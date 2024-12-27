import { axiosApi, toQueryParams } from '@/shared/lib';
import { AppDispatch } from '@/shared/lib/store';
import { RewardMutation, RewardResponse } from '@/shared/types/reward.types';
import { Filters } from '@/shared/types/root.types';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const createReward = createAsyncThunk<void, RewardMutation, { dispatch: AppDispatch }>(
  'rewards/createReward',
  async (rewardMutation, thunkAPI) => {
    try {
      const response = await axiosApi.post('/rewards', rewardMutation);
      if (rewardMutation.user) {
        const filter: Filters = { query: { userId: rewardMutation.user } };
        await thunkAPI.dispatch(fetchRewards(filter));
      }

      return response.data;
    } catch (e) {
      throw e;
    }
  },
);

export const fetchRewards = createAsyncThunk<RewardResponse, Filters | undefined>(
  'rewards/fetchRewards',
  async (data) => {
    let query = '';
    try {
      if (data?.query) {
        query = toQueryParams(data.query);
      }
      const { data: rewards } = await axiosApi.get<RewardResponse>(`/rewards/${query}`);
      return rewards;
    } catch (error) {
      throw error;
    }
  },
);

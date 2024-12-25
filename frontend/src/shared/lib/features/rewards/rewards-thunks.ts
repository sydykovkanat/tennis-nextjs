import { axiosApi, toQueryParams } from '@/shared/lib';
import { RewardResponse } from '@/shared/types/reward.types';
import { Filters } from '@/shared/types/root.types';
import { createAsyncThunk } from '@reduxjs/toolkit';

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

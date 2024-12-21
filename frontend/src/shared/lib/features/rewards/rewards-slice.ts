import { fetchRewards } from '@/shared/lib/features/rewards/rewards-thunks';
import { Reward } from '@/shared/types/reward.types';
import { createSlice } from '@reduxjs/toolkit';

interface RewardsState {
  items: Reward[];
  item: Reward | null;
  createRewardLoading: boolean;
  fetchRewardsLoading: boolean;
  fetchOneRewardLoading: boolean;
  updateRewardLoading: boolean;
  removeRewardLoading: boolean | string;
}

const initialState: RewardsState = {
  items: [],
  item: null,
  createRewardLoading: false,
  fetchRewardsLoading: false,
  fetchOneRewardLoading: false,
  updateRewardLoading: false,
  removeRewardLoading: false,
};

export const rewardsSlice = createSlice({
  name: 'rewards',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRewards.pending, (state) => {
        state.fetchRewardsLoading = true;
      })
      .addCase(fetchRewards.fulfilled, (state, { payload: rewards }) => {
        state.items = rewards;
        state.fetchRewardsLoading = false;
      })
      .addCase(fetchRewards.rejected, (state) => {
        state.fetchRewardsLoading = false;
      });
  },
  selectors: {
    selectRewards: (state) => state.items,
    selectRewardsFetching: (state) => state.fetchRewardsLoading,
  },
});

export const rewardsReducer = rewardsSlice.reducer;

export const { selectRewards, selectRewardsFetching } = rewardsSlice.selectors;

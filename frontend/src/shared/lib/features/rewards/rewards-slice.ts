import { fetchRewards } from '@/shared/lib/features/rewards/rewards-thunks';
import { Reward } from '@/shared/types/reward.types';
import { createSlice } from '@reduxjs/toolkit';


interface RewardsState {
  items: Reward[];
  pages: number;
  item: Reward | null;
  createRewardLoading: boolean;
  fetchRewardsLoading: boolean;
  fetchOneRewardLoading: boolean;
  updateRewardLoading: boolean;
  removeRewardLoading: boolean | string;
}

const initialState: RewardsState = {
  items: [],
  pages: 1,
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
      .addCase(fetchRewards.fulfilled, (state, { payload }) => {
        state.items = payload.data;
        state.pages = payload.pages;
        state.fetchRewardsLoading = false;
      })
      .addCase(fetchRewards.rejected, (state) => {
        state.fetchRewardsLoading = false;
      });
  },
  selectors: {
    selectRewards: (state) => state.items,
    selectRewardsPages: (state) => state.pages,
    selectRewardsFetching: (state) => state.fetchRewardsLoading,
  },
});

export const rewardsReducer = rewardsSlice.reducer;

export const { selectRewards, selectRewardsPages, selectRewardsFetching } = rewardsSlice.selectors;
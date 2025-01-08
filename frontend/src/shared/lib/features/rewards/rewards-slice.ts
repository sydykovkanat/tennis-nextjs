import { removeNews } from '@/shared/lib/features/news/news-thunks';
import { createReward, fetchRewards } from '@/shared/lib/features/rewards/rewards-thunks';
import { Reward } from '@/shared/types/reward.types';
import { GlobalError } from '@/shared/types/user.types';
import { createSlice } from '@reduxjs/toolkit';

interface RewardsState {
  items: Reward[];
  pages: number;
  item: Reward | null;
  createRewardLoading: boolean;
  fetchRewardsLoading: boolean;
  fetchError: GlobalError | null;
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
  fetchError: null,
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
      .addCase(createReward.pending, (state) => {
        state.createRewardLoading = true;
      })
      .addCase(createReward.fulfilled, (state) => {
        state.createRewardLoading = false;
      })
      .addCase(createReward.rejected, (state) => {
        state.createRewardLoading = false;
      });

    builder
      .addCase(fetchRewards.pending, (state) => {
        state.fetchRewardsLoading = true;
        state.fetchError = null;
      })
      .addCase(fetchRewards.fulfilled, (state, { payload }) => {
        state.items = payload.data;
        state.pages = payload.pages;
        state.fetchRewardsLoading = false;
        state.fetchError = null;
      })
      .addCase(fetchRewards.rejected, (state, { payload: error }) => {
        state.fetchRewardsLoading = false;
        state.fetchError = error || null;
      });

    builder
      .addCase(removeNews.pending, (state, { meta }) => {
        state.removeRewardLoading = meta.arg;
      })
      .addCase(removeNews.fulfilled, (state) => {
        state.removeRewardLoading = false;
      })
      .addCase(removeNews.rejected, (state) => {
        state.removeRewardLoading = false;
      });
  },
  selectors: {
    selectRewards: (state) => state.items,
    selectRewardsPages: (state) => state.pages,
    selectRewardsCreating: (state) => state.createRewardLoading,
    selectRewardsFetching: (state) => state.fetchRewardsLoading,
    selectRewardFetchError: (state) => state.fetchError,
    selectRewardRemoving: (state) => state.removeRewardLoading
  },
});

export const rewardsReducer = rewardsSlice.reducer;

export const {
  selectRewards,
  selectRewardsPages,
  selectRewardsCreating,
  selectRewardsFetching,
  selectRewardFetchError,
  selectRewardRemoving
} = rewardsSlice.selectors;
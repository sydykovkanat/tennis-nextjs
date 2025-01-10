import {
  createReward,
  fetchOneReward,
  fetchRewards,
  removeReward,
  updateReward,
} from '@/shared/lib/features/rewards/rewards-thunks';
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
      .addCase(fetchOneReward.pending, (state) => {
        state.fetchOneRewardLoading = true;
        state.item = null;
      })
      .addCase(fetchOneReward.fulfilled, (state, { payload: oneNews }) => {
        state.fetchOneRewardLoading = false;
        state.item = oneNews;
      })
      .addCase(fetchOneReward.rejected, (state) => {
        state.fetchOneRewardLoading = false;
      });

    builder
      .addCase(updateReward.pending, (state) => {
        state.updateRewardLoading = true;
      })
      .addCase(updateReward.fulfilled, (state) => {
        state.updateRewardLoading = false;
      })
      .addCase(updateReward.rejected, (state) => {
        state.updateRewardLoading = false;
      });

    builder
      .addCase(removeReward.pending, (state, { meta }) => {
        state.removeRewardLoading = meta.arg.rewardId;
      })
      .addCase(removeReward.fulfilled, (state) => {
        state.removeRewardLoading = false;
      })
      .addCase(removeReward.rejected, (state) => {
        state.removeRewardLoading = false;
      });
  },
  selectors: {
    selectRewards: (state) => state.items,
    selectReward: (state) => state.item,
    selectRewardsPages: (state) => state.pages,
    selectRewardsCreating: (state) => state.createRewardLoading,
    selectRewardsFetching: (state) => state.fetchRewardsLoading,
    selectRewardFetching: (state) => state.fetchOneRewardLoading,
    selectRewardFetchError: (state) => state.fetchError,
    selectRewardUpdating: (state) => state.updateRewardLoading,
    selectRewardRemoving: (state) => state.removeRewardLoading,
  },
});

export const rewardsReducer = rewardsSlice.reducer;

export const {
  selectRewards,
  selectReward,
  selectRewardsPages,
  selectRewardsCreating,
  selectRewardsFetching,
  selectRewardFetching,
  selectRewardFetchError,
  selectRewardUpdating,
  selectRewardRemoving,
} = rewardsSlice.selectors;

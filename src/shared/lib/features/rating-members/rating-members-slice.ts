import {
  createRatingMember,
  deleteRatingMember,
  updateRatingCategories,
  updateRatingMember,
} from '@/shared/lib/features/rating-members/rating-members-thunks';
import { createSlice } from '@reduxjs/toolkit';

export interface RatingMembersSlice {
  isCreating: boolean;
  isDeleting: boolean | string;
  updateLoading: boolean;
  categoriesUpdateLoading: boolean;
}

const initialState: RatingMembersSlice = {
  isCreating: false,
  isDeleting: false,
  updateLoading: false,
  categoriesUpdateLoading: false,
};

export const ratingMembersSlice = createSlice({
  name: 'ratingMembers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createRatingMember.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createRatingMember.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createRatingMember.rejected, (state) => {
        state.isCreating = false;
      });

    builder
      .addCase(deleteRatingMember.pending, (state, { meta }) => {
        state.isDeleting = meta.arg;
      })
      .addCase(deleteRatingMember.fulfilled, (state) => {
        state.isDeleting = false;
      })
      .addCase(deleteRatingMember.rejected, (state) => {
        state.isDeleting = false;
      });

    builder
      .addCase(updateRatingMember.pending, (state) => {
        state.updateLoading = true;
      })
      .addCase(updateRatingMember.fulfilled, (state) => {
        state.updateLoading = false;
      })
      .addCase(updateRatingMember.rejected, (state) => {
        state.updateLoading = false;
      });

    builder
      .addCase(updateRatingCategories.pending, (state) => {
        state.categoriesUpdateLoading = true;
      })
      .addCase(updateRatingCategories.fulfilled, (state) => {
        state.categoriesUpdateLoading = false;
      })
      .addCase(updateRatingCategories.rejected, (state) => {
        state.categoriesUpdateLoading = false;
      });
  },
  selectors: {
    selectRatingMemberCreating: (state) => state.isCreating,
    selectRatingMemberUpdating: (state) => state.updateLoading,
    selectRatingMemberDeleting: (state) => state.isDeleting,
    selectRatingMembersCategoriesUpdating: (state) => state.categoriesUpdateLoading,
  },
});

export const ratingMembersReducer = ratingMembersSlice.reducer;

export const {
  selectRatingMemberCreating,
  selectRatingMemberUpdating,
  selectRatingMemberDeleting,
  selectRatingMembersCategoriesUpdating,
} = ratingMembersSlice.selectors;

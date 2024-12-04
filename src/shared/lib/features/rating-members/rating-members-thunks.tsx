import { axiosApi } from '@/shared/lib';
import { RatingMemberMutation, UpdateCategoryArg, UpdateRatingMemberArg } from '@/shared/types/rating-member.types';
import { GlobalError } from '@/shared/types/user.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const createRatingMember = createAsyncThunk<void, RatingMemberMutation, { rejectValue: GlobalError }>(
  'ratingMembers/create',
  async (ratingMemberMutation, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      const keys = Object.keys(ratingMemberMutation) as (keyof RatingMemberMutation)[];
      keys.forEach((key) => {
        const value = ratingMemberMutation[key];
        if (value !== null) {
          formData.append(key, value);
        }
      });

      await axiosApi.post('/ratingMembers', formData);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const deleteRatingMember = createAsyncThunk<void, string>('ratingMembers/delete', async (id) => {
  await axiosApi.delete(`/ratingMembers/${id}`);
});

export const updateRatingMember = createAsyncThunk<void, UpdateRatingMemberArg, { rejectValue: GlobalError }>(
  'ratingMembers/update',
  async ({ id, ratingMemberMutation }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      const keys = Object.keys(ratingMemberMutation) as (keyof RatingMemberMutation)[];
      keys.forEach((key) => {
        const value = ratingMemberMutation[key];
        if (value !== null) {
          formData.append(key, value);
        }
      });

      await axiosApi.put(`/ratingMembers/${id}`, formData);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }

      throw error;
    }
  },
);

export const updateRatingCategories = createAsyncThunk<void, UpdateCategoryArg, { rejectValue: GlobalError }>(
  'ratingMembers/updateCategories',
  async ({ mensRatingCategoryTop8, mensRatingCategoryTop3, womensRatingCategoryTop3 }, { rejectWithValue }) => {
    try {
      const data = { mensRatingCategoryTop8, mensRatingCategoryTop3, womensRatingCategoryTop3 };
      await axiosApi.patch('/ratingMembers/categories', data);
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

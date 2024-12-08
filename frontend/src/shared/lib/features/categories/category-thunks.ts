import { axiosApi } from '@/shared/lib';
import { AppDispatch } from '@/shared/lib/store';
import { Category } from '@/shared/types/category.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

export const fetchCategories = createAsyncThunk<Category[], void>('category/fetchCategories', async () => {
  const { data: ranks } = await axiosApi.get<Category[]>('/categories');

  return ranks;
});

export const removeCategory = createAsyncThunk<void, string, { dispatch: AppDispatch }>(
  'category/deleteCategory',
  async (id, thunkAPI) => {
    try {
      await axiosApi.delete(`/categories/${id}`);
      await thunkAPI.dispatch(fetchCategories());
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        toast.error(error.response.data.error);
      }
      console.error(error);
      throw error;
    }
  },
);

export const createCategory = createAsyncThunk<Category, string>('category/createCategory', async (name) => {
  const { data: category } = await axiosApi.post<Category>('/categories', { name });

  return category;
});

export const updateCategory = createAsyncThunk<Category, { id: string; name: string }, { dispatch: AppDispatch }>(
  'category/updateCategory',
  async ({ id, name }, thunkAPI) => {
    const { data: category } = await axiosApi.put<Category>(`/categories/${id}`, { name });
    await thunkAPI.dispatch(fetchCategories());

    return category;
  },
);

export const fetchCategory = createAsyncThunk<Category, string>('category/fetchCategory', async (id) => {
  const { data: category } = await axiosApi.get<Category>(`/categories/${id}`);

  return category;
});

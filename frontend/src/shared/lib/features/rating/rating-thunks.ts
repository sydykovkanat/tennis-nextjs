import { axiosApi } from '@/shared/lib';
import { AppDispatch } from '@/shared/lib/store';
import { Event, EventMutation } from '@/shared/types/event.types';
import { Rating, RatingMutation } from '@/shared/types/rating.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';
import { toast } from 'sonner';

export const fetchRatings = createAsyncThunk('ratings/fetchRatings', async () => {
  const { data: ratings } = await axiosApi.get<Rating[]>('/ratings');

  return ratings;
});

export const createRating = createAsyncThunk('ratings/createRating', async (rating: RatingMutation) => {
  try {
    const { data } = await axiosApi.post<Rating>('/ratings', rating);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.data.code === 409) {
      toast.error(error.response.data.error);
    } else {
      toast.error('Произошла ошибка при создании рейтинга');
    }
    throw error;
  }
});

export const createEvent = createAsyncThunk('ratings/createEvent', async (eventMutation: EventMutation) => {
  try {
    const { data } = await axiosApi.post<Rating>('/events', eventMutation);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.data.code === 409) {
      toast.error(error.response.data.error);
    } else {
      toast.error('Произошла ошибка при создании события');
    }
    throw error;
  }
});

export const deleteEvent = createAsyncThunk<void, string, { dispatch: AppDispatch }>(
  'ratings/deleteEvent',
  async (id: string, thunkAPI) => {
    try {
      await axiosApi.delete(`/events/${id}`);
      await thunkAPI.dispatch(fetchRatings());
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.data.code === 404) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Произошла ошибка при удалении события');
      }
      throw error;
    }
  },
);

export const editEvent = createAsyncThunk(
  'ratings/editEvent',
  async (event: { id: string; eventMutation: EventMutation }) => {
    try {
      const { data } = await axiosApi.put<Rating>(`/events/${event.id}`, event.eventMutation);

      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.data.code === 404) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Произошла ошибка при редактировании события');
      }
      throw error;
    }
  },
);

export const getEvent = createAsyncThunk('ratings/getEvent', async (id: string) => {
  try {
    const { data } = await axiosApi.get<Event>(`/events/${id}`);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.data.code === 404) {
      toast.error(error.response.data.error);
    } else {
      toast.error('Произошла ошибка при получении события');
    }
    throw error;
  }
});

export const deleteRating = createAsyncThunk('ratings/deleteRating', async (id: string) => {
  try {
    await axiosApi.delete(`/ratings/${id}`);
  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.data.code === 404) {
      toast.error(error.response.data.error);
    } else {
      toast.error('Произошла ошибка при удалении рейтинга');
    }
    throw error;
  }
});

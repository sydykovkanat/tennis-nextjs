import { axiosApi } from '@/shared/lib';
import { CarouselMutation, CarouselTypes } from '@/shared/types/carousel.types';
import { GlobalError } from '@/shared/types/user.types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { isAxiosError } from 'axios';

export const getCarousel = createAsyncThunk<CarouselTypes[]>('carousel/getCarousel', async () => {
  const response = await axiosApi.get<CarouselTypes[] | []>('/carousel');
  return response.data;
});

export const postFetchCarousel = createAsyncThunk('carousel/postFetchCarousel', async (newImage: CarouselMutation) => {
  const formData = new FormData();

  if (newImage.image) {
    formData.append('file', newImage.image);
  } else if (newImage.video) {
    formData.append('file', newImage.video);
  } else {
    throw new Error('No media file provided');
  }

  const response = await axiosApi.post<CarouselMutation>('/carousel/admin-post-image-carousel', formData);
  return response.data;
});

export const deleteImageCarousel = createAsyncThunk<void, { id: string }, { rejectValue: GlobalError }>(
  'carousel/deleteImageCarousel',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.delete(`/carousel/admin-delete-image-carousel/${id}`);
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response && error.response.status === 400) {
        return rejectWithValue(error.response.data);
      }
      if (isAxiosError(error) && error.response && error.response.status === 401) {
        return rejectWithValue(error.response.data);
      }
    }
  },
);

export const updateCarouselImage = createAsyncThunk<
  CarouselTypes,
  { id: string; updatedImage: CarouselMutation },
  { rejectValue: GlobalError }
>('carousel/updateCarouselImage', async ({ id, updatedImage }, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    if (updatedImage.image) {
      formData.append('file', updatedImage.image);
    } else if (updatedImage.video) {
      formData.append('file', updatedImage.video);
    } else {
      return rejectWithValue({ error: 'No media file provided' });
    }

    const response = await axiosApi.put<CarouselTypes>(`/carousel/admin-update-image-carousel/${id}`, formData);

    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response && error.response.status === 400) {
      return rejectWithValue(error.response.data);
    }
    throw error;
  }
});

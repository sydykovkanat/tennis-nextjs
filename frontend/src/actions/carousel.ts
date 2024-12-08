import { axiosApi } from '@/shared/lib/helpers/axios-api';
import { CarouselTypes } from '@/shared/types/carousel.types';
import { AxiosError } from 'axios';

export const getCarousel = async () => {
  try {
    const { data: carouselFiles } = await axiosApi.get<CarouselTypes[]>('/carousel');
    return carouselFiles;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Ошибка при загрузке данных');
    }
    throw new Error('Произошла неизвестная ошибка');
  }
};

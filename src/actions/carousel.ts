import { axiosApi } from '@/shared/lib/axios-api';
import { CarouselTypes } from '@/shared/types/carousel.types';

export const getCarousel = async () => {
  const { data: carouselFiles } = await axiosApi.get<CarouselTypes[]>('/carousel');
  return carouselFiles;
};
import { axiosApi } from '@/shared/lib';
import { Rating } from '@/shared/types/rating.types';

export const getRatings = async () => {
  return (await axiosApi.get<Rating[]>('/ratings')).data;
};

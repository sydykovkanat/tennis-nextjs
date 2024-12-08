import { axiosApi } from '@/shared/lib/helpers/axios-api';
import { RatingMember } from '@/shared/types/rating-member.types';

export const getRatingMembers = async () => {
  const { data: ratingMembers } = await axiosApi.get<RatingMember[]>('/ratingMembers');

  return ratingMembers;
};

import { axiosApi } from '@/shared/lib/helpers/axios-api';
import { Partner } from '@/shared/types/partner.types';

export const getPartners = async () => {
  const { data: partners } = await axiosApi.get<Partner[]>('/partners');

  return partners;
};

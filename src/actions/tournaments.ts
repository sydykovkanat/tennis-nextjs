import { axiosApi } from '@/shared/lib';
import { Tournaments } from '@/shared/types/tournament.types';

export const getTournaments = async (rank: string | undefined) => {
  const { data: tournaments } = await axiosApi.get<Tournaments>('/tournaments', { params: { rank: rank } });

  return tournaments;
};

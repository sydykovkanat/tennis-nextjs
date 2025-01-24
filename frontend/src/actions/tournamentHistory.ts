import { axiosApi, toQueryParams } from '@/shared/lib';
import { Filters } from '@/shared/types/root.types';

export const toggleAddTournament = async (filters: Filters | undefined, tournamentId: string) => {
  let query;
  try {
    if (filters?.query) {
      query = toQueryParams(filters.query);
    }
    const { data: response } = await axiosApi.patch<{ message: string }>(`/tournamentHistory/${tournamentId}${query}`);
    return response;
  } catch (e) {
    throw e;
  }
};

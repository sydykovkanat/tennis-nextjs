import { axiosApi, toQueryParams } from '@/shared/lib';
import { Filters } from '@/shared/types/root.types';
import { toast } from 'sonner';

export const toggleAddTournament = async (filters: Filters | undefined, tournamentId: string) => {
  let query;
  try {
    if (filters?.query) {
      query = toQueryParams(filters.query);
    }
    const { data: response } = await axiosApi.patch<{ message: string }>(`/tournamentHistory/${tournamentId}${query}`);
    return toast.message(response.message);
  } catch (e) {
    throw e;
  }
};

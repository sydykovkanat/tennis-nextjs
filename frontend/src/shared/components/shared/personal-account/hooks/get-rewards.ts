import { deleteEmptyQueryStrings } from '@/shared/lib';
import { fetchRewards } from '@/shared/lib/features/rewards/rewards-thunks';
import { AppDispatch } from '@/shared/lib/store';
import { Filters, Query } from '@/shared/types/root.types';

interface Props {
  dispatch?: AppDispatch;
  userId?: string;
  searchParams?: URLSearchParams;
  limit?: number;
}

export const getRewards = ({ dispatch, userId, searchParams, limit }: Props = {}) => {
  const queryObj: Query = {};
  if (userId) queryObj.userId = userId;
  if (searchParams) queryObj.page = searchParams.get('rewardsPage') || '1';
  if (limit) queryObj.limit = limit;

  const validatedQuery = deleteEmptyQueryStrings(queryObj);
  const data: Filters = { query: validatedQuery };
  if (dispatch) dispatch(fetchRewards(data));
};

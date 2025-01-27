'use client';

import { deleteEmptyQueryStrings } from '@/shared/lib';
import { fetchTournamentHistory } from '@/shared/lib/features/tournament-history/tournament-history-thunks';
import { AppDispatch } from '@/shared/lib/store';
import { Filters, Query } from '@/shared/types/root.types';

interface Props {
  dispatch?: AppDispatch;
  userId?: string;
  searchParams?: URLSearchParams;
}

export const getSavedTournaments = ({ dispatch, userId, searchParams }: Props = {}) => {
  const queryObj: Query = {};
  if (userId) queryObj.userId = userId;
  if (searchParams) queryObj.page = searchParams.get('savedTournamentsPage') || '1';

  const validatedQuery = deleteEmptyQueryStrings(queryObj);
  const data: Filters = { query: validatedQuery };
  if (dispatch) dispatch(fetchTournamentHistory(data));
};

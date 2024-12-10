'use client';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectTournaments, selectTournamentsFetching } from '@/shared/lib/features/tournaments/tournamentsSlice';
import { fetchTournaments } from '@/shared/lib/features/tournaments/tournamentsThunks';

import { useEffect, useMemo } from 'react';

export const useTournaments = (rank?: string) => {
  const dispatch = useAppDispatch();
  const tournaments = useAppSelector(selectTournaments);
  const tournamentsFetching = useAppSelector(selectTournamentsFetching);

  const tournamentsLastYearExist = useMemo(() => {
    return Object.values(tournaments.previousYear).some((monthTournaments) => monthTournaments.length > 0);
  }, [tournaments.previousYear]);

  const tournamentsNextYearExist = useMemo(() => {
    return Object.values(tournaments.nextYear).some((monthTournaments) => monthTournaments.length > 0);
  }, [tournaments.nextYear]);

  useEffect(() => {
    dispatch(fetchTournaments(rank));
  }, [dispatch, rank]);

  return { tournaments, tournamentsFetching, tournamentsLastYearExist, tournamentsNextYearExist };
};

'use client';

import { cn, useAppDispatch, useAppSelector } from '@/shared/lib';
import {
  selectSavedTournaments,
  selectSavedTournamentsFetchError,
  selectSavedTournamentsFetching,
  selectSavedTournamentsPages,
} from '@/shared/lib/features/tournament-history/tournament-history-slice';
import { selectCurrentUser } from '@/shared/lib/features/users/users-slice';
import { Loader } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import { useEffect } from 'react';

import { TournamentCard } from '../../tournaments';
import { getSavedTournaments } from '../hooks/get-saved-tournaments';

export const SavedTournaments = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const tournamentHistory = useAppSelector(selectSavedTournaments);
  const savedTournamentsError = useAppSelector(selectSavedTournamentsFetchError);
  const pages = useAppSelector(selectSavedTournamentsPages);
  const tournamentHistoryFetching = useAppSelector(selectSavedTournamentsFetching);
  const currentUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (currentUser) {
      getSavedTournaments({ dispatch, userId: currentUser?._id, searchParams });
    }
  }, [dispatch, currentUser, searchParams]);

  return (
    <>
      {tournamentHistoryFetching ? (
        <Loader />
      ) : (
        <>
          <h2>Турниры</h2>
          {!tournamentHistory.length ? (
            <p></p>
          ) : (
            <div className={cn('flex flex-col gap-2')}>
              {tournamentHistory.map((data) => (
                <TournamentCard key={data.tournament._id} tournament={data.tournament} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

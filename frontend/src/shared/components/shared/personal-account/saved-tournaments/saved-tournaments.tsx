'use client';

import { CustomPagination, Loader, getSavedTournaments } from '@/shared/components/shared';
import { cn, useAppDispatch, useAppSelector } from '@/shared/lib';
import {
  selectSavedTournaments,
  selectSavedTournamentsFetchError,
  selectSavedTournamentsFetching,
  selectSavedTournamentsPages,
} from '@/shared/lib/features/tournament-history/tournament-history-slice';
import { selectCurrentUser } from '@/shared/lib/features/users/users-slice';
import { useSearchParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import { TournamentCard } from '../../tournaments';
import { useFetchUser } from '../hooks';
import personalStyles from '../personal.module.css';
import styles from './saved-tournaments.module.css';

export const SavedTournaments = () => {
  useFetchUser();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const tournamentHistory = useAppSelector(selectSavedTournaments);
  const savedTournamentsError = useAppSelector(selectSavedTournamentsFetchError);
  const pages = useAppSelector(selectSavedTournamentsPages);
  const tournamentHistoryFetching = useAppSelector(selectSavedTournamentsFetching);
  const currentUser = useAppSelector(selectCurrentUser);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (currentUser) {
      setUserId(currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (userId.length) {
      getSavedTournaments({ dispatch, userId, searchParams });
    }
  }, [dispatch, userId, searchParams]);

  return (
    <>
      {tournamentHistoryFetching ? (
        <Loader />
      ) : (
        <>
          <h2 className={cn(personalStyles.title, 'dark:text-white')}>Турниры</h2>
          {!tournamentHistory.length ? (
            <p>{savedTournamentsError?.error}</p>
          ) : (
            <div className={cn(styles.container)}>
              {tournamentHistory.map((data) => (
                <TournamentCard key={data.tournament._id} tournament={data.tournament} />
              ))}
            </div>
          )}
        </>
      )}
      {pages > 1 && <CustomPagination total={pages} entity='savedTournaments' />}
    </>
  );
};

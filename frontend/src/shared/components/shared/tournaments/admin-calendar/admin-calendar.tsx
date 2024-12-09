'use client';

import { TournamentCalendar } from '@/shared/components/shared';
import { TournamentNew } from '@/shared/components/shared/tournaments';
import { useTournaments } from '@/shared/components/shared/tournaments/hooks';
import { useAppSelector } from '@/shared/hooks/hooks';
import { selectUser } from '@/shared/lib/features/users/users-slice';

import React from 'react';

interface Props {
  searchParams: { rank?: string };
}

export const AdminCalendar = ({ searchParams }: Props) => {
  const rank = searchParams?.rank || 'all';
  const { tournaments, tournamentsFetching, tournamentsLastYearExist } = useTournaments(rank);
  const user = useAppSelector(selectUser);
  return (
    <div className='max-w-[900px] mx-auto mt-3'>
      <div className='flex xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5 mb-5'>
        <div>
          <h1 className='text-2xl font-medium leading-none mb-1'>Календарь</h1>
          <small className='text-muted-foreground text-base'>Управление турнирами</small>
        </div>
        <TournamentNew tournamentsLastYearExist={tournamentsLastYearExist} />
      </div>
      <TournamentCalendar
        tournaments={tournaments}
        isFetching={tournamentsFetching}
        isAdmin={true}
        tournamentsLastYearExist={tournamentsLastYearExist}
        user={user}
      />
    </div>
  );
};

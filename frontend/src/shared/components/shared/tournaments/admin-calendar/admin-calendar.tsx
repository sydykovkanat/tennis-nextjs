'use client';

import { AdminPageHeader, TournamentCalendar } from '@/shared/components/shared';
import { TournamentNew } from '@/shared/components/shared/tournaments';
import { useTournaments } from '@/shared/components/shared/tournaments/hooks';
import { Tournaments } from '@/shared/types/tournament.types';

import React from 'react';

interface Props {
  tournaments: Tournaments;
}

export const AdminCalendar: React.FC<Props> = ({ tournaments }) => {
  const { tournamentsFetching, tournamentsLastYearExist } = useTournaments();
  return (
    <>
      <AdminPageHeader title='Календарь' description='Управление турнирами'>
        <TournamentNew tournamentsLastYearExist={tournamentsLastYearExist} />
      </AdminPageHeader>
      <TournamentCalendar
        tournaments={tournaments}
        isFetching={tournamentsFetching}
        isAdmin={true}
        tournamentsLastYearExist={tournamentsLastYearExist}
        title={false}
      />
    </>
  );
};

'use client';

import { AdminPageHeader, TournamentCalendar } from '@/shared/components/shared';
import { TournamentForm } from '@/shared/components/shared/tournaments';
import { useTournamentForm, useTournaments } from '@/shared/components/shared/tournaments/hooks';
import { Button } from '@/shared/components/ui';
import { Tournaments } from '@/shared/types/tournament.types';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';

import React from 'react';

import styles from './admin-calendar.module.css';

interface Props {
  tournaments: Tournaments;
}

export const AdminCalendar: React.FC<Props> = ({ tournaments }) => {
  const { tournamentsFetching, tournamentsLastYearExist, tournamentsNextYearExist } = useTournaments();
  const { open, setOpen } = useTournamentForm();

  return (
    <>
      <AdminPageHeader title='Календарь' description='Управление турнирами'>
        {open && <TournamentForm tournamentsLastYearExist={tournamentsLastYearExist} open={open} setOpen={setOpen} />}
        <Button className={styles.addButton} icon={SquaresPlusIcon} onClick={() => setOpen(true)}>
          Создать турнир
        </Button>
      </AdminPageHeader>
      <TournamentCalendar
        tournaments={tournaments}
        isFetching={tournamentsFetching}
        isAdmin={true}
        tournamentsLastYearExist={tournamentsLastYearExist}
        tournamentsNextYearExist={tournamentsNextYearExist}
        title={false}
      />
    </>
  );
};

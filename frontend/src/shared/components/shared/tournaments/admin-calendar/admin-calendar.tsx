'use client';

import { AdminPageHeader, TournamentCalendar } from '@/shared/components/shared';
import { TournamentForm } from '@/shared/components/shared/tournaments';
import { useTournaments } from '@/shared/components/shared/tournaments/hooks';
import { Button } from '@/shared/components/ui';
import { Tournaments } from '@/shared/types/tournament.types';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';

import React, { useState } from 'react';

import styles from './admin-calendar.module.css';

interface Props {
  tournaments: Tournaments;
}

export const AdminCalendar: React.FC<Props> = ({ tournaments }) => {
  const { tournamentsFetching, tournamentsLastYearExist, tournamentsNextYearExist } = useTournaments();
  const [open, setOpen] = useState(false);

  return (
    <>
      <AdminPageHeader title='Календарь' description='Управление турнирами'>
        <Button className={styles.addButton} icon={SquaresPlusIcon} onClick={() => setOpen(true)}>
          Создать турнир
        </Button>
        {open && <TournamentForm tournamentsLastYearExist={tournamentsLastYearExist} open={open} setOpen={setOpen} />}
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

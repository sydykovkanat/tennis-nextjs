'use client';

import { AdminPageHeader, TournamentCalendar } from '@/shared/components/shared';
import { TournamentForm } from '@/shared/components/shared/tournaments';
import { useTournaments } from '@/shared/components/shared/tournaments/hooks';
import { Button } from '@/shared/components/ui';
import { Tournaments } from '@/shared/types/tournament.types';

import React, { useState } from 'react';

import styles from './admin-calendar.module.css';
import { Grid2X2PlusIcon } from 'lucide-react';

interface Props {
  tournaments: Tournaments;
}

export const AdminCalendar: React.FC<Props> = ({ tournaments }) => {
  const { tournamentsFetching, tournamentsLastYearExist } = useTournaments();
  const [open, setOpen] = useState(false);
  return (
    <>
      <AdminPageHeader title='Календарь' description='Управление турнирами'>
        <Button className={styles.addButton} icon={Grid2X2PlusIcon} onClick={() => setOpen(true)}>
          Создать турнир
        </Button>
        {open && <TournamentForm tournamentsLastYearExist={tournamentsLastYearExist} open={open} setOpen={setOpen} />}
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

'use client';

import { Confirm } from '@/shared/components/shared';
import { TournamentForm } from '@/shared/components/shared/tournaments';
import { useTournamentsDelete } from '@/shared/components/shared/tournaments/hooks';
import { Button } from '@/shared/components/ui';
import { Tournament } from '@/shared/types/tournament.types';
import { Pencil, Trash } from 'lucide-react';

import React, { useState } from 'react';

import styles from './tournament-card.module.css';

interface Props {
  tournament: Tournament;
  tournamentsLastYearExist?: boolean;
  id: string;
}

export const AdminCardActions: React.FC<Props> = ({ tournament, tournamentsLastYearExist, id }) => {
  const { handleDelete, isDeleting } = useTournamentsDelete();
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.adminCardActions}>
      <Confirm onOk={() => handleDelete(tournament._id)}>
        <Button size='sm' disabled={isDeleting === tournament._id} data-testid='delete' icon={Trash} />
      </Confirm>
      <Button size='sm' data-testid='edit' icon={Pencil} onClick={() => setOpen(true)} />
      {open && (
        <TournamentForm
          existingTournament={tournament}
          id={id}
          tournamentsLastYearExist={tournamentsLastYearExist}
          open={open}
          setOpen={setOpen}
        />
      )}
    </div>
  );
};

import { Confirm } from '@/shared/components/shared';
import { TournamentForm } from '@/shared/components/shared/tournaments';
import { useTournamentForm, useTournamentsDelete } from '@/shared/components/shared/tournaments/hooks';
import { Button } from '@/shared/components/ui';
import { Tournament } from '@/shared/types/tournament.types';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

import React from 'react';

import styles from './tournament-card.module.css';

interface Props {
  tournament: Tournament;
  tournamentsLastYearExist?: boolean;
  id: string;
}

export const AdminCardActions: React.FC<Props> = ({ tournament, tournamentsLastYearExist, id }) => {
  const { handleDelete, isDeleting } = useTournamentsDelete();
  const { open, setOpen } = useTournamentForm();

  return (
    <div className={styles.adminCardActions}>
      <Confirm onOk={() => handleDelete(tournament._id)}>
        <Button size='sm' disabled={isDeleting === tournament._id} data-testid='delete' icon={TrashIcon} />
      </Confirm>
      <Button size='sm' data-testid='edit' icon={PencilSquareIcon} onClick={() => setOpen(true)} />
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

import { Confirm } from '@/shared/components/shared';
import { TournamentForm } from '@/shared/components/shared/tournaments';
import { useTournamentsDelete } from '@/shared/components/shared/tournaments/hooks';
import { Button } from '@/shared/components/ui';
import { Tournament } from '@/shared/types/tournament.types';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

import React from 'react';

import styles from './tournament-card.module.css';

interface Props {
  tournament: Tournament;
  tournamentsLastYearExist?: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  id: string;
}

export const AdminCardActions: React.FC<Props> = ({ tournament, tournamentsLastYearExist, open, setOpen, id }) => {
  const { handleDelete, isDeleting } = useTournamentsDelete();
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

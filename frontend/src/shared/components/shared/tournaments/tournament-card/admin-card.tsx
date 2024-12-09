import { Confirm } from '@/shared/components/shared';
import { TournamentEdit } from '@/shared/components/shared/tournaments';
import { useTournamentsDelete } from '@/shared/components/shared/tournaments/hooks';
import { Button } from '@/shared/components/ui';
import { Tournament } from '@/shared/types/tournament.types';
import { TrashIcon } from '@heroicons/react/24/outline';

import React from 'react';

import styles from './tournament-card.module.css';

interface Props {
  tournament: Tournament;
  tournamentsLastYearExist?: boolean;
}

export const AdminCard: React.FC<Props> = ({ tournament, tournamentsLastYearExist }) => {
  const { handleDelete, isDeleting } = useTournamentsDelete();

  return (
    <div>
      <div className={styles.adminCardActions}>
        <Confirm onOk={() => handleDelete(tournament._id)}>
          <Button size='sm' disabled={isDeleting === tournament._id} data-testid='delete' icon={TrashIcon} />
        </Confirm>
        <TournamentEdit
          existingTournament={tournament}
          id={tournament._id}
          tournamentsLastYearExist={tournamentsLastYearExist}
        />
      </div>
    </div>
  );
};

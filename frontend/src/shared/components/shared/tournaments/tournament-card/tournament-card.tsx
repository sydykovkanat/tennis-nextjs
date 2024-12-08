import { Confirm } from '@/shared/components/shared';
import { TournamentActions, TournamentCardInfo, TournamentRegistration } from '@/shared/components/shared/tournaments';
import { useTournamentsDelete } from '@/shared/components/shared/tournaments/hooks';
import { Button } from '@/shared/components/ui';
import { useAppSelector } from '@/shared/hooks/hooks';
import { selectUser } from '@/shared/lib/features/users/users-slice';
import { Tournament } from '@/shared/types/tournament.types';
import { TrashIcon } from '@heroicons/react/24/outline';

import React from 'react';

import styles from './tournament-card.module.css';

interface Props {
  tournament: Tournament;
  isAdmin?: boolean;
  tournamentsLastYearExist?: boolean;
}

export const TournamentCard: React.FC<Props> = ({ tournament, isAdmin, tournamentsLastYearExist }) => {
  const { handleDelete, isDeleting } = useTournamentsDelete();
  const user = useAppSelector(selectUser);
  return (
    <div className={styles.cardBg} data-testid={`${tournament.name}`}>
      <div className={styles.card}>
        <div className={styles.cardInfo}>
          <TournamentCardInfo tournament={tournament} />
          <div className={styles.cardActions}>
            <TournamentActions tournament={tournament} permission={user} />
            <div className={styles.cardRegister}>
              <TournamentRegistration tournament={tournament} />
            </div>
          </div>
        </div>

        {isAdmin && (
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
        )}
      </div>
    </div>
  );
};

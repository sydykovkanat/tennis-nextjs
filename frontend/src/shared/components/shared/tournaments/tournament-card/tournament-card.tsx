import { TournamentActions, TournamentCardInfo, TournamentRegistration } from '@/shared/components/shared/tournaments';
import { AdminCardActions } from '@/shared/components/shared/tournaments/tournament-card/admin-card-actions';
import { Tournament } from '@/shared/types/tournament.types';

import React from 'react';

import styles from './tournament-card.module.css';

interface Props {
  tournament: Tournament;
  isAdmin?: boolean;
  tournamentsLastYearExist?: boolean;
}

export const TournamentCard: React.FC<Props> = ({ tournament, isAdmin, tournamentsLastYearExist }) => {
  return (
    <div className={styles.cardBg} data-testid={`${tournament.name}`}>
      <div className={styles.card}>
        <div className={styles.cardInfo}>
          <TournamentCardInfo tournament={tournament} />
          <div className={styles.cardActions}>
            <TournamentActions tournament={tournament} />
            <TournamentRegistration tournament={tournament} className={styles.cardRegister} />
          </div>
        </div>

        {isAdmin && (
          <AdminCardActions
            tournament={tournament}
            tournamentsLastYearExist={tournamentsLastYearExist}
            id={tournament._id}
          />
        )}
      </div>
    </div>
  );
};

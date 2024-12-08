import { TournamentActions, TournamentCardInfo, TournamentRegistration } from '@/shared/components/shared';
import { Tournament } from '@/shared/types/tournament.types';

import React from 'react';

import styles from './tournament-card.module.css';

interface Props {
  tournament: Tournament;
  tournamentsLastYearExist?: boolean;
}

export const TournamentCard: React.FC<Props> = ({ tournament }) => {
  return (
    <div className={styles.cardBg} data-testid={`${tournament.name}`}>
      <div className={styles.card}>
        <div className={styles.cardInfo}>
          <TournamentCardInfo tournament={tournament} />
          <div className={styles.cardActions}>
            <TournamentActions tournament={tournament} />
            <div className={styles.cardRegister}>
              <TournamentRegistration tournament={tournament} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

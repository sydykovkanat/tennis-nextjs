import { TournamentActions, TournamentCardInfo, TournamentRegistration } from '@/shared/components/shared/tournaments';
import { AdminCard } from '@/shared/components/shared/tournaments/tournament-card/admin-card';
import { Tournament } from '@/shared/types/tournament.types';
import { User } from '@/shared/types/user.types';

import React from 'react';

import styles from './tournament-card.module.css';

interface Props {
  tournament: Tournament;
  isAdmin?: boolean;
  tournamentsLastYearExist?: boolean;
  user?: User | null;
  handleDelete?: () => void;
}

export const TournamentCard: React.FC<Props> = ({ tournament, isAdmin, tournamentsLastYearExist, user }) => {
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

        {isAdmin && <AdminCard tournament={tournament} tournamentsLastYearExist={tournamentsLastYearExist} />}
      </div>
    </div>
  );
};

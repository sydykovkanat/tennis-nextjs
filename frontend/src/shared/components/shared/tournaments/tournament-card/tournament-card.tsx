import { TournamentActions, TournamentCardInfo, TournamentRegistration } from '@/shared/components/shared/tournaments';
import { AdminCardActions } from '@/shared/components/shared/tournaments/tournament-card/admin-card-actions';
import { cn } from '@/shared/lib';
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
      <div className={cn(styles.card, 'dark:bg-[#AEC9A5]')}>
        <div className={cn(styles.cardInfo, 'dark:text-black')}>
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

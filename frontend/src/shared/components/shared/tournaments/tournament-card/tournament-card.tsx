import { TournamentActions, TournamentCardInfo, TournamentRegistration } from '@/shared/components/shared/tournaments';
import { useTournamentForm } from '@/shared/components/shared/tournaments/hooks';
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
  const { open, setOpen } = useTournamentForm();

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
            open={open}
            setOpen={setOpen}
            id={tournament._id}
          />
        )}
      </div>
    </div>
  );
};

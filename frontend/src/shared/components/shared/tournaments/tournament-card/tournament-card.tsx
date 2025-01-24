'use client';

import { toggleAddTournament } from '@/actions/tournamentHistory';
import { TournamentActions, TournamentCardInfo, TournamentRegistration } from '@/shared/components/shared/tournaments';
import { AdminCardActions } from '@/shared/components/shared/tournaments/tournament-card/admin-card-actions';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { Filters } from '@/shared/types/root.types';
import { Tournament } from '@/shared/types/tournament.types';
import { Heart } from 'lucide-react';

import React, { useEffect, useState } from 'react';

import { useFetchUser } from '../../personal-account/hooks';
import styles from './tournament-card.module.css';

interface Props {
  tournament: Tournament;
  isAdmin?: boolean;
  tournamentsLastYearExist?: boolean;
}

export const TournamentCard: React.FC<Props> = ({ tournament, isAdmin, tournamentsLastYearExist }) => {
  const user = useFetchUser();
  const [filters, setFilters] = useState<Filters>({
    query: {
      userId: '',
    },
  });

  useEffect(() => {
    if (user?._id) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        query: {
          ...prevFilters.query,
          userId: user._id,
        },
      }));
    }
  }, [user?._id]);

  return (
    <div className={styles.cardBg} data-testid={`${tournament.name}`}>
      <div className={cn(styles.card, 'dark:bg-[#C3D9BD]')}>
        <div className={cn(styles.cardInfo)}>
          <TournamentCardInfo tournament={tournament} />
          <div className={styles.cardActions}>
            <TournamentActions tournament={tournament} />
            <TournamentRegistration tournament={tournament} className={styles.cardRegister} />
          </div>
        </div>
        <Button icon={Heart} onClick={() => toggleAddTournament(filters, tournament._id)} />

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

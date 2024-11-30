import { TournamentCard } from '@/shared/components/shared';
import { Tournament } from '@/shared/types/tournament.types';

import React from 'react';

import styles from './tournament-card-list.module.css';

interface Props {
  tournaments: Tournament[];
}

export const TournamentCardsList: React.FC<Props> = ({ tournaments }) => {
  let content: React.ReactNode = <p className={styles.noContentText}>Турниры отсутствуют</p>;

  if (tournaments.length > 0) {
    content = tournaments.map((tournament) => <TournamentCard key={tournament._id} tournament={tournament} />);
  }

  return <div className={styles.contentWrapper}>{content}</div>;
};

import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui';
import { isTournamentUpcoming } from '@/shared/lib/helpers/tournament-utils';
import { Tournament } from '@/shared/types/tournament.types';
import { ArrowRightIcon } from 'lucide-react';

import React from 'react';

import styles from './tournament-card.module.css';

interface Props {
  tournament: Tournament;
}

export const TournamentRegistration: React.FC<Props> = ({ tournament }) => {
  const tournamentStatus = isTournamentUpcoming(tournament.eventDate);

  if (tournamentStatus === 'upcoming') {
    return (
      <a href={tournament.registrationLink} target='_blank' rel='noopener noreferrer' className={styles.registerLink}>
        <span>Принять участие</span>
        <ArrowRightIcon className={styles.registerIcon} />
      </a>
    );
  }

  if (tournamentStatus === 'today') {
    return (
      <Popover>
        <PopoverTrigger>
          <span className={styles.registerPopoverText}>
            Принять участие
            <ArrowRightIcon className={styles.registerIcon} />
          </span>
        </PopoverTrigger>
        <PopoverContent className={styles.tournamentOver}>Запись на турнир завершена</PopoverContent>
      </Popover>
    );
  }

  return <span className={styles.tournamentOverText}>Турнир завершен</span>;
};

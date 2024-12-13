import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { isTournamentUpcoming } from '@/shared/lib/helpers/tournament-utils';
import { Tournament } from '@/shared/types/tournament.types';
import { ArrowRightIcon } from 'lucide-react';

import React from 'react';

import styles from './tournament-card.module.css';

interface Props {
  tournament: Tournament;
  className?: string;
}

export const TournamentRegistration: React.FC<Props> = ({ tournament, className }) => {
  const tournamentStatus = isTournamentUpcoming(tournament.eventDate);

  if (tournamentStatus === 'upcoming') {
    return (
      <a
        href={tournament.registrationLink}
        target='_blank'
        rel='noopener noreferrer'
        className={cn(styles.registerLink, className)}
      >
        <span>Принять участие</span>
        <ArrowRightIcon className={styles.registerIcon} />
      </a>
    );
  }

  if (tournamentStatus === 'today') {
    return (
      <Popover>
        <PopoverTrigger>
          <span className={cn(styles.registerPopoverText, className)}>
            Принять участие
            <ArrowRightIcon className={styles.registerIcon} />
          </span>
        </PopoverTrigger>
        <PopoverContent className={styles.tournamentOver}>Запись на турнир завершена</PopoverContent>
      </Popover>
    );
  }

  return <span className={cn(styles.tournamentOverText, className)}>Турнир завершен</span>;
};

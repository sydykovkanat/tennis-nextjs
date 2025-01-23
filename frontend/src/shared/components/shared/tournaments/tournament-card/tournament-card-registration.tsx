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
        className={cn(styles.registerLink, 'dark:text-[#478C16]', className)}
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
          <span className={cn(styles.registerPopoverText, 'dark:text-[#478C16]', className)}>
            Принять участие
            <ArrowRightIcon className={styles.registerIcon} />
          </span>
        </PopoverTrigger>
        <PopoverContent className={cn(styles.tournamentOver, 'dark:bg-gray-900')}>
          Запись на турнир завершена
        </PopoverContent>
      </Popover>
    );
  }

  return <span className={cn(styles.tournamentOverText, 'dark:text-[#4B5563]', className)}>Турнир завершен</span>;
};

import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui';
import { isTournamentUpcoming } from '@/shared/lib/tournament-utils';
import { Tournament } from '@/shared/types/tournament.types';
import { ArrowRightIcon } from 'lucide-react';

import React from 'react';

interface Props {
  tournament: Tournament;
}

export const TournamentRegistration: React.FC<Props> = ({ tournament }) => {
  const tournamentStatus = isTournamentUpcoming(tournament.eventDate);

  if (tournamentStatus === 'upcoming') {
    return (
      <a
        href={tournament.registrationLink}
        target='_blank'
        rel='noopener noreferrer'
        className='flex items-center gap-2 hover:underline hover:underline-offset-2 text-sm'
      >
        <span>Принять участие</span>
        <ArrowRightIcon className='w-4 h-4' />
      </a>
    );
  }

  if (tournamentStatus === 'today') {
    return (
      <Popover>
        <PopoverTrigger>
          <span className='flex items-center gap-2 text-sm'>
            Принять участие
            <ArrowRightIcon className='w-4 h-4' />
          </span>
        </PopoverTrigger>
        <PopoverContent className='bg-gray-100 text-xs'>Запись на турнир завершена</PopoverContent>
      </Popover>
    );
  }

  return <span className='text-gray-400 italic text-sm dark:text-gray-600'>Турнир завершен</span>;
};

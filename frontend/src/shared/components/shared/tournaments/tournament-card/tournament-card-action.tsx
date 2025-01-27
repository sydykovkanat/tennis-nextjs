'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui';
import { API_URL } from '@/shared/constants';
import { cn, useAppSelector } from '@/shared/lib';
import { selectUserPermission } from '@/shared/lib/features/users/users-slice';
import { Tournament } from '@/shared/types/tournament.types';

import { ToggleTournamentHistory } from '../toggle-tournament-history/toggle-tournament-history';
import styles from './tournament-card.module.css';

export const TournamentActions = ({
  tournament,
  isHistory = false,
}: {
  tournament: Tournament;
  isHistory?: boolean;
}) => {
  const userPermission = useAppSelector(selectUserPermission);

  const renderActionItem = (text: string, link?: string | null) => {
    if (!link) {
      return null;
    }

    return userPermission >= 1 ? (
      <a
        href={link}
        target='_blank'
        rel='noopener noreferrer'
        className={cn(styles.cardActionLink, 'dark:text-gray-600 dark:hover:text-gray-700')}
        data-testid='tournament-actions-link'
      >
        {text}
      </a>
    ) : (
      <Popover>
        <PopoverTrigger asChild>
          <span
            className={cn(styles.cardActionLink, 'dark:text-gray-600 dark:hover:text-gray-700')}
            data-testid='tournament-actions-link'
          >
            {text}
          </span>
        </PopoverTrigger>
        <PopoverContent className={cn(styles.cardPopover, 'dark:bg-gray-900')}>
          Этот функционал доступен только для зарегистрированных пользователей. Пожалуйста, войдите или
          зарегистрируйтесь, чтобы получить доступ.
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className={cn(styles.cardActionsWrapper)}>
      <ToggleTournamentHistory tournamentId={tournament._id} isHistory={isHistory} />
      {renderActionItem(
        'Результаты Турнира',
        tournament.resultsLink && tournament.resultsLink !== '' ? tournament.resultsLink : null,
      )}
      {renderActionItem(
        'Регламент Турнира',
        tournament.regulationsDoc ? `${API_URL}/${tournament.regulationsDoc}` : null,
      )}
    </div>
  );
};

'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui';
import { API_URL } from '@/shared/constants';
import { cn, useAppSelector } from '@/shared/lib';
import { selectUserPermission } from '@/shared/lib/features/users/users-slice';
import { Tournament } from '@/shared/types/tournament.types';

import styles from './tournament-card.module.css';

export const TournamentActions = ({ tournament }: { tournament: Tournament }) => {
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
        className={styles.cardActionLink}
        data-testid='tournament-actions-link'
      >
        {text}
      </a>
    ) : (
      <Popover>
        <PopoverTrigger asChild>
          <span className={cn(styles.cardActionLink, 'cursor-pointer')} data-testid='tournament-actions-link'>
            {text}
          </span>
        </PopoverTrigger>
        <PopoverContent className={styles.cardPopover}>
          Этот функционал доступен только для зарегистрированных пользователей. Пожалуйста, войдите или
          зарегистрируйтесь, чтобы получить доступ.
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className={styles.cardActionsWrapper}>
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

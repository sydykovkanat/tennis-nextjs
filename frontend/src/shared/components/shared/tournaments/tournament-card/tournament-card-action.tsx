import { API_URL } from '@/shared/constants';
import { Tournament } from '@/shared/types/tournament.types';

import styles from './tournament-card.module.css';

export const TournamentActions = ({ tournament }: { tournament: Tournament }) => {
  const renderActionItem = (text: string, link?: string | null) => {
    if (!link) {
      return null;
    }

    return (
      <a
        href={link}
        target='_blank'
        rel='noopener noreferrer'
        className={styles.cardActionLink}
        data-testid='tournament-actions-link'
      >
        {text}
      </a>
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

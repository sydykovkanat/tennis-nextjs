import { cn } from '@/shared/lib';
import { translateRank } from '@/shared/lib/helpers/tournament-utils';
import { Tournament } from '@/shared/types/tournament.types';

import styles from './tournament-card.module.css';

export const TournamentCardInfo = ({ tournament }: { tournament: Tournament }) => {
  const translatedRank = translateRank(tournament.rank);

  return (
    <div>
      <h6 className={cn(styles.tournamentName, 'dark:text-black')}>
        Турнир “{tournament.name}”
        <span className={cn(styles.tournamentCategory, 'dark:text-[#478C16]')}>{tournament.category}</span>
      </h6>
      <div className={styles.cardInfoWrapper}>
        <div className={styles.indoRowWrapper}>
          <span>Дата проведения:</span>
          <span className={styles.cardInfoWrapperText}>{tournament.eventDate}</span>
        </div>
        <div className={styles.indoRowWrapper}>
          <span>Разряд:</span>
          <span className={styles.cardInfoWrapperText}>{translatedRank}</span>
        </div>
        <div className={styles.indoRowWrapper}>
          <span>Кол-во участников:</span>
          <span className={styles.cardInfoWrapperText}>{tournament.participants}</span>
        </div>
      </div>
    </div>
  );
};

import { Title } from '@/shared/components/shared';
import { CardInfoRow } from '@/shared/components/shared/tournaments/tournament-card/card-info-row';
import { translateRank } from '@/shared/lib/helpers/tournament-utils';
import { Tournament } from '@/shared/types/tournament.types';

import styles from './tournament-card.module.css';

export const TournamentCardInfo = ({ tournament }: { tournament: Tournament }) => {
  const translatedRank = translateRank(tournament.rank);

  return (
    <div>
      <Title variant='h5' className={styles.tournamentName}>
        Турнир “{tournament.name}”<span className={styles.tournamentCategory}>{tournament.category}</span>
      </Title>
      <div className={styles.cardInfoWrapper}>
        <CardInfoRow label='Дата проведения:' value={tournament.eventDate} />
        <CardInfoRow label='Разряд:' value={translatedRank} />
        <CardInfoRow label='Кол-во участников:' value={tournament.participants} />
      </div>
    </div>
  );
};

import { RankFilter, TournamentAccordion } from '@/shared/components/shared';
import { CURRENT_YEAR_FULL, NEXT_YEAR, PREVIOUS_YEAR } from '@/shared/constants';
import { cn } from '@/shared/lib';
import { Tournaments } from '@/shared/types/tournament.types';

import React from 'react';

import styles from './tournament-calendar.module.css';

interface Props {
  tournaments: Tournaments;
}

export const TournamentCalendar: React.FC<Props> = ({ tournaments }) => {
  const hasPreviousTournaments = Object.values(tournaments.previousYear).some((month) => month.length > 0);
  const hasNextTournaments = Object.values(tournaments.nextYear).some((month) => month.length > 0);

  return (
    <div>
      <h1 className={styles.mainTitle}>Календарь турниров</h1>
      <RankFilter />
      <div className={cn(styles.calendarTitles, 'mb-10 mt-8')}>{CURRENT_YEAR_FULL}</div>
      <TournamentAccordion tournaments={tournaments.currentYear} />
      {hasNextTournaments ? (
        <>
          <div className={cn(styles.calendarTitles, 'mb-8')}>{NEXT_YEAR}</div>
          <TournamentAccordion tournaments={tournaments.nextYear} />
        </>
      ) : hasPreviousTournaments ? (
        <>
          <div className={cn(styles.calendarTitles, 'mt-8')}>{PREVIOUS_YEAR}</div>
          <TournamentAccordion tournaments={tournaments.previousYear} />
        </>
      ) : null}
    </div>
  );
};

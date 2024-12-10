import { RankFilter, TournamentAccordion } from '@/shared/components/shared/tournaments';
import { CURRENT_YEAR_FULL, NEXT_YEAR, PREVIOUS_YEAR } from '@/shared/constants';
import { cn } from '@/shared/lib';
import { Tournaments } from '@/shared/types/tournament.types';

import React from 'react';

import styles from './tournament-calendar.module.css';

interface Props {
  tournaments: Tournaments;
  isFetching?: boolean;
  isAdmin?: boolean;
  tournamentsLastYearExist?: boolean;
  tournamentsNextYearExist?: boolean;
  title?: boolean;
}

export const TournamentCalendar: React.FC<Props> = ({
  tournaments,
  isFetching,
  isAdmin,
  tournamentsLastYearExist,
  tournamentsNextYearExist,
  title = true,
}) => {
  return (
    <div className={styles.container}>
      {title && <h2 className={styles.mainTitle}>Календарь турниров</h2>}
      <RankFilter className='mt-10' />
      <div className={cn(styles.calendarTitles, 'mb-10 mt-8')}>{CURRENT_YEAR_FULL}</div>
      <TournamentAccordion
        tournaments={tournaments.currentYear}
        isFetching={isFetching}
        isAdmin={isAdmin}
        tournamentsLastYearExist={tournamentsLastYearExist}
        className='mb-8'
      />
      {tournamentsNextYearExist ? (
        <>
          <div className={styles.calendarTitles}>{NEXT_YEAR}</div>
          <TournamentAccordion
            tournaments={tournaments.nextYear}
            isFetching={isFetching}
            isAdmin={isAdmin}
            tournamentsLastYearExist={tournamentsLastYearExist}
          />
        </>
      ) : tournamentsLastYearExist ? (
        <>
          <div className={styles.calendarTitles}>{PREVIOUS_YEAR}</div>
          <TournamentAccordion
            tournaments={tournaments.previousYear}
            isFetching={isFetching}
            isAdmin={isAdmin}
            tournamentsLastYearExist={tournamentsLastYearExist}
          />
        </>
      ) : null}
    </div>
  );
};

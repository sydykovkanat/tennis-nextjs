import { TournamentCard } from '@/shared/components/shared/tournaments';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/components/ui';
import { MONTH_NAMES } from '@/shared/constants';
import { Tournament } from '@/shared/types/tournament.types';

import React from 'react';

import styles from './tournament-accordion.module.css';

interface Props {
  tournaments: { [month: string]: Tournament[] };
  isFetching?: boolean;
  isAdmin?: boolean;
  tournamentsLastYearExist?: boolean;
}

export const TournamentAccordion: React.FC<Props> = ({
  tournaments,
  isFetching, //добавить загрузку
  isAdmin,
  tournamentsLastYearExist,
}) => {
  return (
    <Accordion type='multiple'>
      {Object.entries(tournaments).map(([month, tournamentList]) => (
        <AccordionItem key={month} value={month} className={styles.accordionItem}>
          <AccordionTrigger className={styles.accordionTrigger}>
            <div className={styles.monthName}>
              <span>{MONTH_NAMES[Number(month) - 1]}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className={styles.accordionContent}>
            <div className={styles.contentWrapper}>
              {tournamentList.length > 0 && !isFetching ? (
                tournamentList.map((tournament) => (
                  <TournamentCard
                    key={tournament._id}
                    tournament={tournament}
                    isAdmin={isAdmin}
                    tournamentsLastYearExist={tournamentsLastYearExist}
                  />
                ))
              ) : (
                <p className={styles.noContentText}>Турниры отсутствуют</p>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

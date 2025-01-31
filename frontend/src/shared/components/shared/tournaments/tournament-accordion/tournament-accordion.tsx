import { Loader } from '@/shared/components/shared';
import { TournamentCard } from '@/shared/components/shared/tournaments';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/components/ui';
import { MONTH_NAMES } from '@/shared/constants';
import { cn } from '@/shared/lib';
import { Tournament } from '@/shared/types/tournament.types';

import React from 'react';

import styles from './tournament-accordion.module.css';

interface Props {
  tournaments: { [month: string]: Tournament[] };
  isFetching?: boolean;
  isAdmin?: boolean;
  tournamentsLastYearExist?: boolean;
  className?: string;
}

export const TournamentAccordion: React.FC<Props> = ({
  tournaments,
  isFetching,
  isAdmin,
  tournamentsLastYearExist,
  className,
}) => {
  return (
    <Accordion type='multiple' className={cn(className)}>
      {Object.entries(tournaments).map(([month, tournamentList]) => (
        <AccordionItem key={month} value={month} className={cn(styles.accordionItem)}>
          <AccordionTrigger className={cn(styles.accordionTrigger)}>
            <div className={cn(styles.monthName, 'dark:text-[#D9EAD3]')}>
              <span>{MONTH_NAMES[Number(month) - 1]}</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className={cn(styles.accordionContent)}>
            <div className={styles.contentWrapper}>
              {isFetching ? (
                <Loader className={styles.accordionContentLoader} />
              ) : tournamentList.length > 0 ? (
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

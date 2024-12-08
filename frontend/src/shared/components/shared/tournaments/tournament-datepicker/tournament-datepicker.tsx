import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui';
import { CURRENT_YEAR_FULL, NEXT_YEAR, PREVIOUS_YEAR } from '@/shared/constants';
import { cn } from '@/shared/lib';
import { Tournament } from '@/shared/types/tournament.types';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import React from 'react';

import styles from './tournament-datepicker.module.css';

interface Props {
  value: string;
  onChange: (date: Date | undefined) => void;
  existingTournament: Tournament | undefined;
  className?: string;
}

export const TournamentDatePicker: React.FC<Props> = ({ value, onChange, existingTournament, className }) => {
  const getDateFromState = (dateString: string) => {
    const dateParts = dateString.split('.');

    if (dateParts.length === 3) {
      const [day, month, year] = dateParts;
      return new Date(`${parseInt(year) + 2000}-${month}-${day}`);
    }

    return null;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' className={cn(styles.button, className)} icon={CalendarIcon}>
          {value ? format(getDateFromState(value) || new Date(), 'PPP', { locale: ru }) : <span>Выберите дату</span>}
          {/*<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />*/}
        </Button>
      </PopoverTrigger>
      <PopoverContent align='start' className={styles.popoverContent}>
        <Calendar
          required
          mode='single'
          initialFocus
          captionLayout='dropdown-buttons'
          selected={getDateFromState(value) || undefined}
          onSelect={(date) => {
            if (date) onChange(date);
          }}
          fromYear={
            existingTournament && Number(existingTournament.tournamentYear) === PREVIOUS_YEAR
              ? PREVIOUS_YEAR
              : CURRENT_YEAR_FULL
          }
          toYear={NEXT_YEAR}
          defaultMonth={getDateFromState(value) || new Date()}
          locale={ru}
        />
      </PopoverContent>
    </Popover>
  );
};

'use client';

import { Button, Calendar, Label, Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui';
import { CURRENT_YEAR_FULL } from '@/shared/constants';
import { cn } from '@/shared/lib';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { format, parse } from 'date-fns';
import { ru } from 'date-fns/locale';

import React from 'react';

import styles from './users-date-picker.module.css';

interface Props {
  value: string;
  onChange: (date: Date | undefined) => void;
  label: string;
  addUserAdmin?: boolean;
  className?: string;
}

export const UsersDatePicker: React.FC<Props> = ({ value, onChange, label, addUserAdmin, className }) => {
  const parseDate = (dateString: string): Date | undefined => {
    const [day, month, year] = dateString.split('.');

    if (day && month && year) {
      return parse(`${year}-${month}-${day}`, 'yyyy-MM-dd', new Date());
    }

    return undefined;
  };

  return (
    <div className={className}>
      <div className={styles.container}>
        <Label className={styles.label}>{label}</Label>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={`${cn(styles.buttonOutline, 'dark:bg-transparent', 'dark:border-gray-300')} ${addUserAdmin ? 'py-5' : 'py-6'}`}
          >
            {value ? format(parseDate(value) || new Date(), 'PPP', { locale: ru }) : <span>Дата рождения</span>}
            <CalendarIcon className={styles.icon} />
          </Button>
        </PopoverTrigger>
        <PopoverContent align='start' className={styles.popoverContent}>
          <Calendar
            mode='single'
            initialFocus
            captionLayout='dropdown-buttons'
            selected={parseDate(value) || undefined}
            onSelect={(date) => {
              if (date) onChange(date);
            }}
            fromYear={1940}
            toYear={CURRENT_YEAR_FULL}
            defaultMonth={parseDate(value) || new Date()}
            locale={ru}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

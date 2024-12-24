'use client';

import { Button, Calendar, Label, Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui';
import { cn, getParser } from '@/shared/lib';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

import React from 'react';

import styles from './custom-datepicker.module.css';

interface Props {
  mode: 'calendar' | 'users';
  value: string;
  onChange: (date: Date | undefined) => void;
  label: string;
  className?: string;
  fromYear: number;
  toYear: number;
  buttonClassName?: string;
}

export const CustomDatepicker: React.FC<Props> = ({
  mode,
  value,
  onChange,
  label,
  className,
  fromYear,
  toYear,
  buttonClassName,
}) => {
  const parseDate = getParser(mode);

  return (
    <div className={className}>
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={cn(
              styles.button,
              'dark:bg-transparent',
              'dark:border-gray-300',
              'focus:dark:border-gray-300',
              buttonClassName,
            )}
          >
            {value ? (
              format(parseDate(value) || new Date(), 'PPP', { locale: ru })
            ) : (
              <span className={styles.datepickerPlaceholder}>Выберите дату</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align='start' className={styles.popoverContent} side={'top'}>
          <Calendar
            mode='single'
            initialFocus
            captionLayout='dropdown-buttons'
            selected={parseDate(value) || undefined}
            onSelect={(date) => {
              if (date) onChange(date);
            }}
            fromYear={fromYear}
            toYear={toYear}
            defaultMonth={parseDate(value) || new Date()}
            locale={ru}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

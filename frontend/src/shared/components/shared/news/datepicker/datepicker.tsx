'use client';

import { useDatePicker } from '@/shared/components/shared';
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { XIcon } from 'lucide-react';

import React from 'react';

import styles from './datepicker.module.css';

export const DatePicker: React.FC = () => {
  const { selectedDates, handleDateSelect, handleResetDates } = useDatePicker();

  return (
    <div className={cn(styles.datePickerBlock)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'outline'} className={cn(styles.filterSetDate, 'h-12 group')}>
            {selectedDates.startDate ? (
              format(selectedDates.startDate, 'PPP', { locale: ru })
            ) : (
              <span className='text-tn-default-black'>Начало даты</span>
            )}
            <ChevronDownIcon
              className='relative ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180'
              aria-hidden='true'
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn(styles.datePopoverContent)}>
          <Calendar
            mode='single'
            selected={selectedDates.startDate}
            onSelect={(date) => handleDateSelect(date, 'startDate')}
            initialFocus
            locale={ru}
          />
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'outline'} className={cn(styles.filterSetDate, 'h-12 group')}>
            {selectedDates.endDate ? (
              format(selectedDates.endDate, 'PPP', { locale: ru })
            ) : (
              <span className='text-tn-default-black'>Конец даты</span>
            )}
            <ChevronDownIcon
              className='relative ml-1 h-3 w-3 transition duration-300 group-data-[state=open]:rotate-180'
              aria-hidden='true'
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={cn(styles.datePopoverContent)}>
          <Calendar
            mode='single'
            selected={selectedDates.endDate}
            onSelect={(date) => handleDateSelect(date, 'endDate')}
            initialFocus
            locale={ru}
          />
        </PopoverContent>
      </Popover>
      {(selectedDates.startDate !== undefined || selectedDates.endDate !== undefined) && (
        <Button
          variant={'outline'}
          onClick={handleResetDates}
          className={cn(styles.filterSetDate, styles.resetButton, 'h-12')}
        >
          Сбросить
          <XIcon />
        </Button>
      )}
    </div>
  );
};
import { Button, Calendar, Label, Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { format, parse } from 'date-fns';
import { ru } from 'date-fns/locale';

import React from 'react';

interface Props {
  value: string;
  onChange: (date: Date | undefined) => void;
  label: string;
  addUserAdmin?: boolean;
}

export const UserDatePicker: React.FC<Props> = ({ value, onChange, label, addUserAdmin }) => {
  const CURRENT_YEAR_FULL = new Date().getFullYear();

  const parseDate = (dateString: string): Date | undefined => {
    const [day, month, year] = dateString.split('.');

    if (day && month && year) {
      return parse(`${year}-${month}-${day}`, 'yyyy-MM-dd', new Date());
    }

    return undefined;
  };

  return (
    <div>
      <div className='flex items-center justify-between mb-0.5'>
        <Label className='text-base font-medium block'>{label}</Label>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' className={`w-full font-normal ${addUserAdmin ? 'py-5' : 'py-6'}`}>
            {value ? format(parseDate(value) || new Date(), 'PPP', { locale: ru }) : <span>Дата рождения</span>}
            <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent align='start' className='w-full p-0'>
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

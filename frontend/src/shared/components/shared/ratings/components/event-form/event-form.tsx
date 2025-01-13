import { useEvent } from '@/shared/components/shared/ratings/hooks/use-event';
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { Event, EventMutation } from '@/shared/types/event.types';
import { Rating } from '@/shared/types/rating.types';

import React from 'react';

import styles from '../../rating-form.module.css';

interface Props {
  ratings: Rating[];
  event?: Event;
  onSubmit: (eventMutation: EventMutation) => void;
}

export const EventForm: React.FC<Props> = ({ ratings, event, onSubmit }) => {
  const { eventMutation, eventFetching, handleChange, handleSelectChange, handleSubmit, isFormValid } = useEvent({
    event,
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit}>
      <div className={cn(styles.inputGroup)}>
        <Label htmlFor='category' className={cn(styles.label)}>
          Категория
        </Label>
        <Input id='category' placeholder={'Введите Категорию'} onChange={handleChange} value={eventMutation.category} />
      </div>
      <div className={cn(styles.inputGroup)}>
        <Label htmlFor='category' className={cn(styles.label)}>
          Разряд
        </Label>
        <Input id='rank' placeholder={'Введите Разряд'} onChange={handleChange} value={eventMutation.rank} />
      </div>

      <div className={cn(styles.inputGroup)}>
        <Label htmlFor='rating' className={cn(styles.label)}>
          Рейтинг
        </Label>
        <Select value={eventMutation.rating} onValueChange={(v) => handleSelectChange(v, 'rating')}>
          <SelectTrigger id='rating'>
            <SelectValue placeholder='Выберите рейтинг' />
          </SelectTrigger>
          <SelectContent className={'dark:bg-gray-900'}>
            {ratings.map((rating) => (
              <SelectItem
                key={rating._id}
                value={rating._id}
                className={cn('hover:dark:bg-gray-800 focus:dark:bg-gray-800')}
              >
                {rating.year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className={cn(styles.inputGroup)}>
        <Label htmlFor='link' className={cn(styles.label)}>
          Ссылка
        </Label>
        <Input id='link' placeholder='Введите ссылку' type='url' onChange={handleChange} value={eventMutation.link} />
      </div>

      <Button disabled={!isFormValid || eventFetching} className={cn(styles.addButton)} type='submit'>
        {eventFetching ? 'Загрузка…' : 'Сохранить'}
      </Button>
    </form>
  );
};

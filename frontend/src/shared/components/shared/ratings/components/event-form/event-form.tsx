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
import { getMonth } from '@/shared/lib/helpers/get-month';
import { Event, EventMutation } from '@/shared/types/event.types';
import { Rating } from '@/shared/types/rating.types';

import React from 'react';

interface Props {
  ratings: Rating[];
  event?: Event;
  onSubmit: (eventMutation: EventMutation) => void;
}

export const EventForm: React.FC<Props> = ({ ratings, event, onSubmit }) => {
  const {
    eventMutation,
    categories,
    categoriesFetching,
    eventFetching,
    handleChange,
    handleSelectChange,
    handleSubmit,
    isFormValid,
  } = useEvent({ event, onSubmit });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor='category'>Категория</Label>
        <Select value={eventMutation.category} onValueChange={(v) => handleSelectChange(v, 'category')}>
          <SelectTrigger id='category'>
            <SelectValue placeholder='Выберите категорию' />
          </SelectTrigger>
          <SelectContent>
            {categoriesFetching ? (
              <SelectItem value='null' disabled>
                Загрузка…
              </SelectItem>
            ) : (
              categories.map((category) => (
                <SelectItem key={category._id} value={category._id}>
                  {category.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor='rating'>Рейтинг</Label>
        <Select value={eventMutation.rating} onValueChange={(v) => handleSelectChange(v, 'rating')}>
          <SelectTrigger id='rating'>
            <SelectValue placeholder='Выберите рейтинг' />
          </SelectTrigger>
          <SelectContent>
            {ratings.map((rating) => (
              <SelectItem key={rating._id} value={rating._id}>
                {getMonth(rating.month)} {rating.year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor='link'>Ссылка</Label>
        <Input id='link' placeholder='Введите ссылку' type='url' onChange={handleChange} value={eventMutation.link} />
      </div>

      <Button disabled={!isFormValid || eventFetching} className='mt-3 w-full' type='submit'>
        {eventFetching ? 'Загрузка…' : 'Сохранить'}
      </Button>
    </form>
  );
};

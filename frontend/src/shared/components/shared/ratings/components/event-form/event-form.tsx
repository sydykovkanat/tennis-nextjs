'use client';

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
import { useAppDispatch, useAppSelector } from '@/shared/lib';
import { selectCategories, selectCategoriesFetching } from '@/shared/lib/features/categories/category-slice';
import { fetchCategories } from '@/shared/lib/features/categories/category-thunks';
import { selectEventFetching } from '@/shared/lib/features/rating/rating-slice';
import { getMonth } from '@/shared/lib/helpers/get-month';
import { Event, EventMutation } from '@/shared/types/event.types';
import { Rating } from '@/shared/types/rating.types';

import React from 'react';

interface Props {
  onSubmit: (eventMutation: EventMutation) => void;
  ratings: Rating[];
  event?: Event;
}

const initialState: EventMutation = {
  rating: '',
  category: '',
  link: '',
};

export const EventForm: React.FC<Props> = ({ onSubmit, ratings, event }) => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoriesFetching = useAppSelector(selectCategoriesFetching);
  const [eventMutation, setEventMutation] = React.useState<EventMutation>(initialState);
  const eventFetching = useAppSelector(selectEventFetching);

  React.useEffect(() => {
    if (event) {
      setEventMutation({
        rating: event.rating._id,
        category: event.category._id,
        link: event.link,
      });
    } else {
      setEventMutation(initialState);
    }
  }, [event]);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setEventMutation({ ...eventMutation, [id]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit({ ...eventMutation });
    setEventMutation(initialState);
  };

  const handleSelectChange = (v: string, id: string) => {
    setEventMutation({ ...eventMutation, [id]: v });
  };

  const isFormValid = eventMutation.rating && eventMutation.category && eventMutation.link;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor={'category'}>Категория</Label>
        <Select value={eventMutation.category} onValueChange={(v) => handleSelectChange(v, 'category')}>
          <SelectTrigger id={'category'}>
            <SelectValue placeholder={'Выберите категорию'} />
          </SelectTrigger>
          <SelectContent>
            {categoriesFetching ? (
              <SelectItem value={'null'} disabled>
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
        <Label htmlFor={'rating'}>Рейтинг</Label>
        <Select value={eventMutation.rating} onValueChange={(v) => handleSelectChange(v, 'rating')}>
          <SelectTrigger id={'rating'}>
            <SelectValue placeholder={'Выберите рейтинг'} />
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
        <Label htmlFor={'link'}>Ссылка</Label>
        <Input
          id={'link'}
          placeholder={'Введите ссылку'}
          type={'url'}
          onChange={handleChange}
          value={eventMutation.link}
        />
      </div>

      <Button disabled={!isFormValid || eventFetching} className={'mt-3 w-full'} type={'submit'}>
        {eventFetching ? 'Загрузка…' : 'Сохранить'}
      </Button>
    </form>
  );
};

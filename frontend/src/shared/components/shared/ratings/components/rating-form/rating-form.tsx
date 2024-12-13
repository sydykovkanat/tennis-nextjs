import { Loader } from '@/shared/components/shared';
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { fetchCategories } from '@/shared/lib/features/categories/category-thunks';
import { selectRatingsCreating } from '@/shared/lib/features/rating/rating-slice';
import { RatingMutation } from '@/shared/types/rating.types';

import React, { type ChangeEvent, type FormEvent, useEffect } from 'react';

interface Props {
  onSubmit: (rating: RatingMutation) => void;
}

const initialState: RatingMutation = {
  year: '',
  month: '',
  chapter: '',
};

export const RatingForm: React.FC<Props> = ({ onSubmit }) => {
  const [ratingMutation, setRatingMutation] = React.useState<RatingMutation>(initialState);
  const dispatch = useAppDispatch();
  const ratingsCreating = useAppSelector(selectRatingsCreating);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleYearChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const year = Number(value);

    if (value.length > 4 || isNaN(year)) return;

    if (year > new Date().getFullYear()) return;

    setRatingMutation((prev) => ({
      ...prev,
      year: value,
    }));
  };

  const handleSelectChange = (value: string, id: string) => {
    const name = id === 'month' ? 'month' : 'chapter';
    setRatingMutation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSubmit({ ...ratingMutation });
  };

  const isFormValid = ratingMutation.year.length === 4 && ratingMutation.month !== '' && ratingMutation.chapter !== '';

  const months = [
    {
      name: 'Январь',
      value: 'january',
    },
    {
      name: 'Февраль',
      value: 'february',
    },
    {
      name: 'Март',
      value: 'march',
    },
    {
      name: 'Апрель',
      value: 'april',
    },
    {
      name: 'Май',
      value: 'may',
    },
    {
      name: 'Июнь',
      value: 'june',
    },
    {
      name: 'Июль',
      value: 'july',
    },
    {
      name: 'Август',
      value: 'august',
    },
    {
      name: 'Сентябрь',
      value: 'september',
    },
    {
      name: 'Октябрь',
      value: 'october',
    },
    {
      name: 'Ноябрь',
      value: 'november',
    },
    {
      name: 'Декабрь',
      value: 'december',
    },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor={'month'}>Месяц</Label>
        <Select value={ratingMutation.month} onValueChange={(v) => handleSelectChange(v, 'month')}>
          <SelectTrigger id={'month'} className={'capitalize'}>
            <SelectValue placeholder={'Выберите месяц'} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {months.map((month) => (
                <SelectItem className={'capitalize'} key={month.value} value={month.value}>
                  {month.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor={'chapter'}>Раздел</Label>
        <Select value={ratingMutation.chapter} onValueChange={(v) => handleSelectChange(v, 'chapter')}>
          <SelectTrigger id={'chapter'} className={'capitalize'}>
            <SelectValue placeholder={'Выберите раздел'} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {['male', 'female', 'mixed'].map((chapter) => (
                <SelectItem className={'capitalize'} key={chapter} value={chapter}>
                  {chapter === 'mixed' ? 'Смешанный' : chapter === 'male' ? 'Мужской' : 'Женский'}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor={'year'}>Год</Label>
        <Input id={'year'} placeholder={'Введите год'} onChange={handleYearChange} value={ratingMutation.year} />
      </div>

      <Button disabled={!isFormValid || ratingsCreating} className={'w-full mt-4'} size={'sm'}>
        Добавить {ratingsCreating && <Loader theme={'light'} />}
      </Button>
    </form>
  );
};

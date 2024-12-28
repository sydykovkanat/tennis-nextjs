'use client';

import { Loader } from '@/shared/components/shared';
import { useRatingForm } from '@/shared/components/shared/ratings/hooks/use-rating-form';
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
import { RatingMutation } from '@/shared/types/rating.types';

import React from 'react';

interface Props {
  onSubmit: (rating: RatingMutation) => void;
}

export const RatingForm: React.FC<Props> = ({ onSubmit }) => {
  const { ratingMutation, handleYearChange, handleSelectChange, handleSubmit, isFormValid, ratingsCreating } =
    useRatingForm(onSubmit);

  const months = [
    { name: 'Январь', value: 'january' },
    { name: 'Февраль', value: 'february' },
    { name: 'Март', value: 'march' },
    { name: 'Апрель', value: 'april' },
    { name: 'Май', value: 'may' },
    { name: 'Июнь', value: 'june' },
    { name: 'Июль', value: 'july' },
    { name: 'Август', value: 'august' },
    { name: 'Сентябрь', value: 'september' },
    { name: 'Октябрь', value: 'october' },
    { name: 'Ноябрь', value: 'november' },
    { name: 'Декабрь', value: 'december' },
  ];

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor={'month'}>Месяц</Label>
        <Select value={ratingMutation.month} onValueChange={(v) => handleSelectChange(v, 'month')}>
          <SelectTrigger id={'month'} className={'capitalize'}>
            <SelectValue placeholder={'Выберите месяц'} />
          </SelectTrigger>
          <SelectContent className={'dark:bg-gray-900'}>
            <SelectGroup>
              {months.map((month) => (
                <SelectItem
                  className={'capitalize hover:dark:bg-gray-800 focus:dark:bg-gray-800'}
                  key={month.value}
                  value={month.value}
                >
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
          <SelectContent className={'dark:bg-gray-900'}>
            <SelectGroup>
              {['male', 'female', 'mixed'].map((chapter) => (
                <SelectItem
                  className={'capitalize hover:dark:bg-gray-800 focus:dark:bg-gray-800'}
                  key={chapter}
                  value={chapter}
                >
                  {chapter === 'mixed' ? 'Смешанный' : chapter === 'male' ? 'Мужской' : 'Женский'}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor={'year'}>Год</Label>
        <Input id={'year'} placeholder={'Введите год (2024)'} onChange={handleYearChange} value={ratingMutation.year} />
      </div>

      <Button disabled={!isFormValid || ratingsCreating} className={'w-full mt-7'}>
        Добавить {ratingsCreating && <Loader theme={'light'} />}
      </Button>
    </form>
  );
};

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
import { cn } from '@/shared/lib';
import { RatingMutation } from '@/shared/types/rating.types';

import React from 'react';

import styles from '../../rating-form.module.css';

interface Props {
  onSubmit: (rating: RatingMutation) => void;
}

export const RatingForm: React.FC<Props> = ({ onSubmit }) => {
  const { ratingMutation, handleYearChange, handleSelectChange, handleSubmit, isFormValid, ratingsCreating } =
    useRatingForm(onSubmit);

  return (
    <form onSubmit={handleSubmit}>
      <div className={cn(styles.inputGroup)}>
        <Label htmlFor={'year'} className={cn(styles.label)}>
          Год
        </Label>
        <Input id={'year'} placeholder={'Введите год (2024)'} onChange={handleYearChange} value={ratingMutation.year} />
      </div>
      <div className={cn(styles.inputGroup)}>
        <Label htmlFor={'chapter'} className={cn(styles.label)}>
          Раздел
        </Label>
        <Select value={ratingMutation.chapter} onValueChange={(v) => handleSelectChange(v, 'chapter')}>
          <SelectTrigger id={'chapter'} className={'capitalize'}>
            <SelectValue placeholder={'Выберите раздел'} />
          </SelectTrigger>
          <SelectContent className={'dark:bg-gray-900'}>
            <SelectGroup>
              {['male', 'female', 'mixed'].map((chapter) => (
                <SelectItem
                  className={cn('capitalize hover:dark:bg-gray-800 focus:dark:bg-gray-800')}
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

      <Button disabled={!isFormValid || ratingsCreating} className={cn(styles.addButton)}>
        Добавить {ratingsCreating && <Loader theme={'light'} />}
      </Button>
    </form>
  );
};

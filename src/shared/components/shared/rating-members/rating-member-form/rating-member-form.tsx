// 'use client';
import { ErrorMessage, WarningMessage } from '@/shared/components/shared';
import { useRatingMembersForm } from '@/shared/components/shared/rating-members/hooks';
import {
  Button,
  DialogClose,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui';
import { getGenderTitles } from '@/shared/lib/helpers/rating-member-utils';
import { RatingMember, RatingMemberMutation } from '@/shared/types/rating-member.types';

import React from 'react';

import styles from './rating-member-from.module.css';

export interface RatingMembersProps {
  forWhichGender: 'male' | 'female';
  onSubmit: (ratingMember: RatingMemberMutation) => void;
  existingMember?: RatingMember;
  isLoading?: boolean;
  onClose?: () => void;
  ratingMembers: RatingMember[];
}

export const RatingMemberForm: React.FC<RatingMembersProps> = ({
  forWhichGender,
  onSubmit,
  existingMember,
  isLoading,
  onClose,
  ratingMembers,
}) => {
  const { dialogTitle } = getGenderTitles(forWhichGender);
  const {
    state,
    places,
    existingName,
    maxMembersExceeded,
    isFormInvalid,
    handleChange,
    handleChangeSelect,
    fileInputChangeHandler,
    handleSubmit,
  } = useRatingMembersForm(ratingMembers, forWhichGender, onSubmit, existingMember, isLoading);

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.formContainer}>
        <div className={styles.fieldContainer}>
          <Input
            required
            id='name'
            name='name'
            placeholder='Введите имя участника'
            value={state.name}
            label='Имя'
            onChange={handleChange}
          />
          {((!existingMember && existingName) ||
            (existingMember && existingMember.name !== state.name && existingName)) && (
            <ErrorMessage>Имя уже занято!</ErrorMessage>
          )}
        </div>

        {forWhichGender === 'male' && (
          <div className={styles.fieldContainer}>
            <Label htmlFor='ratingType'>Топ</Label>
            <Select
              name='ratingType'
              value={state.ratingType}
              onValueChange={(value) => handleChangeSelect(value, 'ratingType')}
            >
              <SelectTrigger id='place'>
                <SelectValue placeholder='Укажите топ' />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='mensTop8'>Топ-8</SelectItem>
                  <SelectItem value='mensTop3'>Топ-3</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className={styles.fieldContainer}>
          <Label htmlFor='place'>Место</Label>
          <Select
            required
            name='place'
            value={state.place}
            onValueChange={(value) => handleChangeSelect(value, 'place')}
            disabled={forWhichGender === 'male' && !state.ratingType}
          >
            <SelectTrigger id='place'>
              <SelectValue placeholder='Укажите место' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {forWhichGender === 'male' && state.ratingType === 'mensTop8'
                  ? places.map((place) => (
                      <SelectItem key={place} value={place}>
                        {place}
                      </SelectItem>
                    ))
                  : places.map((place) => (
                      <SelectItem key={place} value={place}>
                        {place}
                      </SelectItem>
                    ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {forWhichGender === 'male' && !state.ratingType && <ErrorMessage>Сначала выберите топ</ErrorMessage>}
        </div>

        <div className={styles.fileInputContainer}>
          <Input id='image' name='image' type='file' accept='image/*' label='Фото' onChange={fileInputChangeHandler} />
        </div>
      </div>

      {!existingMember && maxMembersExceeded && (
        <WarningMessage
          message={`Максимальное количество участников для ${
            state.ratingType === 'mensTop8' ? 'Топ-8' : 'Топ-3'
          } ${dialogTitle} рейтинга уже добавлено. 
          Вы можете удалить или редактировать участников, но не добавлять новых.`}
        />
      )}
      {existingMember && maxMembersExceeded && (
        <WarningMessage
          message={`Вы не можете переместить участника в ${
            state.ratingType === 'mensTop8' ? 'Топ-8' : 'Топ-3'
          }, так как там уже достигнуто максимальное количество участников.`}
        />
      )}

      <div className={styles.fieldContainer}>
        <Button type='submit' disabled={isFormInvalid}>
          Сохранить
        </Button>
        <DialogClose asChild>
          <Button type='button' variant='secondary' onClick={onClose}>
            Отмена
          </Button>
        </DialogClose>
      </div>
    </form>
  );
};

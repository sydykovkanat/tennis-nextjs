import { ErrorMessage, WarningMessage } from '@/shared/components/shared';
import { useRatingMembersForm } from '@/shared/components/shared/rating-members/hooks';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui';
import { getGenderTitles } from '@/shared/lib';
import { RatingMember } from '@/shared/types/rating-member.types';

import React, { PropsWithChildren } from 'react';

import styles from './rating-member-from.module.css';

export interface RatingMembersProps extends PropsWithChildren {
  id?: string;
  forWhichGender: 'male' | 'female';
  existingMember?: RatingMember;
  ratingMembers: RatingMember[];
  open?: boolean;
  setOpen?: (open: boolean) => void;
}

export const RatingMemberForm: React.FC<RatingMembersProps> = ({
  id,
  forWhichGender,
  existingMember,
  ratingMembers,
  open,
  setOpen,
  children,
}) => {
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
    handleClose,
  } = useRatingMembersForm(ratingMembers, forWhichGender, existingMember, setOpen, id);
  const { dialogTitle } = getGenderTitles(forWhichGender);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            {`${existingMember ? 'Редактировать' : 'Добавить'} участника ${dialogTitle} рейтинга`}
          </DialogTitle>
        </DialogHeader>
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

            <Input
              id='image'
              name='image'
              type='file'
              accept='image/*'
              label='Фото'
              onChange={fileInputChangeHandler}
            />
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
              {existingMember ? 'Редактировать' : 'Сохранить'}
            </Button>
            <DialogClose asChild>
              <Button type='button' variant='secondary' onClick={handleClose}>
                Отмена
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

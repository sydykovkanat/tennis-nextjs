import { useCategoriesEdit } from '@/shared/components/shared/rating-members/hooks';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
} from '@/shared/components/ui';
import { Pencil } from 'lucide-react';

import React from 'react';

import styles from './rating-categories.module.css';

interface Props {
  existingMensCategoryTop8: string;
  existingMensCategoryTop3: string;
  existingWomensCategoryTop3: string;
}

export const RatingMembersCategoriesEdit: React.FC<Props> = ({
  existingMensCategoryTop8,
  existingMensCategoryTop3,
  existingWomensCategoryTop3,
}) => {
  const { state, handleChange, open, setOpen, isFormInvalid, handleOpen, handleClose, handleSubmit } =
    useCategoriesEdit(existingMensCategoryTop8, existingMensCategoryTop3, existingWomensCategoryTop3);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={handleOpen} className={styles.button} icon={Pencil}>
          Изменить категории
        </Button>
      </DialogTrigger>
      <DialogContent className={'dark:bg-[#1F2937]'} aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Редактировать категории рейтинга</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className={styles.formInner}>
            <Input
              required
              id='mensCategoryTop8'
              name='mensCategoryTop8'
              placeholder='Введите категорию для мужского топ-8'
              value={state.mensCategoryTop8}
              label='Мужская категория для топ-8'
              onChange={handleChange}
            />

            <Input
              required
              id='mensCategoryTop3'
              name='mensCategoryTop3'
              placeholder='Введите категорию для мужского топ-3'
              value={state.mensCategoryTop3}
              label='Мужская категория для топ-3'
              onChange={handleChange}
            />

            <Input
              required
              id='womensCategoryTop3'
              name='womensCategoryTop3'
              placeholder='Введите категорию для женского топ-3'
              value={state.womensCategoryTop3}
              label='Женская категория для топ-3'
              onChange={handleChange}
            />
          </div>
          <div className={styles.formActionsWrapper}>
            <Button type='submit' disabled={isFormInvalid}>
              Сохранить
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

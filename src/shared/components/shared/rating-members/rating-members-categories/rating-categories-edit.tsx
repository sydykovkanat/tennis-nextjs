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
import { PencilSquareIcon } from '@heroicons/react/24/outline';

import React from 'react';

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
        <Button onClick={handleOpen} className='w-full xs:w-max'>
          Изменить категории <PencilSquareIcon />
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Редактировать категории рейтинга</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-3 pt-3 pb-5'>
            <div className='flex flex-col gap-1'>
              <Input
                required
                id='mensCategoryTop8'
                name='mensCategoryTop8'
                placeholder='Введите категорию для мужского топ-8'
                value={state.mensCategoryTop8}
                label='Мужская категория для топ-8'
                onChange={handleChange}
              />
            </div>

            <div className='flex flex-col gap-1'>
              <Input
                required
                id='mensCategoryTop3'
                name='mensCategoryTop3'
                placeholder='Введите категорию для мужского топ-3'
                value={state.mensCategoryTop3}
                label='Мужская категория для топ-3'
                onChange={handleChange}
              />
            </div>

            <div className='flex flex-col gap-1'>
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
          </div>
          <div className='flex flex-col gap-1'>
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

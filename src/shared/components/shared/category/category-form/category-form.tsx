'use client';

import { Loader, useCategoryForm } from '@/shared/components/shared';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { createCategory } from '@/shared/lib/features/categories/category-thunks';
import { Category } from '@/shared/types/category.types';

import React, { FormEvent, PropsWithChildren } from 'react';
import { useAppDispatch } from '@/shared/lib/store';

interface Props extends PropsWithChildren {
  categories: Category[];
  className?: string;
}

export const CategoryForm: React.FC<Props> = ({ categories, children, className }) => {
  const { category, setCategory, open, setOpen, handleChange, isBlocked, closeRef, categoryCreating } = useCategoryForm({
    categories: categories,
  });

  const dispatch = useAppDispatch();

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      const { toast } = await import('sonner');

      closeRef.current?.click();
      await dispatch(createCategory(category)).unwrap();
      setCategory('');
      toast.success('Категория успешно добавлена.');
    } catch (error) {
      const { toast } = await import('sonner');
      console.error(error);
      toast.error('Ошибка при добавлении категории.');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Добавить категорию</DialogTitle>
          <DialogDescription>Заполните форму перед добавлением.</DialogDescription>

          <form onSubmit={handleSubmit} className={cn(className)}>
            <div className={'mb-2 text-left'}>
              <div className={'flex items-center justify-between gap-2 mb-1'}>
                <Label htmlFor={'category'}>Название</Label>
                {isBlocked && (
                  <small className={'text-red-600 leading-none'}>Категория {category} уже существует.</small>
                )}
              </div>
              <Input
                placeholder={'Введите название категории'}
                id={'category'}
                onChange={handleChange}
                value={category}
              />
            </div>

            <div className={'flex flex-col gap-1'}>
              <Button disabled={categoryCreating || category.length === 0 || isBlocked} size={'sm'}>
                Добавить {categoryCreating && <Loader size={'sm'} theme={'light'} />}
              </Button>
              <DialogClose ref={closeRef} asChild>
                <Button disabled={categoryCreating} type={'button'} variant={'outline'}>
                  Отменить
                </Button>
              </DialogClose>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

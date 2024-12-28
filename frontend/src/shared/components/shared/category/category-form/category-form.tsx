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
import { cn, useAppDispatch } from '@/shared/lib';
import { createCategory, fetchCategory, updateCategory } from '@/shared/lib/features/categories/category-thunks';

import React, { FormEvent, PropsWithChildren, useEffect } from 'react';

import styles from './category-form.module.css';

interface Props extends PropsWithChildren {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categoryId?: string;
  isEdit?: boolean;
  className?: string;
}

export const CategoryForm: React.FC<Props> = ({ open, setOpen, categoryId, isEdit = false, className, children }) => {
  const {
    category,
    fetchedCategory,
    categoryFetching,
    categoryUpdating,
    setCategory,
    handleChange,
    isBlocked,
    closeRef,
    categoryCreating,
  } = useCategoryForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (categoryId) {
      dispatch(fetchCategory(categoryId)).unwrap();
    }
  }, [categoryId, dispatch]);

  useEffect(() => {
    if (fetchedCategory) {
      setCategory(fetchedCategory.name);
    }
  }, [fetchedCategory, setCategory]);

  const handleSubmit = async (event: FormEvent) => {
    try {
      event.preventDefault();
      const { toast } = await import('sonner');

      closeRef.current?.click();

      if (isEdit && categoryId) {
        await dispatch(updateCategory({ id: categoryId, name: category })).unwrap();
        toast.success('Категория успешно отредактирована.');
      } else {
        await dispatch(createCategory(category)).unwrap();
        setCategory('');
        toast.success('Категория успешно добавлена.');
      }
    } catch (error) {
      console.error(error);
      const { toast } = await import('sonner');
      toast.error(isEdit ? 'Ошибка при редактировании категории' : 'Ошибка при добавлении категории');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={'dark:bg-[#1F2937]'}>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Редактировать категорию' : 'Добавить категорию'}</DialogTitle>
          <DialogDescription className={'pb-3'}>Заполните форму перед добавлением</DialogDescription>

          {isEdit && categoryFetching ? (
            <Loader />
          ) : (
            <form onSubmit={handleSubmit} className={cn(className)}>
              <div className={cn(styles.mainBlock)}>
                <div className={cn(styles.inputBlock)}>
                  <Label htmlFor={'category'}>Название</Label>
                  {isBlocked && <small className={cn(styles.error)}>Категория {category} уже существует</small>}
                </div>
                <Input
                  placeholder={'Введите название категории'}
                  id={'category'}
                  onChange={handleChange}
                  value={category}
                />
              </div>

              <div className={cn(styles.buttonBlock)}>
                <Button disabled={categoryCreating || category.length === 0 || isBlocked} size={'sm'}>
                  {isEdit ? 'Редактировать' : 'Добавить'}
                  {(categoryCreating || categoryUpdating) && <Loader size={'sm'} theme={'light'} />}
                </Button>
                <DialogClose ref={closeRef} asChild>
                  <Button disabled={categoryCreating} type={'button'} variant={'outline'}>
                    Отменить
                  </Button>
                </DialogClose>
              </div>
            </form>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

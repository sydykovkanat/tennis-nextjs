'use client';

import { CategoryForm, Loader, useCategoryForm } from '@/shared/components/shared';
import { Button, Card } from '@/shared/components/ui';
import { CardContent } from '@/shared/components/ui/card';
import { cn, formatDate } from '@/shared/lib';
import { selectCategoryDeleting } from '@/shared/lib/features/categories/category-slice';
import { removeCategory } from '@/shared/lib/features/categories/category-thunks';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import { Category } from '@/shared/types/category.types';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import React from 'react';
import styles from './category-card.module.css';


interface Props {
  category: Category;
}

export const CategoryCard: React.FC<Props> = ({ category }) => {
  const { open, setOpen } = useCategoryForm();
  const dispatch = useAppDispatch();
  const categoryRemoving = useAppSelector(selectCategoryDeleting);

  const handleRemove = async () => {
    await dispatch(removeCategory(category._id)).unwrap();
  };

  return (
    <Card className={cn(styles.card)}>
      <CardContent className={cn(styles.contentBlock)}>
        <div>
          <h3 className={cn(styles.text)}>{category.name}</h3>
          <small className={'text-muted-foreground'}>
            Добавлено: {formatDate(category.createdAt, 'dd MMM yy, hh:mm')}
          </small>
        </div>

        <div className={'space-x-1 flex items-center'}>
          <Button size={'sm'} icon={TrashIcon} onClick={() => handleRemove()}>
            {categoryRemoving === category._id && <Loader size={'sm'} absolute />}
          </Button>
          <Button size={'sm'} className={'w-full xs:w-max'} icon={PencilSquareIcon} onClick={() => setOpen(true)} />
          {open && <CategoryForm open={open} setOpen={setOpen} isEdit categoryId={category._id} />}
        </div>
      </CardContent>
    </Card>
  );
};

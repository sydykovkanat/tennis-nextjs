'use client';

import { CategoryForm, Confirm, Loader, useCategoryForm } from '@/shared/components/shared';
import { Button, Card } from '@/shared/components/ui';
import { CardContent } from '@/shared/components/ui/card';
import { cn, formatDate, useAppDispatch, useAppSelector } from '@/shared/lib';
import { selectCategoryDeleting } from '@/shared/lib/features/categories/category-slice';
import { removeCategory } from '@/shared/lib/features/categories/category-thunks';
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
          <small className={cn(styles.createdAt)}>
            Добавлено: {formatDate(category.createdAt, 'dd MMM yy, hh:mm')}
          </small>
        </div>

        <div className={cn(styles.actionsBlock)}>
          <Confirm onOk={handleRemove}>
            <Button size={'sm'} icon={TrashIcon}>
              {categoryRemoving === category._id && <Loader size={'sm'} absolute />}
            </Button>
          </Confirm>
          <Button size={'sm'} icon={PencilSquareIcon} onClick={() => setOpen(true)} />
          {open && <CategoryForm open={open} setOpen={setOpen} isEdit categoryId={category._id} />}
        </div>
      </CardContent>
    </Card>
  );
};

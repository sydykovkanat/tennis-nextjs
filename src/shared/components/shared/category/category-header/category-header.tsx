'use client';

import { CategoryForm } from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { Category } from '@/shared/types/category.types';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';

import React from 'react';

import styles from './category-header.module.css';

interface Props {
  categories: Category[];
  className?: string;
}

export const CategoryHeader: React.FC<Props> = ({ categories, className }) => {
  return (
    <div className={cn(styles.container, className)}>
      <div>
        <h2 className={cn(styles.title)}>Категории</h2>
        <small className={cn(styles.subtitle)}>Список всех категорий и управление категориями.</small>
      </div>

      <CategoryForm categories={categories}>
        <Button className={'w-full xs:w-max'} icon={SquaresPlusIcon}>
          Добавить категорию
        </Button>
      </CategoryForm>
    </div>
  );
};

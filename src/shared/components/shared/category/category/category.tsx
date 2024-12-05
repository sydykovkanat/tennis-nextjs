'use client';

import { CategoryCard, CategoryForm } from '@/shared/components/shared';
import { cn } from '@/shared/lib';
import { Category as CategoryType } from '@/shared/types/category.types';

import React from 'react';

import styles from './category.module.css';

interface Props {
  categories: CategoryType[];
  categoriesFetching: boolean;
  className?: string;
}

export const Category: React.FC<Props> = ({ categories, categoriesFetching, className }) => {
  return (
    <>
      {!categoriesFetching && categories.length === 0 ? (
        <small className={cn(styles.errorText)}>
          Категории не найдены.
          {/*<CategoryForm>*/}
          {/*  <button className={cn(styles.warningButtonText)}>Добавьте категорию</button>*/}
          {/*</CategoryForm>*/}
        </small>
      ) : (
        <div className={cn(styles.container, className)}>
          {categories.map((category) => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      )}
    </>
  );
};

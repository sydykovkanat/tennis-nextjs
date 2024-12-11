'use client';

import { CategoryForm, useCategoryForm } from '@/shared/components/shared';
import { Button } from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { SquaresPlusIcon } from '@heroicons/react/24/outline';

import React from 'react';

import styles from './category-header.module.css';

interface Props {
  className?: string;
}

export const CategoryHeader: React.FC<Props> = ({ className }) => {
  const { open, setOpen } = useCategoryForm();

  return (
    <div className={cn(styles.container, className)}>
      <div>
        <h2 className={cn(styles.title)}>Категории</h2>
        <small className={cn(styles.subtitle)}>Список всех категорий и управление категориями.</small>
      </div>

      <Button className={cn(styles.addButton)} icon={SquaresPlusIcon} onClick={() => setOpen(true)}>
        Добавить категорию
      </Button>
      {open && <CategoryForm open={open} setOpen={setOpen} />}
    </div>
  );
};

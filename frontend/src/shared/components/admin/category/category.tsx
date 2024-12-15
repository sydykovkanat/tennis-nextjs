'use client';

import { useCategory } from '@/shared/components/admin/category/hooks/use-category';
import {
  AdminPageHeader,
  Category as CategoryComponent,
  CategoryForm,
  Loader,
  useCategoryForm,
} from '@/shared/components/shared';

import React from 'react';

export const Category = () => {
  const { categories, categoriesFetching } = useCategory();
  const { open, setOpen } = useCategoryForm();

  if (categoriesFetching) return <Loader fixed />;

  return (
    <>
      <AdminPageHeader
        title='Категории'
        description='Список всех категорий и управление категориями'
        buttonText='Добавить категорию'
        setOpen={() => setOpen(true)}
      />
      {open && <CategoryForm open={open} setOpen={setOpen} />}
      <CategoryComponent categories={categories} categoriesFetching={categoriesFetching} />
    </>
  );
};

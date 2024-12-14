'use client';

import { useCategory } from '@/shared/components/admin/category/hooks/use-category';
import { Category as CategoryComponent, CategoryHeader, Loader } from '@/shared/components/shared';

import React from 'react';

export const Category = () => {
  const { categories, categoriesFetching } = useCategory();

  if (categoriesFetching) return <Loader fixed />;

  return (
    <>
      <CategoryHeader />
      <CategoryComponent categories={categories} categoriesFetching={categoriesFetching} />
    </>
  );
};

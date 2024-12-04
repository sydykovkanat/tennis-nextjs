'use client';

import { useCategory } from '@/app/(root)/admin/category/(hooks)/use-category';
import { Category, CategoryHeader, Loader } from '@/shared/components/shared';

import React from 'react';

export default function CategoryPage() {
  const { categories, categoriesFetching } = useCategory();

  if (categoriesFetching) return <Loader fixed />;

  return (
    <>
      <CategoryHeader categories={categories} />
      <Category categories={categories} categoriesFetching={categoriesFetching} />
    </>
  );
}

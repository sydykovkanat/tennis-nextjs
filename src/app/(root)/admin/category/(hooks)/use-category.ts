'use client';

import { selectCategories, selectCategoriesFetching } from '@/shared/lib/features/categories/category-slice';
import { fetchCategories } from '@/shared/lib/features/categories/category-thunks';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';

export const useCategory = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const categoriesFetching = useAppSelector(selectCategoriesFetching);

  useEffect(() => {
    if (!categories.length) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  return { categories, categoriesFetching };
};

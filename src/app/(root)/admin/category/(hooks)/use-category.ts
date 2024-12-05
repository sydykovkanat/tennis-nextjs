'use client';

import { selectCategories, selectCategoriesFetching } from '@/shared/lib/features/categories/category-slice';
import { fetchCategories } from '@/shared/lib/features/categories/category-thunks';
import { useAppDispatch, useAppSelector } from '@/shared/lib/store';
import { useEffect } from 'react';


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

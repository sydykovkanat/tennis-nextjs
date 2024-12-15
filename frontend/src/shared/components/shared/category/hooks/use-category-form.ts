'use client';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import {
  selectCategories,
  selectCategory,
  selectCategoryCreating,
  selectCategoryFetching,
  selectCategoryUpdating,
} from '@/shared/lib/features/categories/category-slice';
import { fetchCategories } from '@/shared/lib/features/categories/category-thunks';

import React, { useEffect, useRef, useState } from 'react';

export const useCategoryForm = () => {
  const [category, setCategory] = useState<string>('');
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectCategories);
  const fetchedCategory = useAppSelector(selectCategory);
  const closeRef = useRef<HTMLButtonElement>(null);
  const blockedWords = categories.map((category) => category.name.toLowerCase());
  const isBlocked = blockedWords.includes(category.toLowerCase());
  const categoryFetching = useAppSelector(selectCategoryFetching);
  const categoryCreating = useAppSelector(selectCategoryCreating);
  const categoryUpdating = useAppSelector(selectCategoryUpdating);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCategory(value);
  };

  useEffect(() => {
    if (!categories && open) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories, open]);

  return {
    open,
    setOpen,
    handleChange,
    isBlocked,
    closeRef,
    category,
    fetchedCategory,
    categoryFetching,
    categoryUpdating,
    setCategory,
    categoryCreating,
  };
};

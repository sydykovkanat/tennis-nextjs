'use client';

import { selectCategoryCreating } from '@/shared/lib/features/categories/category-slice';
import { useAppSelector } from '@/shared/lib/store';
import { Category } from '@/shared/types/category.types';

import React, { useRef, useState } from 'react';

interface Props {
  categories: Category[];
}

export const useCategoryForm = ({ categories }: Props) => {
  const [category, setCategory] = useState<string>('');
  const [open, setOpen] = useState(false);

  const categoryCreating = useAppSelector(selectCategoryCreating);
  const closeRef = useRef<HTMLButtonElement>(null);
  const blockedWords = categories.map((category) => category.name.toLowerCase());
  const isBlocked = blockedWords.includes(category.toLowerCase());

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setCategory(value);
  };

  return {
    open,
    setOpen,
    handleChange,
    isBlocked,
    closeRef,
    category,
    setCategory,
    categoryCreating,
  };
};

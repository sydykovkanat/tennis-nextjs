'use client';

import { useCategory } from '@/shared/components/admin/category/hooks/use-category';
import { formatTelephone, useAppDispatch } from '@/shared/lib';
import { fetchUsers } from '@/shared/lib/features/users/users-thunks';
import { UsersFilter } from '@/shared/types/user.types';
import { toast } from 'sonner';

import { ChangeEvent, useState } from 'react';

interface UseUserSearchProps {
  filters: UsersFilter;
}

export const useUserSearch = ({ filters }: UseUserSearchProps) => {
  const [currentFilters, setCurrentFilters] = useState<UsersFilter>(filters);
  const { categories, categoriesFetching } = useCategory();
  const dispatch = useAppDispatch();

  const handleFiltersChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    let value = event.target.value;

    if (name === 'fullName') {
      if (currentFilters.fullName?.trim() === '' && value.trim() === '') {
        toast.error('Нельзя ввести пустое поле.');
        return;
      }
    }

    if (name === 'telephone') {
      if (currentFilters.telephone?.trim() === '' && value.trim() === '') {
        toast.error('Нельзя ввести пустое поле.');
        return;
      } else {
        value = formatTelephone(value);
      }
    }

    setCurrentFilters((prevState) => ({
      ...prevState,
      [name]: value,
      page: 1,
    }));
    dispatch(fetchUsers({ ...filters, [name]: value, page: 1 }));
  };

  const handleCategoryFilterChange = (category: string) => {
    setCurrentFilters((prevState) => ({
      ...prevState,
      category,
      page: 1,
    }));
    dispatch(fetchUsers({ ...filters, category, page: 1 }));
  };

  const handleResetFilters = async () => {
    setCurrentFilters({
      telephone: '',
      fullName: '',
      category: 'all',
      page: 1,
      role: 'user',
    });

    await dispatch(fetchUsers(filters));
  };

  return {
    filters,
    setCurrentFilters,
    categories,
    categoriesFetching,
    handleFiltersChange,
    handleCategoryFilterChange,
    handleResetFilters,
    currentFilters,
  };
};

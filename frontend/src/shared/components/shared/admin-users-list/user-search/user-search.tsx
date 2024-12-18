'use client';

import { useUserSearch } from '@/shared/components/shared';
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { UsersFilter } from '@/shared/types/user.types';
import { XIcon } from 'lucide-react';

import React, { useEffect, useState } from 'react';

import styles from './users-search.module.css';

interface UserSearchProps {
  role: string;
  onFiltersChange?: (filters: UsersFilter) => void;
}

export const UserSearch: React.FC<UserSearchProps> = ({ role, onFiltersChange }) => {
  const [filters, setFilters] = useState<UsersFilter>({
    telephone: '',
    fullName: '',
    category: 'all',
    page: 1,
    role: role,
  });

  const {
    categories,
    categoriesFetching,
    handleFiltersChange,
    handleCategoryFilterChange,
    handleResetFilters,
    currentFilters,
  } = useUserSearch({ filters });

  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(currentFilters);
    }
  }, [currentFilters, onFiltersChange]);

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      role,
    }));
  }, [role]);

  const showResetButton = Boolean(
    currentFilters.telephone || currentFilters.fullName || currentFilters.category !== 'all',
  );

  return (
    <>
      <div className={cn(styles.container, showResetButton ? styles.withResetButton : 'md:grid-cols-3')}>
        <Input
          placeholder={'Поиск по ФИО…'}
          value={currentFilters.fullName}
          name={'fullName'}
          onChange={handleFiltersChange}
        />

        <Input
          placeholder={'Поиск по номеру телефона…'}
          value={currentFilters.telephone}
          type={'tel'}
          name={'telephone'}
          onChange={handleFiltersChange}
        />

        <Select value={currentFilters.category} onValueChange={handleCategoryFilterChange}>
          <SelectTrigger className={styles.selectTrigger}>
            <SelectValue placeholder={'Выберите категорию…'} />
          </SelectTrigger>
          <SelectContent className={'dark:bg-gray-900'}>
            {categoriesFetching ? (
              <SelectItem className={'hover:dark:bg-gray-800'} disabled value={'null'}>
                Загрузка…
              </SelectItem>
            ) : !categoriesFetching && categories.length === 0 ? (
              <SelectItem className={'hover:dark:bg-gray-800'} disabled value={'null'}>
                Список категорий пуст
              </SelectItem>
            ) : (
              <>
                <SelectItem className={'hover:dark:bg-gray-800 focus:dark:bg-gray-800'} value={'all'}>
                  Все
                </SelectItem>

                {categories.map((category) => (
                  <SelectItem
                    className={'hover:dark:bg-gray-800 focus:dark:bg-gray-800'}
                    key={category._id}
                    value={category._id}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </>
            )}
          </SelectContent>
        </Select>

        {showResetButton && (
          <Button
            variant={'outline'}
            onClick={handleResetFilters}
            className={cn(styles.buttonReset, 'hover:dark:bg-[#1F2937] ')}
          >
            Сбросить
            <XIcon />
          </Button>
        )}
      </div>
    </>
  );
};

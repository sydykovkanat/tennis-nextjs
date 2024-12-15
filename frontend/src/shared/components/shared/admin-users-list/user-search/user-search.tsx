'use client';

import { useUserSearch } from '@/shared/components/shared';
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { XIcon } from 'lucide-react';

import React from 'react';

import styles from './users-search.module.css';

export const UserSearch = () => {
  const {
    filters,
    categories,
    categoriesFetching,
    handleFiltersChange,
    handleCategoryFilterChange,
    handleResetFilters,
  } = useUserSearch();
  return (
    <>
      <div className={styles.container}>
        <Input
          placeholder={'Поиск по ФИО…'}
          value={filters.fullName}
          name={'fullName'}
          onChange={handleFiltersChange}
        />

        <Input
          placeholder={'Поиск по номеру телефона…'}
          value={filters.telephone}
          type={'tel'}
          name={'telephone'}
          onChange={handleFiltersChange}
        />

        <Select value={filters.category} onValueChange={handleCategoryFilterChange}>
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

        <Button
          variant={'outline'}
          onClick={handleResetFilters}
          className={cn(styles.buttonReset, 'hover:dark:bg-[#1F2937] ')}
        >
          Сбросить
          <XIcon />
        </Button>
      </div>
    </>
  );
};

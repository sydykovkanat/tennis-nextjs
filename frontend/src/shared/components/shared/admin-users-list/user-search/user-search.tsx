'use client';

import { useUserSearch } from '@/shared/components/shared';
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui';
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
          <SelectContent>
            {categoriesFetching ? (
              <SelectItem disabled value={'null'}>
                Загрузка…
              </SelectItem>
            ) : !categoriesFetching && categories.length === 0 ? (
              <SelectItem disabled value={'null'}>
                Список категорий пуст
              </SelectItem>
            ) : (
              <>
                <SelectItem value={'all'}>Все</SelectItem>

                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.name}
                  </SelectItem>
                ))}
              </>
            )}
          </SelectContent>
        </Select>

        <Button variant={'outline'} onClick={handleResetFilters} className={styles.buttonReset}>
          Сбросить
          <XIcon />
        </Button>
      </div>
    </>
  );
};

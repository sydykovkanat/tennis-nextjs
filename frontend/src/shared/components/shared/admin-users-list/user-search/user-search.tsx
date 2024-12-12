'use client';

import { useUserSearch } from '@/shared/components/shared';
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui';
import { XIcon } from 'lucide-react';

import React from 'react';

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
      <div className={'flex gap-4 mb-4 flex-col md:flex-row'}>
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
          <SelectTrigger>
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

        <Button
          variant={'outline'}
          onClick={handleResetFilters}
          className='filter-set-date h-9 ms-auto text-cr-green-900 hover:text-rose-700 dark:text-green-500'
        >
          Сбросить
          <XIcon />
        </Button>
      </div>
    </>
  );
};

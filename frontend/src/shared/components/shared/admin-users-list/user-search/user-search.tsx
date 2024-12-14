'use client';

import { useUserSearch } from '@/shared/components/shared';
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui';
import { UsersFilter } from '@/shared/types/user.types';
import { XIcon } from 'lucide-react';

import React, { useEffect, useState } from 'react';

import styles from './users-search.module.css';

interface UserSearchProps {
  role: string;
}

export const UserSearch: React.FC<UserSearchProps> = ({ role }) => {
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
    setFilters((prevFilters) => ({
      ...prevFilters,
      role,
    }));
  }, [role]);

  return (
    <>
      <div className={styles.container}>
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

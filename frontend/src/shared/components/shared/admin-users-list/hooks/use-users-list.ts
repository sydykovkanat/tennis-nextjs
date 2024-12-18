'use client';

import { useAdminUsersList } from '@/shared/components/shared';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import {
  selectCurrentPage,
  selectUsersList,
  selectUsersListPages,
  setCurrentPage,
} from '@/shared/lib/features/users/users-slice';
import { fetchUsers, updateIsActive } from '@/shared/lib/features/users/users-thunks';
import { UsersFilter } from '@/shared/types/user.types';

import { useEffect, useState } from 'react';

interface Props {
  role: string;
}

export const useUsersList = ({ role }: Props) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsersList);
  const total = useAppSelector(selectUsersListPages);
  const currentPage = useAppSelector(selectCurrentPage);
  const { currentTab } = useAdminUsersList();

  const [currentFilters, setCurrentFilters] = useState<UsersFilter>({
    telephone: '',
    fullName: '',
    category: 'all',
    page: 1,
    role: role,
  });

  const toggleActive = async (id: string) => {
    await dispatch(updateIsActive(id));
    await dispatch(
      fetchUsers({
        telephone: currentFilters.telephone,
        fullName: currentFilters.fullName,
        category: currentFilters.category,
        page: currentPage,
        role,
      }),
    );
  };

  const handlePageChange = async (pageNumber: number) => {
    dispatch(setCurrentPage(pageNumber));
  };

  useEffect(() => {
    dispatch(
      fetchUsers({
        telephone: '',
        fullName: '',
        category: 'all',
        page: currentPage,
        role,
      }),
    );
  }, [dispatch, currentPage, role]);

  return {
    users,
    total,
    currentTab,
    setCurrentFilters,
    toggleActive,
    handlePageChange,
  };
};

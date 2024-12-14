'use client';

import { CustomPagination, InfoTip, UserSearch, UsersForm } from '@/shared/components/shared';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import {
  selectCurrentPage,
  selectUsersList,
  selectUsersListPages,
  setCurrentPage,
} from '@/shared/lib/features/users/users-slice';
import { fetchUsers, updateIsActive } from '@/shared/lib/features/users/users-thunks';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

import React, { useEffect } from 'react';

import styles from './users-list.module.css';

interface UsersListProps {
  role: 'user' | 'moderator';
}

export const UsersList: React.FC<UsersListProps> = ({ role }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsersList);
  const isUsersRoles = role === 'user';
  const total = useAppSelector(selectUsersListPages);
  const currentPage = useAppSelector(selectCurrentPage);

  const toggleActive = async (id: string) => {
    await dispatch(updateIsActive(id));
    await dispatch(
      fetchUsers({
        telephone: '',
        fullName: '',
        category: 'all',
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

  return (
    <>
      <div className={styles.userSearch}>
        <UserSearch />
      </div>
      {users.length === 0 ? (
        <p className={styles.emptyMessage}>Список пользователей пуст…</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className={'hover:dark:bg-gray-800'}>
              <TableHead>Статус</TableHead>
              <TableHead>ФИО</TableHead>
              <TableHead>Номер телефона</TableHead>
              <TableHead>Почта</TableHead>
              <TableHead>Пол</TableHead>
              <TableHead>Год рождения</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow className={'hover:dark:bg-gray-800'} key={user._id}>
                <TableCell className={styles.tableCell}>{user.isActive ? 'Активен' : 'Неактивен'}</TableCell>
                <TableCell className={styles.tableCell}>{user.fullName}</TableCell>
                <TableCell className={styles.tableCell}>{user.telephone}</TableCell>
                <TableCell className={styles.tableCell}>{user.email}</TableCell>
                <TableCell className={styles.tableCell}>{user.gender === 'male' ? 'Муж.' : 'Жен.'}</TableCell>
                <TableCell className={styles.tableCell}>{user.dateOfBirth}</TableCell>
                <TableCell className={styles.tableCell}>{user.category.name}</TableCell>
                <TableCell className={styles.actionButtons}>
                  <UsersForm mode={'edit'} id={user._id} />
                  {isUsersRoles ? (
                    user.isActive ? (
                      <InfoTip text={'Деактивировать'} delay={300} className={styles.infoTipBorder}>
                        <Button
                          size={'icon'}
                          className={styles.deactivateButton}
                          variant='destructive'
                          onClick={() => toggleActive(user._id)}
                        >
                          <XMarkIcon className={'size-4'} />
                        </Button>
                      </InfoTip>
                    ) : (
                      <InfoTip text={'Активировать'} className={styles.infoTipBorder} delay={300}>
                        <Button size={'icon'} className={styles.activateButton} onClick={() => toggleActive(user._id)}>
                          <CheckIcon className={'size-4'} />
                        </Button>
                      </InfoTip>
                    )
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <CustomPagination total={total} setPageUser={handlePageChange} />
    </>
  );
};

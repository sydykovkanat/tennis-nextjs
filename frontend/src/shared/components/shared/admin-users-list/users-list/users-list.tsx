'use client';

import { CustomPagination, InfoTip, UserSearch, UsersForm, useUsersList } from '@/shared/components/shared';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui';
import { formatDateToDisplay } from '@/shared/lib';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

import React from 'react';

import styles from './users-list.module.css';

interface UsersListProps {
  role: string;
}

export const UsersList: React.FC<UsersListProps> = ({ role }) => {
  const { users, total, currentTab, setCurrentFilters, toggleActive, handlePageChange } = useUsersList({ role });

  return (
    <>
      <div className={styles.userSearch}>
        <UserSearch role={currentTab === 'users' ? 'user' : 'moderator'} onFiltersChange={setCurrentFilters} />
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
              <TableRow className={'hover:dark:bg-gray-800'} key={user._id} data-testid={`${user.fullName}`}>
                <TableCell className={styles.tableCell}>{user.isActive ? 'Активен' : 'Неактивен'}</TableCell>
                <TableCell className={styles.tableCell}>{user.fullName}</TableCell>
                <TableCell className={styles.tableCell}>{user.telephone}</TableCell>
                <TableCell className={styles.tableCell}>{user.email}</TableCell>
                <TableCell className={styles.tableCell}>{user.gender === 'male' ? 'Муж.' : 'Жен.'}</TableCell>
                <TableCell className={styles.tableCell}>{formatDateToDisplay(user.dateOfBirth)}</TableCell>
                <TableCell className={styles.tableCell}>{user.category.name}</TableCell>
                <TableCell className={styles.actionButtons}>
                  <UsersForm mode={'edit'} id={user._id} />
                  {role === 'user' ? (
                    user.isActive ? (
                      <InfoTip text={'Деактивировать'} delay={300} className={styles.infoTipBorder}>
                        <Button
                          size={'icon'}
                          className={styles.deactivateButton}
                          variant='destructive'
                          onClick={() => toggleActive(user._id)}
                          data-testid='deactivate'
                        >
                          <XMarkIcon className={'size-4'} />
                        </Button>
                      </InfoTip>
                    ) : (
                      <InfoTip text={'Активировать'} className={styles.infoTipBorder} delay={300}>
                        <Button
                          size={'icon'}
                          className={styles.activateButton}
                          onClick={() => toggleActive(user._id)}
                          data-testid='activate'
                        >
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
      {total > 1 && <CustomPagination total={total} setPageUser={handlePageChange} />}
    </>
  );
};

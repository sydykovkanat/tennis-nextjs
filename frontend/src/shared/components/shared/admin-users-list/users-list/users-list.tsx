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
      <div>
        <UserSearch />
      </div>
      {users.length === 0 ? (
        <p className={'text-center text-muted-foreground mt-10'}>Список пользователей пуст…</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Статус</TableHead>
              <TableHead>Почта</TableHead>
              <TableHead>Номер телефона</TableHead>
              <TableHead>ФИО</TableHead>
              <TableHead>Пол</TableHead>
              <TableHead>Год рождения</TableHead>
              <TableHead>Категория</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell className={'w-[12.5%]'}>{user.isActive ? 'Активен' : 'Неактивен'}</TableCell>
                <TableCell className={'w-[12.5%]'}>{user.email}</TableCell>
                <TableCell className={'w-[12.5%]'}>{user.telephone}</TableCell>
                <TableCell className={'w-[12.5%]'}>{user.fullName}</TableCell>
                <TableCell className={'w-[12.5%]'}>{user.gender === 'male' ? 'Муж.' : 'Жен.'}</TableCell>
                <TableCell className={'w-[12.5%]'}>{user.dateOfBirth}</TableCell>
                <TableCell className={'w-[12.5%]'}>{user.category.name}</TableCell>
                <TableCell className={'w-[160px] flex gap-2'}>
                  <UsersForm mode={'edit'} id={user._id} />
                  {isUsersRoles ? (
                    user.isActive ? (
                      <InfoTip text={'Деактивировать'} delay={300} className={'border border-muted-foreground'}>
                        <Button
                          size={'icon'}
                          className={'font-normal'}
                          variant='destructive'
                          onClick={() => toggleActive(user._id)}
                        >
                          <XMarkIcon className={'size-4'} />
                        </Button>
                      </InfoTip>
                    ) : (
                      <InfoTip text={'Активировать'} className={'border border-muted-foreground'} delay={300}>
                        <Button
                          size={'icon'}
                          className={'p-3 text-white hover:bg-green-600 font-normal bg-green-500'}
                          onClick={() => toggleActive(user._id)}
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
      <CustomPagination total={total} setPageUser={handlePageChange} />
    </>
  );
};

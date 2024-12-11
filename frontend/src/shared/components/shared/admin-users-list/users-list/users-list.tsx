'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/hooks';
import { selectUsersList } from '@/shared/lib/features/users/users-slice';
import { fetchUsers } from '@/shared/lib/features/users/users-thunks';

import React, { useEffect } from 'react';

interface UsersListProps {
  role: 'user' | 'moderator';
}

export const UsersList: React.FC<UsersListProps> = ({ role }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsersList);

  useEffect(() => {
    dispatch(
      fetchUsers({
        telephone: '',
        fullName: '',
        category: 'all',
        page: 1,
        role,
      }),
    );
  }, [dispatch, role]);

  return (
    <>
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
                <TableCell className={'w-[160px] flex gap-2'}></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

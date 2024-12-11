'use client';

import { UsersList } from '@/shared/components/shared';
import { UsersForm } from '@/shared/components/shared';
import { ScrollArea, ScrollBar, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui';
import { useAppSelector } from '@/shared/hooks/hooks';
import { selectUserPermission } from '@/shared/lib/features/users/users-slice';

import React, { useEffect, useState } from 'react';

export const AdminUsersList = () => {
  const userPermission = useAppSelector(selectUserPermission);
  const [currentTab, setCurrentTab] = useState<string>('users');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedTab = sessionStorage.getItem('listOfUsersTab');
    if (savedTab) {
      setCurrentTab(savedTab);
    }
  }, []);

  const handleTabChange = (newTab: string) => {
    setCurrentTab(newTab);
    sessionStorage.setItem('listOfUsersTab', newTab);
  };

  if (!isClient) return null;

  return (
    <>
      <header className={'flex xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5 mb-7'}>
        <div>
          <h1 className={'text-2xl font-medium leading-none'}>Пользователи</h1>
          <small className={'text-muted-foreground text-base'}>
            Список всех пользователей и управление пользователями.
          </small>
        </div>
        <UsersForm mode={'add'} />
      </header>
      <Tabs value={currentTab} onValueChange={handleTabChange} orientation={'vertical'} defaultValue={'users'}>
        <ScrollArea className={'max-w-max pb-3 mx-auto'}>
          <TabsList className='flex items-center gap-1'>
            <TabsTrigger value='users'>Пользователи</TabsTrigger>
            {userPermission === 3 && (
              <TabsTrigger key='moderators' value='moderators'>
                Модераторы
              </TabsTrigger>
            )}
          </TabsList>
          <ScrollBar orientation={'horizontal'} />
        </ScrollArea>
        <TabsContent value={'users'}>
          <UsersList role={'user'} />
        </TabsContent>
        {userPermission === 3 && (
          <TabsContent value={'moderators'}>
            <UsersList role={'moderator'} />
          </TabsContent>
        )}
      </Tabs>
    </>
  );
};

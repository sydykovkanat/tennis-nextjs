'use client';

import { UsersForm, UsersList, useAdminUsersList } from '@/shared/components/shared';
import { ScrollArea, ScrollBar, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { useAppSelector } from '@/shared/hooks/hooks';
import { selectCurrentUser } from '@/shared/lib/features/users/users-slice';

import React, { useEffect } from 'react';

import styles from './admin-users-list.module.css';

export const AdminUsersList = () => {
  const { currentTab, isClient, userPermission, handleTabChange, setCurrentTab } = useAdminUsersList();
  const updatedRoleUser = useAppSelector(selectCurrentUser);

  useEffect(() => {
    if (updatedRoleUser) {
      const newTab = updatedRoleUser.role + 's';
      setCurrentTab(newTab);
    }
  }, [setCurrentTab, updatedRoleUser]);

  if (!isClient) {
    return <div className='text-center'>Loading...</div>;
  }

  return (
    <>
      <div className={styles.header}>
        <div>
          <h2 className={styles.headerTitle}>Пользователи</h2>
          <small className={styles.headerSubtitle}>Список всех пользователей и управление пользователями.</small>
        </div>
        <UsersForm mode={'add'} />
      </div>
      <Tabs value={currentTab} onValueChange={handleTabChange} orientation={'vertical'}>
        <ScrollArea className={styles.scrollArea}>
          {userPermission === 2 && (
            <div className='hidden'>
              <TabsList className={cn(styles.tabsList, 'dark:bg-[#1F2937]')}>
                <TabsTrigger value='users'>Пользователи</TabsTrigger>
              </TabsList>
            </div>
          )}

          {userPermission === 3 && (
            <TabsList className={styles.tabsList}>
              <TabsTrigger value='users'>Пользователи</TabsTrigger>
              <TabsTrigger key='moderators' value='moderators'>
                Модераторы
              </TabsTrigger>
            </TabsList>
          )}
          <ScrollBar orientation={'horizontal'} />
        </ScrollArea>
        {userPermission === 3 && (
          <TabsContent value={'moderators'}>
            <UsersList role={currentTab === 'users' ? 'user' : 'moderator'} />
          </TabsContent>
        )}
        <TabsContent value={'users'}>
          <UsersList role={currentTab === 'users' ? 'user' : 'moderator'} />
        </TabsContent>
      </Tabs>
    </>
  );
};

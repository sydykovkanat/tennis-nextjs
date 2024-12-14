'use client';

import { UsersForm, UsersList, useAdminUsersList } from '@/shared/components/shared';
import { ScrollArea, ScrollBar, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui';

import React from 'react';

import styles from './admin-users-list.module.css';

export const AdminUsersList = () => {
  const { userPermission, currentTab, handleTabChange, isClient } = useAdminUsersList();

  if (!isClient) return null;

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
          <TabsList className={styles.tabsList}>
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
          <UsersList role={currentTab === 'users' ? 'user' : 'moderator'} />
        </TabsContent>
        {userPermission === 3 && (
          <TabsContent value={'moderators'}>
            <UsersList role={currentTab === 'users' ? 'user' : 'moderator'} />
          </TabsContent>
        )}
      </Tabs>
    </>
  );
};

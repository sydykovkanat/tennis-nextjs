'use client';

import { UsersForm, UsersList, useAdminUsersList } from '@/shared/components/shared';
import { ScrollArea, ScrollBar, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui';



import React, { useEffect } from 'react';



import styles from './admin-users-list.module.css';


export const AdminUsersList = () => {
  const { userPermission, currentTab, setCurrentTab, setIsClient, handleTabChange, isClient } = useAdminUsersList();

  useEffect(() => {
    setIsClient(true);
    const savedTab = sessionStorage.getItem('listOfUsersTab');
    if (savedTab) {
      setCurrentTab(savedTab);
    }
  }, [setCurrentTab, setIsClient]);

  if (!isClient) return null;

  return (
    <>
      <div className={styles.header}>
        <div>
          <h2 className={styles.headerTitle}>Пользователи</h2>
          <small className={styles.headerSubtitle}>Список всех пользователей и управление пользователями.</small>
        </div>
        <UsersForm mode={'add'}/>
      </div>
      <Tabs value={currentTab} onValueChange={handleTabChange} orientation={'vertical'}>
        <ScrollArea className={styles.scrollArea}>
          <TabsList className={styles.tabsList}>
            {userPermission === 3 && (
                <>
                  <TabsTrigger value='users'>Пользователи</TabsTrigger>
                  <TabsTrigger key='moderators' value='moderators'>
                    Модераторы
                  </TabsTrigger>
                </>
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
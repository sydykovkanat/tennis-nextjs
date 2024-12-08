'use client';

import { UsersList } from '@/shared/components/shared';
import { ScrollArea, ScrollBar, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui';

import React from 'react';

export const AdminUsersList = () => {
  return (
    <>
      <header className={'flex xs:items-center justify-between gap-2 flex-col xs:flex-row border-b pb-1.5 mb-7'}>
        <div>
          <h1 className={'text-2xl font-medium leading-none'}>Пользователи</h1>
          <small className={'text-muted-foreground text-base'}>
            Список всех пользователей и управление пользователями.
          </small>
        </div>
      </header>
      <Tabs>
        <ScrollArea className={'max-w-max pb-3 mx-auto'}>
          <TabsList className='flex items-center gap-1'>
            <TabsTrigger value='users'>Пользователи</TabsTrigger>
          </TabsList>
          <ScrollBar orientation={'horizontal'} />
        </ScrollArea>
        <TabsContent value={'users'}>
          <UsersList />
        </TabsContent>
      </Tabs>
    </>
  );
};

'use client';

import { Rewards } from '@/shared/components/admin';
import { useTabsWithRewards, useUsersForm } from '@/shared/components/shared';
import { Form } from '@/shared/components/shared/admin-users-list/users-form/form';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  ScrollArea,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui';
import { useAppSelector } from '@/shared/hooks/hooks';
import { cn } from '@/shared/lib';
import { fetchCategories } from '@/shared/lib/features/categories/category-thunks';
import { selectUserPermission } from '@/shared/lib/features/users/users-slice';
import { fetchOneUser } from '@/shared/lib/features/users/users-thunks';
import { Grid2X2PlusIcon, Pencil } from 'lucide-react';

import React, { useEffect } from 'react';

import styles from './users-form.module.css';

interface UsersFromProps {
  mode: 'add' | 'edit';
  id?: string;
}

export const UsersForm: React.FC<UsersFromProps> = ({ mode, id }) => {
  const isAddMode = mode === 'add';
  const userPermission = useAppSelector(selectUserPermission);

  const { isDialogOpen, setIsDialogOpen, categories, dispatch, setNewUser, currentUser } = useUsersForm();
  const { currentTab, handleTabChange } = useTabsWithRewards();

  useEffect(() => {
    if (userPermission != null && userPermission !== 3) {
      setNewUser((prev) => ({
        ...prev,
        role: 'user',
      }));
    }
  }, [setNewUser, userPermission]);

  useEffect(() => {
    if (!categories) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  useEffect(() => {
    if (isDialogOpen) {
      if (id != null) {
        dispatch(fetchOneUser(id));
      }
    }
  }, [dispatch, isDialogOpen, id]);

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            className={isAddMode ? styles.dialogTriggerButton : 'font-normal'}
            size={isAddMode ? 'default' : 'icon'}
            data-testid='edit'
          >
            {isAddMode ? (
              <>
                Добавить пользователя
                <Grid2X2PlusIcon />
              </>
            ) : (
              <Pencil />
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className={cn(styles.dialogContent, 'dark:bg-[#1F2937]')}>
          <DialogHeader>
            <DialogTitle>{isAddMode ? 'Создание аккаунта' : 'Редактирование профиля'}</DialogTitle>
            <DialogDescription className={'pb-3'}>
              {isAddMode ? 'Заполните форму для создания аккаунта' : 'Заполните форму для редактирования профиля'}
            </DialogDescription>
            {isAddMode ? (
              <Form userPermission={userPermission} isAdd />
            ) : (
              <Tabs
                value={currentTab}
                orientation={'vertical'}
                defaultValue={currentTab}
                onValueChange={handleTabChange}
              >
                <ScrollArea className={cn(styles.scroll)}>
                  <TabsList className={cn(styles.tabsList, 'dark:bg-[#1F2937]')}>
                    <TabsTrigger value='personalData'>Персональные данные</TabsTrigger>
                    <TabsTrigger value='rewards'>Награды</TabsTrigger>
                  </TabsList>
                </ScrollArea>
                <TabsContent value={'personalData'}>
                  <Form userPermission={userPermission} id={id} />
                </TabsContent>

                <TabsContent value={'rewards'}>{currentUser && <Rewards id={currentUser._id} />}</TabsContent>
              </Tabs>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

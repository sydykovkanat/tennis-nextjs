'use client';

import { useTabsWithRewards, useUsersForm } from '@/shared/components/shared';
import { Form } from '@/shared/components/shared/admin-users-list/users-form/form';
import {
  Button,
  Dialog,
  DialogClose,
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

  const { isDialogOpen, setIsDialogOpen, categories, dispatch, setNewUser } = useUsersForm();
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
            <DialogDescription>
              {isAddMode ? 'Заполните форму для создания аккаунта.' : 'Заполните форму для редактирования профиля'}
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
                <ScrollArea>
                  <TabsList>
                    <TabsTrigger value='personalData'>Персональные данные</TabsTrigger>
                    <TabsTrigger value='rewards'>Награды</TabsTrigger>
                  </TabsList>
                </ScrollArea>
                <div className={cn(styles.box, 'dark:bg-[#1F2937]')}>
                  <TabsContent value={'personalData'}>
                    <Form userPermission={userPermission} id={id} />
                  </TabsContent>
                  <TabsContent value={'rewards'}>Rewards</TabsContent>
                </div>
              </Tabs>
            )}

            <DialogClose asChild>
              <Button className={styles.buttonCancel} type={'button'} variant={'outline'}>
                Отменить
              </Button>
            </DialogClose>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

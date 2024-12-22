'use client';

import { Loader, UsersDatePicker, UsersInput, useUsersForm } from '@/shared/components/shared';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui';
import { useAppSelector } from '@/shared/hooks/hooks';
import { cn } from '@/shared/lib';
import { fetchCategories } from '@/shared/lib/features/categories/category-thunks';
import { selectUserPermission } from '@/shared/lib/features/users/users-slice';
import { fetchOneUser } from '@/shared/lib/features/users/users-thunks';
import { validateEmail } from '@/shared/lib/helpers/validateEmail';
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

  const {
    isDialogOpen,
    setIsDialogOpen,
    closeRef,
    newUser,
    categories,
    categoriesLoading,
    loading,
    handleDateChange,
    handleChange,
    handleSelectChange,
    isFormValidAdmin,
    error,
    dispatch,
    addUserAdmin,
    setNewUser,
    handleSubmit,
    loadingUpdateUser,
    currentUser,
  } = useUsersForm();

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

  useEffect(() => {
    try {
      if (mode === 'edit' && id) {
        if (currentUser) {
          setNewUser({
            id: currentUser._id,
            fullName: currentUser.fullName || '',
            telephone: currentUser.telephone || '',
            email: currentUser.email || '',
            role: currentUser.role || '',
            gender: currentUser.gender || '',
            dateOfBirth: currentUser.dateOfBirth || '',
            category: currentUser.category?._id || '',
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [id, dispatch, mode, setNewUser, currentUser]);

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
            <DialogDescription>
              {isAddMode ? 'Заполните форму для создания аккаунта.' : 'Заполните форму для редактирования профиля'}
            </DialogDescription>
            <form onSubmit={isAddMode ? addUserAdmin : handleSubmit}>
              <div className={styles.blockForm}>
                <UsersInput
                  id='fullName'
                  value={newUser.fullName}
                  onChange={handleChange}
                  label='ФИО'
                  placeholder='Введите ваше полное ФИО'
                  autoComplete={'name'}
                  className={styles.inputField}
                />

                <UsersInput
                  id='telephone'
                  value={newUser.telephone}
                  onChange={handleChange}
                  label='Номер телефона'
                  placeholder={'0500 000 000'}
                  autoComplete={'tel'}
                  className={styles.inputField}
                  error={error ? `${error.errors.telephone.message}` : ''}
                />

                <UsersInput
                  id='email'
                  value={newUser.email}
                  onChange={handleChange}
                  label='Почта'
                  placeholder={'example@gmail.com'}
                  autoComplete={'email'}
                  className={styles.inputField}
                />

                {isAddMode ? (
                  <>
                    <UsersInput
                      id='password'
                      value={newUser.password}
                      onChange={handleChange}
                      label='Пароль'
                      placeholder='Введите пароль'
                      type='password'
                      autoComplete={'new-password'}
                      className={styles.inputField}
                    />
                  </>
                ) : null}

                <UsersDatePicker
                  value={newUser.dateOfBirth}
                  onChange={(date) => handleDateChange(date)}
                  label={'Дата рождения'}
                  className={styles.inputField}
                  addUserAdmin={true}
                />

                <div className='pt-5'>
                  <Label htmlFor='gender' className={styles.label}>
                    Пол
                  </Label>
                  <Select value={newUser.gender} onValueChange={(value) => handleSelectChange(value, 'gender')}>
                    <SelectTrigger className={'h-10 focus:border-[#80BC41]'} id='gender'>
                      <SelectValue placeholder='Укажите пол' />
                    </SelectTrigger>
                    <SelectContent className={'dark:bg-gray-900'}>
                      <SelectGroup className={'dark:bg-gray-900'}>
                        <SelectItem className={'hover:dark:bg-gray-800 focus:dark:bg-gray-800'} value='male'>
                          Мужской
                        </SelectItem>
                        <SelectItem className={'hover:dark:bg-gray-800 focus:dark:bg-gray-800'} value='female'>
                          Женский
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor='category' className={styles.label}>
                    Категория
                  </Label>
                  <Select
                    disabled={categoriesLoading || categories.length === 0}
                    value={newUser.category}
                    onValueChange={(value) => handleSelectChange(value, 'category')}
                  >
                    <SelectTrigger className={styles.selectTrigger} id='category'>
                      <SelectValue placeholder='Выберите категорию' />
                    </SelectTrigger>
                    <SelectContent className={'dark:bg-gray-900'}>
                      <SelectGroup className={'dark:bg-gray-900'}>
                        {categories.map((item) => (
                          <SelectItem
                            className={'hover:dark:bg-gray-800 focus:dark:bg-gray-800'}
                            key={item._id}
                            value={item._id}
                          >
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {userPermission === 3 ? (
                  <div>
                    <Label htmlFor='role' className={styles.label}>
                      Роль
                    </Label>
                    <Select value={newUser.role} onValueChange={(value) => handleSelectChange(value, 'role')}>
                      <SelectTrigger className={styles.selectTrigger} id='role'>
                        <SelectValue placeholder='Выберите роль' />
                      </SelectTrigger>
                      <SelectContent className={'dark:bg-gray-900'}>
                        <SelectGroup className={'dark:bg-gray-900'}>
                          <SelectItem className={'hover:dark:bg-gray-800 focus:dark:bg-gray-800'} value={'user'}>
                            Пользователь
                          </SelectItem>
                          <SelectItem className={'hover:dark:bg-gray-800 '} value={'moderator'}>
                            Модератор
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <input type='hidden' value='user' />
                )}
              </div>

              <Button
                type='submit'
                className={cn(styles.buttonSubmit)}
                disabled={
                  isAddMode ? !isFormValidAdmin() || !validateEmail(newUser.email) : !validateEmail(newUser.email)
                }
              >
                {isAddMode ? <> Добавить {loading && <Loader />}</> : <> Сохранить {loadingUpdateUser && <Loader />}</>}
              </Button>

              <DialogClose asChild>
                <Button ref={closeRef} className={styles.buttonCancel} type={'button'} variant={'outline'}>
                  Отменить
                </Button>
              </DialogClose>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

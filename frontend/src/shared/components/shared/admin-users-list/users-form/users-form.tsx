'use client';

import { CustomDatepicker, Loader, useUsersForm } from '@/shared/components/shared';
import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui';
import { CURRENT_YEAR_FULL } from '@/shared/constants';
import { useAppSelector } from '@/shared/hooks/hooks';
import { cn, validateEmail } from '@/shared/lib';
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
        <DialogContent className={cn(styles.dialogContent)}>
          <DialogHeader>
            <DialogTitle>{isAddMode ? 'Создание аккаунта' : 'Редактирование профиля'}</DialogTitle>
            <DialogDescription className={styles.dialogDescription}>
              {isAddMode ? 'Заполните форму для создания аккаунта' : 'Заполните форму для редактирования профиля'}
            </DialogDescription>
            <form onSubmit={isAddMode ? addUserAdmin : handleSubmit}>
              <div className={styles.blockForm}>
                <Input
                  id='fullName'
                  value={newUser.fullName}
                  onChange={handleChange}
                  label='ФИО'
                  placeholder='Введите ваше полное ФИО'
                  autoComplete={'name'}
                  className={styles.inputField}
                />

                <Input
                  id='telephone'
                  value={newUser.telephone}
                  onChange={handleChange}
                  label='Номер телефона'
                  placeholder={'0500 000 000'}
                  autoComplete={'tel'}
                  className={styles.inputField}
                  error={error ? `${error.errors.telephone.message}` : ''}
                />

                <Input
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
                    <Input
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

                <CustomDatepicker
                  mode={'users'}
                  value={newUser.dateOfBirth}
                  onChange={(date) => handleDateChange(date)}
                  label={'Дата рождения'}
                  fromYear={1930}
                  toYear={CURRENT_YEAR_FULL}
                  className={'mt-1.5'}
                  buttonClassName={'py-5'}
                />

                <div>
                  <Label htmlFor='gender'>Пол</Label>
                  <Select value={newUser.gender} onValueChange={(value) => handleSelectChange(value, 'gender')}>
                    <SelectTrigger className={styles.selectTrigger} id='gender'>
                      <SelectValue placeholder='Укажите пол' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value='male'>Мужской</SelectItem>
                        <SelectItem value='female'>Женский</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor='category'>Категория</Label>
                  <Select
                    disabled={categoriesLoading || categories.length === 0}
                    value={newUser.category}
                    onValueChange={(value) => handleSelectChange(value, 'category')}
                  >
                    <SelectTrigger className={styles.selectTrigger} id='category'>
                      <SelectValue placeholder='Выберите категорию' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((item) => (
                          <SelectItem key={item._id} value={item._id}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                {userPermission === 3 ? (
                  <div>
                    <Label htmlFor='role'>Роль</Label>
                    <Select value={newUser.role} onValueChange={(value) => handleSelectChange(value, 'role')}>
                      <SelectTrigger className={styles.selectTrigger} id='role'>
                        <SelectValue placeholder='Выберите роль' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value={'user'}>Пользователь</SelectItem>
                          <SelectItem value={'moderator'}>Модератор</SelectItem>
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

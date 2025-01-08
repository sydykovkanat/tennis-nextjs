'use client';

import { Loader, UsersDatePicker, UsersInput, useUsersForm } from '@/shared/components/shared';
import styles from '@/shared/components/shared/admin-users-list/users-form/users-form.module.css';
import {
  Button,
  DialogClose,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { validateEmail } from '@/shared/lib/helpers/validateEmail';



import React, { useEffect } from 'react';


interface Props {
  isAdd?: boolean;
  userPermission: number;
  id?: string;
}

export const Form: React.FC<Props> = ({ isAdd = false, userPermission, id }) => {
  const {
    newUser,
    categories,
    categoriesLoading,
    loading,
    handleDateChange,
    handleChange,
    handleSelectChange,
    isFormValidAdmin,
    error,
    handleSubmit,
    loadingUpdateUser,
    currentUser,
    setNewUser,
    dispatch,
  } = useUsersForm();

  useEffect(() => {
    try {
      if (!isAdd && id) {
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
  }, [id, dispatch, isAdd, setNewUser, currentUser]);

  return (
    <form onSubmit={handleSubmit}>
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

        {isAdd && (
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
        )}

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
        disabled={isAdd ? !isFormValidAdmin() || !validateEmail(newUser.email) : !validateEmail(newUser.email)}
      >
        {isAdd ? <> Добавить {loading && <Loader />}</> : <> Сохранить {loadingUpdateUser && <Loader />}</>}
      </Button>
      <DialogClose asChild>
        <Button type={'button'} variant={'outline'}>
          Отменить
        </Button>
      </DialogClose>
    </form>
  );
};

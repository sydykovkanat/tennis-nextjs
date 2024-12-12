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
import { fetchCategories } from '@/shared/lib/features/categories/category-thunks';
import { selectUserPermission } from '@/shared/lib/features/users/users-slice';
import { fetchOneUser } from '@/shared/lib/features/users/users-thunks';
import { validateEmail } from '@/shared/lib/helpers/validateEmail';
import { PencilSquareIcon, SquaresPlusIcon } from '@heroicons/react/24/outline';
import { toast } from 'sonner';

import React, { useEffect } from 'react';

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
    confirmPassword,
    setConfirmPassword,
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
  } = useUsersForm();

  useEffect(() => {
    if (error && error.errors) {
      Object.values(error.errors).forEach((err) => {
        toast.error(err.message);
      });
    }
  }, [error]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (mode === 'edit' && id) {
      dispatch(fetchOneUser(id))
        .unwrap()
        .then((user) => {
          setNewUser({
            id: user._id,
            fullName: user.fullName || '',
            telephone: user.telephone || '',
            email: user.email || '',
            role: user.role || '',
            gender: user.gender || '',
            dateOfBirth: user.dateOfBirth || '',
            category: user.category?._id || '',
          });
        })
        .catch(() => {
          toast.error('Не удалось обвновить пользователя');
        });
    }
  }, [id, dispatch, mode, setNewUser]);

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className={isAddMode ? 'w-full xs:w-max' : 'font-normal'} size={isAddMode ? 'default' : 'icon'}>
            {isAddMode ? (
              <>
                Добавить пользователя
                <SquaresPlusIcon />
              </>
            ) : (
              <PencilSquareIcon />
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className={'py-4 max-h-[80dvh] overflow-y-auto'}>
          <DialogHeader>
            <DialogTitle>{isAddMode ? 'Создание аккаунта' : 'Редактирование профиля'}</DialogTitle>
            <DialogDescription>
              {isAddMode ? 'Заполните форму для создания аккаунта.' : 'Заполните форму для редактирования профиля'}
            </DialogDescription>
            <form onSubmit={isAddMode ? addUserAdmin : handleSubmit}>
              <div className='space-y-3 mb-8'>
                <UsersInput
                  id='fullName'
                  value={newUser.fullName}
                  onChange={handleChange}
                  label='ФИО'
                  placeholder='Введите ваше полное ФИО'
                  autoComplete={'name'}
                  className={'h-[50px] focus-visible:border-[#80BC41]'}
                />

                <UsersInput
                  id='telephone'
                  value={newUser.telephone}
                  onChange={handleChange}
                  label='Номер телефона'
                  placeholder={'0500 000 000'}
                  autoComplete={'tel'}
                  className={'h-10'}
                />

                <UsersInput
                  id='email'
                  value={newUser.email}
                  onChange={handleChange}
                  label='Почта'
                  placeholder={'example@gmail.com'}
                  autoComplete={'email'}
                  className={'h-10'}
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
                      className={'h-10'}
                    />

                    <UsersInput
                      id='confirm-password'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      label='Подтвердите пароль'
                      type='password'
                      autoComplete={'current-password'}
                      placeholder='Введите пароль еще раз'
                      className={`${confirmPassword !== newUser.password && 'border-[#eb3434] focus-visible:border-[#eb3434]'} h-10 focus-visible:border-[#80BC41]`}
                      error={confirmPassword !== newUser.password ? 'Пароли не совпадают' : ''}
                    />
                  </>
                ) : null}

                <UsersDatePicker
                  value={newUser.dateOfBirth}
                  onChange={(date) => handleDateChange(date)}
                  label={'Дата рождения'}
                  className={'h-10 focus-visible:border-[#80BC41]'}
                  addUserAdmin={true}
                />

                <div className='pt-5'>
                  <Label htmlFor='gender' className={'text-base text-start font-medium block mt-1'}>
                    Пол
                  </Label>
                  <Select value={newUser.gender} onValueChange={(value) => handleSelectChange(value, 'gender')}>
                    <SelectTrigger className={'h-10 focus:border-[#80BC41]'} id='gender'>
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
                  <Label htmlFor='category' className={'text-base text-start font-medium block'}>
                    Категория
                  </Label>
                  <Select
                    disabled={categoriesLoading || categories.length === 0}
                    value={newUser.category}
                    onValueChange={(value) => handleSelectChange(value, 'category')}
                  >
                    <SelectTrigger className={'h-10 focus:border-[#80BC41]'} id='category'>
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
                <div>
                  <Label htmlFor='role' className={'text-base text-start font-medium block'}>
                    Роль
                  </Label>
                  <Select value={newUser.role} onValueChange={(value) => handleSelectChange(value, 'role')}>
                    <SelectTrigger className={'h-10 focus:border-[#80BC41]'} id='role'>
                      <SelectValue placeholder='Выберите роль' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {isAddMode ? (
                          <>
                            <SelectItem value={'user'}>Пользователь</SelectItem>
                            <SelectItem value={'moderator'}>Модератор</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value='user'>Пользователь</SelectItem>
                            {userPermission === 3 && <SelectItem value='moderator'>Модератор</SelectItem>}
                          </>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button
                type='submit'
                className='w-full h-8 sm:h-10 bg-[#232A2E] px-10 font-bold mb-2.5 dark:bg-blue-50'
                disabled={
                  isAddMode ? !isFormValidAdmin() || !validateEmail(newUser.email) : !validateEmail(newUser.email)
                }
              >
                {isAddMode ? <> Добавить {loading && <Loader />}</> : <> Сохранить {loadingUpdateUser && <Loader />}</>}
              </Button>

              <DialogClose asChild>
                <Button ref={closeRef} className={'w-full h-8 sm:h-10'} type={'button'} variant={'outline'}>
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

'use client';

import { useDialog, useUserForm } from '@/shared/components/shared/personal-account/hooks';
import styles from '@/shared/components/shared/personal-account/personal-account.module.css';
import UserDatePicker from '@/shared/components/shared/personal-account/user-datepicker/user-datepicker';
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { User } from '@/shared/types/user.types';

import React, { PropsWithChildren } from 'react';

interface Props {
  user: User;
}

export const UserEdit: React.FC<PropsWithChildren & Props> = ({ children, user }) => {
  const { isDialogOpen, setIsDialogOpen, closeRef, closeDialog } = useDialog();
  const { userInfo, updateField, handleDateChange, handleSubmit, resetUserInfo } = useUserForm({ user, closeDialog });

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (open) {
      resetUserInfo();
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование профиля</DialogTitle>
          <DialogDescription>Заполните форму для редактирования профиля</DialogDescription>

          <form onSubmit={handleSubmit} className={styles.formWrapper}>
            <Input
              id='fullName'
              value={userInfo.fullName}
              onChange={(e) => updateField('fullName', e.currentTarget.value)}
              label='ФИО'
              placeholder='Введите ваше полное ФИО'
              autoComplete='name'
              className={styles.inputField}
            />

            <Input
              id='email'
              value={userInfo.email}
              onChange={(e) => updateField('email', e.currentTarget.value)}
              label='Почта'
              placeholder={'example@gmail.com'}
              autoComplete={'email'}
              className={styles.inputField}
            />

            <Input
              id='telephone'
              value={userInfo.telephone}
              onChange={(e) => updateField('telephone', e.currentTarget.value)}
              label='Номер телефона'
              placeholder={'0500 000 000'}
              autoComplete={'tel'}
              className={styles.inputField}
            />

            <UserDatePicker
              value={userInfo.dateOfBirth}
              onChange={(date) => handleDateChange(date)}
              label={'Дата рождения'}
            />

            <div>
              <Label htmlFor='gender' className={'text-base text-left font-medium block'}>
                Пол
              </Label>
              <Select value={userInfo.gender} onValueChange={(value) => updateField('gender', value)}>
                <SelectTrigger className={styles.selectTrigger} id='gender'>
                  <SelectValue placeholder='Укажите ваш пол' />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value='male'>Мужской</SelectItem>
                    <SelectItem value='female'>Женский</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className={styles.buttonWrapper}>
              <Button type={'submit'}>Сохранить</Button>

              <DialogClose asChild>
                <Button ref={closeRef} className={'w-full'} type={'button'} variant={'outline'}>
                  Отменить
                </Button>
              </DialogClose>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

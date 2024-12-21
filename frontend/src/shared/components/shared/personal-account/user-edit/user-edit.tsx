'use client';

import { useUserForm } from '@/shared/components/shared/personal-account/hooks';
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
import { validateEmail } from '@/shared/lib/helpers/validateEmail';
import { User } from '@/shared/types/user.types';

import React, { PropsWithChildren } from 'react';

interface Props {
  user: User;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserEdit: React.FC<PropsWithChildren & Props> = ({ children, user, open, setOpen }) => {
  const { userInfo, updateField, handleChange, handleDateChange, handleSubmit, isFormValid } = useUserForm({
    user,
    closeDialog: () => setOpen(false),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={'dark:bg-[#1F2937]'}>
        <DialogHeader>
          <DialogTitle>Редактирование профиля</DialogTitle>
          <DialogDescription>Заполните форму для редактирования профиля</DialogDescription>

          <form onSubmit={handleSubmit} className={styles.formWrapper}>
            <Input
              id='fullName'
              value={userInfo.fullName}
              onChange={handleChange}
              label='ФИО'
              placeholder='Введите ваше полное ФИО'
              autoComplete='name'
              className={styles.inputField}
            />

            <Input
              id='email'
              value={userInfo.email}
              onChange={handleChange}
              label='Почта'
              placeholder={'example@gmail.com'}
              autoComplete={'email'}
              className={styles.inputField}
            />

            <Input
              id='telephone'
              value={userInfo.telephone}
              onChange={handleChange}
              label='Телефон'
              placeholder={'0555 555 555'}
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
                <SelectContent className={'dark:bg-gray-900'}>
                  <SelectGroup className={'dark:bg-gray-900'}>
                    <SelectItem className={'hover:dark:bg-gray-800 focus:dark:bg-gray-800'} value='male'>
                      Мужской
                    </SelectItem>
                    <SelectItem className={'hover:dark:bg-gray-800'} value='female'>
                      Женский
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div className={styles.buttonWrapper}>
              <Button type={'submit'} disabled={!isFormValid || !validateEmail(userInfo.email)}>
                Сохранить
              </Button>

              <DialogClose asChild>
                <Button className={'w-full'} type={'button'} variant={'outline'}>
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

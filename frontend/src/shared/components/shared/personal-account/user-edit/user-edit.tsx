'use client';

import { CustomDatepicker } from '@/shared/components/shared';
import { useUserForm } from '@/shared/components/shared/personal-account/hooks';
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
import { CURRENT_YEAR_FULL } from '@/shared/constants';
import { validateEmail } from '@/shared/lib';
import { User } from '@/shared/types/user.types';

import React, { PropsWithChildren } from 'react';

import styles from './edit.module.css';

interface Props {
  user: User;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UserEdit: React.FC<PropsWithChildren & Props> = ({ children, user, open, setOpen }) => {
  const {
    userInfo,
    handleChange,
    handleDateChange,
    handleSubmit,
    isFormValid,
    formErrors,
    handleBlur,
    validateAndSetField,
  } = useUserForm({
    user,
    closeDialog: () => setOpen(false),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className={'dark:bg-[#1F2937]'}>
        <DialogHeader>
          <DialogTitle>Редактирование профиля</DialogTitle>
          <DialogDescription className={'pb-3'}>Заполните форму для редактирования профиля</DialogDescription>

          <form onSubmit={handleSubmit} className={styles.formWrapper}>
            <Input
              id='fullName'
              value={userInfo.fullName}
              onChange={handleChange}
              label='ФИО'
              placeholder='Введите ваше полное ФИО'
              autoComplete='name'
              className={styles.inputField}
              onBlur={() => handleBlur('fullName')}
              error={formErrors.fullName}
            />

            <Input
              id='email'
              value={userInfo.email}
              onChange={handleChange}
              label='Почта'
              placeholder={'example@gmail.com'}
              autoComplete={'email'}
              className={styles.inputField}
              onBlur={() => handleBlur('email')}
              error={formErrors.email}
            />

            <Input
              id='telephone'
              value={userInfo.telephone}
              onChange={handleChange}
              label='Телефон'
              placeholder={'0555 555 555'}
              autoComplete={'tel'}
              className={styles.inputField}
              onBlur={() => handleBlur('telephone')}
              error={formErrors.telephone}
            />

            <CustomDatepicker
              mode={'users'}
              value={userInfo.dateOfBirth}
              onChange={(date) => handleDateChange(date)}
              label={'Дата рождения'}
              fromYear={1930}
              toYear={CURRENT_YEAR_FULL}
              buttonClassName={'py-6'}
            />

            <div>
              <Label htmlFor='gender'>Пол</Label>
              <Select value={userInfo.gender} onValueChange={(value) => validateAndSetField('gender', value)}>
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

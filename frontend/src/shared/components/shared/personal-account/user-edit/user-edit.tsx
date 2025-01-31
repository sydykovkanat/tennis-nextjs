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
import { cn, validateEmail } from '@/shared/lib';
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Редактирование профиля</DialogTitle>
          <DialogDescription className={styles.dialogDescription}>
            Заполните форму для редактирования профиля
          </DialogDescription>

          <form onSubmit={handleSubmit} className={styles.formWrapper}>
            <div className={styles.inputBlock}>
              <Label htmlFor='fullname' className={cn(styles.label)}>
                ФИО
              </Label>
              <Input
                id='fullName'
                value={userInfo.fullName}
                onChange={handleChange}
                placeholder='Введите ваше полное ФИО'
                autoComplete='name'
                className={styles.inputField}
                onBlur={() => handleBlur('fullName')}
                error={formErrors.fullName}
              />
            </div>

            <div className={styles.inputBlock}>
              <Label htmlFor='email' className={cn(styles.label)}>
                Почта
              </Label>
              <Input
                id='email'
                value={userInfo.email}
                onChange={handleChange}
                placeholder={'example@gmail.com'}
                autoComplete={'email'}
                className={styles.inputField}
                onBlur={() => handleBlur('email')}
                error={formErrors.email}
              />
            </div>

            <div className={styles.inputBlock}>
              <Label htmlFor='telephone' className={cn(styles.label)}>
                Телефон
              </Label>
              <Input
                id='telephone'
                value={userInfo.telephone}
                onChange={handleChange}
                placeholder={'0555 555 555'}
                autoComplete={'tel'}
                className={styles.inputField}
                onBlur={() => handleBlur('telephone')}
                error={formErrors.telephone}
              />
            </div>

            <CustomDatepicker
              mode={'users'}
              value={userInfo.dateOfBirth}
              onChange={(date) => handleDateChange(date)}
              label={'Дата рождения'}
              fromYear={1930}
              toYear={CURRENT_YEAR_FULL}
              buttonClassName={'py-6'}
            />

            <div className='flex flex-col'>
              <Label htmlFor='gender' className={cn(styles.label)}>
                Пол
              </Label>
              <Select value={userInfo.gender} onValueChange={(value) => validateAndSetField('gender', value)}>
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

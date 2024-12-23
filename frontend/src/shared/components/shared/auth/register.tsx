'use client';

import { CustomDatepicker } from '@/shared/components/shared';
import { useRegister, useRegisterForm, useRegisterSelectors } from '@/shared/components/shared/auth/hooks';
import {
  Button,
  Checkbox,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui';
import { CURRENT_YEAR_FULL } from '@/shared/constants';
import { cn } from '@/shared/lib';
import { RegisterMutation } from '@/shared/types/auth.types';
import { Category } from '@/shared/types/category.types';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import React, { useEffect } from 'react';
import { Label } from 'react-aria-components';

import styles from './register.module.css';

interface Props {
  className?: string;
  categories: Category[];
}

const initialState: RegisterMutation = {
  telephone: '',
  password: '',
  category: '',
  dateOfBirth: '',
  email: '',
  fullName: '',
  gender: '',
};

export const Register: React.FC<Props> = ({ className, categories }) => {
  const { registerMutation, isFormValid, handleChange, handleDateChange, handleSelectChange, handleAgree, isAgree } =
    useRegisterForm(initialState);
  const { registerLoading, registerError } = useRegisterSelectors();
  const { handleRegister } = useRegister();

  useEffect(() => {
    if (registerError) {
      if (registerError.errors) {
        Object.values(registerError.errors).forEach((error) => {
          if (error?.message) {
            toast.error(error.message);
          }
        });
      } else {
        toast.error(registerError.message || 'Произошла ошибка');
      }
    }
  }, [registerError]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isFormValid) return;
    await handleRegister(registerMutation);
  };

  return (
    <form onSubmit={handleSubmit} className={cn(styles.form, 'dark:bg-gray-900', className)}>
      <h1 className={styles.title}>Создать аккаунт</h1>

      <p className={styles.subtitle}>Пожалуйста, заполните все данные для создания аккаунта</p>

      <Input
        label={'Телефон'}
        id={'telephone'}
        placeholder={'0555 555 555'}
        value={registerMutation.telephone}
        onChange={handleChange}
      />

      <Input
        label={'Почта'}
        id={'email'}
        placeholder={'Введите почту'}
        value={registerMutation.email}
        onChange={handleChange}
      />

      <Input
        label={'Пароль'}
        id={'password'}
        type={'password'}
        autoComplete={'on'}
        placeholder={'Введите пароль'}
        value={registerMutation.password}
        onChange={handleChange}
      />

      <CustomDatepicker
        mode={'users'}
        value={registerMutation.dateOfBirth}
        onChange={(date) => handleDateChange(date)}
        label={'Дата рождения'}
        fromYear={1930}
        toYear={CURRENT_YEAR_FULL}
        className={styles.datepicker}
        buttonClassName={styles.datepickerButton}
      />

      <Input
        label={'ФИО'}
        id={'fullName'}
        type={'fullName'}
        autoComplete={'on'}
        placeholder={'Введите ваше ФИО'}
        value={registerMutation.fullName}
        onChange={handleChange}
      />

      <div className={styles.selectContainer}>
        <Label htmlFor='gender'>Пол</Label>
        <Select onValueChange={(v) => handleSelectChange('gender', v)} value={registerMutation.gender}>
          <SelectTrigger className={styles.selectTrigger} id='gender'>
            <SelectValue placeholder='Выберите ваш пол' />
          </SelectTrigger>
          <SelectContent className={'dark:bg-gray-900'}>
            <SelectGroup className={'dark:bg-gray-900'}>
              {['male', 'female'].map((item) => (
                <SelectItem className={'hover:dark:bg-gray-800  focus:dark:bg-gray-800'} key={item} value={item}>
                  {item === 'male' ? 'Муж.' : 'Жен.'}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className={styles.selectContainer}>
        <Label htmlFor='category'>Категория</Label>
        <Select onValueChange={(v) => handleSelectChange('category', v)} value={registerMutation.category}>
          <SelectTrigger className={styles.selectTrigger} id='category'>
            <SelectValue placeholder='Выберите вашу категорию' />
          </SelectTrigger>
          <SelectContent className={'dark:bg-gray-900'}>
            <SelectGroup className={'dark:bg-gray-900'}>
              {categories.map((item) => (
                <SelectItem
                  className={'hover:dark:bg-gray-800  focus:dark:bg-gray-800'}
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

      <div className={styles.checkboxContainer}>
        <Checkbox
          checked={isAgree.rules}
          onCheckedChange={() => handleAgree('rules')}
          id={'rules'}
          className={styles.checkbox}
        />
        <Label htmlFor='rules'>Ознакомился с правилами КСЛТ</Label>
      </div>

      <div className={styles.checkboxContainer}>
        <Checkbox
          checked={isAgree.personalData}
          onCheckedChange={() => handleAgree('personalData')}
          id={'personalData'}
          className={styles.checkbox}
        />
        <Label htmlFor='personalData'>Даю согласие на обработку персональных данных</Label>
      </div>

      <Button icon={ArrowRightIcon} className={cn(styles.registerBtn)} disabled={!isFormValid || registerLoading}>
        Зарегистрироваться
      </Button>

      <Link href={'/login'} className={styles.isAlreadyRegistered}>
        Уже есть аккаунт? Войти
      </Link>
    </form>
  );
};

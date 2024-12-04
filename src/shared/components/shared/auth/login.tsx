'use client';

import { useLogin, useLoginForm, useLoginSelectors } from '@/shared/components/shared/auth/hooks';
import { Button, Input } from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { LoginMutation } from '@/shared/types/auth.types';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

import React from 'react';

interface Props {
  className?: string;
}

const initialState: LoginMutation = {
  telephone: '',
  password: '',
};

const Login: React.FC<Props> = ({ className }) => {
  const { loginMutation, handleChange, isFormValid } = useLoginForm(initialState);
  const { loginError, loginLoading } = useLoginSelectors();
  const { handleLogin } = useLogin();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleLogin(loginMutation);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('py-10 mx-auto max-w-[545px] bg-white px-4 min-[440px]:px-10 rounded-[22px]', className)}
    >
      <h1 className={'text-[28px] leading-10 font-bold mb-2'}>Добро пожаловать!</h1>

      <p className={'mb-7'}>Введите свой логин и пароль для входа в личный кабинет</p>

      <Input
        error={loginError?.error}
        label={'Телефон'}
        id={'telephone'}
        className={'h-12 mb-4'}
        labelClassName={'text-base'}
        placeholder={'0555 555 555'}
        value={loginMutation.telephone}
        onChange={handleChange}
      />

      <Input
        error={loginError?.error}
        label={'Пароль'}
        id={'password'}
        className={'h-12 mb-8'}
        labelClassName={'text-base'}
        type={'password'}
        autoComplete={'on'}
        placeholder={'Введите пароль'}
        value={loginMutation.password}
        onChange={handleChange}
      />

      <Button
        loading={loginLoading}
        icon={ArrowRightIcon}
        iconClassName={'hover:translate-x-1/2 block hover:scale-105'}
        className={'flex justify-between w-full h-14 mb-2.5'}
        disabled={!isFormValid || loginLoading}
      >
        Войти
      </Button>

      <Link href={'/forgot-password'} className={'text-tn-dark-green block text-right mb-8'}>
        Забыли пароль?
      </Link>

      <Button
        className={'bg-[#D9EBC6] text-tn-dark-green rounded-xl shadow-none h-12 w-full hover:bg-tn-green-secondary'}
      >
        Создать аккаунт
      </Button>
    </form>
  );
};

export default Login;

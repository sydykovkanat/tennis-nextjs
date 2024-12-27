'use client';

import { useLogin, useLoginForm, useLoginSelectors } from '@/shared/components/shared/auth/hooks';
import { Button, Input } from '@/shared/components/ui';
import { cn } from '@/shared/lib';
import { LoginMutation } from '@/shared/types/auth.types';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import React, { useEffect } from 'react';

import styles from './login.module.css';

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

  useEffect(() => {
    if (loginError?.error.messageIsActive) {
      toast.error(loginError.error.messageIsActive);
    }
  }, [loginError]);

  return (
    <form onSubmit={handleSubmit} className={cn(styles.form, 'dark:bg-gray-900', className)}>
      <h1 className={styles.title}>Добро пожаловать</h1>

      <p className={styles.subtitle}>Введите свой логин и пароль для входа в личный кабинет</p>

      <Input
        error={loginError?.error.messageTelephone}
        label={'Телефон'}
        id={'telephone'}
        placeholder={'0555 555 555'}
        value={loginMutation.telephone}
        onChange={handleChange}
      />

      <Input
        error={loginError?.error.messagePassword || loginError?.error.messageMatching}
        label={'Пароль'}
        id={'password'}
        type={'password'}
        autoComplete={'on'}
        placeholder={'Введите пароль'}
        value={loginMutation.password}
        onChange={handleChange}
      />

      <Button
        loading={loginLoading}
        icon={ArrowRightIcon}
        className={cn(styles.loginBtn)}
        disabled={!isFormValid || loginLoading}
      >
        Войти
      </Button>

      <Link href={'/forgot-password'} className={styles.forgotBtn}>
        Забыли пароль?
      </Link>

      <Link href={'/register'}>
        <Button className={cn(styles.createBtn, 'hover:dark:bg-[#caeaa8]')}>Создать аккаунт</Button>
      </Link>
    </form>
  );
};

export default Login;

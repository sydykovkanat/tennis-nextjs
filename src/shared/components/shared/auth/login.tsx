'use client';

import { Button, Input } from '@/shared/components/ui';
import { useAppDispatch } from '@/shared/hooks/hooks';
import { cn, formatTelephone } from '@/shared/lib';
import { selectLoginError, selectLoginLoading, selectUser } from '@/shared/lib/features/users/users-slice';
import { login } from '@/shared/lib/features/users/users-thunks';
import { useAppSelector } from '@/shared/lib/store';
import { LoginMutation } from '@/shared/types/auth.types';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import React, { ChangeEvent, useState } from 'react';

interface Props {
  className?: string;
}

const initialState: LoginMutation = {
  telephone: '',
  password: '',
};

const Login: React.FC<Props> = ({ className }) => {
  const user = useAppSelector(selectUser);
  const loginError = useAppSelector(selectLoginError);
  const loginLoading = useAppSelector(selectLoginLoading);
  const dispatch = useAppDispatch();
  const [loginMutation, setLoginMutation] = useState<LoginMutation>(initialState);
  const router = useRouter();

  const isFormValid = Boolean(loginMutation.telephone.length === 12 && loginMutation.password);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;
    let { value } = event.target;

    if (id === 'telephone') {
      value = formatTelephone(value);
    }

    setLoginMutation((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();

      await dispatch(login(loginMutation)).unwrap();
      toast.success(`Вы успешно вошли в систему ${user && `- ${user.fullName}!`}`);
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={cn('py-12 mx-auto max-w-[545px] bg-white px-20 rounded-[22px]', className)}>
      <h1 className={'text-[28px] leading-10 font-bold mb-2'}>Добро пожаловать! </h1>

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

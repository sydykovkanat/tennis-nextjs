import { Loader } from '@/components/Loader/Loader';
import { Button } from '@/components/ui/button';
import { UsersInput } from '@/features/users/components/UsersInput/UsersInput';
import { useResetPassword } from '@/features/users/hooks/resetPassword';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import React from 'react';

export const ResetPassword: React.FC = () => {
  const { resetPasswordLoading, passwords, passwordMatch, handleChange, handleSubmit } = useResetPassword();

  return (
    <form onSubmit={handleSubmit}>
      <section
        className='w-full py-10 mx-auto px-6 xs:max-w-[545px] xs:py-12 xs:px-10 rounded-3xl dark:border dark:border-green-400'
        style={{ boxShadow: '0px 4px 100px 0px #00000017' }}
      >
        <div className='mb-3'>
          <h1 className='font-bold text-[28px]'>Сброс пароля.</h1>
          <p className='text-sm text-black/75 dark:text-white'>Пожалуйста, введите ваш новый пароль для сброса.</p>
        </div>

        <div className={'space-y-3 mb-5'}>
          <UsersInput
            id='password'
            value={passwords.password}
            onChange={handleChange}
            label='Пароль'
            placeholder='Введите новый пароль'
            type='password'
            autoComplete='new-password'
          />

          <UsersInput
            id='confirmPassword'
            value={passwords.confirmPassword}
            onChange={handleChange}
            label='Подтвердите пароль'
            placeholder='Введите пароль еще раз'
            className={`${passwords.confirmPassword !== passwords.password && 'ring-red-500 ring-1 focus-visible:ring-red-500'} h-12 focus-visible:ring-[#80BC41]`}
            type='password'
            autoComplete='current-password'
            error={passwordMatch ? 'Пароли не совпадают' : ''}
          />
        </div>

        <Button
          disabled={passwordMatch || !passwords.password || resetPasswordLoading}
          type={'submit'}
          className={'w-full h-14 bg-[#232A2E] flex justify-between px-10 font-bold mb-2.5 dark:bg-white'}
        >
          Сбросить
          {resetPasswordLoading ? (
            <Loader className={'text-muted'} />
          ) : (
            <ArrowRightIcon style={{ width: 20, height: 20 }} />
          )}
        </Button>
      </section>
    </form>
  );
};

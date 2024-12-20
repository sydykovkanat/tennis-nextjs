'use client';

import { Loader } from '@/shared/components/shared';
import { useForgotPassword } from '@/shared/components/shared/forgot-password/hooks/use-forgot-password';
import { Button, Input } from '@/shared/components/ui';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

import React from 'react';

const ForgotPassword: React.FC = () => {
  const { forgotPasswordLoading, email, handleChange, handleSubmit, disabled, timer } = useForgotPassword();

  return (
    <form onSubmit={handleSubmit}>
      <section
        className='w-full py-10 mx-auto px-6 xs:max-w-[545px] xs:py-12 xs:px-10 rounded-3xl dark:border dark:border-green-400'
        style={{ boxShadow: '0px 4px 100px 0px #00000017' }}
      >
        <div className='mb-3'>
          <h1 className='font-bold text-[28px]'>Сброс пароля.</h1>
          <p className='text-sm text-black/75 dark:text-white'>Пожалуйста, введите вашу почту для сброса пароля.</p>
        </div>

        <div className={'space-y-3 mb-5'}>
          <Input
            id='email'
            value={email}
            onChange={handleChange}
            label='Почта'
            placeholder='Введите вашу почту'
            type='email'
            autoComplete='email'
          />
        </div>

        <Button
          disabled={email.length === 0 || forgotPasswordLoading || disabled}
          type={'submit'}
          className={`dark:bg-white w-full h-14 bg-[#232A2E] flex justify-between px-10 font-bold mb-2.5 ${disabled && 'pointer-events-none'}`}
        >
          {timer > 0 ? `Запросить код заново (${timer})` : 'Отправить ссылку на сброс пароля'}
          {forgotPasswordLoading ? (
            <Loader className={'text-muted'} />
          ) : (
            <ArrowRightIcon style={{ width: 20, height: 20 }} />
          )}
        </Button>
      </section>
    </form>
  );
};

export default ForgotPassword;

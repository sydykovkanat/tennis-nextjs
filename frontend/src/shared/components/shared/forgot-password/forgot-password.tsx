'use client';

import { Loader } from '@/shared/components/shared';
import { useForgotPassword } from '@/shared/components/shared/forgot-password/use-forgot-password';
import { Button, Input } from '@/shared/components/ui';
import { cn } from '@/shared/lib';

import React from 'react';

import styles from './forgot-password.module.css';

const ForgotPassword: React.FC = () => {
  const { forgotPasswordLoading, email, handleChange, handleSubmit, disabled, timer } = useForgotPassword();

  return (
    <form onSubmit={handleSubmit}>
      <section
        className={cn(styles.SectionWrapper, 'dark:bg-gray-900')}
        style={{ boxShadow: '0px 4px 100px 0px #00000017' }}
      >
        <div className='mb-2'>
          <h1 className={styles.BoldText}>Сброс пароля</h1>
          <p className={cn(styles.Text, 'dark:text-white')}>Пожалуйста, введите вашу почту для сброса пароля</p>
        </div>

        <div className={styles.DivWrapper}>
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
          className={cn(styles.Button, 'dark:bg-white', {
            'pointer-events-none': disabled,
          })}
          iconClassName={'ml-6 mt-[2px]'}
        >
          {timer > 0 ? `Запросить код заново (${timer})` : 'Отправить ссылку'}
          {forgotPasswordLoading && <Loader className={'text-muted ml-6 '} />}
        </Button>
      </section>
    </form>
  );
};

export default ForgotPassword;

'use client';

import { Loader } from '@/shared/components/shared';
import { useForgotPassword } from '@/shared/components/shared/forgot-password/use-forgot-password';
import { Button, Input } from '@/shared/components/ui';
import { cn } from '@/shared/lib';

import React from 'react';

import styles from './forgot-password.module.css';

const ForgotPassword: React.FC = () => {
  const { forgotPasswordLoading, email, formError, handleChange, handleBlur, handleSubmit, disabled, timer } =
    useForgotPassword();

  return (
    <form onSubmit={handleSubmit}>
      <section className={cn(styles.SectionWrapper, 'dark:bg-gray-900')}>
        <div>
          <h1 className={styles.BoldText}>Сброс пароля</h1>
          <p className={cn(styles.Text, 'dark:text-gray-400')}>Пожалуйста, введите вашу почту для сброса пароля</p>
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
            onBlur={() => handleBlur()}
            error={formError}
          />
        </div>

        <Button
          disabled={email.length === 0 || forgotPasswordLoading || disabled || formError.length !== 0}
          type={'submit'}
          className={cn(styles.Button, {
            'pointer-events-none': disabled,
          })}
        >
          {timer > 0 ? `Запросить код заново (${timer})` : 'Отправить ссылку'}
          {forgotPasswordLoading && <Loader className={styles.loader} />}
        </Button>
      </section>
    </form>
  );
};

export default ForgotPassword;

'use client';

import { Loader } from '@/shared/components/shared';
import { useResetPassword } from '@/shared/components/shared/reset-password/use-reset-password';
import { cn } from '@/shared/lib';

import React from 'react';

import { Button, Input } from '../../ui';
import styles from './reset-password.module.css';

const ResetPassword: React.FC = () => {
  const { resetPasswordLoading, passwords, passwordMatch, handleChange, handleSubmit } = useResetPassword();

  return (
    <form onSubmit={handleSubmit}>
      <section className={cn(styles.SectionWrapper, 'dark:bg-gray-900')}>
        <div>
          <h1 className={styles.BoldText}>Сброс пароля</h1>
          <p className={cn(styles.Text, 'dark:text-gray-400')}>Пожалуйста, введите ваш новый пароль для сброса</p>
        </div>

        <div className={styles.DivWrapper}>
          <Input
            id='password'
            value={passwords.password}
            onChange={handleChange}
            label='Пароль'
            placeholder='Введите новый пароль'
            type='password'
            autoComplete='new-password'
          />

          <Input
            id='confirmPassword'
            value={passwords.confirmPassword}
            onChange={handleChange}
            label='Подтвердите пароль'
            placeholder='Введите пароль еще раз'
            className={cn(styles.InputStyle)}
            type='password'
            autoComplete='current-password'
            error={passwordMatch ? 'Пароли не совпадают' : ''}
          />
        </div>

        <Button
          disabled={passwordMatch || !passwords.password || resetPasswordLoading}
          type={'submit'}
          className={cn(styles.Button)}
        >
          Сбросить
          {resetPasswordLoading && <Loader className={styles.loader} />}
        </Button>
      </section>
    </form>
  );
};

export default ResetPassword;

'use client';

import { Input, Label } from '@/shared/components/ui';

import React, { type InputHTMLAttributes } from 'react';

import styles from './users-input.module.css';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const UsersInput: React.FC<Props> = ({ id, value, onChange, placeholder, type, label, error, ...props }) => {
  return (
    <>
      <div className={styles.wrapper}>
        <Label className={styles.label} htmlFor={id}>
          {label}
        </Label>
        {error && <small className={styles.error}>{error}</small>}
      </div>
      <Input
        className={styles.input}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        {...props}
      />
    </>
  );
};

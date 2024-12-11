'use client';
import { Input, Label } from '@/shared/components/ui';
import React, { type InputHTMLAttributes } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const UsersInput: React.FC<Props> = ({ id, value, onChange, placeholder, type, label, error, ...props }) => {
  return (
    <div>
      <div className={'flex items-center justify-between mb-0.5'}>
        <Label className={'text-base font-medium block'} htmlFor={id}>
          {label}
        </Label>
        {error && <small className={'leading-none text-red-500'}>{error}</small>}
      </div>
      <Input
        className={'h-12 focus-visible:border-[#80BC41]'}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        {...props}
      />
    </div>
  );
};
'use client';

import { formatTelephone } from '@/shared/lib';
import { LoginMutation } from '@/shared/types/auth.types';

import { ChangeEvent, useState } from 'react';

export const useLoginForm = (initialState: LoginMutation) => {
  const [loginMutation, setLoginMutation] = useState<LoginMutation>(initialState);

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

  const isFormValid = Boolean(loginMutation.telephone.length === 12 && loginMutation.password);

  return {
    loginMutation,
    handleChange,
    isFormValid,
  };
};

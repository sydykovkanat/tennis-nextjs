'use client';

import { formatTelephone, validateRegisterForm } from '@/shared/lib';
import { LoginMutation } from '@/shared/types/auth.types';

import { ChangeEvent, useState } from 'react';

export const useLoginForm = (initialState: LoginMutation) => {
  const [loginMutation, setLoginMutation] = useState<LoginMutation>(initialState);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isTouched, setIsTouched] = useState<Record<string, boolean>>({});

  const validateAndSetField = (id: string, value: string) => {
    const error = validateRegisterForm(id, value);

    setFormErrors((prev) => ({
      ...prev,
      [id]: error,
    }));

    setLoginMutation((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;

    const formattedValue = id === 'telephone' ? formatTelephone(value.trim()) : value.trim();

    setLoginMutation((prev) => ({
      ...prev,
      [id]: formattedValue,
    }));

    if (isTouched[id]) {
      validateAndSetField(id, formattedValue);
    }
  };

  const handleBlur = (id: string) => {
    setIsTouched((prev) => ({
      ...prev,
      [id]: true,
    }));

    const error = validateRegisterForm(id, loginMutation[id as keyof LoginMutation] || '');

    setFormErrors((prev) => ({
      ...prev,
      [id]: error,
    }));
  };

  const isFormValid = Boolean(
    loginMutation.telephone.length === 12 &&
      loginMutation.password &&
      !Object.values(formErrors).some((error) => error),
  );

  return {
    loginMutation,
    handleChange,
    isFormValid,
    handleBlur,
    formErrors,
  };
};

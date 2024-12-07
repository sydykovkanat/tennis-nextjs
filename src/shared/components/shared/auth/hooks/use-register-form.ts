'use client';

import { formatTelephone } from '@/shared/lib';
import { RegisterMutation } from '@/shared/types/auth.types';

import { ChangeEvent, useState } from 'react';
import { DateValue } from 'react-aria-components';

export const useRegisterForm = (initialState: RegisterMutation) => {
  const [registerMutation, setRegisterMutation] = useState<RegisterMutation>(initialState);
  const [isAgree, setIsAgree] = useState({
    rules: false,
    personalData: false,
  });

  const handleAgree = (type: 'rules' | 'personalData') => {
    setIsAgree((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleSelectChange = (id: string, value: string) => {
    setRegisterMutation((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const dateChange = (date: DateValue | null) => {
    if (!date) return;
    setRegisterMutation((prev) => ({
      ...prev,
      dateOfBirth: date.toString(),
    }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { id } = event.target;
    let { value } = event.target;

    if (id === 'telephone') {
      value = formatTelephone(value);
    }

    setRegisterMutation((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const isFormValid = Boolean(
    registerMutation.telephone.length === 12 &&
      registerMutation.password &&
      isAgree.rules &&
      isAgree.personalData &&
      registerMutation.email &&
      registerMutation.fullName &&
      registerMutation.gender &&
      registerMutation.category &&
      registerMutation.dateOfBirth,
  );

  return {
    registerMutation,
    handleChange,
    isFormValid,
    dateChange,
    handleSelectChange,
    handleAgree,
    isAgree,
  };
};
